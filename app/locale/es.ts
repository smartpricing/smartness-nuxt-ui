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
	sSlider: {
		from: "de",
		to: "a"
	},
	sActions: {
		clear: "Borrar",
		today: "Hoy",
		previous: "Anterior",
		next: "Siguiente"
	},
	sDatePicker: {
		openCalendar: "Abrir calendario"
	},
	sRangeDatePicker: {
		openCalendar: "Selecciona un periodo",
		custom: "Periodo personalizado",
		past: "Pasado",
		future: "Futuro",
		presets: {
			last7Days: "Últimos 7 días",
			last30Days: "Últimos 30 días",
			thisMonth: "Este mes",
			last3Months: "Últimos 3 meses",
			last12Months: "Últimos 12 meses",
			next7Days: "Próximos 7 días",
			next30Days: "Próximos 30 días",
			next3Months: "Próximos 3 meses",
			next6Months: "Próximos 6 meses",
			next12Months: "Próximos 12 meses"
		}
	},
	sExitConfirmation: {
		title: "Cambios no guardados",
		message: "Tiene cambios sin guardar. ¿Está seguro de que desea salir?",
		confirm: "Salir de la página",
		cancel: "Permanecer en la página"
	},
	sConfirmModal: {
		message: "¿Está seguro?",
		confirm: "Confirmar",
		cancel: "Cancelar"
	}
});
