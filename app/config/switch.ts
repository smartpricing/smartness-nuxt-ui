import type { UIConfig } from "@/types/ui";
import { DISABLED_INDICATOR } from "./shared";

export default {
	slots: {
		// Disabled reads as `bg-accented` whatever the state (Figma 6696-3770).
		// The theme only paints the track accented while unchecked — checked keeps
		// `bg-{color}`, so a disabled-on switch stayed colored.
		base: "disabled:bg-accented!"
	},
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
