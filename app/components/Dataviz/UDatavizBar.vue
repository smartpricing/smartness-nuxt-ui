<template>
	<div />
</template>

<script setup lang="ts">
	import type { MarkAreaComponentOption, MarkLineComponentOption, MarkPointComponentOption } from "echarts";
	import type { DataPoint } from "./types";
	import {
		DATAVIZ_REMOVE_SERIE,
		DATAVIZ_UPSERT_SERIE
	} from "./types";

	defineOptions({
		name: "UDatavizBar"
	});

	const props = withDefaults(defineProps<{
		/** Unique identifier for the series */
		id?: string
		/** Display name for the series */
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
	}>(), {
		active: true
	});

	// Generate unique ID
	const serieId = computed(() => props.id ?? useId());

	// Get injection functions from parent
	const upsertSerie = inject(DATAVIZ_UPSERT_SERIE);
	const removeSerie = inject(DATAVIZ_REMOVE_SERIE);

	// Transform data to ECharts format
	const chartData = computed(() =>
		props.data.map((point) => [point.x, point.y] as [number | string, number])
	);

	// Watch for changes and update chart
	watch(
		[chartData, () => props.name, () => props.active, () => props.markPoint, () => props.markLine],
		() => {
			if (!upsertSerie)
				return;

			upsertSerie({
				id: serieId.value,
				name: props.name,
				data: chartData.value,
				type: "bar",
				active: props.active,
				color: props.color,
				itemStyle: props.itemStyle,
				markArea: props.markArea,
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
