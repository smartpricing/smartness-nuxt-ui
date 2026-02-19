<template>
	<ShowcasePage
		title="More Actions"
		description="The SMoreActions component renders inline action buttons with an overflow dropdown menu. When the number of actions exceeds maxInline, extra items collapse into a three-dot dropdown."
	>
		<PropsTable :props="propsData" />

		<!-- Basic Usage -->
		<section id="basic" class="space-y-4">
			<ProseH3>Basic Usage</ProseH3>
			<p class="text-muted">
				By default, up to 2 actions are shown inline. The rest overflow into a dropdown.
			</p>
			<div class="flex items-center gap-8">
				<div class="space-y-1">
					<div class="text-xs font-medium text-muted">
						2 actions (all inline)
					</div>
					<SMoreActions :actions="twoActions" />
				</div>
				<div class="space-y-1">
					<div class="text-xs font-medium text-muted">
						4 actions (1 inline + dropdown)
					</div>
					<SMoreActions :actions="fourActions" />
				</div>
			</div>
		</section>

		<!-- Max Inline -->
		<section id="max-inline" class="space-y-4">
			<ProseH3>Max Inline</ProseH3>
			<p class="text-muted">
				Control how many actions are shown inline before overflowing.
			</p>
			<div class="flex items-center gap-8">
				<div v-for="max in [1, 2, 3, 4]" :key="max" class="space-y-1">
					<div class="text-xs font-medium text-muted">
						maxInline={{ max }}
					</div>
					<SMoreActions :actions="fourActions" :max-inline="max" />
				</div>
			</div>
		</section>

		<!-- Colors -->
		<section id="colors" class="space-y-4">
			<ProseH3>Button Color</ProseH3>
			<p class="text-muted">
				Customize the color of all action buttons.
			</p>
			<div class="flex items-center gap-8">
				<div v-for="color in buttonColors" :key="color" class="space-y-1">
					<div class="text-xs font-medium text-muted capitalize">
						{{ color }}
					</div>
					<SMoreActions :actions="fourActions" :button-color="color" />
				</div>
			</div>
		</section>

		<!-- Variants -->
		<section id="variants" class="space-y-4">
			<ProseH3>Button Variant</ProseH3>
			<p class="text-muted">
				Change the visual style of the buttons.
			</p>
			<div class="flex items-center gap-8">
				<div v-for="variant in buttonVariants" :key="variant" class="space-y-1">
					<div class="text-xs font-medium text-muted capitalize">
						{{ variant }}
					</div>
					<SMoreActions :actions="fourActions" :button-variant="variant" />
				</div>
			</div>
		</section>

		<!-- Sizes -->
		<section id="sizes" class="space-y-4">
			<ProseH3>Button Size</ProseH3>
			<p class="text-muted">
				Adjust the size of the action buttons.
			</p>
			<div class="flex items-center gap-8">
				<div v-for="size in buttonSizes" :key="size" class="space-y-1">
					<div class="text-xs font-medium text-muted capitalize">
						{{ size }}
					</div>
					<SMoreActions :actions="fourActions" :button-size="size" />
				</div>
			</div>
		</section>

		<!-- Disabled Actions -->
		<section id="disabled" class="space-y-4">
			<ProseH3>Disabled Actions</ProseH3>
			<p class="text-muted">
				Individual actions can be disabled.
			</p>
			<SMoreActions :actions="disabledActions" />
		</section>

		<!-- In a Table Row -->
		<section id="table-example" class="space-y-4">
			<ProseH3>Table Row Example</ProseH3>
			<p class="text-muted">
				Typical usage inside a table row for row-level actions.
			</p>
			<div class="rounded-lg border border-accented overflow-hidden bg-white">
				<UTable
					:data="tableData"
					:columns="tableColumns"
					class="bg-white"
					:ui="{ thead: 'bg-gray-50', th: 'bg-gray-50' }"
				>
					<template #actions-cell="{ row }">
						<div class="flex justify-end">
							<SMoreActions
								:actions="getRowActions(row.original.name)"
								button-color="neutral"
								button-size="xs"
							/>
						</div>
					</template>
				</UTable>
			</div>
		</section>
	</ShowcasePage>
</template>

<script lang="ts" setup>
	import type { DropdownMenuItem } from "@nuxt/ui";
	import type { PropDefinition } from "../Utility/PropsTable.vue";
	import ShowcasePage from "~/components/Utility/ShowcasePage.vue";
	import PropsTable from "../Utility/PropsTable.vue";

	const propsData: PropDefinition[] = [
		{ prop: "actions", type: "DropdownMenuItem[]", description: "Array of action items. Each item supports icon, label, onSelect, disabled, and other DropdownMenuItem properties." },
		{ prop: "maxInline", type: "number", description: "Maximum number of actions shown as inline buttons before overflowing into a dropdown.", default: "2" },
		{ prop: "buttonColor", type: "string", description: "Color of all action buttons (primary, secondary, success, info, warning, error, neutral).", default: "primary" },
		{ prop: "buttonVariant", type: "string", description: "Visual variant of all action buttons (solid, outline, soft, subtle, ghost, link).", default: "ghost" },
		{ prop: "buttonSize", type: "string", description: "Size of all action buttons (xs, sm, md, lg, xl)." }
	];

	const buttonColors = ["primary", "secondary", "neutral", "success", "warning", "error"] as const;
	const buttonVariants = ["solid", "outline", "soft", "subtle", "ghost", "link"] as const;
	const buttonSizes = ["xs", "sm", "md", "lg", "xl"] as const;

	const twoActions: DropdownMenuItem[] = [
		{ label: "Edit", icon: "ph:pencil-simple", onSelect: () => console.log("Edit clicked") },
		{ label: "Delete", icon: "ph:trash", onSelect: () => console.log("Delete clicked") }
	];

	const fourActions: DropdownMenuItem[] = [
		{ label: "View", icon: "ph:eye", onSelect: () => console.log("View clicked") },
		{ label: "Edit", icon: "ph:pencil-simple", onSelect: () => console.log("Edit clicked") },
		{ label: "Duplicate", icon: "ph:copy", onSelect: () => console.log("Duplicate clicked") },
		{ label: "Delete", icon: "ph:trash", onSelect: () => console.log("Delete clicked") }
	];

	const disabledActions: DropdownMenuItem[] = [
		{ label: "Edit", icon: "ph:pencil-simple", onSelect: () => console.log("Edit clicked") },
		{ label: "Delete", icon: "ph:trash", disabled: true, onSelect: () => console.log("Delete clicked") },
		{ label: "Archive", icon: "ph:archive", onSelect: () => console.log("Archive clicked") }
	];

	// Table example
	const tableData = [
		{ name: "Villa Maria", type: "Hotel", units: 12 },
		{ name: "Uffizi Suites", type: "Apartment", units: 6 },
		{ name: "Arno Residences", type: "B&B", units: 8 }
	];

	const tableColumns = [
		{ accessorKey: "name", header: "Name" },
		{ accessorKey: "type", header: "Type" },
		{ accessorKey: "units", header: "Units" },
		{ id: "actions", header: "" }
	];

	const getRowActions = (name: string): DropdownMenuItem[] => [
		{ label: "View", icon: "ph:eye", onSelect: () => console.log(`View ${name}`) },
		{ label: "Edit", icon: "ph:pencil-simple", onSelect: () => console.log(`Edit ${name}`) },
		{ label: "Duplicate", icon: "ph:copy", onSelect: () => console.log(`Duplicate ${name}`) },
		{ label: "Delete", icon: "ph:trash", onSelect: () => console.log(`Delete ${name}`) }
	];
</script>
