import type { UIConfig } from "@/types/ui";

export default {
	variants: {
		color: {
			warning: {
				root: "bg-warning-600"
			}
		}
	},
	compoundVariants: [
		{
			color: "warning",
			to: true,
			class: {
				root: "hover:bg-warning-600/90"
			}
		}
	]
} satisfies UIConfig["banner"];
