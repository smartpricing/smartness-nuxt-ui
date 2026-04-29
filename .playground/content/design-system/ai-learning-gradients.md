---
title: AI & Learning gradients
description: Special CSS gradients for AI assistance and Learning content — applied through dedicated utility classes since they are not numeric color scales.
section: tokens
tags: [ai, learning, gradient, btn-ai, btn-learning, alert-ai, alert-learning, special-color]
---

# AI & Learning gradients

`ai` and `learning` are exposed as semantic colors but they are **not** numeric scales. They are CSS gradients defined in:

- `app/assets/css/ai.css` — AI gradient + `btn-ai-*` and `alert-ai-*` utility classes.
- `app/assets/css/learning.css` — Learning gradient + `btn-learning-*` and `alert-learning-*` utility classes.

## Utility classes

### Buttons

| Variant | AI class | Learning class |
|---|---|---|
| solid | `btn-ai-solid` | `btn-learning-solid` |
| outline | `btn-ai-outline ring-0` | `btn-learning-outline ring-0` |
| soft | `btn-ai-soft` | `btn-learning-soft` |
| subtle | `btn-ai-subtle ring-0` | `btn-learning-subtle ring-0` |
| ghost | `btn-ai-ghost` | `btn-learning-ghost` |
| link | — | `btn-learning-link` |

These are wired in `app/app.config.ts` via compound variants on `UButton`. Use them via `<UButton color="ai" variant="…">` rather than applying the classes directly.

### Alerts

- `alert-ai-outline` — applied to `UAlert` root with `color="ai" variant="outline"`.
- `alert-learning-outline` — applied to `UAlert` root with `color="learning" variant="outline"`.

## Limitations

- `bg-ai-500`, `text-learning-700`, etc. **do not exist** — the gradients are not numeric.
- Mixing AI and Learning gradients on the same view is discouraged; they should mark distinct content domains (AI suggestions vs in-app tutorials).

## Adding a new gradient

1. Create a CSS file under `app/assets/css/<name>.css`.
2. `@import` it from `main.css`.
3. Register the color in `app/app.config.ts > ui.colors` and in `nuxt.config.ts > ui.theme.colors`.
4. Add compound variants for `UButton` / `UAlert` referencing the utility classes.
