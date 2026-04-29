import { queryCollection } from "@nuxt/content/server";

export default defineMcpResource({
	uri: "resource://smartness-ui/components",
	description: "Catalog of all Smartness UI components — both S* custom and U* with custom variants.",
	cache: "1h",
	async handler(uri: URL) {
		const event = useEvent();
		const components = await queryCollection(event, "components")
			.select("title", "description", "category", "prefix", "componentName", "subcomponents", "tags", "path")
			.all();

		return {
			contents: [{
				uri: uri.toString(),
				mimeType: "application/json",
				text: JSON.stringify(components, null, 2)
			}]
		};
	}
});
