<template>
	<div class="absolute inset-0 z-0 overflow-hidden pointer-events-none">
		<SAuthChevron
			variant="a"
			:position="leftPosition"
			:size="effectiveLeftSize"
			:pulse-delay="0"
		/>
		<SAuthChevron
			variant="b"
			:position="rightPosition"
			:size="effectiveRightSize"
			:pulse-delay="1500"
		/>
	</div>
</template>

<script setup lang="ts">
	/**
	 * Internal decoration component — renders the two animated chevron shapes.
	 * Not intended for direct consumer use; composed by SAuthLayout.
	 */
	import { useMediaQuery } from "@vueuse/core";

	type Position = "top-left" | "top-right" | "bottom-left" | "bottom-right" | "center";

	const props = withDefaults(defineProps<{
		/** Where the smaller (variant "a") chevron sits. */
		leftPosition?: Position
		/** Where the larger (variant "b") chevron sits. */
		rightPosition?: Position
		/** Desktop width of the smaller (variant "a") chevron in pixels. */
		leftSize?: number
		/** Desktop width of the larger (variant "b") chevron in pixels. */
		rightSize?: number
	}>(), {
		leftPosition: "top-left",
		rightPosition: "bottom-right",
		leftSize: 650,
		rightSize: 1000
	});

	const isDesktop = useMediaQuery("(min-width: 992px)");
	const effectiveLeftSize = computed(() => (isDesktop.value ? props.leftSize : 300));
	const effectiveRightSize = computed(() => (isDesktop.value ? props.rightSize : 400));
</script>
