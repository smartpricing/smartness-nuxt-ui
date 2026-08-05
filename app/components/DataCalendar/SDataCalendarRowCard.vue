<template>
	<div
		class="flex items-start gap-1 rounded-lg border border-default bg-white p-2 shadow-xs"
		data-slot="row-card"
	>
		<div class="flex min-w-0 flex-1 flex-col gap-1">
			<span class="truncate label-sm text-primary-900">
				{{ item.label }}
			</span>

			<div
				v-if="item.tags?.length"
				class="flex flex-wrap gap-1"
			>
				<UBadge
					v-for="tag in item.tags"
					:key="tag"
					size="sm"
					variant="solid"
					color="secondary"
					class="rounded-md"
					:style="item.color ? { backgroundColor: item.color, color: 'white' } : undefined"
				>
					{{ tag }}
				</UBadge>
			</div>
		</div>

		<UIcon
			v-if="draggable"
			name="ph:dots-six-vertical"
			class="size-4 shrink-0 text-dimmed"
		/>
	</div>
</template>

<script setup lang="ts">
	import type { DataCalendarItem } from "./types";

	defineProps<{
		/** The item to render */
		item: DataCalendarItem
		/** Show the drag handle affordance */
		draggable?: boolean
	}>();
</script>
