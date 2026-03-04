import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import tailwindcss from "@tailwindcss/vite";
import dts from "vite-plugin-dts";
import { resolve } from "path";

export default defineConfig({
	plugins: [
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
			external: ["vue"],
			output: {
				globals: { vue: "Vue" },
			},
		},
	},
});
