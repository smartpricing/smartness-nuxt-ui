import { queryCollection } from "@nuxt/content/server";

export default defineMcpResource({
	uri: "resource://smartness-ui/composables",
	description: "Catalog of all Smartness UI composables.",
	cache: "1h",
	async handler(uri: URL) {
		const event = useEvent();
		const composables = await queryCollection(event, "composables")
			.select("name", "title", "description", "tags", "path")
			.all();

		return {
			contents: [{
				uri: uri.toString(),
				mimeType: "application/json",
				text: JSON.stringify(composables, null, 2)
			}]
		};
	}
});
