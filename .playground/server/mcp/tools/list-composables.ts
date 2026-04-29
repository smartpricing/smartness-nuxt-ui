import { queryCollection } from "@nuxt/content/server";

export default defineMcpTool({
	description: "List Smartness UI composables exposed by the layer (utility hooks for use in consumer applications).",
	annotations: {
		readOnlyHint: true,
		destructiveHint: false,
		idempotentHint: true,
		openWorldHint: false
	},
	cache: "30m",
	async handler() {
		const event = useEvent();

		const composables = await queryCollection(event, "composables")
			.select("name", "title", "description", "tags", "path")
			.all();

		return {
			composables: composables
				.map((c) => ({
					name: c.name,
					title: c.title,
					description: c.description,
					tags: c.tags,
					path: c.path
				}))
				.sort((a, b) => a.name.localeCompare(b.name)),
			total: composables.length
		};
	}
});
