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

	const flatActions = computed(() => props.actions.flat());

	const inlineActions = computed<MoreActionInlineItem[]>(() => {
		const flat = flatActions.value;
		const _inlineActions = flat.length <= props.maxInline
			? flat
			: flat.slice(0, props.maxInline - 1);

		return _inlineActions.map(DropdownItemToButtonProps);
	});

	const dropdownActions = computed<MoreActionItem[][]>(() => {
		const flat = flatActions.value;
		if (flat.length <= props.maxInline) return [];

		const inlineCount = props.maxInline - 1;
		let skipped = 0;
		const result: MoreActionItem[][] = [];

		for (const group of props.actions) {
			if (skipped >= inlineCount) {
				result.push(group);
			} else if (skipped + group.length > inlineCount) {
				result.push(group.slice(inlineCount - skipped));
				skipped = inlineCount;
			} else {
				skipped += group.length;
			}
		}

		if (props.showDropdownIcon) {
			return result;
		}
		return result.map((group) => group.map(({ icon, ...rest }) => rest));
	});

	const showDropdown = computed(() => dropdownActions.value.length > 0);
</script>
