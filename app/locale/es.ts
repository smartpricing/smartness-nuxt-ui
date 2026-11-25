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
		next: "Siguiente",
		close: "Cerrar",
		retry: "Reintentar"
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
	},
	sTranslatableText: {
		primary: "Principal",
		required: "Obligatorio",
		active: "Activo",
		inactive: "No activo",
		outOfDate: "Desactualizada: el texto original ha cambiado",
		manage: "Gestionar",
		showMore: "Mostrar {n} más",
		showLess: "Mostrar menos",
		refine: "Reescribir con IA",
		retranslate: "Traducir de nuevo",
		update: "Actualizar traducciones con IA",
		translatedNote: "Traducido con IA. Revísalo antes de guardar.",
		refinedNote: "Reescrito con IA. Revísalo antes de guardar.",
		inactiveHint: "Actívalo para mostrar esta traducción; si no, los huéspedes leen el texto en {language}.",
		requiredEmpty: "Este texto es obligatorio en {language}.",
		staleTitle: "El texto original ha cambiado",
		staleMessage: "Actualiza las traducciones de todos los idiomas para que esta coincida con el texto que los huéspedes leen en {language}.",
		failed: "No se han podido generar estas traducciones: {languages}.",
		refineFailed: "No se ha podido reescribir el texto.",
		manageTitle: "Gestionar idiomas",
		manageInfo: "Esta elección se guarda en la configuración de la empresa: todos los textos traducidos usan los mismos idiomas.",
		search: "Buscar un idioma",
		selectAll: "Seleccionar todos",
		empty: "No se han encontrado idiomas",
		clearAll: "Vaciar todos los idiomas",
		clearAllTitle: "¿Vaciar este texto en todos los idiomas?",
		clearAllMessage: "Se eliminarán el texto y todas sus traducciones. No se puede deshacer.",
		clearAllConfirm: "Vaciar todo"
	}
});
