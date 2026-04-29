---
title: Typography
description: Saans variable font, default weights and italics, and how to use prose components for long-form text.
section: theme
tags: [typography, font, saans, prose, variable-font]
---

# Typography

Smartness UI uses the **Saans** variable font as the default sans-serif family.

## Font setup

- Files: `app/assets/fonts/SaansVF.woff2` (normal) and `SaansVFItalics.woff2` (italic).
- `@font-face` declarations live in `app/assets/css/main.css`.
- Variable axis: `font-weight: 100..900`.
- `font-style: italic` available via the italic file.

## Theme token

In `app/assets/css/main.css`:

```css
@theme {
	--font-sans: "Saans", "sans-serif";
	--ui-radius: 0.25rem;
}
```

Tailwind's `font-sans` utility resolves to Saans automatically.

## Prose components

The layer enables Nuxt UI prose components (`prose: true` in `nuxt.config.ts > ui`). Use `<ProseH1>`, `<ProseH2>`, `<ProseP>`, `<ProseCode>`, etc. inside MDC content.

## Notes

- Default radius `--ui-radius: 0.25rem` is tighter than Nuxt UI's default — check it harmonizes with custom components when overriding.
- For monospaced code blocks the layer relies on the system mono stack; no custom mono font is shipped.
