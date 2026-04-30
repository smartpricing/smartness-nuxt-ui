<template>
	<ShowcasePage
		title="NavigationMenu"
		description="The SNavigationMenu component renders a vertical sidebar for in-page section switching. Drop it inside SNavigationPage's body alongside the section content. By default it shrinks to fit its longest label — pass a width class (e.g. w-[250px], w-64) to size it explicitly."
	>
		<PropsTable :props="propsData" />

		<section
			id="grouped-sections"
			class="space-y-4"
		>
			<ProseH3>Grouped sections</ProseH3>
			<p class="text-sm text-muted">
				Pass a 2D array to render groups. The last group gets an indented sub-list border treatment, useful for "main + sub-items" layouts.
				Drive <code>active</code> from a local <code>ref</code> and update it from each item's <code>onSelect</code>.
				Width and padding are caller-controlled — pass them via the <code>class</code> prop (here <code>w-size p-size</code>).
			</p>
			<div class="flex h-[400px] border border-default rounded-md overflow-hidden">
				<SNavigationMenu
					:items="sideNavItems"
					class="w-60 p-4"
				/>
				<div class="flex-1 p-6 bg-muted">
					<h4 class="font-semibold mb-2 capitalize">
						{{ currentSection.replace("-", " ") }}
					</h4>
					<p class="text-sm text-muted">
						Render the content for <code>{{ currentSection }}</code> here.
					</p>
				</div>
			</div>
		</section>

		<section
			id="flat-list"
			class="space-y-4"
		>
			<ProseH3>Flat list</ProseH3>
			<p class="text-sm text-muted">
				Pass a single array when there are no groups. With no width class the component fits the widest label —
				note how this menu is narrower than the next one because its labels are shorter.
			</p>
			<div class="flex h-[300px] border border-default rounded-md overflow-hidden">
				<SNavigationMenu
					:items="flatItems"
					class="p-4"
				/>
				<div class="flex-1 p-6 bg-muted">
					<p class="text-sm text-muted">
						Selected: <strong>{{ currentFlat }}</strong>
					</p>
				</div>
			</div>
		</section>

		<section
			id="external-links"
			class="space-y-4"
		>
			<ProseH3>External links with custom width</ProseH3>
			<p class="text-sm text-muted">
				Use a <code>trailingIcon</code> with <code>target: "_blank"</code> to flag entries that open in a new tab.
				This example also pins the menu to a fixed <code>w-[250px]</code> via the <code>class</code> prop, overriding the default label-fit width.
			</p>
			<div class="flex h-[300px] border border-default rounded-md overflow-hidden">
				<SNavigationMenu
					:items="externalItems"
					class="w-[250px] p-4"
				/>
				<div class="flex-1 p-6 bg-muted">
					<p class="text-sm text-muted">
						Selected: <strong>{{ currentExternal }}</strong>
					</p>
				</div>
			</div>
		</section>
	</ShowcasePage>
</template>

<script lang="ts" setup>
	import type { NavigationMenuItem } from "#ui/types";
	import type { PropDefinition } from "../Utility/PropsTable.vue";
	import ShowcasePage from "~/components/Utility/ShowcasePage.vue";
	import PropsTable from "../Utility/PropsTable.vue";

	const currentSection = ref("presets");
	const sideNavItems = computed<NavigationMenuItem[][]>(() => [
		[
			{
				label: "Presets",
				icon: "ph:copy",
				active: currentSection.value === "presets",
				onSelect: () => {
					currentSection.value = "presets";
				}
			}
		],
		[
			{
				label: "Rate plans",
				icon: "ph:bookmark-simple",
				active: currentSection.value === "rate-plans",
				onSelect: () => {
					currentSection.value = "rate-plans";
				}
			},
			{
				label: "Promotions",
				icon: "ph:percent",
				active: currentSection.value === "promotions",
				onSelect: () => {
					currentSection.value = "promotions";
				}
			},
			{
				label: "Extras",
				icon: "ph:plus",
				active: currentSection.value === "extras",
				onSelect: () => {
					currentSection.value = "extras";
				}
			},
			{
				label: "City tax",
				icon: "ph:receipt",
				active: currentSection.value === "city-tax",
				onSelect: () => {
					currentSection.value = "city-tax";
				}
			}
		]
	]);

	const currentFlat = ref("overview");
	const flatItems = computed<NavigationMenuItem[]>(() => [
		{
			label: "Overview",
			icon: "ph:squares-four",
			active: currentFlat.value === "overview",
			onSelect: () => {
				currentFlat.value = "overview";
			}
		},
		{
			label: "Activity",
			icon: "ph:pulse",
			active: currentFlat.value === "activity",
			onSelect: () => {
				currentFlat.value = "activity";
			}
		},
		{
			label: "Settings",
			icon: "ph:gear",
			active: currentFlat.value === "settings",
			onSelect: () => {
				currentFlat.value = "settings";
			}
		}
	]);

	const currentExternal = ref("changelog");
	const externalItems: NavigationMenuItem[] = [
		{
			label: "Documentation",
			icon: "ph:book-open",
			to: "#",
			target: "_blank",
			trailingIcon: "ph:arrow-square-out"
		},
		{
			label: "Changelog",
			icon: "ph:list-bullets",
			active: currentExternal.value === "changelog",
			onSelect: () => {
				currentExternal.value = "changelog";
			}
		},
		{
			label: "Support",
			icon: "ph:lifebuoy",
			active: currentExternal.value === "support",
			onSelect: () => {
				currentExternal.value = "support";
			},
			trailingIcon: "ph:warning-circle",
			ui: { linkTrailingIcon: "text-error" }
		}
	];

	const propsData: PropDefinition[] = [
		{ prop: "items", type: "NavigationMenuItem[] | NavigationMenuItem[][]", description: "Menu entries in Nuxt UI format. Pass a 2D array to render groups; the last group gets an indented sub-list border. Flat arrays render as a standard vertical menu." }
	];
</script>
