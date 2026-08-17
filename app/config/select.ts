import { DISABLED_FIELD, DISABLED_FIELD_GHOST } from "./shared";

export default {
	slots: {
		// Tailwind v4 dropped the UA `cursor: pointer`; upstream's
		// `disabled:cursor-not-allowed` / `data-disabled:` still outrank it.
		base: "w-full cursor-pointer",
		item: "cursor-pointer"
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
