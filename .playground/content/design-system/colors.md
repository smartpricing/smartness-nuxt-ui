---
title: Color palette
description: Complete color system — semantic tokens (primary, secondary, support, …), full numeric scales (50…950), and special AI/Learning gradients.
section: tokens
tags: [color, palette, primary, secondary, scale, semantic, css-variables]
---

# Color palette

The Smartness UI color system is split between **semantic tokens** (used by components) and **palettes** (the underlying numeric scales).

## Semantic tokens

| Token | Palette | Anchor shade |
|---|---|---|
| `primary` | `petrol-blue` | 900 |
| `secondary` | `sky` | 700 |
| `support` | `warm-gray` | 200 |
| `burgundy` | `burgundy` | 950 |
| `lemon` | `lemon` | 400 |
| `info` | `info` | 700 |
| `success` | `success` | 700 |
| `warning` | `warning` | 700 |
| `error` | `error` | 700 |
| `offblack` | `off-black` | n/a |
| `ai` | gradient | n/a (CSS gradient) |
| `learning` | gradient | n/a (CSS gradient) |

The anchor shade is the value applied to `--ui-<token>` in `app/assets/css/main.css`. Nuxt UI defaults to shade 500 (light) / 400 (dark); the Smartness layer overrides this to favour higher contrast (700 / 900 depending on token).

## Numeric scales

Each non-gradient palette exposes the full `50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950` range as CSS variables in `app/assets/css/variables.css`. They are accessible as Tailwind utilities (e.g. `bg-primary-700`, `text-burgundy-500`).

## Notes

- `ai` and `learning` are NOT scales — they are gradients used through utility classes (`btn-ai-solid`, `alert-learning-outline`, etc.).
- To add a new color: declare scale variables in `variables.css`, register it in `app.config.ts > ui.colors`, and add it to `nuxt.config.ts > ui.theme.colors`.
- To pick a shade: `bg-{palette}-{shade}` (Tailwind), or `var(--color-{palette}-{shade})` in CSS.
