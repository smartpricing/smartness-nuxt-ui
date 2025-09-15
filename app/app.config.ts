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
		pageCard: {
			slots: {
				container: "sm:py-3 sm:px-5",
				wrapper: "flex-row gap-3"
			}
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
		}
	}
});
