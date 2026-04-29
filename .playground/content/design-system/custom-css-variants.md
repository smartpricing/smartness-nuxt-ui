---
title: Custom CSS variants
description: Compound variants registered in `app/app.config.ts` — full inventory of customizations applied on top of Nuxt UI components.
section: css
tags: [variants, app-config, compound-variants, button, alert, tabs, badge, slot]
---

# Custom CSS variants

`app/app.config.ts` is the single source of truth for component customizations. The following non-trivial customizations are in place.

## Color registration

```ts
ui.colors = {
	primary: "petrol-blue",
	secondary: "sky",
	support: "warm-gray",
	burgundy: "burgundy",
	lemon: "lemon",
	info: "info",
	success: "success",
	warning: "warning",
	error: "error",
	offblack: "off-black"
}
```

## UInput / USelect / USelectMenu

Slot overrides for full-width and disabled background:

```ts
ui.input = { slots: { root: "w-full" } };
ui.select = { slots: { base: "w-full disabled:bg-primary-50" } };
ui.selectMenu = { slots: { base: "w-full disabled:bg-primary-50" } };
```

## UBadge

```ts
ui.badge = {
	defaultVariants: { variant: "soft" },
	variants: { color: { ai: "", learning: "" } },
	compoundVariants: [/* AI/Learning gradient backgrounds */]
};
```

## UTabs

Two extra full-width variants:

```ts
ui.tabs = {
	variants: {
		variant: {
			"link-fit": { /* link tabs at 1fr */ },
			"pill-fit": { /* pill tabs at 1fr */ }
		}
	},
	compoundVariants: [/* per-trigger and indicator alignment for both variants */]
};
```

## UButton

Extensive `compoundVariants` matrix mapping `color="ai|learning"` × all variants to the corresponding `btn-{ai|learning}-*` classes. See [AI & Learning gradients](./ai-learning-gradients) for the full table.

## UAlert

Two compound variants for gradient outline alerts:

```ts
ui.alert.compoundVariants = [
	{ color: "ai", variant: "outline", class: { root: "alert-ai-outline ring-0" } },
	{ color: "learning", variant: "outline", class: { root: "alert-learning-outline ring-0" } }
];
```

## Notes

- All custom variants lean on utility classes defined in `main.css` and the per-color `ai.css` / `learning.css` files.
- When adding a new variant: declare the compound variant in `app.config.ts` first, then create the matching utility class in CSS.
