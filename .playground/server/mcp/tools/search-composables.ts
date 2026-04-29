import { z } from "zod";
import { queryCollection } from "@nuxt/content/server";

export default defineMcpTool({
	description: "Search Smartness UI composables by name, description or tags.",
	annotations: {
		readOnlyHint: true,
		destructiveHint: false,
		idempotentHint: true,
		openWorldHint: false
	},
	inputSchema: {
		search: z.string().describe("Search term applied to composable name, title and description")
	},
	inputExamples: [
		{ search: "stepper" },
		{ search: "phone" },
		{ search: "render" }
	],
	cache: "30m",
	async handler({ search }) {
		const event = useEvent();
		const composables = await queryCollection(event, "composables")
			.select("name", "title", "description", "tags", "path")
			.all();

		const needle = search.toLowerCase();
		const results = composables.filter((c) =>
			c.name?.toLowerCase().includes(needle)
			|| c.title?.toLowerCase().includes(needle)
			|| c.description?.toLowerCase().includes(needle)
			|| c.tags?.some((t) => t.toLowerCase().includes(needle))
		);

		return {
			composables: results.sort((a, b) => a.name.localeCompare(b.name)),
			total: results.length,
			filters: { search }
		};
	}
});
