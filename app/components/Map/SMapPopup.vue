<template>
	<Teleport
		v-if="container"
		:to="container"
	>
		<div class="relative rounded-md border border-gray-200 bg-white p-3 text-gray-900 shadow-md">
			<button
				v-if="closeButton"
				type="button"
				class="absolute top-1 right-1 z-10 rounded-sm opacity-70 transition-opacity hover:opacity-100"
				aria-label="Close popup"
				@click="handleClose"
			>
				<UIcon
					name="ph:x"
					class="size-4"
				/>
			</button>
			<slot />
		</div>
	</Teleport>
</template>

<script setup lang="ts">
	import type { Popup as PopupType } from "maplibre-gl";
	import type { SMapPopupProps } from "./types";
	import { Popup } from "maplibre-gl";
	import { inject, onMounted, onUnmounted, watch } from "vue";
	import { MAP_INSTANCE } from "./types";

	const props = withDefaults(defineProps<SMapPopupProps>(), {
		closeButton: false,
		offset: 16,
		maxWidth: "none"
	});

	const emit = defineEmits<{
		close: []
	}>();

	const mapInstance = inject(MAP_INSTANCE)!;

	const container = ref<HTMLDivElement | null>(null);
	let popup: PopupType | null = null;

	function handleClose() {
		popup?.remove();
	}

	onMounted(() => {
		const el = document.createElement("div");
		container.value = el;

		popup = new Popup({
			offset: props.offset,
			closeButton: false,
			maxWidth: props.maxWidth
		})
			.setDOMContent(el)
			.setLngLat([props.longitude, props.latitude]);

		popup!.on("close", () => emit("close"));

		if (mapInstance.value) {
			popup!.addTo(mapInstance.value);
		}
	});

	// Watch for map availability
	watch(mapInstance, (map) => {
		if (map && popup) {
			popup.addTo(map);
		}
	});

	// Watch for position changes
	watch([() => props.longitude, () => props.latitude], ([lng, lat]) => {
		popup?.setLngLat([lng, lat]);
	});

	// Watch for offset changes
	watch(() => props.offset, (offset) => {
		popup?.setOffset(offset);
	});

	onUnmounted(() => {
		popup?.remove();
		popup = null;
	});
</script>
