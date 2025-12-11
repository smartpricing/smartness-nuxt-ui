<script setup lang="ts">
	import type { CustomSeriesRenderItemAPI, CustomSeriesRenderItemParams } from "echarts";
	import type { AreaDataPoint } from "./types";
	import { computed, inject, onUnmounted, useId, watch } from "vue";
	import {
		DATAVIZ_REMOVE_SERIE,
		DATAVIZ_UPSERT_SERIE
	} from "./types";

	defineOptions({
		name: "UDatavizArea"
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

	// Serialized data for efficient change detection (avoids expensive deep watch)
	const serializedData = computed(() => JSON.stringify(chartData.value));

	// Custom render function for area polygon with proper ECharts types
	function renderArea(_params: CustomSeriesRenderItemParams, api: CustomSeriesRenderItemAPI) {
		const points = chartData.value.map((dataPoint) => {
			const x = dataPoint[0];
			const y1 = dataPoint[1];
			const y2 = dataPoint[2];

			// Use ECharts coord API to convert data coordinates to pixel coordinates
			const yMin = api.coord([x as number, y1]);
			const yMax = api.coord([x as number, y2]);

			return [yMin, yMax];
		});

		const polygonPoints: [number, number][] = [];

		// Add bottom points (min values)
		points.forEach((pointPair) => {
			if (pointPair[0]) {
				polygonPoints.push(pointPair[0] as [number, number]);
			}
		});

		// Add top points in reverse (max values)
		for (let i = points.length - 1; i >= 0; i--) {
			const pointPair = points[i];
			if (pointPair && pointPair[1]) {
				polygonPoints.push(pointPair[1] as [number, number]);
			}
		}

		return {
			type: "group" as const,
			children: [
				{
					type: "polygon" as const,
					shape: {
						points: polygonPoints,
						smooth: props.smooth
					},
					style: api.style()
				}
			]
		};
	}

	// Watch for changes and update chart using serialized comparison
	watch(
		[serializedData, () => props.name, () => props.active, () => props.smooth, () => props.color, () => props.yAxisIndex, () => props.xAxisIndex],
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
