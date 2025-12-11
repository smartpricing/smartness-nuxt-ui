<template>
	<div />
</template>

<script setup lang="ts">
	import type { MarkLineComponentOption, MarkPointComponentOption } from "echarts";
	import type { DataPoint } from "./types";
	import {
		DATAVIZ_REMOVE_SERIE,
		DATAVIZ_UPSERT_SERIE
	} from "./types";

	defineOptions({
		name: "UDatavizScatter"
	});

	const props = withDefaults(defineProps<{
		/** Unique identifier for the series */
		id?: string
		/** Display name for the series */
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
	}>(), {
		active: true,
		symbolSize: 10
	});

	// Generate unique ID
	const serieId = computed(() => props.id ?? useId());

	// Get injection functions from parent
	const upsertSerie = inject(DATAVIZ_UPSERT_SERIE);
	const removeSerie = inject(DATAVIZ_REMOVE_SERIE);

	// Transform data to ECharts format
	const chartData = computed(() =>
		props.data.map((point) => [point.x, point.y])
	);

	// Watch for changes and update chart
	watch(
		[chartData, () => props.name, () => props.active, () => props.symbolSize, () => props.markPoint, () => props.markLine],
		() => {
			if (!upsertSerie)
				return;

			upsertSerie({
				id: serieId.value,
				name: props.name,
				data: chartData.value,
				type: "scatter",
				active: props.active,
				color: props.color,
				symbolSize: props.symbolSize,
				itemStyle: props.itemStyle,
				markPoint: props.markPoint,
				markLine: props.markLine,
				coordinateSystem: props.coordinateSystem,
				yAxisIndex: props.yAxisIndex,
				xAxisIndex: props.xAxisIndex
			});
		},
		{ immediate: true, deep: true }
	);

	// Clean up on unmount
	onUnmounted(() => {
		removeSerie?.(serieId.value);
	});
</script>
