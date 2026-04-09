import type { TreeItem } from "@nuxt/ui";
import type { ClassNameValue } from "tailwind-merge";

export interface MultiSelectItem extends TreeItem {
	value?: string
	children?: MultiSelectItem[]
}

export interface MultiSelectLocale {
	search?: string
	selectAll?: string
	empty?: string
	selected?: string
}

export type MultiSelectColor
	= "primary"
		| "secondary"
		| "success"
		| "info"
		| "warning"
		| "error"
		| "neutral";

export interface MultiSelectUi {
	trigger?: ClassNameValue
	popover?: ClassNameValue
	search?: ClassNameValue
	selectAll?: ClassNameValue
	tree?: ClassNameValue
	empty?: ClassNameValue
	footer?: ClassNameValue
}

export const DEFAULT_LOCALE: Required<MultiSelectLocale> = {
	search: "Search...",
	selectAll: "Select all",
	empty: "No results",
	selected: "{n} selected"
};
