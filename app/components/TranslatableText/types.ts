import type { ButtonProps, CheckboxProps, InputProps, SlideoverProps, SwitchProps, TextareaProps } from "@nuxt/ui";
import type { ConfirmOptions } from "../ConfirmationModal/types";

/**
 * A text written once and translated into the languages a product manages.
 * `texts` is the plain per-language map backends already keep; `inactive` and `digests`
 * are optional bookkeeping the product saves and passes back without reading them.
 */
export interface TranslatableText {
	/** The language the text is written in; every other entry of `texts` is a translation of it. */
	language: string
	/** What guests read, per language: the written text and its translations. */
	texts: Record<string, string>
	/** Switched off on this text: translated and kept, not shown to guests. Every language starts on. */
	inactive?: string[]
	/**
	 * Per translation, a digest of the text it was made from (see `textDigest`). When it no longer
	 * matches the current text the translation is out of date. A translation without one counts as up to date.
	 */
	digests?: Record<string, string>
}

/** The languages in play for a text: the organisation's, and the one that is always published. */
export interface TranslatableTextScope {
	languages: readonly string[]
	fallbackLanguage?: string
}

export interface TranslationRequest {
	text: string
	from: string
	to: string[]
	/** True for "Update translations" and "Translate again": an answer the product cached is not wanted. */
	fresh: boolean
}

export interface RefineRequest {
	text: string
	language: string
}

/** Resolves with the languages that came back: a missing one failed, a throw fails them all. */
export type TranslateFunction = (request: TranslationRequest) => Promise<Record<string, string>>;

export type RefineFunction = (request: RefineRequest) => Promise<string>;

/** One row of the language column. */
export interface TranslatableTextLanguage {
	code: string
	name: string
	icon: string
	/** The written language or the fallback: always published, no switch. */
	role?: "primary" | "fallback"
	active: boolean
	stale: boolean
	pending: boolean
}

// The forwarded props leave out the value: the component owns it
export type TranslatableTextareaProps = Omit<TextareaProps, "modelValue" | "defaultValue">;
export type TranslatableSwitchProps = Omit<SwitchProps, "modelValue" | "defaultValue">;
export type TranslatableCheckboxProps = Omit<CheckboxProps, "modelValue" | "defaultValue">;
export type TranslatableInputProps = Omit<InputProps, "modelValue" | "defaultValue">;

export interface STranslatableTextManageOptions {
	slideover?: SlideoverProps
	searchInput?: TranslatableInputProps
	selectAll?: TranslatableCheckboxProps
	/** Applied to every language checkbox; the component adds `data-test-value` with the language code. */
	checkbox?: TranslatableCheckboxProps
	closeButton?: ButtonProps
}

export interface STranslatableTextProps {
	/** The language a new text starts in: the organisation's own. */
	primaryLanguage: string
	/** Every language Manage offers: each product passes its own. */
	availableLanguages: readonly string[]
	/** Called with the languages to translate; the component keeps what is under way and what failed. */
	translate: TranslateFunction
	/** Rewrites the source text. No function, no wand on the source. */
	refine?: RefineFunction
	/** Always published, with a "Fallback" badge, and what an inactive language falls back to. */
	fallbackLanguage?: string
	/** Languages shown before "Show N more". */
	visibleLanguages?: number
	/** Typing pause before the missing languages are translated, in ms. */
	debounce?: number
	disabled?: boolean
	sourceTextarea?: TranslatableTextareaProps
	translationTextarea?: TranslatableTextareaProps
	/** Applied to every language chip; the component adds `data-test-value` with the language code. */
	languageButton?: ButtonProps
	/** Applied to every language switch; the component adds `data-test-value` with the language code. */
	languageSwitch?: TranslatableSwitchProps
	/** `false` hides it: a page with several texts usually keeps one. */
	manageButton?: boolean | ButtonProps
	/** The wand on the translation field: translates that language again, over a hand edit. */
	retranslateButton?: boolean | ButtonProps
	refineButton?: ButtonProps
	updateButton?: ButtonProps
	showMoreButton?: ButtonProps
	retryButton?: ButtonProps
	manage?: STranslatableTextManageOptions
	/** The modal shown when an out-of-date language is switched on. */
	confirm?: ConfirmOptions
	ui?: {
		root?: string
		languages?: string
		content?: string
		label?: string
		note?: string
		hint?: string
	}
}

export interface STranslatableTextSlots {
	/** The label above each textarea. Default: the language name. */
	label?: (props: { language: string, name: string, source: boolean }) => unknown
}

/** What a parent can read, e.g. to wait for the translations before saving. */
export interface STranslatableTextExposed {
	pending: readonly string[]
	failed: readonly string[]
	retry: () => Promise<void>
}
