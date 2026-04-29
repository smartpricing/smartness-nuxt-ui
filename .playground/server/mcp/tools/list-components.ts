import { queryCollection } from "@nuxt/content/server";

export default defineMcpTool({
	description: "List all Smartness UI components — both S* custom components from the layer and U* Nuxt UI components with custom variants registered in app.config.ts.",
	annotations: {
		readOnlyHint: true,
		destructiveHint: false,
		idempotentHint: true,
		openWorldHint: false
	},
	cache: "30m",
	async handler() {
		const event = useEvent();

		const components = await queryCollection(event, "components")
			.select("title", "description", "category", "prefix", "componentName", "showcaseSlug", "subcomponents", "path")
			.all();

		return {
			components: components
				.map((c) => ({
					name: c.componentName,
					title: c.title,
					description: c.description,
					category: c.category,
					prefix: c.prefix,
					subcomponents: c.subcomponents,
					path: c.path
				}))
				.sort((a, b) => a.name.localeCompare(b.name)),
			total: components.length
		};
	}
});
