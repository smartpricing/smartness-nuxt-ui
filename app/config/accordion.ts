import type { UIConfig } from "@/types/ui";

export default {
	slots: {
		// See dropdown-menu.ts. The upstream `disabled` variant sets
		// `cursor-not-allowed` on this same slot and is emitted after it.
		trigger: "cursor-pointer"
	}
} satisfies UIConfig["accordion"];
