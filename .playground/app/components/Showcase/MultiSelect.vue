<template>
	<ShowcasePage
		title="MultiSelect"
		description="A hierarchical multi-selection dropdown with tree structure, search, select-all, and radio-group mode. Built on top of UTree and UPopover."
	>
		<PropsTable :props="propsData" />

		<!-- Basic -->
		<section id="basic" class="space-y-4">
			<ProseH3>Basic</ProseH3>
			<p class="text-sm text-muted">
				Default multiple selection with hierarchical items. Children are expanded by default and parent nodes auto-select when all children are checked.
			</p>
			<div class="max-w-xs space-y-2">
				<SMultiSelect
					v-model="basicSelection"
					:items="roomTypes"
					placeholder="Select room types"
				/>
				<p class="text-xs text-muted">
					Selected: <code>{{ basicSelection }}</code>
				</p>
			</div>
		</section>

		<!-- Select All -->
		<section id="select-all" class="space-y-4">
			<ProseH3>Select All</ProseH3>
			<p class="text-sm text-muted">
				Adds a "Select all" checkbox above the tree. Supports indeterminate state when only some items are selected. Works with search filtering — only visible items are toggled.
			</p>
			<div class="max-w-xs space-y-2">
				<SMultiSelect
					v-model="selectAllSelection"
					:items="roomTypes"
					placeholder="Select room types"
					select-all
					searchable
				/>
				<p class="text-xs text-muted">
					Selected: <code>{{ selectAllSelection }}</code>
				</p>
			</div>
		</section>

		<!-- Search -->
		<section id="search" class="space-y-4">
			<ProseH3>Searchable</ProseH3>
			<p class="text-sm text-muted">
				Adds a search input at the top of the popover. Filters leaf items by label and auto-expands matching parent nodes. Shows an empty state when no results match.
			</p>
			<div class="max-w-xs space-y-2">
				<SMultiSelect
					v-model="searchSelection"
					:items="roomTypes"
					placeholder="Select room types"
					searchable
				/>
				<p class="text-xs text-muted">
					Selected: <code>{{ searchSelection }}</code>
				</p>
			</div>
		</section>

		<!-- Radio Group -->
		<section id="radio-group" class="space-y-4">
			<ProseH3>Radio Group Mode</ProseH3>
			<p class="text-sm text-muted">
				Switches to single-root selection with radio buttons. Selecting a root item checks all its children. Individual children can be toggled via checkboxes within the selected group.
			</p>
			<div class="max-w-xs space-y-2">
				<SMultiSelect
					v-model="radioSelection"
					:items="roomTypes"
					mode="radio-group"
					placeholder="Select a property"
					searchable
				/>
				<p class="text-xs text-muted">
					Selected: <code>{{ radioSelection }}</code>
				</p>
			</div>
		</section>

		<!-- Custom Label -->
		<section id="custom-label" class="space-y-4">
			<ProseH3>Custom Label Function</ProseH3>
			<p class="text-sm text-muted">
				Use the <code>label-fn</code> prop to customize how the trigger button displays the selection summary. Receives the array of selected items.
			</p>
			<div class="max-w-xs space-y-2">
				<SMultiSelect
					v-model="customLabelSelection"
					:items="roomTypes"
					placeholder="Select room types"
					select-all
					searchable
					:label-fn="customLabel"
				/>
				<p class="text-xs text-muted">
					Selected: <code>{{ customLabelSelection }}</code>
				</p>
			</div>
		</section>

		<!-- Pre-selected -->
		<section id="preselected" class="space-y-4">
			<ProseH3>Pre-selected Values</ProseH3>
			<p class="text-sm text-muted">
				Pass an initial array to <code>v-model</code> to pre-select items. Parent chains are auto-expanded to reveal the selected leaves.
			</p>
			<div class="max-w-xs space-y-2">
				<SMultiSelect
					v-model="preselectedValues"
					:items="roomTypes"
					placeholder="Select room types"
					select-all
					searchable
				/>
				<p class="text-xs text-muted">
					Selected: <code>{{ preselectedValues }}</code>
				</p>
			</div>
		</section>

		<!-- Colors -->
		<section id="colors" class="space-y-4">
			<ProseH3>Colors</ProseH3>
			<p class="text-sm text-muted">
				All standard Nuxt UI colors are supported. The color is applied to the trigger button, checkboxes, and radio indicators.
			</p>
			<div class="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-2xl">
				<div
					v-for="color in colors"
					:key="color"
					class="space-y-1"
				>
					<div class="text-xs font-medium text-muted capitalize">
						{{ color }}
					</div>
					<SMultiSelect
						:items="simpleItems"
						:color="color"
						placeholder="Select..."
						select-all
					/>
				</div>
			</div>
		</section>

		<!-- Variants -->
		<section id="variants" class="space-y-4">
			<ProseH3>Variants</ProseH3>
			<p class="text-sm text-muted">
				Trigger button supports outline, soft, subtle, and ghost variants.
			</p>
			<div class="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-2xl">
				<div
					v-for="variant in variants"
					:key="variant"
					class="space-y-1"
				>
					<div class="text-xs font-medium text-muted capitalize">
						{{ variant }}
					</div>
					<SMultiSelect
						:items="simpleItems"
						:variant="variant"
						placeholder="Select..."
					/>
				</div>
			</div>
		</section>

		<!-- Sizes -->
		<section id="sizes" class="space-y-4">
			<ProseH3>Sizes</ProseH3>
			<p class="text-sm text-muted">
				Five size options from extra-small to extra-large. Size is applied to the trigger button.
			</p>
			<div class="space-y-3 max-w-xs">
				<div
					v-for="size in sizes"
					:key="size"
					class="space-y-1"
				>
					<div class="text-xs font-medium text-muted">
						{{ size }}
					</div>
					<SMultiSelect
						:items="simpleItems"
						:size="size"
						placeholder="Select..."
					/>
				</div>
			</div>
		</section>

		<!-- Disabled -->
		<section id="disabled" class="space-y-4">
			<ProseH3>Disabled</ProseH3>
			<p class="text-sm text-muted">
				The component is non-interactive when disabled. The popover will not open.
			</p>
			<div class="max-w-xs">
				<SMultiSelect
					:items="roomTypes"
					disabled
					placeholder="Disabled select"
				/>
			</div>
		</section>
	</ShowcasePage>
</template>

<script setup lang="ts">
	import type { PropDefinition } from "../Utility/PropsTable.vue";
	import type { MultiSelectItem } from "~/components/MultiSelect/types";
	import ShowcasePage from "~/components/Utility/ShowcasePage.vue";
	import PropsTable from "../Utility/PropsTable.vue";

	// --- Props table ---
	const propsData: PropDefinition[] = [
		{ prop: "modelValue", type: "string[]", description: "Array of selected leaf-item values (v-model).", default: "[]" },
		{ prop: "items", type: "MultiSelectItem[]", description: "Hierarchical tree items. Each item has label, value, and optional children." },
		{ prop: "mode", type: "'multiple' | 'radio-group'", description: "Selection mode. 'multiple' allows free multi-select; 'radio-group' limits to one root item at a time.", default: "multiple" },
		{ prop: "selectAll", type: "boolean", description: "Show a 'Select all' checkbox (multiple mode only).", default: "false" },
		{ prop: "searchable", type: "boolean", description: "Show a search input to filter items.", default: "false" },
		{ prop: "searchFn", type: "(item, term) => boolean", description: "Custom search filter function. Defaults to case-insensitive label matching." },
		{ prop: "labelFn", type: "(items) => string", description: "Custom function to format the trigger label from selected items." },
		{ prop: "placeholder", type: "string", description: "Placeholder text when nothing is selected." },
		{ prop: "disabled", type: "boolean", description: "Disable the component.", default: "false" },
		{ prop: "color", type: "string", description: "Color theme applied to trigger, checkboxes, and radio indicators.", default: "primary" },
		{ prop: "variant", type: "'solid' | 'link' | 'outline' | 'soft' | 'subtle' | 'ghost'", description: "Visual variant of the trigger button (UButton).", default: "outline" },
		{ prop: "size", type: "'xs' | 'sm' | 'md' | 'lg' | 'xl'", description: "Size of the trigger button.", default: "md" },
		{ prop: "defaultExpanded", type: "boolean | 'all' | 'none'", description: "Initial expand state for tree nodes.", default: "all" },
		{ prop: "locale", type: "MultiSelectLocale", description: "Override default locale strings (search, selectAll, empty, selected)." },
		{ prop: "ui", type: "MultiSelectUi", description: "CSS class overrides for internal parts (trigger, popover, search, tree, etc.)." },
	];

	// --- Demo data ---

	const roomTypes: MultiSelectItem[] = [
		{
			label: "Navigli House",
			value: "navigli-house",
			children: [
				{ label: "Singola Standard con Vista sul Naviglio Grande e Colazione Inclusa", value: "navigli-singola" },
				{ label: "Doppia", value: "navigli-doppia" },
			],
		},
		{
			label: "Duomo Suite",
			value: "duomo-suite",
			children: [
				{ label: "Duomo Suite", value: "duomo-suite-room" },
			],
		},
		{
			label: "Brera Gardens",
			value: "brera-gardens",
			children: [
				{ label: "Singola", value: "brera-singola" },
				{ label: "Doppia", value: "brera-doppia" },
				{ label: "Tripla", value: "brera-tripla" },
				{ label: "Quadrupla", value: "brera-quadrupla" },
			],
		},
	];

	const simpleItems: MultiSelectItem[] = [
		{
			label: "Category A",
			value: "cat-a",
			children: [
				{ label: "Item 1", value: "a-1" },
				{ label: "Item 2", value: "a-2" },
			],
		},
		{
			label: "Category B",
			value: "cat-b",
			children: [
				{ label: "Item 3", value: "b-3" },
				{ label: "Item 4", value: "b-4" },
			],
		},
	];

	const colors = ["primary", "secondary", "success", "info", "warning", "error", "neutral"] as const;
	const sizes = ["xs", "sm", "md", "lg", "xl"] as const;
	const variants = ["outline", "soft", "subtle", "ghost"] as const;

	// --- Demo state ---

	const basicSelection = ref<string[]>([]);
	const selectAllSelection = ref<string[]>([]);
	const searchSelection = ref<string[]>([]);
	const radioSelection = ref<string[]>([]);
	const customLabelSelection = ref<string[]>([]);
	const preselectedValues = ref<string[]>(["navigli-singola", "brera-doppia"]);

	function customLabel(items: MultiSelectItem[]): string {
		if (items.length === 0) return "No rooms selected";
		if (items.length === 1) return items[0].label ?? "1 room";
		return `${items.length} rooms selected`;
	}
</script>
