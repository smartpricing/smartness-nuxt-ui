import { DISABLED_SEGMENTED_FIELD } from "./shared";

export default {
	slots: {
		segment: "focus:bg-secondary-200"
	},
	variants: {
		variant: {
			outline: DISABLED_SEGMENTED_FIELD,
			soft: DISABLED_SEGMENTED_FIELD,
			subtle: DISABLED_SEGMENTED_FIELD,
			ghost: DISABLED_SEGMENTED_FIELD,
			none: DISABLED_SEGMENTED_FIELD
		}
	}
};
