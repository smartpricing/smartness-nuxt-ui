import tailwindcss from "@tailwindcss/vite";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

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
			],
			defaultVariants: {
				color: "secondary"
			}
		}
	},
	css: [join(currentDir, "./app/assets/css/main.css")],
	imports: {
		presets: [
		  	{
				from: "zod",
				imports: [{ name: "*", as: "z" }]
			}
		]
	},
	vite: {
		plugins: [
			tailwindcss()
		],
	},
	eslint: {
		config: {
			standalone: false
		}
	}
});
