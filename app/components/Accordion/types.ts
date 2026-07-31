import type { AccordionItem } from "@nuxt/ui";

export interface SAccordionItem extends AccordionItem {
	/** Recolor the item header with the light secondary tint. */
	selected?: boolean
}
