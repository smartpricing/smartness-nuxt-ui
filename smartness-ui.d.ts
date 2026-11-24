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
