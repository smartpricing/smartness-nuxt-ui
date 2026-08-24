export default {
	slots: {
		// Figma (6150-3301) reads title and description at the same full-strength
		// color; the theme dims the description to `opacity-90`.
		description: "opacity-100"
	},
	variants: {
		color: {
			ai: "",
			learning: ""
		}
	},
	compoundVariants: [
		// Text shade on the tinted variants. `text-{color}` resolves to the
		// semantic var, already dark in this layer (700/900) — only these three
		// need the extra step down that Figma asks for. Set on `root` so title,
		// description and icon inherit it.
		{
			color: "secondary",
			variant: ["soft", "subtle"],
			class: {
				root: "text-secondary-800"
			}
		},
		{
			color: "success",
			variant: ["soft", "subtle"],
			class: {
				root: "text-success-800"
			}
		},
		{
			color: "warning",
			variant: ["soft", "subtle"],
			class: {
				root: "text-warning-800"
			}
		},
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
};
