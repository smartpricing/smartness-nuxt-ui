import { en } from "@nuxt/ui/locale";
import { extendSmartnessLocale } from "./_extend";

export default extendSmartnessLocale(en, {
	sTopBar: {
		ctaLabel: "Unlock full potential",
		makeAWishLabel: "Make a wish",
		helpCenterLabel: "Resource center"
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
	},
	sActionsGroup: {
		actions: "Actions",
		selected: "{n} selected"
	}
});
