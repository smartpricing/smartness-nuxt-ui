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
					<UTree
						v-if="props.mode === 'multiple'"
						:items="filteredItems"
						:model-value="treeSelectedItems"
						:expanded="expandedKeys"
						multiple
						propagate-select
						bubble-select
						:color="props.color"
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
						<template
							#item-leading="{ item, selected, indeterminate, handleSelect }"
						>
							<UCheckbox
								as="div"
								:model-value="
									selected ? true : indeterminate ? 'indeterminate' : false
								"
								:color="props.color"
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

					<!-- Radio-group mode -->
					<div v-else class="py-1">
						<div
							v-for="rootItem in filteredItems"
							:key="getItemKey(rootItem)"
							class="border-b border-default last:border-b-0"
						>
							<!-- Radio root item -->
							<button
								class="flex items-center gap-2 w-full px-2 py-1.5 text-sm hover:bg-elevated cursor-pointer"
								@click="handleRadioSelect(rootItem)"
							>
								<span
									class="flex items-center justify-center size-4 rounded-full border-2 shrink-0"
									:class="
										activeRadio === getItemKey(rootItem)
											? `border-${props.color} bg-${props.color}`
											: 'border-muted'
									"
								>
									<span
										v-if="activeRadio === getItemKey(rootItem)"
										class="size-1.5 rounded-full bg-white"
									/>
								</span>
								<span class="flex-1 text-left font-medium min-w-0">
									<slot name="item-label" :item="rootItem">
										<STruncatedText :text="rootItem.label ?? ''" />
									</slot>
								</span>
								<!-- Collapse toggle -->
								<UIcon
									v-if="rootItem.children?.length"
									:name="
										isRootExpanded(rootItem)
											? 'ph:caret-down'
											: 'ph:caret-right'
									"
									class="size-4 text-muted"
									@click.stop="toggleRootExpanded(rootItem)"
								/>
							</button>

							<!-- Children tree (collapsible) -->
							<div
								v-if="rootItem.children?.length && isRootExpanded(rootItem)"
								class="pl-4 pb-1"
							>
								<UTree
									:items="rootItem.children"
									:model-value="radioChildSelectedItems(rootItem)"
									:expanded="expandedKeys"
									multiple
									propagate-select
									bubble-select
									:color="props.color"
									:get-key="getItemKey"
									@update:model-value="
										(val: MultiSelectItem[]) =>
											handleRadioChildSelect(rootItem, val)
									"
									@update:expanded="handleExpandedChange"
								>
									<template
										#item-leading="{
											item,
											selected,
											indeterminate,
											handleSelect,
										}"
									>
										<UCheckbox
											as="div"
											:model-value="
												selected
													? true
													: indeterminate
														? 'indeterminate'
														: false
											"
											:color="props.color"
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
									<template #item-trailing="slotProps">
										<slot name="item-trailing" v-bind="slotProps" />
									</template>
								</UTree>
							</div>
						</div>
					</div>
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
	import type { TreeItemToggleEvent } from "reka-ui";
	import type {
		MultiSelectItem,
		MultiSelectLocale,
		MultiSelectUi
	} from "./types";
	import { DEFAULT_LOCALE } from "./types";

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
			color?:
				| "primary"
				| "secondary"
				| "success"
				| "info"
				| "warning"
				| "error"
				| "neutral"
			variant?: "outline" | "soft" | "subtle" | "ghost" | "none"
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
	const activeRadio = ref<string | null>(null);
	const expandedKeys = ref<string[]>([]);

	// --- Locale resolution ---

	const resolvedLocale = computed(() => ({
		...DEFAULT_LOCALE,
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

	// --- Helpers ---

	function getItemKey(item: MultiSelectItem): string {
		return item.value ?? item.label ?? "";
	}

	function getLeaves(items: MultiSelectItem[]): MultiSelectItem[] {
		const leaves: MultiSelectItem[] = [];
		for (const item of items) {
			if (item.children?.length) {
				leaves.push(...getLeaves(item.children));
			} else {
				leaves.push(item);
			}
		}
		return leaves;
	}

	function getLeafKeys(items: MultiSelectItem[]): string[] {
		return getLeaves(items).map(getItemKey);
	}

	function getEnabledLeafKeys(items: MultiSelectItem[]): string[] {
		return getLeaves(items)
			.filter((i) => !i.disabled)
			.map(getItemKey);
	}

	function findItemsByKeys(
		items: MultiSelectItem[],
		keys: string[]
	): MultiSelectItem[] {
		const result: MultiSelectItem[] = [];
		for (const item of items) {
			if (keys.includes(getItemKey(item))) {
				result.push(item);
			}
			if (item.children?.length) {
				result.push(...findItemsByKeys(item.children, keys));
			}
		}
		return result;
	}

	function getAllKeys(items: MultiSelectItem[]): string[] {
		const keys: string[] = [];
		for (const item of items) {
			keys.push(getItemKey(item));
			if (item.children?.length) {
				keys.push(...getAllKeys(item.children));
			}
		}
		return keys;
	}

	function getParentChainKeys(
		items: MultiSelectItem[],
		targetKeys: string[]
	): string[] {
		const parentKeys: string[] = [];
		function walk(nodes: MultiSelectItem[]): boolean {
			for (const node of nodes) {
				const key = getItemKey(node);
				if (targetKeys.includes(key)) {
					return true;
				}
				if (node.children?.length && walk(node.children)) {
					parentKeys.push(key);
					return true;
				}
			}
			return false;
		}
		walk(items);
		return parentKeys;
	}

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

	// --- Multiple mode: tree selection mapping ---

	function getSelectedItemsWithParents(
		items: MultiSelectItem[],
		selectedKeys: string[]
	): MultiSelectItem[] {
		const result: MultiSelectItem[] = [];
		for (const item of items) {
			if (item.children?.length) {
				// Recurse into children first
				const selectedChildren = getSelectedItemsWithParents(
					item.children,
					selectedKeys
				);
				result.push(...selectedChildren);
				// Include parent if ALL its leaves are selected
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
		getSelectedItemsWithParents(props.items, modelValue.value)
	);

	function handleTreeSelect(selected: MultiSelectItem[]) {
		const leafKeys = selected
			.filter((item) => !item.children?.length)
			.map(getItemKey);
		const newKeys = [...new Set(leafKeys)];

		// Emit select events for changes
		const added = newKeys.filter((k) => !modelValue.value.includes(k));
		const removed = modelValue.value.filter((k) => !newKeys.includes(k));
		for (const key of added) {
			const item = findItemsByKeys(props.items, [key])[0];
			if (item) emit("select", { item, selected: true });
		}
		for (const key of removed) {
			const item = findItemsByKeys(props.items, [key])[0];
			if (item) emit("select", { item, selected: false });
		}

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
			// Deselect all visible enabled leaves
			modelValue.value = modelValue.value.filter((k) => !enabledKeys.includes(k));
		} else {
			// Select all visible enabled leaves (merge with existing)
			const merged = new Set([...modelValue.value, ...enabledKeys]);
			modelValue.value = [...merged];
		}
	}

	// --- Radio-group mode ---

	function handleRadioSelect(rootItem: MultiSelectItem) {
		const rootKey = getItemKey(rootItem);
		const isAlreadyActive = activeRadio.value === rootKey;

		if (isAlreadyActive) return;

		activeRadio.value = rootKey;
		// Check all children of the newly selected radio
		const childKeys = rootItem.children?.length
			? getLeafKeys(rootItem.children)
			: [];
		modelValue.value = childKeys;

		// Auto-expand
		if (!isRootExpanded(rootItem) && rootItem.children?.length) {
			toggleRootExpanded(rootItem);
		}
	}

	function handleRadioChildSelect(
		rootItem: MultiSelectItem,
		selectedChildren: MultiSelectItem[]
	) {
		activeRadio.value = getItemKey(rootItem);
		modelValue.value = [...new Set(
			selectedChildren
				.filter((item) => !item.children?.length)
				.map(getItemKey)
		)];
	}

	function radioChildSelectedItems(rootItem: MultiSelectItem): MultiSelectItem[] {
		if (!rootItem.children?.length) return [];
		return findItemsByKeys(rootItem.children, modelValue.value);
	}

	// --- Expand state ---

	function isRootExpanded(item: MultiSelectItem): boolean {
		return expandedKeys.value.includes(getItemKey(item));
	}

	function toggleRootExpanded(item: MultiSelectItem) {
		const key = getItemKey(item);
		toggleItemExpanded(key);
	}

	function toggleItemExpanded(key: string) {
		if (expandedKeys.value.includes(key)) {
			expandedKeys.value = expandedKeys.value.filter((k) => k !== key);
		} else {
			expandedKeys.value = [...expandedKeys.value, key];
		}
	}

	function handleExpandedChange(keys: string[]) {
		expandedKeys.value = keys;
	}

	function computeInitialExpanded(): string[] {
		const allKeys = getAllKeys(props.items);
		const expanded = props.defaultExpanded;

		let keys: string[] = [];
		if (expanded === "all" || expanded === true) {
			keys = allKeys;
		} else if (expanded === "none" || expanded === false) {
			keys = [];
		}

		// Always expand parent chains of pre-selected items
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

		// Initialize activeRadio from modelValue if in radio-group mode
		if (props.mode === "radio-group" && modelValue.value.length > 0) {
			for (const rootItem of props.items) {
				const childKeys = rootItem.children?.length
					? getLeafKeys(rootItem.children)
					: [];
				if (modelValue.value.some((k) => childKeys.includes(k))) {
					activeRadio.value = getItemKey(rootItem);
					break;
				}
			}
		}
	});
</script>
