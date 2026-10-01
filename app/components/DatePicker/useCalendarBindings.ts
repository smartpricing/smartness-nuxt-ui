import type { DateValue } from "@internationalized/date";
import type { SDateInputBaseProps } from "./types";
import { computed } from "vue";
import { useDateLocale } from "../../composables/useDateLocale";
import { useViewport } from "../../composables/useViewport";
import { toDateValue } from "../../utils/date";

type CalendarBindingProps = Pick<SDateInputBaseProps, "locale" | "minValue" | "maxValue" | "isDateDisabled" | "isDateUnavailable" | "weekStartsOn" | "numberOfMonths" | "calendarProps">;

/**
 * What every layer picker hands to its `UCalendar` (and the segments input):
 * resolved locale, parsed bounds, disabled/unavailable predicates, first weekday,
 * one month on mobile, `data-testid`s on the navigation buttons.
 *
 * A composable rather than a wrapper component: `UCalendar` is generic over
 * `range`/`multiple`, so a wrapper would have to re-type its model and events.
 *
 *   const { calendarBindings, dateLocale, minDate, maxDate } = useCalendarBindings(props, "date-picker");
 *   <UCalendar v-bind="calendarBindings" v-model="value" />
 */
export const useCalendarBindings = (props: CalendarBindingProps, testIdPrefix: string) => {
	const { isMobile } = useViewport();
	const dateLocale = useDateLocale(() => props.locale);
	const minDate = computed(() => toDateValue(props.minValue));
	const maxDate = computed(() => toDateValue(props.maxValue));

	const calendarBindings = computed(() => ({
		...props.calendarProps,
		locale: dateLocale.value,
		minValue: minDate.value,
		maxValue: maxDate.value,
		isDateDisabled: props.isDateDisabled,
		isDateUnavailable: props.isDateUnavailable,
		weekStartsOn: props.weekStartsOn,
		numberOfMonths: isMobile.value ? 1 : props.numberOfMonths,
		prevMonth: { "data-testid": `${testIdPrefix}-prev-period-button` },
		nextMonth: { "data-testid": `${testIdPrefix}-next-period-button` },
		prevYear: { "data-testid": `${testIdPrefix}-prev-year-button` },
		nextYear: { "data-testid": `${testIdPrefix}-next-year-button` }
	}));

	/** Typed input: a disabled date reads as unavailable (invalid) instead of being silently accepted. */
	const isInputDateUnavailable = (date: DateValue) =>
		Boolean(props.isDateUnavailable?.(date) || props.isDateDisabled?.(date));

	return { calendarBindings, dateLocale, minDate, maxDate, isInputDateUnavailable };
};
