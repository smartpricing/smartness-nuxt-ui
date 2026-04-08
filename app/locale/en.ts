import { en } from "@nuxt/ui/locale";
import { extendSmartnessLocale } from "./_extend";

export default extendSmartnessLocale(en, {
	sTopBar: {
		ctaLabel: "Unlock full potential"
	},
	layoutDemo: {
		tabs: {
			overview: "Overview",
			details: "Details",
			activity: "Activity"
		}
	}
});
