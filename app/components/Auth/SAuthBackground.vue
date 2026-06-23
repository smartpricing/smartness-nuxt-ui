<template>
	<div class="fixed inset-0 z-0 overflow-hidden pointer-events-none">
		<SAuthChevron
			v-if="showTopLeft"
			variant="a"
			:top="`-${topLeftH * 0.35}px`"
			:left="`-${topLeftW * 0.3}px`"
			:size="topLeftW"
			:pulse-delay="0"
		/>
		<SAuthChevron
			v-if="showTopRight"
			variant="a"
			:top="`-${topRightH * 0.35}px`"
			:left="`calc(100% - ${topRightW * 0.7}px)`"
			:size="topRightW"
			flip-x
			:pulse-delay="0"
		/>
		<SAuthChevron
			v-if="showBottomLeft"
			variant="b"
			:top="`calc(100% - ${bottomLeftH * 0.65}px)`"
			:left="`-${bottomLeftW * 0.35}px`"
			:size="bottomLeftW"
			flip-x
			:pulse-delay="1500"
		/>
		<SAuthChevron
			v-if="showBottomRight"
			variant="b"
			:top="`calc(100% - ${bottomRightH * 0.65}px)`"
			:left="`calc(100% - ${bottomRightW * 0.65}px)`"
			:size="bottomRightW"
			:pulse-delay="1500"
		/>
	</div>
</template>

<script setup lang="ts">
	/**
	 * Internal decoration component — renders animated chevron shapes at enabled corners.
	 * Not intended for direct consumer use; composed by SAuthLayout.
	 */
	import { useMediaQuery } from "@vueuse/core";

	type Corner = "top-left" | "top-right" | "bottom-left" | "bottom-right";

	const props = withDefaults(defineProps<{
		/** Which corners show chevrons. */
		chevrons?: Corner[]
	}>(), {
		chevrons: () => ["top-left", "bottom-right"]
	});

	const isDesktop = useMediaQuery("(min-width: 992px)");

	// Variant "a" (smaller) for top corners, variant "b" (larger) for bottom corners
	const smallSize = computed(() => isDesktop.value ? 650 : 300);
	const largeSize = computed(() => isDesktop.value ? 1000 : 400);

	const topLeftW = computed(() => smallSize.value);
	const topLeftH = computed(() => smallSize.value / (455 / 432));
	const topRightW = computed(() => smallSize.value);
	const topRightH = computed(() => smallSize.value / (455 / 432));
	const bottomLeftW = computed(() => largeSize.value);
	const bottomLeftH = computed(() => largeSize.value / (864 / 438));
	const bottomRightW = computed(() => largeSize.value);
	const bottomRightH = computed(() => largeSize.value / (864 / 438));

	const showTopLeft = computed(() => props.chevrons.includes("top-left"));
	const showTopRight = computed(() => props.chevrons.includes("top-right"));
	const showBottomLeft = computed(() => props.chevrons.includes("bottom-left"));
	const showBottomRight = computed(() => props.chevrons.includes("bottom-right"));
</script>
