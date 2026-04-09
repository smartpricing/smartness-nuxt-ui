<template>
	<div class="py-1">
		<URadioGroup
			:model-value="activeRadio ?? undefined"
			:items="radioGroupItems"
			:color="color"
			value-key="value"
			label-key="label"
			@update:model-value="handleRadioGroupChange"
		>
			<template #label="{ item }">
				<span class="flex items-center gap-1 w-full min-w-0">
					<span class="flex-1 min-w-0 truncate">
						<slot name="item-label" :item="findRootItem(item.value)">
							<STruncatedText :text="item.label ?? ''" />
						</slot>
					</span>
					<UIcon
						v-if="findRootItem(item.value)?.children?.length"
						:name="
							isRootExpanded(item.value)
								? 'ph:caret-down'
								: 'ph:caret-right'
						"
						class="size-4 shrink-0 text-muted hover:text-highlighted cursor-pointer"
						@click.stop="toggleRootExpanded(item.value)"
					/>
				</span>
			</template>
			<template #description="{ item }">
				<div
					v-if="findRootItem(item.value)?.children?.length && isRootExpanded(item.value)"
					class="pt-1"
				>
					<SMultiSelectTree
						:items="findRootItem(item.value)!.children!"
						:model-value="getChildModelValue(item.value)"
						:color="color"
						:expanded-keys="expandedKeys"
						@update:model-value="(keys: string[]) => handleChildSelect(item.value, keys)"
						@update:expanded-keys="handleExpandedChange"
					>
						<template v-if="$slots['item-label']" #item-label="slotProps">
							<slot name="item-label" v-bind="slotProps" />
						</template>
						<template v-if="$slots['item-trailing']" #item-trailing="slotProps">
							<slot name="item-trailing" v-bind="slotProps" />
						</template>
					</SMultiSelectTree>
				</div>
			</template>
		</URadioGroup>
	</div>
</template>

<script setup lang="ts">
	import type { MultiSelectColor, MultiSelectItem } from "./types";
	import { findItemsByKeys, getAllKeys, getItemKey, getLeafKeys, toggleKey } from "./utils";

	const props = defineProps<{
		items: MultiSelectItem[]
		filteredItems: MultiSelectItem[]
		modelValue: string[]
		color?: MultiSelectColor
	}>();

	const emit = defineEmits<{
		"update:modelValue": [value: string[]]
	}>();

	const expandedKeys = defineModel<string[]>("expandedKeys", { default: () => [] });

	// --- State ---

	const activeRadio = ref<string | null>(null);

	// --- Computed ---

	const radioGroupItems = computed(() =>
		props.filteredItems.map((item) => ({
			label: item.label ?? "",
			value: getItemKey(item)
		}))
	);

	// --- Helpers ---

	const rootItemMap = computed(() => {
		const map = new Map<string, MultiSelectItem>();
		for (const item of props.filteredItems) {
			map.set(getItemKey(item), item);
		}
		return map;
	});

	function findRootItem(value: string): MultiSelectItem | undefined {
		return rootItemMap.value.get(value);
	}

	function isRootExpanded(value: string): boolean {
		return expandedKeys.value.includes(value);
	}

	function toggleRootExpanded(value: string) {
		expandedKeys.value = toggleKey(expandedKeys.value, value);
	}

	function getChildModelValue(rootValue: string): string[] {
		const rootItem = findRootItem(rootValue);
		if (!rootItem?.children?.length) return [];
		return findItemsByKeys(rootItem.children, props.modelValue)
			.filter((item) => !item.children?.length)
			.map(getItemKey);
	}

	// --- Handlers ---

	function handleRadioGroupChange(value: string) {
		const rootItem = props.items.find((item) => getItemKey(item) === value);
		if (!rootItem) return;

		const rootKey = getItemKey(rootItem);
		if (activeRadio.value === rootKey) return;

		activeRadio.value = rootKey;
		const childKeys = rootItem.children?.length
			? getLeafKeys(rootItem.children)
			: [];
		emit("update:modelValue", childKeys);

		// Auto-expand children
		if (rootItem.children?.length) {
			const allChildKeys = getAllKeys(rootItem.children);
			expandedKeys.value = [...new Set([...expandedKeys.value, ...allChildKeys])];
		}
	}

	function handleChildSelect(rootValue: string, leafKeys: string[]) {
		activeRadio.value = rootValue;
		emit("update:modelValue", leafKeys);
	}

	function handleExpandedChange(keys: string[]) {
		expandedKeys.value = keys;
	}

	// --- Initialize activeRadio from modelValue ---

	onMounted(() => {
		if (props.modelValue.length > 0) {
			for (const rootItem of props.items) {
				const childKeys = rootItem.children?.length
					? getLeafKeys(rootItem.children)
					: [];
				if (props.modelValue.some((k) => childKeys.includes(k))) {
					activeRadio.value = getItemKey(rootItem);
					break;
				}
			}
		}
	});
</script>
