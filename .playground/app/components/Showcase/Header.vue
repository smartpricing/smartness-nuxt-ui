<template>
	<ShowcasePage
		title="Header"
		description="The UHeader component from Nuxt UI provides a consistent header bar for your application. It can include navigation, branding, and action buttons."
	>
		<PropsTable :props="propsData" />

		<!-- Basic Example -->
		<section class="space-y-4">
			<ProseH3>Basic Header</ProseH3>
			<p class="text-muted">
				A simple header with a title.
			</p>
			<div class="rounded-lg border border-accented overflow-hidden">
				<UHeader
					title="Smartness UI"
					:toggle="false"
				/>
			</div>
		</section>

		<!-- With Links -->
		<section class="space-y-4">
			<ProseH3>Header with Navigation</ProseH3>
			<p class="text-muted">
				Header with navigation links.
			</p>
			<div class="rounded-lg border border-accented overflow-hidden">
				<UHeader
					title="My App"
					:toggle="false"
					:links="headerLinks"
				/>
			</div>
		</section>

		<!-- With Right Slot -->
		<section class="space-y-4">
			<ProseH3>Header with Actions</ProseH3>
			<p class="text-muted">
				Header with custom actions in the right slot.
			</p>
			<div class="rounded-lg border border-accented overflow-hidden">
				<UHeader
					title="Dashboard"
					:toggle="false"
				>
					<template #right>
						<div class="flex items-center gap-2">
							<UButton
								icon="i-heroicons-bell"
								variant="ghost"
								size="sm"
							/>
							<UButton
								icon="i-heroicons-cog-6-tooth"
								variant="ghost"
								size="sm"
							/>
							<UAvatar
								src="https://avatars.githubusercontent.com/u/739984?v=4"
								size="sm"
							/>
						</div>
					</template>
				</UHeader>
			</div>
		</section>

		<!-- Usage -->
		<section class="space-y-4">
			<ProseH3>Usage</ProseH3>
			<UCard>
				<template #header>
					<span class="font-mono text-sm">Basic Usage</span>
				</template>
				<pre class="overflow-x-auto text-sm"><code class="language-vue">&lt;template&gt;
  &lt;UHeader
    title="My Application"
    :toggle="false"
    :links="navigationLinks"
  &gt;
    &lt;template #right&gt;
      &lt;UButton&gt;Sign In&lt;/UButton&gt;
    &lt;/template&gt;
  &lt;/UHeader&gt;
&lt;/template&gt;</code></pre>
			</UCard>
		</section>
	</ShowcasePage>
</template>

<script setup lang="ts">
	import type { PropDefinition } from "../Utility/PropsTable.vue";
	import ShowcasePage from "~/components/Utility/ShowcasePage.vue";
	import PropsTable from "../Utility/PropsTable.vue";

	// Sample header links
	const headerLinks = [
		{ label: "Home", to: "/" },
		{ label: "Features", to: "/features" },
		{ label: "Pricing", to: "/pricing" },
		{ label: "Docs", to: "/docs" }
	];

	const propsData: PropDefinition[] = [
		{ prop: "title", type: "string", description: "The title displayed in the header" },
		{ prop: "toggle", type: "boolean", description: "Whether to show the mobile menu toggle" },
		{ prop: "links", type: "HeaderLink[]", description: "Array of navigation links" },
		{ prop: "to", type: "string", description: "Link for the header title/logo" }
	];
</script>
