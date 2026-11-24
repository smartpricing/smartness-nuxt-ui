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
	sSlider: {
		from: "from",
		to: "to"
	},
	sActions: {
		clear: "Clear",
		today: "Today",
		previous: "Previous",
		next: "Next"
	},
	sDatePicker: {
		openCalendar: "Open calendar"
	},
	sRangeDatePicker: {
		openCalendar: "Select a date range",
		custom: "Custom range",
		past: "Past",
		future: "Future",
		presets: {
			last7Days: "Last 7 days",
			last30Days: "Last 30 days",
			thisMonth: "This month",
			last3Months: "Last 3 months",
			last12Months: "Last 12 months",
			next7Days: "Next 7 days",
			next30Days: "Next 30 days",
			next3Months: "Next 3 months",
			next6Months: "Next 6 months",
			next12Months: "Next 12 months"
		}
	},
	sExitConfirmation: {
		title: "Unsaved Changes",
		message: "You have unsaved changes. Are you sure you want to leave?",
		confirm: "Leave page",
		cancel: "Stay on page"
	},
	sConfirmModal: {
		message: "Are you sure?",
		confirm: "Confirm",
		cancel: "Cancel"
	},
	sTranslatableText: {
		primary: "Primary",
		fallback: "Fallback",
		active: "Active",
		inactive: "Not active",
		outOfDate: "Out of date: the source text has changed",
		manage: "Manage",
		showMore: "Show {n} more",
		showLess: "Show less",
		refine: "Rewrite with AI",
		retranslate: "Translate again",
		update: "Update translations with AI",
		translatedNote: "Translated with AI. Review it before saving.",
		refinedNote: "Re-written with AI. Review it before saving.",
		inactiveHint: "Enable it to show this translation to guests.",
		inactiveHintFallback: "Enable it to show this translation, or the content falls back to {language}.",
		staleTitle: "The source content has changed",
		staleMessage: "Update the translations for all languages so this one matches the text guests read in {language}.",
		failed: "These translations could not be generated: {languages}.",
		refineFailed: "The text could not be rewritten.",
		retry: "Try again",
		manageTitle: "Manage languages",
		manageInfo: "This choice is saved in the company settings: every translated text uses the same set of languages.",
		search: "Search a language",
		selectAll: "Select all",
		empty: "No languages found",
		close: "Close",
		clearAll: "Clear all languages",
		clearAllTitle: "Clear this text in every language?",
		clearAllMessage: "The text and all its translations will be deleted. You can't undo this.",
		clearAllConfirm: "Clear all"
	}
});
