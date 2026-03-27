import type { LngLatBoundsLike, Map as MapLibreMap, ProjectionSpecification, StyleSpecification } from "maplibre-gl";
import type { InjectionKey, Ref, ShallowRef } from "vue";

// ── Injection Keys ──────────────────────────────────────────────────────────
export const MAP_INSTANCE: InjectionKey<ShallowRef<MapLibreMap | null>> = Symbol("map-instance");
export const MAP_IS_LOADED: InjectionKey<Ref<boolean>> = Symbol("map-is-loaded");

// ── Viewport ────────────────────────────────────────────────────────────────
export interface MapViewport {
	center: [number, number]
	zoom: number
	bearing: number
	pitch: number
}

// ── Map Provider Configs ────────────────────────────────────────────────────
export interface GoogleMapsProvider {
	provider: "google"
	apiKey: string
	mapType?: "roadmap" | "satellite" | "terrain" | "streetview"
	language?: string
	region?: string
	imageFormat?: "jpeg" | "png"
	scale?: "scaleFactor1x" | "scaleFactor2x" | "scaleFactor4x"
	highDpi?: boolean
	layerTypes?: ("layerRoadmap" | "layerStreetview" | "layerTraffic")[]
	overlay?: boolean
}

export type MapProviderConfig = GoogleMapsProvider;

export function isProviderConfig(style: MapStyleOption): style is MapProviderConfig {
	return typeof style === "object" && "provider" in style;
}

export function isGoogleProvider(config: MapProviderConfig): config is GoogleMapsProvider {
	return config.provider === "google";
}

// ── SMap Props ──────────────────────────────────────────────────────────────
export type MapStyleOption = string | StyleSpecification | MapProviderConfig;

export interface SMapProps {
	/** Center coordinates [longitude, latitude] */
	center?: [number, number]
	/** Zoom level */
	zoom?: number
	/** Bearing (rotation) in degrees */
	bearing?: number
	/** Pitch (tilt) in degrees */
	pitch?: number
	/** Map style URL, StyleSpecification object, or provider config */
	mapStyle?: MapStyleOption
	/** Map projection */
	projection?: ProjectionSpecification
	/** Locale for internal labels */
	locale?: MapLocale
	/** Constrain map to bounds [[sw_lng, sw_lat], [ne_lng, ne_lat]] */
	maxBounds?: LngLatBoundsLike
	/** Minimum zoom level (0-22) */
	minZoom?: number
	/** Maximum zoom level (0-22) */
	maxZoom?: number
	/** Enable/disable all map interactions */
	interactive?: boolean
}

// ── SMapMarker Props ────────────────────────────────────────────────────────
export interface SMapMarkerPopupOptions {
	offset?: number
	maxWidth?: string
	closeButton?: boolean
}

export interface SMapMarkerTooltipOptions {
	offset?: number
	maxWidth?: string
}

export type MarkerAnchor = "center" | "top" | "bottom" | "left" | "right" | "top-left" | "top-right" | "bottom-left" | "bottom-right";

export interface SMapMarkerProps {
	/** Longitude coordinate */
	longitude: number
	/** Latitude coordinate */
	latitude: number
	/** Whether the marker can be dragged */
	draggable?: boolean
	/** Pixel offset [x, y] */
	offset?: [number, number]
	/** Rotation in degrees */
	rotation?: number
	/** Rotation alignment */
	rotationAlignment?: "map" | "viewport" | "auto"
	/** Pitch alignment */
	pitchAlignment?: "map" | "viewport" | "auto"
	/** Popup configuration */
	popupOptions?: SMapMarkerPopupOptions
	/** Tooltip configuration */
	tooltipOptions?: SMapMarkerTooltipOptions
	/** Label position relative to marker */
	labelPosition?: "top" | "bottom"
	/** Default marker color (only applies when no default slot is used) */
	color?: string
	/** Marker anchor position */
	anchor?: MarkerAnchor
	/** Marker opacity (0 to 1) */
	opacity?: string
}

// ── SMapPopup Props ─────────────────────────────────────────────────────────
export interface SMapPopupProps {
	/** Longitude coordinate */
	longitude: number
	/** Latitude coordinate */
	latitude: number
	/** Show close button */
	closeButton?: boolean
	/** Popup offset in pixels */
	offset?: number
	/** Max width CSS value */
	maxWidth?: string
	/** Close popup when clicking outside it */
	closeOnClick?: boolean
	/** Close popup when map moves */
	closeOnMove?: boolean
}

// ── SMapControls Props ──────────────────────────────────────────────────────
export type MapControlPosition = "top-left" | "top-right" | "bottom-left" | "bottom-right";

export interface SMapControlsProps {
	/** Position of controls on the map */
	position?: MapControlPosition
	/** Show zoom buttons */
	showZoom?: boolean
	/** Show compass button */
	showCompass?: boolean
	/** Show locate button */
	showLocate?: boolean
	/** Show fullscreen button */
	showFullscreen?: boolean
}

// ── SMapRoute Props ─────────────────────────────────────────────────────────
export interface SMapRouteProps {
	/** Unique identifier for the route layer */
	id?: string
	/** Array of [longitude, latitude] coordinate pairs */
	coordinates: [number, number][]
	/** Line color */
	color?: string
	/** Line width in pixels */
	width?: number
	/** Line opacity (0 to 1) */
	opacity?: number
	/** Dash pattern [dash, gap] */
	dashArray?: [number, number]
	/** Whether the route is interactive */
	interactive?: boolean
	/** Whether the route is visible */
	visible?: boolean
	/** Line cap style */
	lineCap?: "butt" | "round" | "square"
	/** Line join style */
	lineJoin?: "bevel" | "round" | "miter"
	/** Auto-fit map bounds to route on mount */
	fitOnMount?: boolean
}

// ── SMapClusterLayer Props ──────────────────────────────────────────────────
export interface SMapClusterLayerProps {
	/** GeoJSON FeatureCollection or URL to fetch from */
	data: string | GeoJSON.FeatureCollection<GeoJSON.Point>
	/** Max zoom to cluster on */
	clusterMaxZoom?: number
	/** Cluster radius in pixels */
	clusterRadius?: number
	/** Colors for [small, medium, large] clusters */
	clusterColors?: [string, string, string]
	/** Point count thresholds [medium, large] */
	clusterThresholds?: [number, number]
	/** Color for unclustered points */
	pointColor?: string
	/** Circle radii for [small, medium, large] clusters */
	clusterSizes?: [number, number, number]
	/** Radius for unclustered points */
	pointRadius?: number
	/** Stroke width for unclustered points */
	pointStrokeWidth?: number
	/** Stroke color for unclustered points */
	pointStrokeColor?: string
	/** Whether the layer is visible */
	visible?: boolean
}

// ── SMapLayer Props ────────────────────────────────────────────────────────
export type MapLayerType = "fill" | "line" | "circle" | "symbol" | "heatmap" | "fill-extrusion";

export interface SMapLayerProps {
	/** Unique layer id */
	id?: string
	/** Layer type */
	type: MapLayerType
	/** GeoJSON data or source id reference */
	data: string | GeoJSON.GeoJSON
	/** MapLibre paint properties */
	paint?: Record<string, unknown>
	/** MapLibre layout properties */
	layout?: Record<string, unknown>
	/** Filter expression */
	filter?: unknown[]
	/** Min zoom for layer visibility */
	minZoom?: number
	/** Max zoom for layer visibility */
	maxZoom?: number
	/** Whether the layer is visible */
	visible?: boolean
	/** Insert layer before this layer id */
	beforeId?: string
	/** Whether the layer is interactive (cursor + events) */
	interactive?: boolean
}

// ── Default Style ───────────────────────────────────────────────────────────
export const DEFAULT_MAP_STYLE = "https://basemaps.cartocdn.com/gl/positron-gl-style/style.json";

// ── Translations ───────────────────────────────────────────────────────────
export const mapTranslations = {
	en: {
		loading: "Loading map...",
		mapError: "Failed to load map tiles",
		retry: "Retry"
	},
	it: {
		loading: "Caricamento mappa...",
		mapError: "Impossibile caricare i tile della mappa",
		retry: "Riprova"
	},
	de: {
		loading: "Karte wird geladen...",
		mapError: "Kartenkacheln konnten nicht geladen werden",
		retry: "Erneut versuchen"
	},
	es: {
		loading: "Cargando mapa...",
		mapError: "No se pudieron cargar los mosaicos del mapa",
		retry: "Reintentar"
	}
} as const;

export type MapLocale = keyof typeof mapTranslations;
