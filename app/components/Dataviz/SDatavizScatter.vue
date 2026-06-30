<template>
	<slot />
</template>

<script setup lang="ts">
	import type { MarkLineComponentOption, MarkPointComponentOption } from "echarts";
	import type { DataPoint, DatavizSerieOption } from "./types";
	import { computed, useId } from "vue";
	import { hashDatavizDataPoints, stableDatavizSignature } from "../../utils/datavizSignatures";
	import { useDatavizSerieRegistration } from "./useDatavizSerieRegistration";

	defineOptions({
		name: "SDatavizScatter"
	});

	const props = withDefaults(defineProps<{
		/** Unique identifier for the series */
		id?: string
		/** Display name for the series (stable ECharts identity; used in tooltips and legend toggle) */
		name: string
		/** Data points for the scatter chart */
		data: DataPoint[]
		/** Whether the series is active/visible */
		active?: boolean
		/** Color - any valid CSS color (hex, rgb, hsl, etc.) */
		color?: string
		/** Size of scatter points (fixed or function) */
		symbolSize?: number | ((val: (number | string)[]) => number)
		/** Custom item styling */
		itemStyle?: Record<string, unknown>
		/** Mark specific points (min, max, average, or custom coordinates) */
		markPoint?: MarkPointComponentOption
		/** Mark reference lines (min, max, average, or custom values) */
		markLine?: MarkLineComponentOption
		/** Coordinate system for the series */
		coordinateSystem?: "cartesian2d" | "polar"
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
		symbolSize: 10,
		showInLegend: true
	});

	const generatedSerieId = useId();
	const serieId = computed(() => props.id ?? generatedSerieId);

	// Transform data to ECharts format
	const chartData = computed(() =>
		props.data.map((point) => [point.x, point.y])
	);

	const serie = computed<DatavizSerieOption>(() => ({
		id: serieId.value,
		name: props.name,
		data: chartData.value,
		type: "scatter",
		active: props.active,
		legendTooltip: props.legendTooltip,
		showInLegend: props.showInLegend,
		color: props.color,
		symbolSize: props.symbolSize,
		itemStyle: props.itemStyle,
		markPoint: props.markPoint,
		markLine: props.markLine,
		coordinateSystem: props.coordinateSystem,
		yAxisIndex: props.yAxisIndex,
		xAxisIndex: props.xAxisIndex
	}));

	const chartSignature = computed(() => stableDatavizSignature({
		name: props.name,
		data: hashDatavizDataPoints(props.data),
		active: props.active,
		color: props.color,
		symbolSize: props.symbolSize,
		itemStyle: props.itemStyle,
		markPoint: props.markPoint,
		markLine: props.markLine,
		coordinateSystem: props.coordinateSystem,
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
