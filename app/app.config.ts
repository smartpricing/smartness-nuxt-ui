export default defineAppConfig({
	ui: {
		colors: {
			primary: "petrol-blue",
			secondary: "sky",
			support: "warm-gray",
			burgundy: "burgundy",
			lemon: "lemon",
			info: "info",
			success: "success",
			warning: "warning",
			error: "error",
			offblack: "off-black"
		},
		input: {
			slots: {
				root: "w-full"
			}
		},
		select: {
			slots: {
				base: "w-full"
			}
		},
		tabs: {
			slots: {
				trigger: "flex-1"
			}
		},
		button: {
			slots: {
				base: "cursor-pointer"
			},
			compoundVariants: [
				{
					color: "secondary",
					variant: "solid",
					class: "text-secondary-900 bg-secondary-200"
				},
				{
					color: "ai",
					variant: "solid",
					class: "btn-ai"
				},
				{
					color: "learning",
					variant: "solid",
					class: "btn-learning"
				}
			]
		},
		dashboardPanel: {
			slots: {
				body: "bg-muted"
			}
		},
		alert: {
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
		}
	}
});
