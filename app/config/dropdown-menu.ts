export default {
	slots: {
		// Tailwind v4 no longer sets `cursor: pointer` on interactive elements, so
		// every clickable surface in the design system has to opt back in. The
		// upstream `data-disabled:cursor-not-allowed` outranks this on specificity.
		item: "cursor-pointer"
	}
};
