import type { UIConfig } from "@/types/ui";

export default {
	slots: {
		// Disabled reads as `bg-accented` whatever the state (Figma 6696-3770).
		// The checked fill lives on `indicator`, a child of the element that
		// carries the `disabled` attribute, so it needs `group-disabled:` rather
		// than the `disabled:` the switch can use.
		base: "group",
		indicator: "group-disabled:bg-accented!"
	},
	defaultVariants: {
		color: "secondary"
	},
	variants: {
		variant: {
			chip: {
				base: "sr-only",
				label: "text-inherit"
			}
		}
	},
	compoundVariants: [
		{
			variant: "chip",
			class: {
				wrapper: "ms-0 me-0"
			}
		}
	]
} satisfies UIConfig["checkbox"];
