<template>
	<div
		class="flex h-full w-full flex-col gap-2"
		v-bind="props.attributes?.root"
	>
		<!-- Header -->
		<slot name="header">
			<SDataCalendarHeader
				:view="currentView"
				:current-date="currentDate"
				:locale="props.locale"
				:translation-locale="effectiveTranslationLocale"
				:legend="props.legend"
				:first-day-of-week="props.firstDayOfWeek"
				:show-view-selector="props.showViewSelector"
				:attributes="props.attributes"
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
			v-bind="props.attributes?.gridContainer"
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
				<template
					v-if="$slots['overflow-trigger']"
					#overflow-trigger="slotProps"
				>
					<slot
						name="overflow-trigger"
						v-bind="slotProps"
					/>
				</template>
				<template
					v-if="$slots['overflow-header']"
					#overflow-header="slotProps"
				>
					<slot
						name="overflow-header"
						v-bind="slotProps"
					/>
				</template>
				<template
					v-if="$slots['overflow-item']"
					#overflow-item="slotProps"
				>
					<slot
						name="overflow-item"
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
		DataCalendarAttributes,
		DataCalendarContext,
		DataCalendarDayOfWeek,
		DataCalendarDropEvent,
		DataCalendarItem,
		DataCalendarLegendItem,
		DataCalendarLocale,
		DataCalendarView
	} from "./types";
	import { today as getToday, parseDate } from "@internationalized/date";
	import SDataCalendarHeader from "./SDataCalendarHeader.vue";
	import SDataCalendarMonthGrid from "./SDataCalendarMonthGrid.vue";
	import SDataCalendarWeekGrid from "./SDataCalendarWeekGrid.vue";
	import { DATA_CALENDAR_CONTEXT, dataCalendarTranslations } from "./types";

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
		/** Optional callback to disable the add button for specific dates. Receives ISO date string, return true to disable. */
		disableAdd?: (date: string) => boolean
		/** Whether to show the view selector (month/week) in the header */
		showViewSelector?: boolean
		/** Custom HTML attributes to bind on internal calendar elements */
		attributes?: DataCalendarAttributes
	}>(), {
		items: () => [],
		locale: "en-US",
		timezone: () => Intl.DateTimeFormat().resolvedOptions().timeZone,
		firstDayOfWeek: undefined,
		legend: () => [],
		maxVisibleItems: undefined,
		draggable: false,
		translationLocale: undefined,
		disableAdd: undefined,
		showViewSelector: true,
		attributes: () => ({})
	});

	const emit = defineEmits<{
		/** Emitted when the view mode changes */
		updateView: [view: DataCalendarView]
		/** Emitted when a calendar item is clicked */
		clickItem: [item: DataCalendarItem]
		/** Emitted when a date is clicked (ISO "YYYY-MM-DD") */
		clickDate: [date: string]
		/** Emitted when the add button is clicked on a date (ISO "YYYY-MM-DD") */
		clickAdd: [date: string]
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
			date: string
			isToday: boolean
			isOtherMonth: boolean
		}) => unknown
		/** Custom overflow chip trigger */
		"overflow-trigger": (props: {
			count: number
			date: string
			items: DataCalendarItem[]
			open: boolean
			toggle: () => void
		}) => unknown
		/** Custom overflow popover header */
		"overflow-header": (props: {
			date: string
			dateLabel: string
			count: number
		}) => unknown
		/** Custom overflow popover item row */
		"overflow-item": (props: {
			item: DataCalendarItem
			date: string
		}) => unknown
	}>();

	// --- Models ---
	/** External model uses ISO "YYYY-MM-DD" strings */
	const modelValue = defineModel<string>("modelValue", {
		default: () => getToday(Intl.DateTimeFormat().resolvedOptions().timeZone).toString()
	});

	/** Internal CalendarDate computed from the string model */
	const currentDate = computed<CalendarDate>({
		get: () => {
			try {
				return parseDate(modelValue.value);
			} catch {
				return getToday(props.timezone);
			}
		},
		set: (val: CalendarDate) => {
			modelValue.value = val.toString();
		}
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
		emit("clickItem", item);
	}

	function onDateClick(date: CalendarDate) {
		emit("clickDate", date.toString());
	}

	function onAddClick(date: CalendarDate) {
		emit("clickAdd", date.toString());
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
	const contextDisableAdd = computed(() => props.disableAdd);
	const contextAttributes = computed(() => props.attributes ?? {});

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
		disableAdd: contextDisableAdd,
		attributes: contextAttributes,
		onItemClick,
		onDateClick,
		onAddClick,
		onItemDrop
	});

	// --- Expose ---
	defineExpose({
		/** Navigate to today */
		goToToday,
		/** Navigate to previous period */
		goPrev,
		/** Navigate to next period */
		goNext,
		/** Current date (ISO "YYYY-MM-DD") */
		currentDate: modelValue,
		/** Current view */
		currentView,
		/** Today's date (ISO "YYYY-MM-DD") */
		todayDate: computed(() => todayDate.value.toString())
	});
</script>
