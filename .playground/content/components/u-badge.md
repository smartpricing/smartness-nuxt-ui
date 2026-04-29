---
title: UBadge (Smartness variants)
description: Nuxt UI UBadge with `ai` and `learning` color tokens added (gradient backgrounds).
category: feedback
prefix: U
componentName: Badge
showcaseSlug: badges
showcaseFile: Badges
tags: [badge, ai, learning, gradient, variant, soft]
subcomponents: []
---

# UBadge — Smartness customizations

`UBadge` is registered with default `variant: "soft"` and recognises the `ai` and `learning` color tokens through compound variants in `app/app.config.ts`.

## Customizations

- `defaultVariants: { variant: "soft" }` — soft is the default visual style across the layer.
- `variants.color.ai` and `variants.color.learning` — registered (empty by default; gradient applied via compound variants).

## Quick examples

```vue
<UBadge color="ai" variant="soft">AI</UBadge>
<UBadge color="learning" variant="soft">Beta</UBadge>
<UBadge color="success">Live</UBadge>
```

## Notes

- For solid AI/Learning gradient surfaces, prefer `UButton` with `color="ai|learning"` — `UBadge` deliberately keeps a softer footprint.
