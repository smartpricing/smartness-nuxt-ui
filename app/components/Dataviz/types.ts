import type * as echarts from "echarts";
import type { InjectionKey } from "vue";

// Chart initialization options
export type DatavizInitOptions = Omit<echarts.EChartsInitOpts, "width" | "height">;

// Chart configuration options
export interface DatavizOptions {
	xAxis?: echarts.XAXisComponentOption
	yAxis?: echarts.YAXisComponentOption
	dataZoom?: echarts.DataZoomComponentOption | echarts.DataZoomComponentOption[]
	grid?: echarts.GridComponentOption
	legend?: {
		show: boolean
	}
	tooltip?: Pick<echarts.TooltipComponentOption, "show" | "trigger" | "showDelay" | "hideDelay" | "position">
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
	y: number
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
// Serie Option Types (internal chart updates)
// ============================================

export type DatavizSerieOption = {
	id: string
	name?: string
	active?: boolean
} & (
	| {
		type: "line"
		data: (number | string)[][]
		/** Any valid CSS color string */
		color?: string
		smooth?: boolean
		markArea?: echarts.MarkAreaComponentOption
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
		markArea?: echarts.MarkAreaComponentOption
		itemStyle?: Record<string, unknown>
		yAxisIndex?: number
		xAxisIndex?: number
	}
	| {
		type: "custom"
		data: [number | string, number, number][]
		/** Any valid CSS color string */
		color?: string
		clip: boolean
		renderItem: (params: unknown, api: unknown) => unknown
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
		data: (number | string)[][]
		/** Any valid CSS color string */
		color?: string
		symbolSize?: number | ((val: (number | string)[]) => number)
		itemStyle?: Record<string, unknown>
		yAxisIndex?: number
		xAxisIndex?: number
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
		loading: "Loading...",
		showMore: "Show more",
		showLess: "Show less"
	},
	it: {
		loading: "Caricamento...",
		showMore: "Mostra altro",
		showLess: "Mostra meno"
	},
	de: {
		loading: "Laden...",
		showMore: "Mehr anzeigen",
		showLess: "Weniger anzeigen"
	},
	es: {
		loading: "Cargando...",
		showMore: "Mostrar más",
		showLess: "Mostrar menos"
	}
} as const;

export type DatavizLocale = keyof typeof datavizTranslations;
