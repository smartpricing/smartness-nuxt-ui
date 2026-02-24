<template>
	<div
		class="flex flex-col gap-2 rounded-[10px] border border-default bg-white p-4"
		v-bind="props.attributes?.header"
	>
		<div class="flex items-center gap-4">
			<!-- Left group: Today + Nav + Date Label -->
			<div class="flex flex-1 items-center gap-2">
				<UButton
					variant="outline"
					size="sm"
					v-bind="props.attributes?.todayButton"
					@click="emit('today')"
				>
					{{ t.today }}
				</UButton>

				<div class="flex items-center">
					<UButton
						variant="ghost"
						size="sm"
						icon="ph:caret-left"
						v-bind="props.attributes?.prevButton"
						@click="emit('prev')"
					/>
					<UButton
						variant="ghost"
						size="sm"
						icon="ph:caret-right"
						v-bind="props.attributes?.nextButton"
						@click="emit('next')"
					/>
				</div>

				<span
					class="text-lg font-medium tracking-wide text-primary-900"
					v-bind="props.attributes?.dateLabel"
				>
					{{ dateLabel }}
				</span>
			</div>

			<!-- Center: toolbar slot -->
			<div class="flex flex-1 items-center justify-center">
				<slot name="toolbar" />
			</div>

			<!-- Right group: View selector + Legend -->
			<div class="flex items-center gap-4">
				<USelect
					v-if="showViewSelector"
					:model-value="view"
					:items="viewOptions"
					class="w-48"
					v-bind="props.attributes?.viewSelector"
					@update:model-value="emit('update:view', $event as DataCalendarView)"
				/>

				<div
					v-if="legend && legend.length > 0"
					class="flex items-center gap-4 pr-3"
				>
					<div
						v-for="item in legend"
						:key="item.label"
						class="flex items-center gap-2"
					>
						<span
							class="size-3 shrink-0 rounded-full"
							:style="{ backgroundColor: item.color }"
						/>
						<span class="text-sm text-primary-900">{{ item.label }}</span>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	import type { CalendarDate } from "@internationalized/date";
	import type { DataCalendarAttributes, DataCalendarDayOfWeek, DataCalendarLegendItem, DataCalendarView } from "./types";
	import { endOfWeek, startOfWeek } from "@internationalized/date";
	import { dataCalendarTranslations } from "./types";

	const props = withDefaults(defineProps<{
		/** Current view mode */
		view: DataCalendarView
		/** Current focused date */
		currentDate: CalendarDate
		/** BCP 47 locale */
		locale?: string
		/** Translation locale key */
		translationLocale?: keyof typeof dataCalendarTranslations
		/** Legend items */
		legend?: DataCalendarLegendItem[]
		/** First day of week override */
		firstDayOfWeek?: DataCalendarDayOfWeek
		/** Whether to show the view selector */
		showViewSelector?: boolean
		/** Custom HTML attributes for internal elements */
		attributes?: DataCalendarAttributes
	}>(), {
		locale: "en-US",
		translationLocale: "en",
		legend: () => [],
		firstDayOfWeek: undefined,
		showViewSelector: true,
		attributes: () => ({})
	});

	const emit = defineEmits<{
		/** Navigate to today */
		today: []
		/** Navigate to previous period */
		prev: []
		/** Navigate to next period */
		next: []
		/** View mode changed */
		"update:view": [view: DataCalendarView]
	}>();

	defineSlots<{
		/** Custom content in the header toolbar area */
		toolbar: () => unknown
	}>();

	const t = computed(() => dataCalendarTranslations[props.translationLocale] ?? dataCalendarTranslations.en);

	const viewOptions = computed(() => [
		{ label: t.value.month, value: "month" },
		{ label: t.value.week, value: "week" }
	]);

	const dateLabel = computed(() => {
		const date = props.currentDate;

		if (props.view === "month") {
			const nativeDate = date.toDate("UTC");
			return new Intl.DateTimeFormat(props.locale, {
				month: "long",
				year: "numeric"
			}).format(nativeDate);
		} else {
			const weekStart = startOfWeek(date, props.locale, props.firstDayOfWeek);
			const weekEnd = endOfWeek(date, props.locale, props.firstDayOfWeek);

			const startNative = weekStart.toDate("UTC");
			const endNative = weekEnd.toDate("UTC");

			const startStr = new Intl.DateTimeFormat(props.locale, {
				month: "short",
				day: "numeric"
			}).format(startNative);

			const endStr = new Intl.DateTimeFormat(props.locale, {
				month: "short",
				day: "numeric",
				year: "numeric"
			}).format(endNative);

			return `${startStr} - ${endStr}`;
		}
	});
</script>
