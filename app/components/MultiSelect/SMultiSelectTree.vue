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
		:on-toggle="
			(e: TreeItemToggleEvent<MultiSelectItem>) => e.preventDefault()
		"
		@update:model-value="handleTreeSelect"
		@update:expanded="handleExpandedChange"
	>
		<template #item-leading="{ item, selected, indeterminate, handleSelect }">
			<UCheckbox
				as="div"
				:model-value="
					selected ? true : indeterminate ? 'indeterminate' : false
				"
				:color="color"
				:disabled="(item as MultiSelectItem).disabled"
				@update:model-value="handleSelect"
				@click.stop
			/>
		</template>
		<template #item-label="slotProps">
			<slot name="item-label" v-bind="slotProps">
				<STruncatedText :text="(slotProps.item as MultiSelectItem).label ?? ''" />
			</slot>
		</template>
		<template #item-trailing="{ item }">
			<slot name="item-trailing" :item="item">
				<UIcon
					v-if="(item as MultiSelectItem).children?.length"
					:name="
						expandedKeys.includes(getItemKey(item as MultiSelectItem))
							? 'ph:caret-down'
							: 'ph:caret-right'
					"
					class="size-4 cursor-pointer text-muted hover:text-highlighted"
					@click.stop="
						toggleItemExpanded(getItemKey(item as MultiSelectItem))
					"
				/>
			</slot>
		</template>
	</UTree>
</template>

<script setup lang="ts">
	import type { TreeItemToggleEvent } from "reka-ui";
	import type { MultiSelectColor, MultiSelectItem } from "./types";
	import { getItemKey, getLeafKeys, toggleKey } from "./utils";

	const props = defineProps<{
		items: MultiSelectItem[]
		modelValue: string[]
		color?: MultiSelectColor
	}>();

	const emit = defineEmits<{
		"update:modelValue": [value: string[]]
		"update:expandedKeys": [value: string[]]
	}>();

	const expandedKeys = defineModel<string[]>("expandedKeys", { default: () => [] });

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
