<template>
	<slot />
</template>

<script setup lang="ts">
	import type { AreaDataPoint, DatavizColor, DatavizSerieOption } from "./types";
	import { computed, useId } from "vue";
	import { hashDatavizAreaDataPoints, stableDatavizSignature } from "../../utils/datavizSignatures";
	import { useDatavizSerieRegistration } from "./useDatavizSerieRegistration";

	defineOptions({
		name: "SDatavizArea"
	});

	const props = withDefaults(defineProps<{
		/** Unique identifier for the series */
		id?: string
		/** Display name for the series (used in tooltips and the legend toggle) */
		name: string
		/** Data points with min/max values for the area */
		data: AreaDataPoint[]
		/** Whether the series is active/visible */
		active?: boolean
		/**
		 * Color — any valid CSS color (hex, rgb, hsl, …), or a gradient object.
		 * A gradient fills the band; the min/max edges take its first stop, since a
		 * bbox-relative gradient on a 2px line reads as an arbitrary flat color.
		 */
		color?: DatavizColor
		/** Width of the min/max edge lines. `0` draws the fill alone — a soft-edged band. */
		borderWidth?: number
		/** Smooth factor for the band edges (0-1) */
		smooth?: number
		/** Y axis index for multi-axis charts */
		yAxisIndex?: number
		/** X axis index for multi-axis charts */
		xAxisIndex?: number
		/** Plain-text tooltip on the legend chip */
		legendTooltip?: string
		/** When false, the serie is drawn but the legend chip is grayed out and not clickable */
		showInLegend?: boolean
	}>(), {
		active: true,
		borderWidth: 2,
		smooth: 0.2,
		showInLegend: true
	});

	const generatedSerieId = useId();
	const serieId = computed(() => props.id ?? generatedSerieId);

	// A null on either bound survives into the tuple and breaks the band there,
	// the way `y: null` breaks a line.
	const chartData = computed(() =>
		props.data.map((point) => [point.x, point.min, point.max] as [number | string, number | null, number | null])
	);

	const serie = computed<DatavizSerieOption>(() => ({
		id: serieId.value,
		name: props.name,
		data: chartData.value,
		type: "area",
		active: props.active,
		legendTooltip: props.legendTooltip,
		showInLegend: props.showInLegend,
		color: props.color,
		borderWidth: props.borderWidth,
		smooth: props.smooth,
		yAxisIndex: props.yAxisIndex,
		xAxisIndex: props.xAxisIndex
	}));

	const chartSignature = computed(() => stableDatavizSignature({
		name: props.name,
		data: hashDatavizAreaDataPoints(props.data),
		active: props.active,
		smooth: props.smooth,
		borderWidth: props.borderWidth,
		color: props.color,
		yAxisIndex: props.yAxisIndex,
		xAxisIndex: props.xAxisIndex
	}));

	const legendSignature = computed(() => stableDatavizSignature({
		legendTooltip: props.legendTooltip,
		showInLegend: props.showInLegend
	}));

	useDatavizSerieRegistration({
		id: serieId,
		serie,
		chartSignature,
		legendSignature
	});
</script>
