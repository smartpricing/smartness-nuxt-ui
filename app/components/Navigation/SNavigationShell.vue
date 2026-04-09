<template>
	<UDashboardGroup :storage="storage ?? 'local'" storage-key="smartness-navigation" unit="rem">
		<UDashboardSidebar
			id="navigation-sidebar"
			v-model:collapsed="collapsed"
			v-model:open="open"
			collapsible
			toggle-side="right"
			:default-size="20"
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
					:collapsed="collapsed"
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
	import type { DashboardGroupProps, NavigationMenuItem } from "@nuxt/ui";

	defineProps<{
		items: NavigationMenuItem[] | NavigationMenuItem[][]
		storage?: DashboardGroupProps["storage"]
	}>();

	const collapsed = defineModel<boolean>("collapsed");
	const open = defineModel<boolean>("open");

	const logoFullSrc = new URL("../../assets/images/smartness_full.svg", import.meta.url).href;
</script>
