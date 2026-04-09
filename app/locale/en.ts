import { en } from "@nuxt/ui/locale";
import { extendSmartnessLocale } from "./_extend";

export default extendSmartnessLocale(en, {
	sTopBar: {
		ctaLabel: "Unlock full potential"
	},
	sAppPage: {
		backLabel: "",
		howDoesItWorkLabel: "How does it work?"
	},
	sMultiSelect: {
		search: "Search...",
		selectAll: "Select all",
		empty: "No results",
		selected: "{n} selected"
	}
});
