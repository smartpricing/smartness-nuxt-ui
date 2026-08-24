import { tv } from "@nuxt/ui/utils/tv";

/**
 * Day-cell background tints, shared by the classic and row-grouped grids.
 * Consumers override single slots through the calendar's `ui` prop; overrides
 * are merged over these defaults, like the other tv-based S components.
 */
export const dataCalendarTheme = {
	slots: {
		cell: "bg-white",
		cellToday: "bg-primary-50/50",
		cellWeekend: "bg-(--color-lemon-50)"
	}
};

export const dataCalendarTv = tv(dataCalendarTheme);

/** Class overrides for the day-cell background slots */
export type DataCalendarUi = Partial<Record<keyof typeof dataCalendarTheme.slots, string>>;
