---
title: UTabs (Smartness variants)
description: Nuxt UI UTabs with two extra full-width variants — `link-fit` and `pill-fit` — for header navigation rows.
category: navigation
prefix: U
componentName: Tabs
showcaseSlug: tabs
showcaseFile: Tabs
tags: [tabs, link-fit, pill-fit, full-width, variant]
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

## Notes

- Both variants apply `list: 'w-full'` and grid-row distribution per item via `app.config.ts` compound variants.
- The standard `link` and `pill` variants are still available for inline tab rows.
