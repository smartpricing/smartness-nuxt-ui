<template>
	<ShowcasePage
		title="NavigationMenu"
		description="The SNavigationMenu component renders a fixed-width vertical sidebar for in-page section switching. Drop it inside SNavigationPage's body alongside the section content."
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
			</p>
			<div class="flex h-[400px] border border-default rounded-md overflow-hidden">
				<SNavigationMenu :items="sideNavItems" />
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
				Pass a single array when there are no groups.
			</p>
			<div class="flex h-[300px] border border-default rounded-md overflow-hidden">
				<SNavigationMenu :items="flatItems" />
				<div class="flex-1 p-6 bg-muted">
					<p class="text-sm text-muted">
						Selected: <strong>{{ currentFlat }}</strong>
					</p>
				</div>
			</div>
		</section>

		<section
			id="with-footer"
			class="space-y-4"
		>
			<ProseH3>With footer slot</ProseH3>
			<p class="text-sm text-muted">
				The default slot renders below the menu — handy for a footer button or note.
			</p>
			<div class="flex h-[300px] border border-default rounded-md overflow-hidden">
				<SNavigationMenu :items="flatItems">
					<UButton
						class="mt-4 w-full"
						icon="ph:plus"
						color="primary"
						variant="outline"
						label="New item"
						block
					/>
				</SNavigationMenu>
				<div class="flex-1 p-6 bg-muted" />
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

	const propsData: PropDefinition[] = [
		{ prop: "items", type: "NavigationMenuItem[] | NavigationMenuItem[][]", description: "Menu entries in Nuxt UI format. Use a 2D array to render groups; the last group gets the indented sub-list border." }
	];
</script>
