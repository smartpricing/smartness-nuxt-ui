import nuxtUI from "@nuxt/ui/vite";
import appConfig from "./app.config.mjs";

export default function smartnessUI(options = {}) {
	return nuxtUI({
		colorMode: false,
		...options,
		ui: {
			...appConfig.ui,
			...options.ui,
		},
	});
}
