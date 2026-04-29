import { z } from "zod";
import { queryCollection } from "@nuxt/content/server";

export default defineMcpTool({
	description: "Search Smartness UI components by name, description, category, or prefix (S = custom, U = Nuxt UI override).",
	annotations: {
		readOnlyHint: true,
		destructiveHint: false,
		idempotentHint: true,
		openWorldHint: false
	},
	inputSchema: {
		category: z.string().optional().describe("Filter by category (e.g. 'navigation', 'form', 'dataviz', 'overlay')"),
		prefix: z.enum(["S", "U"]).optional().describe("Filter by prefix: 'S' for custom Smartness components, 'U' for Nuxt UI components with custom variants"),
		search: z.string().optional().describe("Search term applied to component name, title and description")
	},
	inputExamples: [
		{ category: "dataviz" },
		{ search: "navigation" },
		{ prefix: "S" },
		{ search: "button", prefix: "U" }
	],
	cache: "30m",
	async handler({ category, prefix, search }) {
		const event = useEvent();

		let query = queryCollection(event, "components")
			.select("title", "description", "category", "prefix", "componentName", "tags", "path");

		if (category) query = query.where("category", "=", category);
		if (prefix) query = query.where("prefix", "=", prefix);

		const components = await query.all();

		let results = components.map((c) => ({
			name: c.componentName,
			title: c.title,
			description: c.description,
			category: c.category,
			prefix: c.prefix,
			tags: c.tags,
			path: c.path
		}));

		if (search) {
			const needle = search.toLowerCase();
			results = results.filter((c) =>
				c.name?.toLowerCase().includes(needle)
				|| c.title?.toLowerCase().includes(needle)
				|| c.description?.toLowerCase().includes(needle)
				|| c.tags?.some((t) => t.toLowerCase().includes(needle))
			);
		}

		return {
			components: results.sort((a, b) => a.name.localeCompare(b.name)),
			total: results.length,
			filters: { category, prefix, search }
		};
	}
});
