<template>
	<div>
		<!-- Track (+ hover tooltips) -->
		<div
			ref="sliderEl"
			class="relative flex h-4 items-center"
			:class="ui?.track"
			@pointerover="onPointerOver"
			@pointerleave="hovered = null"
			@pointerdown="onPointerDown"
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
				:tooltip="false"
				:ui="sliderUi"
				@change="(event: Event) => emit('change', event)"
			/>

			<!-- Own tooltip: USlider's built-in one prints the raw number, unformatted -->
			<template v-if="tooltip">
				<div
					v-for="(value, index) in values"
					:key="index"
					class="pointer-events-none absolute bottom-[calc(100%+4px)] z-10 max-w-[320px] -translate-x-1/2 truncate rounded-sm bg-[var(--color-petrol-blue-950)] px-1.5 py-0.5 text-xs leading-[18px] tracking-[0.24px] text-white shadow-[0px_1px_0.9px_0px_rgba(23,23,21,0.1),0px_1.1px_1.4px_-1.4px_rgba(23,23,21,0.15),0px_2.6px_3.2px_-2.8px_rgba(23,23,21,0.2)]"
					:class="[activeIndex === index ? 'block' : 'hidden', ui?.tooltip]"
					:style="{ left: thumbOffset(value) }"
				>
					{{ format(value) }}
				</div>
			</template>
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

	// Thumb centre as a CSS length: the percentage walks the track, the pixel term
	// compensates for the thumb's own 16px width (Reka insets thumbs at both ends).
	function thumbOffset(value: number): string {
		const span = props.max - props.min;
		const pct = span === 0 ? 0 : Math.max(0, Math.min(100, ((value - props.min) / span) * 100));
		return `calc(${pct}% + ${((50 - pct) / 100) * 16}px)`;
	}

	// --- Hover / drag tracking (tooltip shows for the touched thumb only) ---

	const sliderEl = useTemplateRef<HTMLElement>("sliderEl");
	const hovered = ref<number | null>(null);
	const dragging = ref<number | null>(null);
	const activeIndex = computed(() => dragging.value ?? hovered.value);

	function thumbIndexFrom(event: PointerEvent): number | null {
		const thumb = (event.target as HTMLElement | null)?.closest?.("[data-slot='thumb']");
		if (!thumb || !sliderEl.value) return null;
		const index = Array.from(sliderEl.value.querySelectorAll("[data-slot='thumb']")).indexOf(thumb);
		return index < 0 ? null : index;
	}

	function onPointerOver(event: PointerEvent) {
		hovered.value = thumbIndexFrom(event);
	}

	function endDrag() {
		dragging.value = null;
		window.removeEventListener("pointerup", endDrag);
		window.removeEventListener("pointercancel", endDrag);
	}

	// A fast drag can outrun the thumb; keep the tooltip pinned to the grabbed one.
	function onPointerDown(event: PointerEvent) {
		const index = thumbIndexFrom(event);
		if (index == null) return;
		dragging.value = index;
		window.addEventListener("pointerup", endDrag);
		window.addEventListener("pointercancel", endDrag);
	}

	onBeforeUnmount(endDrag);

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
