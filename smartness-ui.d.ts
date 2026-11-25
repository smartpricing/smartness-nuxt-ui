// data-* attributes (test ids) through the prop objects of Nuxt UI components. The layer adds this
// file to the types of every app that extends it (`prepare:types` in nuxt.config.ts): no import needed.
declare module "#ui/types" {
	interface ButtonProps {
		[key: `data-${string}`]: unknown
	}
	interface InputProps {
		[key: `data-${string}`]: unknown
	}
	interface TextareaProps {
		[key: `data-${string}`]: unknown
	}
	interface SwitchProps {
		[key: `data-${string}`]: unknown
	}
	interface CheckboxProps {
		[key: `data-${string}`]: unknown
	}
	interface AvatarProps {
		[key: `data-${string}`]: unknown
	}
	// A merged declaration repeats the type parameters exactly, names included, used or not
	interface CalendarProps<R extends boolean = false, M extends boolean = false> {
		[key: `data-${string}`]: unknown
	}
	interface SelectMenuProps<
		T extends ArrayOrNested<SelectMenuItem> = ArrayOrNested<SelectMenuItem>,
		VK extends GetItemKeys<T> | undefined = undefined,
		M extends boolean = false,
		Mod extends Omit<ModelModifiers, "lazy"> = Omit<ModelModifiers, "lazy">,
		C extends boolean | object = false
	> {
		[key: `data-${string}`]: unknown
	}
}

// UModal, USlideover, UTooltip, UPopover and UDropdownMenu render no element of their own: a test id goes
// on their panel, the `content` prop, which is typed by Reka (SConfirmModal's `modalProps.content`,
// STranslatableText's `manage.slideover.content`, a tooltip's or a menu's `content`)
declare module "reka-ui" {
	interface DialogContentProps {
		[key: `data-${string}`]: unknown
	}
	interface TooltipContentProps {
		[key: `data-${string}`]: unknown
	}
	interface PopoverContentProps {
		[key: `data-${string}`]: unknown
	}
	interface DropdownMenuContentProps {
		[key: `data-${string}`]: unknown
	}
}

export {};
