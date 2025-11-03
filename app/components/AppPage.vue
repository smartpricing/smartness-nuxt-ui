<template>
	<UDashboardPanel v-bind="panelProps">
		<template #header="headerData">
			<slot name="header" v-bind="headerData">
				<UDashboardNavbar v-bind="navbarProps" />
			</slot>
		</template>
		<template #body="bodyData">
			<slot v-bind="bodyData" />
		</template>
		<template #footer="footerData">
			<slot name="footer" v-bind="footerData" />
		</template>
	</UDashboardPanel>
</template>

<script setup lang="ts">
	import type { DashboardNavbarProps, DashboardPanelProps } from "@nuxt/ui";

	defineProps<{
		panelProps?: Partial<DashboardPanelProps>
		navbarProps?: Partial<DashboardNavbarProps>
	}>();
</script>
