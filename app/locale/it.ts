import { it } from "@nuxt/ui/locale";
import { extendSmartnessLocale } from "./_extend";

export default extendSmartnessLocale(it, {
	sTopBar: {
		ctaLabel: "Sblocca il pieno potenziale"
	},
	sAppPage: {
		backLabel: "",
		howDoesItWorkLabel: "Come funziona?"
	},
	sMultiSelect: {
		search: "Cerca...",
		selectAll: "Seleziona tutto",
		empty: "Nessun risultato",
		selected: "{n} selezionati"
	}
});
