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
					<SMoreActions
						:actions="twoActions"
					/>
				</div>
				<div class="space-y-1">
					<div class="text-xs font-medium text-muted">
						4 actions (1 inline + dropdown)
					</div>
					<SMoreActions
						:button-props="{ 'data-testid': 'show-more-button' }"
						:actions="fourActions"
					/>
				</div>
			</div>
		</section>

		<!-- Custom Button Props -->
		<section id="custom-button-props" class="space-y-4">
			<ProseH3>Custom Show More button</ProseH3>
			<p class="text-muted">
				Customize the button props for the action buttons.
			</p>

			<SMoreActions :actions="fourActions" :button-props="{ label: 'Actions', icon: '', trailingIcon: 'ph:dots-three-vertical-bold' }" />
			<SMoreActions :actions="fourActions" :button-props="{ label: 'Actions', icon: '', trailingIcon: 'ph:dots-three-vertical-bold' }" :max-inline="3" />
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

		<section id="show-dropdown-icon" class="space-y-4">
			<ProseH3>Show Dropdown Icon</ProseH3>
			<p class="text-muted">
				Show the dropdown icon in the dropdown menu.
			</p>
			<div v-for="max in [1, 2, 3, 4]" :key="max" class="space-y-1">
				<div class="text-xs font-medium text-muted">
					maxInline={{ max }}
				</div>
				<SMoreActions :actions="fourActions" :show-dropdown-icon="true" :max-inline="max" />
			</div>
		</section>

		<section id="show-inline-label" class="space-y-4">
			<ProseH3>Show Inline Label</ProseH3>
			<p class="text-muted">
				Show the label inline with the action buttons.
			</p>
			<div v-for="max in [1, 2, 3, 4]" :key="max" class="space-y-1">
				<div class="text-xs font-medium text-muted">
					maxInline={{ max }}
				</div>
				<SMoreActions :actions="fourActions" :show-inline-label="true" :max-inline="max" />
			</div>
		</section>

		<section id="show-tooltip" class="space-y-4">
			<ProseH3>Show Tooltip</ProseH3>
			<p class="text-muted">
				Show the tooltip on the action buttons.
			</p>
			<div class="space-y-1">
				<div class="text-xs font-medium text-muted">
					tooltipProps={ content: { side: 'bottom' } }
				</div>
				<SMoreActions :actions="fourActions" :tooltip-props="{ content: { side: 'bottom' } }" :max-inline="3" />
			</div>
			<div class="space-y-1">
				<div class="text-xs font-medium text-muted">
					tooltipProps={ content: { side: 'top' } }
				</div>
				<SMoreActions :actions="fourActions" :tooltip-props="{ content: { side: 'top' } }" :max-inline="3" />
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
					<div v-for="max in [1, 2, 3, 4]" :key="max" class="space-y-1">
						<div class="text-xs font-medium text-muted">
							maxInline={{ max }}
						</div>
						<SMoreActions :actions="fourActions" :button-props="{ color }" :max-inline="max" />
					</div>
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
					<div v-for="max in [1, 2, 3, 4]" :key="max" class="space-y-1">
						<div class="text-xs font-medium text-muted">
							maxInline={{ max }}
						</div>
						<SMoreActions :actions="fourActions" :button-props="{ variant }" :max-inline="max" />
					</div>
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
					<SMoreActions :actions="fourActions" :button-props="{ size }" :max-inline="3" />
				</div>
			</div>
		</section>

		<!-- Disabled Actions -->
		<section id="disabled" class="space-y-4">
			<ProseH3>Disabled Actions</ProseH3>
			<p class="text-muted">
				Individual actions can be disabled.
			</p>
			<div v-for="max in [1, 2, 3]" :key="max" class="space-y-1">
				<div class="text-xs font-medium text-muted">
					maxInline={{ max }}
				</div>
				<SMoreActions :actions="disabledActions" :max-inline="max" />
			</div>
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
	import type { MoreActionItem } from "../../../../app/types";

	import type { PropDefinition } from "../Utility/PropsTable.vue";
	import ShowcasePage from "~/components/Utility/ShowcasePage.vue";
	import PropsTable from "../Utility/PropsTable.vue";

	const propsData: PropDefinition[] = [
		{ prop: "actions", type: "MoreActionItem[][]", description: "Grouped array of action items. Each group is separated in the dropdown. Flattened when rendered inline." },
		{ prop: "maxInline", type: "number", description: "Maximum number of actions shown as inline buttons before overflowing into a dropdown.", default: "2" },
		{ prop: "showDropdownIcon", type: "boolean", description: "Show the dropdown icon in the dropdown menu.", default: "false" },
		{ prop: "showInlineLabel", type: "boolean", description: "Show the label inline with the action buttons.", default: "false" },
		{ prop: "buttonProps", type: "ButtonProps", description: "Full UButton props for the buttons (label, color, variant, icon, size, etc.)" }
	];

	const buttonColors = ["primary", "secondary", "neutral", "success", "warning", "error"] as const;
	const buttonVariants = ["solid", "outline", "soft", "subtle", "ghost", "link"] as const;
	const buttonSizes = ["xs", "sm", "md", "lg", "xl"] as const;

	function showToast(text: string) {
		useToast().add({
			title: "Action",
			description: text,
			color: "success"
		});
	}

	const twoActions: MoreActionItem[][] = [
		[
			{ label: "Edit", icon: "ph:pencil-simple", onSelect: () => showToast("Edit clicked") },
			{ label: "Delete", icon: "ph:trash", onSelect: () => showToast("Delete clicked") }
		]
	];

	const fourActions: MoreActionItem[][] = [
		[
			{ label: "View", icon: "ph:eye", onSelect: () => showToast("View clicked"), tooltip: "View the item", "data-testid": "view-action" },
			{ label: "Edit", icon: "ph:pencil-simple", onSelect: () => showToast("Edit clicked"), tooltip: "Edit the item", "data-testid": "edit-action" }
		],
		[
			{ label: "Delete", icon: "ph:trash", onSelect: () => showToast("Delete clicked"), color: "error", "data-testid": "delete-action" },
			{ label: "Duplicate", icon: "ph:copy", onSelect: () => showToast("Duplicate clicked"), "data-testid": "duplicate-action" }
		],
		[
			{ label: "Archive", icon: "ph:archive", onSelect: () => showToast("Archive clicked"), "data-testid": "archive-action" }
		]
	];

	const disabledActions: MoreActionItem[][] = [
		[
			{ label: "Edit", icon: "ph:pencil-simple", onSelect: () => showToast("Edit clicked") },
			{ label: "Delete", icon: "ph:trash", disabled: true, onSelect: () => showToast("Delete clicked") },
			{ label: "Archive", icon: "ph:archive", onSelect: () => showToast("Archive clicked") }
		]
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

	const getRowActions = (name: string): MoreActionItem[][] => [
		[
			{ label: "View", icon: "ph:eye", onSelect: () => showToast(`View ${name}`) },
			{ label: "Edit", icon: "ph:pencil-simple", onSelect: () => showToast(`Edit ${name}`) }
		],
		[
			{ label: "Duplicate", icon: "ph:copy", onSelect: () => showToast(`Duplicate ${name}`) },
			{ label: "Delete", icon: "ph:trash", onSelect: () => showToast(`Delete ${name}`) }
		]
	];
</script>
