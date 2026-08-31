import type { BarXOptions, ChartCurve, ChartLinearGradient, ChartMark, ChartPositionScaleOptions, ChartValue, DomChartDefinition, LineXOptions } from "@tanstack/charts";
import type {
	DatavizAnimationOptions,
	DatavizAxisOption,
	DatavizColor,
	DatavizLocale,
	DatavizMarkArea,
	DatavizMarkLine,
	DatavizMarkPoint,
	DatavizMarkValue,
	DatavizOptions,
	DatavizSerieOption
} from "./types";
import { areaX, areaY, barX, barY, d3Curve, dot, group, lineX, lineY, rect, ruleX, ruleY, stack, text } from "@tanstack/charts";
import { decorative } from "@tanstack/charts/mark/decorative";
import { pie, polar, radialArc } from "@tanstack/charts/polar";
import { scaleBand } from "@tanstack/charts/scales/band";
import { scaleLinear } from "@tanstack/charts/scales/linear";
import { scalePoint } from "@tanstack/charts/scales/point";
import { tooltip as tooltipExtension } from "@tanstack/charts/tooltip";
import { scaleUtc } from "d3-scale";
import { curveCatmullRom, curveLinear, curveMonotoneX, curveStep, curveStepAfter, curveStepBefore } from "d3-shape";
import { datavizSolidColor, isDatavizGradient } from "../../utils/datavizColor";

type AnyMark = ChartMark<any, any, any, any, any, any, any>;

/** Row shape shared by every cartesian mark built here. */
interface CartesianRow {
	x: ChartValue
	/**
	 * `y` is numeric for a vertical chart. A horizontal one mirrors the tuple —
	 * `[value, category]` — so the same slot carries the category instead.
	 */
	y: ChartValue | null
	/** Upper bound for area bands. */
	y2?: number | null
	serieId: string
	serieName: string
	serieType: string
	index: number
}

export interface BuildChartInput {
	/** Visible series, in registration order. */
	series: DatavizSerieOption[]
	/** Resolved color for a serie (or a pie/funnel slice). */
	colorFor: (id: string) => DatavizColor | undefined
	options?: DatavizOptions
	animation?: DatavizAnimationOptions
	locale: DatavizLocale
	/** Zoom window over the x domain, as fractions 0-1. */
	window?: { start: number, end: number }
}

const CURVE_SMOOTH = d3Curve(curveMonotoneX);
const CURVE_LINEAR = d3Curve(curveLinear);
const CURVE_BAND = d3Curve(curveCatmullRom.alpha(0.5));

const STEP_CURVES: Record<string, ChartCurve> = {
	start: d3Curve(curveStepBefore),
	middle: d3Curve(curveStep),
	end: d3Curve(curveStepAfter)
};

// ============================================
// Axis helpers
// ============================================

function firstAxis(axis?: DatavizAxisOption | DatavizAxisOption[]): DatavizAxisOption | undefined {
	return Array.isArray(axis) ? axis[0] : axis;
}

function axisList(axis?: DatavizAxisOption | DatavizAxisOption[]): DatavizAxisOption[] {
	if (!axis) return [];
	return Array.isArray(axis) ? axis : [axis];
}

/** Supports the ECharts-style `"{value}%"` template alongside a plain function. */
function labelFormatter(axis: DatavizAxisOption | undefined, locale: DatavizLocale): ((value: ChartValue) => string) | undefined {
	const formatter = axis?.axisLabel?.formatter;
	if (typeof formatter === "function") return (value) => formatter(value as string | number);
	if (typeof formatter === "string") {
		return (value) => formatter.replaceAll("{value}", formatValue(value, locale));
	}
	if (axis?.type === "value") return (value) => formatValue(value, locale);
	return undefined;
}

function formatValue(value: ChartValue, locale: DatavizLocale): string {
	if (typeof value === "number") return value.toLocaleString(locale);
	if (value instanceof Date) return value.toLocaleDateString(locale);
	return String(value);
}

function presentation(axis: DatavizAxisOption | undefined, locale: DatavizLocale) {
	if (axis?.show === false) return { axis: false as const };
	const format = labelFormatter(axis, locale);
	return {
		axis: {
			label: axis?.name,
			...(format || axis?.axisLabel?.rotate !== undefined
				? {
					ticks: format ? { format } : undefined,
					tickLabels: axis?.axisLabel?.rotate === undefined ? undefined : { rotate: axis.axisLabel.rotate }
				}
				: {})
		}
	};
}

/** Category values in first-seen order, the way ECharts builds a category axis. */
function categoriesOf(rows: CartesianRow[], key: "x" | "y"): ChartValue[] {
	const seen = new Set<string>();
	const values: ChartValue[] = [];
	for (const row of rows) {
		const value = key === "x" ? row.x : row.y;
		if (value === null || value === undefined) continue;
		const id = String(value);
		if (seen.has(id)) continue;
		seen.add(id);
		values.push(value as ChartValue);
	}
	return values;
}

function continuousScale(axis: DatavizAxisOption | undefined) {
	if (axis?.min !== undefined && axis?.max !== undefined) {
		return scaleLinear([axis.min, axis.max], [0, 1]);
	}
	return scaleLinear;
}

function categoryScale(axis: DatavizAxisOption | undefined, values: ChartValue[], usesBand: boolean, padding: number) {
	const domain = (axis?.data ?? values) as string[];
	if (!usesBand && axis?.boundaryGap === false) return scalePoint(domain, [0, 1]);
	return scaleBand(domain, [0, 1]).padding(padding);
}

// ============================================
// Colors and gradients
// ============================================

function gradientId(serieId: string): string {
	return `dataviz-gradient-${serieId.replaceAll(/[^\w-]/g, "")}`;
}

/**
 * Linear gradients become chart-level `<defs>` resources referenced as a paint
 * string. The renderer scopes the id, so `url(#id)` stays stable across charts.
 * Radial gradients have no renderer equivalent and collapse to their first stop.
 */
function paintFor(serieId: string, color: DatavizColor | undefined, gradients: ChartLinearGradient[]): string {
	if (!isDatavizGradient(color)) return color ?? "#6366f1";
	if (color.type === "radial") {
		if (import.meta.dev) {
			console.warn(`[SDataviz] Radial gradients are not supported by the renderer; serie "${serieId}" falls back to its first color stop.`);
		}
		return datavizSolidColor(color) ?? "#6366f1";
	}
	const id = gradientId(serieId);
	gradients.push({
		id,
		x1: color.x ?? 0,
		y1: color.y ?? 0,
		x2: color.x2 ?? 0,
		y2: color.y2 ?? 0,
		stops: color.colorStops.map((stop) => ({ offset: stop.offset, color: stop.color }))
	});
	return `url(#${id})`;
}

// ============================================
// Rows
// ============================================

function rowsFor(serie: DatavizSerieOption): CartesianRow[] {
	if (serie.type === "pie" || serie.type === "funnel") return [];
	if (serie.type === "area") {
		return serie.data.map((point, index) => ({
			x: point[0] as ChartValue,
			y: point[1],
			y2: point[2],
			serieId: serie.id,
			serieName: serie.name ?? serie.id,
			serieType: serie.type,
			index
		}));
	}
	return serie.data.map((point, index) => ({
		x: point[0] as ChartValue,
		y: (point[1] ?? null) as ChartValue | null,
		serieId: serie.id,
		serieName: serie.name ?? serie.id,
		serieType: serie.type,
		index
	}));
}

/**
 * The dataZoom window is applied by slicing every serie to the same index range
 * over the shared x domain.
 *
 * ponytail: slicing covers category and continuous axes with one code path. A
 * continuous axis could instead use the library's `viewport` plus `zoomX`;
 * swap it in if pan needs to be smooth rather than per-index.
 */
function windowKeys(rows: CartesianRow[], window: { start: number, end: number } | undefined): Set<string> | undefined {
	if (!window) return undefined;
	const categories = categoriesOf(rows, "x");
	const total = categories.length;
	if (total < 2) return undefined;
	const from = Math.max(0, Math.floor(window.start * (total - 1)));
	const to = Math.min(total - 1, Math.ceil(window.end * (total - 1)));
	if (from === 0 && to === total - 1) return undefined;
	return new Set(categories.slice(from, to + 1).map((value) => String(value)));
}

// ============================================
// Mark annotations (markLine / markPoint / markArea)
// ============================================

function resolveMarkValue(mark: DatavizMarkValue, rows: CartesianRow[]): { axis: "x" | "y", value: ChartValue, name?: string } | undefined {
	if ("yAxis" in mark) return { axis: "y", value: mark.yAxis, name: mark.name };
	if ("xAxis" in mark) return { axis: "x", value: mark.xAxis, name: mark.name };
	const values = rows.map((row) => row.y).filter((value): value is number => typeof value === "number" && Number.isFinite(value));
	if (!values.length) return undefined;
	if (mark.type === "max") return { axis: "y", value: Math.max(...values), name: mark.name };
	if (mark.type === "min") return { axis: "y", value: Math.min(...values), name: mark.name };
	return { axis: "y", value: values.reduce((sum, value) => sum + value, 0) / values.length, name: mark.name };
}

function annotationMarks(
	serie: DatavizSerieOption,
	rows: CartesianRow[],
	color: string,
	horizontal: boolean
): AnyMark[] {
	const marks: AnyMark[] = [];
	const markLine = "markLine" in serie ? (serie.markLine as DatavizMarkLine | undefined) : undefined;
	const markPoint = "markPoint" in serie ? (serie.markPoint as DatavizMarkPoint | undefined) : undefined;
	const markArea = "markArea" in serie ? (serie.markArea as DatavizMarkArea | undefined) : undefined;

	for (const entry of markLine?.data ?? []) {
		const resolved = resolveMarkValue(entry, rows);
		if (!resolved) continue;
		const rule = resolved.axis === "y"
			? ruleY([resolved.value], { y: (value: ChartValue) => value, stroke: color, strokeWidth: 1, strokeDasharray: "4 4" })
			: ruleX([resolved.value], { x: (value: ChartValue) => value, stroke: color, strokeWidth: 1, strokeDasharray: "4 4" });
		marks.push(decorative(rule) as AnyMark);
		if (resolved.name && resolved.axis === "y") {
			marks.push(decorative(text([resolved], {
				y: (row: typeof resolved) => row.value,
				x: () => rows.at(-1)?.x as ChartValue,
				text: (row: typeof resolved) => row.name ?? "",
				fill: color,
				fontSize: 10,
				anchor: "end",
				dy: -4
			})) as AnyMark);
		}
	}

	for (const entry of markPoint?.data ?? []) {
		const resolved = resolveMarkValue(entry, rows);
		if (!resolved || resolved.axis !== "y") continue;
		const match = rows.find((row) => row.y === resolved.value);
		if (!match) continue;
		marks.push(decorative(dot([match], {
			x: (row: CartesianRow) => row.x,
			y: (row: CartesianRow) => row.y as number | null,
			r: 4,
			fill: color,
			stroke: "#fff",
			strokeWidth: 1
		})) as AnyMark);
		if (resolved.name) {
			marks.push(decorative(text([match], {
				x: (row: CartesianRow) => row.x,
				y: (row: CartesianRow) => row.y as number | null,
				text: () => resolved.name ?? "",
				fill: color,
				fontSize: 10,
				dy: -10
			})) as AnyMark);
		}
	}

	for (const [from, to] of markArea?.data ?? []) {
		if (from.yAxis === undefined || to.yAxis === undefined) continue;
		const band = { y1: from.yAxis, y2: to.yAxis };
		marks.push(decorative(rect([band], {
			y1: (row: typeof band) => row.y1,
			y2: (row: typeof band) => row.y2,
			fill: color,
			fillOpacity: 0.08
		})) as AnyMark);
	}

	// ponytail: markArea on the x axis and markPoint on non-y values are unused by
	// consumers today; add the branches when a call site needs them.
	return horizontal ? [] : marks;
}

// ============================================
// Cartesian marks
// ============================================

function lineMarks(serie: DatavizSerieOption & { type: "line" }, rows: CartesianRow[], color: string, horizontal: boolean, yScale: string | undefined): AnyMark[] {
	const dash = serie.lineStyle?.type as string | undefined;
	const width = (serie.lineStyle?.width as number | undefined) ?? 2;
	const curve = serie.step
		? STEP_CURVES[serie.step === true ? "end" : serie.step] ?? CURVE_LINEAR
		: serie.smooth
			? CURVE_SMOOTH
			: CURVE_LINEAR;
	const style = {
		x: (row: CartesianRow) => row.x,
		y: (row: CartesianRow) => row.y as number | null,
		// The group channel is what an axis-triggered tooltip groups points by:
		// without it every serie collapses into a single entry.
		z: (row: CartesianRow) => row.serieId,
		stroke: color,
		strokeWidth: width,
		strokeDasharray: dash === "dashed" ? `${width * 3} ${width * 2}` : dash === "dotted" ? `1 ${width * 2}` : undefined,
		curve,
		...(yScale ? { yScale } : {})
	};
	// A horizontal chart swaps the tuple roles — `[value, category]` — so the same
	// accessors feed the X-oriented mark, whose channel types are the mirror image.
	const marks: AnyMark[] = [
		(horizontal ? lineX(rows, style as unknown as LineXOptions<CartesianRow>) : lineY(rows, style)) as AnyMark
	];
	if (serie.showSymbol) {
		marks.push(decorative(dot(rows, {
			x: (row: CartesianRow) => row.x,
			y: (row: CartesianRow) => row.y as number | null,
			r: width + 1,
			fill: color,
			...(yScale ? { yScale } : {})
		})) as AnyMark);
	}
	return marks;
}

function areaMarks(serie: DatavizSerieOption & { type: "area" }, rows: CartesianRow[], paint: string, stroke: string, yScale: string | undefined): AnyMark[] {
	const curve = (serie.smooth ?? 0) > 0 ? CURVE_BAND : CURVE_LINEAR;
	const borderWidth = serie.borderWidth ?? 2;
	const marks: AnyMark[] = [
		areaY(rows, {
			x: (row: CartesianRow) => row.x,
			z: (row: CartesianRow) => row.serieId,
			y1: (row: CartesianRow) => row.y as number | null,
			y2: (row: CartesianRow) => row.y2 ?? null,
			fill: paint,
			curve,
			...(yScale ? { yScale } : {})
		}) as AnyMark
	];
	// The band's two edges are drawn as their own lines: `areaY` strokes a single
	// outline, and the min/max edges must be independently sized by `borderWidth`.
	if (borderWidth > 0) {
		for (const bound of ["y", "y2"] as const) {
			marks.push(decorative(lineY(rows, {
				x: (row: CartesianRow) => row.x,
				y: (row: CartesianRow) => (bound === "y" ? (row.y as number | null) : row.y2 ?? null),
				stroke,
				strokeWidth: borderWidth,
				curve,
				...(yScale ? { yScale } : {})
			})) as AnyMark);
		}
	}
	return marks;
}

function scatterMarks(serie: DatavizSerieOption & { type: "scatter" }, rows: CartesianRow[], color: string, yScale: string | undefined): AnyMark[] {
	const size = serie.symbolSize ?? 10;
	// ECharts sizes a symbol by diameter; `r` is a radius.
	const radius = typeof size === "function"
		? (row: CartesianRow) => size([row.x as number | string, row.y as number]) / 2
		: size / 2;
	return [dot(rows, {
		x: (row: CartesianRow) => row.x,
		y: (row: CartesianRow) => row.y as number | null,
		z: (row: CartesianRow) => row.serieId,
		r: radius,
		fill: color,
		...(yScale ? { yScale } : {})
	}) as AnyMark];
}

/**
 * Every bar serie becomes one mark: repeated x positions stack, and a `z`
 * channel separates the series.
 *
 * ponytail: one layout for all bars — stacked when any two series share a
 * `stack` name, grouped otherwise. Side-by-side groups of stacks (several
 * distinct `stack` names in one chart) would need a dodge layout; add it when
 * a call site asks for it.
 */
function barMarks(
	series: (DatavizSerieOption & { type: "bar" })[],
	rowsFor: (serie: DatavizSerieOption) => CartesianRow[],
	paintOf: (serieId: string) => string,
	horizontal: boolean
): AnyMark[] {
	if (!series.length) return [];
	const rows = series.flatMap((serie) => rowsFor(serie));
	const stackNames = series.map((serie) => serie.stack).filter(Boolean);
	const stacked = new Set(stackNames).size < stackNames.length;
	const first = series[0]!;
	const maxThickness = pixelSize(first.barWidth ?? first.barMaxWidth);
	const options = {
		x: (row: CartesianRow) => row.x,
		y: (row: CartesianRow) => row.y as number | null,
		z: (row: CartesianRow) => row.serieId,
		fill: (row: CartesianRow) => paintOf(row.serieId),
		layout: stacked ? stack({ order: "input" as const }) : group({ padding: gapPadding(first.barGap) }),
		...(maxThickness === undefined ? {} : { maxThickness })
	};
	return [(horizontal ? barX(rows, options as unknown as BarXOptions<CartesianRow>) : barY(rows, options)) as AnyMark];
}

function pixelSize(value: number | string | undefined): number | undefined {
	if (typeof value === "number") return value;
	return undefined;
}

/** `"20%"` in ECharts is the gap between bars of different series. */
function gapPadding(barGap: string | undefined): number | undefined {
	if (!barGap) return undefined;
	const parsed = Number.parseFloat(barGap);
	return Number.isFinite(parsed) ? Math.min(0.9, Math.max(0, parsed / 100)) : undefined;
}

/** `"40%"` category gap becomes band padding. */
function categoryPadding(series: DatavizSerieOption[]): number {
	const bar = series.find((serie) => serie.type === "bar") as (DatavizSerieOption & { type: "bar" }) | undefined;
	const gap = bar?.barCategoryGap;
	if (typeof gap === "number") return Math.min(0.9, Math.max(0, gap / 100));
	if (typeof gap === "string") {
		const parsed = Number.parseFloat(gap);
		if (Number.isFinite(parsed)) return Math.min(0.9, Math.max(0, parsed / 100));
	}
	return bar ? 0.2 : 0;
}

// ============================================
// Pie and funnel
// ============================================

interface SliceRow {
	id: string
	name: string
	value: number
	paint: string
}

function pieMarks(serie: DatavizSerieOption & { type: "pie" }, paintOf: (id: string) => string): AnyMark[] {
	const rows: SliceRow[] = serie.data
		.filter((slice) => slice.active !== false)
		.map((slice) => ({ id: slice.id, name: slice.name, value: slice.value, paint: paintOf(slice.id) }));
	if (!rows.length) return [];
	const sliced = pie(rows, { value: (row: SliceRow) => row.value });
	// ponytail: arcs only. `radialText` needs a configured angle scale, which a
	// value-driven pie does not have; slice names live in the legend and tooltip.
	return [polar({
		marks: [radialArc(sliced, { fill: (row: (typeof sliced)[number]) => row.paint })],
		scales: { angle: null, radius: null },
		radiusRatio: 0.9
	}) as AnyMark];
}

/**
 * There is no funnel mark: each stage is an `areaX` trapezoid centered on zero,
 * tapering into the next stage's width.
 */
function funnelMarks(serie: DatavizSerieOption & { type: "funnel" }, paintOf: (id: string) => string): AnyMark[] {
	const stages = serie.data.filter((slice) => slice.active !== false);
	if (!stages.length) return [];
	return stages.map((stage, index) => {
		const next = stages[index + 1];
		const width = Math.abs(stage.value);
		const nextWidth = next ? Math.abs(next.value) : width * 0.6;
		const trapezoid = [
			{ y: index, half: width / 2, name: stage.name },
			{ y: index + 1, half: nextWidth / 2, name: stage.name }
		];
		return areaX(trapezoid, {
			y: (row: (typeof trapezoid)[number]) => row.y,
			x1: (row: (typeof trapezoid)[number]) => -row.half,
			x2: (row: (typeof trapezoid)[number]) => row.half,
			fill: paintOf(stage.id),
			fillOpacity: 1
		}) as AnyMark;
	});
}

// ============================================
// Definition
// ============================================

/** A serie with `yAxisIndex: n` binds to the named scale built for that axis. */
function yScaleIdFor(serie: DatavizSerieOption): string | undefined {
	const index = "yAxisIndex" in serie ? serie.yAxisIndex : undefined;
	return index ? `y${index}` : undefined;
}

export function buildChartDefinition(input: BuildChartInput): DomChartDefinition | null {
	const { series, options, locale } = input;
	if (!series.length) return null;

	const gradients: ChartLinearGradient[] = [];
	const paintCache = new Map<string, string>();
	const paintOf = (id: string) => {
		const cached = paintCache.get(id);
		if (cached !== undefined) return cached;
		const paint = paintFor(id, input.colorFor(id), gradients);
		paintCache.set(id, paint);
		return paint;
	};

	const radial = series.find((serie) => serie.type === "pie" || serie.type === "funnel");
	if (radial) {
		const marks = radial.type === "pie" ? pieMarks(radial, paintOf) : funnelMarks(radial, paintOf);
		if (!marks.length) return null;
		return {
			marks,
			scales: radial.type === "pie"
				? { x: null, y: null }
				: {
					x: { scale: scaleLinear, axis: false },
					y: { scale: scaleLinear, reverse: true, axis: false }
				},
			gradients,
			margin: 8,
			focus: "nearest",
			tooltip: options?.tooltip?.show === false ? false : tooltipExtension
		} as DomChartDefinition;
	}

	const xAxis = firstAxis(options?.xAxis);
	const yAxes = axisList(options?.yAxis);
	const primaryY = yAxes[0];
	const horizontal = primaryY?.type === "category";

	const keys = windowKeys(series.flatMap(rowsFor), input.window);
	const rowsOf = (serie: DatavizSerieOption) => {
		const rows = rowsFor(serie);
		return keys ? rows.filter((row) => keys.has(String(row.x))) : rows;
	};
	const allRows = series.flatMap(rowsOf);
	const bars = series.filter((serie): serie is DatavizSerieOption & { type: "bar" } => serie.type === "bar");

	const marks: AnyMark[] = [];
	for (const serie of series) {
		const rows = rowsOf(serie);
		const color = paintOf(serie.id);
		const solid = datavizSolidColor(input.colorFor(serie.id)) ?? "#6366f1";
		const yScale = yScaleIdFor(serie);
		if (serie.type === "line") marks.push(...lineMarks(serie, rows, color, horizontal, yScale));
		else if (serie.type === "area") marks.push(...areaMarks(serie, rows, color, solid, yScale));
		else if (serie.type === "scatter") marks.push(...scatterMarks(serie, rows, color, yScale));
		if (serie.type !== "bar") marks.push(...annotationMarks(serie, rows, solid, horizontal));
	}
	marks.push(...barMarks(bars, rowsOf, paintOf, horizontal));
	for (const serie of bars) marks.push(...annotationMarks(serie, rowsOf(serie), datavizSolidColor(input.colorFor(serie.id)) ?? "#6366f1", horizontal));

	if (!marks.length) return null;

	const usesBand = bars.length > 0;
	const padding = categoryPadding(series);
	const scales: Record<string, ChartPositionScaleOptions | null> = {
		x: {
			scale: horizontal
				? continuousScale(xAxis)
				: xAxis?.type === "value"
					? continuousScale(xAxis)
					: xAxis?.type === "time"
						? scaleUtc
						: categoryScale(xAxis, categoriesOf(allRows, "x"), usesBand, padding),
			nice: xAxis?.type === "value" && xAxis.min === undefined,
			reverse: xAxis?.inverse,
			...presentation(xAxis, locale)
		},
		y: {
			scale: horizontal
				? categoryScale(primaryY, categoriesOf(allRows, "y"), usesBand, padding)
				: continuousScale(primaryY),
			nice: !horizontal && primaryY?.min === undefined,
			grid: primaryY?.splitLine?.show !== false,
			reverse: primaryY?.inverse,
			...presentation(primaryY, locale)
		}
	};

	// Secondary y axes become named scales; a serie binds to one with `yAxisIndex`.
	for (let index = 1; index < yAxes.length; index++) {
		const axis = yAxes[index]!;
		scales[`y${index}`] = {
			channel: "y",
			side: axis.position === "left" ? "left" : "right",
			scale: continuousScale(axis),
			nice: axis.min === undefined,
			...presentation(axis, locale)
		};
	}

	const animation = input.animation;
	const trigger = options?.tooltip?.trigger ?? "axis";

	return {
		marks,
		scales,
		gradients,
		clip: true,
		...(options?.grid ? { margin: resolveMargin(options.grid) } : {}),
		focus: trigger === "item" ? "nearest" : "group-x",
		tooltip: options?.tooltip?.show === false || trigger === "none" ? false : tooltipExtension,
		svgAnimation: animation?.enabled === false
			? false
			: { duration: animation?.duration ?? 400, easing: animation?.easing ?? "ease-out" }
	} as DomChartDefinition;
}

/** ECharts grid insets are percentages or pixels; the scene margin is pixels. */
function resolveMargin(grid: NonNullable<DatavizOptions["grid"]>) {
	const toPixels = (value: number | string | undefined, fallback: number) => {
		if (typeof value === "number") return value;
		if (typeof value === "string" && value.endsWith("%")) {
			const parsed = Number.parseFloat(value);
			return Number.isFinite(parsed) ? Math.round(parsed) : fallback;
		}
		return fallback;
	};
	return {
		top: toPixels(grid.top, 8),
		right: toPixels(grid.right, 8),
		bottom: toPixels(grid.bottom, 8),
		left: toPixels(grid.left, 8)
	};
}
