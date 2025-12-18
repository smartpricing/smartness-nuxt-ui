<template>
	<div
		ref="containerRef"
		class="space-y-12"
	>
		<section class="space-y-4">
			<ProseH1>{{ title }}</ProseH1>
			<p class="text-muted">
				{{ description }}
			</p>
		</section>
		<slot />
	</div>
</template>

<script setup lang="ts">
	import { useSections } from "~/composables/useSections";

	defineProps<{
		/** Title of the showcase page */
		title: string
		/** Description text for the component */
		description: string
	}>();

	const containerRef = ref<HTMLElement | null>(null);
	const { scanSections, clearSections } = useSections();

	onMounted(() => {
		// Use nextTick to ensure slot content is rendered
		nextTick(() => {
			scanSections(containerRef.value);
		});
	});

	onUnmounted(() => {
		clearSections();
	});
</script>
