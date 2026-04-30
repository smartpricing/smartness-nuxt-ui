<template>
	<div class="bg-default border-r border-default shrink-0 w-[250px] p-4">
		<UNavigationMenu
			orientation="vertical"
			:items="items"
			:ui="{
				separator: 'hidden',
				list: 'last:ms-5 last:border-s last:border-default last:ps-1.5',
			}"
		/>
		<slot />
	</div>
</template>

<script lang="ts" setup>
	import type { NavigationMenuItem } from "#ui/types";

	defineProps<{
		items: NavigationMenuItem[] | NavigationMenuItem[][]
	}>();
</script>
