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
			slots: {
				base: "disabled:!opacity-100"
			},
			variants: {
				variant: {
					solid: "disabled:!bg-primary-100 disabled:!text-primary-500",
					outline: "disabled:bg-transparent! disabled:text-primary-500! disabled:!ring-primary-300",
					soft: "disabled:!bg-primary-100 disabled:!text-primary-500",
					subtle: "disabled:bg-transparent! disabled:text-primary-500! disabled:!ring-primary-300",
					ghost: "disabled:!bg-transparent disabled:!text-primary-500",
					link: "disabled:!text-primary-500"
				}
			},
			compoundVariants: [
				{
					color: "lemon",
					variant: "solid",
					class: "text-primary-900"
				},
				{
					color: "lemon",
					variant: "soft",
					class: "text-primary-800"
				},
				{
					color: "lemon",
					variant: "subtle",
					class: "text-primary-700"
				},
				{
					color: "lemon",
					variant: "outline",
					class: "text-primary-700"
				},
				{
					color: "ai",
					variant: "solid",
					class: "btn-ai-solid"
				},
				{
					color: "ai",
					variant: "outline",
					class: "btn-ai-outline ring-0"
				},
				{
					color: "ai",
					variant: "soft",
					class: "btn-ai-soft"
				},
				{
					color: "ai",
					variant: "subtle",
					class: "btn-ai-subtle ring-0"
				},
				{
					color: "ai",
					variant: "ghost",
					class: "btn-ai-ghost"
				},
				{
					color: "ai",
					variant: "link",
					class: "text-secondary-900 hover:text-secondary-700"
				},
				{
					color: "learning",
					variant: "solid",
					class: "btn-learning-solid"
				},
				{
					color: "learning",
					variant: "outline",
					class: "btn-learning-outline ring-0"
				},
				{
					color: "learning",
					variant: "soft",
					class: "btn-learning-soft"
				},
				{
					color: "learning",
					variant: "subtle",
					class: "btn-learning-subtle ring-0"
				},
				{
					color: "learning",
					variant: "ghost",
					class: "btn-learning-ghost"
				},
				{
					color: "learning",
					variant: "link",
					class: "btn-learning-link text-info-700 hover:text-info-500"
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
				},
				overlay: {
					true: {
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
