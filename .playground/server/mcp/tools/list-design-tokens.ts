export default defineMcpTool({
	description: "List all Smartness UI design tokens — color palette names with semantic mappings, typography settings, special AI/Learning gradient classes, and custom CSS utility classes.",
	annotations: {
		readOnlyHint: true,
		destructiveHint: false,
		idempotentHint: true,
		openWorldHint: false
	},
	cache: "1h",
	handler() {
		return {
			colors: {
				semantic: {
					primary: { palette: "petrol-blue", anchorShade: 900 },
					secondary: { palette: "sky", anchorShade: 700 },
					support: { palette: "warm-gray", anchorShade: 200 },
					burgundy: { palette: "burgundy", anchorShade: 950 },
					lemon: { palette: "lemon", anchorShade: 400 },
					info: { palette: "info", anchorShade: 700 },
					success: { palette: "success", anchorShade: 700 },
					warning: { palette: "warning", anchorShade: 700 },
					error: { palette: "error", anchorShade: 700 },
					offblack: { palette: "off-black", anchorShade: null }
				},
				gradient: {
					ai: { description: "AI gradient — used by btn-ai-* and alert-ai-* utility classes" },
					learning: { description: "Learning gradient — used by btn-learning-* and alert-learning-* utility classes" }
				},
				shades: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950],
				notes: [
					"All scales are defined in app/assets/css/variables.css.",
					"Semantic anchor shade is overridden in main.css (e.g. --ui-primary: var(--ui-color-primary-900)).",
					"AI and Learning are NOT scales — they are CSS gradients defined in app/assets/css/ai.css and learning.css."
				]
			},
			typography: {
				font: {
					family: "Saans",
					fallback: "sans-serif",
					weights: "100..900 (variable font, woff2)",
					italic: true,
					declaredIn: "app/assets/css/main.css"
				},
				radius: { default: "0.25rem", cssVar: "--ui-radius" }
			},
			customCssClasses: {
				button: [
					{ name: "btn-ai-solid", appliedVia: "ui.button.compoundVariants color=ai variant=solid" },
					{ name: "btn-ai-outline", appliedVia: "ui.button.compoundVariants color=ai variant=outline" },
					{ name: "btn-ai-soft", appliedVia: "ui.button.compoundVariants color=ai variant=soft" },
					{ name: "btn-ai-subtle", appliedVia: "ui.button.compoundVariants color=ai variant=subtle" },
					{ name: "btn-ai-ghost", appliedVia: "ui.button.compoundVariants color=ai variant=ghost" },
					{ name: "btn-learning-solid", appliedVia: "ui.button.compoundVariants color=learning variant=solid" },
					{ name: "btn-learning-outline", appliedVia: "ui.button.compoundVariants color=learning variant=outline" },
					{ name: "btn-learning-soft", appliedVia: "ui.button.compoundVariants color=learning variant=soft" },
					{ name: "btn-learning-subtle", appliedVia: "ui.button.compoundVariants color=learning variant=subtle" },
					{ name: "btn-learning-ghost", appliedVia: "ui.button.compoundVariants color=learning variant=ghost" },
					{ name: "btn-learning-link", appliedVia: "ui.button.compoundVariants color=learning variant=link" }
				],
				alert: [
					{ name: "alert-ai-outline", appliedVia: "ui.alert.compoundVariants color=ai variant=outline" },
					{ name: "alert-learning-outline", appliedVia: "ui.alert.compoundVariants color=learning variant=outline" }
				],
				tabsVariants: [
					{ name: "link-fit", appliedVia: "ui.tabs custom variant — full-width link tabs" },
					{ name: "pill-fit", appliedVia: "ui.tabs custom variant — full-width pill tabs" }
				]
			},
			cssFiles: [
				"app/assets/css/main.css — entry point, @theme + global resets",
				"app/assets/css/variables.css — full color scales (50..950) for all palettes",
				"app/assets/css/typography.css — Saans variable font, prose styles",
				"app/assets/css/transitions.css — global transition utilities",
				"app/assets/css/ai.css — AI gradient + btn-ai-* + alert-ai-* utilities",
				"app/assets/css/learning.css — Learning gradient + btn-learning-* + alert-learning-* utilities"
			]
		};
	}
});
