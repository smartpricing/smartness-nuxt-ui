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
		recommendedForYou: "Für dich empfohlen"
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
	}
});
