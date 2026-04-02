<template>
	<UDashboardPanel v-bind="panelProps">
		<template #header="headerData">
			<slot name="header" v-bind="headerData">
				<slot v-if="$slots['navbar-topbar']" name="navbar-top">
					<UDashboardToolbar>
						<slot name="navbar-topbar" />
					</UDashboardToolbar>
				</slot>
				<UDashboardNavbar v-bind="navbarProps">
					<template v-if="$slots['navbar-leading']" #leading="leadingData">
						<slot name="navbar-leading" v-bind="leadingData" />
					</template>
					<template v-if="$slots['navbar-title']" #title="titleData">
						<slot name="navbar-title" v-bind="titleData" />
					</template>
					<template v-if="$slots['navbar-trailing']" #trailing="trailingData">
						<slot name="navbar-trailing" v-bind="trailingData" />
					</template>
					<template v-if="$slots['navbar-toggle']" #toggle="toggleData">
						<slot name="navbar-toggle" v-bind="toggleData" />
					</template>
					<template v-if="$slots['navbar-right']" #right="rightData">
						<slot name="navbar-right" v-bind="rightData" />
					</template>
					<template v-if="$slots['navbar-left']" #left="leftData">
						<slot name="navbar-left" v-bind="leftData" />
					</template>
					<template v-if="$slots.navbar" #default="defaultData">
						<slot name="navbar" v-bind="defaultData" />
					</template>
				</UDashboardNavbar>
				<slot v-if="$slots['navbar-bottombar']" name="navbar-bottom">
					<UDashboardToolbar>
						<slot name="navbar-bottombar" />
					</UDashboardToolbar>
				</slot>
			</slot>
		</template>
		<template #body="bodyData">
			<slot v-bind="bodyData" />
		</template>
		<template v-if="$slots.footer" #footer="footerData">
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
