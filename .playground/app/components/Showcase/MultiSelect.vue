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

		<!-- Virtualized -->
		<section id="virtualized" class="space-y-4">
			<ProseH3>Virtualized</ProseH3>
			<p class="text-sm text-muted">
				<code>virtualize</code> is forwarded to <code>UTree</code> (multiple mode): only the visible rows are rendered, keyboard navigation is kept and the nested guide line is redrawn with CSS. Use it above a few hundred items. The first example mirrors the PMS "excluded portals" case — a flat <code>{{ portalItems.length }}</code>-item list mapped from the reservation-sources collection, with a prefilled <code>v-model</code>.
			</p>
			<div class="grid gap-4 sm:grid-cols-2 max-w-2xl">
				<div class="space-y-2">
					<p class="text-xs font-medium">
						Multiple — {{ portalItems.length }} portals (flat)
					</p>
					<SMultiSelect
						v-model="virtualPortalSelection"
						:items="portalItems"
						mode="multiple"
						input-color="secondary"
						searchable
						select-all
						virtualize
						placeholder="Select portals"
					/>
					<p class="text-xs text-muted">
						Selected: <code>{{ virtualPortalSelection.length }}</code> — <code>{{ virtualPortalSelection.slice(0, 4) }}</code>
					</p>
				</div>
				<div class="space-y-2">
					<p class="text-xs font-medium">
						Multiple — {{ largeTreeItems.length }} groups × 50 children
					</p>
					<SMultiSelect
						v-model="virtualTreeSelection"
						:items="largeTreeItems"
						mode="multiple"
						searchable
						select-all
						:virtualize="{ overscan: 8 }"
						placeholder="Select rooms"
					/>
					<p class="text-xs text-muted">
						Selected: <code>{{ virtualTreeSelection.length }}</code>
					</p>
				</div>
			</div>
		</section>

		<!-- Clear -->
		<section id="clear" class="space-y-4">
			<ProseH3>Clear</ProseH3>
			<p class="text-sm text-muted">
				<code>clear</code> mirrors <code>USelectMenu</code>: when there is a selection a clear button appears next to the chevron (like the PMS date picker) and empties the <code>v-model</code> and emits <code>clear</code>. Pass <code>ButtonProps</code> to customize the button, <code>clear-icon</code> to change the icon.
			</p>
			<div class="grid gap-4 sm:grid-cols-2 max-w-2xl">
				<div class="space-y-2">
					<p class="text-xs font-medium">
						Multiple
					</p>
					<SMultiSelect
						v-model="clearSelection"
						:items="roomTypes"
						placeholder="Select room types"
						select-all
						searchable
						clear
						@clear="clearCount++"
					/>
					<p class="text-xs text-muted">
						Selected: <code>{{ clearSelection }}</code> — cleared <code>{{ clearCount }}</code> times
					</p>
				</div>
				<div class="space-y-2">
					<p class="text-xs font-medium">
						Radio-group
					</p>
					<SMultiSelect
						v-model="clearRadioSelection"
						:items="roomTypes"
						mode="radio-group"
						placeholder="Select a property"
						searchable
						clear
					/>
					<p class="text-xs text-muted">
						Selected: <code>{{ clearRadioSelection }}</code>
					</p>
				</div>
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
				The trigger uses a neutral style matching <code>USelect</code>. The <code>input-color</code> prop controls checkboxes and radio indicators (defaults to <code>primary</code>).
			</p>
			<div class="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-2xl">
				<div
					v-for="color in colors"
					:key="color"
					class="space-y-1"
				>
					<div class="text-xs font-medium text-muted capitalize">
						{{ color }} inputs
					</div>
					<SMultiSelect
						:items="simpleItems"
						:input-color="color"
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
				The component is non-interactive when disabled and the popover will not open.
				Nuxt UI signals <code>disabled</code> by lowering opacity; the Smartness design system
				instead greys the trigger with a flat surface (<code>bg-primary-50</code>, <code>#F0F2F3</code>)
				and muted text, at full opacity. The trigger is a <code>UButton</code>, so the override
				needs a trailing <code>!</code> to beat the layer's own <code>disabled:!bg-transparent</code>.
			</p>
			<div class="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl">
				<div
					v-for="state in ([false, true] as const)"
					:key="String(state)"
					class="space-y-3"
				>
					<div class="text-xs font-medium text-muted">
						{{ state ? "Disabled" : "Enabled" }}
					</div>

					<div
						v-for="variant in variants"
						:key="variant"
						class="space-y-1"
					>
						<div class="text-xs text-dimmed capitalize">
							{{ variant }}
						</div>
						<SMultiSelect
							:items="simpleItems"
							:variant="variant"
							:disabled="state"
							placeholder="Select..."
						/>
					</div>

					<div class="space-y-1">
						<div class="text-xs text-dimmed">
							with selection
						</div>
						<SMultiSelect
							v-model="disabledSelection"
							:items="roomTypes"
							:disabled="state"
							placeholder="Select..."
						/>
					</div>
				</div>
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
		{ prop: "clear", type: "boolean | ButtonProps", description: "Shows a clear button next to the chevron when there is a selection (mirrors USelectMenu). Empties the v-model and emits `clear`.", default: "false" },
		{ prop: "clearIcon", type: "string", description: "Icon of the clear button.", default: "appConfig.ui.icons.close" },
		{ prop: "virtualize", type: "boolean | { overscan?: number, estimateSize?: number | (i) => number }", description: "Forwarded to UTree (multiple mode only): renders only the visible rows. Recommended above a few hundred items.", default: "false" },
		{ prop: "selectAll", type: "boolean", description: "Show a 'Select all' checkbox (multiple mode only).", default: "false" },
		{ prop: "searchable", type: "boolean", description: "Show a search input to filter items.", default: "false" },
		{ prop: "searchFn", type: "(item, term) => boolean", description: "Custom search filter function. Defaults to case-insensitive label matching." },
		{ prop: "labelFn", type: "(items) => string", description: "Custom function to format the trigger label from selected items." },
		{ prop: "placeholder", type: "string", description: "Placeholder text when nothing is selected." },
		{ prop: "disabled", type: "boolean", description: "Disable the component.", default: "false" },
		{ prop: "color", type: "string", description: "Color theme for the trigger focus ring (trigger uses neutral styling like USelect).", default: "primary" },
		{ prop: "inputColor", type: "string", description: "Color theme applied to checkboxes, radio indicators, and select-all checkbox.", default: "primary" },
		{ prop: "variant", type: "'solid' | 'link' | 'outline' | 'soft' | 'subtle' | 'ghost'", description: "Visual variant of the trigger button (UButton).", default: "outline" },
		{ prop: "size", type: "'xs' | 'sm' | 'md' | 'lg' | 'xl'", description: "Size of the trigger button.", default: "md" },
		{ prop: "defaultExpanded", type: "boolean | 'all' | 'none'", description: "Initial expand state for tree nodes.", default: "all" },
		{ prop: "locale", type: "MultiSelectLocale", description: "Override default locale strings (search, selectAll, empty, selected)." },
		{ prop: "ui", type: "MultiSelectUi", description: "CSS class overrides for internal parts (trigger, popover, search, tree, etc.)." }
	];

	// --- Demo data ---

	const roomTypes: MultiSelectItem[] = [
		{
			label: "Navigli House",
			value: "navigli-house",
			children: [
				{ label: "Singola Standard con Vista sul Naviglio Grande e Colazione Inclusa", value: "navigli-singola" },
				{ label: "Doppia", value: "navigli-doppia" }
			]
		},
		{
			label: "Duomo Suite",
			value: "duomo-suite",
			children: [
				{ label: "Duomo Suite", value: "duomo-suite-room" }
			]
		},
		{
			label: "Brera Gardens",
			value: "brera-gardens",
			children: [
				{ label: "Singola", value: "brera-singola" },
				{ label: "Doppia", value: "brera-doppia" },
				{ label: "Tripla", value: "brera-tripla" },
				{ label: "Quadrupla", value: "brera-quadrupla" }
			]
		}
	];

	const simpleItems: MultiSelectItem[] = [
		{
			label: "Category A",
			value: "cat-a",
			children: [
				{ label: "Item 1", value: "a-1" },
				{ label: "Item 2", value: "a-2" }
			]
		},
		{
			label: "Category B",
			value: "cat-b",
			children: [
				{ label: "Item 3", value: "b-3" },
				{ label: "Item 4", value: "b-4" }
			]
		}
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
	const disabledSelection = ref<string[]>(["navigli-singola", "brera-doppia"]);
	const clearSelection = ref<string[]>(["navigli-singola", "brera-doppia"]);
	const clearCount = ref(0);
	const clearRadioSelection = ref<string[]>(["navigli-singola", "navigli-doppia"]);

	// --- Virtualized demo data ---

	/** Same shape as the PMS reservation-sources collection */
	interface ReservationSource {
		id: number
		name: string
		human_name: string
		image_url: string
	}

	const baseSources: ReservationSource[] = [
		{ id: 1, name: "unknown", human_name: "Unknown", image_url: "https://api.ciaobooking.com/images/ota/default.svg" },
		{ id: 2, name: "pms", human_name: "Direct", image_url: "https://api.ciaobooking.com/images/ota/pms.svg" },
		{ id: 3, name: "booking_engine", human_name: "Booking Engine", image_url: "https://api.ciaobooking.com/images/ota/booking_engine.svg" },
		{ id: 4, name: "booking", human_name: "Booking.com", image_url: "https://api.ciaobooking.com/images/ota/booking_com.svg" },
		{ id: 5, name: "expedia", human_name: "Expedia", image_url: "https://api.ciaobooking.com/images/ota/expedia.svg" },
		{ id: 6, name: "airbnb", human_name: "Airbnb", image_url: "https://api.ciaobooking.com/images/ota/airbnb.svg" }
	];

	const reservationSources: ReservationSource[] = [
		...baseSources,
		...Array.from({ length: 1500 - baseSources.length }, (_, i) => {
			const id = baseSources.length + i + 1;
			return {
				id,
				name: `ota_${id}`,
				human_name: `OTA Partner ${String(id).padStart(4, "0")}`,
				image_url: "https://api.ciaobooking.com/images/ota/default.svg"
			};
		})
	];

	// Same mapping used in the PMS (Preset/CityTax/Step/Settings.vue)
	const portalItems = computed<MultiSelectItem[]>(() =>
		reservationSources.map((source) => ({
			value: String(source.id),
			label: source.human_name || source.name
		}))
	);

	const largeTreeItems: MultiSelectItem[] = Array.from({ length: 200 }, (_, g) => ({
		label: `Property ${g + 1}`,
		value: `property-${g + 1}`,
		children: Array.from({ length: 50 }, (_, c) => ({
			label: `Property ${g + 1} — Room ${c + 1}`,
			value: `property-${g + 1}-room-${c + 1}`
		}))
	}));

	const virtualPortalSelection = ref<string[]>(["2", "4", "150", "1499"]);
	const virtualTreeSelection = ref<string[]>(["property-2-room-1", "property-2-room-2", "property-150-room-50"]);

	function customLabel(items: MultiSelectItem[]): string {
		if (items.length === 0) return "No rooms selected";
		if (items.length === 1) return items[0].label ?? "1 room";
		return `${items.length} rooms selected`;
	}
</script>
