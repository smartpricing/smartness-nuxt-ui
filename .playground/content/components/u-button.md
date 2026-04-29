---
title: UButton (Smartness variants)
description: The Nuxt UI UButton with extra Smartness variants — supports `color="ai"` and `color="learning"` across all visual variants via gradient utility classes.
category: element
prefix: U
componentName: Button
showcaseSlug: buttons
showcaseFile: Buttons
tags: [button, ai, learning, gradient, variant, btn-ai, btn-learning]
subcomponents: []
---

# UButton — Smartness customizations

The base `UButton` from Nuxt UI is augmented with two extra colors and matching compound variants.

## Extra colors

- `color="ai"` — AI gradient. Defined in `app/assets/css/ai.css`.
- `color="learning"` — Learning gradient. Defined in `app/assets/css/learning.css`.

## Variant matrix

The following compound variants are registered in `app/app.config.ts`:

| Variant | AI class | Learning class |
|---|---|---|
| `solid` | `btn-ai-solid` | `btn-learning-solid` |
| `outline` | `btn-ai-outline ring-0` | `btn-learning-outline ring-0` |
| `soft` | `btn-ai-soft` | `btn-learning-soft` |
| `subtle` | `btn-ai-subtle ring-0` | `btn-learning-subtle ring-0` |
| `ghost` | `btn-ai-ghost` | `btn-learning-ghost` |
| `link` | — | `btn-learning-link text-info-700 hover:text-info-500` |

## Quick examples

```vue
<UButton color="ai" variant="solid">Generate</UButton>
<UButton color="learning" variant="outline" icon="ph:graduation-cap">Lesson</UButton>
```

## Notes

- All standard Nuxt UI props (`label`, `icon`, `trailing-icon`, `loading`, `disabled`, `block`) work as usual.
- The "ai" and "learning" colors are NOT a regular color scale — they are CSS gradients, so utility classes like `bg-ai-500` do not exist.
