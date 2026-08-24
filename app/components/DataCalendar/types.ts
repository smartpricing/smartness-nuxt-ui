import type { CalendarDate } from "@internationalized/date";
import type { BadgeProps } from "@nuxt/ui";
import type { InjectionKey, Ref } from "vue";
import type { DataCalendarUi } from "./theme";

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
	/** Optional tags displayed as badges (e.g. in overflow popover) */
	tags?: string[]
	/** Custom HTML attributes to bind on the rendered item element */
	attributes?: Record<string, unknown>
	/** Allow arbitrary extra data */
	[key: string]: unknown
}

/**
 * A row of the row-grouped week view (staff member, resource, status bucket, ...).
 *
 * Rows are fully consumer-owned: the calendar never derives, creates or removes
 * them. It only renders the rows it is given and reports where an item was dropped.
 */
export interface DataCalendarRow {
	/** Unique identifier, matched against the item's resolved row id */
	id: string | number
	/** Main label shown in the sticky row header */
	label: string
	/** Secondary line below the label (e.g. "3 hours", "Drag cards here") */
	description?: string
	/**
	 * Classes painting the whole row — its header and all seven cells — typically a
	 * background setting one row apart from the others (a triage bucket, a team, a
	 * closed resource: the calendar has no opinion on what the row means).
	 *
	 * A row that brings its own background owns it: the today and weekend tints step
	 * aside rather than fight it. The drag-target highlight still wins over everything.
	 */
	class?: string
	/** Hide the row while it holds no item in the visible week */
	hideWhenEmpty?: boolean
	/**
	 * Whether a row hidden by `hideWhenEmpty` comes back while a drag is in progress.
	 *
	 * Defaults to `true`, which keeps an emptied bucket reachable: start dragging any card
	 * and the row reappears as a drop target. Set it to `false` when emptying the row is
	 * meant to be one-way — items may leave it, but must never be sent back.
	 */
	revealOnDrag?: boolean
	/** Refuse drops into this row */
	disableDrop?: boolean
	/** Allow arbitrary extra data (surfaced to the `row-header` slot) */
	[key: string]: unknown
}

/** Resolves which row an item belongs to. Defaults to reading `item.rowId`. */
export type DataCalendarRowResolver = (item: DataCalendarItem) => string | number | null | undefined;

/**
 * Design-only overrides for the cell count badge, forwarded straight to `UBadge`'s
 * `ui` prop. Whether the badge shows at all is `showCellCount`; for anything beyond
 * restyling, replace it through the `cell-header` slot.
 */
export type DataCalendarCellCountUi = BadgeProps["ui"];

/** Legend entry displayed in the header */
export interface DataCalendarLegendItem {
	/** Legend label */
	label: string
	/** Dot color (CSS color) */
	color: string
}

// ============================================
// Attributes
// ============================================

/** Keys for internal calendar elements that can receive custom HTML attributes */
export type DataCalendarAttributeKey
	= | "root" | "header" | "todayButton" | "prevButton" | "nextButton"
		| "dateLabel" | "viewSelector" | "gridContainer" | "weekdayHeader"
		| "cell" | "addButton";

/** Map of element keys to custom HTML attributes */
export type DataCalendarAttributes = Partial<Record<DataCalendarAttributeKey, Record<string, unknown>>>;

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
	/** Row the item was dragged out of. Only set in the row-grouped week view. */
	sourceRow?: DataCalendarRow
	/** Row the item was dropped into. Only set in the row-grouped week view. */
	targetRow?: DataCalendarRow
}

/**
 * Emitted when a drop is refused — today, when the target row sets `disableDrop`.
 *
 * Same shape as `DataCalendarDropEvent`, so a handler can be shared: `targetRow` and
 * `targetDate` describe where the item *would* have landed. The item is left untouched;
 * reacting (a toast, a shake, nothing at all) is entirely up to the consumer.
 */
export type DataCalendarDropDeniedEvent = DataCalendarDropEvent;

/** Emitted when a range of cells is selected by dragging (requires `rangeSelectable`) */
export interface DataCalendarRangeSelectEvent {
	/** Start of the selected range in ISO format "YYYY-MM-DD" (inclusive) */
	fromDate: string
	/** End of the selected range in ISO format "YYYY-MM-DD" (inclusive) */
	toDate: string
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
	/** Whether range selection is enabled */
	rangeSelectable: Ref<boolean>
	/** Whether weekend cells get a highlighted background */
	highlightWeekends: Ref<boolean>
	/** Active range-selection range (ISO "YYYY-MM-DD"), or null when idle */
	rangeSelectionRange: Ref<DataCalendarRangeSelectEvent | null>
	maxVisibleItems: Ref<number | undefined>
	view: Ref<DataCalendarView>
	items: Ref<DataCalendarItem[]>
	/** Rows of the row-grouped week view (empty = classic week view) */
	rows: Ref<DataCalendarRow[]>
	/** Resolves the row id an item belongs to */
	resolveRowId: DataCalendarRowResolver
	/** Show the day-of-month number next to the weekday name in the week header */
	showDayNumbers: Ref<boolean>
	/** Show the item count badge in row-grouped cells */
	showCellCount: Ref<boolean>
	/** Design overrides forwarded to that count badge's `ui` prop */
	cellCountProps: Ref<DataCalendarCellCountUi>
	/** Allow dragging items straight out of the "+N" overflow popover */
	draggableFromPopover: Ref<boolean>
	disableAdd: Ref<((date: string) => boolean) | undefined>
	attributes: Ref<DataCalendarAttributes>
	/** Class overrides merged over the default day-cell background slots */
	ui: Ref<DataCalendarUi>
	onItemClick: (item: DataCalendarItem) => void
	onDateClick: (date: CalendarDate) => void
	onAddClick: (date: CalendarDate) => void
	onItemDrop: (event: DataCalendarDropEvent) => void
	onItemDropDenied: (event: DataCalendarDropDeniedEvent) => void
	/** Begin a range selection from a day cell */
	onRangeSelectPointerDown: (event: PointerEvent, date: CalendarDate) => void
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
