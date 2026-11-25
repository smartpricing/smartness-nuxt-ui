import type { ButtonProps, TooltipProps } from "@nuxt/ui";
import type { MaybeRefOrGetter, Ref } from "vue";
import type { RefineFunction, TranslatableText, TranslatableTextAttributes, TranslatableTextScope, TranslateFunction } from "./types";
import { refDebounced } from "@vueuse/core";
import { computed, readonly, ref, toValue, watch } from "vue";
import { activeLanguages, emptyRequiredTranslations, missingTranslations, outdatedTranslations, staleTranslations, textDigest, translationLanguages } from "../../utils/translatable-text";

export interface UseTranslatableTextOptions {
	/** The component's `v-model`: `undefined` is an empty text. */
	model: Ref<TranslatableText | undefined>
	languages: MaybeRefOrGetter<readonly string[]>
	primaryLanguage: MaybeRefOrGetter<string>
	requiredLanguages: MaybeRefOrGetter<readonly string[] | undefined>
	translate: MaybeRefOrGetter<TranslateFunction>
	refine: MaybeRefOrGetter<RefineFunction | undefined>
	/** Typing pause before the missing languages are translated, in ms. */
	debounce: MaybeRefOrGetter<number>
	/** A read-only field translates nothing by itself. */
	disabled: MaybeRefOrGetter<boolean>
}

// --- Props of the inner Nuxt UI components, shared by STranslatableText and its parts ---

/** A button prop that also takes `true` / `false` to show or hide the button: the props to bind. */
export const buttonProps = (button: boolean | ButtonProps | undefined): ButtonProps => (typeof button === "object" ? button : {});

/** The tooltip panel is portalled: its attributes travel through UTooltip `content`. */
export const tooltipContent = (attributes: TranslatableTextAttributes | undefined, value: string) =>
	({ ...attributes?.tooltip, "data-test-value": value }) as TooltipProps["content"];

// --- Edits: each one returns a new text, so the v-model always gets a fresh object ---

const union = (codes: readonly string[], more: readonly string[]) => [...new Set([...codes, ...more])];
const without = (codes: readonly string[], less: readonly string[]) => codes.filter((code) => !less.includes(code));

function withText(value: TranslatableText, code: string, text: string): TranslatableText {
	const texts = { ...value.texts, [code]: text };
	if (code === value.language) return { ...value, texts };
	// A translation typed by hand counts as made from the text as it is now
	return { ...value, texts, digests: { ...value.digests, [code]: textDigest(value.texts[value.language] ?? "") } };
}

function withActive(value: TranslatableText, codes: readonly string[], on: boolean): TranslatableText {
	const inactive = on ? without(value.inactive ?? [], codes) : union(value.inactive ?? [], codes);
	return { ...value, inactive };
}

/**
 * The service's answer in the text, each translation stamped with the text that was sent. A language
 * edited by hand while the call was under way keeps the hand edit; one that did not come back is
 * reported and keeps what it had.
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
	// A blank language is a text not written yet, as `undefined` is: the rules read the language it will be written in
	const value = computed<TranslatableText>(() => (model.value ? { ...model.value, language: language.value } : { language: language.value, texts: {} }));
	const scope = computed<TranslatableTextScope>(() => ({
		languages: toValue(options.languages),
		requiredLanguages: toValue(options.requiredLanguages)
	}));

	const source = computed(() => value.value.texts[language.value] ?? "");
	const translations = computed(() => translationLanguages(value.value, scope.value));
	const active = computed(() => activeLanguages(value.value, scope.value));
	const outdated = computed(() => outdatedTranslations(value.value, scope.value));
	const stale = computed(() => staleTranslations(value.value, scope.value));
	// Nothing written in any language, the switched-off ones included: nothing for "Clear all" to do
	const blank = computed(() => Object.values(value.value.texts).every((text) => !text.trim()));

	const pending = ref<string[]>([]);
	const failed = ref<string[]>([]);
	const refineFailed = ref(false);
	// Texts the AI wrote in this session and nobody edited since: they carry the "review it" note
	const aiWritten = ref<string[]>([]);
	// A required language still being translated is not flagged yet
	const emptyRequired = computed(() => without(emptyRequiredTranslations(value.value, scope.value), pending.value));

	function setText(code: string, text: string) {
		model.value = withText(value.value, code, text);
		aiWritten.value = without(aiWritten.value, [code]);
		failed.value = without(failed.value, [code]);
		if (code === language.value) refineFailed.value = false;
	}

	// One write for all the codes: a second write in the same tick would start from the old v-model
	function setActive(codes: readonly string[], on: boolean) {
		model.value = withActive(value.value, codes, on);
	}

	// An AI answer lands only on the text it was made from: one for a source edited, emptied or
	// rewritten meanwhile is dropped (what is missing is asked again once typing pauses)
	const isSource = (sent: string) => source.value.trim() === sent.trim();

	// A newer call for a language wins over an older one still under way
	let calls = 0;
	const latestCall = new Map<string, number>();
	// Each "Clear all" starts a round: an answer asked for before it is dropped, even once a new text is typed
	let round = 0;

	async function translateLanguages(codes: readonly string[], fresh: boolean) {
		const asking = value.value;
		const text = asking.texts[asking.language] ?? "";
		if (!codes.length || !text.trim()) return;

		const call = ++calls;
		const started = round;
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

		if (started !== round) return;
		const owned = codes.filter((code) => latestCall.get(code) === call);
		if (!owned.length) return;
		pending.value = without(pending.value, owned);
		if (!isSource(text)) return;
		const result = withTranslations(value.value, text, owned, answer, asked);
		model.value = result.value;
		failed.value = union(failed.value, result.failed);
		aiWritten.value = union(aiWritten.value, result.applied);
	}

	// Missing languages are filled without being asked once typing pauses; the ones under way or
	// failed are left alone (a failure waits for "Try again"). Existing ones only become out of date.
	const settledSource = refDebounced(source, () => toValue(options.debounce));
	const toFill = computed(() => {
		if (toValue(options.disabled) || !settledSource.value.trim() || settledSource.value !== source.value) return [];
		return without(missingTranslations(value.value, scope.value), [...pending.value, ...failed.value]);
	});
	watch(toFill, (codes) => {
		if (codes.length) translateLanguages(codes, false);
	}, { immediate: true });

	// A language the organisation stops managing leaves nothing under way or failed behind: its late
	// answer is dropped. Once added again it is translated at once: a missing one like any other, one
	// that kept a translation of an older text from before is asked again
	watch(translations, (codes, previous) => {
		const gone = [...pending.value, ...failed.value].filter((code) => code !== language.value && !codes.includes(code));
		if (gone.length) {
			for (const code of gone) latestCall.delete(code);
			pending.value = without(pending.value, gone);
			failed.value = without(failed.value, gone);
		}
		const back = without(codes, previous).filter((code) => outdated.value.includes(code));
		if (back.length && !toValue(options.disabled)) translateLanguages(back, true);
	});

	const updateOutdated = () => translateLanguages(outdated.value, true);
	const retranslate = (code: string) => translateLanguages([code], true);
	const retry = () => translateLanguages(failed.value, false);

	async function refineSource() {
		const refine = toValue(options.refine);
		const code = language.value;
		const sent = source.value;
		if (!refine || !sent.trim()) return;
		const started = round;
		pending.value = union(pending.value, [code]);
		refineFailed.value = false;
		try {
			const text = await refine({ text: sent, language: code });
			if (started !== round || !isSource(sent)) return;
			setText(code, text);
			aiWritten.value = union(aiWritten.value, [code]);
		} catch {
			if (started === round) refineFailed.value = true;
		} finally {
			if (started === round) pending.value = without(pending.value, [code]);
		}
	}

	/**
	 * Empties the text in every language at once. The language it is written in and the ones switched
	 * off stay: they are settings, not text. What is under way is dropped and failures are forgotten.
	 */
	function clearAll() {
		round += 1;
		latestCall.clear();
		pending.value = [];
		failed.value = [];
		refineFailed.value = false;
		aiWritten.value = [];
		model.value = { ...value.value, texts: {}, digests: {} };
	}

	return {
		language,
		value,
		source,
		translations,
		active,
		outdated,
		stale,
		blank,
		emptyRequired,
		pending: readonly(pending),
		failed: readonly(failed),
		refineFailed: readonly(refineFailed),
		aiWritten: readonly(aiWritten),
		setText,
		setActive,
		updateOutdated,
		retranslate,
		retry,
		refineSource,
		clearAll
	};
}
