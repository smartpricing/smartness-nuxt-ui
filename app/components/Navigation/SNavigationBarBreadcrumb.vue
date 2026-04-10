<template>
	<div :class="resolvedUi.root">
		<slot name="left">
			<UBreadcrumb v-if="items" :items="items">
				<template v-if="props.separator" #separator>
					<span class="mx-2 text-muted text-sm">
						{{ props.separator }}
					</span>
				</template>
			</UBreadcrumb>
		</slot>
		<slot name="right" />
	</div>
</template>

<script setup lang="ts">
	import type { BreadcrumbItem } from "@nuxt/ui";
	import { computed } from "vue";

	const props = defineProps<{
		items?: BreadcrumbItem[]
		ui?: Partial<typeof defaultUi>
		separator?: string
	}>();

	const defaultUi = {
		root: "flex shrink-0 items-center justify-between gap-4 border-b border-default px-4 py-2"
	};

	const resolvedUi = computed(() => ({
		root: props.ui?.root ?? defaultUi.root
	}));
</script>
