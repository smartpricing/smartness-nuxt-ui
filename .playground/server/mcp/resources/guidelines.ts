import { queryCollection } from "@nuxt/content/server";

export default defineMcpResource({
	uri: "resource://smartness-ui/guidelines",
	description: "Catalog of all Smartness development guidelines (cross-project standards and UI patterns).",
	cache: "1h",
	async handler(uri: URL) {
		const event = useEvent();
		const pages = await queryCollection(event, "guidelines")
			.select("title", "description", "category", "tags", "path")
			.all();

		return {
			contents: [{
				uri: uri.toString(),
				mimeType: "application/json",
				text: JSON.stringify(pages, null, 2)
			}]
		};
	}
});
