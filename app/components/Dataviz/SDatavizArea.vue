<template>
	<slot />
</template>

<script setup lang="ts">
	import type { CustomSeriesRenderItemAPI, CustomSeriesRenderItemParams } from "echarts";
	import type { AreaDataPoint, DatavizColor, DatavizSerieOption } from "./types";
	import { computed, useId } from "vue";
	import { datavizSolidColor, isDatavizGradient } from "../../utils/datavizColor";
	import { hashDatavizAreaDataPoints, stableDatavizSignature } from "../../utils/datavizSignatures";
	import { useDatavizSerieRegistration } from "./useDatavizSerieRegistration";

	defineOptions({
		name: "SDatavizArea"
	});

	const props = withDefaults(defineProps<{
		/** Unique identifier for the series */
		id?: string
		/** Display name for the series (stable ECharts identity; used in tooltips and legend toggle) */
		name: string
		/** Data points with min/max values for the area */
		data: AreaDataPoint[]
		/** Whether the series is active/visible */
		active?: boolean
		/**
		 * Color — any valid CSS color (hex, rgb, hsl, …), or a gradient object.
		 * A gradient fills the band; the min/max edges take its first stop, since a
		 * bbox-relative gradient on a 2px line reads as an arbitrary flat color.
		 */
		color?: DatavizColor
		/** Width of the min/max edge lines. `0` draws the fill alone — a soft-edged band. */
		borderWidth?: number
		/** Smooth factor for the polygon edges (0-1) */
		smooth?: number
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
		borderWidth: 2,
		smooth: 0.2,
		showInLegend: true
	});

	const generatedSerieId = useId();
	const serieId = computed(() => props.id ?? generatedSerieId);

	// Transform data to ECharts format [x, min, max]
	const chartData = computed(() =>
		props.data.map((point) => [point.x, point.min, point.max] as [number | string, number | null, number | null])
	);

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

	// Only render on the first visible row; geometry uses only points inside the
	// dataZoom window (dataInsideLength + api.value), not the full dataset — avoids
	// O(fullSeries) coord/path work on every pan/zoom frame.
	function renderArea(params: CustomSeriesRenderItemParams, api: CustomSeriesRenderItemAPI) {
		if (params.dataIndexInside !== 0) return;

		const n = params.dataInsideLength;
		if (n < 2) return;

		// A null on either bound breaks the band, the way `y: null` breaks a line, so
		// the points inside the window split into runs that are each drawn separately.
		// A lone point cannot form a band and is dropped, as a lone line point is.
		const runs: { minPts: [number, number][], maxPts: [number, number][] }[] = [];
		let run: { minPts: [number, number][], maxPts: [number, number][] } | undefined;
		for (let i = 0; i < n; i++) {
			const x = api.value(0, i);
			// A null bound comes back from `api.value` as NaN, and a single NaN
			// coordinate discards the whole path — so break the run on anything
			// that is not a finite number.
			const yMin = Number(api.value(1, i));
			const yMax = Number(api.value(2, i));
			if (!Number.isFinite(yMin) || !Number.isFinite(yMax)) {
				run = undefined;
				continue;
			}
			if (!run) {
				run = { minPts: [], maxPts: [] };
				runs.push(run);
			}
			run.minPts.push(api.coord([x, yMin]) as [number, number]);
			run.maxPts.push(api.coord([x, yMax]) as [number, number]);
		}

		const drawable = runs.filter((candidate) => candidate.minPts.length >= 2);
		if (drawable.length === 0) return;

		// A gradient always comes from the consumer, so it wins over the palette
		// color ECharts hands back through `api.visual` — which is only ever a string.
		const fillColor = isDatavizGradient(props.color)
			? props.color
			: ((api.visual("color") as string | undefined | null) ?? props.color ?? "#6366f1");
		const strokeColor = datavizSolidColor(fillColor) ?? "#6366f1";
		const areaFillStyle = { fill: fillColor };
		const borderStyle = { stroke: strokeColor, lineWidth: props.borderWidth, fill: "none" };
		const showBorder = props.borderWidth > 0;

		function renderRun(minPts: [number, number][], maxPts: [number, number][]) {
			// When smooth > 0, compute bezier control points ourselves (open-path, isLoop=false)
			// and build SVG path strings. This guarantees the fill polygon edges and border
			// polylines share identical curves — using ECharts' built-in smooth on polygon
			// (isLoop=true) vs polyline (isLoop=false) produces mismatched bezier control points.
			if (props.smooth > 0) {
				const minCps = computeSmoothCps(minPts, props.smooth);
				const maxCps = computeSmoothCps(maxPts, props.smooth);

				const minFwd = buildForwardPath(minPts, minCps);
				const maxFwd = buildForwardPath(maxPts, maxCps);

				const lastMax = maxPts.at(-1)!;
				const fillPath = `${minFwd}L${lastMax[0]} ${lastMax[1]}${buildReversePath(maxPts, maxCps)}Z`;

				return [
					{ type: "path" as const, shape: { pathData: fillPath }, style: areaFillStyle },
					...(showBorder
						? [
							{ type: "path" as const, shape: { pathData: minFwd }, style: borderStyle },
							{ type: "path" as const, shape: { pathData: maxFwd }, style: borderStyle }
						]
						: [])
				];
			}

			// No smoothing: polygon + polylines match exactly
			const polygonPoints = [...minPts, ...maxPts.slice().reverse()];
			return [
				{ type: "polygon" as const, shape: { points: polygonPoints }, style: areaFillStyle },
				...(showBorder
					? [
						{ type: "polyline" as const, shape: { points: minPts }, style: borderStyle },
						{ type: "polyline" as const, shape: { points: maxPts }, style: borderStyle }
					]
					: [])
			];
		}

		return {
			type: "group" as const,
			children: drawable.flatMap((segment) => renderRun(segment.minPts, segment.maxPts))
		};
	}

	const serie = computed<DatavizSerieOption>(() => ({
		id: serieId.value,
		name: props.name,
		data: chartData.value,
		type: "custom",
		clip: true,
		active: props.active,
		legendTooltip: props.legendTooltip,
		showInLegend: props.showInLegend,
		color: props.color,
		renderItem: renderArea,
		yAxisIndex: props.yAxisIndex,
		xAxisIndex: props.xAxisIndex
	}));

	const chartSignature = computed(() => stableDatavizSignature({
		name: props.name,
		data: hashDatavizAreaDataPoints(props.data),
		active: props.active,
		smooth: props.smooth,
		borderWidth: props.borderWidth,
		color: props.color,
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
