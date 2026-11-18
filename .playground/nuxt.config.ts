import { version as layerVersion } from "../package.json";

export default defineNuxtConfig({
	extends: [
		["..", { install: true }]
	],
	modules: [
		"@nuxtjs/i18n"
	],
	i18n: {
		locales: [{ code: "en", language: "en-US", file: "en.json" }],
		defaultLocale: "en",
		strategy: "no_prefix"
	},
	app: {
		head: {
			title: "Smartness Nuxt UI Playground",
			noscript: [
				{ textContent: "JavaScript is required to run this project" }
			]
		}
	},
	runtimeConfig: {
		public: {
			layerVersion
		}
	},
	ssr: false,
	devtools: {
		enabled: false
	},
	compatibilityDate: "2026-04-01"
});
