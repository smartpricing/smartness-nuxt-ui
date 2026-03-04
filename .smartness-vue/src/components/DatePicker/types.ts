import type { HighlightConfig, HighlightFn } from "@vuepic/vue-datepicker";

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
}

// ============================================
// Re-export date-fns Locale for convenience
// ============================================

export type { Locale as DatePickerLocale } from "date-fns";
