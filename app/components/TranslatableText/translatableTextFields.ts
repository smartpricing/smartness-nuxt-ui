import type { ButtonProps } from "@nuxt/ui";
import type { InjectionKey } from "vue";
import type { RefineFunction, TranslatableTextAttributes, TranslateFunction } from "./types";

/** What one field of STranslatableTextFields tells it */
export interface TranslatableTextFieldMember {
	key: string
	active: () => readonly string[]
	outdated: () => readonly string[]
	stale: () => readonly string[]
	pending: () => readonly string[]
	failed: () => readonly string[]
	emptyRequired: () => readonly string[]
	blank: () => boolean
	setActive: (codes: readonly string[], on: boolean) => void
	updateOutdated: () => Promise<void>
	clearAll: () => void
}

/** What STranslatableTextFields shares with its fields: getters, so they follow its props */
export interface TranslatableTextFieldsContext {
	register: (member: TranslatableTextFieldMember) => () => void
	/** The language every field is written in */
	language: () => string
	languages: () => readonly string[]
	requiredLanguages: () => readonly string[] | undefined
	/** The language selected in the column */
	current: () => string
	translate: () => TranslateFunction
	refine: () => RefineFunction | undefined
	debounce: () => number
	disabled: () => boolean
	/** The language's name for a list: capitalised */
	nameOf: (code: string) => string
	/** The language's name inside a sentence, as the locale writes it ("in italiano", "auf Deutsch") */
	inSentence: (code: string) => string
	retranslateButton: () => boolean | ButtonProps | undefined
	refineButton: () => ButtonProps | undefined
	updateFieldButton: () => ButtonProps | undefined
	retryButton: () => ButtonProps | undefined
	attributes: () => TranslatableTextAttributes | undefined
}

export const translatableTextFieldsKey: InjectionKey<TranslatableTextFieldsContext> = Symbol("STranslatableTextFields");
