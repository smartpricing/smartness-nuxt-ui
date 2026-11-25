import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import tailwindcss from "@tailwindcss/vite";
import phoneCodes from "./app/components/PhoneInput/phone-codes.json" with { type: "json" };
import { countryFlagIcon } from "./app/utils/countryFlag";

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
	app: {
		head: {
			link: [
				{ rel: "icon", type: "image/svg+xml", href: "/smartness_icon_negative.svg", media: "(prefers-color-scheme: light)" },
				{ rel: "icon", type: "image/svg+xml", href: "/smartness_icon_positive.svg", media: "(prefers-color-scheme: dark)" },
				{ rel: "icon", type: "image/png", href: "/favicon-96x96.png", sizes: "96x96" },
				{ rel: "shortcut icon", href: "/favicon.ico" },
				{ rel: "apple-touch-icon", sizes: "180x180", href: "/apple-touch-icon.png" }
			]
		}
	},
	ui: {
		prose: true,
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
	icon: {
		// Flag names are built at runtime (`circle-flags:${code}`), so an app's icon scan never sees
		// them and an app on `provider: "none"` would render blank flags. Every flag SPhoneInput can
		// show is listed here; the language flags of STranslatableText are among them.
		clientBundle: {
			icons: phoneCodes.map((country) => countryFlagIcon(country.code))
		}
	},
	fonts: {
		families: [
			{
				name: "Saans",
				provider: "local",
				weights: ["100 900"],
				styles: ["normal", "italic"],
				fallbacks: ["BlinkMacSystemFont", "Segoe UI", "Roboto", "Helvetica Neue", "Arial", "Noto Sans"]
			}
		]
	},
	css: [join(currentDir, "./app/assets/css/main.css")],
	vite: {
		plugins: [
			tailwindcss()
		],
		optimizeDeps: {
			include: [
				"maplibre-gl",
				"echarts",
				"echarts/lib/i18n/langDE.js",
				"echarts/lib/i18n/langEN.js",
				"echarts/lib/i18n/langES.js",
				"echarts/lib/i18n/langIT.js",
				"@internationalized/date",
				"date-fns",
				"date-fns/locale",
				"maska/vue"
			]
		}
	},
	alias: {
		"#smartness/locale": join(currentDir, "./app/locale/index.ts"),
		"#layers/smartness-nuxt-ui": join(currentDir, "./runtime/index.ts")
	},
	build: {
		transpile: ["zod", "@vueuse/core", "@vuepic/vue-datepicker", "libphonenumber-js"]
	},
	components: [
		{
			path: join(currentDir, "./app/components"),
			pathPrefix: false,
			ignore: ["**/types.ts", "**/use*.ts"]
		}
	],
	eslint: {
		config: {
			standalone: false
		}
	},
	compatibilityDate: "2026-11-01"
});
