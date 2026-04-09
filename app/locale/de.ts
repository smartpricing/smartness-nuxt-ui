import { de } from "@nuxt/ui/locale";
import { extendSmartnessLocale } from "./_extend";

export default extendSmartnessLocale(de, {
	sTopBar: {
		ctaLabel: "Volles Potenzial freischalten"
	},
	sAppPage: {
		backLabel: "",
		howDoesItWorkLabel: "Wie funktioniert das?"
	},
	sMultiSelect: {
		search: "Suchen...",
		selectAll: "Alle auswählen",
		empty: "Keine Ergebnisse",
		selected: "{n} ausgewählt"
	}
});
