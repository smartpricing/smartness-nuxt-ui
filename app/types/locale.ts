import type { Messages as NuxtUIMessages } from "@nuxt/ui";

export interface SmartnessMessages {
	sTopBar: {
		ctaLabel: string
	}
	sAppPage: {
		howDoesItWorkLabel: string
	}
	layoutDemo: {
		tabs: {
			overview: string
			details: string
			activity: string
		}
	}
}

export type Messages = NuxtUIMessages & SmartnessMessages;
