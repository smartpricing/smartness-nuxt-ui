import type * as echarts from "echarts";
import type { InjectionKey } from "vue";

// Chart initialization options
export type DatavizInitOptions = Omit<echarts.EChartsInitOpts, "width" | "height" | "locale">;

// Animation configuration options
export interface DatavizAnimationOptions {
	/** Enable or disable animation */
	enabled?: boolean
	/** Animation duration in milliseconds */
	duration?: number
	/** Animation easing function */
	easing?: "linear" | "quadraticIn" | "quadraticOut" | "quadraticInOut" | "cubicIn" | "cubicOut" | "cubicInOut" | "quarticIn" | "quarticOut" | "quarticInOut" | "quinticIn" | "quinticOut" | "quinticInOut" | "sinusoidalIn" | "sinusoidalOut" | "sinusoidalInOut" | "exponentialIn" | "exponentialOut" | "exponentialInOut" | "circularIn" | "circularOut" | "circularInOut" | "elasticIn" | "elasticOut" | "elasticInOut" | "backIn" | "backOut" | "backInOut" | "bounceIn" | "bounceOut" | "bounceInOut"
	/** Delay before animation starts in milliseconds */
	delay?: number
	/** Animation threshold - only animate when data count is below this number */
	threshold?: number
}

// Chart configuration options
export interface DatavizOptions {
	xAxis?: echarts.XAXisComponentOption
	yAxis?: echarts.YAXisComponentOption
	dataZoom?: echarts.DataZoomComponentOption | echarts.DataZoomComponentOption[]
	grid?: echarts.GridComponentOption
	legend?: echarts.LegendComponentOption
	tooltip?: Pick<echarts.TooltipComponentOption, "show" | "trigger" | "showDelay" | "hideDelay" | "position">
	/** VisualMap for data-driven color/size mapping */
	visualMap?: echarts.VisualMapComponentOption | echarts.VisualMapComponentOption[]
	/** Toolbox for built-in tools (save image, zoom, reset) */
	toolbox?: {
		show?: boolean
		feature?: {
			saveAsImage?: boolean | { name?: string, type?: "png" | "jpeg" }
			dataZoom?: boolean
			restore?: boolean
			dataView?: boolean
		}
	}
	/** Polar coordinate system */
	polar?: echarts.PolarComponentOption
	/** Radius axis for polar charts */
	radiusAxis?: echarts.RadiusAxisComponentOption
	/** Angle axis for polar charts */
	angleAxis?: echarts.AngleAxisComponentOption
}

// Action button configuration
export interface DatavizAction {
	label: string
	icon?: string
	onClick: () => void
}

// Internal series state
export interface DatavizSerieState {
	id: string
	name?: string
	active: boolean
	type: "line" | "bar" | "custom" | "pie" | "funnel" | "scatter"
	color?: string
	parentId?: string
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
	min: number
	max: number
}

/** Data point for pie and funnel charts - each point can have its own color */
export interface PieDataPoint {
	/** Display name for the slice */
	name: string
	/** Numeric value */
	value: number
	/** Optional unique identifier */
	id?: string
	/** Optional color - any valid CSS color (hex, rgb, hsl, etc.) */
	color?: string
	/** Whether this slice is active/selected */
	active?: boolean
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
	/** Color used for this data point */
	color?: string
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
} & (
	| {
		type: "line"
		data: (number | string | null)[][]
		/** Any valid CSS color string */
		color?: string
		smooth?: boolean
		markArea?: echarts.MarkAreaComponentOption
		/** Mark specific points on the chart */
		markPoint?: echarts.MarkPointComponentOption
		/** Mark reference lines on the chart */
		markLine?: echarts.MarkLineComponentOption
		showSymbol?: boolean
		lineStyle?: Record<string, unknown>
		yAxisIndex?: number
		xAxisIndex?: number
		step?: "start" | "middle" | "end" | boolean
		/** Coordinate system for the series */
		coordinateSystem?: "cartesian2d" | "polar"
	}
	| {
		type: "bar"
		data: [number | string, number][]
		/** Any valid CSS color string */
		color?: string
		markArea?: echarts.MarkAreaComponentOption
		/** Mark specific points on the chart */
		markPoint?: echarts.MarkPointComponentOption
		/** Mark reference lines on the chart */
		markLine?: echarts.MarkLineComponentOption
		itemStyle?: Record<string, unknown>
		yAxisIndex?: number
		xAxisIndex?: number
		/** Coordinate system for the series */
		coordinateSystem?: "cartesian2d" | "polar"
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
	}
	| {
		type: "custom"
		data: [number | string, number, number][]
		/** Any valid CSS color string */
		color?: string
		clip: boolean
		/** Custom render function - accepts ECharts CustomSeriesRenderItemParams and CustomSeriesRenderItemAPI */
		renderItem: echarts.CustomSeriesOption["renderItem"]
		yAxisIndex?: number
		xAxisIndex?: number
	}
	| {
		type: "pie"
		/** Each data point has its own color */
		data: { name: string, value: number, color?: string, id: string, active?: boolean }[]
	}
	| {
		type: "funnel"
		/** Each data point has its own color */
		data: { name: string, value: number, color?: string, id: string, active?: boolean }[]
	}
	| {
		type: "scatter"
		data: (number | string | null)[][]
		/** Any valid CSS color string */
		color?: string
		symbolSize?: number | ((val: (number | string)[]) => number)
		itemStyle?: Record<string, unknown>
		/** Mark specific points on the chart */
		markPoint?: echarts.MarkPointComponentOption
		/** Mark reference lines on the chart */
		markLine?: echarts.MarkLineComponentOption
		yAxisIndex?: number
		xAxisIndex?: number
		/** Coordinate system for the series */
		coordinateSystem?: "cartesian2d" | "polar"
	}
);

// ============================================
// Injection Keys
// ============================================

export const DATAVIZ_UPSERT_SERIE: InjectionKey<(serie: DatavizSerieOption) => void> = Symbol("dataviz-upsert-serie");
export const DATAVIZ_REMOVE_SERIE: InjectionKey<(serieId: string) => void> = Symbol("dataviz-remove-serie");

// ============================================
// Default Color Palette (hex colors for ECharts compatibility)
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
