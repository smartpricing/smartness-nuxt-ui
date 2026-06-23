<template>
	<div :class="resolvedUi.root">
		<slot name="background">
			<SAuthBackground
				:left-position="leftPosition"
				:right-position="rightPosition"
				:left-size="leftSize"
				:right-size="rightSize"
			/>
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
	type Position = "top-left" | "top-right" | "bottom-left" | "bottom-right" | "center";

	const props = withDefaults(defineProps<{
		/** Where the smaller (variant "a") chevron sits. */
		leftPosition?: Position
		/** Where the larger (variant "b") chevron sits. */
		rightPosition?: Position
		/** Desktop width of the smaller chevron in pixels. */
		leftSize?: number
		/** Desktop width of the larger chevron in pixels. */
		rightSize?: number
		ui?: {
			root?: string
			topRight?: string
			main?: string
			bottom?: string
		}
	}>(), {
		leftPosition: "top-left",
		rightPosition: "bottom-right",
		leftSize: 650,
		rightSize: 1000
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
