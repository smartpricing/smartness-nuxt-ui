import type { Map as MapLibreMap, ProjectionSpecification, StyleSpecification } from "maplibre-gl";
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

// ── SMap Props ──────────────────────────────────────────────────────────────
export type MapStyleOption = string | StyleSpecification;

export interface SMapProps {
	/** Center coordinates [longitude, latitude] */
	center?: [number, number]
	/** Zoom level */
	zoom?: number
	/** Bearing (rotation) in degrees */
	bearing?: number
	/** Pitch (tilt) in degrees */
	pitch?: number
	/** Map style URL or StyleSpecification object */
	mapStyle?: MapStyleOption
	/** Map projection */
	projection?: ProjectionSpecification
	/** Locale for internal labels */
	locale?: MapLocale
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
}

// ── Default Style ───────────────────────────────────────────────────────────
export const DEFAULT_MAP_STYLE = "https://basemaps.cartocdn.com/gl/positron-gl-style/style.json";

// ── Translations ───────────────────────────────────────────────────────────
export const mapTranslations = {
	en: {
		loading: "Loading map..."
	},
	it: {
		loading: "Caricamento mappa..."
	},
	de: {
		loading: "Karte wird geladen..."
	},
	es: {
		loading: "Cargando mapa..."
	}
} as const;

export type MapLocale = keyof typeof mapTranslations;
