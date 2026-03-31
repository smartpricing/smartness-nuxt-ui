<template>
	<slot />
</template>

<script setup lang="ts">
	import type { CustomSeriesRenderItemAPI, CustomSeriesRenderItemParams } from "echarts";
	import type { AreaDataPoint } from "./types";
	import { computed, inject, onUnmounted, useId, watch } from "vue";
	import {
		DATAVIZ_REMOVE_SERIE,
		DATAVIZ_UPSERT_SERIE
	} from "./types";

	defineOptions({
		name: "SDatavizArea"
	});

	const props = withDefaults(defineProps<{
		/** Unique identifier for the series */
		id?: string
		/** Display name for the series */
		name: string
		/** Data points with min/max values for the area */
		data: AreaDataPoint[]
		/** Whether the series is active/visible */
		active?: boolean
		/** Color - any valid CSS color (hex, rgb, hsl, etc.) */
		color?: string
		/** Smooth factor for the polygon edges (0-1) */
		smooth?: number
		/** Y axis index for multi-axis charts */
		yAxisIndex?: number
		/** X axis index for multi-axis charts */
		xAxisIndex?: number
	}>(), {
		active: true,
		smooth: 0.2
	});

	// Generate unique ID
	const serieId = computed(() => props.id ?? useId());

	// Get injection functions from parent
	const upsertSerie = inject(DATAVIZ_UPSERT_SERIE);
	const removeSerie = inject(DATAVIZ_REMOVE_SERIE);

	// Transform data to ECharts format [x, min, max]
	const chartData = computed(() =>
		props.data.map((point) => [point.x, point.min, point.max] as [number | string, number, number])
	);

	// Fast numeric hash for change detection (~100x faster than JSON.stringify)
	const dataVersion = computed(() => {
		const d = props.data;
		let h = d.length;
		for (let i = 0; i < d.length; i++) {
			h = (h * 31 + (d[i]?.min ?? 0)) | 0;
			h = (h * 31 + (d[i]?.max ?? 0)) | 0;
		}
		return h;
	});

	// Custom render function for area polygon with midline fallback
	function renderArea(_params: CustomSeriesRenderItemParams, api: CustomSeriesRenderItemAPI) {
		const points = chartData.value.map((dataPoint) => {
			const x = dataPoint[0];
			const y1 = dataPoint[1];
			const y2 = dataPoint[2];

			const yMin = api.coord([x as number, y1]);
			const yMax = api.coord([x as number, y2]);

			return [yMin, yMax];
		});

		const polygonPoints: [number, number][] = [];
		const minLinePoints: [number, number][] = [];
		const maxLinePoints: [number, number][] = [];

		points.forEach((pointPair) => {
			if (pointPair[0]) {
				polygonPoints.push(pointPair[0] as [number, number]);
				minLinePoints.push(pointPair[0] as [number, number]);
			}
			if (pointPair[1]) {
				maxLinePoints.push(pointPair[1] as [number, number]);
			}
		});

		for (let i = points.length - 1; i >= 0; i--) {
			const pointPair = points[i];
			if (pointPair && pointPair[1]) {
				polygonPoints.push(pointPair[1] as [number, number]);
			}
		}

		const style = api.style() as Record<string, unknown>;
		const strokeColor = (style.fill as string) || props.color || "#6366f1";
		const borderStyle = {
			stroke: strokeColor,
			lineWidth: 2,
			fill: "none"
		};

		return {
			type: "group" as const,
			children: [
				{
					type: "polygon" as const,
					shape: {
						points: polygonPoints,
						smooth: props.smooth
					},
					style
				},
				{
					type: "polyline" as const,
					shape: {
						points: minLinePoints,
						smooth: props.smooth
					},
					style: borderStyle
				},
				{
					type: "polyline" as const,
					shape: {
						points: maxLinePoints,
						smooth: props.smooth
					},
					style: borderStyle
				}
			]
		};
	}

	// Watch for changes and update chart
	watch(
		[dataVersion, () => props.name, () => props.active, () => props.smooth, () => props.color, () => props.yAxisIndex, () => props.xAxisIndex],
		() => {
			if (!upsertSerie)
				return;

			upsertSerie({
				id: serieId.value,
				name: props.name,
				data: chartData.value,
				type: "custom",
				clip: true,
				active: props.active,
				color: props.color,
				renderItem: renderArea,
				yAxisIndex: props.yAxisIndex,
				xAxisIndex: props.xAxisIndex
			});
		},
		{ immediate: true }
	);

	// Clean up on unmount
	onUnmounted(() => {
		removeSerie?.(serieId.value);
	});
</script>
