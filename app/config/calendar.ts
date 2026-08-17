import type { UIConfig } from "@/types/ui";

export default {
	slots: {
		cellTrigger: "data-disabled:cursor-not-allowed data-unavailable:pointer-events-auto data-unavailable:cursor-not-allowed"
	},
	defaultVariants: {
		// A calendar selection reads as the Smartness selection blue: petrol blue
		// (`primary`) is reserved for surfaces, not for the selected day. `secondary`
		// resolves to `secondary-700` through `--ui-secondary`, so the stock Nuxt UI
		// colour compound already paints selected / today / highlighted correctly.
		color: "secondary"
	},
	compoundVariants: [
		{
			color: "secondary",
			variant: "solid",
			class: {
				// Today keeps a filled pill on top of the stock colour compound. It
				// lives here, not in `slots`: a consumer overriding `slots.cellTrigger`
				// replaces that string wholesale (app config merges with defu), while
				// `compoundVariants` entries are concatenated.
				cellTrigger: "data-today:rounded-full data-today:not-data-[selected]:bg-secondary-100"
			}
		}
	]
} satisfies UIConfig["calendar"];
