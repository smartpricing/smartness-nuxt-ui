import type { MaybeRefOrGetter, Ref } from "vue";
import type { RefineFunction, TranslatableText, TranslatableTextScope, TranslateFunction } from "./types";
import { refDebounced } from "@vueuse/core";
import { computed, readonly, ref, toValue, watch } from "vue";
import { missingTranslations, outdatedTranslations, staleTranslations, textDigest, translationLanguages } from "../../utils/translatable-text";

export interface UseTranslatableTextOptions {
	/** The component's `v-model`: `undefined` is an empty text. */
	model: Ref<TranslatableText | undefined>
	languages: MaybeRefOrGetter<readonly string[]>
	primaryLanguage: MaybeRefOrGetter<string>
	fallbackLanguage: MaybeRefOrGetter<string | undefined>
	translate: MaybeRefOrGetter<TranslateFunction>
	refine: MaybeRefOrGetter<RefineFunction | undefined>
	/** Typing pause before the missing languages are translated, in ms. */
	debounce: MaybeRefOrGetter<number>
}

// --- Edits: each one returns a new text, so the v-model always gets a fresh object ---

const union = (codes: readonly string[], more: readonly string[]) => [...new Set([...codes, ...more])];
const without = (codes: readonly string[], less: readonly string[]) => codes.filter((code) => !less.includes(code));

function withText(value: TranslatableText, code: string, text: string): TranslatableText {
	const texts = { ...value.texts, [code]: text };
	if (code === value.language) return { ...value, texts };
	// A translation typed by hand counts as made from the text as it is now
	return { ...value, texts, digests: { ...value.digests, [code]: textDigest(value.texts[value.language] ?? "") } };
}

function withActive(value: TranslatableText, code: string, on: boolean): TranslatableText {
	const inactive = on ? without(value.inactive ?? [], [code]) : union(value.inactive ?? [], [code]);
	return { ...value, inactive };
}

/**
 * The service's answer in the text, each translation stamped with the text that was sent (the user
 * may have typed on meanwhile). A language edited by hand while the call was under way keeps the
 * hand edit; one that did not come back is reported and keeps what it had.
 */
function withTranslations(
	value: TranslatableText,
	sent: string,
	codes: readonly string[],
	answer: Record<string, string>,
	asked: Record<string, string | undefined>
): { value: TranslatableText, applied: string[], failed: string[] } {
	const texts = { ...value.texts };
	const digests = { ...value.digests };
	const applied: string[] = [];
	const failed: string[] = [];
	for (const code of codes) {
		if (value.texts[code] !== asked[code]) continue;
		const translation = answer[code];
		if (translation?.trim()) {
			texts[code] = translation;
			digests[code] = textDigest(sent);
			applied.push(code);
		} else {
			failed.push(code);
		}
	}
	return { value: { ...value, texts, digests }, applied, failed };
}

/**
 * The translation workflow behind STranslatableText: which languages to translate and when, what is
 * under way, what failed, and how an answer lands in the text without losing a hand edit. The calls
 * themselves are the product's (`translate`, `refine`): nothing here knows about an API.
 */
export function useTranslatableText(options: UseTranslatableTextOptions) {
	const { model } = options;

	const language = computed(() => model.value?.language || toValue(options.primaryLanguage));
	const value = computed<TranslatableText>(() => model.value ?? { language: language.value, texts: {} });
	const scope = computed<TranslatableTextScope>(() => ({
		languages: toValue(options.languages),
		fallbackLanguage: toValue(options.fallbackLanguage)
	}));

	const source = computed(() => value.value.texts[language.value] ?? "");
	const translations = computed(() => translationLanguages(value.value, scope.value));
	const outdated = computed(() => outdatedTranslations(value.value, scope.value));
	const stale = computed(() => staleTranslations(value.value, scope.value));

	const pending = ref<string[]>([]);
	const failed = ref<string[]>([]);
	const refineFailed = ref(false);
	// Texts the AI wrote in this session and nobody edited since: they carry the "review it" note
	const aiWritten = ref<string[]>([]);

	function setText(code: string, text: string) {
		model.value = withText(value.value, code, text);
		aiWritten.value = without(aiWritten.value, [code]);
		failed.value = without(failed.value, [code]);
		if (code === language.value) refineFailed.value = false;
	}

	function setActive(code: string, on: boolean) {
		model.value = withActive(value.value, code, on);
	}

	// A newer call for a language wins over an older one still under way
	let calls = 0;
	const latestCall = new Map<string, number>();

	async function translateLanguages(codes: readonly string[], fresh: boolean) {
		const asking = value.value;
		const text = asking.texts[asking.language] ?? "";
		if (!codes.length || !text.trim()) return;

		const call = ++calls;
		for (const code of codes) latestCall.set(code, call);
		pending.value = union(pending.value, codes);
		failed.value = without(failed.value, codes);
		const asked = Object.fromEntries(codes.map((code) => [code, asking.texts[code]]));

		let answer: Record<string, string> = {};
		try {
			answer = await toValue(options.translate)({ text, from: asking.language, to: [...codes], fresh });
		} catch {
			// Every language of the call failed: reported below, and kept as it was
		}

		const owned = codes.filter((code) => latestCall.get(code) === call);
		if (!owned.length) return;
		pending.value = without(pending.value, owned);
		const result = withTranslations(value.value, text, owned, answer, asked);
		model.value = result.value;
		failed.value = union(failed.value, result.failed);
		aiWritten.value = union(aiWritten.value, result.applied);
	}

	// Missing languages are filled without being asked once typing pauses; the ones under way or
	// failed are left alone (a failure waits for "Try again"). Existing ones only become out of date.
	const settledSource = refDebounced(source, () => toValue(options.debounce));
	const toFill = computed(() => {
		if (!settledSource.value.trim() || settledSource.value !== source.value) return [];
		return without(missingTranslations(value.value, scope.value), [...pending.value, ...failed.value]);
	});
	watch(toFill, (codes) => {
		if (codes.length) translateLanguages(codes, false);
	}, { immediate: true });

	const updateOutdated = () => translateLanguages(outdated.value, true);
	const retranslate = (code: string) => translateLanguages([code], true);
	const retry = () => translateLanguages(failed.value, false);

	async function refineSource() {
		const refine = toValue(options.refine);
		const code = language.value;
		if (!refine || !source.value.trim()) return;
		pending.value = union(pending.value, [code]);
		refineFailed.value = false;
		try {
			const text = await refine({ text: source.value, language: code });
			setText(code, text);
			aiWritten.value = union(aiWritten.value, [code]);
		} catch {
			refineFailed.value = true;
		} finally {
			pending.value = without(pending.value, [code]);
		}
	}

	return {
		language,
		value,
		source,
		translations,
		outdated,
		stale,
		pending: readonly(pending),
		failed: readonly(failed),
		refineFailed: readonly(refineFailed),
		aiWritten: readonly(aiWritten),
		setText,
		setActive,
		updateOutdated,
		retranslate,
		retry,
		refineSource
	};
}
