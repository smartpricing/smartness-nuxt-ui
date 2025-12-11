<template>
	<div class="space-y-8">
		<!-- Hero Section -->
		<div class="space-y-4">
			<h1 class="text-4xl font-bold">
				Smartness UI Components
			</h1>
			<p class="text-lg text-muted max-w-2xl">
				A design system and component library built on top of Nuxt UI,
				tailored for the Smartness suite of products.
			</p>
		</div>

		<!-- Quick Links -->
		<div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
			<NuxtLink
				v-for="component in components"
				:key="component.slug"
				:to="`/${component.slug}`"
				class="group"
			>
				<UCard class="h-full transition-all hover:border-primary hover:shadow-lg">
					<div class="flex items-start gap-4">
						<div class="rounded-lg bg-primary/10 p-3">
							<UIcon
								:name="component.icon"
								class="size-6 text-primary"
							/>
						</div>
						<div class="flex-1">
							<h3 class="font-semibold group-hover:text-primary transition-colors">
								{{ component.name }}
							</h3>
							<p class="text-sm text-muted mt-1">
								{{ component.description }}
							</p>
						</div>
						<UIcon
							name="i-heroicons-arrow-right"
							class="size-5 text-muted opacity-0 group-hover:opacity-100 transition-opacity"
						/>
					</div>
				</UCard>
			</NuxtLink>
		</div>

		<!-- Getting Started -->
		<UCard>
			<template #header>
				<div class="flex items-center gap-3">
					<UIcon
						name="i-heroicons-rocket-launch"
						class="size-6 text-primary"
					/>
					<h2 class="text-xl font-semibold">
						Getting Started
					</h2>
				</div>
			</template>

			<div class="space-y-4">
				<p class="text-muted">
					Smartness UI extends Nuxt UI with custom components and styling for the Smartness product suite.
					Browse the components using the sidebar navigation.
				</p>

				<div class="flex flex-wrap gap-3">
					<UButton
						icon="i-simple-icons-github"
						color="neutral"
						variant="outline"
						to="https://github.com/smartpricing/smartness-nuxt-ui/"
						target="_blank"
					>
						View on GitHub
					</UButton>
					<UButton
						icon="i-heroicons-book-open"
						color="neutral"
						variant="outline"
						to="https://ui.nuxt.com"
						target="_blank"
					>
						Nuxt UI Docs
					</UButton>
				</div>
			</div>
		</UCard>
	</div>
</template>

<script setup lang="ts">
	// Component list for quick links
	const components = [
		{
			name: "Alerts",
			slug: "alerts",
			icon: "i-heroicons-bell-alert",
			description: "Notification and alert components"
		},
		{
			name: "Buttons",
			slug: "buttons",
			icon: "i-heroicons-cursor-arrow-rays",
			description: "Button variants and styles"
		},
		{
			name: "Dataviz",
			slug: "dataviz",
			icon: "i-heroicons-chart-bar",
			description: "Data visualization with ECharts"
		},
		{
			name: "Header",
			slug: "header",
			icon: "i-heroicons-bars-3",
			description: "Application header component"
		},
		{
			name: "Navigation",
			slug: "navigation",
			icon: "i-heroicons-squares-2x2",
			description: "Sidebar navigation shell"
		},
		{
			name: "Select",
			slug: "select",
			icon: "i-heroicons-chevron-up-down",
			description: "Select and dropdown components"
		},
		{
			name: "Switch",
			slug: "switch",
			icon: "i-heroicons-arrow-path",
			description: "Toggle and switch components"
		}
	];

	useHead({
		title: "Smartness UI - Component Library"
	});
</script>
