<template>
	<div
		role="toolbar"
		class="flex items-center justify-end gap-2"
		:class="[props.ui?.root]"
	>
		<span
			v-if="typeof props.counter === 'number'"
			class="text-sm font-medium text-primary-900 whitespace-nowrap"
			:class="[props.ui?.counter]"
		>
			{{ counterText }}
		</span>

		<template v-if="!props.forceDropdown">
			<template v-for="(entry, index) in resolvedInlineItems" :key="index">
				<UTooltip v-if="entry.tooltip" v-bind="entry.tooltip">
					<UButton v-bind="entry.button" :class="props.ui?.button" />
				</UTooltip>
				<UButton v-else v-bind="entry.button" :class="props.ui?.button" />
			</template>
		</template>

		<UDropdownMenu
			v-if="showDropdown"
			v-bind="props.dropdownMenuProps"
			:items="dropdownItems"
			:class="props.ui?.dropdownMenu"
		>
			<UTooltip v-if="resolvedDropdownTooltip" v-bind="resolvedDropdownTooltip">
				<UButton v-bind="dropdownButton" :class="props.ui?.dropdown" />
			</UTooltip>
			<UButton v-else v-bind="dropdownButton" :class="props.ui?.dropdown" />

			<template #item="{ item }">
				<UTooltip
					v-if="(item as DropdownItemWithTooltip)._tooltip"
					v-bind="(item as DropdownItemWithTooltip)._tooltip!"
					:ui="{ content: 'z-60' }"
				>
					<span class="flex items-center gap-1.5 w-full min-w-0">
						<UIcon v-if="item.icon" :name="item.icon" class="shrink-0 size-5" />
						<span class="truncate flex-1 text-start">{{ item.label }}</span>
					</span>
				</UTooltip>
				<span v-else class="flex items-center gap-1.5 w-full min-w-0">
					<UIcon v-if="item.icon" :name="item.icon" class="shrink-0 size-5" />
					<span class="truncate flex-1 text-start">{{ item.label }}</span>
				</span>
			</template>
		</UDropdownMenu>
	</div>
</template>

<script setup lang="ts">
	import type { ButtonProps, DropdownMenuItem, TooltipProps } from "@nuxt/ui";
	import type { ActionItem, SActionsGroupProps } from "./types";
	import { useLocale } from "@nuxt/ui/composables";
	import { breakpointsTailwind, useBreakpoints } from "@vueuse/core";

	const props = withDefaults(defineProps<SActionsGroupProps>(), {
		maxInline: 3,
		forceDropdown: false,
		hideCaret: false
	});

	const { t } = useLocale();

	const breakpoints = useBreakpoints(breakpointsTailwind);
	const isSmallViewport = breakpoints.smaller("sm");

	const counterText = computed(() =>
		t(props.labels?.selected ?? "sActionsGroup.selected", { n: props.counter ?? 0 })
	);

	const effectiveForceDropdown = computed(
		() => props.forceDropdown || isSmallViewport.value
	);

	const inlineItems = computed<ActionItem[]>(() => {
		if (effectiveForceDropdown.value) return [];
		if (props.items.length <= props.maxInline) return props.items;
		const visibleCount = Math.max(props.maxInline - 1, 0);
		return props.items.slice(0, visibleCount);
	});

	const overflowItems = computed<ActionItem[]>(() => {
		if (effectiveForceDropdown.value) return props.items;
		if (props.items.length <= props.maxInline) return [];
		const visibleCount = Math.max(props.maxInline - 1, 0);
		return props.items.slice(visibleCount);
	});

	const showDropdown = computed(
		() => overflowItems.value.length > 0 || props.forceDropdown
	);

	type ResolvedTooltip = TooltipProps & { content?: TooltipProps["content"] };

	function resolveTooltip(
		tooltip: string | TooltipProps | undefined,
		defaultSide: "top" | "right" | "bottom" | "left",
		defaultSideOffset?: number
	): ResolvedTooltip | null {
		if (!tooltip) return null;
		const defaultContent: TooltipProps["content"] = { side: defaultSide };
		if (defaultSideOffset !== undefined) {
			defaultContent.sideOffset = defaultSideOffset;
		}
		if (typeof tooltip === "string") {
			return { text: tooltip, content: defaultContent };
		}
		return {
			...tooltip,
			content: { ...defaultContent, ...tooltip.content }
		};
	}

	type DropdownItemWithTooltip = DropdownMenuItem & {
		_tooltip?: ResolvedTooltip | null
	};

	function toDropdownItem(item: ActionItem): DropdownItemWithTooltip {
		const dropdownItem: DropdownItemWithTooltip = {
			label: typeof item.label === "string" ? item.label : undefined,
			icon: item.icon ?? item.leadingIcon,
			disabled: item.disabled,
			loading: item.loading,
			color: item.color,
			to: item.to,
			target: item.target
		};
		if (item.tooltip) {
			dropdownItem._tooltip = resolveTooltip(item.tooltip, "right", 14);
		}
		if (item.onClick) {
			const handlers = Array.isArray(item.onClick)
				? item.onClick
				: [item.onClick];
			dropdownItem.onSelect = (event: Event) => {
				const mouseEvent = event as unknown as MouseEvent;
				handlers.forEach((handler) => handler(mouseEvent));
			};
		}
		return dropdownItem;
	}

	const resolvedInlineItems = computed(() =>
		inlineItems.value.map(({ tooltip, ...button }) => ({
			button: button as ButtonProps,
			tooltip: resolveTooltip(tooltip, "top")
		}))
	);

	const dropdownItems = computed<DropdownItemWithTooltip[]>(() =>
		overflowItems.value.map(toDropdownItem)
	);

	const showCaret = computed(() => !props.hideCaret && !isSmallViewport.value);

	const dropdownButton = computed<ButtonProps>(() => {
		const defaults: ButtonProps = {
			color: "primary",
			variant: "solid",
			label: t(props.labels?.actions ?? "sActionsGroup.actions"),
			icon: "ph:dots-three-vertical-bold"
		};
		if (showCaret.value) {
			defaults.trailingIcon = "ph:caret-down-bold";
		}
		return {
			...defaults,
			...props.dropdownButtonProps
		};
	});

	const resolvedDropdownTooltip = computed(() =>
		resolveTooltip(props.dropdownTooltip, "top")
	);
</script>
