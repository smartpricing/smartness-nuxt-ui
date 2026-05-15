import type { UIConfig } from "./types";

export default {
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
} satisfies UIConfig["navigationMenu"];
