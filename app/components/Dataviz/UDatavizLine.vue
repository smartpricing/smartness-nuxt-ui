<script setup lang="ts">
	import type { MarkAreaComponentOption, MarkLineComponentOption, MarkPointComponentOption } from "echarts";
	import type { DataPoint } from "./types";
	import { computed, inject, onUnmounted, useId, watch } from "vue";
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
		smooth: false,
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

	// Serialized data for efficient change detection (avoids expensive deep watch)
	const serializedData = computed(() => JSON.stringify(chartData.value));

	// Watch for changes and update chart using serialized comparison
	watch(
		[serializedData, () => props.name, () => props.active, () => props.smooth, () => props.color, () => props.showSymbol, () => props.step, () => props.coordinateSystem, () => props.yAxisIndex, () => props.xAxisIndex],
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
				markPoint: props.markPoint,
				markLine: props.markLine,
				coordinateSystem: props.coordinateSystem,
				showSymbol: props.showSymbol,
				yAxisIndex: props.yAxisIndex,
				xAxisIndex: props.xAxisIndex,
				step: props.step
			});
		},
		{ immediate: true }
	);

	// Separate watcher for mark options (less frequent changes, needs deep)
	watch(
		[() => props.markArea, () => props.markPoint, () => props.markLine, () => props.lineStyle],
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
				markPoint: props.markPoint,
				markLine: props.markLine,
				coordinateSystem: props.coordinateSystem,
				showSymbol: props.showSymbol,
				yAxisIndex: props.yAxisIndex,
				xAxisIndex: props.xAxisIndex,
				step: props.step
			});
		},
		{ deep: true }
	);

	// Clean up on unmount
	onUnmounted(() => {
		removeSerie?.(serieId.value);
	});
</script>
