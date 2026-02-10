<template>
	<div
		class="w-full cursor-pointer truncate rounded px-1.5 py-0.5 text-xs font-medium"
		:class="colorClasses"
		:style="customColorStyle"
		@click.stop="onClick"
	>
		<slot :item="item">
			{{ item.label }}
		</slot>
	</div>
</template>

<script setup lang="ts">
	import type { DataCalendarItem } from "./types";

	const props = defineProps<{
		/** The calendar item to render */
		item: DataCalendarItem
	}>();

	const emit = defineEmits<{
		/** Emitted when the item is clicked */
		click: [item: DataCalendarItem]
	}>();

	defineSlots<{
		/** Custom item content */
		default: (props: { item: DataCalendarItem }) => unknown
	}>();

	/** Check if the color is a raw CSS color value (hex, rgb, or hsl) */
	const isCssColor = computed(() => {
		const color = props.item.color;
		if (!color) return false;
		return color.startsWith("#") || color.startsWith("rgb") || color.startsWith("hsl");
	});

	const colorClasses = computed(() => {
		if (isCssColor.value) {
			return "text-white";
		}
		return "bg-secondary-200 text-secondary-900";
	});

	const customColorStyle = computed(() => {
		if (isCssColor.value) {
			return { backgroundColor: props.item.color };
		}
		return {};
	});

	function onClick() {
		emit("click", props.item);
	}
</script>
