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

		<UDashboardPanel v-bind="panelProps ?? {}">
			<template v-if="$slots.header" #header>
				<slot name="header" />
			</template>
			<template #body="bodyData">
				<slot v-bind="bodyData" />
			</template>
			<template v-if="$slots.footer" #footer="footerData">
				<slot name="footer" v-bind="footerData" />
			</template>
		</UDashboardPanel>
	</UDashboardGroup>
</template>

<script setup lang="ts">
	import type { DashboardPanelProps, NavigationMenuItem } from "@nuxt/ui";

	defineProps<{
		items: NavigationMenuItem[] | NavigationMenuItem[][]
		/** Forwarded to `UDashboardPanel` (e.g. `id`, `ui`, Nuxt UI panel options). */
		panelProps?: Partial<DashboardPanelProps> & Record<string, unknown>
	}>();

	const collapsed = defineModel<boolean>("collapsed");
	const open = defineModel<boolean>("open");
</script>
