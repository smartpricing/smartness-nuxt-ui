<template>
	<div class="flex items-center gap-4">
		<UButton
			v-if="props.todayButton"
			:label="t('sActions.today')"
			variant="outline"
			:disabled="props.disabled || isToday"
			data-testid="date-navigator-today-button"
			@click="model = getTodayString()"
		/>

		<div class="flex items-center gap-1">
			<UButton
				icon="ph:caret-left"
				variant="ghost"
				color="neutral"
				size="sm"
				:aria-label="t('sActions.previous')"
				:disabled="props.disabled || !canStep(-1)"
				data-testid="date-navigator-prev-button"
				@click="step(-1)"
			/>
			<UPopover :content="props.content">
				<UButton
					:label="label"
					variant="ghost"
					color="neutral"
					size="sm"
					class="font-normal whitespace-nowrap"
					:disabled="props.disabled"
					data-testid="date-navigator-label-button"
				/>

				<template #content="{ close }">
					<UCalendar
						v-bind="calendarBindings"
						v-model="calendarDate"
						class="p-2"
						data-testid="date-navigator-calendar"
						@update:model-value="close()"
					/>
				</template>
			</UPopover>
			<UButton
				icon="ph:caret-right"
				variant="ghost"
				color="neutral"
				size="sm"
				:aria-label="t('sActions.next')"
				:disabled="props.disabled || !canStep(1)"
				data-testid="date-navigator-next-button"
				@click="step(1)"
			/>
		</div>
	</div>
</template>

<script lang="ts" setup>
	import type { DateValue } from "@internationalized/date";
	import type { SDateNavigatorProps } from "./types";
	import { toCalendarDate } from "@internationalized/date";
	import { useLocale } from "@nuxt/ui/composables";
	import { computed } from "vue";
	import { formatDate, getTodayString, getWeekRange, safeParseDate } from "../../utils/date";
	import { useCalendarBindings } from "./useCalendarBindings";

	const props = withDefaults(defineProps<SDateNavigatorProps>(), {
		period: "day",
		weekAnchor: "from-selection",
		todayButton: true,
		weekStartsOn: 1
	});

	/** ISO "YYYY-MM-DD" — always set, today by default. */
	const model = defineModel<string>("date", { default: () => getTodayString() });

	const { t } = useLocale();
	const { calendarBindings, dateLocale, minDate, maxDate } = useCalendarBindings(props, "date-navigator");

	const isToday = computed(() => model.value === getTodayString());
	const stepDays = computed(() => (props.period === "week" ? 7 : 1));

	const label = computed(() => {
		if (props.format) return props.format(model.value);
		if (props.period === "week") {
			const { from, to } = getWeekRange(model.value, props.weekAnchor);
			return `${formatDate(from, "dateShort", dateLocale.value)} - ${formatDate(to, "dateShort", dateLocale.value)}`;
		}
		return isToday.value ? t("sActions.today") : formatDate(model.value, "date", dateLocale.value);
	});

	const shifted = (direction: 1 | -1) => safeParseDate(model.value)?.add({ days: direction * stepDays.value });

	// Blocked only when the whole next step lies past the bound
	const canStep = (direction: 1 | -1) => {
		const next = shifted(direction);
		if (!next) return false;
		if (direction < 0 && minDate.value) return next.compare(toCalendarDate(minDate.value)) >= 0;
		if (direction > 0 && maxDate.value) return next.compare(toCalendarDate(maxDate.value)) <= 0;
		return true;
	};

	const step = (direction: 1 | -1) => {
		const next = shifted(direction);
		if (next) model.value = next.toString();
	};

	const calendarDate = computed<DateValue | undefined>({
		get: () => safeParseDate(model.value),
		set: (value) => {
			if (value) model.value = toCalendarDate(value).toString();
		}
	});
</script>
