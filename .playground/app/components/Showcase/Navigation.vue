<template>
	<ShowcasePage
		title="Navigation"
		description="The NavigationShell component provides a complete navigation solution built on top of Nuxt UI Dashboard components. It includes a collapsible sidebar, product switcher, and responsive mobile support."
	>
		<PropsTable :props="propsData" />

		<!-- Live Demo Note -->
		<section id="live-demo" class="space-y-4">
			<ProseH3>Live Demo</ProseH3>
			<UCard class="bg-primary-50 dark:bg-primary-950/20 border-primary">
				<div class="flex items-start gap-3">
					<UIcon
						name="i-heroicons-eye"
						class="size-6 text-primary shrink-0"
					/>
					<div>
						<h4 class="font-medium">
							You're viewing a live demo!
						</h4>
						<p class="text-sm text-muted">
							This entire playground uses NavigationShell. Try collapsing the sidebar,
							switching products, or viewing on mobile to see all features in action.
						</p>
					</div>
				</div>
			</UCard>
		</section>

		<!-- Features -->
		<section id="features" class="space-y-4">
			<ProseH3>Features</ProseH3>
			<div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
				<UCard>
					<div class="flex items-start gap-3">
						<UIcon
							name="i-heroicons-squares-2x2"
							class="size-6 text-primary shrink-0"
						/>
						<div>
							<h4 class="font-medium">
								Product Switcher
							</h4>
							<p class="text-sm text-muted">
								Switch between different Smartness products seamlessly
							</p>
						</div>
					</div>
				</UCard>

				<UCard>
					<div class="flex items-start gap-3">
						<UIcon
							name="i-heroicons-arrows-pointing-in"
							class="size-6 text-primary shrink-0"
						/>
						<div>
							<h4 class="font-medium">
								Collapsible Sidebar
							</h4>
							<p class="text-sm text-muted">
								Collapse the sidebar to save space, with tooltips on hover
							</p>
						</div>
					</div>
				</UCard>

				<UCard>
					<div class="flex items-start gap-3">
						<UIcon
							name="i-heroicons-device-phone-mobile"
							class="size-6 text-primary shrink-0"
						/>
						<div>
							<h4 class="font-medium">
								Mobile Responsive
							</h4>
							<p class="text-sm text-muted">
								Automatically adapts to mobile with a slide-out drawer
							</p>
						</div>
					</div>
				</UCard>

				<UCard>
					<div class="flex items-start gap-3">
						<UIcon
							name="i-heroicons-queue-list"
							class="size-6 text-primary shrink-0"
						/>
						<div>
							<h4 class="font-medium">
								Nested Menus
							</h4>
							<p class="text-sm text-muted">
								Support for multi-level navigation with child items
							</p>
						</div>
					</div>
				</UCard>

				<UCard>
					<div class="flex items-start gap-3">
						<UIcon
							name="i-heroicons-bookmark"
							class="size-6 text-primary shrink-0"
						/>
						<div>
							<h4 class="font-medium">
								Local Storage
							</h4>
							<p class="text-sm text-muted">
								Remembers sidebar collapsed state across sessions
							</p>
						</div>
					</div>
				</UCard>

				<UCard>
					<div class="flex items-start gap-3">
						<UIcon
							name="i-heroicons-chat-bubble-bottom-center-text"
							class="size-6 text-primary shrink-0"
						/>
						<div>
							<h4 class="font-medium">
								Tooltips & Popovers
							</h4>
							<p class="text-sm text-muted">
								Contextual tooltips when sidebar is collapsed
							</p>
						</div>
					</div>
				</UCard>
			</div>
		</section>

		<!-- Usage Example -->
		<section id="usage" class="space-y-4">
			<ProseH3>Usage</ProseH3>
			<p class="text-muted">
				The NavigationShell wraps your page content and provides the sidebar navigation.
			</p>

			<UCard>
				<template #header>
					<span class="font-mono text-sm">Example Usage</span>
				</template>
				<pre class="overflow-x-auto text-sm"><code class="language-vue">&lt;template&gt;
  &lt;NavigationShell
    v-model:selected-product="currentProduct"
    :products="['pricing', 'chat', 'connect']"
    :items="navigationItems"
  &gt;
    &lt;AppPage&gt;
      &lt;!-- Your page content --&gt;
    &lt;/AppPage&gt;
  &lt;/NavigationShell&gt;
&lt;/template&gt;</code></pre>
			</UCard>
		</section>

		<!-- Navigation Items Format -->
		<section id="navigation-items-format" class="space-y-4">
			<ProseH3>Navigation Items Format</ProseH3>
			<p class="text-muted">
				Navigation items follow the Nuxt UI <code>NavigationMenuItem</code> format.
				You can organize items into groups by using a 2D array.
			</p>

			<UCard>
				<template #header>
					<span class="font-mono text-sm">Navigation Items Example</span>
				</template>
				<pre class="overflow-x-auto text-sm"><code class="language-typescript">const navigationItems: NavigationMenuItem[][] = [
  // Main navigation group
  [
    {
      label: "Dashboard",
      icon: "i-heroicons-home",
      to: "/dashboard"
    },
    {
      label: "Settings",
      icon: "i-heroicons-cog-6-tooth",
      children: [
        { label: "Profile", to: "/settings/profile" },
        { label: "Security", to: "/settings/security" }
      ]
    }
  ],
  // Secondary group (bottom of sidebar)
  [
    {
      label: "Help",
      icon: "i-heroicons-question-mark-circle",
      to: "/help"
    }
  ]
];</code></pre>
			</UCard>
		</section>
	</ShowcasePage>
</template>

<script setup lang="ts">
	import type { PropDefinition } from "../Utility/PropsTable.vue";
	import ShowcasePage from "~/components/Utility/ShowcasePage.vue";
	import PropsTable from "../Utility/PropsTable.vue";

	const propsData: PropDefinition[] = [
		{ prop: "products", type: "SuiteProduct[]", description: "Array of available products for the product switcher" },
		{ prop: "items", type: "NavigationMenuItem[] | NavigationMenuItem[][]", description: "Navigation menu items in Nuxt UI format" },
		{ prop: "v-model:selectedProduct", type: "SuiteProduct", description: "Currently selected product" },
		{ prop: "v-model:collapsed", type: "boolean", description: "Whether the sidebar is collapsed" },
		{ prop: "v-model:open", type: "boolean", description: "Whether the mobile sidebar is open" }
	];
</script>
