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
	import type { Map as MapLibreMap } from "maplibre-gl";
	import type { MapViewport, SMapProps } from "./types";
	import * as maplibregl from "maplibre-gl";
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
		locale: "en"
	});

	const emit = defineEmits<{
		ready: [map: MapLibreMap]
		viewportChange: [viewport: MapViewport]
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

	function getViewport(map: maplibregl.Map): MapViewport {
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
			container: containerRef.value,
			style: props.mapStyle,
			center: props.center,
			zoom: props.zoom,
			bearing: props.bearing,
			pitch: props.pitch,
			renderWorldCopies: false,
			attributionControl: {
				compact: true
			}
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
			emit("viewportChange", getViewport(map));
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
		map: mapInstance
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
