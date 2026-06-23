<template>
	<div :class="resolvedUi.root">
		<slot name="background">
			<SAuthBackground :chevrons="chevrons" />
		</slot>

		<div v-if="hasTopRight" :class="resolvedUi.topRight">
			<slot name="top-right" />
		</div>

		<main :class="resolvedUi.main">
			<slot />
		</main>

		<div v-if="hasBottom" :class="resolvedUi.bottom">
			<slot name="bottom" />
		</div>
	</div>
</template>

<script setup lang="ts">
	type Corner = "top-left" | "top-right" | "bottom-left" | "bottom-right";

	const props = withDefaults(defineProps<{
		/** Which corners show chevron decorations. */
		chevrons?: Corner[]
		ui?: {
			root?: string
			topRight?: string
			main?: string
			bottom?: string
		}
	}>(), {
		chevrons: () => ["top-left", "bottom-right"]
	});

	const defaultUi = {
		root: "relative min-h-screen overflow-hidden bg-primary-50",
		topRight: "absolute right-6 top-6 z-20",
		main: "relative z-10 min-h-screen",
		bottom: "pointer-events-none absolute inset-x-0 bottom-0 z-20 px-6 pb-4 text-center"
	};

	const resolvedUi = computed(() => ({
		root: props.ui?.root ?? defaultUi.root,
		topRight: props.ui?.topRight ?? defaultUi.topRight,
		main: props.ui?.main ?? defaultUi.main,
		bottom: props.ui?.bottom ?? defaultUi.bottom
	}));

	const slots = useSlots();
	const hasTopRight = computed(() => !!slots["top-right"]);
	const hasBottom = computed(() => !!slots.bottom);
</script>
