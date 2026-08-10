<template>
	<div>
		<!-- Track -->
		<div
			class="relative flex h-4 items-center"
			:class="ui?.track"
		>
			<USlider
				v-model="modelValue"
				class="w-full"
				:min="min"
				:max="max"
				:step="step"
				:disabled="disabled"
				:color="color"
				:name="name"
				:min-steps-between-thumbs="minStepsBetweenThumbs"
				:tooltip="tooltipConfig"
				:ui="sliderUi"
				@change="(event: Event) => emit('change', event)"
			/>
		</div>

		<!-- Min/max labels: always shown, they are the track's only scale -->
		<div
			class="mt-2 flex items-center justify-between text-xs leading-[18px] tracking-[0.24px] text-[var(--color-petrol-blue-800)]"
			:class="ui?.limits"
		>
			<span>{{ minLabel ?? format(min) }}</span>
			<span>{{ maxLabel ?? format(max) }}</span>
		</div>
	</div>
</template>

<script setup lang="ts">
	import type { SliderProps } from "@nuxt/ui";
	import type { SSliderProps } from "./types";

	const props = withDefaults(defineProps<SSliderProps>(), {
		min: 0,
		max: 100,
		step: 1,
		color: "secondary",
		tooltip: true,
		format: (value: number) => String(value)
	});

	const emit = defineEmits<{
		change: [event: Event]
	}>();

	const modelValue = defineModel<number | number[]>({ required: true });

	// A tuple model means range mode; the model shape is never rewritten.
	const values = computed<number[]>(() =>
		Array.isArray(modelValue.value) ? modelValue.value : [modelValue.value ?? props.min]
	);

	// The label, the value inputs and the form-field passthrough moved to SSliderField.
	// Passing them here is silent — they land in $attrs and render as stray DOM
	// attributes — so say so while the migration is still in flight.
	const attrs = useAttrs();
	const MOVED_PROPS = ["label", "description", "help", "error", "hint", "required", "readonly"];

	if (import.meta.dev) {
		watchEffect(() => {
			const moved = MOVED_PROPS.filter((prop) => prop in attrs);
			if (moved.length) {
				console.warn(`[SSlider] ${moved.join(", ")} moved to <SSliderField>. SSlider is the bare track.`);
			}
		});
	}

	// --- Tooltip ---
	//
	// USlider's own tooltip is a portalled UTooltip, so it clears any `overflow: hidden`
	// ancestor and flips away from the viewport edge on its own. Only its text needs
	// work: it prints the raw number. `text` is one string shared by every thumb, so
	// `format` can drive it for a single thumb only — a range keeps the raw numbers.
	const PILL_SHADOW
		= "shadow-[0px_1px_0.9px_0px_rgba(23,23,21,0.1),0px_1.1px_1.4px_-1.4px_rgba(23,23,21,0.15),0px_2.6px_3.2px_-2.8px_rgba(23,23,21,0.2)]";

	const tooltipConfig = computed<SliderProps["tooltip"]>(() => {
		if (!props.tooltip) return false;
		const pill = props.disabled
			? "bg-[var(--color-petrol-blue-600)] text-[var(--color-petrol-blue-200)]"
			: "bg-[var(--color-petrol-blue-950)] text-white";
		return {
			disableClosingTrigger: true,
			delayDuration: 0,
			...(Array.isArray(modelValue.value) ? {} : { text: props.format(values.value[0] ?? props.min) }),
			content: { side: "top", sideOffset: 4, collisionPadding: 8 },
			ui: {
				content: `max-w-[320px] rounded-sm px-1.5 py-0.5 text-xs leading-[18px] tracking-[0.24px] ring-0 ${PILL_SHADOW} ${pill} ${props.ui?.tooltip ?? ""}`
			}
		};
	});

	// --- Slider theme (base styles live in app/config/slider.ts) ---

	const sliderUi = computed<SliderProps["ui"]>(() => ({
		track: "h-1",
		thumb: "focus-visible:outline-none",
		...(props.disabled
			? {
				range: "bg-[var(--color-petrol-blue-500)]",
				thumb: "bg-[var(--color-petrol-blue-100)] cursor-not-allowed focus-visible:outline-none"
			}
			: {}),
		...props.ui?.slider
	}));
</script>
