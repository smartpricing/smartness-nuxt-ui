<template>
	<div
		ref="containerRef"
		class="relative w-full h-full"
	>
		<div
			v-if="!isLoaded"
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
		<slot v-if="mapInstance" />
	</div>
</template>

<script setup lang="ts">
	import type { EaseToOptions, FitBoundsOptions, FlyToOptions, LngLatBoundsLike, Map as MapLibreMap } from "maplibre-gl";
	import type { MapViewport, SMapProps } from "./types";
	import maplibregl from "maplibre-gl";
	import { onMounted, onUnmounted, provide, ref, shallowRef, watch } from "vue";
	import { DEFAULT_MAP_STYLE, MAP_INSTANCE, MAP_IS_LOADED, mapTranslations } from "./types";
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
		"update:center": [center: [number, number]]
		"update:zoom": [zoom: number]
		"update:bearing": [bearing: number]
		"update:pitch": [pitch: number]
	}>();

	const t = computed(() => mapTranslations[props.locale]);

	const containerRef = ref<HTMLDivElement | null>(null);
	const mapInstance = shallowRef<MapLibreMap | null>(null);
	const isLoaded = ref(false);
	const isStyleLoaded = ref(false);
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

	onMounted(() => {
		if (!containerRef.value) return;

		const map = new maplibregl.Map({
			container: containerRef.value as HTMLDivElement,
			style: props.mapStyle,
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
	});

	// Watch for style changes
	watch(() => props.mapStyle, (newStyle) => {
		if (!mapInstance.value) return;
		clearStyleTimeout();
		isStyleLoaded.value = false;
		mapInstance.value.setStyle(newStyle, { diff: true });
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
</style>
