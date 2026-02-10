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
	/** Date in ISO format "YYYY-MM-DD" */
	date: string
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
// Event Types
// ============================================

/** Emitted when an item is dragged to a different date */
export interface DataCalendarDropEvent {
	/** The item that was dragged */
	item: DataCalendarItem
	/** Source date in ISO format "YYYY-MM-DD" */
	fromDate: string
	/** Target date in ISO format "YYYY-MM-DD" */
	toDate: string
}

// ============================================
// Injection Keys
// ============================================

/** Context provided by UDataCalendar to child components */
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
