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
				<div class="flex w-full items-center justify-between">
					<img v-show="!isCollapsed" src="../assets/images/smartness_full.svg" alt="Smartness" class="h-8">
					<UDashboardSidebarCollapse />
				</div>
			</template>
			<template #default="{ collapsed: isCollapsed }">
				<ProductSwitcher
					v-if="products && products.length > 0"
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
		</UDashboardSidebar>

		<slot />
	</UDashboardGroup>
</template>

<script setup lang="ts">
	import type { NavigationMenuItem } from "@nuxt/ui";
	import type { SuiteProduct } from "../types/suite";
	import ProductSwitcher from "./Navigation/ProductSwitcher.vue";

	interface Props {
		/**
		 * List of available products for the product switcher
		 */
		products?: SuiteProduct[]

		/**
		 * Navigation menu items (Nuxt UI format)
		 */
		items: NavigationMenuItem[] | NavigationMenuItem[][]
	}

	defineProps<Props>();

	const collapsed = defineModel<boolean>("collapsed");
	const open = defineModel<boolean>("open");

	const selectedProduct = defineModel<SuiteProduct>("selectedProduct");
</script>
