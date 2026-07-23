<template>
	<div :class="isGrouped ? 'border-r border-default shrink-0' : undefined">
		<UNavigationMenu
			orientation="vertical"
			:items="items"
			:ui="mergedUi"
		/>
		<slot />
	</div>
</template>

<script lang="ts" setup>
	import type { NavigationMenuItem, NavigationMenuProps } from "#ui/types";

	const props = defineProps<{
		items: NavigationMenuItem[] | NavigationMenuItem[][]
		ui?: NavigationMenuProps["ui"]
	}>();

	const isGrouped = computed(() => Array.isArray(props.items[0]));

	const mergedUi = computed<NavigationMenuProps["ui"]>(() => {
		if (!isGrouped.value) {
			return props.ui;
		}
		return {
			...props.ui,
			separator: mergeSlot("hidden", props.ui?.separator),
			list: mergeSlot("last:ms-5 last:border-s last:border-default last:ps-1.5", props.ui?.list)
		};
	});
</script>
