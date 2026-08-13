import type { UIConfig } from "@/types/ui";
import { DISABLED_INDICATOR } from "./shared";

export default {
	defaultVariants: {
		color: "secondary"
	},
	variants: {
		variant: {
			chip: {
				base: "sr-only",
				label: "text-inherit",
				// A chip is a single minimal token
				description: "hidden"
			}
		}
	},
	compoundVariants: [
		{
			variant: "chip",
			class: {
				wrapper: "ms-0 me-0"
			}
		},
		// Kept last: compound variants are emitted in array order, so these have to
		// come after every colour compound they are meant to grey out.
		{
			disabled: true,
			class: {
				root: DISABLED_INDICATOR.noFade,
				base: `${DISABLED_INDICATOR.surface} ${DISABLED_INDICATOR.ring}`,
				indicator: DISABLED_INDICATOR.fill
			}
		},
		{
			disabled: true,
			variant: "card",
			class: {
				root: DISABLED_INDICATOR.cardBorder
			}
		}
	]
} satisfies UIConfig["checkbox"];
