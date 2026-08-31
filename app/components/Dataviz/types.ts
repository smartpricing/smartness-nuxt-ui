import type { ComputedRef, InjectionKey } from "vue";

// Chart initialization options.
// The Vue adapter of @tanstack/charts renders SVG only, so `renderer` is advisory.
export interface DatavizInitOptions {
	renderer?: "svg" | "canvas"
	devicePixelRatio?: number
	ssr?: boolean
}

// Animation configuration options
export interface DatavizAnimationOptions {
	/** Enable or disable animation */
	enabled?: boolean
	/** Animation duration in milliseconds */
	duration?: number
	/** Animation easing – a CSS timing keyword or a custom progress function */
	easing?: DatavizEasing
	/** Delay before animation starts in milliseconds */
	delay?: number
	/** Animation threshold - only animate when data count is below this number */
	threshold?: number
}

export type DatavizEasing = "linear" | "ease" | "ease-in" | "ease-out" | "ease-in-out" | ((progress: number) => number);

// ============================================
// Axis / chart options
// ============================================

export interface DatavizAxisLabelOption {
	show?: boolean
	rotate?: number
	/** `"{value}%"` template string, or a function */
	formatter?: string | ((value: string | number) => string)
}

export interface DatavizAxisOption {
	type?: "category" | "value" | "time"
	/** Explicit category values. Inferred from the series when omitted. */
	data?: (string | number)[]
	/** Axis title */
	name?: string
	min?: number
	max?: number
	show?: boolean
	inverse?: boolean
	position?: "left" | "right" | "top" | "bottom"
	/**
	 * Category axes only. `false` places the first and last point on the axis
	 * ends (a point scale) instead of inside a band.
	 */
	boundaryGap?: boolean
	splitLine?: { show?: boolean }
	axisLabel?: DatavizAxisLabelOption
}

export interface DatavizZoomOption {
	type?: "slider" | "inside"
	/** Window start as a percentage of the full x domain (0-100) */
	start?: number
	/** Window end as a percentage of the full x domain (0-100) */
	end?: number
}

// Chart configuration options
export interface DatavizOptions {
	xAxis?: DatavizAxisOption | DatavizAxisOption[]
	yAxis?: DatavizAxisOption | DatavizAxisOption[]
	dataZoom?: DatavizZoomOption | DatavizZoomOption[]
	/** Plot inset. Numbers are pixels, strings are percentages of the chart box. */
	grid?: { top?: number | string, right?: number | string, bottom?: number | string, left?: number | string }
	legend?: { show?: boolean, selectedMode?: false }
	tooltip?: { show?: boolean, trigger?: "item" | "axis" | "none" }
}

// Action button configuration
export interface DatavizAction {
	label: string
	icon?: string
	onClick: () => void
}

// ============================================
// Mark annotations (markLine / markPoint / markArea)
// ============================================

/** A computed extremum, or an explicit axis value. */
export type DatavizMarkValue
	= | { type: "max" | "min" | "average", name?: string }
		| { yAxis: number, name?: string }
		| { xAxis: number | string, name?: string };

export interface DatavizMarkLine {
	data: DatavizMarkValue[]
}

export interface DatavizMarkPoint {
	data: DatavizMarkValue[]
}

export interface DatavizMarkArea {
	/** Each entry is a `[from, to]` pair of bounds. */
	data: [{ yAxis?: number, xAxis?: number | string, name?: string }, { yAxis?: number, xAxis?: number | string }][]
}

// ============================================
// Colors
// ============================================

export interface DatavizGradientStop {
	/** Position along the gradient, 0 → 1 */
	offset: number
	/** Any valid CSS color string */
	color: string
}

/**
 * Linear gradient. Coordinates are fractions of the shape's bounding box,
 * so `y: 0, y2: 1` fades top to bottom over the shape itself.
 */
export interface DatavizLinearGradient {
	type: "linear"
	x?: number
	y?: number
	x2?: number
	y2?: number
	colorStops: DatavizGradientStop[]
	global?: boolean
}

/**
 * Radial gradient. Kept for source compatibility — the renderer paints only
 * linear gradients, so a radial one collapses to its first stop.
 */
export interface DatavizRadialGradient {
	type: "radial"
	x?: number
	y?: number
	r?: number
	colorStops: DatavizGradientStop[]
	global?: boolean
}

/** A serie color: any CSS color string, or a gradient (area series only). */
export type DatavizColor = string | DatavizLinearGradient | DatavizRadialGradient;

// Internal series state
export interface DatavizSerieState {
	id: string
	name?: string
	/** Custom legend chip label; falls back to `name` when unset */
	legendLabel?: string
	active: boolean
	type: "line" | "bar" | "area" | "pie" | "funnel" | "scatter"
	/** Gradients only ever reach here from area series. */
	color?: DatavizColor
	parentId?: string
	/** Line style type – only populated for line series */
	lineStyleType?: "solid" | "dashed" | "dotted"
	/** Plain-text tooltip on the custom legend chip when set */
	legendTooltip?: string
	/** When false, the series is drawn but its legend chip is grayed out and not clickable */
	showInLegend?: boolean
}

// ============================================
// Data Point Types
// ============================================

/** Data point for line, bar, scatter charts */
export interface DataPoint {
	x: number | string
	/** Value - use null to create a gap in the line */
	y: string | number | null
}

/** Data point for area charts (range with min/max) */
export interface AreaDataPoint {
	x: number | string
	/** Use null on either bound to break the band, the way `y: null` breaks a line */
	min: number | null
	max: number | null
}

/** Data point for pie and funnel charts - each point can have its own color */
export interface PieDataPoint {
	/** Display name for the slice */
	name: string
	/** Custom legend chip label; falls back to `name` when unset */
	legendLabel?: string
	/** Numeric value */
	value: number
	/** Optional unique identifier */
	id?: string
	/** Optional color - any valid CSS color (hex, rgb, hsl, etc.) */
	color?: string
	/** Whether this slice is active/selected */
	active?: boolean
	/** Plain-text tooltip for this slice’s legend chip */
	legendTooltip?: string
	/** When false, the slice is drawn but its legend chip is grayed out and not clickable */
	showInLegend?: boolean
}

// ============================================
// Tooltip Types (for type-safe tooltip slots)
// ============================================

/** Single tooltip data item - returned when trigger is "item" */
export interface TooltipDataItem {
	/** Component type (e.g., "series") */
	componentType?: string
	/** Series type (e.g., "line", "bar", "pie") */
	seriesType?: string
	/** Series index in the chart */
	seriesIndex?: number
	/** Series name */
	seriesName?: string
	/** Data name (category name or pie slice name) */
	name?: string
	/** Data index in the series */
	dataIndex?: number
	/** Data value - can be number, string, or array for multi-dimensional data */
	value?: number | string | (number | string)[]
	/** Color used for this data point — a gradient when the serie carries one */
	color?: DatavizColor
	/** Percentage (for pie charts) */
	percent?: number
	/** Marker HTML string for the legend icon */
	marker?: string
	/** Original data object */
	data?: unknown
}

/** Tooltip slot data - can be single item or array (for axis trigger with multiple series) */
export type TooltipSlotData = TooltipDataItem | TooltipDataItem[];

// ============================================
// Event Types
// ============================================

/** Event parameters emitted by the chart */
export interface DatavizEventParams {
	/** Component type (e.g., "series") */
	componentType: string
	/** Series type (e.g., "line", "bar", "pie") */
	seriesType?: string
	/** Series index in the chart */
	seriesIndex?: number
	/** Series name */
	seriesName?: string
	/** Data name (category name or pie slice name) */
	name?: string
	/** Data index in the series */
	dataIndex?: number
	/** Original data object */
	data?: unknown
	/** Data value */
	value?: number | string | (number | string)[]
	/** Color used for this data point */
	color?: string
}

// ============================================
// Serie Option Types (internal chart updates)
// ============================================

export type DatavizSerieOption = {
	id: string
	name?: string
	active?: boolean
	/** Plain-text tooltip on the custom legend chip (line/bar/scatter/area); pie/funnel use per-slice tooltips on `data` */
	legendTooltip?: string
	/** When false, the serie is drawn but its legend chip is grayed out and not clickable */
	showInLegend?: boolean
} & (
	| {
		type: "line"
		data: (number | string | null)[][]
		/** Any valid CSS color string */
		color?: string
		smooth?: boolean
		markArea?: DatavizMarkArea
		/** Mark specific points on the chart */
		markPoint?: DatavizMarkPoint
		/** Mark reference lines on the chart */
		markLine?: DatavizMarkLine
		showSymbol?: boolean
		lineStyle?: Record<string, unknown>
		yAxisIndex?: number
		xAxisIndex?: number
		step?: "start" | "middle" | "end" | boolean
	}
	| {
		type: "bar"
		data: [number | string, number][]
		/** Any valid CSS color string */
		color?: string
		markArea?: DatavizMarkArea
		/** Mark specific points on the chart */
		markPoint?: DatavizMarkPoint
		/** Mark reference lines on the chart */
		markLine?: DatavizMarkLine
		itemStyle?: Record<string, unknown>
		yAxisIndex?: number
		xAxisIndex?: number
		/** Bar width - absolute value (px) or percentage string */
		barWidth?: number | string
		/** Maximum bar width - absolute value (px) or percentage string */
		barMaxWidth?: number | string
		/** Minimum bar width - absolute value (px) or percentage string */
		barMinWidth?: number | string
		/** Minimum bar height - prevents interaction issues with very small values */
		barMinHeight?: number
		/** Gap between bars of different series - percentage string like '20%' */
		barGap?: string
		/** Gap within a single series category - number or percentage string */
		barCategoryGap?: number | string
		/** Bar stack name */
		stack?: string
	}
	| {
		type: "area"
		data: [number | string, number | null, number | null][]
		/** Any valid CSS color string, or a gradient object */
		color?: DatavizColor
		/** Width of the min/max edge lines */
		borderWidth?: number
		/** Smooth factor for the band edges (0-1) */
		smooth?: number
		yAxisIndex?: number
		xAxisIndex?: number
	}
	| {
		type: "pie"
		/** Each data point has its own color */
		data: { name: string, value: number, color?: string, id: string, active?: boolean, legendLabel?: string, legendTooltip?: string, showInLegend?: boolean }[]
	}
	| {
		type: "funnel"
		/** Each data point has its own color */
		data: { name: string, value: number, color?: string, id: string, active?: boolean, legendLabel?: string, legendTooltip?: string, showInLegend?: boolean }[]
	}
	| {
		type: "scatter"
		data: (number | string | null)[][]
		/** Any valid CSS color string */
		color?: string
		symbolSize?: number | ((val: (number | string)[]) => number)
		itemStyle?: Record<string, unknown>
		/** Mark specific points on the chart */
		markPoint?: DatavizMarkPoint
		/** Mark reference lines on the chart */
		markLine?: DatavizMarkLine
		yAxisIndex?: number
		xAxisIndex?: number
	}
);

// ============================================
// Injection Keys
// ============================================

export interface DatavizSerieRegistration {
	/** Stable component-local series id. Can still change when a consumer changes the public id prop. */
	id: ComputedRef<string>
	/** Complete chart option payload for the latest child state. */
	serie: ComputedRef<DatavizSerieOption>
	/** Signature for fields that require a chart re-render. */
	chartSignature: ComputedRef<string>
	/** Signature for fields that only affect the custom legend state. */
	legendSignature: ComputedRef<string>
}

export interface DatavizSerieRegistryContext {
	registerSerie: (registration: DatavizSerieRegistration) => () => void
}

export const DATAVIZ_SERIE_REGISTRY: InjectionKey<DatavizSerieRegistryContext> = Symbol("dataviz-serie-registry");
export const DATAVIZ_UPSERT_SERIE: InjectionKey<(serie: DatavizSerieOption) => void> = Symbol("dataviz-upsert-serie");
export const DATAVIZ_REMOVE_SERIE: InjectionKey<(serieId: string) => void> = Symbol("dataviz-remove-serie");

// ============================================
// Default Color Palette
// ============================================

/** Default hex color palette for auto-assigned colors */
export const DEFAULT_COLOR_PALETTE: string[] = [
	"#6366f1", // Indigo (primary-like)
	"#8b5cf6", // Violet (secondary-like)
	"#22c55e", // Green (success)
	"#3b82f6", // Blue (info)
	"#f59e0b", // Amber (warning)
	"#ef4444", // Red (error)
	"#06b6d4", // Cyan
	"#ec4899", // Pink
	"#f97316", // Orange
	"#14b8a6", // Teal
	"#a855f7", // Purple
	"#84cc16" // Lime
];

// ============================================
// Translations
// ============================================

export const datavizTranslations = {
	en: {
		loading: "Loading data...",
		showMore: "Show more",
		showLess: "Show less",
		noDataTitle: "No data",
		noDataDescription: "There is no data to display",
		errorTitle: "Failed to load data",
		errorDescription: "An error occurred while loading the data",
		retry: "Retry"
	},
	it: {
		loading: "Caricamento dati...",
		showMore: "Mostra altro",
		showLess: "Mostra meno",
		noDataTitle: "Nessun dato",
		noDataDescription: "Non ci sono dati da visualizzare",
		errorTitle: "Caricamento dati fallito",
		errorDescription: "Si è verificato un errore durante il caricamento dei dati",
		retry: "Riprova"
	},
	de: {
		loading: "Daten werden geladen...",
		showMore: "Mehr anzeigen",
		showLess: "Weniger anzeigen",
		noDataTitle: "Keine Daten",
		noDataDescription: "Es sind keine Daten vorhanden",
		errorTitle: "Daten konnten nicht geladen werden",
		errorDescription: "Beim Laden der Daten ist ein Fehler aufgetreten",
		retry: "Erneut versuchen"
	},
	es: {
		loading: "Cargando datos...",
		showMore: "Mostrar más",
		showLess: "Mostrar menos",
		noDataTitle: "No hay datos",
		noDataDescription: "No hay datos para mostrar",
		errorTitle: "Error al cargar datos",
		errorDescription: "Se produjo un error al cargar los datos",
		retry: "Reintentar"
	}
} as const;

export type DatavizLocale = keyof typeof datavizTranslations;
