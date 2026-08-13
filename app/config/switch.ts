import type { UIConfig } from "@/types/ui";

export default {
	slots: {
		// Disabled reads as `bg-accented` whatever the state (Figma 6696-3770).
		// The theme only paints the track accented while unchecked — checked keeps
		// `bg-{color}`, so a disabled-on switch stayed colored.
		base: "disabled:bg-accented!"
	},
	defaultVariants: {
		color: "secondary"
	}
} satisfies UIConfig["switch"];
