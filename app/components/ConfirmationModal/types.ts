import type { ButtonProps, ModalProps } from "@nuxt/ui";

export interface SConfirmModalProps {
	message?: string
	action?: () => void | Promise<void>
	loading?: boolean
	destructive?: boolean
	confirmProps?: ButtonProps
	cancelProps?: ButtonProps
	headerIcon?: string
	modalProps?: ModalProps
}

export interface ConfirmOptions extends SConfirmModalProps {
	title?: ModalProps["title"]
}
