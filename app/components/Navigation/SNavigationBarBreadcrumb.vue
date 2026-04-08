<template>
	<div :class="resolvedUi.root">
		<slot name="left">
			<UBreadcrumb v-if="items" :items="items" />
		</slot>
		<slot name="right" />
	</div>
</template>

<script setup lang="ts">
	import type { BreadcrumbItem } from "@nuxt/ui";
	import { computed } from "vue";

	const props = defineProps<{
		items?: BreadcrumbItem[]
		ui?: Partial<typeof defaultUi>
	}>();

	const defaultUi = {
		root: "flex shrink-0 items-center justify-between gap-4 border-b border-default px-4 py-2"
	};

	const resolvedUi = computed(() => ({
		root: props.ui?.root ?? defaultUi.root
	}));
</script>
