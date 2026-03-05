import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import tailwindcss from "@tailwindcss/vite";
import dts from "vite-plugin-dts";
import nuxtUI from "@nuxt/ui/vite";
import { resolve } from "path";
import appConfig from "./src/app.config.ts";

export default defineConfig({
	plugins: [
		vue(),
		nuxtUI({
			ui: {
				...appConfig.ui,
			},
			colorMode: false,
			autoImport: {
				imports: ["vue"],
				dts: "src/auto-imports.d.ts",
			},
			components:{
				dirs: [resolve(__dirname, "src/components")],
				extensions: ["vue"],
				include: [resolve(__dirname, "src/components/**/*.vue")],
				exclude: [resolve(__dirname, "src/components/**/*.test.vue")],
				dts: "src/components.d.ts",
			}
		}),
		tailwindcss(),
		dts({
			cleanVueFileName: true,
			insertTypesEntry: true,
			tsconfigPath: "./tsconfig.app.json",
		}),
	],
	build: {
		lib: {
			entry: {
				index: resolve(__dirname, "src/index.ts"),
				vite: resolve(__dirname, "src/vite.ts"),
			},
			name: "smartness-vue",
			formats: ["es"],
			fileName: (_format, entryName) => `${entryName}.es.js`,
		},
		rolldownOptions: {
			external: [
				"vue",
				"@nuxt/ui",
				/^@nuxt\/ui\//,
				"echarts",
				/^echarts\//,
				"@vuepic/vue-datepicker",
				"date-fns",
				"@internationalized/date",
				"@tanstack/vue-table",
				"@vueuse/core",
			],
			output: {
				globals: { vue: "Vue" },
			},
		},
	},
});
