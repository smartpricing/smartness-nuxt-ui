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
	sNavigationProducts: {
		otherSmartProducts: "Other Smartness products",
		administration: "Administration"
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
	},
	sStepper: {
		optional: "Optional",
		missingValue: "Missing value"
	},
	sAuthFormCard: {
		brandAlt: "Smartness",
		supportPrompt: "Need help?"
	},
	sExitConfirmation: {
		title: "Unsaved Changes",
		message: "You have unsaved changes. Are you sure you want to leave?",
		confirm: "Leave page",
		cancel: "Stay on page"
	}
});
