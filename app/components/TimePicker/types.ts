import type { InputTimeProps } from "@nuxt/ui";

export interface STimePickerProps {
	/** BCP 47 locale, inferred like the date pickers'. Drives the 12/24h cycle. */
	locale?: string
	/** Forces the clock; by default it follows the locale. */
	hourCycle?: 12 | 24
	granularity?: InputTimeProps["granularity"]
	disabled?: boolean
	readonly?: boolean
	size?: InputTimeProps["size"]
	color?: InputTimeProps["color"]
	variant?: InputTimeProps["variant"]
	highlight?: boolean
	placeholder?: InputTimeProps["placeholder"]
	/** Leading icon; `false` hides it. */
	icon?: string | false
	/** Commit the typed time on focus out instead of on every keystroke. */
	lazy?: boolean
	ui?: InputTimeProps["ui"]
}
