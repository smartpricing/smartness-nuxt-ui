import type { UIConfig } from "./types";

export default {
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
} satisfies UIConfig["button"];
