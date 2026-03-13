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
			<LazyMap container-class="h-[400px] rounded-lg overflow-hidden border border-gray-200">
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
			</LazyMap>
		</section>

		<!-- v-model Viewport Binding -->
		<section id="v-model" class="space-y-4">
			<ProseH3>
				v-model Viewport Binding
			</ProseH3>
			<p class="text-sm text-muted">
				Two-way binding with <code>v-model:center</code>, <code>v-model:zoom</code>, <code>v-model:bearing</code>, <code>v-model:pitch</code>. Pan/zoom the map or use the controls below to sync.
			</p>
			<LazyMap container-class="h-[400px] rounded-lg overflow-hidden border border-gray-200">
				<SMap
					v-model:center="vmodelCenter"
					v-model:zoom="vmodelZoom"
					v-model:bearing="vmodelBearing"
					v-model:pitch="vmodelPitch"
				>
					<SMapControls show-zoom show-compass />
				</SMap>
			</LazyMap>
			<div class="grid grid-cols-2 md:grid-cols-4 gap-4">
				<div class="space-y-1">
					<label class="text-xs font-medium text-muted">Longitude</label>
					<UInput
						:model-value="vmodelCenter[0].toFixed(4)"
						size="sm"
						readonly
					/>
				</div>
				<div class="space-y-1">
					<label class="text-xs font-medium text-muted">Latitude</label>
					<UInput
						:model-value="vmodelCenter[1].toFixed(4)"
						size="sm"
						readonly
					/>
				</div>
				<div class="space-y-1">
					<label class="text-xs font-medium text-muted">Zoom</label>
					<UInput
						:model-value="vmodelZoom.toFixed(2)"
						size="sm"
						readonly
					/>
				</div>
				<div class="space-y-1">
					<label class="text-xs font-medium text-muted">Bearing / Pitch</label>
					<UInput
						:model-value="`${vmodelBearing.toFixed(0)}° / ${vmodelPitch.toFixed(0)}°`"
						size="sm"
						readonly
					/>
				</div>
			</div>
			<div class="flex flex-wrap gap-2">
				<UButton
					size="sm"
					variant="subtle"
					color="neutral"
					@click="vmodelCenter = [11.3548, 46.4983]; vmodelZoom = 12; vmodelBearing = 0; vmodelPitch = 0"
				>
					Reset to Bolzano
				</UButton>
				<UButton
					size="sm"
					variant="subtle"
					color="neutral"
					@click="vmodelCenter = [12.4964, 41.9028]; vmodelZoom = 11"
				>
					Go to Rome
				</UButton>
				<UButton
					size="sm"
					variant="subtle"
					color="neutral"
					@click="vmodelPitch = 60; vmodelBearing = 45"
				>
					Tilt 3D
				</UButton>
			</div>
		</section>

		<!-- Map Constraints -->
		<section id="constraints" class="space-y-4">
			<ProseH3>
				Map Constraints
			</ProseH3>
			<p class="text-sm text-muted">
				Lock the map to a specific area with <code>maxBounds</code>, <code>minZoom</code>, and <code>maxZoom</code>. This map is constrained to Bolzano, zoom 10-16.
			</p>
			<LazyMap container-class="h-[350px] rounded-lg overflow-hidden border border-gray-200">
				<SMap
					:center="[11.3548, 46.4983]"
					:zoom="13"
					:max-bounds="[[11.25, 46.44], [11.46, 46.56]]"
					:min-zoom="10"
					:max-zoom="16"
				>
					<SMapControls show-zoom />
					<div class="absolute top-3 left-3 z-10 rounded-md bg-white/90 backdrop-blur px-3 py-1.5 text-xs border border-gray-200">
						Bounded to Bolzano &middot; Zoom 10-16
					</div>
				</SMap>
			</LazyMap>
		</section>

		<!-- Non-interactive Map -->
		<section id="non-interactive" class="space-y-4">
			<ProseH3>
				Non-interactive Map
			</ProseH3>
			<p class="text-sm text-muted">
				Set <code>:interactive="false"</code> for static thumbnail maps. No panning, zooming, or rotation.
			</p>
			<div class="grid grid-cols-1 md:grid-cols-3 gap-4">
				<LazyMap container-class="h-[200px] rounded-lg overflow-hidden border border-gray-200">
					<SMap
						:center="[11.3548, 46.4983]"
						:zoom="14"
						:interactive="false"
					>
						<SMapMarker :longitude="11.3548" :latitude="46.4983" color="#ef4444" />
					</SMap>
				</LazyMap>
				<LazyMap container-class="h-[200px] rounded-lg overflow-hidden border border-gray-200">
					<SMap
						:center="[12.4964, 41.9028]"
						:zoom="12"
						:interactive="false"
						map-style="https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json"
					>
						<SMapMarker :longitude="12.4964" :latitude="41.9028" color="#22c55e" />
					</SMap>
				</LazyMap>
				<LazyMap container-class="h-[200px] rounded-lg overflow-hidden border border-gray-200">
					<SMap
						:center="[9.1900, 45.4642]"
						:zoom="12"
						:interactive="false"
						map-style="https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json"
					>
						<SMapMarker :longitude="9.1900" :latitude="45.4642" color="#3b82f6" />
					</SMap>
				</LazyMap>
			</div>
		</section>

		<!-- Exposed Methods -->
		<section id="methods" class="space-y-4">
			<ProseH3>
				Exposed Methods
			</ProseH3>
			<p class="text-sm text-muted">
				Use a template ref to call <code>flyTo()</code>, <code>easeTo()</code>, and <code>fitBounds()</code> on the map.
			</p>
			<div class="flex flex-wrap gap-2 mb-2">
				<UButton
					size="sm"
					variant="subtle"
					icon="ph:airplane-takeoff"
					@click="methodsMapRef?.flyTo({ center: [11.3548, 46.4983], zoom: 15, duration: 2000 })"
				>
					flyTo Bolzano
				</UButton>
				<UButton
					size="sm"
					variant="subtle"
					icon="ph:arrows-out-cardinal"
					@click="methodsMapRef?.easeTo({ center: [11.33, 46.52], zoom: 12, pitch: 45, bearing: -30, duration: 1500 })"
				>
					easeTo 3D
				</UButton>
				<UButton
					size="sm"
					variant="subtle"
					icon="ph:frame-corners"
					@click="methodsMapRef?.fitBounds([[11.30, 46.46], [11.42, 46.54]], { padding: 40 })"
				>
					fitBounds Region
				</UButton>
				<UButton
					size="sm"
					variant="subtle"
					color="neutral"
					icon="ph:arrows-clockwise"
					@click="methodsMapRef?.easeTo({ center: [11.3548, 46.4983], zoom: 13, pitch: 0, bearing: 0, duration: 500 })"
				>
					Reset
				</UButton>
			</div>
			<LazyMap container-class="h-[400px] rounded-lg overflow-hidden border border-gray-200">
				<SMap
					ref="methodsMapRef"
					:center="[11.3548, 46.4983]"
					:zoom="13"
				>
					<SMapControls show-zoom show-compass />
					<SMapMarker :longitude="11.3548" :latitude="46.4983" color="#ef4444" />
				</SMap>
			</LazyMap>
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
					<LazyMap container-class="h-[300px] rounded-lg overflow-hidden border border-gray-200">
						<SMap
							:center="[11.3548, 46.4983]"
							:zoom="proj.zoom"
							:projection="proj.projection"
						>
							<SMapControls show-zoom />
						</SMap>
					</LazyMap>
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
					<LazyMap container-class="h-[250px] rounded-lg overflow-hidden border border-gray-200">
						<SMap
							:center="[11.3548, 46.4983]"
							:zoom="13"
							:map-style="style.url"
						/>
					</LazyMap>
				</div>
			</div>
		</section>

		<!-- Marker Colors -->
		<section id="marker-colors" class="space-y-4">
			<ProseH3>
				Marker Colors
			</ProseH3>
			<p class="text-sm text-muted">
				Use the <code>color</code> prop (without a default slot) to render MapLibre's native colored pin marker.
			</p>
			<LazyMap container-class="h-[350px] rounded-lg overflow-hidden border border-gray-200">
				<SMap
					:center="[11.3548, 46.4983]"
					:zoom="13"
				>
					<SMapControls show-zoom />
					<SMapMarker
						v-for="(mc, i) in markerColors"
						:key="i"
						:longitude="mc.lng"
						:latitude="mc.lat"
						:color="mc.color"
					>
						<template #label>
							{{ mc.label }}
						</template>
					</SMapMarker>
				</SMap>
			</LazyMap>
		</section>

		<!-- Marker Anchor & Opacity -->
		<section id="marker-anchor" class="space-y-4">
			<ProseH3>
				Marker Anchor &amp; Opacity
			</ProseH3>
			<p class="text-sm text-muted">
				The <code>anchor</code> prop controls which part of the marker sits on the coordinate. <code>opacity</code> fades markers.
			</p>
			<LazyMap container-class="h-[350px] rounded-lg overflow-hidden border border-gray-200">
				<SMap
					:center="[11.3548, 46.4983]"
					:zoom="15"
				>
					<SMapControls show-zoom />
					<!-- Center crosshair reference -->
					<SMapMarker
						:longitude="11.3548"
						:latitude="46.4983"
					>
						<template #default>
							<div class="size-2 rounded-full bg-gray-900 ring-2 ring-white" />
						</template>
						<template #label>
							Anchor point
						</template>
					</SMapMarker>

					<!-- Different anchors around the same point -->
					<SMapMarker
						:longitude="11.3548"
						:latitude="46.4983"
						anchor="bottom"
						opacity="0.9"
					>
						<template #default>
							<div class="px-2 py-1 rounded bg-blue-500 text-white text-[10px] font-medium">
								bottom
							</div>
						</template>
					</SMapMarker>

					<!-- Faded markers -->
					<SMapMarker :longitude="11.3530" :latitude="46.4990" color="#ef4444" opacity="1" />
					<SMapMarker :longitude="11.3540" :latitude="46.4990" color="#ef4444" opacity="0.7" />
					<SMapMarker :longitude="11.3550" :latitude="46.4990" color="#ef4444" opacity="0.4" />
					<SMapMarker :longitude="11.3560" :latitude="46.4990" color="#ef4444" opacity="0.15" />
				</SMap>
			</LazyMap>
		</section>

		<!-- Markers (existing) -->
		<section id="markers" class="space-y-4">
			<ProseH3>
				Markers with Popups &amp; Tooltips
			</ProseH3>
			<LazyMap container-class="h-[400px] rounded-lg overflow-hidden border border-gray-200">
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
			</LazyMap>
		</section>

		<!-- Popup Options -->
		<section id="popup-options" class="space-y-4">
			<ProseH3>
				Popup Options
			</ProseH3>
			<p class="text-sm text-muted">
				<code>closeOnClick</code> closes the popup when clicking elsewhere (default). <code>closeOnMove</code> closes it when the map moves.
			</p>
			<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
				<div class="space-y-2">
					<p class="text-sm font-medium">
						closeOnClick (default)
					</p>
					<LazyMap container-class="h-[300px] rounded-lg overflow-hidden border border-gray-200">
						<SMap :center="[11.3548, 46.4983]" :zoom="14">
							<SMapPopup
								:longitude="11.3548"
								:latitude="46.4983"
								close-button
								:close-on-click="true"
							>
								<p class="text-sm font-medium">
									Click outside to close
								</p>
							</SMapPopup>
						</SMap>
					</LazyMap>
				</div>
				<div class="space-y-2">
					<p class="text-sm font-medium">
						closeOnMove
					</p>
					<LazyMap container-class="h-[300px] rounded-lg overflow-hidden border border-gray-200">
						<SMap :center="[11.3548, 46.4983]" :zoom="14">
							<SMapPopup
								:longitude="11.3548"
								:latitude="46.4983"
								:close-on-click="false"
								:close-on-move="true"
							>
								<p class="text-sm font-medium">
									Pan the map to close
								</p>
							</SMapPopup>
						</SMap>
					</LazyMap>
				</div>
			</div>
		</section>

		<!-- Route Features -->
		<section id="route" class="space-y-4">
			<ProseH3>
				Route
			</ProseH3>
			<p class="text-sm text-muted">
				Toggle visibility, use <code>fitOnMount</code> to auto-fit bounds, and customize <code>lineCap</code> / <code>lineJoin</code>.
			</p>
			<div class="flex flex-wrap gap-2 mb-2">
				<UButton
					size="sm"
					variant="subtle"
					:icon="routeVisible ? 'ph:eye-slash' : 'ph:eye'"
					:color="routeVisible ? 'primary' : 'neutral'"
					@click="routeVisible = !routeVisible"
				>
					{{ routeVisible ? "Hide" : "Show" }} Route
				</UButton>
				<UButton
					size="sm"
					variant="subtle"
					:color="routeDashed ? 'primary' : 'neutral'"
					@click="routeDashed = !routeDashed"
				>
					{{ routeDashed ? "Solid" : "Dashed" }}
				</UButton>
			</div>
			<LazyMap container-class="h-[400px] rounded-lg overflow-hidden border border-gray-200">
				<SMap
					:center="[11.3548, 46.4983]"
					:zoom="12"
				>
					<SMapControls show-zoom />
					<SMapRoute
						:coordinates="routeCoordinates"
						color="#EF4444"
						:width="4"
						:visible="routeVisible"
						:dash-array="routeDashed ? [4, 4] : undefined"
						fit-on-mount
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
			</LazyMap>
		</section>

		<!-- Route Line Styles -->
		<section id="route-styles" class="space-y-4">
			<ProseH3>
				Route Line Styles
			</ProseH3>
			<p class="text-sm text-muted">
				Different <code>lineCap</code> and <code>lineJoin</code> combinations.
			</p>
			<div class="grid grid-cols-1 md:grid-cols-3 gap-4">
				<div class="space-y-2">
					<p class="text-sm font-medium">
						round / round (default)
					</p>
					<LazyMap container-class="h-[200px] rounded-lg overflow-hidden border border-gray-200">
						<SMap :center="[11.3548, 46.4983]" :zoom="14" :interactive="false">
							<SMapRoute
								:coordinates="zigzagCoordinates"
								color="#3b82f6"
								:width="8"
								line-cap="round"
								line-join="round"
							/>
						</SMap>
					</LazyMap>
				</div>
				<div class="space-y-2">
					<p class="text-sm font-medium">
						square / miter
					</p>
					<LazyMap container-class="h-[200px] rounded-lg overflow-hidden border border-gray-200">
						<SMap :center="[11.3548, 46.4983]" :zoom="14" :interactive="false">
							<SMapRoute
								:coordinates="zigzagCoordinates"
								color="#ef4444"
								:width="8"
								line-cap="square"
								line-join="miter"
							/>
						</SMap>
					</LazyMap>
				</div>
				<div class="space-y-2">
					<p class="text-sm font-medium">
						butt / bevel
					</p>
					<LazyMap container-class="h-[200px] rounded-lg overflow-hidden border border-gray-200">
						<SMap :center="[11.3548, 46.4983]" :zoom="14" :interactive="false">
							<SMapRoute
								:coordinates="zigzagCoordinates"
								color="#22c55e"
								:width="8"
								line-cap="butt"
								line-join="bevel"
							/>
						</SMap>
					</LazyMap>
				</div>
			</div>
		</section>

		<!-- Cluster Customization -->
		<section id="clusters" class="space-y-4">
			<ProseH3>
				Cluster Layer
			</ProseH3>
			<p class="text-sm text-muted">
				Toggle visibility, customize <code>clusterSizes</code>, <code>clusterColors</code>, and unclustered point styling.
			</p>
			<div class="flex flex-wrap gap-2 mb-2">
				<UButton
					size="sm"
					variant="subtle"
					:icon="clusterVisible ? 'ph:eye-slash' : 'ph:eye'"
					:color="clusterVisible ? 'primary' : 'neutral'"
					@click="clusterVisible = !clusterVisible"
				>
					{{ clusterVisible ? "Hide" : "Show" }} Clusters
				</UButton>
				<UButton
					size="sm"
					variant="subtle"
					:color="clusterLarge ? 'primary' : 'neutral'"
					@click="clusterLarge = !clusterLarge"
				>
					{{ clusterLarge ? "Normal" : "Large" }} Clusters
				</UButton>
			</div>
			<LazyMap container-class="h-[400px] rounded-lg overflow-hidden border border-gray-200">
				<SMap
					:center="[11.3548, 46.4983]"
					:zoom="10"
				>
					<SMapControls show-zoom />
					<SMapClusterLayer
						:data="clusterData"
						:visible="clusterVisible"
						:cluster-sizes="clusterLarge ? [30, 45, 60] : [20, 30, 40]"
						:cluster-colors="['#6366f1', '#f59e0b', '#ef4444']"
						point-color="#6366f1"
						:point-radius="clusterLarge ? 8 : 5"
						:point-stroke-width="2"
						point-stroke-color="#fff"
					/>
				</SMap>
			</LazyMap>
		</section>

		<!-- Controls -->
		<section id="controls" class="space-y-4">
			<ProseH3>
				Controls
			</ProseH3>
			<p class="text-sm text-muted">
				All built-in controls. The fullscreen button toggles its icon between <code>ph:arrows-out</code> and <code>ph:arrows-in</code>.
			</p>
			<LazyMap container-class="h-[400px] rounded-lg overflow-hidden border border-gray-200">
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
			</LazyMap>
		</section>

		<!-- SMapLayer Component -->
		<section id="declarative-layer" class="space-y-4">
			<ProseH3>
				SMapLayer (Declarative Layers)
			</ProseH3>
			<p class="text-sm text-muted">
				The <code>SMapLayer</code> component provides a declarative way to add fill, line, circle, symbol, or heatmap layers without the <code>@ready</code> escape hatch.
			</p>
			<div class="flex flex-wrap gap-2 mb-2">
				<UButton
					size="sm"
					variant="subtle"
					:icon="layerFillVisible ? 'ph:eye-slash' : 'ph:eye'"
					:color="layerFillVisible ? 'primary' : 'neutral'"
					@click="layerFillVisible = !layerFillVisible"
				>
					{{ layerFillVisible ? "Hide" : "Show" }} Fill
				</UButton>
				<UButton
					size="sm"
					variant="subtle"
					:icon="layerOutlineVisible ? 'ph:eye-slash' : 'ph:eye'"
					:color="layerOutlineVisible ? 'primary' : 'neutral'"
					@click="layerOutlineVisible = !layerOutlineVisible"
				>
					{{ layerOutlineVisible ? "Hide" : "Show" }} Outline
				</UButton>
				<UButton
					size="sm"
					variant="subtle"
					:icon="layerPointsVisible ? 'ph:eye-slash' : 'ph:eye'"
					:color="layerPointsVisible ? 'primary' : 'neutral'"
					@click="layerPointsVisible = !layerPointsVisible"
				>
					{{ layerPointsVisible ? "Hide" : "Show" }} Points
				</UButton>
			</div>
			<LazyMap container-class="h-[400px] rounded-lg overflow-hidden border border-gray-200">
				<SMap
					:center="[11.3548, 46.4983]"
					:zoom="13"
				>
					<SMapControls show-zoom />

					<!-- Fill layer -->
					<SMapLayer
						id="areas-fill"
						type="fill"
						:data="bolzanoAreas"
						:paint="{ 'fill-color': '#6366f1', 'fill-opacity': 0.3 }"
						:visible="layerFillVisible"
						@mouseenter="onLayerFeatureEnter"
						@mouseleave="onLayerFeatureLeave"
					/>

					<!-- Outline layer -->
					<SMapLayer
						id="areas-outline"
						type="line"
						:data="bolzanoAreas"
						:paint="{ 'line-color': '#4f46e5', 'line-width': 2 }"
						:visible="layerOutlineVisible"
					/>

					<!-- Circle layer for POIs -->
					<SMapLayer
						id="poi-circles"
						type="circle"
						:data="poiData"
						:paint="{ 'circle-color': '#ef4444', 'circle-radius': 7, 'circle-stroke-width': 2, 'circle-stroke-color': '#fff' }"
						:visible="layerPointsVisible"
						@click="onLayerPointClick"
					/>

					<!-- Hovered feature name overlay -->
					<div
						v-if="layerHoveredName"
						class="absolute bottom-3 left-3 z-10 rounded-md bg-white/90 backdrop-blur px-3 py-2 text-sm font-medium border border-gray-200"
					>
						{{ layerHoveredName }}
					</div>

					<!-- Clicked point info -->
					<div
						v-if="layerClickedPoint"
						class="absolute top-3 right-3 z-10 rounded-md bg-white/90 backdrop-blur px-3 py-2 text-sm border border-gray-200 max-w-[200px]"
					>
						<p class="font-medium">
							{{ layerClickedPoint.name }}
						</p>
						<p class="text-xs text-muted">
							{{ layerClickedPoint.type }}
						</p>
					</div>
				</SMap>
			</LazyMap>
		</section>

		<!-- GeoJSON Shapes (via @ready) -->
		<section id="geojson" class="space-y-4">
			<ProseH3>
				GeoJSON via @ready
			</ProseH3>
			<p class="text-sm text-muted">
				For advanced use cases, the <code>@ready</code> event gives direct access to the MapLibre instance.
			</p>
			<LazyMap container-class="h-[400px] rounded-lg overflow-hidden border border-gray-200">
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
			</LazyMap>
		</section>

		<!-- Markers via Layers -->
		<section id="markers-layer" class="space-y-4">
			<ProseH3>
				Markers via Layers
			</ProseH3>
			<p class="text-sm text-muted">
				500 public toilet locations rendered as a WebGL circle layer. Click any point to see details in a native MapLibre popup.
			</p>
			<LazyMap container-class="h-[400px] rounded-lg overflow-hidden border border-gray-200">
				<SMap
					:center="[11.3548, 46.4983]"
					:zoom="13"
					@ready="onMarkersLayerMapReady"
				>
					<SMapControls show-zoom />
				</SMap>
			</LazyMap>
		</section>

		<!-- Custom Controls -->
		<section id="custom-controls" class="space-y-4">
			<ProseH3>
				Custom Controls
			</ProseH3>
			<p class="text-sm text-muted">
				Build custom controls as Vue markup inside the SMap default slot. Use <code>@ready</code> for map interaction.
			</p>
			<LazyMap container-class="h-[400px] rounded-lg overflow-hidden border border-gray-200">
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
							<div>Pitch: {{ customControlsPitch }}&deg;</div>
							<div>Bearing: {{ customControlsBearing }}&deg;</div>
							<div>Zoom: {{ customControlsZoom }}</div>
						</div>
					</div>
				</SMap>
			</LazyMap>
		</section>

		<!-- i18n Locale -->
		<section id="locale" class="space-y-4">
			<ProseH3>
				Locale (i18n)
			</ProseH3>
			<p class="text-sm text-muted">
				The <code>locale</code> prop controls internal labels (loading text). Supports <code>en</code>, <code>it</code>, <code>de</code>, <code>es</code>.
			</p>
			<div class="grid grid-cols-2 md:grid-cols-4 gap-4">
				<div
					v-for="loc in (['en', 'it', 'de', 'es'] as const)"
					:key="loc"
					class="space-y-2"
				>
					<p class="text-sm font-medium">
						{{ loc.toUpperCase() }}
					</p>
					<LazyMap container-class="h-[150px] rounded-lg overflow-hidden border border-gray-200">
						<SMap
							:center="[11.3548, 46.4983]"
							:zoom="12"
							:locale="loc"
							map-style="invalid-style-to-show-loading"
						/>
					</LazyMap>
				</div>
			</div>
		</section>
	</ShowcasePage>
</template>

<script setup lang="ts">
	import type { Map as MapLibreMap } from "maplibre-gl";
	import type { MapViewport } from "../../../../app/components/Map/types";
	import { Popup } from "maplibre-gl";

	import ShowcasePage from "~/components/Utility/ShowcasePage.vue";
	import LazyMap from "~/components/Utility/LazyMap.vue";

	// ── v-model Viewport ─────────────────────────────────────────────────────────
	const vmodelCenter = ref<[number, number]>([11.3548, 46.4983]);
	const vmodelZoom = ref(12);
	const vmodelBearing = ref(0);
	const vmodelPitch = ref(0);

	// ── Exposed Methods ──────────────────────────────────────────────────────────
	const methodsMapRef = ref<InstanceType<any> | null>(null);

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

	const routeVisible = ref(true);
	const routeDashed = ref(false);

	// Zigzag for line style demo
	const zigzagCoordinates: [number, number][] = [
		[11.3510, 46.4970],
		[11.3530, 46.4990],
		[11.3550, 46.4970],
		[11.3570, 46.4990],
		[11.3590, 46.4970]
	];

	// ── Marker Colors ────────────────────────────────────────────────────────────
	const markerColors = [
		{ lng: 11.3500, lat: 46.4983, color: "#ef4444", label: "Red" },
		{ lng: 11.3525, lat: 46.4983, color: "#f59e0b", label: "Amber" },
		{ lng: 11.3548, lat: 46.4983, color: "#22c55e", label: "Green" },
		{ lng: 11.3571, lat: 46.4983, color: "#3b82f6", label: "Blue" },
		{ lng: 11.3594, lat: 46.4983, color: "#8b5cf6", label: "Violet" },
		{ lng: 11.3617, lat: 46.4983, color: "#ec4899", label: "Pink" }
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
	const clusterVisible = ref(true);
	const clusterLarge = ref(false);

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

	// ── SMapLayer (Declarative) ─────────────────────────────────────────────────
	const layerFillVisible = ref(true);
	const layerOutlineVisible = ref(true);
	const layerPointsVisible = ref(true);
	const layerHoveredName = ref<string | null>(null);
	const layerClickedPoint = ref<{ name: string, type: string } | null>(null);

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

	const poiData: GeoJSON.FeatureCollection<GeoJSON.Point> = {
		type: "FeatureCollection",
		features: [
			{ type: "Feature", properties: { name: "Duomo di Bolzano", type: "Cathedral" }, geometry: { type: "Point", coordinates: [11.3545, 46.4988] } },
			{ type: "Feature", properties: { name: "Museo Archeologico", type: "Museum" }, geometry: { type: "Point", coordinates: [11.3520, 46.4998] } },
			{ type: "Feature", properties: { name: "Castel Roncolo", type: "Castle" }, geometry: { type: "Point", coordinates: [11.3480, 46.5060] } },
			{ type: "Feature", properties: { name: "Piazza delle Erbe", type: "Market Square" }, geometry: { type: "Point", coordinates: [11.3538, 46.5002] } },
			{ type: "Feature", properties: { name: "Stazione di Bolzano", type: "Train Station" }, geometry: { type: "Point", coordinates: [11.3580, 46.4968] } }
		]
	};

	function onLayerFeatureEnter(feature: GeoJSON.Feature) {
		layerHoveredName.value = (feature.properties as Record<string, string>)?.name ?? null;
	}

	function onLayerFeatureLeave() {
		layerHoveredName.value = null;
	}

	function onLayerPointClick(feature: GeoJSON.Feature) {
		const props = feature.properties as Record<string, string>;
		layerClickedPoint.value = { name: props?.name ?? "", type: props?.type ?? "" };
		setTimeout(() => { layerClickedPoint.value = null; }, 3000);
	}

	// ── GeoJSON Shapes (via @ready) ─────────────────────────────────────────────
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

	// ── Markers via Layers ──────────────────────────────────────────────────────
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
							<span style="font-size: 18px;">&#x1F6BB;</span>
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
							<span>${p?.hasChangingTable === "true" || p?.hasChangingTable === true ? "Yes &#x2713;" : "No"}</span>
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
