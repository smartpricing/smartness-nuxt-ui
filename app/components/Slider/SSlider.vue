<template>
	<div
		class="flex items-center gap-4"
		:class="[
			orientation === 'vertical' ? 'flex-col-reverse' : '',
			disabled ? 'cursor-not-allowed' : '',
			tooltipSpacingClass,
		]"
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
				side="left"
				:value="leftBadgeValue"
				:formatted-value="leftBadgeFormatted"
			>
				{{ leftBadgeFormatted }}
			</slot>
		</UBadge>

		<!-- Slider -->
		<div
			class="relative flex-1"
			@pointerdown.capture="onSliderPointerdown"
		>
			<USlider
				v-model="internalValue"
				:default-value="defaultValue"
				:min="min"
				:max="max"
				:step="step"
				:disabled="disabled"
				:inverted="inverted"
				:orientation="orientation"
				:min-steps-between-thumbs="minStepsBetweenThumbs"
				:color="color"
				:name="name"
				:tooltip="tooltipConfig"
				:ui="sliderUi"
				:class="orientation === 'vertical' ? undefined : 'w-full'"
				@change="(e: Event) => emit('change', e)"
			/>
			<!-- Center marker (range only) -->
			<div
				v-if="showCenterMarker"
				class="absolute bg-(--color-petrol-blue-200) pointer-events-none"
				:class="orientation === 'vertical'
					? 'left-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-0.5'
					: 'top-1/2 -translate-y-1/2 -translate-x-1/2 w-0.5 h-1'"
				:style="centerMarkerStyle"
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
				side="right"
				:value="rightBadgeValue"
				:formatted-value="rightBadgeFormatted"
			>
				{{ rightBadgeFormatted }}
			</slot>
		</UBadge>
	</div>
</template>

<script setup lang="ts">
	import type { SliderProps, TooltipProps } from "@nuxt/ui";
	import type { SliderInlineProp, SliderThumbLimitsProp, SliderTooltipProp, SliderTooltipSide } from "./types";

	const props = withDefaults(
		defineProps<{
			min?: number
			max?: number
			step?: number
			disabled?: boolean
			inverted?: boolean
			orientation?: "horizontal" | "vertical"
			minStepsBetweenThumbs?: number
			color?: SliderProps["color"]
			name?: string
			ui?: SliderProps["ui"]
			defaultValue?: number | number[]
			tooltip?: SliderTooltipProp
			inline?: SliderInlineProp
			badgeWidth?: string
			centerMarker?: number
			thumbLimits?: SliderThumbLimitsProp
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

	// --- Per-thumb limits ---
	// Clamps values flowing up from USlider before they reach the model; the clamped
	// value flows back down (Reka's slider is controlled), so the thumb stops at the
	// limit. Programmatic writes to the consumer's v-model are not clamped.

	// Snap a limit inward onto the step grid (anchored at props.min) so a clamped
	// thumb never rests on an off-step value. toFixed guards float-step noise in
	// both the step count and the reconstructed value (0.1 * 3 !== 0.3).
	function stepsFrom(value: number): number {
		return Number(((value - props.min) / props.step).toFixed(9));
	}

	function nthStep(n: number): number {
		return Number((props.min + n * props.step).toFixed(10));
	}

	function clampThumb(value: number, index: number): number {
		const limits = Array.isArray(props.thumbLimits) ? props.thumbLimits[index] : props.thumbLimits;
		if (!limits) return value;
		const lo = limits.min == null
			? props.min
			: nthStep(Math.ceil(stepsFrom(Math.max(limits.min, props.min))));
		const hi = limits.max == null
			? props.max
			: nthStep(Math.floor(stepsFrom(Math.min(limits.max, props.max))));
		// ponytail: contradictory limits (window narrower than one step) resolve to hi
		return Math.min(hi, Math.max(lo, value));
	}

	// While a limited thumb is pinned, the raw pointer keeps traveling; once it crosses
	// a neighbor thumb's value, Reka re-sorts and hands the drag to that neighbor
	// (valueIndexToChangeRef follows the pointer value). Track the grabbed thumb
	// ourselves and route every drag update to it, so thumbs keep their identity.
	const draggedIndex = ref<number | null>(null);
	let draggedThumbEl: HTMLElement | null = null;

	function endDrag() {
		draggedIndex.value = null;
		draggedThumbEl = null;
		window.removeEventListener("pointerup", endDrag);
		window.removeEventListener("pointercancel", endDrag);
	}

	onBeforeUnmount(endDrag);

	function onSliderPointerdown(event: PointerEvent) {
		if (!props.thumbLimits || !Array.isArray(modelValue.value)) return;
		const thumbs = (event.currentTarget as HTMLElement).querySelectorAll("[data-slot='thumb']");
		let best = -1;
		let bestDistance = Infinity;
		thumbs.forEach((thumb, index) => {
			const rect = thumb.getBoundingClientRect();
			const distance = Math.hypot(
				event.clientX - (rect.left + rect.width / 2),
				event.clientY - (rect.top + rect.height / 2)
			);
			if (distance < bestDistance) {
				bestDistance = distance;
				best = index;
			}
		});
		if (best < 0) return;
		// ponytail: overlapping thumbs tie-break to the first one; Reka's own pick may differ
		draggedIndex.value = best;
		draggedThumbEl = thumbs[best] as HTMLElement;
		window.addEventListener("pointerup", endDrag);
		window.addEventListener("pointercancel", endDrag);
	}

	const internalValue = computed({
		get: () => modelValue.value,
		set: (v) => {
			if (v == null || !props.thumbLimits) {
				modelValue.value = v;
				return;
			}
			if (!Array.isArray(v)) {
				// Primitive writes of an unchanged value already no-op via Object.is.
				modelValue.value = clampThumb(v, 0);
				return;
			}
			const cur = modelValue.value;
			if (draggedIndex.value != null && Array.isArray(cur) && cur.length === v.length) {
				// Reka may have re-sorted v around a neighbor; recover the raw pointer
				// value (the one entry not present in cur) and apply it to the thumb the
				// user grabbed, kept inside its limits and between its neighbors.
				// Reka also focuses the thumb it (wrongly) considers active — its tooltip
				// opens on focus — so pin focus back on the grabbed thumb.
				if (draggedThumbEl && document.activeElement !== draggedThumbEl) {
					draggedThumbEl.focus({ preventScroll: true });
				}
				const d = draggedIndex.value;
				const rest = [...cur];
				let candidate: number | undefined;
				for (const value of v) {
					const i = rest.indexOf(value);
					if (i >= 0) rest.splice(i, 1);
					else candidate = value;
				}
				let next = clampThumb(candidate ?? cur[d], d);
				if (d > 0) next = Math.max(next, cur[d - 1]);
				if (d < cur.length - 1) next = Math.min(next, cur[d + 1]);
				if (next === cur[d]) return;
				const updated = [...cur];
				updated[d] = next;
				modelValue.value = updated;
				return;
			}
			const next = v.map(clampThumb);
			if (
				Array.isArray(cur)
				&& cur.length === next.length
				&& next.every((n, i) => n === cur[i])
			) {
				// Thumb pinned at a limit — skip the redundant emit.
				return;
			}
			modelValue.value = next;
		}
	});

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

	const lowBadgeValue = computed(() => {
		if (!resolvedInline.value || resolvedInline.value.value === "range")
			return props.min;
		if (Array.isArray(modelValue.value)) return modelValue.value[0] ?? props.min;
		return modelValue.value ?? props.min;
	});

	const highBadgeValue = computed(() => {
		if (!resolvedInline.value || resolvedInline.value.value === "range")
			return props.max;
		if (Array.isArray(modelValue.value)) return modelValue.value.at(-1) ?? props.max;
		return modelValue.value ?? props.max;
	});

	// Root is flex-col-reverse when vertical, so the "left" badge always sits at the
	// min end unless inverted — one swap rule covers both orientations.
	const leftBadgeValue = computed(() =>
		props.inverted ? highBadgeValue.value : lowBadgeValue.value
	);

	const rightBadgeValue = computed(() =>
		props.inverted ? lowBadgeValue.value : highBadgeValue.value
	);

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

	const centerMarkerStyle = computed(() => {
		if (props.centerMarker == null) return undefined;
		const range = props.max - props.min;
		const pct = range === 0
			? 0
			: Math.max(0, Math.min(100, ((props.centerMarker - props.min) / range) * 100));
		const vertical = props.orientation === "vertical";
		// Vertical non-inverted puts max at the top, so the axis is mirrored there;
		// horizontal mirrors only when inverted.
		const mirrored = vertical ? !props.inverted : props.inverted;
		const offset = mirrored ? 100 - pct : pct;
		return vertical ? { top: `${offset}%` } : { left: `${offset}%` };
	});

	// --- Tooltip ---

	const resolvedTooltip = computed(() => {
		const raw = props.tooltip;
		if (typeof raw === "string") {
			return {
				mode: raw,
				side: "top" as SliderTooltipSide,
				prefix: "",
				suffix: "",
				spacing: undefined as string | false | undefined,
				rest: {} as Partial<TooltipProps>
			};
		}
		const { mode, side, prefix, suffix, spacing, ...rest } = raw;
		return {
			mode: mode ?? "hover",
			side: side ?? "top",
			prefix: prefix ?? "",
			suffix: suffix ?? "",
			spacing,
			rest: rest as Partial<TooltipProps>
		};
	});

	// Wrap a runtime value as a CSS <string> token for `content`. Single quotes are used so the
	// value survives serialization inside the (double-quoted) inline style attribute without its
	// quotes being backslash-escaped — which would otherwise render literal quotes in the tooltip.
	const CSS_BACKSLASH = /\\/g;
	const CSS_SQUOTE = /'/g;
	function cssString(value: string): string {
		return `'${value.replace(CSS_BACKSLASH, "\\\\").replace(CSS_SQUOTE, "\\'")}'`;
	}

	const tooltipConfig = computed(() => {
		const { mode, side, prefix, suffix, rest } = resolvedTooltip.value;
		if (mode === "hidden") return false;

		const pill = props.disabled ? PILL_DISABLED : PILL_ENABLED;

		// Affixes are injected as ::before/::after content via CSS vars set on the tooltip
		// content element's inline style — sidesteps Tailwind JIT and supports arbitrary
		// strings (incl. spaces). When set, drop the content's flex gap-1 so spacing is
		// controlled entirely by the caller's string ("km" → 10km, " km" → 10 km).
		const style: Record<string, string> = {};
		let affix = "";
		if (prefix) {
			style["--s-prefix"] = cssString(prefix);
			affix += " before:content-[var(--s-prefix)] before:whitespace-pre";
		}
		if (suffix) {
			style["--s-suffix"] = cssString(suffix);
			affix += " after:content-[var(--s-suffix)] after:whitespace-pre";
		}
		if (affix) affix += " gap-0";

		const { ui: consumerUi, content: consumerContent, ...restProps } = rest;
		const cc = consumerContent as
			| (Record<string, unknown> & { style?: Record<string, string> })
			| undefined;

		return {
			disableClosingTrigger: true,
			...(mode === "visible" ? { open: true } : {}),
			// Consumer's native tooltip props (portal, arrow, delayDuration, …) win over defaults.
			...restProps,
			content: {
				side,
				...consumerContent,
				style: { ...style, ...(cc?.style ?? {}) }
			},
			ui: {
				...consumerUi,
				// Design-system pill + affix always applied; any consumer classes appended.
				content: `${pill} ring-0${affix}${consumerUi?.content ? ` ${consumerUi.content}` : ""}`
			}
		};
	});

	// Opt-in headroom on the whole row when the tooltip is always visible, so the
	// portalled pill (which floats over the thumb) doesn't collide with adjacent content.
	// Applied to the row (not the slider column) so badges and track stay aligned.
	// No margin unless the consumer sets `tooltip.spacing`; no effect for hover/hidden.
	const tooltipSpacingClass = computed(() => {
		const { mode, spacing } = resolvedTooltip.value;
		if (mode !== "visible" || !spacing) return undefined;
		return spacing;
	});

	// --- Slider UI (only disabled overrides — base styles come from app.config.ts) ---

	const sliderUi = computed<SliderProps["ui"]>(() => {
		const base: Record<string, string> = {
			track: props.orientation === "vertical" ? "w-1" : "h-1",
			thumb: "focus-visible:outline-none"
		};
		if (props.disabled) {
			base.range = "bg-[var(--color-petrol-blue-500)]";
			base.thumb = `size-4 bg-[var(--color-petrol-blue-100)] ring-0 cursor-not-allowed focus-visible:outline-none ${THUMB_SHADOW}`;
		}
		// Consumer ui classes are appended per slot so they win over the internal ones.
		return {
			...props.ui,
			track: [base.track, props.ui?.track],
			range: [base.range, props.ui?.range],
			thumb: [base.thumb, props.ui?.thumb]
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
