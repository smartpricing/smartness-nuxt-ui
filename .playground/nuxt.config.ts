export default defineNuxtConfig({
	extends: [".."],
	app: {
		head: {
			title: "Smartness Nuxt UI Playground",
			charset: "utf-8",
			viewport: "width=device-width, initial-scale=1",
			meta: [
				{ name: "format-detection", content: "no" }
			],
			noscript: [
				{ textContent: "JavaScript is required to run this project" }
			]
		}
	},
	ssr: false,
	experimental: {
		typedPages: true
	},
	compatibilityDate: "2025-09-01"
});
