<template>
	<!-- min-h-0 lets this shrink below the rows' intrinsic height, so it scrolls instead of growing past its container -->
	<div class="s-scrollbar flex min-h-0 flex-1 overflow-auto rounded-[10px] border border-default bg-white">
		<div
			class="grid min-w-full grow auto-rows-min"
			:style="{ gridTemplateColumns: `${rowHeaderWidth}px repeat(7, minmax(${dayMinWidth}px, 1fr))` }"
			data-slot="row-grid"
		>
			<!-- Sticky corner -->
			<div
				class="sticky top-0 z-30 border-r border-b border-default bg-white px-3 py-2"
				:class="stickyRowHeader ? 'left-0' : ''"
				data-slot="row-grid-corner"
			>
				<slot name="corner" />
			</div>

			<!-- Sticky day headers -->
			<div
				v-for="day in days"
				:key="`head-${day.iso}`"
				role="columnheader"
				class="sticky top-0 z-20 flex flex-col items-center gap-1 border-r border-b border-default bg-white px-3 py-2"
				v-bind="ctx.attributes.value?.weekdayHeader"
				data-slot="row-grid-day-header"
			>
				<span class="block w-full truncate text-center text-sm font-medium text-primary-700">
					{{ day.weekday }}
				</span>

				<template v-if="ctx.showDayNumbers.value">
					<UBadge
						v-if="day.isToday"
						color="secondary"
						variant="solid"
						size="md"
						class="rounded-full"
					>
						{{ day.dayNumber }}
					</UBadge>
					<span
						v-else
						class="text-sm font-semibold text-primary-900"
					>
						{{ day.dayNumber }}
					</span>
				</template>
			</div>

			<!-- Rows -->
			<template
				v-for="entry in gridRows"
				:key="entry.row.id"
			>
				<!-- Row header -->
				<div
					class="z-10 flex flex-col justify-center gap-1 border-r border-b border-default px-3 py-3"
					:class="[
						stickyRowHeader ? 'sticky left-0' : '',
						rowHeaderClass(entry.row),
						lockedClass(entry.row),
					]"
					data-slot="row-grid-row-header"
				>
					<slot
						name="row-header"
						:row="entry.row"
						:count="entry.count"
						:is-empty="entry.count === 0"
					>
						<span class="truncate label-sm text-primary-900">
							{{ entry.row.label }}
						</span>
						<span
							v-if="entry.row.description"
							class="text-xs text-muted"
						>
							{{ entry.row.description }}
						</span>
					</slot>
				</div>

				<!-- Day cells -->
				<div
					v-for="cell in entry.cells"
					:key="cell.key"
					role="gridcell"
					data-calendar-row-cell
					:data-date="cell.day.iso"
					:data-row-id="entry.rowId"
					class="group/cell relative flex min-h-24 select-none flex-col gap-1 border-r border-b border-default p-2"
					:class="cellClass(entry.row, cell.day)"
					v-bind="ctx.attributes.value?.cell"
					@click="onCellClick(cell.day)"
				>
					<!-- Stacked above the cards, never a drag source nor a click target -->
					<slot
						name="cell-header"
						:row="entry.row"
						:date="cell.day.iso"
						:items="cell.items"
						:count="cell.items.length"
					>
						<div
							v-if="ctx.showCellCount.value && cell.items.length"
							class="pointer-events-none flex select-none justify-end"
							data-slot="row-grid-cell-count"
						>
							<UBadge
								color="neutral"
								variant="subtle"
								size="sm"
								:ui="ctx.cellCountProps.value"
							>
								{{ cell.items.length }}
							</UBadge>
						</div>
					</slot>

					<!-- Cards -->
					<div
						v-for="item in cell.visible"
						:key="item.id"
						:class="cardClass(entry.row, item)"
						v-bind="item.attributes"
						@pointerdown="onItemPointerDown($event, item, cell.day.iso, entry.rowId)"
						@click.stop="onItemClick(item)"
					>
						<slot
							name="row-item"
							:item="item"
							:row="entry.row"
							:date="cell.day.iso"
							:is-dragging="drag.isDraggedItem(item)"
						>
							<SDataCalendarRowCard
								:item="item"
								:draggable="ctx.draggable.value"
							/>
						</slot>
					</div>

					<!-- Overflow: the items beyond maxVisibleItems -->
					<UPopover
						v-if="cell.hidden.length"
						:open="openOverflow === cell.key"
						@update:open="(open: boolean) => onOverflowToggle(cell.key, open)"
					>
						<div @click.stop>
							<slot
								name="row-overflow-trigger"
								:row="entry.row"
								:date="cell.day.iso"
								:items="cell.hidden"
								:count="cell.hidden.length"
								:open="openOverflow === cell.key"
								:toggle="() => onOverflowToggle(cell.key, openOverflow !== cell.key)"
							>
								<UBadge
									color="neutral"
									variant="soft"
									size="sm"
									class="w-full cursor-pointer justify-center rounded-md"
								>
									{{ overflowLabel(cell.hidden.length) }}
								</UBadge>
							</slot>
						</div>

						<template #content>
							<div class="flex w-56 flex-col gap-1 p-2">
								<slot
									name="row-overflow-header"
									:row="entry.row"
									:date="cell.day.iso"
									:count="cell.hidden.length"
								>
									<span class="px-1 text-xs text-muted">
										{{ entry.row.label }}
									</span>
								</slot>

								<div
									v-for="item in cell.hidden"
									:key="item.id"
									:class="[
										canDragFromOverflow ? 'cursor-grab touch-none' : '',
										drag.isDraggedItem(item) ? 'opacity-40' : '',
									]"
									v-bind="item.attributes"
									@pointerdown="onOverflowItemPointerDown($event, item, cell.day.iso, entry.rowId)"
									@click.stop="onItemClick(item)"
								>
									<slot
										name="row-item"
										:item="item"
										:row="entry.row"
										:date="cell.day.iso"
										:is-dragging="drag.isDraggedItem(item)"
									>
										<SDataCalendarRowCard
											:item="item"
											:draggable="canDragFromOverflow"
										/>
									</slot>
								</div>
							</div>
						</template>
					</UPopover>

					<slot
						v-if="!cell.items.length"
						name="cell-empty"
						:row="entry.row"
						:date="cell.day.iso"
					/>
				</div>
			</template>
		</div>

		<!-- Floating drag ghost, rendered with the very same card markup (default or custom) -->
		<Teleport to="body">
			<div
				v-if="ghost"
				class="pointer-events-none fixed z-[100] rotate-1 opacity-70 drop-shadow-lg"
				:style="drag.ghostStyle.value!"
				data-slot="row-grid-ghost"
			>
				<slot
					name="row-item"
					:item="ghost.item"
					:row="ghost.row"
					:date="ghost.date"
					:is-dragging="true"
				>
					<SDataCalendarRowCard
						:item="ghost.item"
						:draggable="ctx.draggable.value"
					/>
				</slot>
			</div>
		</Teleport>
	</div>
</template>

<script setup lang="ts">
	import type { CalendarDate } from "@internationalized/date";
	import type { DataCalendarItem, DataCalendarRow } from "./types";
	import type { CalendarRowDropTarget } from "./useCalendarRowDrag";
	import { isToday as checkIsToday, startOfWeek } from "@internationalized/date";
	import SDataCalendarRowCard from "./SDataCalendarRowCard.vue";
	import { DATA_CALENDAR_CONTEXT, dataCalendarTranslations } from "./types";
	import { useCalendarRowDrag } from "./useCalendarRowDrag";

	interface GridDay {
		date: CalendarDate
		iso: string
		weekday: string
		dayNumber: number
		isToday: boolean
		isWeekend: boolean
	}

	interface GridCell {
		/** Stable `rowId|date` identity, also used as the overflow popover key */
		key: string
		day: GridDay
		/** Every item of this cell */
		items: DataCalendarItem[]
		/** The items rendered inline, capped by `maxVisibleItems` */
		visible: DataCalendarItem[]
		/** The items beyond the cap, reachable through the overflow popover */
		hidden: DataCalendarItem[]
	}

	withDefaults(defineProps<{
		/** Width (px) of the leading column */
		rowHeaderWidth?: number
		/** Minimum width (px) of each day column before the grid scrolls horizontally */
		dayMinWidth?: number
		/** Keep the leading column pinned while scrolling horizontally */
		stickyRowHeader?: boolean
	}>(), {
		rowHeaderWidth: 180,
		dayMinWidth: 140,
		stickyRowHeader: true
	});

	defineSlots<{
		/** Content of the top-left corner */
		corner: () => unknown
		/** Row header content */
		"row-header": (props: { row: DataCalendarRow, count: number, isEmpty: boolean }) => unknown
		/** First row of a cell, above the cards (defaults to the item count badge) */
		"cell-header": (props: { row: DataCalendarRow, date: string, items: DataCalendarItem[], count: number }) => unknown
		/** Card rendering, used inline, inside the overflow popover and for the drag ghost */
		"row-item": (props: { item: DataCalendarItem, row: DataCalendarRow, date: string, isDragging: boolean }) => unknown
		/** Chip opening the overflow popover */
		"row-overflow-trigger": (props: {
			row: DataCalendarRow
			date: string
			items: DataCalendarItem[]
			count: number
			open: boolean
			toggle: () => void
		}) => unknown
		/** Header of the overflow popover */
		"row-overflow-header": (props: { row: DataCalendarRow, date: string, count: number }) => unknown
		/** Placeholder shown in a cell holding no item */
		"cell-empty": (props: { row: DataCalendarRow, date: string }) => unknown
	}>();

	const ctx = inject(DATA_CALENDAR_CONTEXT)!;

	/** Dragging out of the overflow popover is opt-in on top of `draggable` */
	const canDragFromOverflow = computed(() => ctx.draggable.value && ctx.draggableFromPopover.value);

	function overflowLabel(count: number): string {
		return dataCalendarTranslations[ctx.translationLocale.value].more.replace("{count}", String(count));
	}

	/** The 7 days of the visible week, pre-formatted for the header */
	const days = computed<GridDay[]>(() => {
		const locale = ctx.locale.value;
		const weekStart = startOfWeek(ctx.currentDate.value, locale, ctx.firstDayOfWeek.value);
		const formatter = new Intl.DateTimeFormat(locale, { weekday: "short" });

		return Array.from({ length: 7 }, (_, index) => {
			const date = weekStart.add({ days: index });
			const weekday = date.toDate(ctx.timezone.value).getDay();

			return {
				date,
				iso: date.toString(),
				weekday: formatter.format(date.toDate("UTC")),
				dayNumber: date.day,
				isToday: checkIsToday(date, ctx.timezone.value),
				isWeekend: weekday === 0 || weekday === 6
			};
		});
	});

	/** Rows indexed by their stringified id, for id-based drop resolution */
	const rowsById = computed(() => new Map(ctx.rows.value.map((row) => [String(row.id), row])));

	/**
	 * Items of the visible week bucketed by row id, then by day.
	 * A multi-day item is listed under every day it covers.
	 */
	const weekLayout = computed(() => {
		const byRow = new Map<string, { items: DataCalendarItem[], byDay: Map<string, DataCalendarItem[]> }>();
		const weekStart = days.value[0]!.iso;
		const weekEnd = days.value[6]!.iso;

		for (const item of ctx.items.value) {
			const rowId = ctx.resolveRowId(item);
			if (rowId === null || rowId === undefined) continue;

			const itemEnd = item.toDate ?? item.fromDate;
			if (itemEnd < weekStart || item.fromDate > weekEnd) continue;

			const key = String(rowId);
			let bucket = byRow.get(key);
			if (!bucket) {
				bucket = { items: [], byDay: new Map() };
				byRow.set(key, bucket);
			}
			bucket.items.push(item);

			for (const day of days.value) {
				if (day.iso < item.fromDate || day.iso > itemEnd) continue;
				const dayBucket = bucket.byDay.get(day.iso);
				if (dayBucket) {
					dayBucket.push(item);
				} else {
					bucket.byDay.set(day.iso, [item]);
				}
			}
		}

		return byRow;
	});

	/** Distinct items a row holds in the visible week */
	function countOf(row: DataCalendarRow): number {
		return weekLayout.value.get(String(row.id))?.items.length ?? 0;
	}

	/**
	 * Rows to render.
	 *
	 * A `hideWhenEmpty` row disappears once the visible week holds none of its items.
	 * Unless it opts out with `revealOnDrag: false`, it is forced back for the duration
	 * of a drag — otherwise a bucket row emptied by drag and drop could never be refilled.
	 */
	const visibleRows = computed(() =>
		ctx.rows.value.filter((row) => {
			if (!row.hideWhenEmpty || countOf(row) > 0) return true;
			return drag.isDragging.value && row.revealOnDrag !== false;
		})
	);

	/** Everything the template iterates: visible rows, each with its 7 resolved cells */
	const gridRows = computed(() => visibleRows.value.map((row) => {
		const rowId = String(row.id);
		const byDay = weekLayout.value.get(rowId)?.byDay;
		const max = ctx.maxVisibleItems.value;

		const cells: GridCell[] = days.value.map((day) => {
			const items = byDay?.get(day.iso) ?? [];
			const capped = max !== undefined && max > 0 && items.length > max;

			return {
				key: `${rowId}|${day.iso}`,
				day,
				items,
				visible: capped ? items.slice(0, max) : items,
				hidden: capped ? items.slice(max) : []
			};
		});

		return { row, rowId, count: countOf(row), cells };
	}));

	// --- Overflow popover ---
	/** Key of the single open overflow popover, if any */
	const openOverflow = ref<string | null>(null);

	function onOverflowToggle(key: string, open: boolean) {
		openOverflow.value = open ? key : null;
	}

	// --- Drag and drop ---
	const drag = useCalendarRowDrag({
		enabled: ctx.draggable,
		canDrop: (target) => !rowsById.value.get(target.rowId)?.disableDrop,
		onDrop: (item, source, target) => ctx.onItemDrop(dropEvent(item, source, target)),
		onDropDenied: (item, source, target) => ctx.onItemDropDenied(dropEvent(item, source, target))
	});

	/** The payload shared by the accepted and the refused drop */
	function dropEvent(item: DataCalendarItem, source: CalendarRowDropTarget, target: CalendarRowDropTarget) {
		return {
			item,
			sourceDate: source.date,
			targetDate: target.date,
			dayDelta: daysBetween(source.date, target.date),
			sourceRow: rowsById.value.get(source.rowId),
			targetRow: rowsById.value.get(target.rowId)
		};
	}

	/**
	 * Dragging a card out of the overflow popover only works if the popover gets out of
	 * the way: it covers the grid, so every cell under it would be an unreachable target.
	 */
	watch(drag.isDragging, (dragging) => {
		if (dragging) openOverflow.value = null;
	});

	/** Item, origin row and origin date backing the floating ghost */
	const ghost = computed(() => {
		const item = drag.draggedItem.value;
		const from = drag.source.value;
		if (!item || !from || !drag.ghostStyle.value) return null;

		const row = rowsById.value.get(from.rowId);
		if (!row) return null;

		return { item, row, date: from.date };
	});

	function onItemPointerDown(event: PointerEvent, item: DataCalendarItem, iso: string, rowId: string) {
		drag.onPointerDown(event, item, { date: iso, rowId });
	}

	function onOverflowItemPointerDown(event: PointerEvent, item: DataCalendarItem, iso: string, rowId: string) {
		if (!canDragFromOverflow.value) return;
		drag.onPointerDown(event, item, { date: iso, rowId });
	}

	function onItemClick(item: DataCalendarItem) {
		if (drag.consumeClickSuppression()) return;
		ctx.onItemClick(item);
	}

	function onCellClick(day: GridDay) {
		if (drag.consumeClickSuppression()) return;
		ctx.onDateClick(day.date);
	}

	function isRowTargeted(rowId: string): boolean {
		return drag.isDragging.value && drag.target.value?.rowId === rowId;
	}

	/** A row refusing drops, and only while a drag is actually in flight */
	function isRowLocked(row: DataCalendarRow): boolean {
		return drag.isDragging.value && !!row.disableDrop;
	}

	/**
	 * Mid-drag treatment of a row that won't accept the card: the whole band fades and
	 * the pointer says so. Outside a drag the row is perfectly usable, so it looks normal.
	 */
	function lockedClass(row: DataCalendarRow): string {
		return isRowLocked(row) ? "cursor-not-allowed opacity-60" : "";
	}

	function cellBackgroundClass(row: DataCalendarRow, day: GridDay): string {
		if (drag.isDragging.value && drag.isTarget(day.iso, String(row.id))) {
			return "bg-secondary-50 ring-2 ring-inset ring-secondary-400";
		}
		// A row painting itself owns its background; competing bg-* utilities would be
		// resolved by stylesheet order rather than by intent, so the tints stand down.
		if (row.class) return row.class;
		if (day.isToday) return "bg-primary-50/50";
		if (ctx.highlightWeekends.value && day.isWeekend) return "bg-(--color-lemon-50)";
		return "bg-white";
	}

	function cellClass(row: DataCalendarRow, day: GridDay): string[] {
		return [cellBackgroundClass(row, day), lockedClass(row)];
	}

	/** The row header follows its row's own background, so the band reads as one strip */
	function rowHeaderClass(row: DataCalendarRow): string {
		if (isRowTargeted(String(row.id))) return "bg-elevated";
		return row.class ?? "bg-white";
	}

	/**
	 * A locked row still lets its own cards be dragged *out* — `disableDrop` only refuses
	 * incoming drops — so the grab cursor gives way to the deny cursor mid-drag only.
	 */
	function cardClass(row: DataCalendarRow, item: DataCalendarItem): string[] {
		return [
			ctx.draggable.value ? "touch-none" : "",
			isRowLocked(row) ? "cursor-not-allowed" : (ctx.draggable.value ? "cursor-grab" : ""),
			drag.isDraggedItem(item) ? "opacity-40" : ""
		];
	}

	/** Whole-day difference between two ISO dates */
	function daysBetween(from: string, to: string): number {
		const fromMs = new Date(`${from}T00:00:00Z`).getTime();
		const toMs = new Date(`${to}T00:00:00Z`).getTime();
		return Math.round((toMs - fromMs) / 86_400_000);
	}
</script>
