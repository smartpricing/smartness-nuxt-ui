<template>
	<div
		class="group/cell flex flex-col border border-default bg-white"
		:class="{
			'bg-primary-50/50': isToday,
		}"
	>
		<!-- Day number header -->
		<div class="flex items-start justify-between px-2 py-1">
			<div>
				<UBadge
					v-if="isToday"
					color="primary"
					size="sm"
					class="cursor-pointer"
					@click.stop="ctx.onDateClick(date)"
				>
					{{ date.day }}
				</UBadge>
				<span
					v-else
					class="inline-flex cursor-pointer items-center justify-center px-2 py-1 text-sm font-medium"
					:class="isOtherMonth ? 'text-primary-600' : 'text-primary-900'"
					@click.stop="ctx.onDateClick(date)"
				>
					{{ date.day }}
				</span>
			</div>

			<!-- Add button (visible on hover, only for today and future dates) -->
			<UButton
				v-if="canAdd"
				icon="ph:plus"
				size="xs"
				variant="soft"
				class="opacity-0 transition-opacity group-hover/cell:opacity-100"
				@click.stop="ctx.onAddClick(date)"
			/>
		</div>

		<!-- Slot for any custom cell content (e.g. indicators, badges) -->
		<slot
			name="cell-content"
			:date="date"
			:is-today="isToday"
			:is-other-month="isOtherMonth"
		/>
	</div>
</template>

<script setup lang="ts">
	import type { CalendarDate } from "@internationalized/date";
	import { isToday as checkIsToday } from "@internationalized/date";
	import { DATA_CALENDAR_CONTEXT } from "./types";

	const props = withDefaults(defineProps<{
		/** The date this cell represents */
		date: CalendarDate
		/** Whether this cell belongs to the previous or next month */
		isOtherMonth?: boolean
	}>(), {
		isOtherMonth: false
	});

	defineSlots<{
		/** Custom cell content (below day number) */
		"cell-content": (props: {
			date: CalendarDate
			isToday: boolean
			isOtherMonth: boolean
		}) => unknown
	}>();

	const ctx = inject(DATA_CALENDAR_CONTEXT)!;

	const isToday = computed(() => checkIsToday(props.date, ctx.timezone.value));

	const canAdd = computed(() => {
		const todayVal = ctx.todayDate.value;
		return props.date.compare(todayVal) >= 0;
	});
</script>
