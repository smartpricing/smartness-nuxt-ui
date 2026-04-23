<template>
	<UDashboardGroup
		:storage="storage ?? 'local'"
		:storage-key="storageKey"
		unit="rem"
	>
		<UDashboardSidebar
			id="navigation-sidebar"
			v-model:collapsed="collapsed"
			v-model:open="open"
			collapsible
			toggle-side="right"
			:default-size="16"
			:max-size="16"
			:min-size="16"
			:resizable="resizable"
		>
			<template #header="{ collapsed: isCollapsed }">
				<div class="flex w-full items-center justify-between">
					<slot name="sidebar-logo" :collapsed="isCollapsed">
						<img v-show="!isCollapsed" :src="logoFullSrc" alt="Smartness" class="h-8">
					</slot>
					<UDashboardSidebarCollapse data-testid="sidebar-collapse" />
				</div>
			</template>
			<template #default="{ collapsed: isCollapsed }">
				<slot name="sidebar-header" :collapsed="isCollapsed" />
				<UNavigationMenu
					:items="items"
					:collapsed="isCollapsed"
					orientation="vertical"
					data-testid="product-navigation-menu"
					tooltip
					popover
				/>
				<slot name="sidebar-footer" :collapsed="isCollapsed" />
			</template>
		</UDashboardSidebar>

		<slot />
	</UDashboardGroup>
</template>

<script setup lang="ts">
	import type { DashboardGroupProps, DashboardSidebarProps, NavigationMenuItem } from "@nuxt/ui";

	withDefaults(
		defineProps<{
			items: NavigationMenuItem[] | NavigationMenuItem[][]
			storage?: DashboardGroupProps["storage"]
			/** When `collapsible`, sidebar width is persisted; bump this if `default-size` / `unit` changes and old localStorage ignores the new width. Key used: `{storageKey}-sidebar-{id}`. */
			storageKey?: DashboardGroupProps["storageKey"]
			resizable?: DashboardSidebarProps["resizable"]
		}>(),
		{
			// v2: invalidates pre-rem / pre-16 layout entries so `default-size` + `unit="rem"` apply
			storageKey: "smartness-navigation-v2"
		}
	);

	const collapsed = defineModel<boolean>("collapsed");
	const open = defineModel<boolean>("open");

	const logoFullSrc = new URL("../../assets/images/smartness_full.svg", import.meta.url).href;
</script>
