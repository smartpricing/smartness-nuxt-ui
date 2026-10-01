import type { MaybeRefOrGetter } from "vue";
import { useLocale } from "@nuxt/ui/composables";
import { computed, toValue } from "vue";
import { getI18nDateLocale, normalizeDateLocale } from "../utils/date";

/**
 * BCP 47 locale for date and time inputs, inferred from the app so consumers
 * never have to pass it:
 *
 *   1. the explicit `locale` (a component prop), when set;
 *   2. the active `@nuxtjs/i18n` locale's `language` (e.g. "it-IT", "en-GB");
 *   3. the `<UApp :locale>` code (e.g. "it").
 *
 * Bare "en" always becomes "en-GB" — see `DEFAULT_DATE_LOCALE`.
 *
 *   const dateLocale = useDateLocale(() => props.locale);
 */
export const useDateLocale = (locale?: MaybeRefOrGetter<string | undefined>) => {
	const { locale: uiLocale } = useLocale();

	return computed(() => normalizeDateLocale(
		toValue(locale) || getI18nDateLocale() || uiLocale.value.code
	));
};
