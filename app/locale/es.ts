import { es } from "@nuxt/ui/locale";
import { extendSmartnessLocale } from "./_extend";

export default extendSmartnessLocale(es, {
	sTopBar: {
		ctaLabel: "Desbloquea todo el potencial"
	},
	sAppPage: {
		howDoesItWorkLabel: "¿Cómo funciona?"
	},
	layoutDemo: {
		tabs: {
			overview: "Resumen",
			details: "Detalles",
			activity: "Actividad"
		}
	}
});
