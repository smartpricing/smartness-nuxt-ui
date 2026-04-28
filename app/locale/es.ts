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
	sNavigationProducts: {
		recommendedForYou: "Recomendado para ti"
	},
	sMultiSelect: {
		search: "Buscar...",
		selectAll: "Seleccionar todo",
		empty: "Sin resultados",
		selected: "{n} seleccionados"
	},
	sActionsGroup: {
		actions: "Acciones",
		selected: "{n} seleccionados"
	}
});
