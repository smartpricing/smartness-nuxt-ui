import type { TranslatableText, TranslatableTextScope } from "../components/TranslatableText/types";
import { countryFlagIcon } from "./countryFlag";

// What a product reads from a `TranslatableText` (STranslatableText's v-model): which languages guests
// see, which translations are out of date. The component uses the same rules, so a backend that
// needs them stays in step with the UI by importing them from `#layers/smartness-nuxt-ui`.

const hasText = (value: TranslatableText) => !!value.texts[value.language]?.trim();

/**
 * A short fingerprint of a text, kept with each translation in `digests`: enough to tell that the
 * text moved on, without a copy of it. FNV-1a, 32 bit, on the trimmed text.
 */
export function textDigest(text: string): string {
	let hash = 0x811C9DC5;
	for (const char of text.trim()) hash = Math.imul(hash ^ (char.codePointAt(0) ?? 0), 0x01000193);
	return (hash >>> 0).toString(16);
}

/**
 * The languages a text is translated into: the required ones first, then the organisation's ones,
 * never the one it is written in. Inactive languages are translated too: switching one on
 * only publishes what is already there.
 */
export function translationLanguages(value: TranslatableText, scope: TranslatableTextScope): string[] {
	return [...new Set([...(scope.requiredLanguages ?? []), ...scope.languages])].filter((code) => code !== value.language);
}

/** The languages switched on: the written one and the required ones always are, the others unless switched off. */
export function activeLanguages(value: TranslatableText, scope: TranslatableTextScope): string[] {
	const inactive = value.inactive ?? [];
	return [value.language, ...translationLanguages(value, scope)].filter((code) =>
		code === value.language || !!scope.requiredLanguages?.includes(code) || !inactive.includes(code)
	);
}

/** Required languages with no text while the source has one: guests of that language would read nothing. */
export function emptyRequiredTranslations(value: TranslatableText, scope: TranslatableTextScope): string[] {
	if (!hasText(value)) return [];
	return translationLanguages(value, scope).filter((code) => !!scope.requiredLanguages?.includes(code) && !value.texts[code]?.trim());
}

/** What guests can read: the active languages that have a text. */
export function publishedLanguages(value: TranslatableText, scope: TranslatableTextScope): string[] {
	return activeLanguages(value, scope).filter((code) => !!value.texts[code]?.trim());
}

/** The per-language texts guests read, e.g. for the payload of a guest-facing page. */
export function publishedTexts(value: TranslatableText, scope: TranslatableTextScope): Record<string, string> {
	return Object.fromEntries(publishedLanguages(value, scope).map((code) => [code, value.texts[code]!]));
}

/**
 * Languages never translated, active or not: the ones the component fills without being asked.
 * A translation emptied by hand is not missing: it stays empty until "Translate again".
 */
export function missingTranslations(value: TranslatableText, scope: TranslatableTextScope): string[] {
	if (!hasText(value)) return [];
	return translationLanguages(value, scope).filter((code) => value.texts[code] === undefined);
}

/**
 * Translations made from another version of the text, active or not: what "Update translations"
 * asks again. Changing the text back clears them, since the digests match again.
 */
export function outdatedTranslations(value: TranslatableText, scope: TranslatableTextScope): string[] {
	if (!hasText(value)) return [];
	const current = textDigest(value.texts[value.language]!);
	return translationLanguages(value, scope).filter((code) => {
		const digest = value.digests?.[code];
		return !!value.texts[code]?.trim() && digest !== undefined && digest !== current;
	});
}

/** The out-of-date translations guests can read: the ones flagged on their chip. */
export function staleTranslations(value: TranslatableText, scope: TranslatableTextScope): string[] {
	const published = publishedLanguages(value, scope);
	return outdatedTranslations(value, scope).filter((code) => published.includes(code));
}

/**
 * The languages Smartness translates into, in the order Manage lists them: STranslatableText's default
 * `availableLanguages`. A product with its own catalog (e.g. from its backend) passes that instead.
 */
export const SMARTNESS_LANGUAGES: readonly string[] = ["en", "it", "es", "fr", "de", "pt", "nl", "pl", "ro", "el", "sv", "ru", "zh", "ja"];

// Language → country for the flag; a regional tag ("pt-BR") uses its own region. Wider than
// SMARTNESS_LANGUAGES: a product may offer languages of its own.
const FLAG_COUNTRY: Record<string, string> = {
	ar: "sa",
	bg: "bg",
	ca: "es-ct",
	cs: "cz",
	da: "dk",
	de: "de",
	el: "gr",
	en: "gb",
	es: "es",
	et: "ee",
	fa: "ir",
	fi: "fi",
	fr: "fr",
	ga: "ie",
	he: "il",
	hi: "in",
	hr: "hr",
	hu: "hu",
	id: "id",
	is: "is",
	it: "it",
	ja: "jp",
	ko: "kr",
	lt: "lt",
	lv: "lv",
	ms: "my",
	nb: "no",
	nl: "nl",
	no: "no",
	pl: "pl",
	pt: "pt",
	ro: "ro",
	ru: "ru",
	sk: "sk",
	sl: "si",
	sr: "rs",
	sv: "se",
	th: "th",
	tr: "tr",
	uk: "ua",
	vi: "vn",
	zh: "cn"
};

const TAG_SEPARATOR = /[-_]/;

/** The `circle-flags` icon for a language code, or a globe when no country stands for it. */
export function languageFlagIcon(code: string): string {
	const [language, region] = code.toLowerCase().split(TAG_SEPARATOR);
	const country = region && region.length === 2 ? region : FLAG_COUNTRY[language ?? ""];
	return country ? countryFlagIcon(country) : "ph:globe";
}
