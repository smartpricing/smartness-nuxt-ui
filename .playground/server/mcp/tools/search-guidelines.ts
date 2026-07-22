import { z } from "zod";
import { queryCollection } from "@nuxt/content/server";

export default defineMcpTool({
	description: "Search across the Smartness development guidelines — cross-project standards for building features (design system usage, development conventions, list filters, multi-step forms, sortable tables, tabbed editing forms, test ids, UI patterns). Use this to discover which guideline applies before implementing a feature.",
	annotations: {
		readOnlyHint: true,
		destructiveHint: false,
		idempotentHint: true,
		openWorldHint: false
	},
	inputSchema: {
		search: z.string().optional().describe("Search term to filter guidelines by title, description or tags"),
		category: z.enum(["design-system", "development", "patterns", "testing"]).optional().describe("Filter by category")
	},
	inputExamples: [
		{},
		{ category: "patterns" },
		{ search: "form" }
	],
	cache: "30m",
	async handler({ search, category }) {
		const event = useEvent();
		let query = queryCollection(event, "guidelines")
			.select("title", "description", "category", "tags", "path");

		if (category) query = query.where("category", "=", category);

		const pages = await query.all();

		let results = pages.map((p) => ({
			title: p.title,
			description: p.description,
			category: p.category,
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
			guidelines: results.sort((a, b) => a.title.localeCompare(b.title)),
			total: results.length
		};
	}
});
