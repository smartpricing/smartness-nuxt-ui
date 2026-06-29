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
		otherSmartProducts: "Otros productos Smartness",
		administration: "Administración"
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
	},
	sStepper: {
		optional: "Opcional",
		missingValue: "Valor faltante"
	},
	sAuthFormCard: {
		brandAlt: "Smartness",
		supportPrompt: "Necesitas ayuda?"
	},
	sExitConfirmation: {
		title: "Cambios no guardados",
		message: "Tiene cambios sin guardar. ¿Está seguro de que desea salir?",
		confirm: "Salir de la página",
		cancel: "Permanecer en la página"
	}
});
