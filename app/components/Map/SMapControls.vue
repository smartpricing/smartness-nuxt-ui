<template>
	<div
		class="absolute z-10 flex flex-col gap-1.5" :class="[
			positionClasses[position],
		]"
	>
		<!-- Zoom controls -->
		<div
			v-if="showZoom"
			class="flex flex-col rounded-md border border-gray-200 bg-white shadow-sm overflow-hidden [&>button:not(:last-child)]:border-b [&>button:not(:last-child)]:border-gray-200"
		>
			<button
				type="button"
				class="flex items-center justify-center size-8 hover:bg-gray-100 transition-colors"
				aria-label="Zoom in"
				@click="handleZoomIn"
			>
				<UIcon
					name="ph:plus"
					class="size-4"
				/>
			</button>
			<button
				type="button"
				class="flex items-center justify-center size-8 hover:bg-gray-100 transition-colors"
				aria-label="Zoom out"
				@click="handleZoomOut"
			>
				<UIcon
					name="ph:minus"
					class="size-4"
				/>
			</button>
		</div>

		<!-- Compass -->
		<div
			v-if="showCompass"
			class="flex flex-col rounded-md border border-gray-200 bg-white shadow-sm overflow-hidden"
		>
			<button
				type="button"
				class="flex items-center justify-center size-8 hover:bg-gray-100 transition-colors"
				aria-label="Reset bearing to north"
				@click="handleResetBearing"
			>
				<svg
					ref="compassRef"
					viewBox="0 0 24 24"
					class="size-5 transition-transform duration-200"
					:style="{ transformStyle: 'preserve-3d' }"
				>
					<path
						d="M12 2L16 12H12V2Z"
						class="fill-red-500"
					/>
					<path
						d="M12 2L8 12H12V2Z"
						class="fill-red-300"
					/>
					<path
						d="M12 22L16 12H12V22Z"
						class="fill-gray-400"
					/>
					<path
						d="M12 22L8 12H12V22Z"
						class="fill-gray-300"
					/>
				</svg>
			</button>
		</div>

		<!-- Locate -->
		<div
			v-if="showLocate"
			class="flex flex-col rounded-md border border-gray-200 bg-white shadow-sm overflow-hidden"
		>
			<button
				type="button"
				class="flex items-center justify-center size-8 hover:bg-gray-100 transition-colors"
				:class="{ 'opacity-50 pointer-events-none': waitingForLocation }"
				:disabled="waitingForLocation"
				aria-label="Find my location"
				@click="handleLocate"
			>
				<UIcon
					v-if="!waitingForLocation"
					name="ph:crosshair"
					class="size-4"
				/>
				<UIcon
					v-else
					name="ph:spinner"
					class="size-4 animate-spin"
				/>
			</button>
		</div>

		<!-- Fullscreen -->
		<div
			v-if="showFullscreen"
			class="flex flex-col rounded-md border border-gray-200 bg-white shadow-sm overflow-hidden"
		>
			<button
				type="button"
				class="flex items-center justify-center size-8 hover:bg-gray-100 transition-colors"
				aria-label="Toggle fullscreen"
				@click="handleFullscreen"
			>
				<UIcon
					:name="isFullscreen ? 'ph:arrows-in' : 'ph:arrows-out'"
					class="size-4"
				/>
			</button>
		</div>
	</div>
</template>

<script setup lang="ts">
	import type { SMapControlsProps } from "./types";
	import { inject, onMounted, onUnmounted, ref } from "vue";
	import { MAP_INSTANCE } from "./types";

	const props = withDefaults(defineProps<SMapControlsProps>(), {
		position: "bottom-right",
		showZoom: true,
		showCompass: false,
		showLocate: false,
		showFullscreen: false
	});

	const emit = defineEmits<{
		locate: [coords: { longitude: number, latitude: number }]
	}>();

	const positionClasses = {
		"top-left": "top-2 left-2",
		"top-right": "top-2 right-2",
		"bottom-left": "bottom-2 left-2",
		"bottom-right": "bottom-10 right-2"
	} as const;

	const mapInstance = inject(MAP_INSTANCE)!;
	const compassRef = ref<SVGSVGElement | null>(null);
	const waitingForLocation = ref(false);
	const isFullscreen = ref(false);

	function onFullscreenChange() {
		isFullscreen.value = !!document.fullscreenElement;
	}

	function handleZoomIn() {
		mapInstance.value?.zoomTo(mapInstance.value.getZoom() + 1, { duration: 300 });
	}

	function handleZoomOut() {
		mapInstance.value?.zoomTo(mapInstance.value.getZoom() - 1, { duration: 300 });
	}

	function handleResetBearing() {
		mapInstance.value?.resetNorthPitch({ duration: 300 });
	}

	function handleLocate() {
		if (!("geolocation" in navigator)) return;
		waitingForLocation.value = true;

		navigator.geolocation.getCurrentPosition(
			(pos) => {
				const coords = {
					longitude: pos.coords.longitude,
					latitude: pos.coords.latitude
				};
				mapInstance.value?.flyTo({
					center: [coords.longitude, coords.latitude],
					zoom: 14,
					duration: 1500
				});
				emit("locate", coords);
				waitingForLocation.value = false;
			},
			(error) => {
				console.error("Error getting location:", error);
				waitingForLocation.value = false;
			}
		);
	}

	function handleFullscreen() {
		const container = mapInstance.value?.getContainer();
		if (!container) return;
		if (document.fullscreenElement) {
			document.exitFullscreen();
		} else {
			container.requestFullscreen();
		}
	}

	// Compass rotation sync
	function updateCompassRotation() {
		if (!compassRef.value || !mapInstance.value) return;
		const bearing = mapInstance.value.getBearing();
		const pitch = mapInstance.value.getPitch();
		compassRef.value.style.transform = `rotateX(${pitch}deg) rotateZ(${-bearing}deg)`;
	}

	onMounted(() => {
		if (props.showCompass && mapInstance.value) {
			mapInstance.value.on("rotate", updateCompassRotation);
			mapInstance.value.on("pitch", updateCompassRotation);
			updateCompassRotation();
		}
		if (props.showFullscreen) {
			document.addEventListener("fullscreenchange", onFullscreenChange);
		}
	});

	onUnmounted(() => {
		if (mapInstance.value) {
			mapInstance.value.off("rotate", updateCompassRotation);
			mapInstance.value.off("pitch", updateCompassRotation);
		}
		document.removeEventListener("fullscreenchange", onFullscreenChange);
	});
</script>
