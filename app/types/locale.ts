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
}

export type Messages = NuxtUIMessages & SmartnessMessages;
