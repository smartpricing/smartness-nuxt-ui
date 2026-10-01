<template>
	<UInputDate
		ref="inputDate"
		v-model="internalDate"
		:locale="dateLocale"
		granularity="day"
		:min-value="minDate"
		:max-value="maxDate"
		:is-date-unavailable="isInputDateUnavailable"
		:disabled="props.disabled"
		:readonly="props.readonly"
		:size="props.size"
		:color="props.color"
		:variant="props.variant"
		:highlight="props.highlight"
		:ui="inputUi"
		data-testid="date-picker-input"
	>
		<template #trailing>
			<UButton
				v-if="internalDate && props.clearable && !isLocked"
				color="neutral"
				variant="link"
				size="sm"
				icon="ph:x-circle"
				:aria-label="t('sActions.clear')"
				class="px-0"
				@click="model = undefined"
			/>
			<UPopover
				v-if="props.calendar"
				:reference="anchor"
				:content="props.content ?? { align: 'end' }"
			>
				<UButton
					color="neutral"
					variant="link"
					size="sm"
					:icon="props.icon"
					:aria-label="t('sDatePicker.openCalendar')"
					class="px-0"
					:disabled="isLocked"
					data-testid="date-picker-trigger-button"
				/>

				<template #content="{ close }">
					<div class="flex flex-col gap-y-2 p-2" :class="[props.ui?.content]">
						<slot name="calendar-header" :close="close" />
						<UCalendar
							v-bind="calendarBindings"
							v-model="internalDate"
							:ui="props.ui?.calendar"
							@update:model-value="props.closeOnSelect && close()"
						>
							<template #day="{ day }">
								<slot name="day" :day="day">
									<span :data-testid="`date-picker-day-cell-${day.toString()}`">{{ day.day }}</span>
								</slot>
							</template>
						</UCalendar>
						<UButton
							v-if="props.withToday"
							size="sm"
							:label="t('sActions.today')"
							class="ml-auto"
							data-testid="date-picker-today-button"
							@click="setToday(close)"
						/>
						<slot name="calendar-footer" :close="close" />
					</div>
				</template>
			</UPopover>
		</template>
	</UInputDate>
</template>

<script lang="ts" setup>
	import type { DateValue } from "@internationalized/date";
	import type { ComponentPublicInstance } from "vue";
	import type { SDatePickerProps } from "./types";
	import { toCalendarDate } from "@internationalized/date";
	import { useLocale } from "@nuxt/ui/composables";
	import { computed, useTemplateRef } from "vue";
	import { getTodayCalendarDate, safeParseDate } from "../../utils/date";
	import { mergeSlot } from "../../utils/mergeSlot";
	import { useCalendarBindings } from "./useCalendarBindings";

	const props = withDefaults(defineProps<SDatePickerProps>(), {
		clearable: true,
		calendar: true,
		closeOnSelect: true,
		icon: "ph:calendar-blank",
		weekStartsOn: 1,
		numberOfMonths: 1
	});

	defineSlots<{
		/** Above the calendar, inside the popover. */
		"calendar-header"?: (props: { close: () => void }) => unknown
		/** Under the calendar (and the "Today" button), inside the popover. */
		"calendar-footer"?: (props: { close: () => void }) => unknown
		/** A calendar day cell (replaces the default label and its `data-testid`). */
		day?: (props: { day: DateValue }) => unknown
	}>();

	/** ISO "YYYY-MM-DD", `undefined` when empty. */
	const model = defineModel<string | undefined>("date");

	const { t } = useLocale();
	const { calendarBindings, dateLocale, minDate, maxDate, isInputDateUnavailable } = useCalendarBindings(props, "date-picker");

	// Typed by hand: inferring it from the template would be circular, the popover inside the input reads `anchor`
	const inputDate = useTemplateRef<{ inputsRef: ComponentPublicInstance[] }>("inputDate");
	// The input renders a fragment, so its own `$el` is not an element: anchor the popover to the segments' field instead.
	const anchor = computed<HTMLElement | undefined>(() => inputDate.value?.inputsRef[0]?.$el?.parentElement ?? undefined);

	const isLocked = computed(() => props.disabled || props.readonly);
	const inputUi = computed(() => ({ ...props.ui?.input, base: mergeSlot("w-full", props.ui?.input?.base) }));

	const internalDate = computed<DateValue | undefined>({
		get: () => safeParseDate(model.value),
		set: (value) => {
			model.value = value ? toCalendarDate(value).toString() : undefined;
		}
	});

	const setToday = (close: () => void) => {
		internalDate.value = getTodayCalendarDate();
		if (props.closeOnSelect) close();
	};
</script>
