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
		icons: {
			arrowDown: "i-ph-arrow-down",
			arrowLeft: "i-ph-arrow-left",
			arrowRight: "i-ph-arrow-right",
			arrowUp: "i-ph-arrow-up",
			caution: "i-ph-warning-circle",
			check: "i-ph-check",
			chevronDoubleLeft: "i-ph-caret-double-left",
			chevronDoubleRight: "i-ph-caret-double-right",
			chevronDown: "i-ph-caret-down",
			chevronLeft: "i-ph-caret-left",
			chevronRight: "i-ph-caret-right",
			chevronUp: "i-ph-caret-up",
			close: "i-ph-x",
			copy: "i-ph-copy",
			copyCheck: "i-ph-check-circle",
			dark: "i-ph-moon",
			drag: "i-ph-dots-six-vertical",
			ellipsis: "i-ph-dots-three",
			error: "i-ph-x-circle",
			external: "i-ph-arrow-up-right",
			eye: "i-ph-eye",
			eyeOff: "i-ph-eye-slash",
			file: "i-ph-file",
			folder: "i-ph-folder",
			folderOpen: "i-ph-folder-open",
			hash: "i-ph-hash",
			info: "i-ph-info",
			light: "i-ph-sun",
			loading: "i-ph-circle-notch",
			menu: "i-ph-list",
			minus: "i-ph-minus",
			panelClose: "i-ph-caret-left",
			panelOpen: "i-ph-caret-right",
			plus: "i-ph-plus",
			reload: "i-ph-arrow-counter-clockwise",
			search: "i-ph-magnifying-glass",
			stop: "i-ph-square",
			success: "i-ph-check-circle",
			system: "i-ph-monitor",
			tip: "i-ph-lightbulb",
			upload: "i-ph-upload",
			warning: "i-ph-warning"
		},
		input: {
			slots: {
				root: "w-full"
			}
		},
		select: {
			slots: {
				base: "w-full disabled:bg-primary-50"
			}
		},
		selectMenu: {
			slots: {
				base: "w-full disabled:bg-primary-50"
			}
		},
		skeleton: {
			base: "smartness-skeleton animate-[smartness-skeleton-shimmer_1.6s_ease-in-out_infinite] motion-reduce:animate-none"
		},
		badge: {
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
					},
					"pill-fit": {
						list: "bg-elevated rounded-lg block",
						root: "block w-fit",
						indicator: "rounded-md shadow-xs",
						trigger: "flex-none focus:outline-none"
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
					orientation: "horizontal",
					variant: "pill-fit",
					class: {
						indicator: "inset-y-1"
					}
				},
				{
					orientation: "vertical",
					variant: "pill-fit",
					class: {
						indicator: "inset-x-1",
						list: "items-center"
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
				},
				{
					color: "primary",
					variant: "pill-fit",
					class: {
						indicator: "bg-primary",
						trigger: "data-[state=active]:text-inverted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
					}
				},
				{
					color: "secondary",
					variant: "pill-fit",
					class: {
						indicator: "bg-secondary",
						trigger: "data-[state=active]:text-inverted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary"
					}
				},
				{
					color: "success",
					variant: "pill-fit",
					class: {
						indicator: "bg-success",
						trigger: "data-[state=active]:text-inverted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-success"
					}
				},
				{
					color: "info",
					variant: "pill-fit",
					class: {
						indicator: "bg-info",
						trigger: "data-[state=active]:text-inverted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-info"
					}
				},
				{
					color: "warning",
					variant: "pill-fit",
					class: {
						indicator: "bg-warning",
						trigger: "data-[state=active]:text-inverted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-warning"
					}
				},
				{
					color: "error",
					variant: "pill-fit",
					class: {
						indicator: "bg-error",
						trigger: "data-[state=active]:text-inverted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-error"
					}
				},
				{
					color: "neutral",
					variant: "pill-fit",
					class: {
						indicator: "bg-inverted",
						trigger: "data-[state=active]:text-inverted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-inverted"
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
				body: "bg-muted sm:p-4 p-4"
			}
		},
		navigationMenu: {
			slots: {
				list: "space-y-1",
				linkLabelExternalIcon: "hidden"
			},
			compoundVariants: [
				{
					variant: "pill",
					active: true,
					highlight: false,
					class: {
						link: "rounded-sm bg-secondary-200 text-primary-900",
						linkLeadingIcon: "text-primary-900"
					}
				},
				{
					variant: "pill",
					active: false,
					highlight: false,
					class: {
						link: "text-primary-900",
						linkLeadingIcon: "text-primary-900"
					}
				}
			]
		},
		dashboardNavbar: {
			slots: {
				title: "heading-sm"
			}
		},
		table: {
			slots: {
				td: "text-primary-900"
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
		},
		slider: {
			slots: {
				track: "bg-[var(--color-petrol-blue-200)] rounded-[1px]",
				range: "bg-[var(--color-sky-600)] rounded-[1px]",
				thumb: "size-4 bg-[var(--color-sky-600)] ring-0 cursor-pointer rounded-full shadow-[0px_1px_0.9px_0px_rgba(23,23,21,0.1),0px_1.1px_1.4px_0px_rgba(23,23,21,0.15),0px_2.6px_3.2px_0px_rgba(23,23,21,0.2)]"
			},
			variants: {
				disabled: {
					true: {
						root: "opacity-100 cursor-not-allowed"
					}
				}
			}
		}
	}
});
