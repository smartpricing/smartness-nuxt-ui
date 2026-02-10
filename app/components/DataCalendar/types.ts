import type { CalendarDate } from "@internationalized/date";
import type { InjectionKey, Ref } from "vue";

// ============================================
// View Types
// ============================================

/** Available calendar view modes */
export type DataCalendarView = "month" | "week";

/** First day of week - matches @internationalized/date DayOfWeek */
export type DataCalendarDayOfWeek = "sun" | "mon" | "tue" | "wed" | "thu" | "fri" | "sat";

// ============================================
// Data Types
// ============================================

/** A single calendar event item */
export interface DataCalendarItem {
	/** Unique identifier */
	id: string | number
	/** Start date in ISO format "YYYY-MM-DD" (inclusive) */
	fromDate: string
	/** End date in ISO format "YYYY-MM-DD" (inclusive). Defaults to fromDate if omitted. */
	toDate?: string
	/** Display label */
	label: string
	/** Optional color (CSS color value: hex, rgb, or hsl) */
	color?: string
	/** Allow arbitrary extra data */
	[key: string]: unknown
}

/** Legend entry displayed in the header */
export interface DataCalendarLegendItem {
	/** Legend label */
	label: string
	/** Dot color (CSS color) */
	color: string
}

// ============================================
// Layout Types
// ============================================

/** A positioned segment of an event within a single week row */
export interface PositionedSegment {
	/** The original calendar item */
	item: DataCalendarItem
	/** 0-based column index where this segment starts in the row */
	startCol: number
	/** Number of columns this segment spans */
	spanCols: number
	/** Vertical lane index (0 = top lane, 1 = second lane, ...) */
	lane: number
	/** Whether this segment is a continuation from a previous row */
	isContinuation: boolean
	/** Whether this segment continues into the next row */
	continuesAfter: boolean
}

/** A week row with its days and positioned event segments */
export interface WeekRow {
	/** The 7 days in this week row */
	days: { date: CalendarDate, isOtherMonth: boolean }[]
	/** Positioned event segments for this row */
	segments: PositionedSegment[]
	/** Total number of lanes used in this row */
	laneCount: number
}

// ============================================
// Event Types
// ============================================

/** Emitted when an item is dragged to a different date */
export interface DataCalendarDropEvent {
	/** The item that was dragged */
	item: DataCalendarItem
	/** Source date in ISO format "YYYY-MM-DD" (the date the drag started from) */
	sourceDate: string
	/** Target date in ISO format "YYYY-MM-DD" (the date the item was dropped on) */
	targetDate: string
	/** Number of days the event was shifted */
	dayDelta: number
}

// ============================================
// Injection Keys
// ============================================

/** Context provided by SDataCalendar to child components */
export interface DataCalendarContext {
	locale: Ref<string>
	timezone: Ref<string>
	translationLocale: Ref<DataCalendarLocale>
	currentDate: Ref<CalendarDate>
	todayDate: Ref<CalendarDate>
	draggable: Ref<boolean>
	maxVisibleItems: Ref<number>
	view: Ref<DataCalendarView>
	items: Ref<DataCalendarItem[]>
	disableAdd: Ref<((date: string) => boolean) | undefined>
	onItemClick: (item: DataCalendarItem) => void
	onDateClick: (date: CalendarDate) => void
	onAddClick: (date: CalendarDate) => void
	onItemDrop: (event: DataCalendarDropEvent) => void
	firstDayOfWeek: Ref<DataCalendarDayOfWeek | undefined>
}

export const DATA_CALENDAR_CONTEXT: InjectionKey<DataCalendarContext> = Symbol("DATA_CALENDAR_CONTEXT");

// ============================================
// Translations
// ============================================

export const dataCalendarTranslations = {
	en: {
		today: "Today",
		month: "Month",
		week: "Week",
		more: "+{count}"
	},
	it: {
		today: "Oggi",
		month: "Mese",
		week: "Settimana",
		more: "+{count}"
	},
	de: {
		today: "Heute",
		month: "Monat",
		week: "Woche",
		more: "+{count}"
	},
	es: {
		today: "Hoy",
		month: "Mes",
		week: "Semana",
		more: "+{count}"
	}
} as const;

export type DataCalendarLocale = keyof typeof dataCalendarTranslations;
