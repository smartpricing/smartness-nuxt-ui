<template>
	<div
		class="flex items-start gap-6"
		:class="ui?.root"
	>
		<!-- Left side input (range only, unless explicitly configured) -->
		<div
			v-if="showLeft"
			class="flex h-4 shrink-0 items-center"
			:style="{ width: inputWidth }"
		>
			<slot
				name="input-left"
				v-bind="leftSlotProps"
			>
				<UInput
					:model-value="inputText('left')"
					:disabled="disabled"
					:readonly="readonly"
					:style="affixPadding(leftOptions)"
					v-bind="leftInputProps"
					@update:model-value="onInput('left', $event)"
					@blur="onBlur"
				>
					<template
						v-if="leftOptions.leading"
						#leading
					>
						<span class="text-sm text-muted">{{ leftOptions.leading }}</span>
					</template>
					<template
						v-if="leftOptions.trailing"
						#trailing
					>
						<span class="text-sm text-muted">{{ leftOptions.trailing }}</span>
					</template>
				</UInput>
			</slot>
		</div>

		<!-- Slider column: track (+ hover tooltips) and optional from/to labels -->
		<div class="flex min-w-0 flex-1 flex-col">
			<div
				ref="sliderEl"
				class="relative flex h-4 items-center"
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

			<div
				v-if="limits"
				class="mt-2 flex items-center justify-between text-xs leading-[18px] tracking-[0.24px] text-[var(--color-petrol-blue-800)]"
				:class="ui?.limits"
			>
				<span>{{ minLabel ?? format(min) }}</span>
				<span>{{ maxLabel ?? format(max) }}</span>
			</div>
		</div>

		<!-- Right side input -->
		<div
			v-if="showRight"
			class="flex h-4 shrink-0 items-center"
			:style="{ width: inputWidth }"
		>
			<slot
				name="input-right"
				v-bind="rightSlotProps"
			>
				<UInput
					:model-value="inputText('right')"
					:disabled="disabled"
					:readonly="readonly"
					:style="affixPadding(rightOptions)"
					v-bind="rightInputProps"
					@update:model-value="onInput('right', $event)"
					@blur="onBlur"
				>
					<template
						v-if="rightOptions.leading"
						#leading
					>
						<span class="text-sm text-muted">{{ rightOptions.leading }}</span>
					</template>
					<template
						v-if="rightOptions.trailing"
						#trailing
					>
						<span class="text-sm text-muted">{{ rightOptions.trailing }}</span>
					</template>
				</UInput>
			</slot>
		</div>
	</div>
</template>

<script setup lang="ts">
	import type { SliderProps } from "@nuxt/ui";
	import type { SliderInputOptions, SliderInputsProp } from "./types";

	type Side = "left" | "right";

	const props = withDefaults(
		defineProps<{
			min?: number
			max?: number
			step?: number
			disabled?: boolean
			color?: SliderProps["color"]
			name?: string
			minStepsBetweenThumbs?: number
			/** Tooltip above the hovered/dragged thumb. */
			tooltip?: boolean
			/** Formats every value shown to the user: tooltip, side inputs, from/to labels. */
			format?: (value: number) => string
			/** Reads a number back out of a formatted input string. Return null to ignore the keystroke. */
			parse?: (raw: string) => number | null
			/** Side inputs: `true` → right (single) / both (range), or per-side config. */
			inputs?: SliderInputsProp
			/** Width of both side inputs. */
			inputWidth?: string
			/** Side inputs are readonly — value stays selectable, unlike `disabled`. */
			readonly?: boolean
			/** Show the min/max labels under the track. */
			limits?: boolean
			minLabel?: string
			maxLabel?: string
			ui?: {
				root?: string
				tooltip?: string
				limits?: string
				slider?: SliderProps["ui"]
			}
		}>(),
		{
			min: 0,
			max: 100,
			step: 1,
			color: "secondary",
			tooltip: true,
			inputs: false,
			inputWidth: "5rem",
			format: (value: number) => String(value)
		}
	);

	const emit = defineEmits<{
		change: [event: Event]
	}>();

	const slots = defineSlots<{
		"input-left"?: (props: SideSlotProps) => unknown
		"input-right"?: (props: SideSlotProps) => unknown
	}>();

	interface SideSlotProps {
		value: number
		formatted: string
		disabled: boolean
		readonly: boolean
		setValue: (value: number) => void
	}

	const modelValue = defineModel<number | number[]>({ required: true });

	// A tuple model means range mode; the model shape is never rewritten.
	const isRange = computed(() => Array.isArray(modelValue.value));
	const values = computed<number[]>(() =>
		Array.isArray(modelValue.value) ? modelValue.value : [modelValue.value ?? props.min]
	);

	// --- Value maths ---

	// Snap onto the step grid anchored at `min`; toFixed guards float-step noise
	// (0.1 * 3 !== 0.3) in both the step count and the reconstructed value.
	function snap(value: number): number {
		const steps = Math.round(Number(((value - props.min) / props.step).toFixed(9)));
		return Number((props.min + steps * props.step).toFixed(10));
	}

	function clampAt(index: number, value: number): number {
		const current = values.value;
		const lo = index > 0 ? Math.max(props.min, current[index - 1]!) : props.min;
		const hi = index < current.length - 1 ? Math.min(props.max, current[index + 1]!) : props.max;
		return Math.min(hi, Math.max(lo, value));
	}

	function setValueAt(index: number, value: number) {
		if (!isRange.value) {
			modelValue.value = value;
			return;
		}
		const updated = [...values.value];
		updated[index] = value;
		modelValue.value = updated;
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

	// --- Side inputs ---

	function normalizeSide(value?: boolean | SliderInputOptions): SliderInputOptions | null {
		if (value === true) return {};
		if (!value) return null;
		return value;
	}

	const resolvedInputs = computed<Record<Side, SliderInputOptions | null>>(() => {
		const raw = props.inputs;
		if (raw === true) return { left: isRange.value ? {} : null, right: {} };
		if (!raw) return { left: null, right: null };
		return { left: normalizeSide(raw.left), right: normalizeSide(raw.right) };
	});

	const showLeft = computed(() => !!resolvedInputs.value.left || !!slots["input-left"]);
	const showRight = computed(() => !!resolvedInputs.value.right || !!slots["input-right"]);
	const leftOptions = computed(() => resolvedInputs.value.left ?? {});
	const rightOptions = computed(() => resolvedInputs.value.right ?? {});

	// `leading` / `trailing` are ours (rendered in UInput's slots) — keep them out of
	// the v-bind so they don't land on the DOM input as stray attributes.
	function inputProps({ leading, trailing, ...rest }: SliderInputOptions) {
		return rest;
	}

	const leftInputProps = computed(() => inputProps(leftOptions.value));
	const rightInputProps = computed(() => inputProps(rightOptions.value));

	// Affixes are overlaid on the input (UInput positions its leading/trailing slots
	// absolutely), so the text field has to reserve room for them itself.
	function affixPadding(options: SliderInputOptions) {
		const room = (text: string) => `calc(0.625rem + ${text.length}ch + 0.375rem)`;
		return {
			...(options.leading ? { paddingInlineStart: room(options.leading) } : {}),
			...(options.trailing ? { paddingInlineEnd: room(options.trailing) } : {})
		};
	}

	// Left input drives the first thumb, right input the last one.
	function indexOf(side: Side): number {
		return side === "left" ? 0 : values.value.length - 1;
	}

	// While a side input is focused its raw text is kept as-is, so the formatter
	// can't fight what is being typed ("-" or "1." are not numbers yet).
	const editing = ref<Side | null>(null);
	const draft = ref("");

	function inputText(side: Side): string {
		if (editing.value === side) return draft.value;
		return props.format(values.value[indexOf(side)] ?? props.min);
	}

	// Tolerates the formatter's own decoration (units, spaces, +, thousands dots
	// are not assumed) — override with `parse` for anything more exotic.
	function defaultParse(raw: string): number | null {
		const cleaned = raw.replace(/[^\d,.+-]/g, "").replace(",", ".");
		if (!cleaned || /^[+-]?\.?$/.test(cleaned)) return null;
		const parsed = Number(cleaned);
		return Number.isFinite(parsed) ? parsed : null;
	}

	function onInput(side: Side, raw: string | number) {
		editing.value = side;
		draft.value = String(raw);
		const parsed = props.parse ? props.parse(draft.value) : defaultParse(draft.value);
		if (parsed == null || !Number.isFinite(parsed)) return;
		const index = indexOf(side);
		setValueAt(index, clampAt(index, snap(parsed)));
	}

	function onBlur() {
		// Drop the draft so the input snaps back to the formatted committed value.
		editing.value = null;
		draft.value = "";
	}

	function sideSlotProps(side: Side): SideSlotProps {
		const index = indexOf(side);
		const value = values.value[index] ?? props.min;
		return {
			value,
			formatted: props.format(value),
			disabled: !!props.disabled,
			readonly: !!props.readonly,
			setValue: (next: number) => setValueAt(index, clampAt(index, snap(next)))
		};
	}

	const leftSlotProps = computed(() => sideSlotProps("left"));
	const rightSlotProps = computed(() => sideSlotProps("right"));

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
