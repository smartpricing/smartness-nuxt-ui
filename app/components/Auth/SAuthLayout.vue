<template>
	<div :class="ui.root({ class: [props.ui?.root, props.class] })">
		<slot name="background">
			<SAuthBackground :chevrons="chevrons" />
		</slot>

		<div v-if="hasTopRight" :class="ui.topRight({ class: props.ui?.topRight })">
			<slot name="top-right" />
		</div>

		<main :class="ui.main({ class: props.ui?.main })">
			<slot />
		</main>

		<div v-if="hasBottom" :class="ui.bottom({ class: props.ui?.bottom })">
			<slot name="bottom" />
		</div>
	</div>
</template>

<script setup lang="ts">
	import { tv } from "@nuxt/ui/utils/tv";

	type Corner = "top-left" | "top-right" | "bottom-left" | "bottom-right";

	const props = withDefaults(defineProps<{
		/** Which corners show chevron decorations. */
		chevrons?: Corner[]
		class?: string
		ui?: Partial<Record<keyof typeof theme.slots, string>>
	}>(), {
		chevrons: () => ["top-left", "bottom-right"]
	});

	const theme = {
		slots: {
			root: "relative min-h-screen overflow-hidden bg-primary-50",
			topRight: "absolute right-6 top-6 z-20",
			main: "relative z-10 min-h-screen",
			bottom: "pointer-events-none absolute inset-x-0 bottom-0 z-20 px-6 pb-4 text-center"
		}
	};

	const authLayout = tv(theme);
	const ui = authLayout();

	const slots = useSlots();
	const hasTopRight = computed(() => !!slots["top-right"]);
	const hasBottom = computed(() => !!slots.bottom);
</script>
