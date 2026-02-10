<template>
	<div class="flex h-full w-full flex-col gap-2">
		<!-- Header -->
		<slot name="header">
			<SDataCalendarHeader
				:view="currentView"
				:current-date="currentDate"
				:locale="props.locale"
				:translation-locale="effectiveTranslationLocale"
				:legend="props.legend"
				:first-day-of-week="props.firstDayOfWeek"
				@today="goToToday"
				@prev="goPrev"
				@next="goNext"
				@update:view="onViewChange"
			>
				<template #toolbar>
					<slot name="toolbar" />
				</template>
			</SDataCalendarHeader>
		</slot>

		<!-- Content between header and grid -->
		<slot name="sub-header" />

		<!-- Calendar Grid -->
		<div
			ref="calendarGridRef"
			class="flex flex-1"
		>
			<SDataCalendarMonthGrid
				v-if="currentView === 'month'"
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
			</SDataCalendarMonthGrid>

			<SDataCalendarWeekGrid
				v-else
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
			</SDataCalendarWeekGrid>
		</div>
	</div>
</template>

<script setup lang="ts">
	import type { CalendarDate } from "@internationalized/date";
	import type {
		DataCalendarContext,
		DataCalendarDayOfWeek,
		DataCalendarDropEvent,
		DataCalendarItem,
		DataCalendarLegendItem,
		DataCalendarLocale,
		DataCalendarView
	} from "./types";
	import { dragAndDrop } from "@formkit/drag-and-drop/vue";
	import { today as getToday } from "@internationalized/date";
	import { DATA_CALENDAR_CONTEXT, dataCalendarTranslations } from "./types";
	import SDataCalendarHeader from "./SDataCalendarHeader.vue";
	import SDataCalendarMonthGrid from "./SDataCalendarMonthGrid.vue";
	import SDataCalendarWeekGrid from "./SDataCalendarWeekGrid.vue";

	defineOptions({
		name: "SDataCalendar",
		inheritAttrs: false
	});

	const props = withDefaults(defineProps<{
		/** List of calendar event items */
		items?: DataCalendarItem[]
		/** BCP 47 locale (e.g. "en-US", "it-IT") */
		locale?: string
		/** IANA timezone (defaults to browser timezone) */
		timezone?: string
		/** Override first day of week */
		firstDayOfWeek?: DataCalendarDayOfWeek
		/** Legend items shown in header */
		legend?: DataCalendarLegendItem[]
		/** Max visible items per cell in month view before "+N" */
		maxVisibleItems?: number
		/** Enable drag-and-drop of items between dates */
		draggable?: boolean
		/** Translation locale key */
		translationLocale?: DataCalendarLocale
	}>(), {
		items: () => [],
		locale: "en-US",
		timezone: () => Intl.DateTimeFormat().resolvedOptions().timeZone,
		firstDayOfWeek: undefined,
		legend: () => [],
		maxVisibleItems: 3,
		draggable: false,
		translationLocale: undefined
	});

	const emit = defineEmits<{
		/** Emitted when the focused date changes */
		"update:modelValue": [date: CalendarDate]
		/** Emitted when the view mode changes */
		"update:view": [view: DataCalendarView]
		/** Emitted when a calendar item is clicked */
		"click:item": [item: DataCalendarItem]
		/** Emitted when a date is clicked */
		"click:date": [date: CalendarDate]
		/** Emitted when the add button is clicked on a date */
		"click:add": [date: CalendarDate]
		/** Emitted when an item is dragged to a new date */
		drop: [event: DataCalendarDropEvent]
	}>();

	defineSlots<{
		/** Override the entire header */
		header: () => unknown
		/** Custom content in the header toolbar area */
		toolbar: () => unknown
		/** Content between header and grid */
		"sub-header": () => unknown
		/** Custom item rendering */
		item: (props: { item: DataCalendarItem }) => unknown
		/** Custom cell content */
		"cell-content": (props: {
			date: CalendarDate
			items: DataCalendarItem[]
			isToday: boolean
			isOtherMonth: boolean
		}) => unknown
	}>();

	// --- Models ---
	const currentDate = defineModel<CalendarDate>("modelValue", {
		default: () => getToday(Intl.DateTimeFormat().resolvedOptions().timeZone)
	});

	const currentView = defineModel<DataCalendarView>("view", {
		default: "month"
	});

	// --- Computed ---
	const todayDate = computed(() => getToday(props.timezone));

	const calendarGridRef = ref<HTMLElement | null>(null);

	// --- Translation locale ---
	const effectiveTranslationLocale = computed<DataCalendarLocale>(() => {
		if (props.translationLocale && props.translationLocale in dataCalendarTranslations) {
			return props.translationLocale;
		}
		// Try to derive from locale
		const langCode = props.locale.split("-")[0] as DataCalendarLocale;
		if (langCode in dataCalendarTranslations) {
			return langCode;
		}
		return "en";
	});

	// --- Navigation ---
	function goToToday() {
		currentDate.value = todayDate.value;
	}

	function goPrev() {
		if (currentView.value === "month") {
			currentDate.value = currentDate.value.subtract({ months: 1 });
		} else {
			currentDate.value = currentDate.value.subtract({ weeks: 1 });
		}
	}

	function goNext() {
		if (currentView.value === "month") {
			currentDate.value = currentDate.value.add({ months: 1 });
		} else {
			currentDate.value = currentDate.value.add({ weeks: 1 });
		}
	}

	function onViewChange(view: DataCalendarView) {
		currentView.value = view;
	}

	// --- Event handlers ---
	function onItemClick(item: DataCalendarItem) {
		emit("click:item", item);
	}

	function onDateClick(date: CalendarDate) {
		emit("click:date", date);
	}

	function onAddClick(date: CalendarDate) {
		emit("click:add", date);
	}

	function onItemDrop(event: DataCalendarDropEvent) {
		emit("drop", event);
	}

	// --- Provide context to child components ---
	const contextLocale = computed(() => props.locale);
	const contextTimezone = computed(() => props.timezone);
	const contextDraggable = computed(() => props.draggable);
	const contextMaxVisibleItems = computed(() => props.maxVisibleItems);
	const contextFirstDayOfWeek = computed(() => props.firstDayOfWeek);
	const contextItems = computed(() => props.items);

	provide<DataCalendarContext>(DATA_CALENDAR_CONTEXT, {
		locale: contextLocale,
		timezone: contextTimezone,
		translationLocale: effectiveTranslationLocale,
		currentDate,
		todayDate,
		draggable: contextDraggable,
		maxVisibleItems: contextMaxVisibleItems,
		view: currentView,
		items: contextItems,
		firstDayOfWeek: contextFirstDayOfWeek,
		onItemClick,
		onDateClick,
		onAddClick,
		onItemDrop
	});

	// --- Drag and Drop setup ---
	function setupDragAndDrop() {
		if (!props.draggable || !calendarGridRef.value) return;

		const containers = calendarGridRef.value.querySelectorAll<HTMLElement>(".data-calendar-items");

		containers.forEach((container) => {
			const cellDate = container.getAttribute("data-cell-date");
			if (!cellDate) return;

			const cellItems = props.items.filter((item) => item.date === cellDate);

			dragAndDrop<DataCalendarItem>({
				parent: container,
				values: cellItems,
				group: "data-calendar",
				draggable: (child: HTMLElement) => child.hasAttribute("data-item-id"),
				onTransfer: (data) => {
					const draggedNode = data.draggedNodes?.[0];
					const fromDate = data.sourceParent?.el?.getAttribute("data-cell-date");
					const toDate = data.targetParent?.el?.getAttribute("data-cell-date");

					if (draggedNode && fromDate && toDate && fromDate !== toDate) {
						const draggedEl = draggedNode.el as HTMLElement;
						const itemId = draggedEl?.getAttribute?.("data-item-id");
						if (itemId) {
							const item = props.items.find((i) => String(i.id) === itemId);
							if (item) {
								onItemDrop({
									item,
									fromDate,
									toDate
								});
							}
						}
					}
				}
			});
		});
	}

	// Re-setup drag and drop when items, view, or date changes
	watch(
		[() => props.items, currentView, currentDate, () => props.draggable],
		() => {
			if (props.draggable) {
				nextTick(() => setupDragAndDrop());
			}
		},
		{ deep: true }
	);

	onMounted(() => {
		if (props.draggable) {
			nextTick(() => setupDragAndDrop());
		}
	});

	// --- Expose ---
	defineExpose({
		/** Navigate to today */
		goToToday,
		/** Navigate to previous period */
		goPrev,
		/** Navigate to next period */
		goNext,
		/** Current date */
		currentDate,
		/** Current view */
		currentView,
		/** Today's date */
		todayDate
	});
</script>
