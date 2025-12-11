<template>
	<NavigationShell
		v-model:selected-product="currentProduct"
		:items="navigationItems"
	>
		<AppPage>
			<UContainer class="py-8">
				<slot />
			</UContainer>
		</AppPage>
	</NavigationShell>
</template>

<script setup lang="ts">
	import type { NavigationMenuItem } from "@nuxt/ui";
	import type { SuiteProduct } from "../../../app/types/suite";

	const currentProduct = ref<SuiteProduct>("pms");

	// Navigation items for component showcases (alphabetically ordered)
	const navigationItems: NavigationMenuItem[][] = [
		[
			{
				label: "Overview",
				icon: "i-heroicons-home",
				to: "/"
			},
			{
				label: "Alerts",
				icon: "i-heroicons-bell-alert",
				to: "/alerts"
			},
			{
				label: "Buttons",
				icon: "i-heroicons-cursor-arrow-rays",
				to: "/buttons"
			},
			{
				label: "Dataviz",
				icon: "i-heroicons-chart-bar",
				to: "/dataviz"
			},
			{
				label: "Header",
				icon: "i-heroicons-bars-3",
				to: "/header"
			},
			{
				label: "Navigation",
				icon: "i-heroicons-squares-2x2",
				to: "/navigation"
			},
			{
				label: "Select",
				icon: "i-heroicons-chevron-up-down",
				to: "/select"
			},
			{
				label: "Switch",
				icon: "i-heroicons-arrow-path",
				to: "/switch"
			}
		],
		[
			{
				label: "GitHub",
				icon: "i-simple-icons-github",
				to: "https://github.com/smartpricing/smartness-nuxt-ui/",
				target: "_blank"
			}
		]
	];
</script>
