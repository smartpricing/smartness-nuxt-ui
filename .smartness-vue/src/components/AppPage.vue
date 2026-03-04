<template>
	<UDashboardPanel v-bind="panelProps">
		<template #header="headerData">
			<slot name="header" v-bind="headerData">
				<UDashboardNavbar v-bind="navbarProps">
					<template #leading="leadingData">
						<slot name="navbar-leading" v-bind="leadingData" />
					</template>
					<template #title="titleData">
						<slot name="navbar-title" v-bind="titleData" />
					</template>
					<template #trailing="trailingData">
						<slot name="navbar-trailing" v-bind="trailingData" />
					</template>
					<template #toggle="toggleData">
						<slot name="navbar-toggle" v-bind="toggleData" />
					</template>
					<template #right="rightData">
						<slot name="navbar-right" v-bind="rightData" />
					</template>
					<template #left="leftData">
						<slot name="navbar-left" v-bind="leftData" />
					</template>
					<template #default="defaultData">
						<slot name="navbar" v-bind="defaultData" />
					</template>
				</UDashboardNavbar>
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
		panelProps?: Partial<DashboardPanelProps> & Record<string, unknown>
		navbarProps?: Partial<DashboardNavbarProps> & Record<string, unknown>
	}>();
</script>
