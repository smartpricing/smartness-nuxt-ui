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
		alert: {
			variants: {
				color: {
					ai: "",
					learning: ""
				}
			},
			compoundVariants: [
				// AI variants
				{
					color: "ai",
					variant: "solid",
					class: {
						root: "alert-ai-solid"
					}
				},
				{
					color: "ai",
					variant: "soft",
					class: {
						root: "bg-secondary-50 text-primary-900"
					}
				},
				{
					color: "ai",
					variant: "subtle",
					class: {
						root: "bg-secondary-50 text-primary-900 ring ring-inset ring-secondary-200"
					}
				},
				{
					color: "ai",
					variant: "outline",
					class: {
						root: "alert-ai-outline ring-0"
					}
				},
				// Learning variants
				{
					color: "learning",
					variant: "solid",
					class: {
						root: "alert-learning-solid"
					}
				},
				{
					color: "learning",
					variant: "soft",
					class: {
						root: "bg-info-50 text-info-700"
					}
				},
				{
					color: "learning",
					variant: "subtle",
					class: {
						root: "bg-info-50 text-info-700 ring ring-inset ring-info-200"
					}
				},
				{
					color: "learning",
					variant: "outline",
					class: {
						root: "alert-learning-outline ring-0"
					}
				}
			]
		}
	}
});
