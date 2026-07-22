---
title: List filters pattern
description: Standard composition and state pattern for list pages with a search bar, a filter slideover, and an active-filters badge.
category: patterns
tags: [filters, list, table, slideover, select, pagination, state]
---

Every list page with filters follows the same composition, the same state shape, and the same controls. Do not invent per-page variations: a user who learns one filtered list has learned them all.

## Anatomy

A filtered list page is built from three layers, each with a single responsibility:

```
pages/items/index.vue      → Page shell (header, breadcrumbs, page title)
components/ItemList.vue    → List body (filter bar + table + pagination + filter panel)
filter state               → One reactive params object + reset + active-filters counter
```

| Layer | Owns | Must NOT own |
|---|---|---|
| Page shell | Breadcrumbs, title, primary create action, drawers/modals | Filter state, table columns |
| List component | Filter bar, `UTable`, pagination, filter panel | Routing, page chrome |
| Filter state | Reactive params, defaults, reset, active count | Any template concern |

The filter state can live directly in the list component or be extracted to a composable when shared — what matters is the shape, not where it lives.

### Page shell (thin)

The page renders chrome and delegates everything else:

```vue
<template>
	<div>
		<SNavigationBarHeader :title="$t('items.title')">
			<template #actions>
				<UButton icon="ph:plus" :label="$t('actions.create')" color="primary" @click="isCreating = true" />
			</template>
		</SNavigationBarHeader>
		<ItemList />
	</div>
</template>
```

### List component (full content)

Contains, in order: the filter bar (search input, filters button, optional column visibility dropdown), the `UTable`, the pagination row, and the filter panel (`USlideover`). Nothing filter-related leaks up to the page.

## Filter state

All filter params live in **one reactive object**, never in scattered refs. Alongside it, keep a `reset()` function and an **active-filters counter** — a computed that counts how many params differ from their default:

```typescript
const defaults = {
	page: 1,
	perPage: 15,
	order: "desc",
	sortBy: "created_at",
	search: "",
	from: "",
	to: "",
	status: undefined as number | undefined,
	statuses: [] as number[],
	owner_id: undefined as number | undefined
};

const params = reactive({ ...defaults });

// Keys that must never count as "active filters": pagination, sorting, permanent flags
const excludedKeys: (keyof typeof defaults)[] = ["page", "perPage", "order", "sortBy"];

const activeFiltersCount = computed(() =>
	(Object.keys(defaults) as (keyof typeof defaults)[])
		.filter((key) => !excludedKeys.includes(key))
		.filter((key) => JSON.stringify(params[key]) !== JSON.stringify(defaults[key]))
		.length
);

const reset = () => Object.assign(params, defaults);
```

Filters are **live-applied**: controls bind straight to `params` and the data reloads reactively. There is no draft state and no "Apply" button — the slideover shows results changing behind it as the user picks values. Only add a draft/apply step if a single reload is genuinely expensive; if you do, keep `reset()` acting on the applied state.

The badge must only count filters the user actively set — hence the excluded keys. Changing any filter should reset `page` to 1.

### Type rules for `defaults`

TypeScript infers narrow types from object literals (`undefined` stays `undefined`, `[]` becomes `never[]`), which breaks later `v-model` assignments. Widen with an assertion where needed:

| Filter type | Initial value | Assertion | Example |
|---|---|---|---|
| Text search | `""` | none | `search: ""` |
| Date field | `""` | none | `from: ""` |
| Sort field | literal | none | `sortBy: "created_at"` |
| Single select | `undefined` | `as number \| undefined` | `status: undefined as number \| undefined` |
| Multi select | `[]` | `as number[]` | `statuses: [] as number[]` |
| Related id | `undefined` | `as number \| undefined` | `owner_id: undefined as number \| undefined` |
| Nullable filter | `null` | `as T \| null` | `type: null as number \| null` |

Use `undefined` — not `null` — for empty selects: `USelect`/`USelectMenu` v-model expects `T | undefined`.

## Filter bar

The row above the table always contains, left to right: debounced search input, filters button, optional extras (column toggles, export). The filters button carries the active count as a chip:

```vue
<div class="flex items-center gap-2">
	<UInput v-model="search" icon="ph:magnifying-glass" :placeholder="$t('actions.search')" />
	<UChip :show="activeFiltersCount > 0" :text="activeFiltersCount" size="3xl">
		<UButton icon="ph:funnel" :label="$t('filters.title')" color="neutral" variant="outline" @click="isFilterPanelOpen = true" />
	</UChip>
</div>
```

Rules:

- The chip is **hidden at zero**, never showing "0".
- The count reflects distinct filters set, not selected values (a multi select with 3 statuses counts as 1).
- When `activeFiltersCount > 0` and the result set is empty, the table empty state must say the filters produced no results and offer a reset action — not a generic "no data" message:

```vue
<template #empty>
	<div class="flex flex-col items-center gap-3 py-12">
		<UIcon name="ph:magnifying-glass-minus" class="size-8 text-dimmed" />
		<p class="text-muted">{{ activeFiltersCount > 0 ? $t("filters.noResults") : $t("items.empty") }}</p>
		<UButton v-if="activeFiltersCount > 0" variant="link" :label="$t('filters.reset')" @click="reset()" />
	</div>
</template>
```

## Filter panel

The panel is a `USlideover` opening from the right. It stacks one `SFormField` per filter, a `USeparator` between primary and advanced filters, and a footer with the reset action:

```vue
<USlideover v-model:open="isFilterPanelOpen" :title="$t('filters.title')">
	<template #body>
		<div class="flex flex-col gap-4">
			<!-- primary filters -->
			<USeparator :label="$t('filters.other')" />
			<!-- advanced filters -->
		</div>
	</template>
	<template #footer>
		<UButton variant="ghost" color="neutral" :label="$t('filters.reset')" :disabled="activeFiltersCount === 0" @click="reset()" />
	</template>
</USlideover>
```

The slideover is inherently the mobile behavior too — do not build a separate mobile filter UI. On mobile the search input may collapse to an icon button, but the panel stays the same.

## Filter controls

### Options are computed refs

Option lists derived from a lookup function or translations must be wrapped in `computed` — never called inline in `:items` — so they react to locale changes and are not re-evaluated on every render:

```typescript
// ✅ GOOD
const statusOptions = computed(() => [
	{ value: 1, text: t("status.active") },
	{ value: 2, text: t("status.archived") }
]);

// ❌ BAD — :items="getOptions('statuses')" directly in template
```

### Single select

Use `USelectMenu` with `clear` and `:search-input="false"`:

```vue
<SFormField :label="$t('filters.status')">
	<USelectMenu
		v-model="params.status"
		:search-input="false"
		clear
		:items="statusOptions"
		value-key="value"
		label-key="text"
		:placeholder="$t('actions.select')"
	/>
</SFormField>
```

Why `USelectMenu` over `USelect`: it supports `clear`, giving every filter its own × to reset individually. Why `:search-input="false"`: filter option sets are small (statuses, orders); the search box is clutter.

### Multi select

Same control plus `multiple` and `virtualize`:

```vue
<SFormField :label="$t('filters.statuses')">
	<USelectMenu
		v-model="params.statuses"
		:search-input="false"
		clear
		:items="statusOptions"
		value-key="value"
		label-key="text"
		multiple
		virtualize
		:placeholder="$t('filters.statuses')"
	/>
</SFormField>
```

### Select backed by fetched data

For filters on a related entity (users, categories, sources), feed `USelectMenu` from an async query and keep the search input enabled — these lists are long:

```vue
<SFormField :label="$t('filters.owner')">
	<USelectMenu
		v-model="params.owner_id"
		:items="users ?? []"
		value-key="id"
		label-key="name"
		virtualize
		:placeholder="$t('filters.owner')"
	/>
</SFormField>
```

Cache the lookup request in your data layer — it is shared by every list that filters on the same entity.

### Date range

Two params (`from`, `to`) bound to one range picker:

```vue
<SFormField :label="$t('filters.date')">
	<SDatePicker
		v-model:start="params.from"
		v-model:end="params.to"
		range
	/>
</SFormField>
```

### Sort field and order

Sorting lives in the same `params` object (`sortBy`, `order`) but is usually driven by table column headers. If exposed in the panel, use two clearable `USelectMenu` controls with inline option arrays:

```typescript
const orderOptions = computed(() => [
	{ value: "asc", text: t("sort.ascending") },
	{ value: "desc", text: t("sort.descending") }
]);
```

## Reset behavior

- `reset()` restores **every** param to its default, including sort and page — one call, no partial resets.
- Individual filters reset via their own `clear` button on the control.
- The reset button appears in two places only: the panel footer and the filtered empty state.
- Reset must not close the panel; the user often resets to start a new combination.

## Checklist for a new filtered list

1. Define `defaults` with the type rules above; exclude pagination/sort/flags from the count.
2. Build the filter bar: debounced search, `UChip`-badged filters button.
3. Build the panel: `SFormField` + `USelectMenu` per filter, `USeparator` before advanced filters, reset in the footer.
4. Wire the filtered empty state with a reset action.
5. Verify: badge hidden at zero, every select individually clearable, `page` resets to 1 on any filter change.
