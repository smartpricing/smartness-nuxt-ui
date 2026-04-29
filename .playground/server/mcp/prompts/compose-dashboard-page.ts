import { z } from "zod";

export default defineMcpPrompt({
	description: "Bootstrap a Smartness UI dashboard page using SNavigationShell + SNavigationPage with header bars, breadcrumb, tabs and a body section.",
	inputSchema: {
		title: z.string().describe("Page title shown in SNavigationBarHeader"),
		breadcrumb: z.boolean().optional().default(true).describe("Whether to include the breadcrumb row"),
		tabs: z.boolean().optional().default(false).describe("Whether to include tabs in the header"),
		topBar: z.boolean().optional().default(true).describe("Whether to include the top bar with shared actions")
	},
	async handler({ title, breadcrumb = true, tabs = false, topBar = true }) {
		const skeleton = `<template>
\t<SNavigationShell :items="navItems">
\t\t<template #sidebar-header="{ collapsed }">
\t\t\t<SNavigationProducts v-model="product" :products="products" :collapsed="collapsed" />
\t\t</template>

\t\t<SNavigationPage>
\t\t\t<template #header>
${topBar ? "\t\t\t\t<SNavigationBarTop\n\t\t\t\t\t:cta=\"{ label: 'Upgrade' }\"\n\t\t\t\t\t:user=\"{ name: 'Jane Doe' }\"\n\t\t\t\t/>" : ""}
${breadcrumb ? "\t\t\t\t<SNavigationBarBreadcrumb :items=\"breadcrumbItems\" />" : ""}
\t\t\t\t<SNavigationBarHeader
\t\t\t\t\ttitle="${title}"
\t\t\t\t\t:back="{ label: 'Back' }"
${tabs ? "\t\t\t\t\t:tabs=\"tabs\"\n\t\t\t\t\tv-model:active-tab=\"activeTab\"" : ""}
\t\t\t\t/>
\t\t\t</template>

\t\t\t<!-- Page body -->
\t\t\t<div class="p-6">
\t\t\t\t<!-- TODO: replace with the page content -->
\t\t\t</div>
\t\t</SNavigationPage>
\t</SNavigationShell>
</template>

<script setup lang="ts">
\timport type { NavigationMenuItem, BreadcrumbItem } from "@nuxt/ui";
\timport { ref } from "vue";

\tconst navItems: NavigationMenuItem[][] = [];
\tconst breadcrumbItems: BreadcrumbItem[] = [];
\tconst tabs = [];
\tconst activeTab = ref<string | undefined>(undefined);
\tconst product = ref();
\tconst products = [];
</script>`;

		return {
			messages: [{
				role: "user" as const,
				content: {
					type: "text" as const,
					text: `Adapt the following Smartness UI dashboard page skeleton to the user's domain (fill the navItems, breadcrumb, tabs, products, and the body content). Keep the layout structure intact.\n\n\`\`\`vue\n${skeleton}\n\`\`\``
				}
			}]
		};
	}
});
