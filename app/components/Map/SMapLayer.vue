<template>
	<slot />
</template>

<script setup lang="ts">
	import type { GeoJSONSource, MapGeoJSONFeature, MapMouseEvent } from "maplibre-gl";
	import type { SMapLayerProps } from "./types";
	import { inject, onUnmounted, watch } from "vue";
	import { MAP_INSTANCE, MAP_IS_LOADED } from "./types";

	const props = withDefaults(defineProps<SMapLayerProps>(), {
		id: () => `layer-${Math.random().toString(36).slice(2, 9)}`,
		paint: () => ({}),
		layout: () => ({}),
		filter: undefined,
		minZoom: undefined,
		maxZoom: undefined,
		visible: true,
		beforeId: undefined,
		interactive: true
	});

	const emit = defineEmits<{
		click: [feature: GeoJSON.Feature, coordinates: [number, number], event: MapMouseEvent]
		mouseenter: [feature: GeoJSON.Feature, event: MapMouseEvent]
		mouseleave: [event: MapMouseEvent]
	}>();

	const mapInstance = inject(MAP_INSTANCE)!;
	const isLoaded = inject(MAP_IS_LOADED)!;

	const sourceId = computed(() => `source-${props.id}`);
	let isAdded = false;
	let ownsSource = false;

	function isSourceRef(data: string | GeoJSON.GeoJSON): data is string {
		return typeof data === "string" && !data.includes("/") && !data.includes(".");
	}

	function addLayer() {
		const map = mapInstance.value;
		if (!map || isAdded) return;

		let resolvedSourceId: string;
		if (isSourceRef(props.data)) {
			resolvedSourceId = props.data;
		} else {
			resolvedSourceId = sourceId.value;
			map.addSource(resolvedSourceId, {
				type: "geojson",
				data: props.data as string | GeoJSON.GeoJSON
			});
			ownsSource = true;
		}

		map.addLayer({
			id: props.id,
			type: props.type as string,
			source: resolvedSourceId,
			paint: props.paint,
			layout: {
				...props.layout,
				visibility: props.visible ? "visible" : "none"
			},
			...(props.filter && { filter: props.filter }),
			...(props.minZoom !== undefined && { minzoom: props.minZoom }),
			...(props.maxZoom !== undefined && { maxzoom: props.maxZoom })
		} as Parameters<typeof map.addLayer>[0], props.beforeId);

		if (props.interactive) {
			map.on("click", props.id, handleClick);
			map.on("mouseenter", props.id, handleMouseEnter);
			map.on("mouseleave", props.id, handleMouseLeave);
		}

		isAdded = true;
	}

	function removeLayer() {
		const map = mapInstance.value;
		if (!map || !isAdded) return;

		try {
			map.off("click", props.id, handleClick);
			map.off("mouseenter", props.id, handleMouseEnter);
			map.off("mouseleave", props.id, handleMouseLeave);
			if (map.getLayer(props.id)) map.removeLayer(props.id);
			if (ownsSource && map.getSource(sourceId.value)) map.removeSource(sourceId.value);
		} catch {
			// ignore cleanup errors
		}

		isAdded = false;
		ownsSource = false;
	}

	function handleClick(e: MapMouseEvent & { features?: MapGeoJSONFeature[] }) {
		if (!e.features?.length) return;
		const feature = e.features[0];
		const coordinates = (feature?.geometry as GeoJSON.Point)?.coordinates?.slice() as [number, number] | undefined;
		if (coordinates) {
			emit("click", feature as unknown as GeoJSON.Feature, coordinates, e);
		}
	}

	function handleMouseEnter(e: MapMouseEvent & { features?: MapGeoJSONFeature[] }) {
		if (mapInstance.value) {
			mapInstance.value.getCanvas().style.cursor = "pointer";
		}
		if (e.features?.length) {
			emit("mouseenter", e.features[0] as unknown as GeoJSON.Feature, e);
		}
	}

	function handleMouseLeave(e: MapMouseEvent) {
		if (mapInstance.value) {
			mapInstance.value.getCanvas().style.cursor = "";
		}
		emit("mouseleave", e);
	}

	// Add layer when map is loaded
	watch(isLoaded, (loaded) => {
		if (loaded) addLayer();
	}, { immediate: true });

	// Update data
	watch(() => props.data, (data) => {
		const map = mapInstance.value;
		if (!map || !isAdded || !ownsSource) return;

		const source = map.getSource(sourceId.value) as GeoJSONSource;
		if (source) {
			source.setData(data as string | GeoJSON.GeoJSON);
		}
	});

	// Update paint properties
	watch(() => props.paint, (paint) => {
		const map = mapInstance.value;
		if (!map || !isAdded || !map.getLayer(props.id)) return;
		for (const [key, value] of Object.entries(paint)) {
			map.setPaintProperty(props.id, key, value);
		}
	}, { deep: true });

	// Update layout properties
	watch(() => props.layout, (layout) => {
		const map = mapInstance.value;
		if (!map || !isAdded || !map.getLayer(props.id)) return;
		for (const [key, value] of Object.entries(layout)) {
			map.setLayoutProperty(props.id, key, value);
		}
	}, { deep: true });

	// Watch visibility
	watch(() => props.visible, (visible) => {
		const map = mapInstance.value;
		if (!map || !isAdded || !map.getLayer(props.id)) return;
		map.setLayoutProperty(props.id, "visibility", visible ? "visible" : "none");
	});

	// Watch filter
	watch(() => props.filter, (filter) => {
		const map = mapInstance.value;
		if (!map || !isAdded || !map.getLayer(props.id)) return;
		map.setFilter(props.id, filter as Parameters<typeof map.setFilter>[1]);
	});

	onUnmounted(() => {
		removeLayer();
	});
</script>
