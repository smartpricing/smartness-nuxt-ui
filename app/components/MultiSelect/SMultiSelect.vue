<template>
	<UPopover
		v-model:open="isOpen"
		:content="{ side: 'bottom', align: 'start', sideOffset: 4 }"
		:ui="{
			content: [
				'ring-1 ring-default rounded-md shadow-lg w-(--reka-popover-trigger-width)',
				props.ui?.popover,
			]
				.filter(Boolean)
				.join(' '),
		}"
		:disabled="props.disabled"
		@update:open="(val: boolean) => emit('update:open', val)"
	>
		<!-- Trigger -->
		<slot
			name="trigger"
			:open="isOpen"
			:model-value="modelValue"
			:label="triggerLabel"
		>
			<UButton
				block
				:color="props.color"
				:variant="props.variant"
				:size="props.size"
				:disabled="props.disabled"
				trailing-icon="i-lucide-chevron-down"
				class="justify-between"
				:class="props.ui?.trigger"
			>
				<slot
					name="label"
					:model-value="modelValue"
					:selected-items="selectedItems"
				>
					<span :class="modelValue.length === 0 ? 'text-muted' : ''">
						{{ triggerLabel }}
					</span>
				</slot>
			</UButton>
		</slot>

		<!-- Popover content -->
		<template #content>
			<div class="flex flex-col">
				<!-- Search input -->
				<UInput
					v-if="props.searchable"
					v-model="searchTerm"
					:placeholder="resolvedSearchPlaceholder"
					variant="none"
					:autofocus="true"
					icon="ph:magnifying-glass"
					class="border-b border-default"
					:class="[props.ui?.search]"
					@update:model-value="
						(val: string | number) => emit('update:searchTerm', String(val))
					"
				/>

				<!-- Select all (multiple mode only) -->
				<div
					v-if="props.selectAll && props.mode === 'multiple'"
					class="flex items-center px-2.5 py-1.5"
					:class="[props.ui?.selectAll]"
				>
					<UCheckbox
						:model-value="
							selectAllState === 'checked'
								? true
								: selectAllState === 'indeterminate'
									? 'indeterminate'
									: false
						"
						:label="resolvedSelectAllLabel"
						:color="props.color"
						@update:model-value="handleSelectAll"
					/>
				</div>

				<!-- Tree content (scrollable) -->
				<div
					v-if="hasVisibleItems"
					class="max-h-60 overflow-y-auto p-1.5"
					:class="[props.ui?.tree]"
				>
					<!-- Multiple mode -->
					<SMultiSelectTree
						v-if="props.mode === 'multiple'"
						v-model:expanded-keys="expandedKeys"
						:items="filteredItems"
						:model-value="modelValue"
						:color="props.color"
						@update:model-value="handleTreeModelUpdate"
					>
						<template v-if="$slots['item-label']" #item-label="slotProps">
							<slot name="item-label" v-bind="slotProps" />
						</template>
						<template v-if="$slots['item-trailing']" #item-trailing="slotProps">
							<slot name="item-trailing" v-bind="slotProps" />
						</template>
					</SMultiSelectTree>

					<!-- Radio-group mode -->
					<SMultiSelectRadioGroup
						v-else
						v-model:expanded-keys="expandedKeys"
						:items="props.items"
						:filtered-items="filteredItems"
						:model-value="modelValue"
						:color="props.color"
						@update:model-value="handleRadioModelUpdate"
					>
						<template v-if="$slots['item-label']" #item-label="slotProps">
							<slot name="item-label" v-bind="slotProps" />
						</template>
						<template v-if="$slots['item-trailing']" #item-trailing="slotProps">
							<slot name="item-trailing" v-bind="slotProps" />
						</template>
					</SMultiSelectRadioGroup>
				</div>

				<!-- Empty state -->
				<div
					v-if="!hasVisibleItems && searchTerm"
					class="flex flex-col items-center justify-center py-6 text-muted"
					:class="[props.ui?.empty]"
				>
					<slot name="empty" :search-term="searchTerm">
						<UIcon name="ph:magnifying-glass-minus" class="size-8 mb-2" />
						<span class="text-sm">{{ resolvedEmptyText }}</span>
					</slot>
				</div>

				<!-- Footer slot -->
				<div
					v-if="$slots.footer"
					class="border-t border-default"
					:class="[props.ui?.footer]"
				>
					<slot name="footer" />
				</div>
			</div>
		</template>
	</UPopover>
</template>

<script setup lang="ts">
	import type { ButtonProps } from "@nuxt/ui";
	import type {
		MultiSelectColor,
		MultiSelectItem,
		MultiSelectLocale,
		MultiSelectUi
	} from "./types";
	import { useLocale } from "@nuxt/ui/composables";
	import SMultiSelectRadioGroup from "./SMultiSelectRadioGroup.vue";
	import SMultiSelectTree from "./SMultiSelectTree.vue";
	import {
		findItemsByKeys,
		getAllKeys,
		getEnabledLeafKeys,
		getParentChainKeys
	} from "./utils";

	const props = withDefaults(
		defineProps<{
			items: MultiSelectItem[]
			mode?: "multiple" | "radio-group"
			selectAll?: boolean
			searchable?: boolean
			searchFn?: (item: MultiSelectItem, term: string) => boolean
			labelFn?: (selectedItems: MultiSelectItem[]) => string
			placeholder?: string
			disabled?: boolean
			color?: MultiSelectColor
			variant?: ButtonProps["variant"]
			size?: "xs" | "sm" | "md" | "lg" | "xl"
			defaultExpanded?: boolean | "all" | "none"
			locale?: MultiSelectLocale
			searchPlaceholder?: string
			selectAllLabel?: string
			emptyText?: string
			ui?: MultiSelectUi
		}>(),
		{
			mode: "multiple",
			selectAll: false,
			searchable: false,
			placeholder: "",
			disabled: false,
			color: "primary",
			variant: "outline",
			size: "md",
			defaultExpanded: "all"
		}
	);

	const emit = defineEmits<{
		"update:open": [value: boolean]
		"update:searchTerm": [value: string]
		select: [payload: { item: MultiSelectItem, selected: boolean }]
	}>();

	const modelValue = defineModel<string[]>({ default: () => [] });

	// --- State ---

	const isOpen = ref(false);
	const searchTerm = ref("");
	const expandedKeys = ref<string[]>([]);

	// --- Locale resolution ---

	const { t } = useLocale();

	const resolvedLocale = computed(() => ({
		search: t("sMultiSelect.search"),
		selectAll: t("sMultiSelect.selectAll"),
		empty: t("sMultiSelect.empty"),
		selected: t("sMultiSelect.selected"),
		...props.locale
	}));

	const resolvedSearchPlaceholder = computed(
		() => props.searchPlaceholder ?? resolvedLocale.value.search
	);

	const resolvedSelectAllLabel = computed(
		() => props.selectAllLabel ?? resolvedLocale.value.selectAll
	);

	const resolvedEmptyText = computed(
		() => props.emptyText ?? resolvedLocale.value.empty
	);

	// --- Search filtering ---

	function defaultSearchFn(item: MultiSelectItem, term: string): boolean {
		return (item.label ?? "").toLowerCase().includes(term.toLowerCase());
	}

	function filterItems(
		items: MultiSelectItem[],
		term: string
	): MultiSelectItem[] {
		if (!term) return items;
		const filterFn = props.searchFn ?? defaultSearchFn;

		return items.reduce<MultiSelectItem[]>((acc, item) => {
			if (item.children?.length) {
				const filteredChildren = filterItems(item.children, term);
				if (filteredChildren.length > 0) {
					acc.push({ ...item, children: filteredChildren });
				}
			} else if (filterFn(item, term)) {
				acc.push(item);
			}
			return acc;
		}, []);
	}

	const filteredItems = computed(() =>
		filterItems(props.items, searchTerm.value)
	);

	const hasVisibleItems = computed(() => filteredItems.value.length > 0);

	// --- Selected items ---

	const selectedItems = computed(() =>
		findItemsByKeys(props.items, modelValue.value)
	);

	// --- Trigger label ---

	const triggerLabel = computed(() => {
		if (modelValue.value.length === 0) {
			return (
				props.placeholder || resolvedLocale.value.selected.replace("{n}", "0")
			);
		}
		if (props.labelFn) {
			return props.labelFn(selectedItems.value);
		}
		return resolvedLocale.value.selected.replace(
			"{n}",
			String(modelValue.value.length)
		);
	});

	// --- Multiple mode: handle tree updates with select events ---

	function handleTreeModelUpdate(newKeys: string[]) {
		const added = newKeys.filter((k) => !modelValue.value.includes(k));
		const removed = modelValue.value.filter((k) => !newKeys.includes(k));
		const changedKeys = [...added, ...removed];
		if (changedKeys.length > 0) {
			const changedItems = findItemsByKeys(props.items, changedKeys);
			const changedMap = new Map(
				changedItems.map((item) => [item.value ?? item.label ?? "", item])
			);
			for (const key of added) {
				const item = changedMap.get(key);
				if (item) emit("select", { item, selected: true });
			}
			for (const key of removed) {
				const item = changedMap.get(key);
				if (item) emit("select", { item, selected: false });
			}
		}
		modelValue.value = newKeys;
	}

	// --- Radio-group mode: handle updates ---

	function handleRadioModelUpdate(newKeys: string[]) {
		modelValue.value = newKeys;
	}

	// --- Select all ---

	const selectAllState = computed(() => {
		const enabledKeys = getEnabledLeafKeys(filteredItems.value);
		if (enabledKeys.length === 0) return "unchecked";
		const selectedCount = enabledKeys.filter((k) =>
			modelValue.value.includes(k)
		).length;
		if (selectedCount === 0) return "unchecked";
		if (selectedCount === enabledKeys.length) return "checked";
		return "indeterminate";
	});

	function handleSelectAll() {
		const enabledKeys = getEnabledLeafKeys(filteredItems.value);
		if (selectAllState.value === "checked") {
			modelValue.value = modelValue.value.filter((k) => !enabledKeys.includes(k));
		} else {
			const merged = new Set([...modelValue.value, ...enabledKeys]);
			modelValue.value = [...merged];
		}
	}

	// --- Expand state ---

	function computeInitialExpanded(): string[] {
		const allKeys = getAllKeys(props.items);
		const expanded = props.defaultExpanded;

		let keys: string[] = [];
		if (expanded === "all" || expanded === true) {
			keys = allKeys;
		} else if (expanded === "none" || expanded === false) {
			keys = [];
		}

		if (modelValue.value.length > 0) {
			const parentKeys = getParentChainKeys(props.items, modelValue.value);
			keys = [...new Set([...keys, ...parentKeys])];
		}

		return keys;
	}

	// --- Search: force expand matching items ---

	watch(searchTerm, (term) => {
		if (term) {
			expandedKeys.value = getAllKeys(filteredItems.value);
		} else {
			expandedKeys.value = computeInitialExpanded();
		}
	});

	// --- Reset search on close ---

	watch(isOpen, (open) => {
		if (!open) {
			searchTerm.value = "";
		}
	});

	// --- Initialize expanded state ---

	onMounted(() => {
		expandedKeys.value = computeInitialExpanded();
	});
</script>
