<template>
	<NavigationShell
		v-model:selected-product="currentProduct"
		:items="computedNavigationItems"
	>
		<AppPage :navbar-props="{ title: 'Title from props' }">
			<template #navbar-right>
				<UButton
					label="Button from slot"
					color="primary"
					@click="() => {}"
				/>
			</template>
			<UContainer class="py-8">
				<slot />
			</UContainer>
		</AppPage>
	</NavigationShell>
</template>

<script setup lang="ts">
	import type { NavigationMenuItem } from "@nuxt/ui";
	import type { SuiteProduct } from "../../../app/types/suite";
	import { useSections } from "~/composables/useSections";

	const currentProduct = ref<SuiteProduct>("pms");
	const route = useRoute();
	const router = useRouter();
	const { sections } = useSections();

	// Handle hash navigation - scroll to element when hash changes
	watch(
		() => route.hash,
		(hash) => {
			if (hash) {
				nextTick(() => {
					const id = hash.slice(1); // Remove the '#'
					const element = document.getElementById(id);
					if (element) {
						element.scrollIntoView({ behavior: "smooth" });
					}
				});
			}
		},
		{ immediate: true }
	);

	// Also handle clicks on hash links that Vue Router might not process
	router.afterEach((to, from) => {
		if (to.path === from.path && to.hash && to.hash !== from.hash) {
			nextTick(() => {
				const id = to.hash.slice(1);
				const element = document.getElementById(id);
				if (element) {
					element.scrollIntoView({ behavior: "smooth" });
				}
			});
		}
	});

	// Navigation items for component showcases (alphabetically ordered)
	const baseNavigationItems: NavigationMenuItem[][] = [
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
				label: "Modal",
				icon: "i-heroicons-window",
				to: "/modal"
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
				label: "Slideover",
				icon: "i-heroicons-arrows-right-left",
				to: "/slideover"
			},
			{
				label: "Switch",
				icon: "i-heroicons-arrow-path",
				to: "/switch"
			},
			{
				label: "Tables",
				icon: "i-heroicons-table-cells",
				to: "/tables"
			},
			{
				label: "Tabs",
				icon: "i-heroicons-rectangle-group",
				to: "/tabs"
			},
			{
				label: "Typography",
				icon: "ph:text-aa",
				to: "/typography"
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

	// Computed navigation items with section children for active page
	const computedNavigationItems = computed<NavigationMenuItem[][]>(() => {
		return baseNavigationItems.map((group) =>
			group.map((item) => {
				// Check if this item is the active page
				const isActive = item.to === route.path;

				// If active and has sections, add them as children
				if (isActive && sections.value.length > 0) {
					return {
						...item,
						defaultOpen: true,
						children: sections.value.map((section) => ({
							label: section.label,
							to: `${item.to}#${section.id}`
						}))
					};
				}

				return item;
			})
		);
	});
</script>
