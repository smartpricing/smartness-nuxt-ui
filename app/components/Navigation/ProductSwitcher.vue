<template>
	<div>
		<!-- Collapsed: Icon button with tooltip -->
		<UDropdownMenu
			v-if="collapsed"
			:items="productOptions"
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
			:items="productOptions"
			icon="ph:squares-four-bold"
			@update:model-value="emit('product-change', $event)"
		/>
	</div>
</template>

<script setup lang="ts">
	import type { NavigationProduct } from "../../types/navigation";
	import { computed } from "vue";

	interface Props {
		products: NavigationProduct[]
		currentProduct?: string
		collapsed?: boolean
	}

	const props = defineProps<Props>();
	const emit = defineEmits<{
		"product-change": [string]
	}>();
	const selectedProduct = defineModel<string>();

	// Map products for USelect
	const productOptions = computed(() => {
		return props.products.map((p) => ({
			value: p.id,
			label: p.label,
			onSelect: () => {
				selectedProduct.value = p.id;
				emit("product-change", p.id);
			}
		}));
	});
</script>
