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
		recommendedForYou: string
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
}

export type Messages = NuxtUIMessages & SmartnessMessages;
