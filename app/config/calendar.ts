import type { UIConfig } from "@/types/ui";

export default {
	slots: {
		cellTrigger: "data-today:bg-lemon-400 data-today:rounded-full data-disabled:cursor-not-allowed data-unavailable:pointer-events-auto data-unavailable:cursor-not-allowed"
	},
	compoundVariants: [
		{
			color: "primary",
			variant: "solid",
			class: {
				// The default `primary` calendar reads as the Smartness selection blue:
				// petrol blue is reserved for surfaces, not for the selected day.
				cellTrigger: "data-[selected]:bg-secondary-700 data-[selected]:text-(--ui-bg) data-today:not-data-[selected]:text-lemon-900 data-[highlighted]:bg-secondary-700/20 hover:not-data-[selected]:bg-secondary-700/20"
			}
		}
	]
} satisfies UIConfig["calendar"];
