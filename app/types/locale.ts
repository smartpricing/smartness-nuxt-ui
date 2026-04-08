import type { Messages as NuxtUIMessages } from "@nuxt/ui";

export interface SmartnessMessages {
	sTopBar: {
		ctaLabel: string
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
