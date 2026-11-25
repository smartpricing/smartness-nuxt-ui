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

/** The languages in play for a text: the organisation's, and the ones it must have (always published). */
export interface TranslatableTextScope {
	languages: readonly string[]
	requiredLanguages?: readonly string[]
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
	/** The written language or a required one: always published, no switch. */
	role?: "primary" | "required"
	active: boolean
	stale: boolean
	pending: boolean
	/** A required language with no text while the source has one. */
	emptyRequired: boolean
}

// The forwarded props leave out the value: the component owns it
export type TranslatableTextareaProps = Omit<TextareaProps, "modelValue" | "defaultValue">;
export type TranslatableSwitchProps = Omit<SwitchProps, "modelValue" | "defaultValue">;
export type TranslatableCheckboxProps = Omit<CheckboxProps, "modelValue" | "defaultValue">;
export type TranslatableInputProps = Omit<InputProps, "modelValue" | "defaultValue">;

/**
 * Internal nodes no prop object reaches, keyed by name. A key that names a repeated node applies the
 * same object to every copy, and the component adds a `data-test-value` telling them apart:
 * - `languages`: the language column
 * - `badge`: the Primary / Required badges, on the chips and in Manage (`data-test-value`: language code); red
 *   on the chip of a required language with no text
 * - `staleIcon`: the out-of-date icons (language code, or `hidden` on "Show N more")
 * - `tooltip`: every tooltip panel (`switch-<code>`, `stale-<code>`, `required-<code>`, `refine`, `retranslate`)
 * - `hint`: the hint above an inactive language
 * - `label`: the textarea labels (`source`, `translation`)
 * - `note`: the AI notes (`refined`, `translated`)
 * - `error`: the message under an empty required translation
 * - `alert`: the failure alerts (`translations`, `refine`); their retry buttons carry the same value
 * - `manageInfo`, `manageEmpty`: the info box and the empty state of Manage
 */
export type TranslatableTextAttributeKey
	= "languages" | "badge" | "staleIcon" | "tooltip" | "hint" | "label" | "note" | "error" | "alert" | "manageInfo" | "manageEmpty";

/** Map of element keys to custom HTML attributes */
export type TranslatableTextAttributes = Partial<Record<TranslatableTextAttributeKey, Record<string, unknown>>>;

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
	/**
	 * Every language Manage offers. Default: `SMARTNESS_LANGUAGES`; a product with its own catalog passes it.
	 * Keeping `v-model:languages` inside this list is the product's job: a language outside it is shown and
	 * translated, but Manage cannot remove it.
	 */
	availableLanguages?: readonly string[]
	/** Called with the languages to translate; the component keeps what is under way and what failed. */
	translate: TranslateFunction
	/** Rewrites the source text. No function, no wand on the source. */
	refine?: RefineFunction
	/**
	 * Languages this text must have, e.g. English on a storefront written in Italian: always translated and
	 * published, no switch, a "Required" badge, locked in Manage. Once the source has a text, an empty one is
	 * flagged and listed in the exposed `emptyRequired`. Guests of a switched-off language read the written one.
	 */
	requiredLanguages?: readonly string[]
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
	/** Applied to both retry buttons; `data-test-value` is `translations` or `refine`. */
	retryButton?: ButtonProps
	manage?: STranslatableTextManageOptions
	/** The modal shown when an out-of-date language is switched on. */
	confirm?: ConfirmOptions
	/**
	 * "Clear all languages", under Manage: empties the text in every language once confirmed. On by
	 * default; `false` hides it, e.g. on a required field.
	 */
	clearAllButton?: boolean | ButtonProps
	/** The confirm modal of "Clear all languages". */
	clearConfirm?: ConfirmOptions
	/** HTML attributes (e.g. `data-testid`) for the internal nodes no prop object reaches. */
	attributes?: TranslatableTextAttributes
	ui?: {
		root?: string
		languages?: string
		content?: string
		label?: string
		note?: string
		error?: string
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
	/** Required languages with no text while the source has one (the ones under way are left out). */
	emptyRequired: readonly string[]
	retry: () => Promise<void>
}
