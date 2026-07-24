import type { UIConfig } from "@/types/ui";

export default {
	variants: {
		variant: {
			chip: {
				fieldset: "flex-wrap",
				item: "w-fit items-center rounded-full font-medium bg-default ring ring-inset ring-accented transition-colors has-data-[state=checked]:text-inverted has-focus-visible:outline-3 has-disabled:cursor-not-allowed has-disabled:bg-default! has-disabled:text-primary-500! has-disabled:ring-primary-300! has-data-[state=checked]:has-disabled:bg-primary-100! has-data-[state=checked]:has-disabled:ring-primary-100!",
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
		},
		{
			size: "xs",
			variant: "chip",
			class: {
				item: "px-2 py-0.5"
			}
		},
		{
			size: "sm",
			variant: "chip",
			class: {
				item: "px-2.5 py-1"
			}
		},
		{
			size: "md",
			variant: "chip",
			class: {
				item: "px-3 py-1.5"
			}
		},
		{
			size: "lg",
			variant: "chip",
			class: {
				item: "px-3.5 py-2"
			}
		},
		{
			size: "xl",
			variant: "chip",
			class: {
				item: "px-4 py-2.5"
			}
		},
		{
			color: "primary",
			variant: "chip",
			class: {
				item: "hover:bg-primary-50 outline-primary/25 has-data-[state=checked]:bg-primary has-data-[state=checked]:ring-primary has-data-[state=checked]:hover:bg-primary/75"
			}
		},
		{
			color: "secondary",
			variant: "chip",
			class: {
				item: "hover:bg-secondary-50 outline-secondary/25 has-data-[state=checked]:bg-secondary has-data-[state=checked]:ring-secondary has-data-[state=checked]:hover:bg-secondary/75"
			}
		},
		{
			color: "success",
			variant: "chip",
			class: {
				item: "hover:bg-success-50 outline-success/25 has-data-[state=checked]:bg-success has-data-[state=checked]:ring-success has-data-[state=checked]:hover:bg-success/75"
			}
		},
		{
			color: "info",
			variant: "chip",
			class: {
				item: "hover:bg-info-50 outline-info/25 has-data-[state=checked]:bg-info has-data-[state=checked]:ring-info has-data-[state=checked]:hover:bg-info/75"
			}
		},
		{
			color: "warning",
			variant: "chip",
			class: {
				item: "hover:bg-warning-50 outline-warning/25 has-data-[state=checked]:bg-warning has-data-[state=checked]:ring-warning has-data-[state=checked]:hover:bg-warning/75"
			}
		},
		{
			color: "error",
			variant: "chip",
			class: {
				item: "hover:bg-error-50 outline-error/25 has-data-[state=checked]:bg-error has-data-[state=checked]:ring-error has-data-[state=checked]:hover:bg-error/75"
			}
		},
		{
			color: "neutral",
			variant: "chip",
			class: {
				item: "hover:bg-neutral-50 outline-inverted/25 has-data-[state=checked]:bg-inverted has-data-[state=checked]:ring-inverted has-data-[state=checked]:hover:bg-inverted/90"
			}
		},
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
			variant: ["card", "table", "chip"],
			disabled: false,
			class: {
				item: "cursor-pointer"
			}
		}
	]
} satisfies UIConfig["radioGroup"];
