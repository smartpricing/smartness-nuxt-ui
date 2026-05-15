import type { UIConfig } from "@/types/ui";

export default {
	defaultVariants: {
		variant: "soft"
	},
	variants: {
		color: {
			ai: "",
			learning: ""
		}
	},
	compoundVariants: [
		{
			color: "ai",
			variant: "solid",
			class: "badge-ai-solid"
		},
		{
			color: "ai",
			variant: "outline",
			class: "badge-ai-outline ring-0"
		},
		{
			color: "ai",
			variant: "soft",
			class: "badge-ai-soft"
		},
		{
			color: "ai",
			variant: "subtle",
			class: "badge-ai-subtle ring-0"
		},
		{
			color: "learning",
			variant: "solid",
			class: "badge-learning-solid"
		},
		{
			color: "learning",
			variant: "outline",
			class: "badge-learning-outline ring-0"
		},
		{
			color: "learning",
			variant: "soft",
			class: "badge-learning-soft"
		},
		{
			color: "learning",
			variant: "subtle",
			class: "badge-learning-subtle ring-0"
		}
	]
} satisfies UIConfig["badge"];
