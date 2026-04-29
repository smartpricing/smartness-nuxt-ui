---
title: UTable (Smartness)
description: Nuxt UI UTable — used by the layer with the design system tokens, often paired with SMoreActions and STruncatedText for row density.
category: data
prefix: U
componentName: Table
showcaseSlug: tables
showcaseFile: Tables
tags: [table, data, tanstack, expandable, sortable]
subcomponents: []
---

# UTable — Smartness usage

`UTable` is consumed without overrides. The layer provides showcase examples for common patterns:

- **Row actions** via `SMoreActions` in a trailing cell.
- **Long text columns** wrapped with `STruncatedText` for ellipsis + tooltip.
- **Expandable rows** with `expand` column type.

## Quick example

```vue
<UTable
	:data="rows"
	:columns="[
		{ accessorKey: 'name', header: 'Name', cell: ({ row }) => h(STruncatedText, { text: row.original.name }) },
		{ accessorKey: 'status', header: 'Status' },
		{ id: 'actions', header: '', cell: ({ row }) => h(SMoreActions, { actions: rowActions(row.original), maxInline: 1 }) }
	]"
/>
```

## Notes

- `UTable` is built on `@tanstack/vue-table` — use the same column shape.
- For server-side pagination, drive `data` from a `useFetch` and pass `meta.totalCount` separately.
