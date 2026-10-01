import type { DateValue } from "@internationalized/date";
import type { CalendarProps, InputDateProps, PopoverProps } from "@nuxt/ui";
import type { HighlightConfig, HighlightFn } from "@vuepic/vue-datepicker";

// ---------------------------------------------------------------------------
// SDatePicker / SRangeDatePicker
// ---------------------------------------------------------------------------

/** A date bound: an ISO "YYYY-MM-DD" string or any `@internationalized/date` value. */
export type DateBound = DateValue | string;

/** First day of the week, 0 = Sunday … 6 = Saturday. */
export type WeekStartsOn = 0 | 1 | 2 | 3 | 4 | 5 | 6;

/** Props shared by the single and the range date picker. */
export interface SDateInputBaseProps {
	/**
	 * BCP 47 locale for segments and calendar. Leave it out: it is inferred from the
	 * active `@nuxtjs/i18n` locale, then from `<UApp :locale>`; bare "en" reads as en-GB.
	 */
	locale?: string
	minValue?: DateBound
	maxValue?: DateBound
	isDateDisabled?: (date: DateValue) => boolean
	isDateUnavailable?: (date: DateValue) => boolean
	disabled?: boolean
	readonly?: boolean
	/** Clear button inside the input while it has a value. */
	clearable?: boolean
	/** Calendar popover button inside the input. */
	calendar?: boolean
	/** Close the popover once a full value is picked in the calendar. */
	closeOnSelect?: boolean
	/** Icon of the calendar button. */
	icon?: string
	size?: InputDateProps["size"]
	color?: InputDateProps["color"]
	variant?: InputDateProps["variant"]
	highlight?: boolean
	weekStartsOn?: WeekStartsOn
	numberOfMonths?: number
	/** Popover content placement. */
	content?: PopoverProps["content"]
	/** Any other `UCalendar` prop (week numbers, fixed weeks, month/year controls, view type…). */
	calendarProps?: Omit<CalendarProps, "modelValue" | "defaultValue" | "range" | "multiple" | "minValue" | "maxValue" | "isDateDisabled" | "isDateUnavailable" | "numberOfMonths" | "weekStartsOn" | "locale">
	ui?: {
		input?: InputDateProps["ui"]
		calendar?: CalendarProps["ui"]
		/** Popover body wrapping the calendar. */
		content?: string
	}
}

export interface SDatePickerProps extends SDateInputBaseProps {
	/** "Today" shortcut under the calendar. */
	withToday?: boolean
}

/** Sidebar segment a preset belongs to. */
export type DateRangePresetDirection = "past" | "future";

/**
 * A range relative to today, offered in the range picker sidebar. Set one unit:
 * past presets end today, future ones start today.
 */
export interface DateRangePreset {
	label: string
	/** `0` = today only. */
	days?: number
	/** `0` = the current month up to today (past) or from today to its end (future). */
	months?: number
	years?: number
	/** Segment the preset is listed in. Defaults to `"past"`. */
	direction?: DateRangePresetDirection
}

export interface SRangeDatePickerProps extends SDateInputBaseProps {
	/**
	 * Preset sidebar in the popover: `true` lists both segments, `"past"` or
	 * `"future"` only that one. "Custom range" always comes first.
	 */
	showPresets?: boolean | DateRangePresetDirection
	/**
	 * Extra presets, merged into their segment and sorted by length. One spanning
	 * the same dates as a built-in preset replaces it.
	 */
	presets?: DateRangePreset[]
	/** Keep the built-in presets (five per segment); `false` lists only `presets`. */
	defaultPresets?: boolean
	/** Commit typed dates on focus out instead of on every keystroke. */
	lazy?: boolean
}

/** Span the navigator steps through: one day, or seven days. */
export type DateNavigatorPeriod = "day" | "week";

export interface SDateNavigatorProps {
	/** BCP 47 locale for the label and the calendar, inferred like the pickers'. */
	locale?: string
	/** `"week"` labels the seven-day range and steps by seven days. */
	period?: DateNavigatorPeriod
	/**
	 * Where the week starts: the ISO week containing the date (`"week-start"`),
	 * or the date itself (`"from-selection"`). Only with `period: "week"`.
	 */
	weekAnchor?: "week-start" | "from-selection"
	/** "Today" button before the arrows, disabled while on today. */
	todayButton?: boolean
	/** Replaces the default label (today / the date / the week range). */
	format?: (date: string) => string
	minValue?: DateBound
	maxValue?: DateBound
	isDateDisabled?: (date: DateValue) => boolean
	disabled?: boolean
	weekStartsOn?: WeekStartsOn
	content?: PopoverProps["content"]
	calendarProps?: SDateInputBaseProps["calendarProps"]
}

// ---------------------------------------------------------------------------
// SDatePickerOld (deprecated — kept until consumers migrate to SDatePicker)
// ---------------------------------------------------------------------------

// ============================================
// Model Value Types
// ============================================

/** Range model value: { start: string; end: string | null } */
export interface DatePickerRangeValue {
	/** Start date in ISO format "YYYY-MM-DD" */
	start: string
	/** End date in ISO format "YYYY-MM-DD", null if partial range */
	end: string | null
}

/** Union of all possible v-model value types */
export type DatePickerValue = string | DatePickerRangeValue | string[] | null;
/** DatePicker selection mode */
export type DatePickerMode = "single" | "range" | "multiple";

// ============================================
// Marker & Preset Types
// ============================================

/** Marker displayed on a specific date in the calendar */
export interface DatePickerMarker {
	/** Date to place the marker on */
	date: Date | string
	/** Marker visual type */
	type?: "dot" | "line"
	/** Tooltip(s) shown on hover */
	tooltip?: { text: string, color?: string }[]
	/** Marker color (any valid CSS color) */
	color?: string
}

/** Preset date entry for the sidebar */
export interface DatePickerPresetDate {
	/** Display label */
	label: string
	/** Preset value (date or date range) */
	value: Date[] | string[] | Date | string
	/** Optional inline styles */
	style?: Record<string, string>
	/** Optional custom slot name */
	slot?: string
}

// ============================================
// Configuration Types
// ============================================

/** Range selection configuration (mirrors VueDatePicker RangeConfig) */
export interface DatePickerRangeConfig {
	/** Prevent range selection if disabled dates are within */
	noDisabledRange?: boolean
	/** Keep calendar on the last selected date */
	showLastInRange?: boolean
	/** Allow selecting only one date in range mode */
	partialRange?: boolean
	/** Lock the start date, only allow adjusting end */
	fixedStart?: boolean
	/** Lock the end date, only allow adjusting start */
	fixedEnd?: boolean
	/** Maximum number of days in the range */
	maxRange?: string | number
	/** Minimum number of days in the range */
	minRange?: string | number
	/** Automatically select a range of N days */
	autoRange?: string | number
}

/** Format configuration for displayed values */
export interface DatePickerFormats {
	/** Month name format in overlay (date-fns token) */
	month?: string
	/** Year format in overlay (date-fns token) */
	year?: string
	/** Week day name format in calendar header (date-fns token) */
	weekDay?: string
	/** Day format in calendar cells (date-fns token) */
	day?: string
	/** Input display format - string token or custom function */
	input?: string | ((date: Date) => string) | ((dates: Date[]) => string)
	/** Preview format in the action row - string token or custom function */
	preview?: string | ((date: Date) => string) | ((dates: Date[]) => string)
}

/** Flow configuration for step-by-step selection */
export interface DatePickerFlowConfig {
	/** Selection steps in order */
	steps: ("month" | "year" | "calendar" | "time" | "minutes" | "hours" | "seconds")[]
	/** Allow partial flow (auto-apply before last step) */
	partial?: boolean
}

/** Highlight configuration for marking special dates (matches VueDatePicker types) */
export type DatePickerHighlight = HighlightFn | Partial<HighlightConfig>;

// ============================================
// Component Style Types
// ============================================

/** Component color options (matches Nuxt UI Calendar colors) */
export type DatePickerColor = "primary" | "secondary" | "success" | "info" | "warning" | "error" | "neutral";

/** Component size options (matches Nuxt UI Calendar sizes) */
export type DatePickerSize = "xs" | "sm" | "md" | "lg" | "xl";

/** CSS class overrides for component parts */
export interface DatePickerUi {
	/** Root wrapper element */
	root?: string
	/** Input element */
	input?: string
	/** Calendar popup container */
	calendar?: string
	/** UPopover content container */
	popover?: string
}

// ============================================
// Attributes Types
// ============================================

/** Keys for internal date picker elements that can receive custom HTML attributes */
export type DatePickerAttributeKey
	= "root" | "input" | "triggerWrapper" | "popover" | "calendar" | "clearButton";

/** Map of element keys to custom HTML attributes */
export type DatePickerAttributes = Partial<Record<DatePickerAttributeKey, Record<string, unknown>>>;

// ============================================
// Re-export date-fns Locale for convenience
// ============================================

export type { Locale as DatePickerLocale } from "date-fns";
