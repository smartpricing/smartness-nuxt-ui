<template>
	<div :class="ui.root({ class: props.ui?.root })">
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
	import type { ClassNameValue } from "tailwind-merge";
	import { tv } from "@nuxt/ui/utils/tv";

	const props = defineProps<{
		items?: BreadcrumbItem[]
		ui?: Partial<Record<keyof typeof theme.slots, ClassNameValue>>
		separator?: string
	}>();

	const theme = {
		slots: {
			root: "flex shrink-0 items-center justify-between gap-4 border-b border-default px-4 py-2"
		}
	};

	const ui = tv(theme)();
</script>
