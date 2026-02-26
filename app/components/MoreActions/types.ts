import type { ButtonProps, DropdownMenuItem, TooltipProps } from "@nuxt/ui";

export interface MoreActionItem extends DropdownMenuItem {
	tooltip?: string
}

export interface MoreActionInlineItem extends ButtonProps {
	tooltip?: string
}

export interface SMoreActionsProps {
	actions: MoreActionItem[][]
	maxInline?: number
	buttonProps?: ButtonProps
	showInlineLabel?: boolean
	showDropdownIcon?: boolean
	tooltipProps?: TooltipProps
}
