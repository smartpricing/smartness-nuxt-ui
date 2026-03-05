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
			components: {
				dts: "src/components.d.ts",
				importPathTransform: (path: string) => {
					const idx = path.indexOf("node_modules/@nuxt/ui/dist/runtime/");
					if (idx === -1) return path;
					const rel = path.slice(idx + "node_modules/@nuxt/ui/dist/runtime/".length);
					if (rel.startsWith("vue/components/")) return `@nuxt/ui/runtime/${rel}`;
					if (rel.startsWith("components/")) return `@nuxt/ui/${rel}`;
					return `@nuxt/ui/runtime/${rel}`;
				},
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
