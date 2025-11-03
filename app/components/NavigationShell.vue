<template>
	<UDashboardGroup storage="local" storage-key="smartness-navigation" unit="rem">
		<UDashboardSidebar
			id="navigation-sidebar"
			v-model:collapsed="collapsed"
			v-model:open="open"
			collapsible
			:default-size="20"
		>
			<template #header="{ collapsed: isCollapsed }">
				<div class="flex items-center">
					<img v-if="isCollapsed" class="size-8" src="../assets/images/smartness_icon.svg" alt="Smartness">
					<img v-else src="../assets/images/smartness_full.svg" alt="Smartness" class="h-8">
				</div>
			</template>
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
					tooltip
					popover
				/>
			</template>

			<template #footer>
				<UDashboardSidebarCollapse />
			</template>
		</UDashboardSidebar>

		<slot />
	</UDashboardGroup>
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
	}

	defineProps<Props>();

	const collapsed = defineModel<boolean>("collapsed");
	const open = defineModel<boolean>("open");

	const selectedProduct = defineModel<string>("selectedProduct");
</script>
