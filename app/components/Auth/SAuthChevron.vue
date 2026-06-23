<template>
	<div class="auth-chevron" :style="[wrapperStyle, cssVars]">
		<img
			:src="variantData.bodySrc"
			class="auth-chevron__body"
			alt=""
			aria-hidden="true"
		>
		<img
			v-if="pulse"
			:src="variantData.pulseSrc"
			class="auth-chevron__pulse"
			alt=""
			aria-hidden="true"
		>
	</div>
</template>

<script setup lang="ts">
	/**
	 * Internal decoration component — renders a single animated chevron shape.
	 * Not intended for direct consumer use; composed by SAuthBackground.
	 */
	type Position = "top-left" | "top-right" | "bottom-left" | "bottom-right" | "center";
	type Variant = "a" | "b";

	const props = withDefaults(defineProps<{
		/** Which of the two Figma shapes to render. */
		variant?: Variant
		/** Anchor preset on the screen. */
		position?: Position
		/** Fine-tune offset in pixels (applied after the preset translate). */
		offsetX?: number
		offsetY?: number
		/** Override the rotation in degrees (defaults are derived from preset + variant). */
		rotate?: number
		scale?: number
		mirror?: boolean
		/** Width of the chevron in pixels (height is derived from the variant's aspect ratio). */
		size?: number
		/** Pulse animation delay in ms, useful when rendering multiple instances out of phase. */
		pulseDelay?: number
		/** Whether to render the breathing pulse. Disable for fully-static decoration. */
		pulse?: boolean
	}>(), {
		variant: "a",
		position: "top-left",
		offsetX: 0,
		offsetY: 0,
		rotate: undefined,
		scale: 1,
		mirror: false,
		size: 800,
		pulseDelay: 0,
		pulse: true
	});

	const VARIANTS = {
		a: {
			aspectRatio: 455 / 432,
			bodySrc: new URL("../../assets/images/auth-chevron-a.svg", import.meta.url).href,
			pulseSrc: new URL("../../assets/images/auth-chevron-a-pulse.svg", import.meta.url).href
		},
		b: {
			aspectRatio: 864 / 438,
			bodySrc: new URL("../../assets/images/auth-chevron-b.svg", import.meta.url).href,
			pulseSrc: new URL("../../assets/images/auth-chevron-b-pulse.svg", import.meta.url).href
		}
	} as const;

	const DEFAULT_ROTATIONS: Record<Variant, Partial<Record<Position, number>>> = {
		a: {
			"top-left": 0,
			"top-right": 0,
			"bottom-left": 0,
			"bottom-right": 0,
			center: 0
		},
		b: {
			"top-left": 0,
			"top-right": 0,
			"bottom-left": 0,
			"bottom-right": 0,
			center: 0
		}
	};

	const PRESETS: Record<Position, { top: string, left: string, originX: string, originY: string }> = {
		"top-left": { top: "0%", left: "0%", originX: "0%", originY: "0%" },
		"top-right": { top: "0%", left: "100%", originX: "100%", originY: "0%" },
		"bottom-left": { top: "100%", left: "0%", originX: "0%", originY: "100%" },
		"bottom-right": { top: "100%", left: "100%", originX: "100%", originY: "100%" },
		center: { top: "50%", left: "50%", originX: "50%", originY: "50%" }
	};

	const variantData = computed(() => VARIANTS[props.variant]);

	const wrapperStyle = computed(() => {
		const preset = PRESETS[props.position];
		const rotate = props.rotate ?? DEFAULT_ROTATIONS[props.variant][props.position] ?? 0;
		const mirror = props.mirror ? -1 : 1;
		const anchorX = preset.originX === "100%" ? "-100%" : preset.originX === "50%" ? "-50%" : "0%";
		const anchorY = preset.originY === "100%" ? "-100%" : preset.originY === "50%" ? "-50%" : "0%";
		return {
			top: preset.top,
			left: preset.left,
			width: `${props.size}px`,
			height: `${props.size / variantData.value.aspectRatio}px`,
			transformOrigin: `${preset.originX} ${preset.originY}`,
			transform: [
				`translate(${anchorX}, ${anchorY})`,
				`translate(${props.offsetX}px, ${props.offsetY}px)`,
				`rotate(${rotate}deg)`,
				`scale(${props.scale * mirror}, ${props.scale})`
			].join(" ")
		};
	});

	const cssVars = computed(() => ({
		"--chevron-pulse-delay": `${props.pulseDelay}ms`
	}));
</script>

<style scoped>
.auth-chevron {
	position: absolute;
	pointer-events: none;
	transition: transform 800ms cubic-bezier(0.22, 1, 0.36, 1);
}

.auth-chevron__body,
.auth-chevron__pulse {
	position: absolute;
	inset: 0;
	width: 100%;
	height: 100%;
	display: block;
}

.auth-chevron__pulse {
	opacity: 0;
	will-change: opacity;
	animation: chevron-pulse 4.5s ease-in-out infinite;
	animation-delay: var(--chevron-pulse-delay, 0ms);
}

@keyframes chevron-pulse {
	0%, 100% { opacity: 0; }
	50% { opacity: 0.9; }
}

@media (max-width: 767px), (hover: none) and (pointer: coarse) {
	.auth-chevron__pulse {
		animation: none;
		opacity: 0;
	}
}

@media (prefers-reduced-motion: reduce) {
	.auth-chevron__pulse {
		animation: none;
		opacity: 0;
	}
}
</style>
