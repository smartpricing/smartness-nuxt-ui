<template>
	<div
		ref="containerRef"
		:class="containerClass"
	>
		<slot v-if="isVisible" />
		<div
			v-else
			class="w-full h-full flex items-center justify-center bg-gray-50 text-sm text-muted"
		>
			<UIcon
				name="ph:map-pin"
				class="size-5 mr-2 opacity-50"
			/>
			Scroll to load map
		</div>
	</div>
</template>

<script setup lang="ts">
	import { onMounted, onUnmounted, ref } from "vue";

	defineProps<{
		containerClass?: string
	}>();

	const containerRef = ref<HTMLDivElement | null>(null);
	const isVisible = ref(false);

	let observer: IntersectionObserver | null = null;
	let destroyTimeout: ReturnType<typeof setTimeout> | null = null;

	function onVisibilityChange() {
		if (document.visibilityState === "hidden") {
			isVisible.value = false;
		} else if (containerRef.value) {
			const rect = containerRef.value.getBoundingClientRect();
			if (rect.bottom > 0 && rect.top < window.innerHeight) {
				isVisible.value = true;
			}
		}
	}

	onMounted(() => {
		if (!containerRef.value) return;

		observer = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (entry.isIntersecting) {
						if (destroyTimeout) {
							clearTimeout(destroyTimeout);
							destroyTimeout = null;
						}
						isVisible.value = true;
					} else {
						destroyTimeout = setTimeout(() => {
							isVisible.value = false;
						}, 500);
					}
				}
			},
			{ rootMargin: "200px" }
		);

		observer.observe(containerRef.value);
		document.addEventListener("visibilitychange", onVisibilityChange);
	});

	onUnmounted(() => {
		if (destroyTimeout) {
			clearTimeout(destroyTimeout);
			destroyTimeout = null;
		}
		observer?.disconnect();
		observer = null;
		document.removeEventListener("visibilitychange", onVisibilityChange);
	});
</script>
