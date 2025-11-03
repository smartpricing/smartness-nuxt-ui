<template>
	<!-- Navigation Sidebar -->
	<NavigationShell
		v-model:selected-product="currentProduct"
		:products="['pricing', 'chat', 'connect']"
		:items="navigationItems"
	>
		<!-- Main Panel -->
		<AppPage>
			<UContainer>
				<div class="w-full h-full p-4 inline-flex bg-red-100" />
			</UContainer>
		</AppPage>
	</NavigationShell>
</template>

<script setup lang="ts">
	import type { NavigationMenuItem } from "@nuxt/ui";

	import type { SuiteProduct } from "../../../app/types/suite";

	// Define sample navigation items using Nuxt UI NavigationMenuItem format
	const navigationItems: NavigationMenuItem[][] = [[
		{
			label: "Dashboard",
			icon: "i-heroicons-home",
			to: "/navigation/dashboard"
		},
		{
			label: "Properties",
			icon: "i-heroicons-building-office-2",
			badge: "12",
			children: [
				{
					label: "All Properties",
					icon: "i-heroicons-queue-list",
					description: "View all your properties",
					to: "/navigation/properties/all"
				},
				{
					label: "Add Property",
					icon: "i-heroicons-plus-circle",
					description: "Add a new property",
					to: "/navigation/properties/add"
				},
				{
					label: "Property Types",
					icon: "i-heroicons-squares-2x2",
					description: "Manage property types"
				}
			]
		},
		{
			label: "Bookings",
			icon: "i-heroicons-calendar-days",
			badge: "3",
			children: [
				{
					label: "All Bookings",
					icon: "i-heroicons-queue-list",
					description: "View all bookings",
					to: "/navigation/bookings/all"
				},
				{
					label: "Pending",
					icon: "i-heroicons-clock",
					description: "Pending confirmations",
					to: "/navigation/bookings/pending"
				},
				{
					label: "Confirmed",
					icon: "i-heroicons-check-circle",
					description: "Confirmed bookings",
					to: "/navigation/bookings/confirmed"
				}
			]
		},
		{
			label: "Guests",
			icon: "i-heroicons-users",
			to: "/navigation/guests"
		},
		{
			label: "Reports",
			icon: "i-heroicons-chart-bar",
			children: [
				{
					label: "Revenue Reports",
					icon: "i-heroicons-currency-dollar",
					description: "Financial reports",
					to: "/navigation/reports/revenue"
				},
				{
					label: "Occupancy Reports",
					icon: "i-heroicons-chart-pie",
					description: "Property occupancy",
					to: "/navigation/reports/occupancy"
				},
				{
					label: "Performance",
					icon: "i-heroicons-presentation-chart-line",
					description: "Overall performance",
					to: "/navigation/reports/performance"
				}
			]
		},
		{
			label: "Settings",
			icon: "i-heroicons-cog-6-tooth",
			to: "/navigation/settings"
		}
	], [
		{
			label: "Help & Support",
			icon: "i-heroicons-question-mark-circle",
			to: "https://docs.smartness.io",
			target: "_blank"
		}
	]];

	// Get current product from query param
	const route = useRoute();
	const currentProduct = ref(route.query.product as SuiteProduct || "pms");
</script>
