<template>
	<UInputDate
		ref="inputDate"
		:model-value="dateRange"
		:locale="dateLocale"
		granularity="day"
		range
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
		data-testid="range-date-picker-input"
		@update:model-value="handleInputUpdate"
		@focusout="handleFocusOut"
	>
		<template #trailing>
			<UButton
				v-if="hasValue && props.clearable && !isLocked"
				color="neutral"
				variant="link"
				size="sm"
				icon="ph:x-circle"
				:aria-label="t('sActions.clear')"
				class="px-0"
				@click="clearDates"
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
					:aria-label="t('sRangeDatePicker.openCalendar')"
					class="px-0"
					:disabled="isLocked"
					data-testid="range-date-picker-trigger-button"
				/>

				<template #content="{ close }">
					<div class="flex divide-x divide-default" :class="[props.ui?.content]">
						<div
							v-if="presetGroups.length"
							class="s-scrollbar flex max-h-80 min-w-44 flex-col self-stretch overflow-y-auto py-2"
						>
							<UButton
								:label="t('sRangeDatePicker.custom')"
								v-bind="presetButton(isCustomRange)"
								:disabled="!isCustomRange"
							/>
							<template v-for="group in presetGroups" :key="group.direction">
								<USeparator class="my-1" />
								<span class="px-4 py-1 text-xs font-medium text-muted">
									{{ group.label }}
								</span>
								<UButton
									v-for="preset in group.presets"
									:key="preset.label"
									:label="preset.label"
									v-bind="presetButton(isPresetSelected(preset))"
									@click="selectPreset(preset); props.closeOnSelect && close()"
								/>
							</template>
						</div>

						<UCalendar
							v-bind="calendarBindings"
							:model-value="dateRange"
							range
							prevent-deselect
							:ui="calendarUi"
							@update:model-value="(value) => handleCalendarUpdate(value, close)"
						>
							<template v-if="selectedPreset" #heading>
								<span class="text-sm font-medium text-highlighted">{{ selectedPreset.label }}</span>
							</template>

							<template #day="{ day }">
								<slot name="day" :day="day">
									<span :data-testid="`range-date-picker-day-cell-${day.toString()}`">{{ day.day }}</span>
								</slot>
							</template>
						</UCalendar>
					</div>
				</template>
			</UPopover>
		</template>
	</UInputDate>
</template>

<script lang="ts" setup>
	import type { CalendarDate, DateValue } from "@internationalized/date";
	import type { ComponentPublicInstance } from "vue";
	import type { DateRangePreset, DateRangePresetDirection, SRangeDatePickerProps } from "./types";
	import { toCalendarDate } from "@internationalized/date";
	import { useLocale } from "@nuxt/ui/composables";
	import { computed, shallowRef, useTemplateRef } from "vue";
	import { differenceInDays, getTodayCalendarDate, resolveDateRangePreset, safeParseDate } from "../../utils/date";
	import { mergeSlot } from "../../utils/mergeSlot";
	import { useCalendarBindings } from "./useCalendarBindings";

	type DateRange = { start: DateValue | undefined, end: DateValue | undefined } | null | undefined;

	const props = withDefaults(defineProps<SRangeDatePickerProps>(), {
		clearable: true,
		calendar: true,
		closeOnSelect: true,
		icon: "ph:calendar-blank",
		weekStartsOn: 1,
		numberOfMonths: 2,
		showPresets: false,
		defaultPresets: true
	});

	const emit = defineEmits<{
		/** Once per complete range (both dates set), after the start/end models are updated. */
		change: [range: { start: string, end: string }]
	}>();

	defineSlots<{
		/** A calendar day cell (replaces the default label and its `data-testid`). */
		day?: (props: { day: DateValue }) => unknown
	}>();

	/** ISO "YYYY-MM-DD", `undefined` when empty. A partial range is allowed mid-selection. */
	const startModel = defineModel<string | undefined>("start");
	const endModel = defineModel<string | undefined>("end");

	const { t } = useLocale();
	const { calendarBindings, dateLocale, minDate, maxDate, isInputDateUnavailable } = useCalendarBindings(props, "range-date-picker");

	// Typed by hand: inferring it from the template would be circular, the popover inside the input reads `anchor`
	const inputDate = useTemplateRef<{ inputsRef: ComponentPublicInstance[] }>("inputDate");
	// The input renders a fragment, so its own `$el` is not an element: anchor the popover to the segments' field instead.
	const anchor = computed<HTMLElement | undefined>(() => inputDate.value?.inputsRef[0]?.$el?.parentElement ?? undefined);

	const isLocked = computed(() => props.disabled || props.readonly);
	const hasValue = computed(() => Boolean(startModel.value || endModel.value));

	const inputUi = computed(() => ({ ...props.ui?.input, base: mergeSlot("w-full", props.ui?.input?.base) }));
	const calendarUi = computed(() => ({ ...props.ui?.calendar, root: mergeSlot("p-2", props.ui?.calendar?.root), body: mergeSlot("flex-row", props.ui?.calendar?.body) }));

	// Value

	const toDateString = (value: DateValue | undefined) => (value ? toCalendarDate(value).toString() : undefined);

	// null = no pending edit (lazy mode buffer, committed on focus out)
	const pendingRange = shallowRef<DateRange>(null);

	// Pending keystrokes win while typing, otherwise the models
	const dateRange = computed<DateRange>(() => {
		if (pendingRange.value) return pendingRange.value;
		const start = safeParseDate(startModel.value);
		const end = safeParseDate(endModel.value);
		return start || end ? { start, end } : undefined;
	});

	const commitRange = (value: DateRange) => {
		pendingRange.value = null;
		// Typing a segment can transiently produce an end before the start: never propagate that
		if (value?.start && value.end && value.start.compare(value.end) > 0) return;

		const start = toDateString(value?.start);
		const end = toDateString(value?.end);
		if (startModel.value === start && endModel.value === end) return;

		startModel.value = start;
		endModel.value = end;
		if (start && end) emit("change", { start, end });
	};

	const handleInputUpdate = (value: DateRange) => {
		if (props.lazy) {
			pendingRange.value = value;
			return;
		}
		commitRange(value);
	};

	const handleCalendarUpdate = (value: DateRange, close: () => void) => {
		commitRange(value);
		if (props.closeOnSelect && value?.start && value.end) close();
	};

	const handleFocusOut = (event: FocusEvent) => {
		if (!pendingRange.value) return;
		const root = event.currentTarget as HTMLElement;
		if (event.relatedTarget instanceof Node && root.contains(event.relatedTarget)) return;
		commitRange(pendingRange.value);
	};

	const clearDates = () => {
		pendingRange.value = null;
		startModel.value = undefined;
		endModel.value = undefined;
	};

	// Presets

	const builtInPresets = computed<DateRangePreset[]>(() => [
		{ label: t("sRangeDatePicker.presets.last7Days"), days: 7 },
		{ label: t("sRangeDatePicker.presets.last30Days"), days: 30 },
		{ label: t("sRangeDatePicker.presets.thisMonth"), months: 0 },
		{ label: t("sRangeDatePicker.presets.last3Months"), months: 3 },
		{ label: t("sRangeDatePicker.presets.last12Months"), months: 12 },
		{ label: t("sRangeDatePicker.presets.next7Days"), days: 7, direction: "future" },
		{ label: t("sRangeDatePicker.presets.next30Days"), days: 30, direction: "future" },
		{ label: t("sRangeDatePicker.presets.next3Months"), months: 3, direction: "future" },
		{ label: t("sRangeDatePicker.presets.next6Months"), months: 6, direction: "future" },
		{ label: t("sRangeDatePicker.presets.next12Months"), months: 12, direction: "future" }
	]);

	interface ResolvedPreset extends DateRangePreset {
		start: CalendarDate
		end: CalendarDate
	}

	const presetKey = (preset: ResolvedPreset) => `${preset.start}/${preset.end}`;

	const presetGroups = computed(() => {
		if (!props.showPresets) return [];

		const today = getTodayCalendarDate();
		const resolve = (preset: DateRangePreset): ResolvedPreset => ({ ...preset, ...resolveDateRangePreset(preset, today) });

		// Consumer presets come last, so one spanning the same dates as a built-in one replaces it
		const byRange = new Map<string, ResolvedPreset>();
		for (const preset of [...(props.defaultPresets ? builtInPresets.value : []), ...(props.presets ?? [])]) {
			const resolved = resolve(preset);
			byRange.set(presetKey(resolved), resolved);
		}

		const directions: DateRangePresetDirection[] = props.showPresets === true ? ["past", "future"] : [props.showPresets];
		return directions
			.map((direction) => ({
				direction,
				label: t(`sRangeDatePicker.${direction}`),
				presets: [...byRange.values()]
					.filter((preset) => (preset.direction ?? "past") === direction)
					.sort((a, b) => differenceInDays(a.start, a.end) - differenceInDays(b.start, b.end))
			}))
			.filter((group) => group.presets.length);
	});

	const isPresetSelected = (preset: ResolvedPreset) =>
		startModel.value === preset.start.toString() && endModel.value === preset.end.toString();

	const selectedPreset = computed(() => presetGroups.value.flatMap((group) => group.presets).find(isPresetSelected));
	const isCustomRange = computed(() => hasValue.value && !selectedPreset.value);

	const selectPreset = (preset: ResolvedPreset) => {
		pendingRange.value = null;
		startModel.value = preset.start.toString();
		endModel.value = preset.end.toString();
		emit("change", { start: startModel.value, end: endModel.value });
	};

	const presetButton = (selected: boolean) => ({
		color: selected ? "secondary" : "neutral",
		variant: "ghost",
		size: "sm",
		class: ["justify-start rounded-none px-4", selected ? "bg-secondary-100" : "hover:bg-elevated/50"]
	} as const);
</script>
