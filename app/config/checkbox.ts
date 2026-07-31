import type { UIConfig } from "@/types/ui";

export default {
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
