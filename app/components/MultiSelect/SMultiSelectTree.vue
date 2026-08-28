<template>
	<UTree
		:items="items"
		:model-value="treeSelectedItems"
		:expanded="expandedKeys"
		multiple
		propagate-select
		bubble-select
		:color="color"
		:get-key="getItemKey"
		trailing-icon=""
		expanded-icon=""
		collapsed-icon=""
		:virtualize="virtualize"
		:ui="{ link: 'text-default', root: virtualize ? 's-multiselect-tree-flat' : undefined }"
		:on-toggle="(e: TreeItemToggleEvent<MultiSelectItem>) => e.preventDefault()"
		@update:model-value="handleTreeSelect"
		@update:expanded="handleExpandedChange"
	>
		<template #item-leading="{ item, selected, indeterminate, handleSelect }">
			<UCheckbox
				as="div"
				:model-value="selected ? true : indeterminate ? 'indeterminate' : false"
				:color="color"
				:disabled="(item as MultiSelectItem).disabled"
				@update:model-value="handleSelect"
				@click.stop
			/>
		</template>
		<template #item-label="slotProps">
			<slot name="item-label" v-bind="slotProps">
				<span
					class="block truncate"
					:title="(slotProps.item as MultiSelectItem).label"
				>
					{{ (slotProps.item as MultiSelectItem).label }}
				</span>
			</slot>
		</template>
		<template #item-trailing="{ item }">
			<slot name="item-trailing" :item="item">
				<UIcon
					v-if="(item as MultiSelectItem).children?.length"
					name="ph:caret-right"
					class="size-4 cursor-pointer text-muted hover:text-highlighted transition-transform duration-200"
					:class="expandedKeys.includes(getItemKey(item as MultiSelectItem)) ? 'rotate-90' : ''"
					@click.stop="toggleItemExpanded(getItemKey(item as MultiSelectItem))"
				/>
			</slot>
		</template>
	</UTree>
</template>

<script setup lang="ts">
	import type { TreeProps } from "@nuxt/ui";
	import type { TreeItemToggleEvent } from "reka-ui";
	import type { MultiSelectColor, MultiSelectItem } from "./types";
	import { getItemKey, getLeafKeys, toggleKey } from "./utils";

	const props = withDefaults(
		defineProps<{
			items: MultiSelectItem[]
			modelValue: string[]
			color?: MultiSelectColor
			virtualize?: TreeProps["virtualize"]
		}>(),
		{ virtualize: false }
	);

	const emit = defineEmits<{
		"update:modelValue": [value: string[]]
		"update:expandedKeys": [value: string[]]
	}>();

	const expandedKeys = defineModel<string[]>("expandedKeys", {
		default: () => []
	});

	// --- Tree selection mapping ---

	function getSelectedItemsWithParents(
		items: MultiSelectItem[],
		selectedKeys: string[]
	): MultiSelectItem[] {
		const result: MultiSelectItem[] = [];
		for (const item of items) {
			if (item.children?.length) {
				const selectedChildren = getSelectedItemsWithParents(
					item.children,
					selectedKeys
				);
				result.push(...selectedChildren);
				const leafKeys = getLeafKeys([item]);
				if (
					leafKeys.length > 0
					&& leafKeys.every((k) => selectedKeys.includes(k))
				) {
					result.push(item);
				}
			} else if (selectedKeys.includes(getItemKey(item))) {
				result.push(item);
			}
		}
		return result;
	}

	const treeSelectedItems = computed(() =>
		getSelectedItemsWithParents(props.items, props.modelValue)
	);

	function handleTreeSelect(selected: MultiSelectItem[]) {
		const leafKeys = selected
			.filter((item) => !item.children?.length)
			.map(getItemKey);
		emit("update:modelValue", [...new Set(leafKeys)]);
	}

	// --- Expand state ---

	function toggleItemExpanded(key: string) {
		expandedKeys.value = toggleKey(expandedKeys.value, key);
	}

	function handleExpandedChange(keys: string[]) {
		expandedKeys.value = keys;
	}
</script>

<style>
	/* Virtualized UTree guide line is lost. Redraw it */
	.s-multiselect-tree-flat [data-indent]:not([data-indent="1"])::after {
		content: "";
		position: absolute;
		inset-block: 0;
		inset-inline-start: 20px;
		z-index: -1;
		pointer-events: none;
		background-image: linear-gradient(to right, var(--ui-border) 1px, transparent 1px);
		background-size: 25px 100%;
		background-repeat: repeat-x;
	}

	.s-multiselect-tree-flat [data-indent="2"]::after { width: 1px; }
	.s-multiselect-tree-flat [data-indent="3"]::after { width: 26px; }
	.s-multiselect-tree-flat [data-indent="4"]::after { width: 51px; }
	.s-multiselect-tree-flat [data-indent="5"]::after { width: 76px; }
	.s-multiselect-tree-flat [data-indent="6"]::after { width: 101px; }
</style>
