import type { ButtonProps, DropdownMenuProps, TooltipProps } from "@nuxt/ui";
import type { ClassNameValue } from "tailwind-merge";

export interface ActionItem extends ButtonProps {
	tooltip?: string | TooltipProps
}

export interface ActionsGroupLocale {
	actions?: string
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
	counter?: number
	counterLabel?: string
	hideCounterLabel?: boolean
	hideCaret?: boolean
	dropdownButtonProps?: ButtonProps
	dropdownTooltip?: string | TooltipProps
	dropdownMenuProps?: Partial<DropdownMenuProps>
	locale?: ActionsGroupLocale
	ui?: ActionsGroupUi
}
