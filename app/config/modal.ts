import type { UIConfig } from "./types";

export default {
	slots: {
		overlay: "bg-primary-950/40"
	},
	variants: {
		fullscreen: {
			false: {
				overlay: "bg-primary-950/40"
			}
		},
		overlay: {
			true: {
				overlay: "bg-primary-950/40"
			}
		}
	}
} satisfies UIConfig["modal"];
