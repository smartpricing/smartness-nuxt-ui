---
title: USelectMenu (Smartness defaults)
description: Nuxt UI USelectMenu with full-width and disabled-state slot overrides — also supports the "create item" pattern via SSelectMenu showcase.
category: form
prefix: U
componentName: SelectMenu
showcaseSlug: select-menu
showcaseFile: SelectMenu
tags: [selectmenu, search, create-item, form, slot]
subcomponents: []
---

# USelectMenu — Smartness customizations

The layer registers a slot override in `app/app.config.ts`:

```ts
selectMenu: {
	slots: {
		base: "w-full disabled:bg-primary-50"
	}
}
```

## Patterns

The playground showcase under `select-menu` demonstrates the **create-on-add** pattern: when the search term doesn't match any existing option, the menu surfaces a `Create "<term>"` row that emits a `create-item` event.

## Notes

- Single and multiple modes are both supported.
- For tree-like hierarchies use `SMultiSelect` instead.
