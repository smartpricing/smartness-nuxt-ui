<template>
	<div class="bg-default border-r border-default shrink-0 w-[250px] p-4">
		<UNavigationMenu
			orientation="vertical"
			:items="items"
			:ui="ui"
		/>
		<slot />
	</div>
</template>

<script lang="ts" setup>
	import type { NavigationMenuItem } from "#ui/types";

	const props = defineProps<{
		items: NavigationMenuItem[] | NavigationMenuItem[][]
	}>();

	const isGrouped = computed(() => Array.isArray(props.items[0]));

	const ui = computed(() => isGrouped.value
		? {
			separator: "hidden",
			list: "last:ms-5 last:border-s last:border-default last:ps-1.5",
		}
		: undefined);
</script>
