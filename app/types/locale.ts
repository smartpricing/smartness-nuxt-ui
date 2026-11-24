import type { Messages as NuxtUIMessages } from "@nuxt/ui";

export interface SmartnessMessages {
	sTopBar: {
		ctaLabel: string
		makeAWishLabel: string
		helpCenterLabel: string
	}
	sAppPage: {
		backLabel: string
		howDoesItWorkLabel: string
	}
	sNavigationProducts: {
		otherSmartProducts: string
		administration: string
	}
	sMultiSelect: {
		search: string
		selectAll: string
		empty: string
		selected: string
	}
	sActionsGroup: {
		actions: string
		selected: string
	}
	sStepper: {
		optional: string
		missingValue: string
	}
	sAuthFormCard: {
		brandAlt: string
		supportPrompt: string
	}
	sSlider: {
		from: string
		to: string
	}
	/** Generic action labels shared across components. */
	sActions: {
		clear: string
		today: string
		previous: string
		next: string
	}
	sDatePicker: {
		openCalendar: string
	}
	sRangeDatePicker: {
		openCalendar: string
		custom: string
		past: string
		future: string
		presets: {
			last7Days: string
			last30Days: string
			thisMonth: string
			last3Months: string
			last12Months: string
			next7Days: string
			next30Days: string
			next3Months: string
			next6Months: string
			next12Months: string
		}
	}
	sExitConfirmation: {
		title: string
		message: string
		confirm: string
		cancel: string
	}
	sConfirmModal: {
		message: string
		confirm: string
		cancel: string
	}
	sTranslatableText: {
		primary: string
		fallback: string
		active: string
		inactive: string
		outOfDate: string
		manage: string
		showMore: string
		showLess: string
		refine: string
		retranslate: string
		update: string
		translatedNote: string
		refinedNote: string
		inactiveHint: string
		inactiveHintFallback: string
		staleTitle: string
		staleMessage: string
		failed: string
		refineFailed: string
		retry: string
		manageTitle: string
		manageInfo: string
		search: string
		selectAll: string
		empty: string
		close: string
		clearAll: string
		clearAllTitle: string
		clearAllMessage: string
		clearAllConfirm: string
	}
}

export type Messages = NuxtUIMessages & SmartnessMessages;
