<template>
	<ShowcasePage
		title="Actions Group"
		description="The SActionsGroup component renders a list of action buttons placed above a list of items (tables, cards, checkbox groups). When the number of actions exceeds the inline cap, overflow collapses into a primary dropdown menu."
	>
		<PropsTable :props="propsData" />

		<!-- Basic -->
		<section id="basic" class="space-y-4">
			<ProseH3>
				Basic usage
			</ProseH3>
			<p class="text-muted">
				Up to 3 actions render inline. With 4 or more, the first 2 remain inline and the rest collapse into a primary dropdown.
			</p>
			<div class="flex flex-col items-end gap-4 rounded border border-default bg-default p-6">
				<div class="space-y-1 self-stretch">
					<div class="text-xs font-medium text-muted">
						2 actions — both inline
					</div>
					<SActionsGroup :items="twoActions" />
				</div>
				<div class="space-y-1 self-stretch">
					<div class="text-xs font-medium text-muted">
						3 actions — all inline
					</div>
					<SActionsGroup :items="threeActions" />
				</div>
				<div class="space-y-1 self-stretch">
					<div class="text-xs font-medium text-muted">
						5 actions — 2 inline + dropdown
					</div>
					<SActionsGroup :items="fiveActions" />
				</div>
			</div>
		</section>

		<!-- Counter -->
		<section id="counter" class="space-y-4">
			<ProseH3>
				Selected items counter
			</ProseH3>
			<p class="text-muted">
				Pass <code>counter</code> to show the selected items count. The label is localized via the <code>sActionsGroup.selected</code> i18n key — point <code>labels.selected</code> at a different path to swap the template per-instance.
			</p>
			<div class="flex flex-col items-end gap-4 rounded border border-default bg-default p-6">
				<div class="space-y-1 self-stretch">
					<div class="text-xs font-medium text-muted">
						Default label
					</div>
					<SActionsGroup :items="threeActions" :counter="2" />
				</div>
			</div>
		</section>

		<!-- Force dropdown -->
		<section id="force-dropdown" class="space-y-4">
			<ProseH3>
				Force dropdown
			</ProseH3>
			<p class="text-muted">
				With <code>force-dropdown</code>, every action is grouped inside the dropdown regardless of the item count.
			</p>
			<div class="flex flex-col items-end gap-4 rounded border border-default bg-default p-6">
				<SActionsGroup :items="threeActions" :force-dropdown="true" />
				<SActionsGroup :items="fiveActions" :force-dropdown="true" :counter="2" />
			</div>
		</section>

		<!-- Max inline -->
		<section id="max-inline" class="space-y-4">
			<ProseH3>
				Max inline
			</ProseH3>
			<p class="text-muted">
				Customize the inline cap with <code>max-inline</code>. Overflow shows <code>max-inline − 1</code> inline buttons + dropdown.
			</p>
			<div class="flex flex-col items-end gap-4 rounded border border-default bg-default p-6">
				<div v-for="max in [1, 2, 3, 4]" :key="max" class="space-y-1 self-stretch">
					<div class="text-xs font-medium text-muted">
						max-inline={{ max }}
					</div>
					<SActionsGroup :items="fiveActions" :max-inline="max" />
				</div>
			</div>
		</section>

		<!-- Tooltips -->
		<section id="tooltips" class="space-y-4">
			<ProseH3>
				Tooltips
			</ProseH3>
			<p class="text-muted">
				Per-item tooltips default to side <code>top</code> when inline and <code>right</code> inside the dropdown menu. The dropdown trigger tooltip defaults to side <code>top</code>. All accept the full Nuxt UI <code>TooltipProps</code> shape or a plain string shorthand.
			</p>
			<div class="flex flex-col items-end gap-4 rounded border border-default bg-default p-6">
				<div class="space-y-1 self-stretch">
					<div class="text-xs font-medium text-muted">
						String shorthand tooltips
					</div>
					<SActionsGroup :items="tooltipActions" />
				</div>
				<div class="space-y-1 self-stretch">
					<div class="text-xs font-medium text-muted">
						Dropdown trigger tooltip
					</div>
					<SActionsGroup
						:items="twoActions"
						:force-dropdown="true"
						dropdown-tooltip="Run bulk actions"
					/>
				</div>
				<div class="space-y-1 self-stretch">
					<div class="text-xs font-medium text-muted">
						Disabled primary + tooltip (no selection)
					</div>
					<SActionsGroup
						:items="[]"
						:force-dropdown="true"
						dropdown-tooltip="Select rows in the table to run actions"
						:dropdown-button-props="{ disabled: true }"
					/>
				</div>
			</div>
		</section>

		<!-- Small viewport behavior -->
		<section id="responsive" class="space-y-4">
			<ProseH3>
				Small viewport behavior
			</ProseH3>
			<p class="text-muted">
				Below the Tailwind <code>sm</code> breakpoint (640px) the group auto-collapses into the dropdown and the trailing caret is hidden. Use <code>hide-caret</code> to hide the caret at any breakpoint without collapsing.
			</p>
			<div class="flex flex-col items-end gap-4 rounded border border-default bg-default p-6">
				<div class="space-y-1 self-stretch">
					<div class="text-xs font-medium text-muted">
						Default (3 inline at ≥ 640px, collapsed on narrow screens)
					</div>
					<SActionsGroup :items="threeActions" :counter="2" />
				</div>
				<div class="space-y-1 self-stretch">
					<div class="text-xs font-medium text-muted">
						5 actions — 2 inline + dropdown on desktop, fully collapsed on mobile
					</div>
					<SActionsGroup :items="fiveActions" />
				</div>
				<div class="space-y-1 self-stretch">
					<div class="text-xs font-medium text-muted">
						hide-caret — hides the caret at any size, no collapse
					</div>
					<SActionsGroup :items="fiveActions" :hide-caret="true" />
				</div>
			</div>
		</section>

		<!-- Disabled items -->
		<section id="disabled" class="space-y-4">
			<ProseH3>
				Disabled items
			</ProseH3>
			<p class="text-muted">
				Individual items can be disabled and explain why via a tooltip.
			</p>
			<div class="flex flex-col items-end gap-4 rounded border border-default bg-default p-6">
				<SActionsGroup :items="disabledActions" :counter="2" />
				<SActionsGroup :items="disabledActions" :counter="2" :force-dropdown="true" />
			</div>
		</section>

		<!-- Full example matching Figma -->
		<section id="figma-example" class="space-y-4">
			<ProseH3>
				Figma reference
			</ProseH3>
			<p class="text-muted">
				Mirrors the three showcase compositions from the DS spec.
			</p>
			<div class="flex flex-col items-end gap-6 rounded border border-default bg-default p-6">
				<SActionsGroup :items="twoActions" :counter="2" :force-dropdown="true" />
				<SActionsGroup :items="[...twoActions, { label: 'Button', icon: 'ph:placeholder-bold', color: 'primary', variant: 'solid' }]" :counter="2" />
				<SActionsGroup :items="twoActions" :counter="2" />
			</div>
		</section>
	</ShowcasePage>
</template>

<script lang="ts" setup>
	import type { ActionItem } from "../../../../app/components/ActionsGroup/types";
	import type { PropDefinition } from "../Utility/PropsTable.vue";
	import ShowcasePage from "~/components/Utility/ShowcasePage.vue";
	import PropsTable from "../Utility/PropsTable.vue";

	const propsData: PropDefinition[] = [
		{ prop: "items", type: "ActionItem[]", description: "List of actions. Each item accepts the full UButton props plus an optional tooltip (string | TooltipProps)." },
		{ prop: "max-inline", type: "number", description: "Max inline buttons before overflowing. When exceeded, shows max-inline − 1 inline + dropdown.", default: "3" },
		{ prop: "force-dropdown", type: "boolean", description: "Collapse every item into the dropdown, regardless of max-inline.", default: "false" },
		{ prop: "counter", type: "number", description: "Selected items count, rendered to the left of the buttons." },
		{ prop: "hide-caret", type: "boolean", description: "Force-hide the dropdown caret. Automatic below the sm breakpoint.", default: "false" },
		{ prop: "dropdown-button-props", type: "ButtonProps", description: "Override the dropdown trigger button (color, variant, label, icon…). Defaults: solid primary, \"Actions\" label, ph:dots-three-vertical-bold, ph:caret-down-bold trailing." },
		{ prop: "dropdown-tooltip", type: "string | TooltipProps", description: "Tooltip on the dropdown trigger. Default side: top." },
		{ prop: "dropdown-menu-props", type: "Partial<DropdownMenuProps>", description: "Forwarded to UDropdownMenu (e.g. content.side, content.align)." },
		{ prop: "labels", type: "{ actions?: string; selected?: string }", description: "i18n key overrides. Point to your own locale paths to customize the dropdown trigger label (default: sActionsGroup.actions) and the counter template (default: sActionsGroup.selected, interpolated with {n})." },
		{ prop: "ui", type: "ActionsGroupUi", description: "Class overrides for root, counter, button, dropdown, dropdownMenu slots." }
	];

	function showToast(text: string) {
		useToast().add({
			title: "Action",
			description: text,
			color: "success"
		});
	}

	const twoActions: ActionItem[] = [
		{ label: "Button", icon: "ph:placeholder-bold", variant: "outline", color: "neutral", onClick: () => showToast("First clicked") },
		{ label: "Button", icon: "ph:placeholder-bold", variant: "solid", color: "primary", onClick: () => showToast("Second clicked") }
	];

	const threeActions: ActionItem[] = [
		{ label: "Button", icon: "ph:placeholder-bold", variant: "outline", color: "neutral", onClick: () => showToast("First clicked") },
		{ label: "Button", icon: "ph:placeholder-bold", variant: "outline", color: "neutral", onClick: () => showToast("Second clicked") },
		{ label: "Button", icon: "ph:placeholder-bold", variant: "solid", color: "primary", onClick: () => showToast("Third clicked") }
	];

	const fiveActions: ActionItem[] = [
		{ label: "View", icon: "ph:eye-bold", variant: "outline", color: "neutral", onClick: () => showToast("View") },
		{ label: "Edit", icon: "ph:pencil-simple-bold", variant: "outline", color: "neutral", onClick: () => showToast("Edit") },
		{ label: "Archive", icon: "ph:archive-bold", variant: "outline", color: "neutral", onClick: () => showToast("Archive") },
		{ label: "Duplicate", icon: "ph:copy-bold", variant: "outline", color: "neutral", onClick: () => showToast("Duplicate") },
		{ label: "Delete", icon: "ph:trash-bold", variant: "solid", color: "error", onClick: () => showToast("Delete") }
	];

	const tooltipActions: ActionItem[] = [
		{ label: "View", icon: "ph:eye-bold", variant: "outline", color: "neutral", tooltip: "Preview the selected rows" },
		{ label: "Edit", icon: "ph:pencil-simple-bold", variant: "outline", color: "neutral", tooltip: { text: "Open the bulk editor", content: { side: "bottom" } } },
		{ label: "Delete", icon: "ph:trash-bold", variant: "solid", color: "error", tooltip: "Permanently remove selection" }
	];

	const disabledActions: ActionItem[] = [
		{ label: "Edit marketing consent", icon: "ph:user-bold", onClick: () => showToast("Edit consent") },
		{ label: "Add tags", icon: "ph:tag-bold", disabled: true, tooltip: "Explain why certain action cannot be executed" },
		{ label: "Delete", icon: "ph:trash-bold", color: "error", variant: "outline", onClick: () => showToast("Delete") }
	];
</script>
