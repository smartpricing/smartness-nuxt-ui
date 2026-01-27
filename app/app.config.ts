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
			},
			variants: {
				variant: {
					"link-fit": {
						list: "border-default block",
						root: "block w-fit",
						indicator: "rounded-full",
						trigger: "focus:outline-none"
					}
				}
			},
			compoundVariants: [
				{
					orientation: "horizontal",
					variant: "link-fit",
					class: {
						list: "border-b -mb-px",
						indicator: "-bottom-px h-px"
					}
				},
				{
					orientation: "vertical",
					variant: "link-fit",
					class: {
						list: "border-s -ms-px",
						indicator: "-start-px w-px"
					}
				},
				{
					color: "primary",
					variant: "link-fit",
					class: {
						indicator: "bg-primary",
						trigger: "data-[state=active]:text-primary focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary"
					}
				},
				{
					color: "secondary",
					variant: "link-fit",
					class: {
						indicator: "bg-secondary",
						trigger: "data-[state=active]:text-secondary focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-secondary"
					}
				},
				{
					color: "success",
					variant: "link-fit",
					class: {
						indicator: "bg-success",
						trigger: "data-[state=active]:text-success focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-success"
					}
				},
				{
					color: "info",
					variant: "link-fit",
					class: {
						indicator: "bg-info",
						trigger: "data-[state=active]:text-info focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-info"
					}
				},
				{
					color: "warning",
					variant: "link-fit",
					class: {
						indicator: "bg-warning",
						trigger: "data-[state=active]:text-warning focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-warning"
					}
				},
				{
					color: "error",
					variant: "link-fit",
					class: {
						indicator: "bg-error",
						trigger: "data-[state=active]:text-error focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-error"
					}
				},
				{
					color: "neutral",
					variant: "link-fit",
					class: {
						indicator: "bg-inverted",
						trigger: "data-[state=active]:text-highlighted focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-inverted"
					}
				}
			]
		},
		button: {
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
		},
		modal: {
			slots: {
				overlay: "bg-primary-950/40"
			},
			variants: {
				fullscreen: {
					false: {
						overlay: "bg-primary-950/40"
					}
				}
			}
		},
		slideover: {
			slots: {
				overlay: "bg-primary-950/40"
			}
		}
	}
});
