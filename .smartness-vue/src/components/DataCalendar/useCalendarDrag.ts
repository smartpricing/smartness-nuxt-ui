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
	/** The day delta to apply to the event (number of days shifted from the drag start) */
	currentDayDelta: Ref<number>
	/** The column the drag started from (absolute: row * cols + col) */
	startAbsoluteCol: Ref<number>
	/** The column the drag is currently over (absolute: row * cols + col) */
	currentAbsoluteCol: Ref<number>
	/** Start the drag on an event segment */
	onPointerDown: (event: PointerEvent, item: DataCalendarItem, rowIndex: number, startCol: number) => void
}

/**
 * Composable for pointer-event-based drag and drop of calendar events.
 *
 * Instead of relying on a sortable-list library, this computes which
 * grid column the pointer is over by measuring mouse position relative
 * to the grid container, then calculates a day delta.
 *
 * The drag anchors at the cursor's click position: the delta represents
 * how many days the cursor has moved from its starting cell.
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

	function onPointerDown(event: PointerEvent, item: DataCalendarItem) {
		if (!options.enabled.value) return;

		event.preventDefault();
		event.stopPropagation();

		const grid = options.gridRef.value;
		if (!grid) return;

		gridRect = grid.getBoundingClientRect();
		rowHeight = gridRect.height / options.rowCount.value;

		const { row: pointerRow, col: pointerCol } = getGridPosition(event.clientX, event.clientY);

		_startRowIndex = pointerRow;
		_startColIndex = pointerCol;
		startAbsoluteCol.value = getAbsoluteCol(pointerRow, pointerCol);
		currentAbsoluteCol.value = startAbsoluteCol.value;
		currentDayDelta.value = 0;
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
		currentDayDelta.value = absCol - startAbsoluteCol.value;
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
