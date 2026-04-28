import type { ButtonProps, DropdownMenuProps, TooltipProps } from "@nuxt/ui";
import type { ClassNameValue } from "tailwind-merge";

/**
 * A secondary action. Variant is enforced to `outline` by the component;
 * `color` is selectable. The primary action goes through `primaryAction`.
 */
export type ActionItem = Omit<ButtonProps, "variant" | "size"> & {
	tooltip?: string | TooltipProps
};

/**
 * The single primary action. Variant and color are enforced to
 * `solid` / `primary` by the component, regardless of what is passed.
 */
export type PrimaryAction = Omit<ActionItem, "color">;

export interface ActionsGroupLabels {
	/** i18n key for the dropdown trigger label. Default: `sActionsGroup.actions` */
	actions?: string
	/** i18n key for the counter template (interpolated with `{n}`). Default: `sActionsGroup.selected` */
	selected?: string
}

export interface ActionsGroupUi {
	root?: ClassNameValue
	counter?: ClassNameValue
	button?: ClassNameValue
	primary?: ClassNameValue
	dropdown?: ClassNameValue
	dropdownMenu?: ClassNameValue
}

export interface SActionsGroupProps {
	/** Secondary actions, rendered as outline buttons (left side). */
	items: ActionItem[]
	/** Optional single primary action, rendered as solid primary (right side). */
	primaryAction?: PrimaryAction
	/** Button size applied uniformly to every button (secondaries, primary, dropdown trigger). */
	size?: ButtonProps["size"]
	/** Collapse every action (including the primary) into the dropdown. */
	forceDropdown?: boolean
	/** Selected items count, rendered to the left. Omit to hide. */
	counter?: number | undefined
	/** Force-hide the trailing caret on the dropdown trigger. Auto below `sm`. */
	hideCaret?: boolean
	/** When set, render the trigger as disabled and show this tooltip — used when no rows are selected. */
	disabledHint?: string | TooltipProps
	/** Override the dropdown trigger button. */
	dropdownButtonProps?: ButtonProps
	/** Tooltip on the dropdown trigger (used when items overflow). */
	dropdownTooltip?: string | TooltipProps
	/** Forwarded to UDropdownMenu. */
	dropdownMenuProps?: Partial<DropdownMenuProps>
	/** i18n key overrides. */
	labels?: ActionsGroupLabels
	/** Class overrides for internal slots. */
	ui?: ActionsGroupUi
}
