import type { UIConfig } from "@/types/ui";

export default {
	variants: {
		color: {
			ai: "",
			learning: ""
		}
	},
	compoundVariants: [
		{
			color: "ai",
			variant: "outline",
			class: {
				root: "alert-ai-outline ring-0",
				title: "relative",
				description: "relative",
				icon: "relative",
				close: "relative",
				actions: "relative"
			}
		},
		{
			color: "learning",
			variant: "outline",
			class: {
				root: "alert-learning-outline ring-0",
				title: "relative",
				description: "relative",
				icon: "relative",
				close: "relative",
				actions: "relative"
			}
		}
	]
} satisfies UIConfig["alert"];
