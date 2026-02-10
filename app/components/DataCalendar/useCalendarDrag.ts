import type { Ref } from "vue";
import type { DataCalendarDropEvent, DataCalendarItem } from "./types";

export interface CalendarDragOptions {
	/** Whether drag is enabled */
	enabled: Ref<boolean>
	/** Reference to the grid container element */
	gridRef: Ref<HTMLElement | null>
	/** Number of columns (always 7) */
	columnCount?: number
	/** Number of rows visible in the grid */
	rowCount: Ref<number>
	/** Callback when an item is dropped */
	onDrop: (event: DataCalendarDropEvent) => void
}

export interface CalendarDragState {
	/** Whether a drag is currently in progress */
	isDragging: Ref<boolean>
	/** The item currently being dragged */
	draggedItem: Ref<DataCalendarItem | null>
	/**
	 * The effective day delta to apply to the event's fromDate.
	 * Includes the grab offset so the event start aligns with the cursor.
	 */
	currentDayDelta: Ref<number>
	/** The column the drag started from (absolute: row * cols + col) */
	startAbsoluteCol: Ref<number>
	/** The column the drag is currently over (absolute: row * cols + col) */
	currentAbsoluteCol: Ref<number>
	/** Start the drag on an event segment */
	onPointerDown: (event: PointerEvent, item: DataCalendarItem, rowIndex: number, startCol: number, eventStartOffset: number) => void
}

/**
 * Composable for pointer-event-based drag and drop of calendar events.
 *
 * Instead of relying on a sortable-list library, this computes which
 * grid column the pointer is over by measuring mouse position relative
 * to the grid container, then calculates a day delta.
 *
 * The drag anchors so that the event's fromDate always follows the cursor:
 * a "grabOffset" (distance from event start to click position) is tracked
 * and included in the delta so the event start aligns with the drop target.
 */
export function useCalendarDrag(options: CalendarDragOptions): CalendarDragState {
	const columnCount = options.columnCount ?? 7;

	const isDragging = ref(false);
	const draggedItem = ref<DataCalendarItem | null>(null);
	const currentDayDelta = ref(0);
	const startAbsoluteCol = ref(0);
	const currentAbsoluteCol = ref(0);

	// Internal tracking
	let _startRowIndex = 0;
	let _startColIndex = 0;
	let gridRect: DOMRect | null = null;
	let rowHeight = 0;
	/** Offset from the event's start column to where the cursor clicked */
	let grabOffset = 0;

	function getAbsoluteCol(rowIdx: number, colIdx: number): number {
		return rowIdx * columnCount + colIdx;
	}

	function getGridPosition(clientX: number, clientY: number): { row: number, col: number } {
		if (!gridRect) return { row: 0, col: 0 };

		const relX = clientX - gridRect.left;
		const relY = clientY - gridRect.top;

		const col = Math.max(0, Math.min(columnCount - 1, Math.floor((relX / gridRect.width) * columnCount)));
		const row = Math.max(0, Math.min(options.rowCount.value - 1, Math.floor(relY / rowHeight)));

		return { row, col };
	}

	function onPointerDown(event: PointerEvent, item: DataCalendarItem, rowIndex: number, segStartCol: number, eventStartOffset: number) {
		if (!options.enabled.value) return;

		event.preventDefault();
		event.stopPropagation();

		const grid = options.gridRef.value;
		if (!grid) return;

		gridRect = grid.getBoundingClientRect();
		rowHeight = gridRect.height / options.rowCount.value;

		// Get the actual pointer position on the grid
		const { row: pointerRow, col: pointerCol } = getGridPosition(event.clientX, event.clientY);

		// Compute grab offset: how far from the event's actual fromDate the cursor is.
		// eventStartOffset = days from item.fromDate to the segment's first visible date
		// (0 for non-continuation, N for continuation segments).
		// pointerAbsoluteCol - segAbsoluteCol = columns from segment start to cursor within this row.
		// Total offset = eventStartOffset + (cursor position within segment).
		const segAbsoluteCol = getAbsoluteCol(rowIndex, segStartCol);
		const pointerAbsoluteCol = getAbsoluteCol(pointerRow, pointerCol);
		grabOffset = eventStartOffset + (pointerAbsoluteCol - segAbsoluteCol);

		_startRowIndex = pointerRow;
		_startColIndex = pointerCol;
		// Anchor at the pointer position (so delta starts at 0, no visual jump)
		startAbsoluteCol.value = pointerAbsoluteCol;
		currentAbsoluteCol.value = pointerAbsoluteCol;
		// Include grab offset so the event start aligns with the cursor
		currentDayDelta.value = grabOffset;
		draggedItem.value = item;
		isDragging.value = true;

		// Capture pointer for reliable tracking
		(event.target as HTMLElement).setPointerCapture?.(event.pointerId);

		window.addEventListener("pointermove", onPointerMove);
		window.addEventListener("pointerup", onPointerUp);
	}

	function onPointerMove(event: PointerEvent) {
		if (!isDragging.value || !gridRect) return;

		const { row, col } = getGridPosition(event.clientX, event.clientY);
		const absCol = getAbsoluteCol(row, col);
		currentAbsoluteCol.value = absCol;
		// Raw mouse movement + grab offset = effective delta from event start
		const rawDelta = absCol - startAbsoluteCol.value;
		currentDayDelta.value = rawDelta + grabOffset;
	}

	function onPointerUp(_event: PointerEvent) {
		window.removeEventListener("pointermove", onPointerMove);
		window.removeEventListener("pointerup", onPointerUp);

		if (!isDragging.value || !draggedItem.value) {
			cleanup();
			return;
		}

		const delta = currentDayDelta.value;

		if (delta !== 0) {
			const item = draggedItem.value;
			const sourceDate = item.fromDate;
			const targetDate = shiftDate(sourceDate, delta);

			options.onDrop({
				item,
				sourceDate,
				targetDate,
				dayDelta: delta
			});
		}

		cleanup();
	}

	function cleanup() {
		isDragging.value = false;
		draggedItem.value = null;
		currentDayDelta.value = 0;
		startAbsoluteCol.value = 0;
		currentAbsoluteCol.value = 0;
		grabOffset = 0;
		gridRect = null;
	}

	return {
		isDragging,
		draggedItem,
		currentDayDelta,
		startAbsoluteCol,
		currentAbsoluteCol,
		onPointerDown
	};
}

/**
 * Shift an ISO date string by a given number of days.
 * Positive delta = forward, negative delta = backward.
 */
function shiftDate(isoDate: string, days: number): string {
	const date = new Date(`${isoDate}T00:00:00`);
	date.setDate(date.getDate() + days);
	const y = date.getFullYear();
	const m = String(date.getMonth() + 1).padStart(2, "0");
	const d = String(date.getDate()).padStart(2, "0");
	return `${y}-${m}-${d}`;
}
