import { queryCollection } from "@nuxt/content/server";

export default defineMcpResource({
	uri: "resource://smartness-ui/documentation-pages",
	description: "Catalog of all Smartness UI design system documentation pages.",
	cache: "1h",
	async handler(uri: URL) {
		const event = useEvent();
		const pages = await queryCollection(event, "pages")
			.select("title", "description", "section", "tags", "path")
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
