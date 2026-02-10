<template>
	<div class="flex flex-1 flex-col overflow-clip rounded-[10px] border border-primary-200">
		<!-- Weekday headers -->
		<div class="grid grid-cols-7">
			<div
				v-for="dayName in weekdayNames"
				:key="dayName"
				class="border border-default bg-white px-3 py-2"
			>
				<span class="block w-full truncate text-center text-sm font-medium text-primary-700">
					{{ dayName }}
				</span>
			</div>
		</div>

		<!-- Week rows with event overlays -->
		<div
			ref="gridContainerRef"
			class="flex flex-1 flex-col"
		>
			<div
				v-for="(week, rowIdx) in weekRows"
				:key="rowIdx"
				class="relative flex-1"
				:style="{ minHeight: `${getRowMinHeight(week.laneCount)}px` }"
			>
				<!-- Background cell grid -->
				<div class="grid h-full grid-cols-7">
					<SDataCalendarCell
						v-for="day in week.days"
						:key="day.date.toString()"
						:date="day.date"
						:is-other-month="day.isOtherMonth"
					>
						<template
							v-if="$slots['cell-content']"
							#cell-content="slotProps"
						>
							<slot
								name="cell-content"
								v-bind="slotProps"
							/>
						</template>
					</SDataCalendarCell>
				</div>

				<!-- Event overlay -->
				<div
					class="pointer-events-none absolute inset-x-0"
					:style="{ top: `${DAY_HEADER_HEIGHT}px`, bottom: '0' }"
				>
					<template
						v-for="seg in getVisibleSegments(week)"
						:key="`${seg.item.id}-${seg.startCol}`"
					>
						<div
							class="pointer-events-auto absolute px-2"
							:class="{
								'opacity-50': isDraggedItem(seg.item),
							}"
							:style="{
								left: `${(seg.startCol / 7) * 100}%`,
								width: `${(seg.spanCols / 7) * 100}%`,
								top: `${seg.lane * LANE_HEIGHT}px`,
								height: `${LANE_HEIGHT}px`,
							}"
							@pointerdown="(e) => onSegmentPointerDown(e, seg.item, rowIdx, seg.startCol)"
						>
							<SDataCalendarItem
								:item="seg.item"
								:is-continuation="seg.isContinuation"
								:continues-after="seg.continuesAfter"
								@click="ctx.onItemClick(seg.item)"
							>
								<template #default="{ item: slotItem }">
									<slot
										name="item"
										:item="slotItem"
									>
										{{ slotItem.label }}
									</slot>
								</template>
							</SDataCalendarItem>
						</div>
					</template>

					<!-- Overflow indicators per column -->
					<template
						v-for="(count, colIdx) in getOverflowCounts(week)"
						:key="`overflow-${colIdx}`"
					>
						<div
							v-if="count > 0"
							class="pointer-events-auto absolute cursor-pointer px-2 text-xs font-medium text-primary-600 hover:text-primary-900"
							:style="{
								left: `${(colIdx / 7) * 100}%`,
								width: `${(1 / 7) * 100}%`,
								top: `${ctx.maxVisibleItems.value * LANE_HEIGHT}px`,
							}"
							@click.stop="ctx.onDateClick(week.days[colIdx]!.date)"
						>
							{{ overflowLabel(count) }}
						</div>
					</template>
				</div>

				<!-- Drag ghost preview -->
				<div
					v-if="drag.isDragging.value && dragGhostForRow(rowIdx)"
					class="pointer-events-none absolute inset-x-0"
					:style="{ top: `${DAY_HEADER_HEIGHT}px`, bottom: '0' }"
				>
					<div
						class="absolute px-2 opacity-40"
						:style="dragGhostForRow(rowIdx)!.style"
					>
						<SDataCalendarItem
							:item="drag.draggedItem.value!"
							@click.stop
						>
							<template #default="{ item: slotItem }">
								<slot
									name="item"
									:item="slotItem"
								>
									{{ slotItem.label }}
								</slot>
							</template>
						</SDataCalendarItem>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	import type { CalendarDate } from "@internationalized/date";
	import type { DataCalendarItem, PositionedSegment, WeekRow } from "./types";
	import {
		endOfMonth,
		getWeeksInMonth,
		startOfMonth,
		startOfWeek
	} from "@internationalized/date";
	import SDataCalendarCell from "./SDataCalendarCell.vue";
	import SDataCalendarItem from "./SDataCalendarItem.vue";
	import { DATA_CALENDAR_CONTEXT } from "./types";
	import { useCalendarDrag } from "./useCalendarDrag";
	import { computeEventLayout, computeOverflowPerColumn } from "./useCalendarEventLayout";

	defineSlots<{
		/** Override cell content */
		"cell-content": (props: {
			date: string
			isToday: boolean
			isOtherMonth: boolean
		}) => unknown
		/** Custom item rendering */
		item: (props: { item: DataCalendarItem }) => unknown
	}>();

	const ctx = inject(DATA_CALENDAR_CONTEXT)!;

	// --- Constants ---
	const DAY_HEADER_HEIGHT = 36;
	const LANE_HEIGHT = 24;

	// --- Refs ---
	const gridContainerRef = ref<HTMLElement | null>(null);

	/** Compute abbreviated weekday names based on locale and firstDayOfWeek */
	const weekdayNames = computed(() => {
		const locale = ctx.locale.value;
		const date = ctx.currentDate.value;
		const firstDay = startOfWeek(date, locale, ctx.firstDayOfWeek.value);
		const formatter = new Intl.DateTimeFormat(locale, { weekday: "short" });

		const names: string[] = [];
		for (let i = 0; i < 7; i++) {
			const dayDate = firstDay.add({ days: i });
			const nativeDate = dayDate.toDate("UTC");
			names.push(formatter.format(nativeDate));
		}
		return names;
	});

	/** Number of week rows to display */
	const weeksCount = computed(() => {
		return getWeeksInMonth(ctx.currentDate.value, ctx.locale.value, ctx.firstDayOfWeek.value);
	});

	/** Compute the raw grid days grouped by week */
	const rawWeeks = computed(() => {
		const current = ctx.currentDate.value;
		const locale = ctx.locale.value;
		const firstDayOfWeek = ctx.firstDayOfWeek.value;

		const monthStart = startOfMonth(current);
		const monthEnd = endOfMonth(current);
		const gridStart = startOfWeek(monthStart, locale, firstDayOfWeek);

		const weeks: { days: { date: CalendarDate, isOtherMonth: boolean }[] }[] = [];

		for (let w = 0; w < weeksCount.value; w++) {
			const days: { date: CalendarDate, isOtherMonth: boolean }[] = [];
			for (let d = 0; d < 7; d++) {
				const date = gridStart.add({ days: w * 7 + d });
				const isOtherMonth = date.compare(monthStart) < 0 || date.compare(monthEnd) > 0;
				days.push({ date, isOtherMonth });
			}
			weeks.push({ days });
		}

		return weeks;
	});

	/** Compute the full layout with event segments positioned */
	const weekRows = computed<WeekRow[]>(() => {
		return computeEventLayout(ctx.items.value, rawWeeks.value);
	});

	/** Get visible segments (respecting maxVisibleItems) */
	function getVisibleSegments(week: WeekRow): PositionedSegment[] {
		return week.segments.filter((seg) => seg.lane < ctx.maxVisibleItems.value);
	}

	/** Get overflow counts per column */
	function getOverflowCounts(week: WeekRow): number[] {
		return computeOverflowPerColumn(week.segments, ctx.maxVisibleItems.value);
	}

	/** Compute minimum row height based on lane count */
	function getRowMinHeight(laneCount: number): number {
		const visibleLanes = Math.min(laneCount, ctx.maxVisibleItems.value);
		// Add space for overflow label if needed
		const overflowSpace = laneCount > ctx.maxVisibleItems.value ? 20 : 0;
		return DAY_HEADER_HEIGHT + (visibleLanes * LANE_HEIGHT) + overflowSpace + 8;
	}

	/** Overflow label text */
	function overflowLabel(count: number): string {
		const t = ctx.translationLocale.value;
		const translations = {
			en: "+{count}",
			it: "+{count}",
			de: "+{count}",
			es: "+{count}"
		};
		return (translations[t] ?? "+{count}").replace("{count}", String(count));
	}

	// --- Drag and Drop ---
	const drag = useCalendarDrag({
		enabled: ctx.draggable,
		gridRef: gridContainerRef,
		rowCount: weeksCount,
		onDrop: (event) => ctx.onItemDrop(event)
	});

	function onSegmentPointerDown(event: PointerEvent, item: DataCalendarItem, rowIndex: number, startCol: number) {
		if (!ctx.draggable.value) return;
		drag.onPointerDown(event, item, rowIndex, startCol);
	}

	function isDraggedItem(item: DataCalendarItem): boolean {
		return drag.isDragging.value && drag.draggedItem.value?.id === item.id;
	}

	/** Find the first free lane in a row that doesn't collide with existing segments */
	function findFreeLane(weekRow: WeekRow, startCol: number, spanCols: number, excludeItemId?: string | number): number {
		const segEnd = startCol + spanCols - 1;
		// Collect lanes occupied at the ghost's columns (excluding the dragged item itself)
		const occupiedLanes = new Set<number>();
		for (const seg of weekRow.segments) {
			if (excludeItemId !== undefined && seg.item.id === excludeItemId) continue;
			const sEnd = seg.startCol + seg.spanCols - 1;
			// Check column overlap
			if (startCol <= sEnd && segEnd >= seg.startCol) {
				occupiedLanes.add(seg.lane);
			}
		}
		// Find the lowest lane not occupied
		let lane = 0;
		while (occupiedLanes.has(lane)) lane++;
		return lane;
	}

	/** Compute drag ghost position for a specific row */
	function dragGhostForRow(rowIdx: number): { style: Record<string, string> } | null {
		if (!drag.isDragging.value || !drag.draggedItem.value) return null;

		const item = drag.draggedItem.value;
		const delta = drag.currentDayDelta.value;

		const effectiveToDate = item.toDate ?? item.fromDate;

		// Compute new fromDate/toDate by shifting by the delta
		const newFromDate = shiftDateISO(item.fromDate, delta);
		const newToDate = shiftDateISO(effectiveToDate, delta);

		// Check if this ghost segment falls in the given row
		const week = rawWeeks.value[rowIdx];
		if (!week) return null;

		const weekDays = week.days;
		if (!weekDays || weekDays.length < 7) return null;

		const rowStartISO = weekDays[0]!.date.toString();
		const rowEndISO = weekDays[6]!.date.toString();

		// Check overlap
		if (newFromDate > rowEndISO || newToDate < rowStartISO) return null;

		// Clip to row
		const clippedStart = newFromDate >= rowStartISO ? newFromDate : rowStartISO;
		const clippedEnd = newToDate <= rowEndISO ? newToDate : rowEndISO;

		const startCol = weekDays.findIndex((d) => d.date.toString() === clippedStart);
		const endCol = weekDays.findIndex((d) => d.date.toString() === clippedEnd);

		if (startCol === -1 || endCol === -1) return null;

		const spanCols = endCol - startCol + 1;

		// Find a free lane that doesn't overlap with existing events
		const layoutRow = weekRows.value[rowIdx];
		const ghostLane = layoutRow
			? findFreeLane(layoutRow, startCol, spanCols, item.id)
			: 0;

		return {
			style: {
				left: `${(startCol / 7) * 100}%`,
				width: `${(spanCols / 7) * 100}%`,
				top: `${ghostLane * LANE_HEIGHT}px`,
				height: `${LANE_HEIGHT}px`
			}
		};
	}

	function shiftDateISO(isoDate: string, days: number): string {
		const date = new Date(`${isoDate}T00:00:00`);
		date.setDate(date.getDate() + days);
		const y = date.getFullYear();
		const m = String(date.getMonth() + 1).padStart(2, "0");
		const d = String(date.getDate()).padStart(2, "0");
		return `${y}-${m}-${d}`;
	}
</script>
