<template>
	<UDashboardSidebar
		v-model:collapsed="collapsed"
		collapsible
	>
		<template #header="{ collapsed: isCollapsed }">
			<img v-if="isCollapsed" src="../assets/images/smartness_icon.svg" alt="Smartness" class="w-full h-full">
			<img v-else src="../assets/images/smartness_full.svg" alt="Smartness" class="w-full h-full">
		</template>
		<!-- Body: Navigation Menu -->
		<template #default="{ collapsed: isCollapsed }">
			<ProductSwitcher
				v-model="selectedProduct"
				:products="products"
				:collapsed="isCollapsed"
			/>
			<UNavigationMenu
				:items="items"
				:collapsed="collapsed"
				orientation="vertical"
				:tooltip="{ delayDuration: 0, content: { side: 'right' } }"
				:popover="{ mode: 'hover', content: { side: 'right', align: 'start' } }"
			/>
		</template>

		<!-- Footer: Collapse Button -->
		<template #footer>
			<UDashboardSidebarCollapse />
		</template>
	</UDashboardSidebar>
</template>

<script setup lang="ts">
	import type { NavigationMenuItem } from "@nuxt/ui";
	import type { NavigationProduct } from "../types/navigation";
	import ProductSwitcher from "./Navigation/ProductSwitcher.vue";

	interface Props {
		/**
		 * List of available products for the product switcher
		 */
		products: NavigationProduct[]

		/**
		 * Navigation menu items (Nuxt UI format)
		 */
		items: NavigationMenuItem[] | NavigationMenuItem[][]

		/**
		 * Whether the navigation is collapsed (icon-only mode)
		 */
		collapsed?: boolean
	}

	defineProps<Props>();

	const collapsed = defineModel<boolean>("collapsed");

	const selectedProduct = defineModel<string>("selectedProduct");
</script>
