<template>
	<div>
		<!-- Collapsed: Icon button with tooltip -->
		<UDropdownMenu
			v-if="collapsed"
			:items="dropdownItems"
		>
			<UButton
				icon="ph:squares-four-bold"
				color="neutral"
				variant="ghost"
				size="lg"
			/>
		</UDropdownMenu>

		<!-- Expanded: Select dropdown -->
		<USelect
			v-else
			v-model="selectedProduct"
			:items="selectItems"
			icon="ph:squares-four-bold"
			@update:model-value="emit('productChange', $event as SuiteProduct)"
		/>
	</div>
</template>

<script setup lang="ts">
	import type { DropdownMenuItem, SelectItem } from "@nuxt/ui";
	import type { SuiteProduct } from "../../types/suite";
	import { computed } from "vue";
	import { PRODUCTS } from "../../types/suite";

	interface Props {
		products: SuiteProduct[]
		currentProduct?: SuiteProduct
		collapsed?: boolean
	}

	const props = defineProps<Props>();
	const emit = defineEmits<{
		productChange: [SuiteProduct]
	}>();

	const selectedProduct = defineModel<SuiteProduct>();

	// Map products for USelect
	const selectItems = computed(() => {
		const purchased: SelectItem[] = [];
		const available: SelectItem[] = [];

		for (const product of PRODUCTS) {
			if (props.products.includes(product.value)) {
				purchased.push({
					...product,
					type: "item"
				});
			} else {
				available.push({
					...product,
					type: "item"
				});
			}
		}

		if (available.length > 0) {
			available.unshift({
				type: "label",
				label: "Recommended for you"
			});
			available.unshift({
				type: "separator"
			});
		}

		return [...purchased, ...available];
	});

	const dropdownItems = computed(() => {
		const purchased: DropdownMenuItem[] = [];
		const available: DropdownMenuItem[] = [];

		for (const product of PRODUCTS) {
			if (props.products.includes(product.value)) {
				purchased.push({
					...product,
					type: "link"
				});
			} else {
				available.push({
					...product,
					type: "link"
				});
			}
		}

		if (available.length > 0) {
			available.unshift({
				type: "label",
				label: "Recommended for you"
			});
			available.unshift({
				type: "separator"
			});
		}

		return [...purchased, ...available];
	});
</script>
