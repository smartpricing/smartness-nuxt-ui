import type { UIConfig } from "@/types/ui";
import { DISABLED_INDICATOR } from "./shared";

export default {
	defaultVariants: {
		color: "secondary"
	},
	compoundVariants: [
		{
			disabled: true,
			class: {
				root: DISABLED_INDICATOR.noFade,
				// The thumb keeps its own `bg-default`, so it stays white in both states.
				base: DISABLED_INDICATOR.switchTrack
			}
		}
	]
} satisfies UIConfig["switch"];
