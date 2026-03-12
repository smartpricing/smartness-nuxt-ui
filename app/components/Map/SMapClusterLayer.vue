<template>
	<slot />
</template>

<script setup lang="ts">
	import type { GeoJSONSource, MapGeoJSONFeature, MapMouseEvent } from "maplibre-gl";
	import type { SMapClusterLayerProps } from "./types";
	import { inject, onUnmounted, watch } from "vue";
	import { MAP_INSTANCE, MAP_IS_LOADED } from "./types";

	const props = withDefaults(defineProps<SMapClusterLayerProps>(), {
		clusterMaxZoom: 14,
		clusterRadius: 50,
		clusterColors: () => ["#22c55e", "#eab308", "#ef4444"],
		clusterThresholds: () => [100, 750],
		pointColor: "#3b82f6"
	});

	const emit = defineEmits<{
		pointClick: [feature: GeoJSON.Feature<GeoJSON.Point>, coordinates: [number, number]]
		clusterClick: [clusterId: number, coordinates: [number, number], pointCount: number]
	}>();

	const mapInstance = inject(MAP_INSTANCE)!;
	const isLoaded = inject(MAP_IS_LOADED)!;

	const id = `cluster-${Math.random().toString(36).slice(2, 9)}`;
	const sourceId = `cluster-source-${id}`;
	const clusterLayerId = `clusters-${id}`;
	const clusterCountLayerId = `cluster-count-${id}`;
	const unclusteredLayerId = `unclustered-point-${id}`;

	let isAdded = false;

	function addLayers() {
		const map = mapInstance.value;
		if (!map || isAdded) return;

		map.addSource(sourceId, {
			type: "geojson",
			data: props.data,
			cluster: true,
			clusterMaxZoom: props.clusterMaxZoom,
			clusterRadius: props.clusterRadius
		});

		map.addLayer({
			id: clusterLayerId,
			type: "circle",
			source: sourceId,
			filter: ["has", "point_count"],
			paint: {
				"circle-color": [
					"step",
					["get", "point_count"],
					props.clusterColors[0],
					props.clusterThresholds[0],
					props.clusterColors[1],
					props.clusterThresholds[1],
					props.clusterColors[2]
				],
				"circle-radius": [
					"step",
					["get", "point_count"],
					20,
					props.clusterThresholds[0],
					30,
					props.clusterThresholds[1],
					40
				],
				"circle-stroke-width": 1,
				"circle-stroke-color": "#fff",
				"circle-opacity": 0.85
			}
		});

		map.addLayer({
			id: clusterCountLayerId,
			type: "symbol",
			source: sourceId,
			filter: ["has", "point_count"],
			layout: {
				"text-field": "{point_count_abbreviated}",
				"text-size": 12
			},
			paint: {
				"text-color": "#fff"
			}
		});

		map.addLayer({
			id: unclusteredLayerId,
			type: "circle",
			source: sourceId,
			filter: ["!", ["has", "point_count"]],
			paint: {
				"circle-color": props.pointColor,
				"circle-radius": 5,
				"circle-stroke-width": 2,
				"circle-stroke-color": "#fff"
			}
		});

		// Event handlers
		map.on("click", clusterLayerId, handleClusterClick);
		map.on("click", unclusteredLayerId, handlePointClick);
		map.on("mouseenter", clusterLayerId, handleCursorPointer);
		map.on("mouseleave", clusterLayerId, handleCursorDefault);
		map.on("mouseenter", unclusteredLayerId, handleCursorPointer);
		map.on("mouseleave", unclusteredLayerId, handleCursorDefault);

		isAdded = true;
	}

	function removeLayers() {
		const map = mapInstance.value;
		if (!map || !isAdded) return;

		try {
			map.off("click", clusterLayerId, handleClusterClick);
			map.off("click", unclusteredLayerId, handlePointClick);
			map.off("mouseenter", clusterLayerId, handleCursorPointer);
			map.off("mouseleave", clusterLayerId, handleCursorDefault);
			map.off("mouseenter", unclusteredLayerId, handleCursorPointer);
			map.off("mouseleave", unclusteredLayerId, handleCursorDefault);
			if (map.getLayer(clusterCountLayerId)) map.removeLayer(clusterCountLayerId);
			if (map.getLayer(unclusteredLayerId)) map.removeLayer(unclusteredLayerId);
			if (map.getLayer(clusterLayerId)) map.removeLayer(clusterLayerId);
			if (map.getSource(sourceId)) map.removeSource(sourceId);
		} catch {
		// ignore cleanup errors
		}

		isAdded = false;
	}

	async function handleClusterClick(e: MapMouseEvent & { features?: MapGeoJSONFeature[] }) {
		const map = mapInstance.value;
		if (!map) return;

		const features = map.queryRenderedFeatures(e.point, { layers: [clusterLayerId] });
		if (!features.length) return;

		const feature = features[0];
		const clusterId = feature?.properties?.cluster_id as number;
		const pointCount = feature?.properties?.point_count as number;
		const coordinates = (feature?.geometry as GeoJSON.Point)?.coordinates as [number, number];

		if (emit) {
			emit("clusterClick", clusterId, coordinates, pointCount);
		}

		// Default behavior: zoom to cluster expansion
		const source = map.getSource(sourceId) as GeoJSONSource;
		const zoom = await source.getClusterExpansionZoom(clusterId);
		map.easeTo({ center: coordinates, zoom });
	}

	function handlePointClick(e: MapMouseEvent & { features?: MapGeoJSONFeature[] }) {
		if (!e.features?.length) return;

		const feature = e.features[0];
		const coordinates = (feature?.geometry as GeoJSON.Point)?.coordinates.slice() as [number, number];

		// Handle world copies
		while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
			coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
		}

		emit("pointClick", feature as unknown as GeoJSON.Feature<GeoJSON.Point>, coordinates);
	}

	function handleCursorPointer() {
		if (mapInstance.value) {
			mapInstance.value.getCanvas().style.cursor = "pointer";
		}
	}

	function handleCursorDefault() {
		if (mapInstance.value) {
			mapInstance.value.getCanvas().style.cursor = "";
		}
	}

	// Add layers when map is loaded
	watch(isLoaded, (loaded) => {
		if (loaded) addLayers();
	}, { immediate: true });

	// Update data
	watch(() => props.data, (data) => {
		const map = mapInstance.value;
		if (!map || !isAdded || typeof data === "string") return;

		const source = map.getSource(sourceId) as GeoJSONSource;
		if (source) {
			source.setData(data);
		}
	});

	// Update style props
	watch([() => props.clusterColors, () => props.clusterThresholds, () => props.pointColor], ([colors, thresholds, ptColor]) => {
		const map = mapInstance.value;
		if (!map || !isAdded) return;

		if (map.getLayer(clusterLayerId)) {
			map.setPaintProperty(clusterLayerId, "circle-color", [
				"step",
				["get", "point_count"],
				colors[0],
				thresholds[0],
				colors[1],
				thresholds[1],
				colors[2]
			]);
			map.setPaintProperty(clusterLayerId, "circle-radius", [
				"step",
				["get", "point_count"],
				20,
				thresholds[0],
				30,
				thresholds[1],
				40
			]);
		}

		if (map.getLayer(unclusteredLayerId)) {
			map.setPaintProperty(unclusteredLayerId, "circle-color", ptColor);
		}
	});

	onUnmounted(() => {
		removeLayers();
	});
</script>
