<template>
	<div
		class="flex w-full cursor-pointer items-center truncate px-1.5 py-0.5 text-xs font-medium"
		:class="[
			colorClasses,
			borderRadiusClasses,
		]"
		:style="customColorStyle"
		@click.stop="onClick"
	>
		<!-- Continuation indicator (left arrow) -->
		<UIcon
			v-if="isContinuation"
			name="ph:caret-left-bold"
			class="mr-0.5 size-3 shrink-0 opacity-60"
		/>

		<span class="truncate">
			<slot :item="item">
				{{ item.label }}
			</slot>
		</span>

		<!-- Continues-after indicator (right arrow) -->
		<UIcon
			v-if="continuesAfter"
			name="ph:caret-right-bold"
			class="ml-auto size-3 shrink-0 opacity-60"
		/>
	</div>
</template>

<script setup lang="ts">
	import type { DataCalendarItem } from "./types";

	const props = withDefaults(defineProps<{
		/** The calendar item to render */
		item: DataCalendarItem
		/** Whether this segment is a continuation from a previous row */
		isContinuation?: boolean
		/** Whether this segment continues into the next row */
		continuesAfter?: boolean
	}>(), {
		isContinuation: false,
		continuesAfter: false
	});

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

	/** Dynamic border radius based on continuation state */
	const borderRadiusClasses = computed(() => {
		if (props.isContinuation && props.continuesAfter) {
			// Middle segment - no rounding
			return "rounded-none";
		}
		if (props.isContinuation) {
			// Starts from previous row, ends here - round right only
			return "rounded-l-none rounded-r";
		}
		if (props.continuesAfter) {
			// Starts here, continues to next row - round left only
			return "rounded-l rounded-r-none";
		}
		// Fully contained - round both sides
		return "rounded";
	});

	function onClick() {
		emit("click", props.item);
	}
</script>
