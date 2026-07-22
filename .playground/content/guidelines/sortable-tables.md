---
title: Sortable tables
description: Conventions for building consistent, sortable UTable-based list views with typed columns, server or client sorting, pagination, row actions, and pinned columns.
category: patterns
tags: [table, utable, sorting, pagination, columns, actions, list-view]
---

Reusable patterns for `UTable`-based list views:

1. **[Column definitions and typing](#column-definitions-and-typing)** — explicit `TableColumn<T>` / `Row<T>` typing, no `any`.
2. **[Server-side column sorting](#server-side-column-sorting)** — click a column header to sort the backend query.
3. **[Client-side sorting](#client-side-sorting)** — when the full dataset lives in the browser.
4. **[Pagination integration](#pagination-integration)** — `UPagination` wired to the same params object.
5. **[Loading and empty states](#loading-and-empty-states)** — consistent feedback while fetching or when there is no data.
6. **[Actions column](#actions-column)** — standardized trailing row-actions column with `SMoreActions`.
7. **[Sticky pinned columns](#sticky-pinned-columns-scroll-shadows)** — scroll-aware shadows via `useStickyTableColumns`.
8. **[Drag-and-drop row reordering](#drag-and-drop-row-reordering)** — reorder an in-memory array inside a form.

---

## Column definitions and typing

Every table declares its row type and types its columns as `TableColumn<T>`. Cell renderers receive a typed `Row<T>` — never `any`.

```typescript
import type { TableColumn } from "@nuxt/ui";
import type { Row } from "@tanstack/vue-table";

interface Product {
	id: string;
	name: string;
	price: number;
	createdAt: string;
}

const columns: TableColumn<Product>[] = [
	{
		accessorKey: "name",
		header: () => t("fields.name"),
		cell: ({ row }: { row: Row<Product> }) => row.original.name
	},
	{
		accessorKey: "price",
		header: () => t("fields.price"),
		cell: ({ row }: { row: Row<Product> }) => formatCurrency(row.original.price)
	}
];
```

### Key rules

1. **No `any`, no untyped destructuring** — always annotate the cell parameter as `{ row }: { row: Row<T> }`. This keeps `row.original` fully typed.
2. **Beware circular inference** — if a computed based on `table.value?.tableApi` is consumed in the template next to the same `<UTable ref="table">`, TypeScript can fall into a circular implicit-`any`. Type such computeds explicitly instead of loosening the columns.
3. **Render components with `h()` + `resolveComponent`** — cells that need components (badges, buttons, `SMoreActions`) build them in the `cell` function, not in template slots, so the column definition stays the single source of truth.

---

## Server-side column sorting

> Pattern for making `UTable` column headers trigger server-side sorting via `sortBy` / `order` params on the list query.

**Default for paginated list views.** Whenever the list query supports server-side sorting (it exposes `sortBy` / `order` params), the columns that map to a backend-sortable field MUST use `sortableHeader(labelKey, sortKey)` instead of a plain `header: () => t(labelKey)`. If a filter panel offers the same sort options, keep `sortKey` values in sync with it so both entry points behave identically.

### Why not TanStack's built-in sorting?

`UTable` supports `v-model:sorting` (TanStack), but paginated list queries sort server-side via `sortBy` / `order` params. Using TanStack's client-side sorting would fight the server: it would reorder only the current page. Instead, bind column headers directly to the existing params — param mutations trigger a refetch through your data-fetching layer (query composable, watcher, etc.).

### Pattern

Define a `sortableHeader(labelKey, sortKey)` helper in the list component. Use it as the `header` for any column that maps to a valid `sortBy` value. `params` is the same single reactive object described in the **List filters pattern** guideline (pagination + sorting + filters together), consumed by your data-fetching layer.

```typescript
const UButton = resolveComponent("UButton");
const { t } = useI18n();

const sortableHeader = (labelKey: string, sortKey: string) => {
	return () => {
		const isActive = params.sortBy === sortKey;
		const icon = !isActive
			? "ph:arrows-down-up"
			: params.order === "asc"
				? "ph:sort-ascending"
				: "ph:sort-descending";

		return h(UButton, {
			color: "neutral",
			variant: "ghost",
			size: "sm",
			label: t(labelKey),
			trailingIcon: icon,
			class: "-mx-2.5",
			onClick: () => {
				if (isActive) {
					params.order = params.order === "asc" ? "desc" : "asc";
				} else {
					params.sortBy = sortKey;
					params.order = "asc";
				}
				params.page = 1;
			}
		});
	};
};

const columns: TableColumn<Product>[] = [
	{
		accessorKey: "createdAt",
		header: sortableHeader("fields.createdAt", "created_at"),
		cell: ({ row }: { row: Row<Product> }) => formatDate(row.original.createdAt)
	},
	{
		accessorKey: "name",
		header: sortableHeader("fields.name", "name"),
		cell: ({ row }: { row: Row<Product> }) => row.original.name
	}
	// non-sortable columns keep `header: () => t(...)`
];
```

### Click behavior

- First click on an inactive column → sets `sortBy = sortKey`, `order = "asc"`
- Click on the already-active column → toggles `asc` ⇄ `desc`
- Always resets `params.page = 1` to avoid landing on an out-of-range page

### Icons

- Inactive: `ph:arrows-down-up`
- Ascending: `ph:sort-ascending`
- Descending: `ph:sort-descending`

### Reactivity

Icons update correctly after click because the loading status flips during refetch, which re-renders `UTable` and re-invokes the `header()` functions. No manual re-render needed.

### Key rules

1. **Don't use `v-model:sorting`** — this is server-side sorting; TanStack's client sort would duplicate/conflict.
2. **Don't set `enableSorting: true`** — it's a no-op without `v-model:sorting` and adds noise.
3. **`sortKey` must match a backend-accepted value** — keep it in sync with any sort options shown elsewhere in the UI (filter panel, sort dropdown).
4. **Only mark columns sortable if the backend supports that sort field** — a field may be sortable in the API without having a dedicated column; leave it to the filter panel in that case.
5. **Reset page on sort change** — prevents displaying an empty page if the new sort has fewer total rows at the current offset.

---

## Client-side sorting

Only when the **entire dataset is loaded in the browser** (no server pagination) may you use TanStack's built-in sorting through `v-model:sorting`:

```vue
<script setup lang="ts">
const sorting = ref([{ id: "name", desc: false }]);
</script>

<template>
	<UTable
		v-model:sorting="sorting"
		:data="items"
		:columns="columns"
	/>
</template>
```

With client-side sorting the header uses `column.toggleSorting` from TanStack instead of mutating query params:

```typescript
{
	accessorKey: "name",
	header: ({ column }) => h(UButton, {
		color: "neutral",
		variant: "ghost",
		size: "sm",
		label: t("fields.name"),
		trailingIcon: column.getIsSorted() === false
			? "ph:arrows-down-up"
			: column.getIsSorted() === "asc"
				? "ph:sort-ascending"
				: "ph:sort-descending",
		class: "-mx-2.5",
		onClick: () => column.toggleSorting(column.getIsSorted() === "asc")
	})
}
```

**Pick one mode per table, never both.** Server-side params and `v-model:sorting` on the same table will fight each other. Use the same three Phosphor icons in both modes so tables look identical regardless of where sorting happens.

---

## Pagination integration

Paginated tables bind `UPagination` to the same `params` object the sorting headers mutate, and read the total from the server response:

```vue
<template>
	<UTable
		:data="data?.collection || []"
		:columns="columns"
		:loading="isLoading"
	/>
	<div class="flex justify-end border-t border-default pt-4">
		<UPagination
			v-model:page="params.page"
			:items-per-page="params.pageSize"
			:total="data?.total || 0"
		/>
	</div>
</template>
```

### Key rules

1. **One `params` object** — page, pageSize, sortBy, order, and filters all live together, so any mutation triggers the same refetch path.
2. **Reset `page` to 1** whenever sorting or filters change (the sortable header already does this).
3. **Never paginate client-side on top of a server-paginated query** — the server owns the slicing.

---

## Loading and empty states

Every list table wires the loading state of its data fetch (`isLoading` here — a boolean, however your data layer exposes it) into `UTable` and provides a meaningful empty state:

```vue
<template>
	<UTable
		:data="data?.collection || []"
		:columns="columns"
		:loading="isLoading"
	>
		<template #empty>
			<div class="flex flex-col items-center gap-2 py-8 text-muted">
				<UIcon name="ph:magnifying-glass-minus" class="size-6" />
				<span>{{ t("table.empty") }}</span>
			</div>
		</template>
	</UTable>
</template>
```

### Key rules

1. **Always pass `:loading`** — it renders the built-in progress indicator and re-invokes header functions (which is what keeps sort icons in sync).
2. **Fallback to an empty array** (`data?.collection || []`), never `undefined`, so the empty slot renders instead of a broken table.
3. **Distinguish "no data" from "no results"** — if filters are active, the empty state should say "no results for these filters" and ideally offer a clear-filters action.
4. **Don't blank the table during refetch** — keep the previous page's rows visible while `loading` is true (placeholder/keep-previous-data behavior in your query layer).

---

## Actions column

> Standard shape for the trailing row-actions column. Use `SMoreActions` (Smartness UI layer) — never compose `UButton` + `UDropdownMenu` by hand.

### Pattern

```typescript
const SMoreActions = resolveComponent("SMoreActions");

const getRowActions = (item: Product) => [
	// First action is rendered inline (icon-only quick link).
	{
		icon: "ph:gear",
		to: `/products/${item.id}`
	},
	// The rest collapse into the kebab dropdown.
	{
		label: t("crud.view"),
		icon: "ph:eye",
		to: `/products/${item.id}`
	},
	{
		label: t("crud.edit"),
		icon: "ph:pencil-simple-line",
		onSelect: () => handleEdit(item)
	},
	{
		label: t("crud.remove"),
		icon: "ph:trash",
		color: "error",
		onSelect: () => handleDelete(item)
	}
];

const columns: TableColumn<Product>[] = [
	// …other columns…
	{
		accessorKey: "actions",
		header: "",
		meta: {
			class: {
				td: "w-px",
				th: "w-px"
			}
		},
		cell: ({ row }: { row: Row<Product> }) => h(SMoreActions, {
			actions: getRowActions(row.original),
			buttonProps: { color: "neutral", variant: "ghost", size: "xs" },
			showDropdownIcon: true,
			class: "justify-end"
		})
	}
];
```

Pin the column to the right so it stays visible during horizontal scroll:

```typescript
const columnPinning = ref({ left: [], right: ["actions"] });
```

Pinning a column REQUIRES wiring `useStickyTableColumns` — see [Sticky pinned columns](#sticky-pinned-columns-scroll-shadows).

### Key rules

1. **Use `onSelect`, not `onClick`** — `MoreActionItem` extends Nuxt UI's `DropdownMenuItem`, whose canonical handler is `onSelect`. `SMoreActions` internally maps `onSelect` to `onClick` for inline buttons; you only need to write `onSelect`.
2. **First action becomes the inline button** — with default `maxInline=2`, the component splits actions into `1 inline + kebab dropdown trigger` when there are more than 2 total. Put the most prominent action first.
3. **`showDropdownIcon: true`** — by default `SMoreActions` strips icons from dropdown items to keep the menu label-only. Pass the prop to keep icons (Phosphor preferred: `ph:eye`, `ph:pencil-simple-line`, `ph:trash`).
4. **Don't recompose `UButton` + `UDropdownMenu` manually** — new code uses `SMoreActions`.
5. **`buttonProps`** controls the dropdown trigger button (color/variant/size). Inline action items default to the same set unless overridden per item.
6. **Right-align inside the cell** with `class: "justify-end"` on the `SMoreActions` root (its root is `flex items-center gap-1`, so adding `justify-end` is enough).
7. **Shrink the column to its content** via `meta.class.td/th = "w-px"`. HTML tables collapse `w-px` columns to the intrinsic width of their content (plus existing cell padding). Without this, the actions column stretches to fill leftover horizontal space. Pair with right-pinning so the kebab stays anchored.

---

## Sticky pinned columns (scroll shadows)

> **Standard: every `UTable` with pinned columns MUST call `useStickyTableColumns`** (Smartness UI layer, auto-imported). Without it, the pinned-column shadows from the layer's global table config never toggle — they either never show or show even when there is nothing to scroll.

The composable tracks the table's horizontal scroll state and toggles the `is-scrolled-left` / `is-scrolled-right` / `is-scrolled-x` classes on the scroll container, so the shadow renders only on the side that still has hidden content. Reference example: the Tables showcase in the playground.

### Pattern

```vue
<UTable
	ref="table"
	v-model:column-pinning="columnPinning"
	v-model:column-visibility="columnVisibility"
	:data="data?.collection || []"
	:columns="columns"
	:loading="isLoading"
/>
```

```typescript
const table = useTemplateRef("table");

const columnVisibility = ref<Record<string, boolean>>({});
const columnPinning = ref({ left: [], right: ["actions"] });

useStickyTableColumns(table, data, isLoading, columnVisibility, columnPinning);
```

### Key rules

1. **First argument is the same template ref bound to `<UTable ref="table">`** — the composable resolves the scroll container from the component's `$el`.
2. **Pass every reactive source that can change the table layout** as extra arguments: the data (query result or local array), the loading status, `columnVisibility`, `columnPinning`. The composable re-measures on every change (plus scroll/resize), so shadows stay correct when columns are toggled or a new page renders. Omit sources that don't exist in the component.
3. **No import needed** — it's auto-imported from the smartness-nuxt-ui layer.
4. **One call per table** — a component rendering multiple pinned tables needs a distinct ref and a distinct call for each.
5. **Don't recompose the shadow styling by hand** — the classes are consumed by the layer's global table config; the component only needs the composable call.

---

## Drag-and-drop row reordering

> Pattern for drag-and-drop reorderable tables inside multi-step forms (slideovers).

### Problem

`UTable` (Nuxt UI) uses TanStack Table for rendering. `useSortable` from `@vueuse/integrations` manipulates the DOM directly. These two are incompatible because:

1. TanStack Table owns the DOM rendering — sortable mutations to the DOM get overwritten on re-render
2. After a drag, `row.index` and `row.original` from TanStack are out of sync with the actual array order
3. This causes edit/delete to operate on the wrong items

Additionally, `useSortable` with a CSS selector (`.my-class`) fails when the table is inside a `<USlideover>` or behind a `v-if`/`v-show`, because the DOM element doesn't exist at initialization time.

### Solution

Use a **native HTML table** with `v-for` instead of `UTable`, combined with `useTemplateRef` and lazy initialization.

#### Template

```vue
<div class="border border-(--ui-border) rounded-md overflow-hidden">
	<table class="w-full text-sm">
		<thead>
			<tr class="border-b border-(--ui-border-accented) bg-elevated/50">
				<th class="px-4 py-3 text-left font-medium text-highlighted w-16">Priority</th>
				<!-- other columns -->
			</tr>
		</thead>
		<tbody ref="myTbodyRef">
			<tr
				v-for="(item, index) in items"
				:key="index"
				class="border-b border-(--ui-border) last:border-b-0"
			>
				<td class="px-4 py-3">
					<span class="drag-handle cursor-grab text-muted text-lg">⠿</span>
				</td>
				<!-- other cells using item.property -->
				<td class="px-4 py-3">
					<UButton icon="ph:trash" @click="removeItem(index)" />
				</td>
			</tr>
		</tbody>
	</table>
</div>
```

#### Script

```typescript
import { useSortable } from "@vueuse/integrations/useSortable";

// Standalone ref (NOT nested in a reactive payload) — required for useSortable to work
const items = ref<Item[]>([]);

// Template ref to the tbody element
const myTbodyRef = useTemplateRef<HTMLElement>("myTbodyRef");

// Track sortable instance for cleanup/reinit
let sortableInstance: ReturnType<typeof useSortable> | null = null;

// Called after adding/editing items (when tbody may have just appeared in DOM)
const initSortable = () => {
	nextTick(() => {
		if (myTbodyRef.value) {
			sortableInstance?.stop();
			sortableInstance = useSortable(myTbodyRef, items, {
				animation: 150,
				handle: ".drag-handle"
			});
		}
	});
};

// Call initSortable() after save/add operations
const saveItem = () => {
	items.value.push({ ...newItem });
	initSortable(); // Re-init because tbody might be newly rendered
};

// Use index from v-for (always in sync with array)
const removeItem = (index: number) => {
	items.value.splice(index, 1);
};

// On close, reset the standalone ref
const handleClose = () => {
	items.value = [];
};
```

### Key rules

1. **Standalone `ref`** — `useSortable` needs a direct `Ref<T[]>`, not a nested property of a reactive object (`toRef` doesn't work reliably)
2. **Native HTML table** — don't use `UTable` for reorderable tables; TanStack Table conflicts with DOM manipulation
3. **`useTemplateRef`** — not a CSS selector; the element may not exist at setup time (slideover closed, v-if hidden)
4. **Lazy init via `initSortable()`** — called after save/add with `nextTick()` to ensure the tbody is in the DOM
5. **`handle` option** — restrict drag to the grip icon with `.drag-handle` class
6. **`v-for` index for actions** — always use the loop `index` for edit/delete, never a `row.original` reference (which breaks after drag reorder)
7. **`stop()` before re-init** — clean up the previous sortable instance to avoid duplicates
