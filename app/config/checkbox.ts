import { DISABLED_INDICATOR } from "./shared";

export default {
	slots: {
		// Disabled reads as `bg-accented` whatever the state (Figma 6696-3770).
		// The checked fill lives on `indicator`, a child of the element that
		// carries the `disabled` attribute, so it needs `group-disabled:` rather
		// than the `disabled:` the switch can use.
		base: "group",
		indicator: "group-disabled:bg-accented!"
	},
	defaultVariants: {
		color: "secondary"
	},
	variants: {
		variant: {
			chip: {
				base: "sr-only",
				label: "text-inherit",
				// A chip is a single minimal token
				description: "hidden"
			}
		}
	},
	compoundVariants: [
		{
			variant: "chip",
			class: {
				wrapper: "ms-0 me-0"
			}
		},
		// Tailwind v4 dropped the UA `cursor: pointer` on interactive elements.
		{
			disabled: false,
			class: {
				base: "cursor-pointer",
				label: "cursor-pointer"
			}
		},
		// Kept last: compound variants are emitted in array order, so these have to
		// come after every colour compound they are meant to grey out.
		{
			disabled: true,
			class: {
				root: DISABLED_INDICATOR.noFade,
				base: `${DISABLED_INDICATOR.surface} ${DISABLED_INDICATOR.ring}`,
				indicator: DISABLED_INDICATOR.fill
			}
		},
		{
			disabled: true,
			variant: "card",
			class: {
				root: DISABLED_INDICATOR.cardBorder
			}
		}
	]
};
