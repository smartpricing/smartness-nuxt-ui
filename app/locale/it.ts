import { it } from "@nuxt/ui/locale";
import { extendSmartnessLocale } from "./_extend";

export default extendSmartnessLocale(it, {
	sTopBar: {
		ctaLabel: "Sblocca il pieno potenziale"
	},
	layoutDemo: {
		tabs: {
			overview: "Panoramica",
			details: "Dettagli",
			activity: "Attività"
		}
	}
});
