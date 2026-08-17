import type { UIConfig } from "@/types/ui";

export default {
	slots: {
		cellTrigger: "data-disabled:cursor-not-allowed data-unavailable:pointer-events-auto data-unavailable:cursor-not-allowed"
	},
	compoundVariants: [
		{
			color: "primary",
			variant: "solid",
			class: {
				// The default `primary` calendar reads as the Smartness selection blue:
				// petrol blue is reserved for surfaces, not for the selected day.
				// The today pill lives here, not in `slots`: a consumer that overrides
				// `slots.cellTrigger` replaces the string wholesale (app config merges
				// with defu), while `compoundVariants` entries are concatenated.
				cellTrigger: "data-[selected]:bg-secondary-700 data-[selected]:text-(--ui-bg) data-today:rounded-full data-today:not-data-[selected]:bg-secondary-100 data-today:not-data-[selected]:text-secondary-700 data-[highlighted]:bg-secondary-700/20 hover:not-data-[selected]:bg-secondary-700/20"
			}
		}
	]
} satisfies UIConfig["calendar"];
