# `UTable` — rows and cells accept no arbitrary attributes

## Summary

`UTable` renders `<tr>` and `<td>` itself and offers no way to put an arbitrary attribute on either. The `meta` escape hatch covers `class` and `style` only, so a consumer cannot attach `data-testid`, `data-test-value`, `id`, or any ARIA attribute to a row or a cell.

## Versions

`@nuxt/ui@4.7.1`, `reka-ui@2.9.6`.

## Impact

Table rows are not addressable in end-to-end tests. Every other repeated collection in the library can be marked per item; a table cannot, which makes it the one place where a test-id standard cannot be applied uniformly.

It also blocks the container-plus-value pattern outright:

```html
<ul data-testid="users-selector">
	<li data-testid="user-item" data-test-value="1">…</li>
</ul>
```

With `UTable` the container exists — the table root takes attributes fine — but the children cannot be marked, so the pattern has nothing to attach to.

## Root cause

`src/runtime/components/Table.vue` (`dist/runtime/components/Table.vue:308` and `:328`).

The row and cell elements bind a fixed set of attributes and nothing else:

```vue
<tr
	:data-selected="row.getIsSelected()"
	:data-selectable="…"
	:data-expanded="row.getIsExpanded()"
	:data-pinned="row.getIsPinned() || undefined"
	data-slot="tr"
	:class="ui.tr({ class: [uiProp?.tr, resolveValue(tableApi.options.meta?.class?.tr, row)] })"
	:style="[resolveValue(tableApi.options.meta?.style?.tr, row), style]"
>
```

The `data-*` attributes present are **state**, not identity: they say whether the row is selected, expanded, or pinned. Nothing identifies *which* row it is.

`meta` is resolved per row via `resolveValue`, but only for `class` and `style`. There is no `meta.attrs`.

## Repro

```vue
<UTable
	:data="[{ id: 1, name: 'Ada' }]"
	:columns="columns"
	:meta="{ attrs: { tr: (row) => ({ 'data-testid': `row-${row.original.id}` }) } }"
/>
```

`meta.attrs` is ignored — the rendered `<tr>` carries no `data-testid`. There is no supported alternative.

## Workaround

Mark the **contents** of a cell through the per-column slot, which is consumer markup:

```vue
<UTable :data="orders" :columns="columns" data-testid="orders-table">
	<template #code-cell="{ row }">
		<span data-testid="orders-table-row-code" :data-test-value="row.original.code">
			{{ row.original.code }}
		</span>
	</template>
</UTable>
```

This works and needs no library change, but it marks a node *inside* the cell rather than the row itself. A test can reach any marked cell of a row directly; it still cannot reach the row element, so it cannot act on the row as a whole (select it, right-click it, assert its state attributes).

## Proposed fix

Extend the existing `meta` mechanism rather than adding a new prop, since `meta.class` and `meta.style` already resolve per row and per cell through `resolveValue`:

```ts
meta: {
	attrs: {
		tr: (row) => ({ 'data-testid': 'order-row', 'data-test-value': row.original.code }),
		td: (cell) => ({ … })
	}
}
```

Binding it as `v-bind="resolveValue(tableApi.options.meta?.attrs?.tr, row)"` before the existing `data-*` bindings keeps the library's own state attributes authoritative, so a consumer cannot accidentally overwrite `data-selected`.

This follows the shape already established for `class` and `style`, so it adds no new concept to the API.

## Upstream status

Not yet reported.
