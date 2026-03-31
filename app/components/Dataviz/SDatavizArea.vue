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

	// Compute cubic bezier control points using ZRender's open-path algorithm (isLoop=false).
	// For each interior point, produces an incoming and outgoing control point based on the
	// tangent direction and distance ratio to neighbors. Endpoint control points are clamped.
	function computeSmoothCps(points: [number, number][], smooth: number): [number, number][] {
		const cps: [number, number][] = [];
		const len = points.length;
		for (let i = 0; i < len; i++) {
			const pt = points[i]!;
			if (i === 0 || i === len - 1) {
				cps.push([pt[0], pt[1]]);
				continue;
			}
			const prev = points[i - 1]!;
			const next = points[i + 1]!;
			const vx = (next[0] - prev[0]) * smooth;
			const vy = (next[1] - prev[1]) * smooth;
			const d0 = Math.hypot(pt[0] - prev[0], pt[1] - prev[1]);
			const d1 = Math.hypot(pt[0] - next[0], pt[1] - next[1]);
			const sum = d0 + d1;
			const r0 = sum !== 0 ? d0 / sum : 0.5;
			const r1 = sum !== 0 ? d1 / sum : 0.5;
			cps.push([pt[0] - vx * r0, pt[1] - vy * r0]);
			cps.push([pt[0] + vx * r1, pt[1] + vy * r1]);
		}
		return cps;
	}

	function buildForwardPath(points: [number, number][], cps: [number, number][]): string {
		let d = `M${points[0]![0]} ${points[0]![1]}`;
		for (let i = 0; i < points.length - 1; i++) {
			const c1 = cps[i * 2]!;
			const c2 = cps[i * 2 + 1]!;
			const p = points[i + 1]!;
			d += `C${c1[0]} ${c1[1]} ${c2[0]} ${c2[1]} ${p[0]} ${p[1]}`;
		}
		return d;
	}

	function buildReversePath(points: [number, number][], cps: [number, number][]): string {
		let d = "";
		for (let i = points.length - 2; i >= 0; i--) {
			const c1 = cps[i * 2 + 1]!;
			const c2 = cps[i * 2]!;
			const p = points[i]!;
			d += `C${c1[0]} ${c1[1]} ${c2[0]} ${c2[1]} ${p[0]} ${p[1]}`;
		}
		return d;
	}

	// Only render on the first visible data point — the full area is built from all
	// data points, so returning it once is sufficient. Uses dataIndexInside (index
	// within the current dataZoom window) instead of dataIndex so the area still
	// renders when the absolute first data point is scrolled out of view.
	function renderArea(params: CustomSeriesRenderItemParams, api: CustomSeriesRenderItemAPI) {
		if (params.dataIndexInside !== 0) return;

		const minPts: [number, number][] = [];
		const maxPts: [number, number][] = [];
		for (const dataPoint of chartData.value) {
			const x = dataPoint[0] as number;
			minPts.push(api.coord([x, dataPoint[1]]) as [number, number]);
			maxPts.push(api.coord([x, dataPoint[2]]) as [number, number]);
		}

		const style = api.style() as Record<string, unknown>;
		const strokeColor = (style.fill as string) || props.color || "#6366f1";
		const borderStyle = { stroke: strokeColor, lineWidth: 2, fill: "none" };

		// When smooth > 0, compute bezier control points ourselves (open-path, isLoop=false)
		// and build SVG path strings. This guarantees the fill polygon edges and border
		// polylines share identical curves — using ECharts' built-in smooth on polygon
		// (isLoop=true) vs polyline (isLoop=false) produces mismatched bezier control points.
		if (props.smooth > 0 && minPts.length >= 2) {
			const minCps = computeSmoothCps(minPts, props.smooth);
			const maxCps = computeSmoothCps(maxPts, props.smooth);

			const minFwd = buildForwardPath(minPts, minCps);
			const maxFwd = buildForwardPath(maxPts, maxCps);

			const lastMax = maxPts[maxPts.length - 1]!;
			const fillPath = minFwd
				+ `L${lastMax[0]} ${lastMax[1]}`
				+ buildReversePath(maxPts, maxCps)
				+ "Z";

			return {
				type: "group" as const,
				children: [
					{ type: "path" as const, shape: { pathData: fillPath }, style },
					{ type: "path" as const, shape: { pathData: minFwd }, style: borderStyle },
					{ type: "path" as const, shape: { pathData: maxFwd }, style: borderStyle }
				]
			};
		}

		// No smoothing: polygon + polylines match exactly
		const polygonPoints = [...minPts, ...maxPts.slice().reverse()];
		return {
			type: "group" as const,
			children: [
				{ type: "polygon" as const, shape: { points: polygonPoints }, style },
				{ type: "polyline" as const, shape: { points: minPts }, style: borderStyle },
				{ type: "polyline" as const, shape: { points: maxPts }, style: borderStyle }
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
