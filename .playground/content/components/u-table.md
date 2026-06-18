---
title: UTable (Smartness)
description: Nuxt UI UTable with Smartness body-cell color plus an opt-in, scroll-aware pinned-column treatment. Paired with SMoreActions, row selection, sorting, column visibility, useStickyTableColumns and useTableHeight for the standard PMS list pattern.
category: data
prefix: U
componentName: Table
showcaseSlug: tables
showcaseFile: Tables
tags: [table, data, tanstack, expandable, sortable, selection, pinning, pagination]
subcomponents: []
---

# UTable — Smartness usage

The layer customizes `UTable` in `app/config/table.ts`:

- **`td: "text-primary-900"`** — body cells use the design-system ink color.
- **Pinned-column Tailwind utilities** — pinned cells get sticky positioning and opaque backgrounds from the table config, but shadows are gated by scroll-state classes.

Pinned-column shadows are not global. Opt in per table with `useStickyTableColumns`; it toggles `is-scrolled-left` and `is-scrolled-right` on the table element so each side only shows its shadow when there is hidden content on that side.

## Standard table pattern

The `Tables.vue` showcase (slug `tables`) demonstrates the full PMS list pattern in a single example: bulk row selection, sortable headers, column visibility filtering, status badges, an `SMoreActions` actions column, multiple pinned columns, an empty state, a viewport-bounded sticky header via `useTableHeight`, and pagination docked to the `UCard` footer.

### Row selection

```vue
<UTable
	v-model:row-selection="rowSelection"
	:get-row-id="(row) => row.id"
	:columns="columns"
	:data="rows"
/>
```

```ts
const rowSelection = ref<Record<string, boolean>>({});
```

Add a leading `select` column with header + cell checkboxes:

```ts
{
	id: "select",
	size: 48,
	meta: { class: { th: "min-w-12", td: "min-w-12" } },
	header: ({ table }) => h(UCheckbox, {
		modelValue: table.getIsSomePageRowsSelected() ? "indeterminate" : table.getIsAllPageRowsSelected(),
		"onUpdate:modelValue": (v) => table.toggleAllPageRowsSelected(!!v)
	}),
	cell: ({ row }) => h(UCheckbox, {
		modelValue: row.getIsSelected(),
		"onUpdate:modelValue": (v) => row.toggleSelected(!!v)
	})
}
```

`:get-row-id` matters when the table is paginated — without it row ids default to the per-page index, so a selection would re-point to a different row on page change.

### Pinned columns

```ts
const columnPinning = ref({ left: ["select", "name"], right: ["actions"] });
```

```ts
const table = useTemplateRef("table");
useStickyTableColumns(table, rows, columns);
```

```vue
<UTable
	ref="table"
	:column-pinning="columnPinning"
/>
```

Give pinned columns a deterministic width (`size` + a `meta.class` min-width) so the layout doesn't shift as the scroll-aware gradient renders. Left pinned columns show their right-edge shadow only after scrolling away from the left edge; right pinned columns show their left-edge shadow until the table reaches the right edge.

### Sortable headers

A header factory renders a sort button and flips local sort state:

```ts
const sortableHeader = (label, key) => () => h(UButton, {
	color: "neutral", variant: "ghost", size: "sm", label,
	trailingIcon: sortIcon(key),
	onClick: () => toggleSort(key)
});
```

### Column visibility

```vue
<UTable v-model:column-visibility="columnVisibility" ... />
<UDropdownMenu :items="columnsDropdownItems">
	<UButton label="Columns" color="neutral" variant="outline" />
</UDropdownMenu>
```

Build `columnsDropdownItems` from `tableApi.getAllColumns()`. When that computed is consumed in the **same template** that holds `<UTable ref="table">`, type `useTemplateRef` explicitly — otherwise `table` infers its type from the template that also reads it, a circular implicit-any:

```ts
const table = useTemplateRef<{
	tableApi?: {
		getAllColumns: () => Array<{
			id: string
			getCanHide: () => boolean
			getIsVisible: () => boolean
			toggleVisibility: (v?: boolean) => void
		}>
		getColumn: (id: string) => { toggleVisibility: (v?: boolean) => void } | undefined
	}
}>("table");
```

### Viewport-bounded height

Pair `sticky` with the `useTableHeight` composable so the header stays pinned and only the body scrolls — see the `useTableHeight` composable doc.

## Notes

- Built on `@tanstack/vue-table` — column shape is the standard `TableColumn<T>` / `ColumnDef<T>`.
- Import `Row<T>` from `@tanstack/vue-table`; `TableColumn<T>` from `@nuxt/ui`.
- Expandable rows use the stock `#expanded` slot plus an `expand` column toggling `row.toggleExpanded()`.
- Row actions go in a trailing cell rendered with `<SMoreActions>`; long text columns wrap in `<STruncatedText>` for ellipsis + tooltip.
