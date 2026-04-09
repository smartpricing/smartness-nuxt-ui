<template>
	<ShowcasePage>
		<section id="basic">
			<h2>Basic Multiple Selection</h2>
			<div class="max-w-xs space-y-2">
				<SMultiSelect
					v-model="basicSelection"
					:items="roomTypes"
					placeholder="Select room types"
				/>
				<p class="text-sm text-muted">
					Selected: {{ basicSelection }}
				</p>
			</div>
		</section>

		<section id="select-all">
			<h2>With Select All</h2>
			<div class="max-w-xs space-y-2">
				<SMultiSelect
					v-model="selectAllSelection"
					:items="roomTypes"
					placeholder="Select room types"
					select-all
					searchable
				/>
				<p class="text-sm text-muted">
					Selected: {{ selectAllSelection }}
				</p>
			</div>
		</section>

		<section id="search">
			<h2>With Search</h2>
			<div class="max-w-xs space-y-2">
				<SMultiSelect
					v-model="searchSelection"
					:items="roomTypes"
					placeholder="Select room types"
					searchable
				/>
				<p class="text-sm text-muted">
					Selected: {{ searchSelection }}
				</p>
			</div>
		</section>

		<section id="radio-group">
			<h2>Radio Group Mode</h2>
			<div class="max-w-xs space-y-2">
				<SMultiSelect
					v-model="radioSelection"
					:items="roomTypes"
					mode="radio-group"
					placeholder="Select a property"
					searchable
				/>
				<p class="text-sm text-muted">
					Selected: {{ radioSelection }}
				</p>
			</div>
		</section>

		<section id="custom-label">
			<h2>Custom Label Function</h2>
			<div class="max-w-xs space-y-2">
				<SMultiSelect
					v-model="customLabelSelection"
					:items="roomTypes"
					placeholder="Select room types"
					select-all
					searchable
					:label-fn="customLabel"
				/>
				<p class="text-sm text-muted">
					Selected: {{ customLabelSelection }}
				</p>
			</div>
		</section>

		<section id="colors">
			<h2>Colors</h2>
			<div class="grid grid-cols-2 gap-4 max-w-lg">
				<div
					v-for="color in colors"
					:key="color"
				>
					<p class="text-xs text-muted mb-1 capitalize">
						{{ color }}
					</p>
					<SMultiSelect
						:items="simpleItems"
						:color="color"
						placeholder="Select..."
						select-all
					/>
				</div>
			</div>
		</section>

		<section id="sizes">
			<h2>Sizes</h2>
			<div class="space-y-3 max-w-xs">
				<div
					v-for="size in sizes"
					:key="size"
				>
					<p class="text-xs text-muted mb-1">
						{{ size }}
					</p>
					<SMultiSelect
						:items="simpleItems"
						:size="size"
						placeholder="Select..."
					/>
				</div>
			</div>
		</section>

		<section id="variants">
			<h2>Variants</h2>
			<div class="space-y-3 max-w-xs">
				<div
					v-for="variant in variants"
					:key="variant"
				>
					<p class="text-xs text-muted mb-1">
						{{ variant }}
					</p>
					<SMultiSelect
						:items="simpleItems"
						:variant="variant"
						placeholder="Select..."
					/>
				</div>
			</div>
		</section>

		<section id="disabled">
			<h2>Disabled</h2>
			<div class="max-w-xs">
				<SMultiSelect
					:items="roomTypes"
					disabled
					placeholder="Disabled select"
				/>
			</div>
		</section>

		<section id="preselected">
			<h2>Pre-selected Values</h2>
			<div class="max-w-xs space-y-2">
				<SMultiSelect
					v-model="preselectedValues"
					:items="roomTypes"
					placeholder="Select room types"
					select-all
					searchable
				/>
				<p class="text-sm text-muted">
					Selected: {{ preselectedValues }}
				</p>
			</div>
		</section>
	</ShowcasePage>
</template>

<script setup lang="ts">
	import type { MultiSelectItem } from "~/components/MultiSelect/types";

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
