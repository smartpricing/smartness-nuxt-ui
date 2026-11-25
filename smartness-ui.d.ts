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
}

export {};
