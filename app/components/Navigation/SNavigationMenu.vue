<template>
	<div :class="isGrouped ? 'border-r border-default shrink-0 w-[250px] p-4' : undefined">
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
	import { defu } from "defu";

	const props = defineProps<{
		items: NavigationMenuItem[] | NavigationMenuItem[][]
		ui?: NavigationMenuProps["ui"]
	}>();

	const isGrouped = computed(() => Array.isArray(props.items[0]));

	const groupedUi = computed<NavigationMenuProps["ui"]>(() => isGrouped.value
		? {
			separator: "hidden",
			list: "last:ms-5 last:border-s last:border-default last:ps-1.5",
		}
		: {});

	const mergedUi = computed(() => defu(props.ui, groupedUi.value));
</script>
