import type { CalendarDate } from "@internationalized/date";
import type { Ref } from "vue";
import type { DataCalendarRangeSelectEvent } from "./types";
import { useEventListener } from "@vueuse/core";

export interface CalendarRangeSelectOptions {
	/** Whether range selection is enabled */
	enabled: Ref<boolean>
	/** Callback fired when a range selection completes, with the release point in viewport coords */
	onSelectEnd: (range: DataCalendarRangeSelectEvent, point: { x: number, y: number }) => void
}

export interface CalendarRangeSelectState {
	/** Whether a selection drag is currently in progress */
	isSelecting: Ref<boolean>
	/** The current inclusive selection range (ISO "YYYY-MM-DD"), or null when idle */
	range: Ref<DataCalendarRangeSelectEvent | null>
	/** Start a selection from a cell */
	onPointerDown: (event: PointerEvent, date: CalendarDate) => void
	/** Clear the current selection (e.g. after the contextual menu closes) */
	clear: () => void
}

/** Distance in px the pointer must travel before a press is treated as a drag */
const DRAG_THRESHOLD = 4;

/**
 * Composable for pointer-based range selection across calendar cells.
 *
 * On pointer down over a day cell it records the start date, then resolves the
 * date under the cursor on every move via `document.elementFromPoint` reading
 * the `data-date` attribute each cell exposes. The result is an inclusive ISO
 * date range (start..current, normalized) that callers highlight while the drag
 * is active. On pointer up, if the gesture qualified as a drag, `onSelectEnd`
 * fires with the range and the release coordinates so a menu can be anchored
 * there. The range stays set until `clear()` is called.
 *
 * Window listeners are wired once via VueUse's `useEventListener` (auto-cleanup
 * on scope dispose) and short-circuit while no drag is active.
 */
export function useCalendarRangeSelect(options: CalendarRangeSelectOptions): CalendarRangeSelectState {
	const isSelecting = ref(false);
	const range = ref<DataCalendarRangeSelectEvent | null>(null);

	let startISO: string | null = null;
	let currentISO: string | null = null;
	let moved = false;
	let startX = 0;
	let startY = 0;

	function normalize(a: string, b: string): DataCalendarRangeSelectEvent {
		return a <= b ? { fromDate: a, toDate: b } : { fromDate: b, toDate: a };
	}

	function dateUnderPointer(x: number, y: number): string | null {
		const el = document.elementFromPoint(x, y);
		const cell = el?.closest<HTMLElement>("[data-date]");
		return cell?.dataset.date ?? null;
	}

	function onPointerDown(event: PointerEvent, date: CalendarDate) {
		if (!options.enabled.value) return;
		// Primary button only
		if (event.button !== 0) return;
		// Ignore drags started on interactive controls (add button, links, etc.)
		if ((event.target as HTMLElement).closest("button, a, [role='button']")) return;

		startISO = date.toString();
		currentISO = startISO;
		moved = false;
		startX = event.clientX;
		startY = event.clientY;
		isSelecting.value = true;
		range.value = normalize(startISO, currentISO);
	}

	useEventListener("pointermove", (event: PointerEvent) => {
		if (!isSelecting.value || !startISO) return;

		if (!moved && Math.hypot(event.clientX - startX, event.clientY - startY) > DRAG_THRESHOLD) {
			moved = true;
		}

		const iso = dateUnderPointer(event.clientX, event.clientY);
		if (iso) {
			currentISO = iso;
			range.value = normalize(startISO, currentISO);
		}
	});

	useEventListener("pointerup", (event: PointerEvent) => {
		if (!isSelecting.value) return;

		const didSelect = startISO !== null && (moved || currentISO !== startISO);
		isSelecting.value = false;

		if (didSelect && range.value) {
			// Keep the range highlighted; the caller clears it once the menu closes.
			options.onSelectEnd(range.value, { x: event.clientX, y: event.clientY });
		} else {
			range.value = null;
		}

		startISO = null;
		currentISO = null;
		moved = false;
	});

	function clear() {
		range.value = null;
	}

	return {
		isSelecting,
		range,
		onPointerDown,
		clear
	};
}
