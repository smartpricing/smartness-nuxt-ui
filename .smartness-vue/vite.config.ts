import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import tailwindcss from "@tailwindcss/vite";
import dts from "vite-plugin-dts";
import AutoImport from "unplugin-auto-import/vite";
import { resolve } from "path";

export default defineConfig({
	plugins: [
		AutoImport({
			imports: ["vue"],
			dts: "src/auto-imports.d.ts",
		}),
		vue(),
		tailwindcss(),
		dts({
			cleanVueFileName: true,
			insertTypesEntry: true,
		}),
	],
	build: {
		lib: {
			entry: resolve(__dirname, "src/index.ts"),
			name: "smartness-vue",
			formats: ["es", "umd"],
			fileName: (format) => `smartness-vue.${format}.js`,
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
