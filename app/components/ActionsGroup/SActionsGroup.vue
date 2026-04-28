<template>
	<div
		role="toolbar"
		class="inline-flex items-center justify-end gap-2 rounded"
		:class="[showPill ? 'bg-[var(--color-sky-100)] outline-4 outline-[var(--color-sky-100)]' : '', props.ui?.root]"
	>
		<span
			v-if="typeof props.counter === 'number'"
			class="text-sm font-medium text-primary-900 whitespace-nowrap pl-1"
			:class="[props.ui?.counter]"
		>
			{{ counterText }}
		</span>

		<template v-if="!effectiveForceDropdown">
			<template v-for="(entry, index) in resolvedInlineItems" :key="index">
				<UTooltip v-if="entry.tooltip" v-bind="entry.tooltip">
					<UButton v-bind="entry.button" class="bg-transparent!" :class="props.ui?.button" />
				</UTooltip>
				<UButton v-else v-bind="entry.button" class="bg-transparent!" :class="props.ui?.button" />
			</template>
		</template>

		<UDropdownMenu
			v-if="showDropdown"
			v-bind="mergedDropdownMenuProps"
			:items="dropdownItems"
			:class="props.ui?.dropdownMenu"
		>
			<UTooltip v-if="resolvedTriggerTooltip" v-bind="resolvedTriggerTooltip">
				<UButton v-bind="dropdownButton" :class="[dropdownTriggerClass, props.ui?.dropdown]" />
			</UTooltip>
			<UButton v-else v-bind="dropdownButton" :class="[dropdownTriggerClass, props.ui?.dropdown]" />

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

		<template v-if="renderPrimaryInline">
			<UTooltip v-if="resolvedPrimaryTooltip" v-bind="resolvedPrimaryTooltip">
				<UButton v-bind="primaryButton" :class="props.ui?.primary" />
			</UTooltip>
			<UButton v-else v-bind="primaryButton" :class="props.ui?.primary" />
		</template>
	</div>
</template>

<script setup lang="ts">
	import type { ButtonProps, DropdownMenuItem, TooltipProps } from "@nuxt/ui";
	import type { ActionItem, SActionsGroupProps } from "./types";
	import { useLocale } from "@nuxt/ui/composables";
	import { breakpointsTailwind, useBreakpoints } from "@vueuse/core";

	const props = withDefaults(defineProps<SActionsGroupProps>(), {
		forceDropdown: false,
		hideCaret: false,
		size: "sm"
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

	const showPill = computed(
		() => typeof props.counter === "number" && props.counter > 0
	);

	const renderPrimaryInline = computed(
		() => !!props.primaryAction && !effectiveForceDropdown.value && !props.disabledHint
	);

	const dropdownEntries = computed<ActionItem[]>(() => {
		if (!effectiveForceDropdown.value) return [];
		const entries: ActionItem[] = [...props.items];
		if (props.primaryAction && !props.disabledHint) {
			entries.push(props.primaryAction as ActionItem);
		}
		return entries;
	});

	const showDropdown = computed(
		() => !!props.disabledHint || dropdownEntries.value.length > 0 || props.forceDropdown
	);

	const mergedDropdownMenuProps = computed(() => ({
		...props.dropdownMenuProps,
		content: {
			side: "bottom" as const,
			align: "end" as const,
			...props.dropdownMenuProps?.content
		}
	}));

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
		effectiveForceDropdown.value
			? []
			: props.items.map(({ tooltip, ...rest }) => ({
				button: { ...(rest as ButtonProps), variant: "outline", size: props.size } as ButtonProps,
				tooltip: resolveTooltip(tooltip, "top")
			}))
	);

	const dropdownItems = computed<DropdownItemWithTooltip[]>(() =>
		dropdownEntries.value.map(toDropdownItem)
	);

	const showCaret = computed(() => !props.hideCaret && !isSmallViewport.value);

	const dropdownButton = computed<ButtonProps>(() => {
		const isDisabledHint = !!props.disabledHint;
		const triggerVariant: ButtonProps["variant"] = isDisabledHint
			? "soft"
			: renderPrimaryInline.value
				? "outline"
				: "solid";
		const defaults: ButtonProps = {
			color: "primary",
			variant: triggerVariant,
			size: props.size,
			disabled: isDisabledHint || undefined,
			label: t(props.labels?.actions ?? "sActionsGroup.actions"),
			icon: "ph:dots-three-vertical-bold"
		};
		if (showCaret.value && !isDisabledHint) {
			defaults.trailingIcon = "ph:caret-down-bold";
		}
		return {
			...defaults,
			...props.dropdownButtonProps
		};
	});

	const dropdownTriggerClass = computed(() =>
		renderPrimaryInline.value ? "bg-transparent!" : ""
	);

	const resolvedTriggerTooltip = computed(() => {
		if (props.disabledHint) {
			return resolveTooltip(props.disabledHint, "top");
		}
		return resolveTooltip(props.dropdownTooltip, "top");
	});

	const primaryButton = computed<ButtonProps>(() => {
		if (!props.primaryAction) return {};
		const { tooltip: _tooltip, ...rest } = props.primaryAction;
		return {
			...(rest as ButtonProps),
			variant: "solid",
			color: "primary",
			size: props.size
		};
	});

	const resolvedPrimaryTooltip = computed(() =>
		resolveTooltip(props.primaryAction?.tooltip, "top")
	);
</script>
