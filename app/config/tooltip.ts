export default {
	slots: {
		// Upstream pins the tooltip to a single `h-6` line and truncates the text,
		// which silently swallows the longer explanatory copy the design system uses.
		content: "h-auto max-w-xs",
		text: "whitespace-normal"
	}
};
