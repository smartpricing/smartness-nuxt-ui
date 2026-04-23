import type { ButtonProps, DropdownMenuProps, TooltipProps } from "@nuxt/ui";
import type { ClassNameValue } from "tailwind-merge";

export interface ActionItem extends ButtonProps {
	tooltip?: string | TooltipProps
}

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
	dropdown?: ClassNameValue
	dropdownMenu?: ClassNameValue
}

export interface SActionsGroupProps {
	items: ActionItem[]
	maxInline?: number
	forceDropdown?: boolean
	counter?: number | undefined
	hideCaret?: boolean
	dropdownButtonProps?: ButtonProps
	dropdownTooltip?: string | TooltipProps
	dropdownMenuProps?: Partial<DropdownMenuProps>
	labels?: ActionsGroupLabels
	ui?: ActionsGroupUi
}
