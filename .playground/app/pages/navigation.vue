<template>
	<UDashboardGroup storage="local" storage-key="smartness-demo">
		<!-- Navigation Sidebar -->
		<NavigationShell
			v-model:selected-product="currentProduct"
			:products="products"
			:items="navigationItems"
		/>

		<!-- Main Panel -->
		<UDashboardPanel>
			<!-- Optional navbar -->

			<!-- Main Content Area -->
			<UContainer class="py-8 space-y-8">
				<!-- Header -->
				<div class="space-y-2">
					<h1 class="text-3xl font-bold text-gray-900 dark:text-white">
						Navigation Demo
					</h1>
					<p class="text-gray-600 dark:text-gray-400">
						Showcasing the NavigationShell component with Nuxt UI Dashboard components
					</p>
				</div>

				<!-- Current Product Info -->
				<UCard>
					<template #header>
						<h2 class="text-xl font-semibold">
							Current Product
						</h2>
					</template>

					<div class="space-y-4">
						<div>
							<span class="text-sm text-gray-600 dark:text-gray-400">Active Product:</span>
							<span class="ml-2 text-lg font-semibold text-primary-600 dark:text-primary-400">
								{{ products.find(p => p.id === currentProduct)?.label }}
							</span>
						</div>

						<div>
							<span class="text-sm text-gray-600 dark:text-gray-400">Current Route:</span>
							<code class="ml-2 px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-sm">
								{{ route.path }}
							</code>
						</div>
					</div>
				</UCard>

				<!-- Features List -->
				<UCard>
					<template #header>
						<h2 class="text-xl font-semibold">
							Features
						</h2>
					</template>

					<ul class="space-y-3">
						<li class="flex items-start gap-3">
							<UIcon
								name="i-heroicons-check-circle"
								class="size-5 text-success-500 shrink-0 mt-0.5"
							/>
							<div>
								<strong>Product Switcher:</strong>
								<span class="text-gray-600 dark:text-gray-400">
									Dropdown menu to switch between PMS, Pricing, Chat, and Connect
								</span>
							</div>
						</li>
						<li class="flex items-start gap-3">
							<UIcon
								name="i-heroicons-check-circle"
								class="size-5 text-success-500 shrink-0 mt-0.5"
							/>
							<div>
								<strong>Collapsible Sidebar:</strong>
								<span class="text-gray-600 dark:text-gray-400">
									Click the collapse button to switch between full and icon-only mode
								</span>
							</div>
						</li>
						<li class="flex items-start gap-3">
							<UIcon
								name="i-heroicons-check-circle"
								class="size-5 text-success-500 shrink-0 mt-0.5"
							/>
							<div>
								<strong>Nested Navigation:</strong>
								<span class="text-gray-600 dark:text-gray-400">
									Accordion-style nested menu items with multiple levels
								</span>
							</div>
						</li>
						<li class="flex items-start gap-3">
							<UIcon
								name="i-heroicons-check-circle"
								class="size-5 text-success-500 shrink-0 mt-0.5"
							/>
							<div>
								<strong>State Persistence:</strong>
								<span class="text-gray-600 dark:text-gray-400">
									Collapsed state and expanded groups are saved to localStorage
								</span>
							</div>
						</li>
						<li class="flex items-start gap-3">
							<UIcon
								name="i-heroicons-check-circle"
								class="size-5 text-success-500 shrink-0 mt-0.5"
							/>
							<div>
								<strong>Active State:</strong>
								<span class="text-gray-600 dark:text-gray-400">
									Current route is automatically highlighted in the navigation
								</span>
							</div>
						</li>
						<li class="flex items-start gap-3">
							<UIcon
								name="i-heroicons-check-circle"
								class="size-5 text-success-500 shrink-0 mt-0.5"
							/>
							<div>
								<strong>Badges:</strong>
								<span class="text-gray-600 dark:text-gray-400">
									Support for notification badges on menu items
								</span>
							</div>
						</li>
						<li class="flex items-start gap-3">
							<UIcon
								name="i-heroicons-check-circle"
								class="size-5 text-success-500 shrink-0 mt-0.5"
							/>
							<div>
								<strong>Mobile Responsive:</strong>
								<span class="text-gray-600 dark:text-gray-400">
									Hidden by default on mobile with hamburger menu toggle
								</span>
							</div>
						</li>
						<li class="flex items-start gap-3">
							<UIcon
								name="i-heroicons-check-circle"
								class="size-5 text-success-500 shrink-0 mt-0.5"
							/>
							<div>
								<strong>Hybrid Routing:</strong>
								<span class="text-gray-600 dark:text-gray-400">
									Supports both internal NuxtLink and external links (see Help & Support)
								</span>
							</div>
						</li>
					</ul>
				</UCard>

				<!-- Sample Content Cards -->
				<div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
					<UCard
						v-for="i in 6"
						:key="i"
					>
						<template #header>
							<h3 class="font-semibold">
								Sample Card {{ i }}
							</h3>
						</template>
						<p class="text-sm text-gray-600 dark:text-gray-400">
							This is sample content to demonstrate the scrollable content area.
							The navigation remains fixed while content scrolls.
						</p>
					</UCard>
				</div>
			</UContainer>
		</UDashboardPanel>
	</UDashboardGroup>
</template>

<script setup lang="ts">
	import type { NavigationMenuItem } from "@nuxt/ui";
	import type { NavigationProduct } from "../../../app/types/navigation";

	// Define sample products for the Smartness suite
	const products: NavigationProduct[] = [
		{
			id: "pms",
			label: "SmartPms",
			icon: "i-heroicons-building-office",
			description: "Manage your properties"
		},
		{
			id: "pricing",
			label: "SmartPricing",
			icon: "i-heroicons-currency-dollar",
			description: "Dynamic pricing engine"
		},
		{
			id: "chat",
			label: "SmartChat",
			icon: "i-heroicons-chat-bubble-left-right",
			description: "Guest communication"
		},
		{
			id: "connect",
			label: "SmartConnect",
			icon: "i-heroicons-link",
			description: "Channel integrations"
		}
	];

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
			to: "/navigation/properties",
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
			to: "/navigation/bookings",
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
			to: "/navigation/reports",
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
	const currentProduct = ref(route.query.product as string || "pms");
</script>
