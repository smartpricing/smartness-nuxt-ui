export default defineMcpResource({
	uri: "resource://smartness-ui/design-tokens",
	description: "Smartness UI design tokens: color palettes, semantic mappings, AI/Learning gradients, typography, custom CSS classes.",
	cache: "1h",
	handler(uri: URL) {
		const tokens = {
			semanticColors: ["primary", "secondary", "support", "burgundy", "lemon", "info", "success", "warning", "error", "offblack", "ai", "learning"],
			palettes: ["petrol-blue", "sky", "warm-gray", "burgundy", "lemon", "info", "success", "warning", "error", "off-black"],
			gradients: ["ai", "learning"],
			shades: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950],
			cssCustomClasses: {
				button: ["btn-ai-solid", "btn-ai-outline", "btn-ai-soft", "btn-ai-subtle", "btn-ai-ghost", "btn-learning-solid", "btn-learning-outline", "btn-learning-soft", "btn-learning-subtle", "btn-learning-ghost", "btn-learning-link"],
				alert: ["alert-ai-outline", "alert-learning-outline"],
				tabsCustomVariants: ["link-fit", "pill-fit"]
			},
			typography: { font: "Saans", fallback: "sans-serif", weights: "100..900 (variable font)" }
		};

		return {
			contents: [{
				uri: uri.toString(),
				mimeType: "application/json",
				text: JSON.stringify(tokens, null, 2)
			}]
		};
	}
});
