import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { version as layerVersion } from "../package.json";

const currentDir = dirname(fileURLToPath(import.meta.url));
const layerComponentsDir = join(currentDir, "..", "app", "components");

export default defineNuxtConfig({
	extends: [
		["..", { install: true }]
	],
	modules: [
		"@nuxt/content",
		"@nuxtjs/i18n",
		"@nuxtjs/mcp-toolkit",
		"nuxt-component-meta"
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
	mcp: {
		name: "Smartness UI",
		version: layerVersion
	},
	componentMeta: {
		componentDirs: [
			layerComponentsDir
		],
		metaFields: {
			type: false,
			props: true,
			slots: "no-schema",
			events: "no-schema",
			exposed: false
		}
	},
	ssr: false,
	experimental: {
		asyncContext: true,
	},
	devtools: {
		enabled: false
	},
	compatibilityDate: "2026-04-01"
});
