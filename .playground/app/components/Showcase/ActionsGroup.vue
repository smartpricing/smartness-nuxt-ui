<template>
	<ShowcasePage
		title="Actions Group"
		description="The SActionsGroup component renders bulk actions above a list of items (tables, cards, checkbox groups). Secondary actions are outline buttons; an optional single primary action sits on the right. Overflow collapses into a dropdown."
	>
		<PropsTable :props="propsData" />

		<!-- Interactive demo -->
		<section id="interactive" class="space-y-4">
			<ProseH3>
				Interactive demo
			</ProseH3>
			<p class="text-muted">
				Tweak the props and watch the component recompose live.
			</p>
			<div class="rounded border border-default bg-default p-6 space-y-6">
				<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4">
					<UFormField label="counter" hint="Selected items count (0 hides the pill)">
						<UInputNumber v-model="demoCounter" :min="0" :max="99" class="w-full" />
					</UFormField>
					<UFormField label="secondary actions" hint="Number of items[]">
						<UInputNumber v-model="demoSecondaryCount" :min="0" :max="6" class="w-full" />
					</UFormField>
					<UFormField label="size">
						<USelect v-model="demoSize" :items="sizeOptions" class="w-full" />
					</UFormField>
					<UFormField label="primary action">
						<USwitch v-model="demoHasPrimary" />
					</UFormField>
					<UFormField label="force-dropdown">
						<USwitch v-model="demoForceDropdown" />
					</UFormField>
					<UFormField label="disabled-hint" hint="Renders the empty / no-selection state">
						<USwitch v-model="demoDisabledHint" />
					</UFormField>
					<UFormField label="hide-caret">
						<USwitch v-model="demoHideCaret" />
					</UFormField>
				</div>
				<div class="flex justify-end pt-2 border-t border-default">
					<SActionsGroup
						:items="demoItems"
						:primary-action="demoHasPrimary ? primaryAction : undefined"
						:counter="demoCounter > 0 ? demoCounter : undefined"
						:size="demoSize"
						:force-dropdown="demoForceDropdown"
						:hide-caret="demoHideCaret"
						:disabled-hint="demoDisabledHint ? 'Select rows in the table to run actions' : undefined"
					/>
				</div>
			</div>
		</section>

		<!-- Default: disabled with tooltip -->
		<section id="disabled-hint" class="space-y-4">
			<ProseH3>
				Default — disabled with tooltip
			</ProseH3>
			<p class="text-muted">
				Use <code>disabled-hint</code> when no rows are selected. The trigger renders disabled with a tooltip explaining how to enable bulk actions.
			</p>
			<div class="flex flex-col items-end gap-4 rounded border border-default bg-default p-6">
				<SActionsGroup
					:items="[]"
					disabled-hint="Select rows in the table to run actions"
				/>
			</div>
		</section>

		<!-- Default: small viewport (force dropdown) -->
		<section id="small-viewport" class="space-y-4">
			<ProseH3>
				Default — small viewport
			</ProseH3>
			<p class="text-muted">
				Below the <code>sm</code> breakpoint the group auto-collapses into the dropdown (and the primary action joins the menu). Use <code>force-dropdown</code> to opt in at any width.
			</p>
			<div class="flex flex-col items-end gap-4 rounded border border-default bg-default p-6">
				<SActionsGroup
					:items="threeActions"
					:primary-action="primaryAction"
					:force-dropdown="true"
					:counter="2"
				/>
			</div>
		</section>

		<!-- Selected: primary only -->
		<section id="selected-primary" class="space-y-4">
			<ProseH3>
				Selected — primary action
			</ProseH3>
			<p class="text-muted">
				A single primary action on the right. Variant and color are forced to <code>solid</code> / <code>primary</code>; pass label, icon, click handler, etc.
			</p>
			<div class="flex flex-col items-end gap-4 rounded border border-default bg-default p-6">
				<SActionsGroup
					:items="[]"
					:primary-action="primaryAction"
					:counter="2"
				/>
			</div>
		</section>

		<!-- Selected: primary + secondary -->
		<section id="selected-mixed" class="space-y-4">
			<ProseH3>
				Selected — primary + secondary
			</ProseH3>
			<p class="text-muted">
				Secondary actions render as outline buttons on the left; the primary stays on the right. Secondary <code>color</code> is selectable (<code>neutral</code>, <code>error</code>, …).
			</p>
			<div class="flex flex-col items-end gap-4 rounded border border-default bg-default p-6">
				<SActionsGroup
					:items="threeActions"
					:primary-action="primaryAction"
					:counter="2"
				/>
			</div>
		</section>

		<!-- Selected: some disabled with tooltip -->
		<section id="selected-disabled" class="space-y-4">
			<ProseH3>
				Selected — some disabled with tooltip
			</ProseH3>
			<p class="text-muted">
				Disabled secondary actions explain themselves via tooltip. Useful when the action depends on the type of items selected.
			</p>
			<div class="flex flex-col items-end gap-4 rounded border border-default bg-default p-6">
				<SActionsGroup
					:items="someDisabledActions"
					:primary-action="primaryAction"
					:counter="2"
				/>
			</div>
		</section>

		<!-- Group: all in dropdown, some disabled -->
		<section id="grouped-disabled" class="space-y-4">
			<ProseH3>
				Group — collapsed, some disabled
			</ProseH3>
			<p class="text-muted">
				With <code>force-dropdown</code> every action lives inside the menu, in left-to-right order. Disabled items still surface a tooltip.
			</p>
			<div class="flex flex-col items-end gap-4 rounded border border-default bg-default p-6">
				<SActionsGroup
					:items="someDisabledActions"
					:primary-action="primaryAction"
					:force-dropdown="true"
					:counter="2"
				/>
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
				<SActionsGroup :items="threeActions" :primary-action="primaryAction" :counter="12" />
			</div>
		</section>
	</ShowcasePage>
</template>

<script lang="ts" setup>
	import type { ActionItem, PrimaryAction } from "../../../../app/components/ActionsGroup/types";
	import type { PropDefinition } from "../Utility/PropsTable.vue";
	import ShowcasePage from "~/components/Utility/ShowcasePage.vue";
	import PropsTable from "../Utility/PropsTable.vue";

	const propsData: PropDefinition[] = [
		{ prop: "items", type: "ActionItem[]", description: "Secondary actions, rendered as outline buttons on the left. Variant is enforced; color is selectable. Each item accepts UButton props plus an optional tooltip." },
		{ prop: "primary-action", type: "PrimaryAction", description: "Optional single primary action rendered on the far right as solid/primary. Variant and color are enforced." },
		{ prop: "size", type: "ButtonProps['size']", description: "Component-wide button size applied to every button (secondaries, primary, dropdown trigger). Per-item size is not allowed.", default: "sm" },
		{ prop: "force-dropdown", type: "boolean", description: "Collapse every action — including the primary — into the dropdown. Use it when the toolbar would otherwise overflow its container.", default: "false" },
		{ prop: "counter", type: "number", description: "Selected items count, rendered to the left of the buttons." },
		{ prop: "disabled-hint", type: "string | TooltipProps", description: "When set, render the trigger as disabled and show this tooltip — used in the no-selection state." },
		{ prop: "hide-caret", type: "boolean", description: "Force-hide the dropdown caret. Automatic below the sm breakpoint.", default: "false" },
		{ prop: "dropdown-button-props", type: "ButtonProps", description: "Override the dropdown trigger button (color, variant, label, icon…)." },
		{ prop: "dropdown-tooltip", type: "string | TooltipProps", description: "Tooltip on the dropdown trigger when overflow is active. Default side: top." },
		{ prop: "dropdown-menu-props", type: "Partial<DropdownMenuProps>", description: "Forwarded to UDropdownMenu (e.g. content.side, content.align)." },
		{ prop: "labels", type: "{ actions?: string; selected?: string }", description: "i18n key overrides for the dropdown trigger label and counter template." },
		{ prop: "ui", type: "ActionsGroupUi", description: "Class overrides for root, counter, button, primary, dropdown, dropdownMenu slots." }
	];

	function showToast(text: string) {
		useToast().add({
			title: "Action",
			description: text,
			color: "success"
		});
	}

	const primaryAction: PrimaryAction = {
		label: "Apply",
		icon: "ph:check-bold",
		onClick: () => showToast("Apply")
	};

	const threeActions: ActionItem[] = [
		{ label: "View", icon: "ph:eye-bold", color: "primary", onClick: () => showToast("View") },
		{ label: "Edit", icon: "ph:pencil-simple-bold", color: "neutral", onClick: () => showToast("Edit") },
		{ label: "Delete", icon: "ph:trash-bold", color: "error", onClick: () => showToast("Delete") }
	];

	const someDisabledActions: ActionItem[] = [
		{ label: "Edit consent", icon: "ph:user-bold", color: "neutral", onClick: () => showToast("Edit consent") },
		{ label: "Add tags", icon: "ph:tag-bold", color: "neutral", disabled: true, tooltip: "Explain why certain action cannot be executed" },
		{ label: "Delete", icon: "ph:trash-bold", color: "error", onClick: () => showToast("Delete") }
	];

	// --- Interactive demo state -------------------------------------------------
	const demoCounter = ref(2);
	const demoSecondaryCount = ref(3);
	const demoSize = ref<"xs" | "sm" | "md" | "lg" | "xl">("sm");
	const demoHasPrimary = ref(true);
	const demoForceDropdown = ref(false);
	const demoDisabledHint = ref(false);
	const demoHideCaret = ref(false);

	const sizeOptions = ["xs", "sm", "md", "lg", "xl"];

	const demoSecondaryPool: ActionItem[] = [
		{ label: "View", icon: "ph:eye-bold", color: "neutral", onClick: () => showToast("View") },
		{ label: "Edit", icon: "ph:pencil-simple-bold", color: "neutral", onClick: () => showToast("Edit") },
		{ label: "Archive", icon: "ph:archive-bold", color: "neutral", onClick: () => showToast("Archive") },
		{ label: "Duplicate", icon: "ph:copy-bold", color: "neutral", onClick: () => showToast("Duplicate") },
		{ label: "Add tags", icon: "ph:tag-bold", color: "neutral", disabled: true, tooltip: "Explain why certain action cannot be executed" },
		{ label: "Delete", icon: "ph:trash-bold", color: "error", onClick: () => showToast("Delete") }
	];

	const demoItems = computed<ActionItem[]>(
		() => demoSecondaryPool.slice(0, demoSecondaryCount.value)
	);
</script>
