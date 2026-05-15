import type { UIConfig } from "./types";

export default {
	slots: {
		track: "bg-[var(--color-petrol-blue-200)] rounded-[1px]",
		range: "bg-[var(--color-sky-600)] rounded-[1px]",
		thumb: "size-4 bg-[var(--color-sky-600)] ring-0 cursor-pointer rounded-full shadow-[0px_1px_0.9px_0px_rgba(23,23,21,0.1),0px_1.1px_1.4px_0px_rgba(23,23,21,0.15),0px_2.6px_3.2px_0px_rgba(23,23,21,0.2)]"
	},
	variants: {
		disabled: {
			true: {
				root: "opacity-100 cursor-not-allowed"
			}
		}
	}
} satisfies UIConfig["slider"];
