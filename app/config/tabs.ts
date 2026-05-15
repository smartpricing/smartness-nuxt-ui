import type { UIConfig } from "./types";

export default {
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
} satisfies UIConfig["tabs"];
