---
title: USelect (Smartness defaults)
description: Nuxt UI USelect with the layer's slot override for full-width and disabled background.
category: form
prefix: U
componentName: Select
showcaseSlug: select
showcaseFile: Select
tags: [select, form, slot, full-width, disabled]
subcomponents: []
---

# USelect — Smartness customizations

The layer registers a slot override in `app/app.config.ts`:

```ts
select: {
	slots: {
		base: "w-full disabled:bg-primary-50"
	}
}
```

This makes `USelect` full-width by default and softens the disabled state with a primary-50 background.

## Notes

- For searchable selects, use `USelectMenu` (also has the same `base` override).
- For hierarchical multi-selection, use `SMultiSelect`.
