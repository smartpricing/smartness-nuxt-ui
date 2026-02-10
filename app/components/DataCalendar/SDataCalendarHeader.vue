<template>
	<div class="flex flex-col gap-2 rounded-[10px] border border-default bg-white p-4">
		<div class="flex items-center gap-4">
			<!-- Left group: Today + Nav + Date Label -->
			<div class="flex flex-1 items-center gap-2">
				<UButton
					variant="outline"
					size="sm"
					@click="emit('today')"
				>
					{{ t.today }}
				</UButton>

				<div class="flex items-center">
					<UButton
						variant="ghost"
						size="sm"
						icon="ph:caret-left"
						@click="emit('prev')"
					/>
					<UButton
						variant="ghost"
						size="sm"
						icon="ph:caret-right"
						@click="emit('next')"
					/>
				</div>

				<span class="text-lg font-medium tracking-wide text-primary-900">
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
					:model-value="view"
					:items="viewOptions"
					class="w-48"
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
	import type { DataCalendarDayOfWeek, DataCalendarLegendItem, DataCalendarView } from "./types";
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
	}>(), {
		locale: "en-US",
		translationLocale: "en",
		legend: () => [],
		firstDayOfWeek: undefined
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
