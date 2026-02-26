<template>
	<div class="flex items-center gap-1">
		<template v-for="(item, index) in inlineActions" :key="index">
			<slot name="action" :item="item" :index="index">
				<UTooltip v-bind="tooltipProps" :text="item.tooltip">
					<UButton
						v-bind="item"
					/>
				</UTooltip>
			</slot>
		</template>

		<UDropdownMenu v-if="showDropdown" :items="dropdownActions">
			<slot>
				<UButton
					v-bind="resolvedButtonProps"
					@click.stop
				/>
			</slot>
		</UDropdownMenu>
	</div>
</template>

<script setup lang="ts">
	import type { ButtonProps } from "@nuxt/ui";
	import type { MoreActionInlineItem, MoreActionItem, SMoreActionsProps } from "./types";

	const props = withDefaults(
		defineProps<SMoreActionsProps>(),
		{
			maxInline: 2,
			showInlineLabel: false,
			showDropdownIcon: false
		}
	);

	const resolvedButtonProps = computed(() => {
		const _default: ButtonProps = {
			color: "primary",
			variant: "ghost",
			size: "md",
			icon: "ph:dots-three-vertical-bold",
			square: true
		};

		return {
			..._default,
			...props.buttonProps
		};
	});

	function DropdownItemToButtonProps(item: MoreActionItem): MoreActionInlineItem {
		const _default: ButtonProps = {
			color: resolvedButtonProps.value.color,
			variant: resolvedButtonProps.value.variant,
			size: resolvedButtonProps.value.size,
			ui: resolvedButtonProps.value.ui
		};

		const {
			onSelect,
			ui,
			viewTransition,
			type,
			trailingSlash,
			to,
			label,
			...common
		} = item;

		return {
			..._default,
			onClick: onSelect,
			label: props.showInlineLabel ? label : undefined,
			square: !label,
			...common
		};
	}

	const inlineActions = computed<MoreActionInlineItem[]>(() => {
		const _inlineActions =	props.actions.length <= props.maxInline
			? props.actions
			: props.actions.slice(0, props.maxInline - 1);

		return _inlineActions.map(DropdownItemToButtonProps);
	}
	);

	const dropdownActions = computed(() => {
		const _dropdownActions = props.actions.length > props.maxInline
			? props.actions.slice(props.maxInline - 1)
			: [];

		if (props.showDropdownIcon) {
			return _dropdownActions;
		}
		return _dropdownActions.map(({ icon, ...rest }) => rest);
	}
	);

	const showDropdown = computed(() => dropdownActions.value.length > 0);
</script>
