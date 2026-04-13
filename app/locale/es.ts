import { es } from "@nuxt/ui/locale";
import { extendSmartnessLocale } from "./_extend";

export default extendSmartnessLocale(es, {
	sTopBar: {
		ctaLabel: "Desbloquea todo el potencial",
		makeAWishLabel: "Pide un deseo",
		helpCenterLabel: "Centro de recursos"
	},
	sAppPage: {
		backLabel: "",
		howDoesItWorkLabel: "¿Cómo funciona?"
	},
	sMultiSelect: {
		search: "Buscar...",
		selectAll: "Seleccionar todo",
		empty: "Sin resultados",
		selected: "{n} seleccionados"
	}
});
