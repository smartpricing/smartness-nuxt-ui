<template>
	<div
		role="gridcell"
		:data-date="dateStr"
		:aria-label="formattedDate"
		:aria-current="isToday ? 'date' : undefined"
		class="group/cell flex flex-col ring ring-inset ring-default bg-white hover:bg-muted hover:ring-accented hover:ring-2"
		:class="{
			'bg-primary-50/50': isToday,
		}"
		v-bind="ctx.attributes.value?.cell"
	>
		<!-- Day number header -->
		<div class="flex items-start justify-between px-2 py-1">
			<div>
				<UBadge
					v-if="isToday"
					color="secondary"
					size="md"
					variant="solid"
					class="cursor-pointer"
					@click.stop="ctx.onDateClick(date)"
				>
					{{ date.day }}
				</UBadge>
				<span
					v-else
					class="inline-flex cursor-pointer items-center justify-center px-2 py-1 label-sm"
					:class="isOtherMonth ? 'text-primary-600' : 'text-primary-900'"
					@click.stop="ctx.onDateClick(date)"
				>
					{{ date.day }}
				</span>
			</div>

			<!-- Add button (visible on hover, hidden if disableAdd returns true) -->
			<UButton
				v-if="!isAddDisabled"
				icon="ph:plus"
				size="xs"
				variant="solid"
				color="primary"
				:aria-label="`Add event on ${formattedDate}`"
				class="opacity-0 transition-opacity group-hover/cell:opacity-100"
				v-bind="ctx.attributes.value?.addButton"
				@click.stop="ctx.onAddClick(date)"
			/>
		</div>

		<!-- Slot for any custom cell content (e.g. indicators, badges) -->
		<slot
			name="cell-content"
			:date="dateStr"
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
			date: string
			isToday: boolean
			isOtherMonth: boolean
		}) => unknown
	}>();

	const ctx = inject(DATA_CALENDAR_CONTEXT)!;

	const dateStr = computed(() => props.date.toString());

	const isToday = computed(() => checkIsToday(props.date, ctx.timezone.value));

	const formattedDate = computed(() => {
		const native = props.date.toDate(ctx.timezone.value);
		return new Intl.DateTimeFormat(ctx.locale.value, {
			weekday: "long",
			year: "numeric",
			month: "long",
			day: "numeric"
		}).format(native);
	});

	const isAddDisabled = computed(() => {
		const fn = ctx.disableAdd.value;
		if (!fn) return false;
		return fn(dateStr.value);
	});
</script>
