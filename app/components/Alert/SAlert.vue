<template>
	<Transition
		enter-active-class="transition-[max-width,opacity] duration-300 ease-out overflow-hidden"
		enter-from-class="max-w-0 opacity-0"
		enter-to-class="max-w-2xl opacity-100"
		leave-active-class="transition-[max-width,opacity] duration-200 ease-in overflow-hidden"
		leave-from-class="max-w-2xl opacity-100"
		leave-to-class="max-w-0 opacity-0"
	>
		<UAlert
			v-if="show"
			:as="as"
			:title="title"
			:description="description"
			:icon="icon"
			:avatar="avatar"
			:color="color"
			:variant="variant"
			:orientation="orientation"
			:close="close"
			:close-icon="closeIcon"
			:ui="mergedUi"
			@update:open="(value: boolean) => !value && emit('close')"
		>
			<template v-if="$slots.default" #title>
				<slot />
			</template>
			<template v-if="$slots.actions" #actions>
				<slot name="actions" />
			</template>
		</UAlert>
	</Transition>
</template>

<script lang="ts" setup>
	import type { AlertProps } from "#ui/types";

	interface Props {
		show?: boolean
		title?: AlertProps["title"]
		description?: AlertProps["description"]
		icon?: AlertProps["icon"]
		avatar?: AlertProps["avatar"]
		color?: AlertProps["color"]
		variant?: AlertProps["variant"]
		orientation?: AlertProps["orientation"]
		close?: AlertProps["close"]
		closeIcon?: AlertProps["closeIcon"]
		as?: AlertProps["as"]
		ui?: AlertProps["ui"]
	}

	const props = withDefaults(defineProps<Props>(), {
		show: true,
		color: "secondary",
		// Figma (6150-3301) has a flat tint and no ring — `subtle` draws one.
		variant: "soft",
		orientation: "horizontal"
	});

	const emit = defineEmits<{
		(e: "close"): void
	}>();

	// Layout-only opinions: the compact padding and the truncating title Figma
	// specifies. Color is left entirely to `color`/`variant` — pinning the
	// surface to secondary and the text to primary-900, as this used to, made
	// every variant other than the secondary one render wrong.
	const mergedUi = computed<AlertProps["ui"]>(() => ({
		root: mergeSlot("rounded-lg w-fit shrink-0 px-3 py-2", props.ui?.root),
		wrapper: props.ui?.wrapper,
		title: mergeSlot("font-medium max-w-96 truncate", props.ui?.title),
		description: props.ui?.description,
		icon: props.ui?.icon,
		avatar: props.ui?.avatar,
		avatarSize: props.ui?.avatarSize,
		actions: props.ui?.actions,
		close: props.ui?.close
	}));
</script>
