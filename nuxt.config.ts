import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import tailwindcss from "@tailwindcss/vite";

const currentDir = dirname(fileURLToPath(import.meta.url));

export default defineNuxtConfig({
	$meta: {
		name: "smartness-nuxt-ui"
	},
	modules: [
		"@nuxt/eslint",
		"@nuxt/fonts",
		"@vueuse/nuxt",
		"@nuxt/ui",
		"reka-ui/nuxt"
	],
	ui: {
		mdc: true,
		content: true,
		colorMode: false,
		theme: {
			colors: [
				"primary",
				"secondary",
				"support",
				"burgundy",
				"lemon",
				"info",
				"success",
				"warning",
				"error",
				"offblack",
				"learning",
				"ai"
			]
		}
	},
	css: [join(currentDir, "./app/assets/css/main.css")],
	vite: {
		plugins: [
			tailwindcss()
		]
	},
	alias: {
		"#layers/smartness-nuxt-ui": join(currentDir, "./runtime/index.ts")
	},
	build: {
		transpile: ["zod", "@vueuse/core"]
	},
	eslint: {
		config: {
			standalone: false
		}
	},
	compatibilityDate: "2026-01-01"
});
