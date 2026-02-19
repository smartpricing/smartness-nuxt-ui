<template>
	<div class="flex items-center gap-1">
		<template v-for="(item, index) in inlineActions" :key="index">
			<slot name="action" :item="item" :index="index">
				<UButton
					:icon="item.icon"
					:color="item.color ?? buttonColor"
					:variant="buttonVariant"
					:size="buttonSize"
					:disabled="item.disabled"
					@click.stop="(e: MouseEvent) => item.onSelect?.(e)"
				/>
			</slot>
		</template>

		<UDropdownMenu v-if="showDropdown" :items="dropdownActions">
			<slot>
				<UButton
					:color="buttonColor"
					:variant="buttonVariant"
					:size="buttonSize"
					icon="ph:dots-three-vertical-bold"
					@click.stop
				/>
			</slot>
		</UDropdownMenu>
	</div>
</template>

<script setup lang="ts">
	import type { DropdownMenuItem } from "@nuxt/ui";

	const props = withDefaults(
		defineProps<{
			actions: DropdownMenuItem[]
			maxInline?: number
			buttonColor?: "primary" | "secondary" | "success" | "info" | "warning" | "error" | "neutral"
			buttonVariant?: "solid" | "outline" | "soft" | "subtle" | "ghost" | "link"
			buttonSize?: "xs" | "sm" | "md" | "lg" | "xl"
		}>(),
		{
			maxInline: 2,
			buttonColor: "primary",
			buttonVariant: "ghost"
		}
	);

	const inlineActions = computed(() =>
		props.actions.length <= props.maxInline
			? props.actions
			: props.actions.slice(0, props.maxInline - 1)
	);

	const dropdownActions = computed(() =>
		props.actions.length > props.maxInline
			? props.actions.slice(props.maxInline - 1).map(({ icon, ...rest }) => rest)
			: []
	);

	const showDropdown = computed(() => dropdownActions.value.length > 0);
</script>
