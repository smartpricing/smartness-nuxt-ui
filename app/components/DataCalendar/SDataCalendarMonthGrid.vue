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

		<!-- Day cells grid -->
		<div
			class="grid flex-1 grid-cols-7"
			:style="{ gridTemplateRows: `repeat(${weeksCount}, minmax(0, 1fr))` }"
		>
			<SDataCalendarCell
				v-for="day in gridDays"
				:key="day.date.toString()"
				:date="day.date"
				:is-other-month="day.isOtherMonth"
				:items="getItemsForDate(day.date)"
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
				<template
					v-if="$slots.item"
					#item="slotProps"
				>
					<slot
						name="item"
						v-bind="slotProps"
					/>
				</template>
			</SDataCalendarCell>
		</div>
	</div>
</template>

<script setup lang="ts">
	import type { CalendarDate } from "@internationalized/date";
	import type { DataCalendarItem } from "./types";
	import {
		endOfMonth,
		getWeeksInMonth,
		startOfMonth,
		startOfWeek
	} from "@internationalized/date";
	import { DATA_CALENDAR_CONTEXT } from "./types";
	import SDataCalendarCell from "./SDataCalendarCell.vue";

	defineSlots<{
		/** Override cell content */
		"cell-content": (props: {
			date: CalendarDate
			items: DataCalendarItem[]
			isToday: boolean
			isOtherMonth: boolean
		}) => unknown
		/** Custom item rendering */
		item: (props: { item: DataCalendarItem }) => unknown
	}>();

	const ctx = inject(DATA_CALENDAR_CONTEXT)!;

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

	interface GridDay {
		date: CalendarDate
		isOtherMonth: boolean
	}

	/** Compute the full grid of days including padding from prev/next months */
	const gridDays = computed<GridDay[]>(() => {
		const current = ctx.currentDate.value;
		const locale = ctx.locale.value;
		const firstDayOfWeek = ctx.firstDayOfWeek.value;

		const monthStart = startOfMonth(current);
		const monthEnd = endOfMonth(current);

		// Get the start of the week that contains the first day of the month
		const gridStart = startOfWeek(monthStart, locale, firstDayOfWeek);

		const totalCells = weeksCount.value * 7;
		const days: GridDay[] = [];

		for (let i = 0; i < totalCells; i++) {
			const date = gridStart.add({ days: i });
			const isOtherMonth = date.compare(monthStart) < 0 || date.compare(monthEnd) > 0;
			days.push({ date, isOtherMonth });
		}

		return days;
	});

	/** Get items matching a specific date */
	function getItemsForDate(date: CalendarDate): DataCalendarItem[] {
		const dateStr = date.toString();
		return ctx.items.value.filter((item) => item.date === dateStr);
	}
</script>
