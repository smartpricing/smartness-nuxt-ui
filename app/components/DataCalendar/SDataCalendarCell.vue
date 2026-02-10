<template>
	<div
		class="group/cell flex flex-col gap-2 border border-default bg-white p-2"
		:class="{
			'bg-primary-50/50': isToday,
		}"
	>
		<!-- Day number -->
		<div class="flex items-start justify-between">
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

		<!-- Items list -->
		<div
			ref="itemsContainerRef"
			class="data-calendar-items flex flex-1 flex-col gap-1 overflow-clip"
			:data-cell-date="dateStr"
		>
			<slot
				name="cell-content"
				:date="date"
				:items="cellItems"
				:is-today="isToday"
				:is-other-month="isOtherMonth"
			>
				<SDataCalendarItem
					v-for="item in visibleItems"
					:key="item.id"
					:item="item"
					:data-item-id="String(item.id)"
					@click="ctx.onItemClick(item)"
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

				<!-- Overflow indicator -->
				<span
					v-if="overflowCount > 0"
					class="cursor-pointer px-1.5 text-xs font-medium text-primary-600 hover:text-primary-900"
					@click.stop="ctx.onDateClick(date)"
				>
					{{ overflowLabel }}
				</span>
			</slot>
		</div>
	</div>
</template>

<script setup lang="ts">
	import type { CalendarDate } from "@internationalized/date";
	import type { DataCalendarItem } from "./types";
	import { isToday as checkIsToday } from "@internationalized/date";
	import { DATA_CALENDAR_CONTEXT, dataCalendarTranslations } from "./types";
	import SDataCalendarItem from "./SDataCalendarItem.vue";

	const props = withDefaults(defineProps<{
		/** The date this cell represents */
		date: CalendarDate
		/** Whether this cell belongs to the previous or next month */
		isOtherMonth?: boolean
		/** Items for this specific date */
		items?: DataCalendarItem[]
	}>(), {
		isOtherMonth: false,
		items: () => []
	});

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

	const itemsContainerRef = ref<HTMLElement | null>(null);

	const dateStr = computed(() => props.date.toString());

	const isToday = computed(() => checkIsToday(props.date, ctx.timezone.value));

	const canAdd = computed(() => {
		const todayVal = ctx.todayDate.value;
		return props.date.compare(todayVal) >= 0;
	});

	const cellItems = computed(() => props.items);

	const maxItems = computed(() => {
		if (ctx.view.value === "week") return Infinity;
		return ctx.maxVisibleItems.value;
	});

	const visibleItems = computed(() => {
		if (maxItems.value === Infinity) return cellItems.value;
		return cellItems.value.slice(0, maxItems.value);
	});

	const overflowCount = computed(() => {
		if (maxItems.value === Infinity) return 0;
		return Math.max(0, cellItems.value.length - maxItems.value);
	});

	const t = computed(() => dataCalendarTranslations[ctx.translationLocale.value] ?? dataCalendarTranslations.en);

	const overflowLabel = computed(() => {
		return t.value.more.replace("{count}", String(overflowCount.value));
	});

	defineExpose({
		itemsContainerRef,
		dateStr
	});
</script>
