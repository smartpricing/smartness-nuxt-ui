<template>
	<slot />
</template>

<script setup lang="ts">
	import type { MarkAreaComponentOption, MarkLineComponentOption, MarkPointComponentOption } from "echarts";
	import type { DataPoint } from "./types";
	import { computed, inject, onUnmounted, useId, watch } from "vue";
	import {
		DATAVIZ_REMOVE_SERIE,
		DATAVIZ_UPSERT_SERIE
	} from "./types";

	defineOptions({
		name: "SDatavizBar"
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

	// Serialized data for efficient change detection (avoids expensive deep watch)
	const serializedData = computed(() => JSON.stringify(chartData.value));

	// Watch for changes and update chart using serialized comparison
	watch(
		[
			serializedData,
			() => props.name,
			() => props.active,
			() => props.color,
			() => props.coordinateSystem,
			() => props.yAxisIndex,
			() => props.xAxisIndex,
			() => props.barWidth,
			() => props.barMaxWidth,
			() => props.barMinWidth,
			() => props.barMinHeight,
			() => props.barMinAngle,
			() => props.barGap,
			() => props.barCategoryGap,
			() => props.stack
		],
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
				xAxisIndex: props.xAxisIndex,
				barWidth: props.barWidth,
				barMaxWidth: props.barMaxWidth,
				barMinWidth: props.barMinWidth,
				barMinHeight: props.barMinHeight,
				barMinAngle: props.barMinAngle,
				barGap: props.barGap,
				barCategoryGap: props.barCategoryGap,
				stack: props.stack
			});
		},
		{ immediate: true }
	);

	// Separate watcher for mark options (less frequent changes, needs deep)
	watch(
		[() => props.markArea, () => props.markPoint, () => props.markLine, () => props.itemStyle],
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
				xAxisIndex: props.xAxisIndex,
				barWidth: props.barWidth,
				barMaxWidth: props.barMaxWidth,
				barMinWidth: props.barMinWidth,
				barMinHeight: props.barMinHeight,
				barMinAngle: props.barMinAngle,
				barGap: props.barGap,
				barCategoryGap: props.barCategoryGap,
				stack: props.stack
			});
		},
		{ deep: true }
	);

	// Clean up on unmount
	onUnmounted(() => {
		removeSerie?.(serieId.value);
	});
</script>
