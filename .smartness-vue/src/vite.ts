import nuxtUI, { type NuxtUIOptions } from "@nuxt/ui/vite";
import appConfig from "./app.config.ts";

export default function smartnessUI(options:NuxtUIOptions  = {}) {
	return nuxtUI({
		colorMode: false,
		...options,
		scanPackages: ["smartness-vue", ...(options.scanPackages || [])],
		ui: {
			...appConfig.ui,
			...options.ui,
		},
	});
}
