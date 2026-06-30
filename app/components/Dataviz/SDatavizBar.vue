<template>
	<slot />
</template>

<script setup lang="ts">
	import type { MarkAreaComponentOption, MarkLineComponentOption, MarkPointComponentOption } from "echarts";
	import type { DataPoint, DatavizSerieOption } from "./types";
	import { computed, useId } from "vue";
	import { hashDatavizDataPoints, stableDatavizSignature } from "../../utils/datavizSignatures";
	import { useDatavizSerieRegistration } from "./useDatavizSerieRegistration";

	defineOptions({
		name: "SDatavizBar"
	});

	const props = withDefaults(defineProps<{
		/** Unique identifier for the series */
		id?: string
		/** Display name for the series (stable ECharts identity; used in tooltips and legend toggle) */
		name: string
		/** Data points for the bars */
		data: DataPoint[]
		/** Whether the series is active/visible */
		active?: boolean
		/** Color - any valid CSS color (hex, rgb, hsl, etc.) */
		color?: string
		/** Custom item styling */
		itemStyle?: Record<string, unknown>
		/** Mark area configuration */
		markArea?: MarkAreaComponentOption
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
		/** Bar width - absolute value (px) or percentage string */
		barWidth?: number | string
		/** Maximum bar width - absolute value (px) or percentage string */
		barMaxWidth?: number | string
		/** Minimum bar width - absolute value (px) or percentage string */
		barMinWidth?: number | string
		/** Minimum bar height - prevents interaction issues with very small values */
		barMinHeight?: number
		/** Minimum bar angle for polar coordinates */
		barMinAngle?: number
		/** Gap between bars of different series - percentage string like '20%' */
		barGap?: string
		/** Gap within a single series category - number or percentage string */
		barCategoryGap?: number | string
		/** Bar stack name */
		stack?: string
		/** Plain-text tooltip on the legend chip */
		legendTooltip?: string
		/** When false, the serie is drawn but the legend chip is grayed out and not clickable */
		showInLegend?: boolean
	}>(), {
		active: true,
		showInLegend: true
	});

	const generatedSerieId = useId();
	const serieId = computed(() => props.id ?? generatedSerieId);

	// Transform data to ECharts format
	const chartData = computed(() =>
		props.data.map((point) => [point.x, point.y] as [number | string, number])
	);

	const serie = computed<DatavizSerieOption>(() => ({
		id: serieId.value,
		name: props.name,
		data: chartData.value,
		type: "bar",
		active: props.active,
		legendTooltip: props.legendTooltip,
		showInLegend: props.showInLegend,
		color: props.color,
		itemStyle: props.itemStyle,
		markArea: props.markArea,
		markPoint: props.markPoint,
		markLine: props.markLine,
		coordinateSystem: props.coordinateSystem,
		yAxisIndex: props.yAxisIndex,
		xAxisIndex: props.xAxisIndex,
		barWidth: props.barWidth,
		barMaxWidth: props.barMaxWidth,
		barMinWidth: props.barMinWidth,
		barMinHeight: props.barMinHeight,
		barMinAngle: props.barMinAngle,
		barGap: props.barGap,
		barCategoryGap: props.barCategoryGap,
		stack: props.stack
	}));

	const chartSignature = computed(() => stableDatavizSignature({
		name: props.name,
		data: hashDatavizDataPoints(props.data),
		active: props.active,
		color: props.color,
		itemStyle: props.itemStyle,
		markArea: props.markArea,
		markPoint: props.markPoint,
		markLine: props.markLine,
		coordinateSystem: props.coordinateSystem,
		yAxisIndex: props.yAxisIndex,
		xAxisIndex: props.xAxisIndex,
		barWidth: props.barWidth,
		barMaxWidth: props.barMaxWidth,
		barMinWidth: props.barMinWidth,
		barMinHeight: props.barMinHeight,
		barMinAngle: props.barMinAngle,
		barGap: props.barGap,
		barCategoryGap: props.barCategoryGap,
		stack: props.stack
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
