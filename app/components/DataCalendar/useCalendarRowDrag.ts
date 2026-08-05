import type { Ref } from "vue";
import type { DataCalendarItem } from "./types";

/**
 * A cell of the row-grouped grid, identified by its date and its row.
 *
 * The row is referenced by id rather than by index: a `hideWhenEmpty` row can
 * appear the moment a drag starts, which shifts every index below it.
 */
export interface CalendarRowDropTarget {
	/** ISO "YYYY-MM-DD" of the cell */
	date: string
	/** Stringified id of the row the cell belongs to */
	rowId: string
}

export interface CalendarRowDragOptions {
	/** Whether drag is enabled */
	enabled: Ref<boolean>
	/** Refuse a cell while hovering it (e.g. rows marked `disableDrop`) */
	canDrop?: (target: CalendarRowDropTarget, item: DataCalendarItem) => boolean
	/** Called on release when the item actually changed cell */
	onDrop: (item: DataCalendarItem, source: CalendarRowDropTarget, target: CalendarRowDropTarget) => void
	/** Called on release over a different cell that `canDrop` refused */
	onDropDenied?: (item: DataCalendarItem, source: CalendarRowDropTarget, target: CalendarRowDropTarget) => void
}

/** Pointer travel (px) required before a press turns into a drag, so clicks still work */
const DRAG_THRESHOLD = 4;

/**
 * Drag and drop across a two-dimensional (row × day) calendar grid.
 *
 * Unlike `useCalendarDrag`, which derives a day delta from the grid geometry,
 * this resolves the hovered cell directly from the DOM (`elementsFromPoint` +
 * `[data-calendar-row-cell]`). Row heights in the row-grouped view are content
 * driven and therefore not uniform, which rules out geometric math.
 */
export function useCalendarRowDrag(options: CalendarRowDragOptions) {
	const isDragging = ref(false);
	const draggedItem = ref<DataCalendarItem | null>(null);
	const source = ref<CalendarRowDropTarget | null>(null);

	/**
	 * The cell under the pointer, refused or not, plus whether it accepts the drop.
	 *
	 * Permission is tracked alongside the cell rather than filtering it out: a refused
	 * cell still has to be remembered, both to report the denial on release and to stop
	 * the release from silently falling back onto the last cell that happened to be legal.
	 */
	const hovered = ref<CalendarRowDropTarget | null>(null);
	const hoveredAllowed = ref(true);

	/** The hovered cell, but only while it accepts the drop — drives the highlight */
	const target = computed(() => (hoveredAllowed.value ? hovered.value : null));

	/** Live pointer position, used to place the floating ghost */
	const pointer = ref<{ x: number, y: number } | null>(null);
	/** Geometry of the grabbed card, so the ghost keeps its size and grab point */
	const grab = ref<{ offsetX: number, offsetY: number, width: number } | null>(null);

	/** Set right after a real drag so the trailing `click` on the card is ignored */
	let suppressClick = false;

	/**
	 * Fixed-position style for a ghost that follows the pointer while keeping
	 * the exact grab point and width of the original card.
	 */
	const ghostStyle = computed(() => {
		if (!pointer.value || !grab.value) return null;
		return {
			left: `${pointer.value.x - grab.value.offsetX}px`,
			top: `${pointer.value.y - grab.value.offsetY}px`,
			width: `${grab.value.width}px`
		};
	});

	/** The grid cell under the pointer, whether or not it would accept a drop */
	function resolveCell(x: number, y: number): CalendarRowDropTarget | null {
		for (const element of document.elementsFromPoint(x, y)) {
			const cell = (element as HTMLElement).closest?.("[data-calendar-row-cell]") as HTMLElement | null;
			if (!cell?.dataset.date || cell.dataset.rowId === undefined) continue;

			return { date: cell.dataset.date, rowId: cell.dataset.rowId };
		}
		return null;
	}

	function onPointerDown(event: PointerEvent, item: DataCalendarItem, from: CalendarRowDropTarget) {
		if (!options.enabled.value || event.button !== 0) return;

		const startX = event.clientX;
		const startY = event.clientY;
		const rect = (event.currentTarget as HTMLElement | null)?.getBoundingClientRect();
		let started = false;

		function onPointerMove(moveEvent: PointerEvent) {
			if (!started) {
				const travelled = Math.abs(moveEvent.clientX - startX) > DRAG_THRESHOLD
					|| Math.abs(moveEvent.clientY - startY) > DRAG_THRESHOLD;
				if (!travelled) return;

				started = true;
				isDragging.value = true;
				draggedItem.value = item;
				source.value = from;
				hovered.value = from;
				hoveredAllowed.value = true;
				grab.value = rect
					? { offsetX: startX - rect.left, offsetY: startY - rect.top, width: rect.width }
					: { offsetX: 0, offsetY: 0, width: 200 };
			}

			pointer.value = { x: moveEvent.clientX, y: moveEvent.clientY };

			// Off the grid entirely: hold the last cell rather than flickering
			const cell = resolveCell(moveEvent.clientX, moveEvent.clientY);
			if (cell) {
				hovered.value = cell;
				hoveredAllowed.value = !options.canDrop || options.canDrop(cell, item);
			}
		}

		function onPointerUp() {
			window.removeEventListener("pointermove", onPointerMove);
			window.removeEventListener("pointerup", onPointerUp);
			window.removeEventListener("pointercancel", onPointerUp);

			const to = hovered.value;
			const moved = !!to && (to.date !== from.date || to.rowId !== from.rowId);

			// Releasing back on the origin is a no-op, never a denial — even from a locked row
			if (started && to && moved) {
				if (hoveredAllowed.value) {
					options.onDrop(item, from, to);
				} else {
					options.onDropDenied?.(item, from, to);
				}
			}
			if (started) suppressClick = true;

			isDragging.value = false;
			draggedItem.value = null;
			source.value = null;
			hovered.value = null;
			hoveredAllowed.value = true;
			pointer.value = null;
			grab.value = null;
		}

		window.addEventListener("pointermove", onPointerMove);
		window.addEventListener("pointerup", onPointerUp);
		window.addEventListener("pointercancel", onPointerUp);
	}

	/** True once per completed drag, so the synthetic click that follows can be dropped */
	function consumeClickSuppression(): boolean {
		if (!suppressClick) return false;
		suppressClick = false;
		return true;
	}

	function isDraggedItem(item: DataCalendarItem): boolean {
		return isDragging.value && draggedItem.value?.id === item.id;
	}

	function isTarget(date: string, rowId: string): boolean {
		const to = target.value;
		return !!to && to.date === date && to.rowId === rowId;
	}

	return {
		isDragging,
		draggedItem,
		source,
		target,
		ghostStyle,
		onPointerDown,
		consumeClickSuppression,
		isDraggedItem,
		isTarget
	};
}
