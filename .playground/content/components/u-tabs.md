---
title: UTabs (Smartness variants)
description: Nuxt UI UTabs with two extra full-width variants — `link-fit` and `pill-fit` — for header navigation rows, plus a `light` pill color for toolbars.
category: navigation
prefix: U
componentName: Tabs
showcaseSlug: tabs
showcaseFile: Tabs
tags: [tabs, link-fit, pill-fit, light, full-width, variant]
subcomponents: []
---

# UTabs — Smartness customizations

`UTabs` adds two extra variants designed for full-width header tab rows.

## Extra variants

- `variant="link-fit"` — link-style tabs distributed evenly across the container (each tab fills `1fr`).
- `variant="pill-fit"` — pill-style tabs distributed evenly across the container.

## Quick examples

```vue
<UTabs
	variant="link-fit"
	:items="[
		{ label: 'Overview', value: 'overview' },
		{ label: 'Bookings', value: 'bookings' },
		{ label: 'Reviews', value: 'reviews' }
	]"
	v-model="active"
/>

<UTabs
	variant="pill-fit"
	:items="quickFilters"
	v-model="filter"
/>
```

## Extra color: `light`

`color="light"` is a pill color (`pill` and `pill-fit`) for toolbars and filter bars: the track is `bg-accented` (one step darker than the default `bg-elevated`), the active pill is `bg-default` (white) with `text-highlighted` (dark) text. All tokens are semantic, so it adapts to dark mode.

```vue
<UTabs
	variant="pill-fit"
	color="light"
	size="sm"
	:content="false"
	:items="viewModes"
	v-model="viewMode"
/>
```

## Notes

- Both variants apply `list: 'w-full'` and grid-row distribution per item via `app.config.ts` compound variants.
- The standard `link` and `pill` variants are still available for inline tab rows.
- `light` has no `link` / `link-fit` compound variant: pair it with `pill` or `pill-fit` only.
