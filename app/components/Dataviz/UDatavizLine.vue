<template>
	<div />
</template>

<script setup lang="ts">
	import type { MarkAreaComponentOption } from "echarts";
	import type { DataPoint } from "./types";
	import {
		DATAVIZ_REMOVE_SERIE,
		DATAVIZ_UPSERT_SERIE
	} from "./types";

	defineOptions({
		name: "UDatavizLine"
	});

	const props = withDefaults(defineProps<{
		/** Unique identifier for the series */
		id?: string
		/** Display name for the series */
		name: string
		/** Data points for the line */
		data: DataPoint[]
		/** Whether the series is active/visible */
		active?: boolean
		/** Color - any valid CSS color (hex, rgb, hsl, etc.) */
		color?: string
		/** Enable smooth curve */
		smooth?: boolean
		/** Show data point symbols */
		showSymbol?: boolean
		/** Step line style */
		step?: "start" | "middle" | "end" | boolean
		/** Custom line styling */
		lineStyle?: Record<string, unknown>
		/** Mark area configuration */
		markArea?: MarkAreaComponentOption
		/** Y axis index for multi-axis charts */
		yAxisIndex?: number
		/** X axis index for multi-axis charts */
		xAxisIndex?: number
	}>(), {
		active: true,
		smooth: true,
		showSymbol: false
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
		[chartData, () => props.name, () => props.active, () => props.smooth, () => props.markArea],
		() => {
			if (!upsertSerie)
				return;

			upsertSerie({
				id: serieId.value,
				name: props.name,
				data: chartData.value,
				type: "line",
				smooth: props.smooth,
				active: props.active,
				color: props.color,
				lineStyle: props.lineStyle,
				markArea: props.markArea,
				showSymbol: props.showSymbol,
				yAxisIndex: props.yAxisIndex,
				xAxisIndex: props.xAxisIndex,
				step: props.step
			});
		},
		{ immediate: true, deep: true }
	);

	// Clean up on unmount
	onUnmounted(() => {
		removeSerie?.(serieId.value);
	});
</script>
