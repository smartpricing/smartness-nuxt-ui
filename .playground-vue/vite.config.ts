import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import ui from "smartness-vue/vite";

export default defineConfig({
	plugins: [vue(), ui()],
	optimizeDeps: { exclude: ["smartness-vue"] },
});
