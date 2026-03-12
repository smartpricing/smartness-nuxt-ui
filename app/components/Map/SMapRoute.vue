<template>
	<slot />
</template>

<script setup lang="ts">
	import type { GeoJSONSource, LngLatLike } from "maplibre-gl";
	import type { SMapRouteProps } from "./types";
	import { LngLatBounds } from "maplibre-gl";
	import { inject, onUnmounted, watch } from "vue";
	import { MAP_INSTANCE, MAP_IS_LOADED } from "./types";

	const props = withDefaults(defineProps<SMapRouteProps>(), {
		id: () => `route-${Math.random().toString(36).slice(2, 9)}`,
		color: "#4285F4",
		width: 3,
		opacity: 0.8,
		dashArray: undefined,
		interactive: true,
		visible: true,
		lineCap: "round",
		lineJoin: "round",
		fitOnMount: false
	});

	const emit = defineEmits<{
		click: []
		mouseenter: []
		mouseleave: []
	}>();

	const mapInstance = inject(MAP_INSTANCE)!;
	const isLoaded = inject(MAP_IS_LOADED)!;

	const sourceId = computed(() => `route-source-${props.id}`);
	const layerId = computed(() => `route-layer-${props.id}`);

	let isAdded = false;

	function addLayer() {
		const map = mapInstance.value;
		if (!map || isAdded) return;

		map.addSource(sourceId.value, {
			type: "geojson",
			data: {
				type: "Feature",
				properties: {},
				geometry: { type: "LineString", coordinates: props.coordinates }
			}
		});

		const paint: Record<string, unknown> = {
			"line-color": props.color,
			"line-width": props.width,
			"line-opacity": props.opacity
		};
		if (props.dashArray) {
			paint["line-dasharray"] = props.dashArray;
		}

		map.addLayer({
			id: layerId.value,
			type: "line",
			source: sourceId.value,
			layout: {
				"line-join": props.lineJoin,
				"line-cap": props.lineCap,
				visibility: props.visible ? "visible" : "none"
			},
			paint
		});

		if (props.interactive) {
			map.on("click", layerId.value, handleClick);
			map.on("mouseenter", layerId.value, handleMouseEnter);
			map.on("mouseleave", layerId.value, handleMouseLeave);
		}

		// Auto-fit bounds to route
		if (props.fitOnMount && props.coordinates.length >= 2) {
			const bounds = props.coordinates.reduce(
				(b, coord) => b.extend(coord as LngLatLike),
				new LngLatBounds(props.coordinates[0], props.coordinates[0])
			);
			map.fitBounds(bounds, { padding: 50 });
		}

		isAdded = true;
	}

	function removeLayer() {
		const map = mapInstance.value;
		if (!map || !isAdded) return;

		try {
			map.off("click", layerId.value, handleClick);
			map.off("mouseenter", layerId.value, handleMouseEnter);
			map.off("mouseleave", layerId.value, handleMouseLeave);
			if (map.getLayer(layerId.value)) map.removeLayer(layerId.value);
			if (map.getSource(sourceId.value)) map.removeSource(sourceId.value);
		} catch {
		// ignore cleanup errors
		}

		isAdded = false;
	}

	function handleClick() {
		emit("click");
	}

	function handleMouseEnter() {
		if (mapInstance.value) {
			mapInstance.value.getCanvas().style.cursor = "pointer";
		}
		emit("mouseenter");
	}

	function handleMouseLeave() {
		if (mapInstance.value) {
			mapInstance.value.getCanvas().style.cursor = "";
		}
		emit("mouseleave");
	}

	// Add layer when map is loaded
	watch(isLoaded, (loaded) => {
		if (loaded) addLayer();
	}, { immediate: true });

	// Update coordinates
	watch(() => props.coordinates, (coords) => {
		const map = mapInstance.value;
		if (!map || !isAdded || coords.length < 2) return;

		const source = map.getSource(sourceId.value) as GeoJSONSource;
		if (source) {
			source.setData({
				type: "Feature",
				properties: {},
				geometry: { type: "LineString", coordinates: coords }
			});
		}
	});

	// Update paint properties
	watch([() => props.color, () => props.width, () => props.opacity, () => props.dashArray], ([color, width, opacity, dashArray]) => {
		const map = mapInstance.value;
		if (!map || !isAdded || !map.getLayer(layerId.value)) return;

		map.setPaintProperty(layerId.value, "line-color", color);
		map.setPaintProperty(layerId.value, "line-width", width);
		map.setPaintProperty(layerId.value, "line-opacity", opacity);
		if (dashArray) {
			map.setPaintProperty(layerId.value, "line-dasharray", dashArray);
		}
	});

	// Watch visibility
	watch(() => props.visible, (visible) => {
		const map = mapInstance.value;
		if (!map || !isAdded || !map.getLayer(layerId.value)) return;
		map.setLayoutProperty(layerId.value, "visibility", visible ? "visible" : "none");
	});

	// Watch lineCap/lineJoin
	watch([() => props.lineCap, () => props.lineJoin], ([cap, join]) => {
		const map = mapInstance.value;
		if (!map || !isAdded || !map.getLayer(layerId.value)) return;
		map.setLayoutProperty(layerId.value, "line-cap", cap);
		map.setLayoutProperty(layerId.value, "line-join", join);
	});

	onUnmounted(() => {
		removeLayer();
	});
</script>
