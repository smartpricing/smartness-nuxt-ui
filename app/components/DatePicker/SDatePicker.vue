<template>
	<div
		class="s-datepicker"
		:class="props.ui?.root"
		:style="colorCssVars"
	>
		<!-- Popover mode (not inline) -->
		<UPopover
			v-if="!props.inline"
			v-model:open="popoverOpen"
			:portal="props.teleport"
			:content="{ side: 'bottom', align: 'start' }"
			:ui="{ content: ['ring-0', props.ui?.popover].filter(Boolean).join(' ') }"
		>
			<div class="w-full">
				<slot
					name="trigger"
					:value="modelValue"
					:formatted-value="displayValue"
					:is-open="popoverOpen"
				>
					<UInput
						:model-value="displayValue || undefined"
						:size="props.size"
						:disabled="props.disabled"
						:placeholder="props.placeholder"
						readonly
						class="cursor-pointer" :class="[props.ui?.input]"
						:trailing-icon="canClear ? undefined : props.icon"
					>
						<template
							v-if="canClear"
							#trailing
						>
							<UIcon
								name="ph:x"
								class="cursor-pointer text-muted hover:text-default"
								@click.stop="handleClear"
							/>
						</template>
					</UInput>
				</slot>
			</div>

			<template #content>
				<div
					:style="colorCssVars"
					class="s-datepicker-popover-content"
				>
					<VueDatePicker
						ref="dpRef"
						v-model="internalValue"
						inline
						model-type="yyyy-MM-dd"
						:time-config="{ enableTimePicker: false }"
						:range="dpRangeConfig"
						:multi-dates="isMultipleMode"
						:multi-calendars="multiCalendarsConfig"
						:min-date="parsedMinDate"
						:max-date="parsedMaxDate"
						:disabled="props.disabled"
						:readonly="props.readonly"
						auto-apply
						:week-start="props.weekStartsOn"
						:six-weeks="props.fixedWeeks ? 'center' : false"
						:week-numbers="props.weekNumbers"
						:no-today="props.noToday"
						:hide-offset-dates="props.hideOffsetDates"
						:markers="props.markers"
						:highlight="props.highlight"
						:preset-dates="props.presetDates"
						:locale="props.locale"
						:formats="mergedFormats"
						:flow="props.flow"
						:start-date="parsedStartDate"
						:year-range="props.yearRange"
						:disabled-dates="adaptedDisabledDates"
						:hide-navigation="hiddenNavigation"
						:disable-year-select="!props.yearControls"
						:loading="props.loading"
						:config="dpConfig"
						:ui="dpUiConfig"
						@update:model-value="handleModelUpdate"
						@date-update="handleDateUpdate"
						@range-start="handleRangeStart"
						@range-end="handleRangeEnd"
						@internal-model-change="handleInternalModelChange"
					>
						<template
							v-if="$slots['left-sidebar']"
							#left-sidebar
						>
							<slot name="left-sidebar" />
						</template>

						<template
							v-if="$slots.day"
							#day="dayProps"
						>
							<slot
								name="day"
								v-bind="dayProps"
							/>
						</template>

						<template
							v-if="$slots['action-buttons']"
							#action-buttons="actionProps"
						>
							<slot
								name="action-buttons"
								v-bind="actionProps"
							/>
						</template>

						<template
							v-if="$slots['marker-tooltip']"
							#marker-tooltip="markerProps"
						>
							<slot
								name="marker-tooltip"
								v-bind="markerProps"
							/>
						</template>
					</VueDatePicker>
				</div>
			</template>
		</UPopover>

		<!-- Inline mode: render calendar directly -->
		<VueDatePicker
			v-else
			ref="dpRef"
			v-model="internalValue"
			inline
			model-type="yyyy-MM-dd"
			:time-config="{ enableTimePicker: false }"
			:range="dpRangeConfig"
			:multi-dates="isMultipleMode"
			:multi-calendars="multiCalendarsConfig"
			:min-date="parsedMinDate"
			:max-date="parsedMaxDate"
			:disabled="props.disabled"
			:readonly="props.readonly"
			auto-apply
			:week-start="props.weekStartsOn"
			:six-weeks="props.fixedWeeks ? 'center' : false"
			:week-numbers="props.weekNumbers"
			:no-today="props.noToday"
			:hide-offset-dates="props.hideOffsetDates"
			:markers="props.markers"
			:highlight="props.highlight"
			:preset-dates="props.presetDates"
			:locale="props.locale"
			:formats="mergedFormats"
			:flow="props.flow"
			:start-date="parsedStartDate"
			:year-range="props.yearRange"
			:disabled-dates="adaptedDisabledDates"
			:hide-navigation="hiddenNavigation"
			:disable-year-select="!props.yearControls"
			:loading="props.loading"
			:config="dpConfig"
			:ui="dpUiConfig"
			@update:model-value="handleModelUpdate"
			@date-update="handleDateUpdate"
			@range-start="handleRangeStart"
			@range-end="handleRangeEnd"
			@internal-model-change="handleInternalModelChange"
		>
			<template
				v-if="$slots['left-sidebar']"
				#left-sidebar
			>
				<slot name="left-sidebar" />
			</template>

			<template
				v-if="$slots.day"
				#day="dayProps"
			>
				<slot
					name="day"
					v-bind="dayProps"
				/>
			</template>

			<template
				v-if="$slots['action-buttons']"
				#action-buttons="actionProps"
			>
				<slot
					name="action-buttons"
					v-bind="actionProps"
				/>
			</template>

			<template
				v-if="$slots['marker-tooltip']"
				#marker-tooltip="markerProps"
			>
				<slot
					name="marker-tooltip"
					v-bind="markerProps"
				/>
			</template>
		</VueDatePicker>
	</div>
</template>

<script setup lang="ts">
	import type { Locale } from "date-fns";
	import type {
		DatePickerColor,
		DatePickerFlowConfig,
		DatePickerFormats,
		DatePickerHighlight,
		DatePickerMarker,
		DatePickerMode,
		DatePickerPresetDate,
		DatePickerRangeConfig,
		DatePickerRangeValue,
		DatePickerSize,
		DatePickerUi,
		DatePickerValue
	} from "./types";
	import { VueDatePicker } from "@vuepic/vue-datepicker";

	defineOptions({
		name: "SDatePicker",
		inheritAttrs: false
	});

	const props = withDefaults(defineProps<{
		// ---- Nuxt UI Calendar equivalent props ----

		/** Theme color for selected dates */
		color?: DatePickerColor
		/** Input field size */
		size?: DatePickerSize
		/** Disable the entire datepicker */
		disabled?: boolean
		/** Readonly state */
		readonly?: boolean
		/** Selection mode */
		mode?: DatePickerMode
		/** Advanced range configuration (only used when mode is "range") */
		rangeConfig?: DatePickerRangeConfig
		/** First day of the week (0 = Sunday, 1 = Monday, ..., 6 = Saturday) */
		weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6
		/** Always display 6 weeks in the calendar */
		fixedWeeks?: boolean
		/** Show week numbers */
		weekNumbers?: boolean
		/** Number of calendar months to display side by side */
		numberOfMonths?: number
		/** Minimum selectable date (ISO "YYYY-MM-DD") */
		minValue?: string
		/** Maximum selectable date (ISO "YYYY-MM-DD") */
		maxValue?: string
		/** Function to disable specific dates. Receives ISO date string, return true to disable. */
		isDateDisabled?: (date: string) => boolean
		/** Show month navigation controls */
		monthControls?: boolean
		/** Show year navigation controls */
		yearControls?: boolean

		// ---- VueDatePicker-specific props ----

		/** date-fns Locale object for localization */
		locale?: Locale
		/** Render calendar inline (no input trigger) */
		inline?: boolean
		/** Markers displayed on specific dates */
		markers?: DatePickerMarker[]
		/** Highlighted dates configuration */
		highlight?: DatePickerHighlight
		/** Preset date entries for sidebar */
		presetDates?: DatePickerPresetDate[]
		/** Hide today marker on the calendar */
		noToday?: boolean
		/** Hide dates from adjacent months */
		hideOffsetDates?: boolean
		/** Format configuration for displayed values */
		formats?: DatePickerFormats
		/** Selection flow (step-by-step picking) */
		flow?: DatePickerFlowConfig
		/** Year picker range bounds */
		yearRange?: [number, number]
		/** Open calendar to a specific date (ISO "YYYY-MM-DD") */
		startDate?: string
		/** Teleport the popover content to body or a custom CSS selector */
		teleport?: boolean | string
		/** Input placeholder text */
		placeholder?: string
		/** Show clear button on input */
		clearable?: boolean
		/** Trailing icon on the input field */
		icon?: string
		/** Show loading overlay on the calendar */
		loading?: boolean
		/** Change month by scrolling the mouse wheel over the calendar */
		monthChangeOnScroll?: boolean | string
		/** Custom formatter function for the input display value */
		formatter?: (value: DatePickerValue) => string

		// ---- Style / UI props ----

		/** CSS class overrides for component parts */
		ui?: DatePickerUi
	}>(), {
		color: "primary",
		size: "md",
		disabled: false,
		readonly: false,
		mode: "single",
		weekStartsOn: 1,
		fixedWeeks: true,
		weekNumbers: false,
		numberOfMonths: 1,
		monthControls: true,
		yearControls: true,
		inline: false,
		markers: () => [],
		presetDates: () => [],
		noToday: false,
		hideOffsetDates: false,
		yearRange: () => [1900, 2100],
		teleport: true,
		clearable: true,
		icon: "ph:calendar",
		loading: false
	});

	const emit = defineEmits<{
		/** Calendar popup opened */
		open: []
		/** Calendar popup closed */
		closed: []
		/** Value cleared */
		cleared: []
		/** Emitted whenever the model value changes */
		change: [value: DatePickerValue]
		/** Emitted on user date click interactions */
		input: [value: DatePickerValue]
	}>();

	defineSlots<{
		/** Override the trigger input element */
		trigger: (props: {
			value: DatePickerValue
			formattedValue: string
			isOpen: boolean
		}) => unknown
		/** Content for the left sidebar panel */
		"left-sidebar": () => unknown
		/** Custom day cell rendering */
		day: (props: { date: Date, day: number }) => unknown
		/** Custom action buttons */
		"action-buttons": (props: {
			value: unknown
			selectDate: () => void
			selectionDisabled: boolean
		}) => unknown
		/** Custom marker tooltip */
		"marker-tooltip": (props: {
			day: Date
			tooltip: { text?: string, html?: string, color?: string }
		}) => unknown
	}>();

	// ---- v-model ----
	const modelValue = defineModel<DatePickerValue>({
		default: null
	});

	// ---- Internal refs ----
	const dpRef = ref<InstanceType<typeof VueDatePicker> | null>(null);
	const popoverOpen = ref(false);

	// ---- Utilities ----

	/** Convert a Date object to an ISO "YYYY-MM-DD" string in local timezone */
	function toIsoString(date: Date): string {
		const y = date.getFullYear();
		const m = String(date.getMonth() + 1).padStart(2, "0");
		const d = String(date.getDate()).padStart(2, "0");
		return `${y}-${m}-${d}`;
	}

	/** Parse an ISO "YYYY-MM-DD" string to a local-timezone Date (avoids UTC off-by-one) */
	function parseIsoToLocalDate(iso: string): Date | undefined {
		const d = new Date(`${iso}T00:00:00`);
		return Number.isNaN(d.getTime()) ? undefined : d;
	}

	/** Format an ISO date string using simple date-fns-style tokens */
	function formatDate(isoDate: string, formatStr: string): string {
		const d = parseIsoToLocalDate(isoDate);
		if (!d) return isoDate;
		const tokens: Record<string, string> = {
			dd: String(d.getDate()).padStart(2, "0"),
			MM: String(d.getMonth() + 1).padStart(2, "0"),
			yyyy: String(d.getFullYear()),
			yy: String(d.getFullYear()).slice(-2),
			d: String(d.getDate()),
			M: String(d.getMonth() + 1)
		};
		return formatStr.replace(/yyyy|yy|dd|MM|d|M/g, (m) => tokens[m] ?? m);
	}

	// ---- Clear button logic ----

	/** Whether the value is non-empty (handles string, range object, and array) */
	const hasValue = computed(() => {
		const val = modelValue.value;
		if (val === null || val === undefined) return false;
		if (Array.isArray(val)) return val.length > 0;
		if (typeof val === "object") return Boolean(val.start);
		return val !== "";
	});

	/** Whether the clear button should be shown and active */
	const canClear = computed(() => {
		return props.clearable && hasValue.value && !props.disabled && !props.readonly;
	});

	/** Clear the value and emit cleared event */
	function handleClear() {
		modelValue.value = null;
		emit("cleared");
	}

	// ---- Display value formatting ----

	/** Merge user formats with date-only defaults (no time) */
	const mergedFormats = computed(() => {
		return {
			input: "dd/MM/yyyy",
			...props.formats
		};
	});

	/** Formatted display value for the trigger input */
	const displayValue = computed(() => {
		const val = modelValue.value;

		if (props.formatter) {
			const formatted = props.formatter(val);
			if (formatted) return formatted;
		}

		if (!val) return "";

		const fmt = (typeof mergedFormats.value.input === "string")
			? mergedFormats.value.input
			: "dd/MM/yyyy";

		if (typeof val === "string") return formatDate(val, fmt);
		if (Array.isArray(val)) return val.map((v) => formatDate(v, fmt)).join(", ");

		const parts = [formatDate(val.start, fmt)];
		if (val.end) parts.push(formatDate(val.end, fmt));
		return parts.join(" - ");
	});

	// ---- Color CSS variables ----
	const COLOR_MAP: Record<DatePickerColor, Record<string, string>> = {
		primary: {
			"--dp-primary-color": "#6868C4",
			"--dp-primary-text-color": "#fff",
			"--dp-hover-color": "#ECECFF",
			"--dp-hover-text-color": "#6868C4",
			"--dp-range-between-dates-background-color": "#6868C4",
			"--dp-range-between-dates-text-color": "#fff"
		},
		secondary: {
			"--dp-primary-color": "var(--color-secondary-500)",
			"--dp-primary-disabled-color": "var(--color-secondary-200)",
			"--dp-primary-text-color": "var(--color-white)",
			"--dp-hover-color": "var(--color-secondary-500)",
			"--dp-range-between-dates-background-color": "var(--color-secondary-500)",
			"--dp-range-between-dates-text-color": "var(--color-white)"
		},
		success: {
			"--dp-primary-color": "var(--color-success-500)",
			"--dp-primary-disabled-color": "var(--color-success-200)",
			"--dp-primary-text-color": "var(--color-white)",
			"--dp-hover-color": "var(--color-success-500)",
			"--dp-range-between-dates-background-color": "var(--color-success-500)",
			"--dp-range-between-dates-text-color": "var(--color-white)"
		},
		info: {
			"--dp-primary-color": "var(--color-info-500)",
			"--dp-primary-disabled-color": "var(--color-info-200)",
			"--dp-primary-text-color": "var(--color-white)",
			"--dp-hover-color": "var(--color-info-500)",
			"--dp-range-between-dates-background-color": "var(--color-info-500)",
			"--dp-range-between-dates-text-color": "var(--color-white)"
		},
		warning: {
			"--dp-primary-color": "var(--color-warning-500)",
			"--dp-primary-disabled-color": "var(--color-warning-200)",
			"--dp-primary-text-color": "var(--color-white)",
			"--dp-hover-color": "var(--color-warning-500)",
			"--dp-range-between-dates-background-color": "var(--color-warning-500)",
			"--dp-range-between-dates-text-color": "var(--color-white)"
		},
		error: {
			"--dp-primary-color": "var(--color-error-500)",
			"--dp-primary-disabled-color": "var(--color-error-200)",
			"--dp-primary-text-color": "var(--color-white)",
			"--dp-hover-color": "var(--color-error-500)",
			"--dp-range-between-dates-background-color": "var(--color-error-500)",
			"--dp-range-between-dates-text-color": "var(--color-white)"
		},
		neutral: {
			"--dp-primary-color": "var(--color-gray-700)",
			"--dp-primary-disabled-color": "var(--color-gray-300)",
			"--dp-primary-text-color": "var(--color-white)",
			"--dp-hover-color": "var(--color-gray-700)",
			"--dp-range-between-dates-background-color": "var(--color-gray-700)",
			"--dp-range-between-dates-text-color": "var(--color-white)"
		}
	};

	const colorCssVars = computed(() => COLOR_MAP[props.color] ?? COLOR_MAP.primary);

	// ---- Computed: internal value conversion ----
	// VueDatePicker with model-type="yyyy-MM-dd" uses:
	//   Single: string
	//   Range: [string, string | null]
	//   Multi: string[]
	// We convert to/from our external model format.
	const isRangeMode = computed(() => props.mode === "range");
	const isMultipleMode = computed(() => props.mode === "multiple");

	const internalValue = ref<string | string[] | null>(null);

	function updateModelValue(newVal: DatePickerValue) {
		const oldStr = JSON.stringify(modelValue.value);
		const newStr = JSON.stringify(newVal);
		if (oldStr !== newStr) {
			modelValue.value = newVal;
			nextTick(() => {
				emit("change", modelValue.value);
			});
		}
	}

	watch(
		() => modelValue.value,
		(val) => {
			if (val === null || val === undefined) {
				internalValue.value = null;
				return;
			}

			if (isRangeMode.value && typeof val === "object" && !Array.isArray(val)) {
				const rangeVal = val as DatePickerRangeValue;
				internalValue.value = [rangeVal.start, rangeVal.end ?? ""];
				return;
			}

			internalValue.value = val as string | string[];
		},
		{ immediate: true }
	);

	watch(
		internalValue,
		(newVal) => {
			if (newVal === null || newVal === undefined) {
				updateModelValue(null);
				return;
			}

			if (isRangeMode.value && Array.isArray(newVal)) {
				const arr = newVal as string[];
				const start = arr[0] ?? "";
				const end = arr[1] && arr[1] !== "" ? arr[1] : null;

				const allowPartial = typeof props.rangeConfig === "object" && props.rangeConfig.partialRange;
				
				if (!end && !allowPartial) {
					return;
				}

				updateModelValue({ start, end });
				return;
			}

			if (isMultipleMode.value && Array.isArray(newVal)) {
				updateModelValue(newVal as string[]);
				return;
			}

			updateModelValue(newVal as string);
		},
		{ deep: true }
	);

	// ---- Event handlers ----

	/** Handle model updates: smart auto-close logic */
	function handleModelUpdate() {
		nextTick(() => {
			// Multiple: never auto-close (user closes by clicking outside)
			if (isMultipleMode.value) return;

			// Range: close only when both start and end are selected
			if (isRangeMode.value) {
				const val = internalValue.value as string[];
				if (Array.isArray(val) && val[0] && val[1]) {
					popoverOpen.value = false;
				}
				return;
			}

			// Single: close immediately after selection
			popoverOpen.value = false;
		});
	}

	/** Handle single date click */
	function handleDateUpdate(date: Date) {
		if (props.mode === "single") {
			emit("input", toIsoString(date));
		}
	}

	/** Handle range start selection */
	function handleRangeStart(date: Date) {
		if (isRangeMode.value) {
			emit("input", { start: toIsoString(date), end: null });
		}
	}

	/** Handle range end selection */
	function handleRangeEnd(_date: Date) {
		if (isRangeMode.value) {
			nextTick(() => {
				emit("input", modelValue.value);
			});
		}
	}

	/** Track last emitted multi-select key to deduplicate @internal-model-change events */
	const lastMultipleKey = ref<string | null>(null);
	const ignoreNextInternal = ref(false);

	function resetMultipleInternalState() {
		lastMultipleKey.value = null;
		ignoreNextInternal.value = false;
	}

	/** Handle internal model change for multiple selection mode */
	function handleInternalModelChange(value: unknown) {
		if (!isMultipleMode.value) return;

		// Suppress the first event after open (VueDatePicker fires it immediately)
		if (ignoreNextInternal.value) {
			ignoreNextInternal.value = false;
			return;
		}

		if (!Array.isArray(value)) return;
		const arr = (value as string[]).filter(Boolean);
		if (arr.length === 0) return;

		// Deduplicate: only emit when the set of selected dates actually changes
		const key = JSON.stringify(arr);
		if (key === lastMultipleKey.value) return;
		lastMultipleKey.value = key;

		emit("input", arr);
	}

	// ---- Popover open/close state management ----
	watch(popoverOpen, (isOpen) => {
		if (isOpen) {
			if (isMultipleMode.value) {
				ignoreNextInternal.value = true;
			}
			emit("open");
		} else {
			if (isRangeMode.value && Array.isArray(internalValue.value)) {
				const arr = internalValue.value as string[];
				const allowPartial = typeof props.rangeConfig === "object" && props.rangeConfig.partialRange;
				// If partial selection is active but not allowed, revert
				if (arr[0] && (!arr[1] || arr[1] === "") && !allowPartial) {
					const val = modelValue.value;
					if (val && typeof val === "object" && !Array.isArray(val)) {
						const rangeVal = val as DatePickerRangeValue;
						internalValue.value = [rangeVal.start, rangeVal.end ?? ""];
					} else {
						internalValue.value = null;
					}
				}
			}

			resetMultipleInternalState();
			emit("closed");
		}
	});

	// ---- Computed: prop adapters ----

	/** Convert mode and rangeConfig prop to VueDatePicker range value */
	const dpRangeConfig = computed(() => {
		if (!isRangeMode.value) return undefined;
		return props.rangeConfig ?? true;
	});

	/** Convert numberOfMonths to multi-calendars config */
	const multiCalendarsConfig = computed(() => {
		if (props.numberOfMonths > 1) {
			return { count: props.numberOfMonths };
		}
		return undefined;
	});

	/** Convert minValue ISO string to Date */
	const parsedMinDate = computed(() => {
		if (!props.minValue) return undefined;
		return parseIsoToLocalDate(props.minValue);
	});

	/** Convert maxValue ISO string to Date */
	const parsedMaxDate = computed(() => {
		if (!props.maxValue) return undefined;
		return parseIsoToLocalDate(props.maxValue);
	});

	/** Convert startDate ISO string to Date */
	const parsedStartDate = computed(() => {
		if (!props.startDate) return undefined;
		return parseIsoToLocalDate(props.startDate);
	});

	/** Adapt isDateDisabled from (string) => boolean to (Date) => boolean */
	const adaptedDisabledDates = computed(() => {
		if (!props.isDateDisabled) return undefined;
		return (date: Date) => {
			return props.isDateDisabled!(toIsoString(date));
		};
	});

	/** Build hide-navigation array from monthControls prop */
	const hiddenNavigation = computed(() => {
		const hidden: ("month" | "year" | "calendar" | "time" | "minutes" | "hours" | "seconds")[] = [];
		if (!props.monthControls) {
			hidden.push("month");
		}
		return hidden;
	});

	/** VueDatePicker config prop */
	const dpConfig = computed(() => {
		const config: { monthChangeOnScroll?: boolean | string } = {};
		if (props.monthChangeOnScroll !== undefined) {
			config.monthChangeOnScroll = props.monthChangeOnScroll;
		}
		return config;
	});

	/** VueDatePicker ui prop (for calendar class overrides) */
	const dpUiConfig = computed(() => {
		const menuClasses = [`s-datepicker-menu--${props.color}`];
		if (props.mode === "single") menuClasses.push("s-datepicker-menu--single");
		if (props.mode === "range") menuClasses.push("s-datepicker-menu--range");
		if (props.ui?.calendar) menuClasses.push(props.ui.calendar);
		return {
			menu: menuClasses.join(" ")
		};
	});

	watch(() => props.mode, () => {
		resetMultipleInternalState();
	});

	// ---- Exposed methods ----
	function openMenu() {
		popoverOpen.value = true;
	}

	function closeMenu() {
		popoverOpen.value = false;
	}

	defineExpose({
		/** Programmatically open the calendar */
		openMenu,
		/** Programmatically close the calendar */
		closeMenu,
		/** Clear the selected value */
		clearValue: handleClear
	});
</script>

<style>
	@import "@vuepic/vue-datepicker/dist/main.css";

	/* ============================================ */
	/* Smartness Design System Overrides            */
	/* Based on the original Smartness DatePicker.   */
	/* ============================================ */

	/* ---- Theme variables (applied via .dp__theme_light) ---- */

	.s-datepicker-menu--primary {
		--dp-primary-color: #6868C4;
		--dp-primary-text-color: #fff;
		--dp-hover-color: #ECECFF;
		--dp-hover-text-color: #6868C4;
		--dp-range-between-dates-background-color: #6868C4;
		--dp-range-between-dates-text-color: #fff;
	}

	.s-datepicker-menu--secondary {
		--dp-primary-color: var(--color-secondary-500);
		--dp-primary-disabled-color: var(--color-secondary-200);
		--dp-primary-text-color: var(--color-white);
		--dp-hover-color: var(--color-secondary-500);
		--dp-range-between-dates-background-color: var(--color-secondary-500);
		--dp-range-between-dates-text-color: var(--color-white);
	}

	.s-datepicker-menu--success {
		--dp-primary-color: var(--color-success-500);
		--dp-primary-disabled-color: var(--color-success-200);
		--dp-primary-text-color: var(--color-white);
		--dp-hover-color: var(--color-success-500);
		--dp-range-between-dates-background-color: var(--color-success-500);
		--dp-range-between-dates-text-color: var(--color-white);
	}

	.s-datepicker-menu--info {
		--dp-primary-color: var(--color-info-500);
		--dp-primary-disabled-color: var(--color-info-200);
		--dp-primary-text-color: var(--color-white);
		--dp-hover-color: var(--color-info-500);
		--dp-range-between-dates-background-color: var(--color-info-500);
		--dp-range-between-dates-text-color: var(--color-white);
	}

	.s-datepicker-menu--warning {
		--dp-primary-color: var(--color-warning-500);
		--dp-primary-disabled-color: var(--color-warning-200);
		--dp-primary-text-color: var(--color-white);
		--dp-hover-color: var(--color-warning-500);
		--dp-range-between-dates-background-color: var(--color-warning-500);
		--dp-range-between-dates-text-color: var(--color-white);
	}

	.s-datepicker-menu--error {
		--dp-primary-color: var(--color-error-500);
		--dp-primary-disabled-color: var(--color-error-200);
		--dp-primary-text-color: var(--color-white);
		--dp-hover-color: var(--color-error-500);
		--dp-range-between-dates-background-color: var(--color-error-500);
		--dp-range-between-dates-text-color: var(--color-white);
	}

	.s-datepicker-menu--neutral {
		--dp-primary-color: var(--color-gray-700);
		--dp-primary-disabled-color: var(--color-gray-300);
		--dp-primary-text-color: var(--color-white);
		--dp-hover-color: var(--color-gray-700);
		--dp-range-between-dates-background-color: var(--color-gray-700);
		--dp-range-between-dates-text-color: var(--color-white);
	}

	.dp__theme_light.s-datepicker-menu--single,
	.dp__theme_light.s-datepicker-menu--range {
		--dp-cell-border-radius: 50%;
	}

	.dp__theme_light {
		--dp-font-family: "Saans";
		--dp-background-color: var(--color-white);
		--dp-text-color: var(--color-petrol-blue-900);
		--dp-hover-color: #ECECFF;
		--dp-hover-text-color: #6868C4;

		--dp-primary-color: #6868C4;
		--dp-primary-text-color: #fff;
		--dp-primary-disabled-color: #6bacea;
		--dp-secondary-color: var(--color-primary-500);
		--dp-success-color: #76d275;
		--dp-success-color-disabled: #a3d9b1;

		--dp-disabled-color: #f6f6f6;
		--dp-disabled-color-text: var(--color-primary-400);

		--dp-menu-border-color: #e0e3e6;
		--dp-border-color-hover: #e0e3e6;
		--dp-border-color-focus: var(--color-sky-600);

		--dp-scroll-bar-background: #f3f3f3;
		--dp-scroll-bar-color: #959595;

		--dp-icon-color: #959595;
		--dp-danger-color: #ff6f60;
		--dp-marker-color: #ff6f60;
		--dp-tooltip-color: #fafafa;

		--dp-highlight-color: rgb(25 118 210 / 10%);

		--dp-range-between-dates-background-color: #6868C4;
		--dp-range-between-dates-text-color: #fff;
		--dp-range-between-border-color: transparent;

		--dp-border-radius: 4px;
		--dp-cell-border-radius: 2px;
		--dp-menu-padding: 12px;

		--dp-button-height: 25px;
		--dp-month-year-row-height: 25px;
		--dp-input-icon-padding: 45px;
		--dp-month-year-row-button-size: 25px;
		--dp-cell-size: 32px;
		--dp-cell-padding: 0px;
		--dp-font-size: 12px;
	}

	/* ---- Trigger input: ensure left-aligned text ---- */

	.s-datepicker input {
		text-align: left;
	}

	/* ---- Inline calendar inside UPopover: clean up VueDatePicker wrapper artifacts ---- */

	.s-datepicker-popover-content .dp__main {
		border: none;
		box-shadow: none;
	}

	.s-datepicker-popover-content .dp__main > div:first-child:not(.dp__outer_menu_wrap) {
		display: none;
	}

	.s-datepicker-popover-content .dp__menu {
		border: none;
	}

	.s-datepicker-popover-content .dp__outer_menu_wrap {
		box-shadow: none;
	}

	/* ---- Left sidebar border ---- */

	.dp__sidebar_left {
		border-right: none !important;
	}

	/* ---- Highlight cell color ---- */

	.dp__cell_highlight {
		background-color: var(--dp-primary-color);
		color: var(--dp-primary-text-color);
		border-radius: 50%;
	}

	/* ---- Today indicator (lemon background) ---- */

	.dp__today {
		border-color: #E4FF00;
		background-color: #E4FF00;
		color: var(--color-lemon-900);
	}

	.dp__today.dp__active_date {
		background-color: var(--dp-primary-color);
		border-color: var(--dp-primary-color);
		color: var(--dp-primary-text-color);
	}

	.dp__today.dp__range_start,
	.dp__today.dp__range_end {
		background-color: var(--dp-primary-color);
		border-color: var(--dp-primary-color);
		color: var(--dp-primary-text-color);
	}

	.dp__today.dp__range_between {
		background-color: var(--dp-primary-color) !important;
		border-color: transparent !important;
		color: var(--dp-primary-text-color) !important;
	}

	/* ---- Disabled cells ---- */

	.dp__cell_disabled {
		background: transparent !important;
		color: var(--dp-disabled-color-text);
	}

	.dp__cell_disabled.dp__range_start,
	.dp__cell_disabled.dp__range_end,
	.dp__cell_disabled.dp__range_between {
		background-color: var(--dp-disabled-color) !important;
		color: var(--dp-disabled-color-text) !important;
		border-color: transparent !important;
		border-radius: 50% !important;
	}

	/* ---- Month/year navigation ---- */

	.dp__month_year_wrap svg {
		fill: var(--color-petrol-blue-900);
	}

	.dp__month_year_wrap .dp__btn {
		font-weight: 570 !important;
	}

	.dp__month_year_wrap > button:hover {
		background-color: var(--color-sky-200);
		color: var(--color-petrol-blue-900);
	}

	.dp__month_year_wrap {
		width: 100%;
		display: flex;
		gap: 2px;
	}

	/* ---- Range cells as separate circles ---- */

	.dp__range_start,
	.dp__range_end {
		border-radius: 50% !important;
		color: var(--dp-primary-text-color);
	}

	.dp__range_between {
		border-radius: 50% !important;
		background-color: var(--dp-primary-color) !important;
		color: var(--dp-primary-text-color) !important;
		border-color: transparent !important;
	}

	.dp__date_hover_start,
	.dp__date_hover_end,
	.dp__date_hover {
		border-radius: 50% !important;
	}

	/* ---- Calendar cells ---- */

	.dp__calendar_item {
		width: var(--dp-cell-size);
		height: var(--dp-cell-size);
	}

	.dp__cell_inner {
		width: 100%;
	}

	/* ---- Calendar body ---- */

	.dp__calendar {
		position: relative;
		font-weight: 380;
	}

	/* ---- Calendar header (day names) ---- */

	.dp__calendar_header {
		--dp-text-color: var(--color-primary-700);
		font-weight: 570;
	}

	.dp--header-wrap {
		margin-bottom: 8px;
	}

	/* ---- Multi-calendar layout ---- */

	.dp__flex_display {
		display: flex;
		gap: 16px;
	}

	.dp__calendar_next {
		margin-inline-start: 0;
	}

	/* ---- Preset dates sidebar ---- */

	.dp__preset_ranges {
		font-size: var(--dp-font-size);
	}

	.dp__preset_range {
		padding: 6px 12px;
		border-radius: var(--dp-cell-border-radius);
	}

	.dp__preset_range:hover {
		background-color: var(--dp-hover-color);
		color: var(--dp-hover-text-color);
	}
</style>
