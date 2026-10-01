import type { DateValue, Time } from "@internationalized/date";
import type { Ref } from "vue";
import type { DateBound, DateRangePreset } from "../components/DatePicker/types";
import {
	CalendarDate,
	DateFormatter,
	endOfMonth,
	getDayOfWeek,
	getLocalTimeZone,
	parseAbsolute,
	parseDate,
	parseDateTime,
	parseTime,
	startOfMonth,
	startOfWeek,
	today
} from "@internationalized/date";
import { tryUseNuxtApp } from "#app";

// Locale

/**
 * Every Smartness product reads bare English as British: `"en"` alone makes
 * `Intl` fall back to en-US, which swaps day and month (MM/DD/YYYY).
 */
export const DEFAULT_DATE_LOCALE = "en-GB";

export const normalizeDateLocale = (locale: string): string =>
	locale.toLowerCase() === "en" ? DEFAULT_DATE_LOCALE : locale;

interface I18nLocaleObject {
	code: string
	language?: string
}

/** The slice of the `@nuxtjs/i18n` global composer the date locale needs — the layer does not depend on the module. */
interface I18nLike {
	locale: Ref<string>
	locales: Ref<(string | I18nLocaleObject)[]>
}

/**
 * BCP 47 tag of the active `@nuxtjs/i18n` locale (its `language`, else its `code`),
 * or `undefined` when the consumer does not use the module or the call happens
 * outside a Nuxt context. Reactive when read inside a computed.
 */
export const getI18nDateLocale = (): string | undefined => {
	const i18n = tryUseNuxtApp()?.$i18n as I18nLike | undefined;
	if (!i18n?.locale) return undefined;
	const code = i18n.locale.value;
	const current = i18n.locales.value.find((l) => (typeof l === "string" ? l : l.code) === code);
	return typeof current === "object" && current.language ? current.language : code;
};

/** Explicit locale, else the app's `@nuxtjs/i18n` locale, else en-GB — always normalized. */
export const resolveDateLocale = (locale?: string): string =>
	normalizeDateLocale(locale || getI18nDateLocale() || DEFAULT_DATE_LOCALE);

/** 12 or 24, as the locale writes clock times. */
export const getHourCycle = (locale: string): 12 | 24 => {
	try {
		const { hourCycle } = new Intl.DateTimeFormat(locale, { hour: "numeric" }).resolvedOptions();
		return hourCycle === "h12" || hourCycle === "h11" ? 12 : 24;
	} catch {
		return 24;
	}
};

// Today

export const getTodayCalendarDate = (): CalendarDate => {
	return today(getLocalTimeZone());
};

export const getTodayString = (): string => {
	return getTodayCalendarDate().toString();
};

// Formatting

const formatPresets = {
	date: { day: "2-digit", month: "2-digit", year: "numeric" },
	dateShort: { day: "2-digit", month: "2-digit", year: "2-digit" },
	dateTime: { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit", hourCycle: "h23" },
	dateTimeFull: { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit", second: "2-digit", hourCycle: "h23" },
	time: { hour: "2-digit", minute: "2-digit", hourCycle: "h23" },
	timeFull: { hour: "2-digit", minute: "2-digit", second: "2-digit", hourCycle: "h23" },
	monthDayYearTime: { month: "short", day: "numeric", year: "numeric", hour: "2-digit", minute: "2-digit", hourCycle: "h23" },
	monthDayTime: { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit", hourCycle: "h23" },
	monthDayYear: { month: "short", day: "2-digit", year: "numeric" },
	monthYear: { month: "long", year: "numeric" }
} as const satisfies Record<string, Intl.DateTimeFormatOptions>;

export type FormatPreset = keyof typeof formatPresets;

const TIMEZONE_OFFSET_RE = /[+-]\d{2}:\d{2}$/;

/**
 * Format a date with one of the shared presets. Strings may be a date
 * ("2024-01-15"), a local datetime ("2024-01-15 10:30[:00]" or with `T`) or an
 * absolute one (trailing `Z` or offset), which is shown in local wall time.
 */
export const formatDate = (
	value: DateValue | Date | string,
	preset: FormatPreset,
	locale?: string
): string => {
	const formatter = new DateFormatter(resolveDateLocale(locale), formatPresets[preset]);
	const tz = getLocalTimeZone();

	if (typeof value === "string") {
		const normalized = value.replace(" ", "T");
		const nativeDate = normalized.endsWith("Z") || TIMEZONE_OFFSET_RE.test(normalized)
			? parseAbsolute(normalized, tz).toDate()
			: parseDateTime(normalized).toDate(tz);
		return formatter.format(nativeDate);
	}

	if (value instanceof Date) {
		return formatter.format(value);
	}

	return formatter.format(value.toDate(tz));
};

/** Localized "HH:mm[:ss]" — `undefined` for an empty value. */
export const formatTime = (time: string | null | undefined, locale?: string) => {
	if (!time) return undefined;
	return formatDate(`${getTodayString()}T${time}`, "time", locale);
};

/** Localized duration from minutes, units and plurals handled natively. */
export const formatDuration = (minutes: number, locale?: string) => {
	if (!minutes) return undefined;
	return new Intl.DurationFormat(resolveDateLocale(locale), { style: "short" }).format({
		hours: Math.floor(minutes / 60),
		minutes: minutes % 60
	});
};

// CalendarDate <-> string

export const stringToCalendarDate = (dateString: string): CalendarDate => {
	return parseDate(dateString);
};

export const calendarDateToString = (calendarDate: CalendarDate): string => {
	return calendarDate.toString();
};

/** Like `parseDate`, but `undefined` instead of throwing on an empty or partial value. */
export const safeParseDate = (value: string | null | undefined): CalendarDate | undefined => {
	if (!value) return undefined;
	try {
		return parseDate(value);
	} catch {
		return undefined;
	}
};

/** ISO strings are parsed (an invalid one becomes `undefined`), date values pass through. */
export const toDateValue = (value: DateBound | null | undefined): DateValue | undefined =>
	typeof value === "string" ? safeParseDate(value) : value ?? undefined;

/**
 * Dates a relative preset spans, from `from` (today by default): past presets
 * end there, future ones start there. `months: 0` is the current month up to
 * (or from) that day; a preset without units is that day alone.
 */
export const resolveDateRangePreset = (
	preset: Omit<DateRangePreset, "label">,
	from: CalendarDate = getTodayCalendarDate()
): { start: CalendarDate, end: CalendarDate } => {
	const isFuture = preset.direction === "future";

	if (preset.months === 0) {
		return isFuture ? { start: from, end: endOfMonth(from) } : { start: startOfMonth(from), end: from };
	}

	const duration = preset.days !== undefined
		? { days: preset.days }
		: preset.months !== undefined
			? { months: preset.months }
			: { years: preset.years ?? 0 };

	return isFuture
		? { start: from, end: from.add(duration) }
		: { start: from.subtract(duration), end: from };
};

// CalendarDate <-> native Date

export const dateToCalendarDate = (date: Date): CalendarDate => {
	return new CalendarDate(
		date.getFullYear(),
		date.getMonth() + 1,
		date.getDate()
	);
};

export const calendarDateToDate = (calendarDate: CalendarDate): Date => {
	return new Date(
		calendarDate.year,
		calendarDate.month - 1,
		calendarDate.day
	);
};

export const isoDate = (date: Date): string =>
	dateToCalendarDate(date).toString();

// Day difference (exact, via Julian day number — no native Date or time zone)

export const differenceInDays = (start: CalendarDate, end: CalendarDate): number =>
	end.calendar.toJulianDay(end) - start.calendar.toJulianDay(start);

export const calculateNights = (startDate: string, endDate: string): number => {
	return differenceInDays(parseDate(startDate), parseDate(endDate));
};

// Seven-day range: the ISO week (Monday to Sunday) containing the date, or the seven days starting at the date itself — the locale is irrelevant once the first day is forced
export const getWeekRange = (dateString: string, anchor: "week-start" | "from-selection") => {
	const start = anchor === "from-selection" ? stringToCalendarDate(dateString) : startOfWeek(stringToCalendarDate(dateString), "en-GB", "mon");
	return { from: calendarDateToString(start), to: calendarDateToString(start.add({ days: 6 })) };
};

const WEEKDAY_CODES = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"] as const;

export const dayOfWeekCode = (dateString: string) => WEEKDAY_CODES[getDayOfWeek(stringToCalendarDate(dateString), "en-GB", "sun")]!;

// "HH:mm[:ss]" <-> Time (parseTime throws on invalid strings like "--:--")

export const stringToTime = (value: string | null | undefined): Time | undefined => {
	if (!value) return undefined;
	try {
		return parseTime(value);
	} catch {
		return undefined;
	}
};

export const timeToString = (time: Time | undefined) => time?.toString();
