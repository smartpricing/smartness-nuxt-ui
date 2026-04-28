<template>
	<USelect
		v-if="!collapsed"
		v-model="selectedProduct"
		:items="selectItems"
		value-key="value"
	>
		<template #leading>
			<UIcon name="ph:squares-four-bold" class="size-4 text-gray-600" />
		</template>

		<template #default>
			<span v-if="selectedProductItem?.parts" class="text-sm font-bold">
				<span
					v-for="(part, i) in selectedProductItem.parts"
					:key="i"
					:class="part.class"
				>{{ part.text }}</span>
			</span>
			<span v-else>{{ selectedProductItem?.label }}</span>
		</template>

		<template #item-label="{ item }">
			<span v-if="item && 'parts' in item && item.parts" class="text-sm font-bold">
				<span
					v-for="(part, i) in item.parts"
					:key="i"
					:class="part.class"
				>
					{{ part.text }}
				</span>
			</span>
			<span v-else-if="item && 'label' in item">{{ item.label }}</span>
		</template>
	</USelect>

	<UDropdownMenu
		v-else
		:items="dropdownItems"
		:content="{
			align: 'start',
			side: 'right',
		}"
	>
		<UButton
			icon="ph:squares-four-bold"
			color="neutral"
			variant="outline"
			square
		/>

		<template #item-label="{ item }">
			<span v-if="item && 'parts' in item && item.parts" class="text-sm font-bold">
				<span
					v-for="(part, i) in item.parts"
					:key="i"
					:class="part.class"
				>{{ part.text }}</span>
			</span>
			<span v-else-if="item && 'label' in item">{{ item.label }}</span>
		</template>
	</UDropdownMenu>
</template>

<script setup lang="ts">
	import type { DropdownMenuItem, SelectItem } from "@nuxt/ui";
	import type { SuiteProduct } from "../../types/suite";
	import { useLocale } from "@nuxt/ui/composables";
	import { computed } from "vue";
	import { PRODUCTS } from "../../types/suite";

	interface ProductPart {
		text: string
		class: string
	}

	type ProductSelectItem = SelectItem & {
		value?: SuiteProduct
		parts?: ProductPart[]
	};

	type ProductDropdownItem = DropdownMenuItem & {
		value?: SuiteProduct
		parts?: ProductPart[]
	};

	const props = defineProps<{
		products: SuiteProduct[]
		collapsed?: boolean
	}>();

	const selectedProduct = defineModel<SuiteProduct>();
	const { t } = useLocale();

	function partsForLabel(label: string): ProductPart[] | undefined {
		const prefix = "Smart";
		if (!label.startsWith(prefix)) {
			return undefined;
		}
		const rest = label.slice(prefix.length).toLowerCase();
		return [
			{ text: prefix, class: "text-primary-950" },
			{ text: rest, class: "text-secondary-700" }
		];
	}

	function enrichProduct(p: (typeof PRODUCTS)[number]): ProductPart[] | undefined {
		return partsForLabel(p.label);
	}

	const selectItems = computed<ProductSelectItem[]>(() => {
		const purchased: ProductSelectItem[] = [];
		const available: ProductSelectItem[] = [];

		for (const product of PRODUCTS) {
			const row: ProductSelectItem = {
				label: product.label,
				value: product.value,
				type: "item",
				parts: enrichProduct(product)
			};
			if (props.products.includes(product.value)) {
				purchased.push(row);
			} else {
				available.push(row);
			}
		}

		if (available.length > 0) {
			available.unshift({
				type: "label",
				label: t("sNavigationProducts.recommendedForYou")
			});
			available.unshift({
				type: "separator"
			});
		}

		return [...purchased, ...available];
	});

	const dropdownItems = computed<ProductDropdownItem[]>(() => {
		const purchased: ProductDropdownItem[] = [];
		const available: ProductDropdownItem[] = [];

		for (const product of PRODUCTS) {
			const row: ProductDropdownItem = {
				label: product.label,
				parts: enrichProduct(product),
				onSelect: () => {
					selectedProduct.value = product.value;
				}
			};
			if (props.products.includes(product.value)) {
				purchased.push(row);
			} else {
				available.push(row);
			}
		}

		if (available.length > 0) {
			available.unshift({
				type: "label",
				label: t("sNavigationProducts.recommendedForYou")
			});
			available.unshift({
				type: "separator"
			});
		}

		return [...purchased, ...available];
	});

	const selectedProductItem = computed(() => {
		const row = PRODUCTS.find((p) => p.value === selectedProduct.value);
		if (!row) {
			return undefined;
		}
		return {
			label: row.label,
			value: row.value,
			parts: enrichProduct(row)
		};
	});
</script>
