import { de } from "@nuxt/ui/locale";
import { extendSmartnessLocale } from "./_extend";

export default extendSmartnessLocale(de, {
	sTopBar: {
		ctaLabel: "Volles Potenzial freischalten",
		makeAWishLabel: "Wunsch äußern",
		helpCenterLabel: "Ressourcenzentrum"
	},
	sAppPage: {
		backLabel: "",
		howDoesItWorkLabel: "Wie funktioniert das?"
	},
	sNavigationProducts: {
		otherSmartProducts: "Weitere Smartness-Produkte",
		administration: "Verwaltung"
	},
	sMultiSelect: {
		search: "Suchen...",
		selectAll: "Alle auswählen",
		empty: "Keine Ergebnisse",
		selected: "{n} ausgewählt"
	},
	sActionsGroup: {
		actions: "Aktionen",
		selected: "{n} ausgewählt"
	},
	sStepper: {
		optional: "Optional",
		missingValue: "Fehlender Wert"
	},
	sAuthFormCard: {
		brandAlt: "Smartness",
		supportPrompt: "Brauchen Sie Hilfe?"
	},
	sSlider: {
		from: "von",
		to: "bis"
	},
	sActions: {
		clear: "Löschen",
		today: "Heute",
		previous: "Zurück",
		next: "Weiter"
	},
	sDatePicker: {
		openCalendar: "Kalender öffnen"
	},
	sRangeDatePicker: {
		openCalendar: "Zeitraum auswählen",
		custom: "Benutzerdefinierter Zeitraum",
		past: "Vergangenheit",
		future: "Zukunft",
		presets: {
			last7Days: "Letzte 7 Tage",
			last30Days: "Letzte 30 Tage",
			thisMonth: "Dieser Monat",
			last3Months: "Letzte 3 Monate",
			last12Months: "Letzte 12 Monate",
			next7Days: "Nächste 7 Tage",
			next30Days: "Nächste 30 Tage",
			next3Months: "Nächste 3 Monate",
			next6Months: "Nächste 6 Monate",
			next12Months: "Nächste 12 Monate"
		}
	},
	sExitConfirmation: {
		title: "Nicht gespeicherte Änderungen",
		message: "Sie haben ungespeicherte Änderungen. Möchten Sie die Seite wirklich verlassen?",
		confirm: "Seite verlassen",
		cancel: "Auf der Seite bleiben"
	},
	sConfirmModal: {
		message: "Sind Sie sicher?",
		confirm: "Bestätigen",
		cancel: "Abbrechen"
	}
});
