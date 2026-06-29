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
	sExitConfirmation: {
		title: "Nicht gespeicherte Änderungen",
		message: "Sie haben ungespeicherte Änderungen. Möchten Sie die Seite wirklich verlassen?",
		confirm: "Seite verlassen",
		cancel: "Auf der Seite bleiben"
	}
});
