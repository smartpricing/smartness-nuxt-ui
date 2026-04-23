<template>
	<div
		ref="containerRef"
		class="relative w-full h-full"
		:class="{ 'smap-space': isGlobe }"
	>
		<!-- Loading state -->
		<div
			v-if="!isLoaded && !providerError"
			class="absolute inset-0 flex items-center justify-center bg-inherit"
		>
			<div style="width: 200px;">
				<p class="text-sm font-medium text-center">
					{{ t.loading }}
				</p>
				<UProgress
					size="md"
					color="secondary"
					:model-value="null"
				/>
			</div>
		</div>

		<!-- Provider error state -->
		<div
			v-if="providerError"
			class="absolute inset-0 z-10 flex items-center justify-center bg-inherit"
		>
			<div class="text-center space-y-2">
				<UIcon
					name="ph:warning-circle"
					class="size-8 text-error-500 mx-auto"
				/>
				<p class="text-sm font-medium">
					{{ t.mapError }}
				</p>
				<UButton
					size="xs"
					variant="outline"
					icon="ph:arrows-clockwise"
					:label="t.retry"
					@click="retryProvider"
				/>
			</div>
		</div>

		<slot v-if="mapInstance" />
	</div>
</template>

<script setup lang="ts">
	import type { EaseToOptions, FitBoundsOptions, FlyToOptions, LngLatBoundsLike, Map as MapLibreMap, StyleSpecification } from "maplibre-gl";
	import type { CacheStore } from "../../utils/cache";
	import type { GoogleMapsProvider, MapProviderConfig, MapViewport, SMapProps } from "./types";
	import { useLocalStorage } from "@vueuse/core";
	import maplibregl from "maplibre-gl";
	import { onMounted, onUnmounted, provide, ref, shallowRef, watch } from "vue";
	import { purgeExpired } from "../../utils/cache";
	import { hashObject } from "../../utils/crypto";
	import { DEFAULT_MAP_STYLE, isProviderConfig, MAP_INSTANCE, MAP_IS_LOADED, mapTranslations } from "./types";
	import "maplibre-gl/dist/maplibre-gl.css";

	const props = withDefaults(defineProps<SMapProps>(), {
		center: () => [0, 0],
		zoom: 1,
		bearing: 0,
		pitch: 0,
		mapStyle: DEFAULT_MAP_STYLE,
		projection: undefined,
		locale: "en",
		maxBounds: undefined,
		minZoom: undefined,
		maxZoom: undefined,
		interactive: true
	});

	const emit = defineEmits<{
		ready: [map: MapLibreMap]
		viewportChange: [viewport: MapViewport]
		error: [error: string]
		"update:center": [center: [number, number]]
		"update:zoom": [zoom: number]
		"update:bearing": [bearing: number]
		"update:pitch": [pitch: number]
	}>();

	const GOOGLE_SESSION_STORAGE_KEY = "gmaps_tile_sessions";

	const t = computed(() => mapTranslations[props.locale]);
	const isGlobe = computed(() => props.projection?.type === "globe");

	const GLOBE_SKY: Parameters<MapLibreMap["setSky"]>[0] = {
		"sky-color": "#0b1a3a",
		"sky-horizon-blend": 0.6,
		"horizon-color": "#6aa8ff",
		"horizon-fog-blend": 0.6,
		"fog-color": "#0b1a3a",
		"atmosphere-blend": [
			"interpolate",
			["linear"],
			["zoom"],
			0,
			1,
			4,
			1,
			7,
			0
		]
	};

	function applySkyForProjection(map: MapLibreMap) {
		if (props.projection?.type === "globe") {
			map.setSky(GLOBE_SKY);
		} else {
			map.setSky(undefined);
		}
	}

	const containerRef = ref<HTMLDivElement | null>(null);
	const mapInstance = shallowRef<MapLibreMap | null>(null);
	const isLoaded = ref(false);
	const isStyleLoaded = ref(false);
	const providerError = ref<string | null>(null);
	const isReady = computed(() => isLoaded.value && isStyleLoaded.value);

	provide(MAP_INSTANCE, mapInstance);
	provide(MAP_IS_LOADED, isReady);

	let styleTimeout: ReturnType<typeof setTimeout> | null = null;

	function clearStyleTimeout() {
		if (styleTimeout) {
			clearTimeout(styleTimeout);
			styleTimeout = null;
		}
	}

	function getViewport(map: MapLibreMap): MapViewport {
		const center = map.getCenter();
		return {
			center: [center.lng, center.lat],
			zoom: map.getZoom(),
			bearing: map.getBearing(),
			pitch: map.getPitch()
		};
	}

	// ── Google Maps Provider ────────────────────────────────────────────────

	const googleSessionCache = useLocalStorage<CacheStore<string>>(GOOGLE_SESSION_STORAGE_KEY, {});

	async function resolveGoogleSession(config: GoogleMapsProvider): Promise<string> {
		const { apiKey, provider: _, ...mapOptions } = config;

		if (!apiKey || !apiKey.trim()) {
			throw new Error("Google Maps API key is required");
		}

		const sessionOptions = {
			mapType: mapOptions.mapType ?? "roadmap",
			language: mapOptions.language ?? props.locale ?? "en",
			region: mapOptions.region ?? (new Intl.Locale(navigator.language).region) ?? "US",
			...(mapOptions.imageFormat && { imageFormat: mapOptions.imageFormat }),
			...(mapOptions.scale && { scale: mapOptions.scale }),
			...(mapOptions.highDpi !== undefined && { highDpi: mapOptions.highDpi }),
			...(mapOptions.layerTypes && { layerTypes: mapOptions.layerTypes }),
			...(mapOptions.overlay !== undefined && { overlay: mapOptions.overlay })
		};

		const optionsHash = await hashObject({ apiKey, ...sessionOptions });
		googleSessionCache.value = purgeExpired(googleSessionCache.value);

		const cached = googleSessionCache.value[optionsHash];
		if (cached) return cached.value;

		const response = await fetch(
			`https://tile.googleapis.com/v1/createSession?key=${apiKey}`,
			{
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(sessionOptions)
			}
		);

		if (!response.ok) {
			throw new Error(`Google Maps session request failed: ${response.status} ${response.statusText}`);
		}

		const data = await response.json() as { session: string, expiry: string };

		googleSessionCache.value = {
			...googleSessionCache.value,
			[optionsHash]: {
				value: data.session,
				expiry: Number(data.expiry)
			}
		};

		return data.session;
	}

	function createGoogleStyle(apiKey: string, session: string): StyleSpecification {
		return {
			version: 8,
			sources: {
				"google-tiles": {
					type: "raster",
					tiles: [`https://tile.googleapis.com/v1/2dtiles/{z}/{x}/{y}?session=${session}&key=${apiKey}`],
					tileSize: 256,
					attribution: "&copy; Google Maps",
					maxzoom: 19
				}
			},
			layers: [
				{
					id: "google-tiles",
					type: "raster",
					source: "google-tiles"
				}
			]
		};
	}

	// ── Provider Resolution ─────────────────────────────────────────────────

	async function resolveProviderStyle(config: MapProviderConfig): Promise<StyleSpecification> {
		switch (config.provider) {
		case "google": {
			const session = await resolveGoogleSession(config);
			return createGoogleStyle(config.apiKey, session);
		}
		default:
			throw new Error(`Unknown map provider: ${(config as { provider: string }).provider}`);
		}
	}

	// ── Map Initialization ──────────────────────────────────────────────────

	function initMap(style: string | StyleSpecification) {
		if (!containerRef.value) return;

		const map = new maplibregl.Map({
			container: containerRef.value,
			style,
			center: props.center,
			zoom: props.zoom,
			bearing: props.bearing,
			pitch: props.pitch,
			renderWorldCopies: false,
			attributionControl: {
				compact: true
			},
			maxBounds: props.maxBounds,
			minZoom: props.minZoom,
			maxZoom: props.maxZoom,
			interactive: props.interactive
		});

		map.on("load", () => {
			if (props.projection) {
				map.setProjection(props.projection);
			}
			applySkyForProjection(map);
			isLoaded.value = true;
			emit("ready", map);
		});

		map.on("styledata", () => {
			clearStyleTimeout();
			styleTimeout = setTimeout(() => {
				isStyleLoaded.value = true;
				if (props.projection) {
					map.setProjection(props.projection);
				}
				applySkyForProjection(map);
			}, 100);
		});

		map.on("move", () => {
			const viewport = getViewport(map);
			emit("viewportChange", viewport);
			emit("update:center", viewport.center);
			emit("update:zoom", viewport.zoom);
			emit("update:bearing", viewport.bearing);
			emit("update:pitch", viewport.pitch);
		});

		mapInstance.value = map;
	}

	async function mountMap() {
		providerError.value = null;

		if (isProviderConfig(props.mapStyle)) {
			try {
				const style = await resolveProviderStyle(props.mapStyle);
				initMap(style);
			} catch (err) {
				const message = err instanceof Error ? err.message : "Unknown provider error";
				providerError.value = message;
				emit("error", message);
			}
		} else {
			initMap(props.mapStyle);
		}
	}

	function retryProvider() {
		providerError.value = null;
		mountMap();
	}

	onMounted(() => {
		mountMap();
	});

	// Watch for style changes
	watch(() => props.mapStyle, async (newStyle) => {
		if (isProviderConfig(newStyle)) {
			if (mapInstance.value) {
				mapInstance.value.remove();
				mapInstance.value = null;
			}
			isLoaded.value = false;
			isStyleLoaded.value = false;
			providerError.value = null;

			try {
				const style = await resolveProviderStyle(newStyle);
				initMap(style);
			} catch (err) {
				const message = err instanceof Error ? err.message : "Unknown provider error";
				providerError.value = message;
				emit("error", message);
			}
		} else {
			if (providerError.value) {
				providerError.value = null;
				initMap(newStyle);
			} else if (mapInstance.value) {
				clearStyleTimeout();
				isStyleLoaded.value = false;
				mapInstance.value.setStyle(newStyle, { diff: true });
			}
		}
	});

	// Watch inbound v-model changes
	watch(() => props.center, (c) => {
		const map = mapInstance.value;
		if (!map) return;
		const cur = map.getCenter();
		if (cur.lng !== c[0] || cur.lat !== c[1]) {
			map.setCenter(c);
		}
	});

	watch(() => props.zoom, (z) => {
		const map = mapInstance.value;
		if (!map || map.getZoom() === z) return;
		map.setZoom(z);
	});

	watch(() => props.bearing, (b) => {
		const map = mapInstance.value;
		if (!map || map.getBearing() === b) return;
		map.setBearing(b);
	});

	watch(() => props.pitch, (p) => {
		const map = mapInstance.value;
		if (!map || map.getPitch() === p) return;
		map.setPitch(p);
	});

	watch(() => props.projection, (projection) => {
		const map = mapInstance.value;
		if (!map) return;
		if (projection) {
			map.setProjection(projection);
		}
		applySkyForProjection(map);
	}, { deep: true });

	// Watch constraint props
	watch(() => props.maxBounds, (bounds) => mapInstance.value?.setMaxBounds(bounds ?? null));
	watch(() => props.minZoom, (z) => mapInstance.value?.setMinZoom(z ?? null));
	watch(() => props.maxZoom, (z) => mapInstance.value?.setMaxZoom(z ?? null));

	onUnmounted(() => {
		clearStyleTimeout();
		if (mapInstance.value) {
			mapInstance.value.remove();
			mapInstance.value = null;
		}
		isLoaded.value = false;
		isStyleLoaded.value = false;
	});

	defineExpose({
		map: mapInstance,
		flyTo: (opts: FlyToOptions) => mapInstance.value?.flyTo(opts),
		easeTo: (opts: EaseToOptions) => mapInstance.value?.easeTo(opts),
		fitBounds: (bounds: LngLatBoundsLike, opts?: FitBoundsOptions) => mapInstance.value?.fitBounds(bounds, opts)
	});
</script>

<style>
	.maplibregl-popup-content {
		background: none;
		box-shadow: none;
		padding: 0;
		border-radius: 0;
	}

	.maplibregl-popup-tip {
		display: none;
	}

	.smap-space {
		background-color: #02040c;
		background-image:
			radial-gradient(ellipse at center, rgba(40, 80, 160, 0.18) 0%, rgba(2, 4, 12, 0) 65%),
			radial-gradient(1px 1px at 13% 22%, rgba(255, 255, 255, 0.9), transparent 60%),
			radial-gradient(1px 1px at 47% 71%, rgba(255, 255, 255, 0.8), transparent 60%),
			radial-gradient(1px 1px at 82% 14%, rgba(220, 230, 255, 0.9), transparent 60%),
			radial-gradient(1px 1px at 91% 58%, rgba(255, 255, 255, 0.95), transparent 60%),
			radial-gradient(1.4px 1.4px at 33% 85%, rgba(255, 255, 255, 1), transparent 60%),
			radial-gradient(1px 1px at 65% 38%, rgba(200, 210, 230, 0.85), transparent 60%),
			radial-gradient(1px 1px at 8% 78%, rgba(255, 255, 255, 0.8), transparent 60%),
			radial-gradient(1px 1px at 74% 88%, rgba(230, 235, 255, 0.8), transparent 60%),
			radial-gradient(1.2px 1.2px at 55% 12%, rgba(255, 255, 255, 0.9), transparent 60%);
		background-repeat: no-repeat, repeat, repeat, repeat, repeat, repeat, repeat, repeat, repeat, repeat;
		background-size:
			100% 100%,
			210px 210px,
			290px 290px,
			260px 260px,
			180px 180px,
			230px 230px,
			250px 250px,
			300px 300px,
			270px 270px,
			240px 240px;
	}

	.smap-space .maplibregl-canvas {
		filter: drop-shadow(0 0 18px rgba(120, 170, 255, 0.35)) drop-shadow(0 0 40px rgba(70, 120, 220, 0.2));
	}
</style>
