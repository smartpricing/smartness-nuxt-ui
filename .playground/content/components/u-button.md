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

## Filter button

The Figma "FilterButton" (node 11595-1755) — the "open the filters panel" entry point, with an
optional "N filters applied" badge — is **not a separate component**: `UButton` already matches it
at `xs`, `sm` and `md` (identical padding, icon and text sizes), so it is a recipe, not new API.

```vue
<UButton
	color="primary"
	variant="outline"
	icon="ph:funnel-simple"
	label="Altri filtri"
	size="md"
	:square="!label && !count"
>
	<template v-if="count" #trailing>
		<UBadge
			:label="String(count)"
			color="primary"
			variant="solid"
			:ui="{ base: 'size-4 shrink-0 justify-center rounded-full p-0 text-[8px] leading-none' }"
		/>
	</template>
</UButton>
```

- **The badge does not scale with the button** — it stays 16px with 8px text at every size, which is
  why it carries an explicit `ui.base` instead of a `size` prop.
- **`square` only when there is nothing beside the icon.** Icon-only *with* a badge keeps the wide
  padding, because the badge sits where the label would.
- `lg` is deliberately not covered: the design context only specifies `xs`/`sm`/`md`.

## Notes

- All standard Nuxt UI props (`label`, `icon`, `trailing-icon`, `loading`, `disabled`, `block`) work as usual.
- The "ai" and "learning" colors are NOT a regular color scale — they are CSS gradients, so utility classes like `bg-ai-500` do not exist.
