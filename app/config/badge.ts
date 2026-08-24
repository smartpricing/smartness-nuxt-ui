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
		},
		{
			color: "primary",
			variant: "soft",
			class: "bg-primary-50 text-primary-900"
		},
		{
			color: "primary",
			variant: "subtle",
			class: "bg-primary-50 text-primary-900 ring-primary-200"
		},
		{
			color: "secondary",
			variant: "soft",
			class: "bg-secondary-50 text-secondary-800"
		},
		{
			color: "secondary",
			variant: "subtle",
			class: "bg-secondary-50 text-secondary-800 ring-secondary-200"
		},
		{
			color: "info",
			variant: "soft",
			class: "bg-info-50 text-info-700"
		},
		{
			color: "info",
			variant: "subtle",
			class: "bg-info-50 text-info-700 ring-info-200"
		},
		{
			color: "success",
			variant: "soft",
			class: "bg-success-50 text-success-800"
		},
		{
			color: "success",
			variant: "subtle",
			class: "bg-success-50 text-success-800 ring-success-200"
		},
		{
			color: "warning",
			variant: "soft",
			class: "bg-warning-50 text-warning-800"
		},
		{
			color: "warning",
			variant: "subtle",
			class: "bg-warning-50 text-warning-800 ring-warning-200"
		},
		{
			color: "error",
			variant: "soft",
			class: "bg-error-50 text-error-700"
		},
		{
			color: "error",
			variant: "subtle",
			class: "bg-error-50 text-error-700 ring-error-200"
		}
	]
};
