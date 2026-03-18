<template>
	<Teleport
		v-if="markerElement"
		:to="markerElement"
	>
		<div class="relative cursor-pointer">
			<slot>
				<div class="relative h-4 w-4 rounded-full border-2 border-white bg-blue-500 shadow-lg" />
			</slot>

			<!-- Label -->
			<div
				v-if="$slots.label"
				class="absolute left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] font-medium text-gray-900" :class="[
					labelPosition === 'top' ? 'bottom-full mb-1' : 'top-full mt-1',
				]"
			>
				<slot name="label" />
			</div>
		</div>
	</Teleport>

	<!-- Popup portal -->
	<Teleport
		v-if="popupContainer && $slots.popup"
		:to="popupContainer"
	>
		<div class="relative rounded-md border border-gray-200 bg-white p-3 text-gray-900 shadow-md">
			<button
				v-if="popupOptions?.closeButton"
				type="button"
				class="absolute top-1 right-1 z-10 rounded-sm opacity-70 transition-opacity hover:opacity-100"
				aria-label="Close popup"
				@click="closePopup"
			>
				<UIcon
					name="ph:x"
					class="size-4"
				/>
			</button>
			<slot name="popup" />
		</div>
	</Teleport>

	<!-- Tooltip portal -->
	<Teleport
		v-if="tooltipContainer && $slots.tooltip"
		:to="tooltipContainer"
	>
		<div class="rounded-md bg-gray-900 px-2 py-1 text-xs text-white shadow-md">
			<slot name="tooltip" />
		</div>
	</Teleport>
</template>

<script setup lang="ts">
	import type { Marker as MarkerType, Popup as PopupType } from "maplibre-gl";
	import type { SMapMarkerProps } from "./types";
	import { Marker, Popup } from "maplibre-gl";
	import { inject, onMounted, onUnmounted, useSlots, watch } from "vue";
	import { MAP_INSTANCE } from "./types";

	const props = withDefaults(defineProps<SMapMarkerProps>(), {
		draggable: false,
		rotation: 0,
		rotationAlignment: "auto",
		pitchAlignment: "auto",
		labelPosition: "top",
		offset: undefined,
		popupOptions: undefined,
		tooltipOptions: undefined,
		color: undefined,
		anchor: undefined,
		opacity: undefined
	});

	const emit = defineEmits<{
		click: [e: MouseEvent]
		mouseenter: [e: MouseEvent]
		mouseleave: [e: MouseEvent]
		dragstart: [lngLat: { lng: number, lat: number }]
		drag: [lngLat: { lng: number, lat: number }]
		dragend: [lngLat: { lng: number, lat: number }]
		popupClose: []
	}>();

	const slots = useSlots();
	const mapInstance = inject(MAP_INSTANCE)!;

	const markerElement = ref<HTMLElement | null>(null);
	const popupContainer = ref<HTMLDivElement | null>(null);
	const tooltipContainer = ref<HTMLDivElement | null>(null);

	let marker: MarkerType | null = null;
	let popup: PopupType | null = null;
	let tooltip: PopupType | null = null;

	onMounted(() => {
		// When color is set and no custom default slot, use MapLibre's default pin marker
		const useDefaultPin = !slots.default && !!props.color;

		let el: HTMLElement;
		if (useDefaultPin) {
			marker = new Marker({
				color: props.color,
				draggable: props.draggable,
				offset: props.offset,
				rotation: props.rotation,
				rotationAlignment: props.rotationAlignment,
				pitchAlignment: props.pitchAlignment,
				...(props.anchor && { anchor: props.anchor }),
				...(props.opacity && { opacity: props.opacity })
			}).setLngLat([props.longitude, props.latitude]);
			el = marker.getElement();
			markerElement.value = el;
		} else {
			el = document.createElement("div");
			markerElement.value = el;
			marker = new Marker({
				element: el,
				draggable: props.draggable,
				offset: props.offset,
				rotation: props.rotation,
				rotationAlignment: props.rotationAlignment,
				pitchAlignment: props.pitchAlignment,
				...(props.anchor && { anchor: props.anchor }),
				...(props.opacity && { opacity: props.opacity })
			}).setLngLat([props.longitude, props.latitude]);
		}

		// Event listeners on marker element
		el.addEventListener("click", (e: MouseEvent) => emit("click", e));
		el.addEventListener("mouseenter", (e: MouseEvent) => emit("mouseenter", e));
		el.addEventListener("mouseleave", (e: MouseEvent) => emit("mouseleave", e));

		// Drag events
		marker.on("dragstart", () => {
			const lngLat = marker!.getLngLat();
			emit("dragstart", { lng: lngLat.lng, lat: lngLat.lat });
		});
		marker.on("drag", () => {
			const lngLat = marker!.getLngLat();
			emit("drag", { lng: lngLat.lng, lat: lngLat.lat });
		});
		marker.on("dragend", () => {
			const lngLat = marker!.getLngLat();
			emit("dragend", { lng: lngLat.lng, lat: lngLat.lat });
		});

		// Setup popup if slot is used
		if (slots.popup) {
			const container = document.createElement("div");
			popupContainer.value = container;

			popup = new Popup({
				offset: props.popupOptions?.offset ?? 16,
				closeButton: false,
				maxWidth: props.popupOptions?.maxWidth ?? "none"
			}).setDOMContent(container);

			popup!.on("close", () => emit("popupClose"));
			marker!.setPopup(popup!);
		}

		// Setup tooltip if slot is used
		if (slots.tooltip) {
			const container = document.createElement("div");
			tooltipContainer.value = container;

			tooltip = new Popup({
				offset: props.tooltipOptions?.offset ?? 16,
				closeButton: false,
				closeOnClick: true,
				maxWidth: props.tooltipOptions?.maxWidth ?? "none"
			}).setDOMContent(container);

			el.addEventListener("mouseenter", () => {
				if (mapInstance.value && marker && tooltip) {
					tooltip.setLngLat(marker.getLngLat()).addTo(mapInstance.value);
				}
			});
			el.addEventListener("mouseleave", () => {
				tooltip?.remove();
			});
		}

		// Add to map when available
		if (mapInstance.value) {
			marker.addTo(mapInstance.value);
		}
	});

	// Watch for map instance becoming available
	watch(mapInstance, (map) => {
		if (map && marker) {
			marker.addTo(map);
		}
	});

	// Watch for position changes
	watch([() => props.longitude, () => props.latitude], ([lng, lat]) => {
		marker?.setLngLat([lng, lat]);
	});

	// Watch for draggable changes
	watch(() => props.draggable, (draggable) => {
		marker?.setDraggable(draggable);
	});

	// Watch for offset changes
	watch(() => props.offset, (offset) => {
		if (offset) {
			marker?.setOffset(offset);
		}
	});

	// Watch for rotation changes
	watch(() => props.rotation, (rotation) => {
		marker?.setRotation(rotation);
	});

	// Watch for opacity changes
	watch(() => props.opacity, (opacity) => {
		if (markerElement.value && opacity) {
			markerElement.value.style.opacity = opacity;
		}
	});

	function closePopup() {
		popup?.remove();
	}

	onUnmounted(() => {
		tooltip?.remove();
		popup?.remove();
		marker?.remove();
		marker = null;
		popup = null;
		tooltip = null;
	});
</script>
