<template>
	<div class="space-y-6">
		<!-- Dynamic Component -->
		<component
			:is="showcaseComponent"
			v-if="showcaseComponent"
		/>

		<!-- 404 State -->
		<div
			v-else
			class="flex flex-col items-center justify-center py-20"
		>
			<UIcon
				name="i-heroicons-exclamation-triangle"
				class="size-16 text-warning mb-4"
			/>
			<h2 class="text-xl font-semibold mb-2">
				Component Not Found
			</h2>
			<p class="text-muted mb-4">
				The showcase "{{ slug }}" does not exist.
			</p>
			<NuxtLink to="/">
				<UButton
					icon="i-heroicons-arrow-left"
					variant="outline"
				>
					Back to Overview
				</UButton>
			</NuxtLink>
		</div>
	</div>
</template>

<script setup lang="ts">
	const route = useRoute();
	const slug = computed(() => route.params.slug as string);

	// Capitalize first letter to match component naming convention
	const componentTitle = computed(() => {
		const s = slug.value;
		return s.charAt(0).toUpperCase() + s.slice(1);
	});

	// Map of available showcase components
	const showcaseComponents: Record<string, ReturnType<typeof defineAsyncComponent>> = {
		alerts: defineAsyncComponent(() => import("../components/Showcase/Alerts.vue")),
		buttons: defineAsyncComponent(() => import("../components/Showcase/Buttons.vue")),
		dataviz: defineAsyncComponent(() => import("../components/Showcase/Dataviz.vue")),
		header: defineAsyncComponent(() => import("../components/Showcase/Header.vue")),
		navigation: defineAsyncComponent(() => import("../components/Showcase/Navigation.vue")),
		select: defineAsyncComponent(() => import("../components/Showcase/Select.vue")),
		switch: defineAsyncComponent(() => import("../components/Showcase/Switch.vue")),
		tables: defineAsyncComponent(() => import("../components/Showcase/Tables.vue")),
		tabs: defineAsyncComponent(() => import("../components/Showcase/Tabs.vue"))
	};

	// Get the component for the current slug
	const showcaseComponent = computed(() => {
		return showcaseComponents[slug.value.toLowerCase()] ?? null;
	});

	// Set page title
	useHead({
		title: () => `${componentTitle.value} - Smartness UI`
	});
</script>
