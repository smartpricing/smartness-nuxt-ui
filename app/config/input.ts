import type { UIConfig } from "@/types/ui";

export default {
	slots: {
		root: "w-full",
		base: "disabled:bg-primary-50"
	}
} satisfies UIConfig["input"];
