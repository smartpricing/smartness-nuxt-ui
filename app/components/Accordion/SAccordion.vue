<template>
	<UAccordion
		v-model="model"
		:items="mappedItems"
		:type="type"
		:collapsible="collapsible"
		:default-value="defaultValue"
		:disabled="disabled"
		:unmount-on-hide="unmountOnHide"
		:trailing-icon="trailingIcon"
		:ui="mergedUi"
	>
		<template v-for="(_, name) in $slots" #[name]="slotProps">
			<slot :name="name" v-bind="slotProps" />
		</template>
	</UAccordion>
</template>

<script setup lang="ts">
	import { tv } from "@nuxt/ui/utils/tv";
	import type { AccordionProps, AccordionSlots } from "@nuxt/ui";
	import type { SAccordionItem } from "./types";

	const {
		items,
		type = "single",
		collapsible = true,
		defaultValue,
		disabled = false,
		unmountOnHide = true,
		trailingIcon,
		ui
	} = defineProps<{
		/** Items to display. Set `selected: true` on an item to recolor its header. */
		items?: SAccordionItem[]
		/** Whether one or multiple items can be open at the same time. */
		type?: AccordionProps["type"]
		/** When `type` is `"single"`, whether the open item can be collapsed. */
		collapsible?: boolean
		/** Value(s) expanded on load (uncontrolled). Ignored when `v-model` is bound. */
		defaultValue?: string | string[]
		/** Disable the whole accordion. */
		disabled?: boolean
		/** Unmount item bodies when collapsed. */
		unmountOnHide?: boolean
		/** Trailing chevron icon (rotates 180° when open). */
		trailingIcon?: string
		/** Class overrides for the underlying UAccordion slots. */
		ui?: AccordionProps["ui"]
	}>();

	const model = defineModel<string | string[]>();

	defineSlots<AccordionSlots<SAccordionItem>>();

	const accordionUi = tv({
		slots: {
			root: "flex flex-col gap-3",
			item: "rounded-lg border border-default last:border-b bg-default overflow-hidden",
			trigger: "px-4 py-3 rounded-none bg-elevated text-highlighted enabled:cursor-pointer enabled:hover:bg-accented transition-colors -outline-offset-2",
			body: "p-4 border-t border-default"
		},
		variants: {
			selected: {
				true: {
					trigger: "bg-secondary-50 enabled:hover:bg-secondary-100"
				}
			}
		}
	});

	const themeSlots = accordionUi();

	const mergedUi = computed(() => ({
		...ui,
		root: themeSlots.root({ class: ui?.root }),
		item: themeSlots.item({ class: ui?.item }),
		trigger: themeSlots.trigger({ class: ui?.trigger }),
		body: themeSlots.body({ class: ui?.body })
	}));

	const mappedItems = computed(() => items?.map((item) => {
		if (!item.selected) {
			return item;
		}

		return {
			...item,
			ui: {
				...item.ui,
				trigger: accordionUi({ selected: true }).trigger({ class: item.ui?.trigger })
			}
		};
	}));
</script>
