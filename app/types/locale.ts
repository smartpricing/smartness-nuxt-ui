import type { Messages as NuxtUIMessages } from "@nuxt/ui";

export interface SmartnessMessages {
	sTopBar: {
		ctaLabel: string
	}
}

export type Messages = NuxtUIMessages & SmartnessMessages;
