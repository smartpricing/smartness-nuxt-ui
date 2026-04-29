import { queryCollection } from "@nuxt/content/server";

export default defineMcpTool({
	description: "Get the guide on how to integrate Smartness UI locales with @nuxtjs/i18n in a consumer Nuxt project. Covers <UApp> wiring, language-switcher dropdown, and how to add new translation keys.",
	annotations: {
		readOnlyHint: true,
		destructiveHint: false,
		idempotentHint: true,
		openWorldHint: false
	},
	cache: "1h",
	async handler() {
		const event = useEvent();
		const page = await queryCollection(event, "pages")
			.where("path", "LIKE", "%/locale-integration")
			.first();

		if (!page) {
			throw createError({ statusCode: 404, message: "locale-integration page not found in content." });
		}

		return {
			title: page.title,
			description: page.description,
			body: page.body,
			path: page.path
		};
	}
});
