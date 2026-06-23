<template>
	<div class="auth-chevron" :style="[positionStyle, cssVars]">
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
	type Variant = "a" | "b";

	const props = withDefaults(defineProps<{
		/** Which of the two Figma shapes to render. */
		variant?: Variant
		/** CSS top value. */
		top?: string
		/** CSS left value. */
		left?: string
		/** Width of the chevron in pixels (height is derived from the variant's aspect ratio). */
		size?: number
		/** Mirror horizontally. */
		flipX?: boolean
		/** Mirror vertically. */
		flipY?: boolean
		/** Pulse animation delay in ms. */
		pulseDelay?: number
		/** Whether to render the breathing pulse. */
		pulse?: boolean
	}>(), {
		variant: "a",
		top: "0px",
		left: "0px",
		size: 800,
		flipX: false,
		flipY: false,
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

	const variantData = computed(() => VARIANTS[props.variant]);

	const positionStyle = computed(() => ({
		top: props.top,
		left: props.left,
		width: `${props.size}px`,
		height: `${props.size / variantData.value.aspectRatio}px`,
		transform: `scale(${props.flipX ? -1 : 1}, ${props.flipY ? -1 : 1})`
	}));

	const cssVars = computed(() => ({
		"--chevron-pulse-delay": `${props.pulseDelay}ms`
	}));
</script>

<style scoped>
.auth-chevron {
	position: absolute;
	pointer-events: none;
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
