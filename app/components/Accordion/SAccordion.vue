<template>
	<UCard :ui="{ root: ui?.root, body: 'p-0 sm:p-0' }">
		<UCollapsible
			v-model:open="open"
			:default-open="defaultOpen"
			:disabled="disabled"
			:unmount-on-hide="unmountOnHide"
			:ui="{ content: ui?.content }"
		>
			<UButton
				block
				color="neutral"
				variant="ghost"
				:label="label"
				:icon="icon"
				:trailing-icon="trailingIcon"
				:disabled="disabled"
				class="group"
				:ui="{
					base: ['px-4 py-3 rounded-none bg-elevated text-highlighted hover:bg-elevated/75 disabled:bg-primary-50!', ui?.header],
					label: 'flex-1 text-start',
					leadingIcon: 'text-muted',
					trailingIcon: 'text-muted transition-transform duration-200 group-data-[state=open]:rotate-180',
				}"
			>
				<template v-if="$slots.label" #default>
					<slot name="label" />
				</template>
			</UButton>

			<template #content>
				<div class="p-4 text-sm text-default" :class="ui?.body">
					<slot />
				</div>
			</template>
		</UCollapsible>
	</UCard>
</template>

<script setup lang="ts">
	interface SAccordionUi {
		root?: string
		header?: string
		content?: string
		body?: string
	}

	const {
		label,
		icon,
		trailingIcon = "ph:caret-down",
		defaultOpen = false,
		disabled = false,
		unmountOnHide = true,
		ui
	} = defineProps<{
		/** Text shown in the trigger header. Overridden by the `label` slot. */
		label?: string
		/** Optional leading icon in the header. */
		icon?: string
		/** Trailing chevron icon (rotates 180° when open). */
		trailingIcon?: string
		/** Start expanded (uncontrolled). Ignored when `v-model:open` is bound. */
		defaultOpen?: boolean
		/** Disable toggling. */
		disabled?: boolean
		/** Unmount the body when collapsed. */
		unmountOnHide?: boolean
		/** Class overrides for the card, header button, content wrapper and body. */
		ui?: SAccordionUi
	}>();

	const open = defineModel<boolean>("open", { default: undefined });
</script>
