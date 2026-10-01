import { it } from "@nuxt/ui/locale";
import { extendSmartnessLocale } from "./_extend";

export default extendSmartnessLocale(it, {
	sTopBar: {
		ctaLabel: "Sblocca il pieno potenziale",
		makeAWishLabel: "Esprimi un desiderio",
		helpCenterLabel: "Centro risorse"
	},
	sAppPage: {
		backLabel: "",
		howDoesItWorkLabel: "Come funziona?"
	},
	sNavigationProducts: {
		otherSmartProducts: "Altri prodotti Smartness",
		administration: "Amministrazione"
	},
	sMultiSelect: {
		search: "Cerca...",
		selectAll: "Seleziona tutto",
		empty: "Nessun risultato",
		selected: "{n} selezionati"
	},
	sActionsGroup: {
		actions: "Azioni",
		selected: "{n} selezionati"
	},
	sStepper: {
		optional: "Facoltativo",
		missingValue: "Valore mancante"
	},
	sAuthFormCard: {
		brandAlt: "Smartness",
		supportPrompt: "Hai bisogno di aiuto?"
	},
	sSlider: {
		from: "da",
		to: "a"
	},
	sActions: {
		clear: "Cancella",
		today: "Oggi",
		previous: "Precedente",
		next: "Successivo"
	},
	sDatePicker: {
		openCalendar: "Apri calendario"
	},
	sRangeDatePicker: {
		openCalendar: "Seleziona un periodo",
		custom: "Periodo personalizzato",
		past: "Passato",
		future: "Futuro",
		presets: {
			last7Days: "Ultimi 7 giorni",
			last30Days: "Ultimi 30 giorni",
			thisMonth: "Questo mese",
			last3Months: "Ultimi 3 mesi",
			last12Months: "Ultimi 12 mesi",
			next7Days: "Prossimi 7 giorni",
			next30Days: "Prossimi 30 giorni",
			next3Months: "Prossimi 3 mesi",
			next6Months: "Prossimi 6 mesi",
			next12Months: "Prossimi 12 mesi"
		}
	},
	sExitConfirmation: {
		title: "Modifiche non salvate",
		message: "Hai modifiche non salvate. Sei sicuro di voler uscire?",
		confirm: "Esci dalla pagina",
		cancel: "Resta sulla pagina"
	},
	sConfirmModal: {
		message: "Sei sicuro?",
		confirm: "Conferma",
		cancel: "Annulla"
	}
});
