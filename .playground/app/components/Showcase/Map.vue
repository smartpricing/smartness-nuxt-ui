<template>
	<ShowcasePage
		title="Map"
		description="Map components built on MapLibre GL JS for interactive geographic visualization."
	>
		<!-- Basic Map -->
		<section id="basic" class="space-y-4">
			<ProseH3>
				Basic Map
			</ProseH3>
			<div class="h-[400px] rounded-lg overflow-hidden border border-gray-200">
				<SMap
					:center="[11.3548, 46.4983]"
					:zoom="12"
				>
					<SMapControls
						position="bottom-right"
						show-zoom
						show-compass
					/>
				</SMap>
			</div>
		</section>

		<!-- Projections -->
		<section id="projections" class="space-y-4">
			<ProseH3>
				Projections
			</ProseH3>
			<p class="text-sm text-muted">
				MapLibre supports different map projections. The globe projection renders the earth as a 3D sphere.
			</p>
			<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
				<div
					v-for="proj in projections"
					:key="proj.name"
					class="space-y-2"
				>
					<p class="text-sm font-medium">
						{{ proj.label }}
					</p>
					<div class="h-[300px] rounded-lg overflow-hidden border border-gray-200">
						<SMap
							:center="[11.3548, 46.4983]"
							:zoom="proj.zoom"
							:projection="proj.projection"
						>
							<SMapControls show-zoom />
						</SMap>
					</div>
				</div>
			</div>
		</section>

		<!-- Map Styles -->
		<section id="styles" class="space-y-4">
			<ProseH3>
				Map Styles
			</ProseH3>
			<p class="text-sm text-muted">
				Different free tile providers and style options.
			</p>
			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
				<div
					v-for="style in mapStyles"
					:key="style.name"
					class="space-y-2"
				>
					<p class="text-sm font-medium">
						{{ style.label }}
					</p>
					<div class="h-[250px] rounded-lg overflow-hidden border border-gray-200">
						<SMap
							:center="[11.3548, 46.4983]"
							:zoom="13"
							:map-style="style.url"
						/>
					</div>
				</div>
			</div>
		</section>

		<!-- Markers -->
		<section id="markers" class="space-y-4">
			<ProseH3>
				Markers
			</ProseH3>
			<div class="h-[400px] rounded-lg overflow-hidden border border-gray-200">
				<SMap
					:center="[11.3548, 46.4983]"
					:zoom="13"
				>
					<SMapControls show-zoom />

					<!-- Default marker -->
					<SMapMarker
						:longitude="11.3548"
						:latitude="46.4983"
					>
						<template #popup>
							<p class="font-medium">
								Bolzano City Center
							</p>
							<p class="text-sm text-gray-500">
								The capital of South Tyrol
							</p>
						</template>
						<template #tooltip>
							Click for details
						</template>
						<template #label>
							Bolzano
						</template>
					</SMapMarker>

					<!-- Custom marker -->
					<SMapMarker
						:longitude="11.3450"
						:latitude="46.5050"
					>
						<template #default>
							<div class="h-6 w-6 rounded-full border-2 border-white bg-red-500 shadow-lg flex items-center justify-center">
								<UIcon
									name="ph:star-fill"
									class="size-3 text-white"
								/>
							</div>
						</template>
						<template #popup>
							<p class="font-medium">
								Point of Interest
							</p>
						</template>
					</SMapMarker>

					<!-- Draggable marker -->
					<SMapMarker
						:longitude="11.3650"
						:latitude="46.4920"
						draggable
					>
						<template #default>
							<div class="h-5 w-5 rounded-full border-2 border-white bg-green-500 shadow-lg" />
						</template>
						<template #tooltip>
							Drag me!
						</template>
					</SMapMarker>
				</SMap>
			</div>
		</section>

		<!-- Standalone Popup -->
		<section id="popup" class="space-y-4">
			<ProseH3>
				Standalone Popup
			</ProseH3>
			<div class="h-[400px] rounded-lg overflow-hidden border border-gray-200">
				<SMap
					:center="[11.3548, 46.4983]"
					:zoom="13"
				>
					<SMapPopup
						:longitude="11.3548"
						:latitude="46.4983"
						close-button
					>
						<p class="font-medium">
							Standalone Popup
						</p>
						<p class="text-sm text-gray-500">
							This popup is placed at coordinates, not attached to a marker.
						</p>
					</SMapPopup>
				</SMap>
			</div>
		</section>

		<!-- Route -->
		<section id="route" class="space-y-4">
			<ProseH3>
				Route
			</ProseH3>
			<div class="h-[400px] rounded-lg overflow-hidden border border-gray-200">
				<SMap
					:center="[11.3548, 46.4983]"
					:zoom="12"
				>
					<SMapControls show-zoom />
					<SMapRoute
						:coordinates="routeCoordinates"
						color="#EF4444"
						:width="4"
					/>
					<SMapMarker
						:longitude="routeCoordinates[0]?.[0] ?? 0"
						:latitude="routeCoordinates[0]?.[1] ?? 0"
					>
						<template #default>
							<div class="h-4 w-4 rounded-full border-2 border-white bg-green-500 shadow-lg" />
						</template>
						<template #label>
							Start
						</template>
					</SMapMarker>
					<SMapMarker
						:longitude="routeCoordinates[routeCoordinates.length - 1]?.[0] ?? 0"
						:latitude="routeCoordinates[routeCoordinates.length - 1]?.[1] ?? 0"
					>
						<template #default>
							<div class="h-4 w-4 rounded-full border-2 border-white bg-red-500 shadow-lg" />
						</template>
						<template #label>
							End
						</template>
					</SMapMarker>
				</SMap>
			</div>
		</section>

		<!-- Cluster Layer -->
		<section id="clusters" class="space-y-4">
			<ProseH3>
				Cluster Layer
			</ProseH3>
			<div class="h-[400px] rounded-lg overflow-hidden border border-gray-200">
				<SMap
					:center="[11.3548, 46.4983]"
					:zoom="10"
				>
					<SMapControls show-zoom />
					<SMapClusterLayer :data="clusterData" />
				</SMap>
			</div>
		</section>

		<!-- Controls -->
		<section id="controls" class="space-y-4">
			<ProseH3>
				Controls
			</ProseH3>
			<div class="h-[400px] rounded-lg overflow-hidden border border-gray-200">
				<SMap
					:center="[11.3548, 46.4983]"
					:zoom="12"
				>
					<SMapControls
						position="top-right"
						show-zoom
						show-compass
						show-locate
						show-fullscreen
					/>
				</SMap>
			</div>
		</section>

		<!-- GeoJSON Shapes -->
		<section id="geojson" class="space-y-4">
			<ProseH3>
				GeoJSON Shapes
			</ProseH3>
			<p class="text-sm text-muted">
				Use the <code>@ready</code> event to access the map instance directly and add custom GeoJSON layers.
			</p>
			<div class="h-[400px] rounded-lg overflow-hidden border border-gray-200">
				<SMap
					:center="[11.3548, 46.4983]"
					:zoom="13"
					@ready="onGeoJSONMapReady"
				>
					<SMapControls show-zoom />

					<!-- Toggle button overlay -->
					<div class="absolute top-3 left-3 z-10">
						<UButton
							:icon="geoJsonVisible ? 'ph:eye-slash' : 'ph:polygon'"
							:color="geoJsonVisible ? 'primary' : 'neutral'"
							variant="subtle"
							size="sm"
							@click="toggleGeoJSON"
						>
							{{ geoJsonVisible ? "Hide Areas" : "Show Areas" }}
						</UButton>
					</div>

					<!-- Hovered feature name -->
					<div
						v-if="hoveredFeatureName"
						class="absolute bottom-3 left-3 z-10 rounded-md bg-white/90 backdrop-blur px-3 py-2 text-sm font-medium border border-gray-200"
					>
						{{ hoveredFeatureName }}
					</div>
				</SMap>
			</div>
		</section>

		<!-- Markers via Layers -->
		<section id="markers-layer" class="space-y-4">
			<ProseH3>
				Markers via Layers
			</ProseH3>
			<p class="text-sm text-muted">
				500 public toilet locations rendered as a WebGL circle layer. Click any point to see details in a native MapLibre popup.
			</p>
			<div class="h-[400px] rounded-lg overflow-hidden border border-gray-200">
				<SMap
					:center="[11.3548, 46.4983]"
					:zoom="13"
					@ready="onMarkersLayerMapReady"
				>
					<SMapControls show-zoom />
				</SMap>
			</div>
		</section>

		<!-- Custom Controls -->
		<section id="custom-controls" class="space-y-4">
			<ProseH3>
				Custom Controls
			</ProseH3>
			<p class="text-sm text-muted">
				Build custom controls as Vue markup inside the SMap default slot. Use <code>@ready</code> for map interaction.
			</p>
			<div class="h-[400px] rounded-lg overflow-hidden border border-gray-200">
				<SMap
					:center="[11.3548, 46.4983]"
					:zoom="14"
					@ready="onCustomControlsMapReady"
					@viewport-change="onCustomControlsViewportChange"
				>
					<!-- Custom control overlay -->
					<div class="absolute top-3 left-3 z-10 flex flex-col gap-2">
						<div class="flex gap-2">
							<UButton
								icon="ph:mountains"
								color="neutral"
								variant="subtle"
								size="sm"
								@click="handle3DView"
							>
								3D View
							</UButton>
							<UButton
								icon="ph:arrows-clockwise"
								color="neutral"
								variant="subtle"
								size="sm"
								@click="handleResetView"
							>
								Reset
							</UButton>
						</div>
						<div class="rounded-md bg-white/90 backdrop-blur px-3 py-2 text-xs font-mono border border-gray-200">
							<div>Pitch: {{ customControlsPitch }}°</div>
							<div>Bearing: {{ customControlsBearing }}°</div>
							<div>Zoom: {{ customControlsZoom }}</div>
						</div>
					</div>
				</SMap>
			</div>
		</section>
	</ShowcasePage>
</template>

<script setup lang="ts">
	import type { Map as MapLibreMap } from "maplibre-gl";
	import type { MapViewport } from "../../../../app/components/Map/types";
	// ── Markers via Layers ──────────────────────────────────────────────────────
	import { Popup } from "maplibre-gl";

	import ShowcasePage from "~/components/Utility/ShowcasePage.vue";

	// ── Route data ──────────────────────────────────────────────────────────────
	const routeCoordinates: [number, number][] = [
		[11.3400, 46.5050],
		[11.3450, 46.5020],
		[11.3500, 46.5000],
		[11.3548, 46.4983],
		[11.3600, 46.4960],
		[11.3650, 46.4930],
		[11.3700, 46.4900]
	];

	// ── Cluster data ────────────────────────────────────────────────────────────
	function generateClusterData(): GeoJSON.FeatureCollection<GeoJSON.Point> {
		const features: GeoJSON.Feature<GeoJSON.Point>[] = [];
		for (let i = 0; i < 200; i++) {
			features.push({
				type: "Feature",
				properties: { id: i, name: `Point ${i}` },
				geometry: {
					type: "Point",
					coordinates: [
						11.3548 + (Math.random() - 0.5) * 0.2,
						46.4983 + (Math.random() - 0.5) * 0.15
					]
				}
			});
		}
		return { type: "FeatureCollection", features };
	}

	const clusterData = generateClusterData();

	// ── Projections ─────────────────────────────────────────────────────────────
	const projections = [
		{
			name: "mercator",
			label: "Mercator (default)",
			projection: { type: "mercator" as const },
			zoom: 1
		},
		{
			name: "globe",
			label: "Globe",
			projection: { type: "globe" as const },
			zoom: 1
		}
	];

	// ── Map Styles ──────────────────────────────────────────────────────────────
	const mapStyles = [
		{
			name: "positron",
			label: "Carto Positron",
			url: "https://basemaps.cartocdn.com/gl/positron-gl-style/style.json"
		},
		{
			name: "dark-matter",
			label: "Carto Dark Matter",
			url: "https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json"
		},
		{
			name: "voyager",
			label: "Carto Voyager",
			url: "https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json"
		},
		{
			name: "ofm-positron",
			label: "OpenFreeMap Positron",
			url: "https://tiles.openfreemap.org/styles/positron"
		},
		{
			name: "ofm-bright",
			label: "OpenFreeMap Bright",
			url: "https://tiles.openfreemap.org/styles/bright"
		}
	];

	// ── GeoJSON Shapes ──────────────────────────────────────────────────────────
	const bolzanoAreas: GeoJSON.FeatureCollection = {
		type: "FeatureCollection",
		features: [
			{
				type: "Feature",
				properties: { name: "Piazza Walther" },
				geometry: {
					type: "Polygon",
					coordinates: [[
						[11.3535, 46.4975],
						[11.3560, 46.4975],
						[11.3560, 46.4990],
						[11.3535, 46.4990],
						[11.3535, 46.4975]
					]]
				}
			},
			{
				type: "Feature",
				properties: { name: "Parco della Stazione" },
				geometry: {
					type: "Polygon",
					coordinates: [[
						[11.3570, 46.4960],
						[11.3600, 46.4960],
						[11.3600, 46.4980],
						[11.3570, 46.4980],
						[11.3570, 46.4960]
					]]
				}
			},
			{
				type: "Feature",
				properties: { name: "Talvera Park" },
				geometry: {
					type: "Polygon",
					coordinates: [[
						[11.3460, 46.4990],
						[11.3500, 46.4990],
						[11.3510, 46.5030],
						[11.3470, 46.5040],
						[11.3450, 46.5010],
						[11.3460, 46.4990]
					]]
				}
			},
			{
				type: "Feature",
				properties: { name: "Old Town Center" },
				geometry: {
					type: "Polygon",
					coordinates: [[
						[11.3510, 46.4990],
						[11.3545, 46.4995],
						[11.3550, 46.5020],
						[11.3520, 46.5025],
						[11.3505, 46.5010],
						[11.3510, 46.4990]
					]]
				}
			}
		]
	};

	let geoJsonMap: MapLibreMap | null = null;
	const geoJsonVisible = ref(false);
	const hoveredFeatureName = ref<string | null>(null);

	function onGeoJSONMapReady(map: MapLibreMap) {
		geoJsonMap = map;

		map.addSource("areas", {
			type: "geojson",
			data: bolzanoAreas
		});

		map.addLayer({
			id: "areas-fill",
			type: "fill",
			source: "areas",
			paint: {
				"fill-color": "#22c55e",
				"fill-opacity": 0.4
			},
			layout: {
				visibility: "none"
			}
		});

		map.addLayer({
			id: "areas-outline",
			type: "line",
			source: "areas",
			paint: {
				"line-color": "#16a34a",
				"line-width": 2
			},
			layout: {
				visibility: "none"
			}
		});

		map.on("mouseenter", "areas-fill", () => {
			map.getCanvas().style.cursor = "pointer";
		});

		map.on("mouseleave", "areas-fill", () => {
			map.getCanvas().style.cursor = "";
			hoveredFeatureName.value = null;
		});

		map.on("mousemove", "areas-fill", (e) => {
			if (e.features && e.features.length > 0) {
				hoveredFeatureName.value = e.features[0]?.properties?.name ?? null;
			}
		});
	}

	function toggleGeoJSON() {
		if (!geoJsonMap) return;
		const visibility = geoJsonVisible.value ? "none" : "visible";
		geoJsonMap.setLayoutProperty("areas-fill", "visibility", visibility);
		geoJsonMap.setLayoutProperty("areas-outline", "visibility", visibility);
		geoJsonVisible.value = !geoJsonVisible.value;
	}

	const toiletAccessibility = ["Wheelchair accessible", "Step-free access", "Standard access", "Limited mobility access"];
	const toiletConditions = ["Excellent", "Good", "Fair", "Needs maintenance"];
	const toiletOperators = ["Municipality of Bolzano", "SAD Bus Station", "Private", "Shopping Center"];

	function generateToiletData(): GeoJSON.FeatureCollection<GeoJSON.Point> {
		const features: GeoJSON.Feature<GeoJSON.Point>[] = [];
		for (let i = 0; i < 500; i++) {
			const isFree = Math.random() > 0.3;
			features.push({
				type: "Feature",
				properties: {
					id: i,
					name: `Public Toilet #${i + 1}`,
					fee: isFree ? "Free" : `€${(Math.random() * 0.5 + 0.5).toFixed(2)}`,
					accessibility: toiletAccessibility[Math.floor(Math.random() * toiletAccessibility.length)],
					condition: toiletConditions[Math.floor(Math.random() * toiletConditions.length)],
					operator: toiletOperators[Math.floor(Math.random() * toiletOperators.length)],
					openHours: Math.random() > 0.4 ? "6:00 – 22:00" : "24h",
					hasChangingTable: Math.random() > 0.5
				},
				geometry: {
					type: "Point",
					coordinates: [
						11.3548 + (Math.random() - 0.5) * 0.08,
						46.4983 + (Math.random() - 0.5) * 0.06
					]
				}
			});
		}
		return { type: "FeatureCollection", features };
	}

	let layerPopup: InstanceType<typeof Popup> | null = null;

	function onMarkersLayerMapReady(map: MapLibreMap) {
		const data = generateToiletData();

		map.addSource("layer-markers", {
			type: "geojson",
			data
		});

		map.addLayer({
			id: "layer-markers-circle",
			type: "circle",
			source: "layer-markers",
			paint: {
				"circle-radius": 5,
				"circle-color": "#6366f1",
				"circle-stroke-width": 2,
				"circle-stroke-color": "#fff"
			}
		});

		map.on("mouseenter", "layer-markers-circle", () => {
			map.getCanvas().style.cursor = "pointer";
		});

		map.on("mouseleave", "layer-markers-circle", () => {
			map.getCanvas().style.cursor = "";
		});

		map.on("click", "layer-markers-circle", (e) => {
			if (!e.features || e.features.length === 0) return;

			const feature = e.features[0];
			const coords = (feature?.geometry as GeoJSON.Point)?.coordinates.slice() as [number, number];
			const p = feature?.properties;

			layerPopup?.remove();
			layerPopup = new Popup({ offset: 12, closeButton: false, maxWidth: "280px" })
				.setLngLat(coords)
				.setHTML(`
					<div style="font-family: inherit; background: white; border: 1px solid #e5e7eb; border-radius: 8px; padding: 12px; box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);">
						<div style="display: flex; align-items: center; gap: 6px; margin-bottom: 8px;">
							<span style="font-size: 18px;">🚻</span>
							<strong style="font-size: 14px;">${p?.name}</strong>
						</div>
						<div style="display: grid; grid-template-columns: auto 1fr; gap: 4px 10px; font-size: 12px; color: #374151;">
							<span style="color: #6b7280;">Fee</span>
							<span>${p?.fee}</span>
							<span style="color: #6b7280;">Hours</span>
							<span>${p?.openHours}</span>
							<span style="color: #6b7280;">Access</span>
							<span>${p?.accessibility}</span>
							<span style="color: #6b7280;">Condition</span>
							<span>${p?.condition}</span>
							<span style="color: #6b7280;">Operator</span>
							<span>${p?.operator}</span>
							<span style="color: #6b7280;">Changing table</span>
							<span>${p?.hasChangingTable === "true" || p?.hasChangingTable === true ? "Yes ✓" : "No"}</span>
						</div>
					</div>
				`)
				.addTo(map);
		});
	}

	// ── Custom Controls ─────────────────────────────────────────────────────────
	let customControlsMap: MapLibreMap | null = null;
	const customControlsPitch = ref(0);
	const customControlsBearing = ref(0);
	const customControlsZoom = ref("14.0");

	function onCustomControlsMapReady(map: MapLibreMap) {
		customControlsMap = map;
	}

	function onCustomControlsViewportChange(viewport: MapViewport) {
		customControlsPitch.value = Math.round(viewport.pitch);
		customControlsBearing.value = Math.round(viewport.bearing);
		customControlsZoom.value = viewport.zoom.toFixed(1);
	}

	function handle3DView() {
		customControlsMap?.easeTo({
			pitch: 60,
			bearing: -20,
			duration: 1000
		});
	}

	function handleResetView() {
		customControlsMap?.easeTo({
			pitch: 0,
			bearing: 0,
			duration: 1000
		});
	}
</script>
