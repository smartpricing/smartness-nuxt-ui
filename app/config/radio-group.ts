import type { UIConfig } from "@/types/ui";

export default {
	compoundVariants: [
		{
			color: "primary",
			variant: ["card", "table"],
			class: {
				item: "hover:bg-primary-50 has-data-[state=checked]:bg-primary-50 has-data-[state=checked]:outline-primary-600"
			}
		},
		{
			color: "secondary",
			variant: ["card", "table"],
			class: {
				item: "hover:bg-secondary-50 has-data-[state=checked]:bg-secondary-50 has-data-[state=checked]:outline-secondary-600"
			}
		},
		{
			color: "success",
			variant: ["card", "table"],
			class: {
				item: "hover:bg-success-50 has-data-[state=checked]:bg-success-50 has-data-[state=checked]:outline-success-600"
			}
		},
		{
			color: "info",
			variant: ["card", "table"],
			class: {
				item: "hover:bg-info-50 has-data-[state=checked]:bg-info-50 has-data-[state=checked]:outline-info-600"
			}
		},
		{
			color: "warning",
			variant: ["card", "table"],
			class: {
				item: "hover:bg-warning-50 has-data-[state=checked]:bg-warning-50 has-data-[state=checked]:outline-warning-600"
			}
		},
		{
			color: "error",
			variant: ["card", "table"],
			class: {
				item: "hover:bg-error-50 has-data-[state=checked]:bg-error-50 has-data-[state=checked]:outline-error-600"
			}
		},
		{
			color: "neutral",
			variant: ["card", "table"],
			class: {
				item: "hover:bg-neutral-50 has-data-[state=checked]:bg-neutral-50 has-data-[state=checked]:outline-neutral-600"
			}
		},
		{
			variant: ["card", "table"],
			class: {
				item: "has-data-[state=checked]:outline-[3px] has-data-[state=checked]:-outline-offset-2"
			}
		},
		{
			variant: ["card", "table"],
			disabled: false,
			class: {
				item: "cursor-pointer"
			}
		}
	]
} satisfies UIConfig["radioGroup"];
