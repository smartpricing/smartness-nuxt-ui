import type { AvatarProps, BadgeProps } from "@nuxt/ui";

export interface SCardExtendedAction {
	icon: string
	label?: string
	onClick?: (event: MouseEvent) => void
}

export interface SCardExtendedProps {
	/** Visual layout type of the card */
	type?: "filled" | "draggable" | "container"
	/** Internal padding scale */
	size?: "xs" | "sm" | "md" | "lg" | "no-padding"
	/** Card title / label text */
	label?: string
	/** Secondary description text rendered below the label */
	description?: string
	/** Badge rendered next to the label. Pass a string for simple text or BadgeProps for full control */
	badge?: string | BadgeProps
	/** Avatar displayed as the card leading element (filled type only) */
	avatar?: AvatarProps
	/** Icon-only action buttons shown in the card header (filled type only) */
	actions?: SCardExtendedAction[]
	/** Whether the card is in a selected state */
	selected?: boolean
	/** Whether the card is disabled */
	disabled?: boolean
	/** Override the root element tag. Defaults to `button` for filled, `div` for others */
	as?: string
}
