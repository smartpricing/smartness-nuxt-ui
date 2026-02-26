declare module "@nuxt/ui" {
	interface ButtonProps {
		[key: `data-${string}`]: unknown
	}
	interface InputProps {
		[key: `data-${string}`]: unknown
	}
}

declare module "#ui/types" {
	interface ButtonProps {
		[key: `data-${string}`]: unknown
	}
	interface InputProps {
		[key: `data-${string}`]: unknown
	}
}

export {};
