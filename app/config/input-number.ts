import { DISABLED_FIELD, DISABLED_FIELD_GHOST } from "./shared";

export default {
	slots: {
		// Upstream root is `inline-flex`, so the control shrinks to its content and
		// never lines up with the Input/Select next to it in a form grid.
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
};
