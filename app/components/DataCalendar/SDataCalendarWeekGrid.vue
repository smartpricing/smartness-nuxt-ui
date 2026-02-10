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

		<!-- Single week row with event overlay -->
		<div
			ref="gridContainerRef"
			class="relative flex flex-1 flex-col"
		>
			<!-- Background cell grid -->
			<div class="grid h-full flex-1 grid-cols-7">
				<SDataCalendarCell
					v-for="day in weekRow.days"
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
					v-for="seg in weekRow.segments"
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
						@pointerdown="(e) => onSegmentPointerDown(e, seg.item, 0, seg.startCol, weekRow)"
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
			</div>

			<!-- Drag ghost preview -->
			<div
				v-if="drag.isDragging.value && dragGhost"
				class="pointer-events-none absolute inset-x-0"
				:style="{ top: `${DAY_HEADER_HEIGHT}px`, bottom: '0' }"
			>
				<div
					class="absolute px-2 opacity-40"
					:style="dragGhost.style"
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
</template>

<script setup lang="ts">
	import type { CalendarDate } from "@internationalized/date";
	import type { DataCalendarItem, WeekRow } from "./types";
	import { endOfMonth, startOfMonth, startOfWeek } from "@internationalized/date";
	import SDataCalendarCell from "./SDataCalendarCell.vue";
	import SDataCalendarItem from "./SDataCalendarItem.vue";
	import { DATA_CALENDAR_CONTEXT } from "./types";
	import { useCalendarDrag } from "./useCalendarDrag";
	import { computeEventLayout } from "./useCalendarEventLayout";

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

	/** Compute the 7 days of the current week */
	const rawWeek = computed(() => {
		const current = ctx.currentDate.value;
		const locale = ctx.locale.value;
		const firstDayOfWeek = ctx.firstDayOfWeek.value;

		const weekStart = startOfWeek(current, locale, firstDayOfWeek);
		const monthStart = startOfMonth(current);
		const monthEnd = endOfMonth(current);

		const days: { date: CalendarDate, isOtherMonth: boolean }[] = [];
		for (let i = 0; i < 7; i++) {
			const date = weekStart.add({ days: i });
			const isOtherMonth = date.compare(monthStart) < 0 || date.compare(monthEnd) > 0;
			days.push({ date, isOtherMonth });
		}

		return { days };
	});

	/** Compute the layout for the single week row */
	const weekRow = computed<WeekRow>(() => {
		const rows = computeEventLayout(ctx.items.value, [rawWeek.value]);
		return rows[0] ?? { days: rawWeek.value.days, segments: [], laneCount: 0 };
	});

	// --- Drag and Drop ---
	const rowCount = ref(1);

	const drag = useCalendarDrag({
		enabled: ctx.draggable,
		gridRef: gridContainerRef,
		rowCount,
		onDrop: (event) => ctx.onItemDrop(event)
	});

	function onSegmentPointerDown(event: PointerEvent, item: DataCalendarItem, rowIndex: number, startCol: number, week: WeekRow) {
		if (!ctx.draggable.value) return;
		// Compute how many days from the event's fromDate to this segment's first visible date
		const segDateISO = week.days[startCol]?.date.toString() ?? item.fromDate;
		const eventStartOffset = daysBetweenISO(item.fromDate, segDateISO);
		drag.onPointerDown(event, item, rowIndex, startCol, eventStartOffset);
	}

	/** Compute the number of days between two ISO date strings */
	function daysBetweenISO(from: string, to: string): number {
		const a = new Date(`${from}T00:00:00`);
		const b = new Date(`${to}T00:00:00`);
		return Math.round((b.getTime() - a.getTime()) / (1000 * 60 * 60 * 24));
	}

	function isDraggedItem(item: DataCalendarItem): boolean {
		return drag.isDragging.value && drag.draggedItem.value?.id === item.id;
	}

	/** Find the first free lane that doesn't collide with existing segments */
	function findFreeLane(row: WeekRow, startCol: number, spanCols: number, excludeItemId?: string | number): number {
		const segEnd = startCol + spanCols - 1;
		const occupiedLanes = new Set<number>();
		for (const seg of row.segments) {
			if (excludeItemId !== undefined && seg.item.id === excludeItemId) continue;
			const sEnd = seg.startCol + seg.spanCols - 1;
			if (startCol <= sEnd && segEnd >= seg.startCol) {
				occupiedLanes.add(seg.lane);
			}
		}
		let lane = 0;
		while (occupiedLanes.has(lane)) lane++;
		return lane;
	}

	/** Compute drag ghost position for the single week row */
	const dragGhost = computed(() => {
		if (!drag.isDragging.value || !drag.draggedItem.value) return null;

		const item = drag.draggedItem.value;
		const delta = drag.currentDayDelta.value;

		const effectiveToDate = item.toDate ?? item.fromDate;

		const newFromDate = shiftDateISO(item.fromDate, delta);
		const newToDate = shiftDateISO(effectiveToDate, delta);

		const week = rawWeek.value;
		if (!week.days || week.days.length < 7) return null;

		const rowStartISO = week.days[0]!.date.toString();
		const rowEndISO = week.days[6]!.date.toString();

		// Check overlap
		if (newFromDate > rowEndISO || newToDate < rowStartISO) return null;

		// Clip to row
		const clippedStart = newFromDate >= rowStartISO ? newFromDate : rowStartISO;
		const clippedEnd = newToDate <= rowEndISO ? newToDate : rowEndISO;

		const startCol = week.days.findIndex((d) => d.date.toString() === clippedStart);
		const endCol = week.days.findIndex((d) => d.date.toString() === clippedEnd);

		if (startCol === -1 || endCol === -1) return null;

		const spanCols = endCol - startCol + 1;

		// Find a free lane that doesn't overlap with existing events
		const ghostLane = findFreeLane(weekRow.value, startCol, spanCols, item.id);

		return {
			style: {
				left: `${(startCol / 7) * 100}%`,
				width: `${(spanCols / 7) * 100}%`,
				top: `${ghostLane * LANE_HEIGHT}px`,
				height: `${LANE_HEIGHT}px`
			}
		};
	});

	function shiftDateISO(isoDate: string, days: number): string {
		const date = new Date(`${isoDate}T00:00:00`);
		date.setDate(date.getDate() + days);
		const y = date.getFullYear();
		const m = String(date.getMonth() + 1).padStart(2, "0");
		const d = String(date.getDate()).padStart(2, "0");
		return `${y}-${m}-${d}`;
	}
</script>
