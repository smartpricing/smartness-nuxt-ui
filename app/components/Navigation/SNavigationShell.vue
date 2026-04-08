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
					<img v-show="!isCollapsed" src="../../assets/images/smartness_full.svg" alt="Smartness" class="h-8">
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
	import type { NavigationMenuItem } from "@nuxt/ui";

	defineProps<{
		items: NavigationMenuItem[] | NavigationMenuItem[][]
		ui?: Partial<typeof defaultUi>
	}>();

	const defaultUi = {
		root: "",
		sidebar: "",
		sidebarHeader: ""
	};

	void defaultUi;

	const collapsed = defineModel<boolean>("collapsed");
	const open = defineModel<boolean>("open");
</script>
