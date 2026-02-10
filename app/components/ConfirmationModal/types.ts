import type { ModalProps } from "#ui/components/Modal.vue";
import type { ButtonProps } from "@nuxt/ui";

export interface SConfirmModalProps {
	message?: string
	action?: () => void | Promise<void>
	loading?: boolean
	destructive?: boolean
	confirmLabel?: string
	cancelLabel?: string
	confirmColor?: ButtonProps["color"]
	cancelColor?: ButtonProps["color"]
	confirmVariant?: ButtonProps["variant"]
	cancelVariant?: ButtonProps["variant"]
	headerIcon?: string
	modalProps?: ModalProps
}

export interface ConfirmOptions extends SConfirmModalProps {
	title?: ModalProps["title"]
}
