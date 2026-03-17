<template>
	<div
		class="flex items-center gap-4"
		:class="disabled ? 'cursor-not-allowed' : ''"
	>
		<!-- Left inline badge -->
		<UBadge
			v-if="showLeftBadge"
			variant="solid"
			:class="badgeClass"
			:style="badgeStyle"
			:ui="badgeUi"
		>
			<slot
				name="label"
				:value="leftBadgeValue"
				:formatted-value="leftBadgeFormatted"
			>
				{{ leftBadgeFormatted }}
			</slot>
		</UBadge>

		<!-- Slider -->
		<div class="relative flex-1">
			<USlider
				v-model="modelValue"
				:default-value="defaultValue"
				:min="min"
				:max="max"
				:step="step"
				:disabled="disabled"
				:inverted="inverted"
				:orientation="orientation"
				:min-steps-between-thumbs="minStepsBetweenThumbs"
				:color="color"
				:tooltip="tooltipConfig"
				:ui="sliderUi"
				class="w-full"
				@change="(e: Event) => emit('change', e)"
			/>
			<!-- Center marker (range only) -->
			<div
				v-if="showCenterMarker"
				class="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-0.5 h-1 bg-(--color-petrol-blue-200) pointer-events-none"
				:style="{ left: centerMarkerPosition }"
			/>
		</div>

		<!-- Right inline badge -->
		<UBadge
			v-if="showRightBadge"
			variant="solid"
			:class="badgeClass"
			:style="badgeStyle"
			:ui="badgeUi"
		>
			<slot
				name="label"
				:value="rightBadgeValue"
				:formatted-value="rightBadgeFormatted"
			>
				{{ rightBadgeFormatted }}
			</slot>
		</UBadge>
	</div>
</template>

<script setup lang="ts">
	import type { SliderInlineProp, SliderTooltipProp } from "./types";

	const props = withDefaults(
		defineProps<{
			min?: number
			max?: number
			step?: number
			disabled?: boolean
			inverted?: boolean
			orientation?: "horizontal" | "vertical"
			minStepsBetweenThumbs?: number
			color?:
				| "primary"
				| "secondary"
				| "success"
				| "info"
				| "warning"
				| "error"
				| "neutral"
			defaultValue?: number | number[]
			tooltip?: SliderTooltipProp
			inline?: SliderInlineProp
			badgeWidth?: string
			centerMarker?: number
			formatLabel?: (value: number) => string
		}>(),
		{
			min: 0,
			max: 100,
			step: 1,
			disabled: false,
			inverted: false,
			orientation: "horizontal",
			color: "secondary",
			tooltip: "hover",
			inline: false,
			formatLabel: (value: number) => String(value)
		}
	);

	const emit = defineEmits<{
		change: [event: Event]
	}>();

	const modelValue = defineModel<number | number[]>();

	// --- Design tokens ---

	const THUMB_SHADOW
		= "shadow-[0px_1px_0.9px_0px_rgba(23,23,21,0.1),0px_1.1px_1.4px_0px_rgba(23,23,21,0.15),0px_2.6px_3.2px_0px_rgba(23,23,21,0.2)]";
	// Badge/tooltip shadow has inset spread vs thumb shadow
	const PILL_SHADOW
		= "shadow-[0px_1px_0.9px_0px_rgba(23,23,21,0.1),0px_1.1px_1.4px_-1.4px_rgba(23,23,21,0.15),0px_2.6px_3.2px_-2.8px_rgba(23,23,21,0.2)]";
	const PILL_BASE = `text-xs leading-[18px] tracking-[0.24px] px-1.5 py-0.5 rounded ${PILL_SHADOW}`;
	const PILL_ENABLED = `${PILL_BASE} bg-[var(--color-petrol-blue-950)] text-white`;
	const PILL_DISABLED = `${PILL_BASE} bg-[var(--color-petrol-blue-600)] text-[var(--color-petrol-blue-200)]`;

	// --- Resolve inline prop ---

	const resolvedInline = computed(() => {
		if (props.inline === false) return null;
		if (props.inline === true)
			return { position: "both" as const, value: "selected" as const };
		return {
			position: props.inline.position ?? "both",
			value: props.inline.value ?? "selected"
		};
	});

	// --- Badge visibility ---

	const showLeftBadge = computed(() => {
		if (!resolvedInline.value) return false;
		return (
			resolvedInline.value.position === "both"
			|| resolvedInline.value.position === "left"
		);
	});

	const showRightBadge = computed(() => {
		if (!resolvedInline.value) return false;
		return (
			resolvedInline.value.position === "both"
			|| resolvedInline.value.position === "right"
		);
	});

	// --- Badge values ---

	const leftBadgeValue = computed(() => {
		if (!resolvedInline.value || resolvedInline.value.value === "range")
			return props.min;
		if (Array.isArray(modelValue.value)) return modelValue.value[0] ?? props.min;
		return modelValue.value ?? props.min;
	});

	const rightBadgeValue = computed(() => {
		if (!resolvedInline.value || resolvedInline.value.value === "range")
			return props.max;
		if (Array.isArray(modelValue.value)) return modelValue.value[1] ?? props.max;
		return modelValue.value ?? props.max;
	});

	const leftBadgeFormatted = computed(() =>
		props.formatLabel(leftBadgeValue.value)
	);
	const rightBadgeFormatted = computed(() =>
		props.formatLabel(rightBadgeValue.value)
	);

	// --- Center marker ---

	const showCenterMarker = computed(() => {
		return props.centerMarker != null && Array.isArray(modelValue.value);
	});

	const centerMarkerPosition = computed(() => {
		if (props.centerMarker == null) return "0%";
		const range = props.max - props.min;
		if (range === 0) return "0%";
		const pct = Math.max(0, Math.min(100, ((props.centerMarker - props.min) / range) * 100));
		return `${pct}%`;
	});

	// --- Tooltip ---

	const resolvedTooltip = computed(() => {
		const raw = props.tooltip;
		if (typeof raw === "string") {
			return { mode: raw, side: "top" as const };
		}
		return { mode: raw.mode ?? "hover", side: raw.side ?? "top" };
	});

	const tooltipConfig = computed(() => {
		const { mode, side } = resolvedTooltip.value;
		if (mode === "hidden") return false;

		const tooltipProps = {
			content: { side },
			ui: { content: `${props.disabled ? PILL_DISABLED : PILL_ENABLED} ring-0` },
			disableClosingTrigger: true
		};

		return mode === "visible" ? { ...tooltipProps, open: true } : tooltipProps;
	});

	// --- Slider UI (only disabled overrides — base styles come from app.config.ts) ---

	const sliderUi = computed(() => {
		const base = {
			track: "h-1",
			thumb: "focus-visible:outline-none"
		};
		if (!props.disabled) return base;
		return {
			...base,
			range: "bg-[var(--color-petrol-blue-500)]",
			thumb: `size-4 bg-[var(--color-petrol-blue-100)] ring-0 cursor-not-allowed focus-visible:outline-none ${THUMB_SHADOW}`
		};
	});

	// --- Badge UI ---

	const badgeClass = computed(
		() => `shrink-0 ${props.disabled ? PILL_DISABLED : PILL_ENABLED}`
	);

	const badgeUi = {
		base: "inline-flex items-center justify-center"
	};

	const badgeStyle = computed(() =>
		props.badgeWidth ? { width: props.badgeWidth } : undefined
	);
</script>
