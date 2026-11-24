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
	},
	sTranslatableText: {
		primary: "Principale",
		required: "Obbligatoria",
		active: "Attiva",
		inactive: "Non attiva",
		outOfDate: "Da aggiornare: il testo di partenza è cambiato",
		manage: "Gestisci",
		showMore: "Mostra altre {n}",
		showLess: "Mostra meno",
		refine: "Riscrivi con l'AI",
		retranslate: "Traduci di nuovo",
		update: "Aggiorna le traduzioni con l'AI",
		translatedNote: "Tradotto con l'AI. Controllalo prima di salvare.",
		refinedNote: "Riscritto con l'AI. Controllalo prima di salvare.",
		inactiveHint: "Attivala per mostrare questa traduzione, altrimenti gli ospiti leggono il testo in {language}.",
		requiredEmpty: "Questo testo è obbligatorio in {language}.",
		staleTitle: "Il testo di partenza è cambiato",
		staleMessage: "Aggiorna le traduzioni in tutte le lingue, così questa corrisponde al testo che gli ospiti leggono in {language}.",
		failed: "Non è stato possibile generare queste traduzioni: {languages}.",
		refineFailed: "Non è stato possibile riscrivere il testo.",
		retry: "Riprova",
		manageTitle: "Gestisci le lingue",
		manageInfo: "Questa scelta è salvata nelle impostazioni dell'azienda: tutti i testi tradotti usano le stesse lingue.",
		search: "Cerca una lingua",
		selectAll: "Seleziona tutte",
		empty: "Nessuna lingua trovata",
		close: "Chiudi",
		clearAll: "Svuota tutte le lingue",
		clearAllTitle: "Svuotare il testo in tutte le lingue?",
		clearAllMessage: "Il testo e tutte le traduzioni verranno eliminati. Non si può annullare.",
		clearAllConfirm: "Svuota tutto"
	}
});
