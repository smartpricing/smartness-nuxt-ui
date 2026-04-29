import { z } from "zod";
import { queryCollection } from "@nuxt/content/server";

export default defineMcpTool({
	description: "Search across the design system documentation pages (color palette, typography, gradients, custom CSS variants, locale integration).",
	annotations: {
		readOnlyHint: true,
		destructiveHint: false,
		idempotentHint: true,
		openWorldHint: false
	},
	inputSchema: {
		search: z.string().optional().describe("Search term to filter pages by title or description"),
		section: z.enum(["theme", "tokens", "i18n", "css"]).optional().describe("Filter by section")
	},
	inputExamples: [
		{},
		{ section: "tokens" },
		{ search: "gradient" }
	],
	cache: "30m",
	async handler({ search, section }) {
		const event = useEvent();
		let query = queryCollection(event, "pages")
			.select("title", "description", "section", "tags", "path");

		if (section) query = query.where("section", "=", section);

		const pages = await query.all();

		let results = pages.map((p) => ({
			title: p.title,
			description: p.description,
			section: p.section,
			tags: p.tags,
			path: p.path
		}));

		if (search) {
			const needle = search.toLowerCase();
			results = results.filter((p) =>
				p.title?.toLowerCase().includes(needle)
				|| p.description?.toLowerCase().includes(needle)
				|| p.tags?.some((t) => t.toLowerCase().includes(needle))
			);
		}

		return {
			pages: results.sort((a, b) => a.title.localeCompare(b.title)),
			total: results.length,
			filters: { search, section }
		};
	}
});
