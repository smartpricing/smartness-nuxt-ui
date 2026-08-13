import type { UIConfig } from "@/types/ui";
import { DISABLED_FIELD, DISABLED_FIELD_GHOST } from "./shared";

export default {
	slots: {
		root: "w-full"
	},
	variants: {
		variant: {
			outline: DISABLED_FIELD,
			soft: DISABLED_FIELD,
			subtle: DISABLED_FIELD,
			ghost: DISABLED_FIELD_GHOST,
			none: DISABLED_FIELD
		}
	}
} satisfies UIConfig["inputMenu"];
