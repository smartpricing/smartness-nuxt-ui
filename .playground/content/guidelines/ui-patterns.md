---
title: UI patterns
description: Cross-project UI patterns and best practices for Smartness frontend apps — page layouts, lists, overlays, forms, confirmations, and state conventions.
category: patterns
tags: [patterns, layout, lists, tables, overlays, slideover, modal, forms, validation, confirmation, loading, pagination, filters, accessibility]
---

# UI patterns

Common UI patterns, component structures, and conventions for Smartness frontend applications built on Nuxt UI and the Smartness UI layer. These rules are prescriptive: follow them unless a feature has a documented reason to deviate.

## Page anatomy

Every page is composed of three layers, each a thin shell over the next:

```
SNavigationPage (owns the scroll model)
  |-- #header: SNavigationBarBreadcrumb + SNavigationBarHeader (title + #actions slot)
  |-- default slot (page body)
        |-- Feature component (list, detail, dashboard…)
```

**Key rules:**

- The page file is a **thin shell** — routing concerns only (breadcrumbs, title, head, the create handler). All feature logic lives in a dedicated feature component.
- Action buttons go in the header's **`#actions` slot**, not an `actions` prop — slots keep the buttons in the template where handlers and translations live.
- The primary page action (usually "Create") is a solid `primary` button with a `ph:plus` icon, placed in the header actions slot.
- Set the document title with `useHead({ title: () => t("feature.title") })` so it stays locale-reactive.
- Overlays (forms, modals) are **never rendered in the page template** — they are mounted programmatically. See [Overlays](#overlays-useoverlay).

```vue
<template>
	<SNavigationPage>
		<template #header>
			<SNavigationBarBreadcrumb :items="breadcrumbs" />
			<SNavigationBarHeader :title="$t('customers.title')">
				<template #actions>
					<UButton
						icon="ph:plus"
						:label="$t('main.crud.create')"
						color="primary"
						@click="handleCreate"
					/>
				</template>
			</SNavigationBarHeader>
		</template>

		<CustomersList />
	</SNavigationPage>
</template>

<script lang="ts" setup>
	import { LazyCustomersCreationForm } from "#components";

	const { t } = useI18n();
	const overlay = useOverlay();

	const breadcrumbs = computed(() => [
		{ label: t("main.words.home"), to: "/" },
		{ label: t("customers.title") }
	]);

	const handleCreate = () => {
		overlay.create(LazyCustomersCreationForm, { destroyOnClose: true }).open();
	};

	useHead({ title: () => t("customers.title") });
</script>
```

The page body should default to `min-h-full` (overflowing content keeps its bottom padding). Pin it to the viewport (`h-full`) only on pages that scroll internally — calendars, boards, full-height panels.

---

## List pages

All list pages follow the same layout:

```
Page header (breadcrumbs + title + create button)
  |
Page body
  |-- flex wrapper (flex-1 overflow-hidden)
  |     |-- content area (flex-1 min-w-0)
  |     |     |-- options toolbar (refresh | import/export)
  |     |     |-- filter bar card (search + filter toggle + column visibility)
  |     |     |-- table card (UTable + pagination)
  |     |-- filter side panel (all filter controls)
```

**Key rules:**

- The list component uses a `flex flex-1 overflow-hidden` wrapper so the filter side panel can slide in beside the content. The content area needs `min-w-0` so the table can shrink instead of forcing horizontal page scroll.
- Filters live in a **sliding side panel**, not an inline collapsible under the toolbar.
- The filter toggle button shows an **active-filter count badge** when filters are applied.
- The refresh button is a `soft` `info` icon button bound to the query's loading state.
- Secondary toolbar actions (export, import, print) use `variant="outline"`.

```vue
<template>
	<div class="flex flex-1 overflow-hidden">
		<div class="flex-1 min-w-0">
			<div class="flex items-center justify-between gap-3 p-4">
				<div class="flex items-center gap-3 flex-1">
					<UInput v-model="search" icon="ph:magnifying-glass" :placeholder="$t('main.crud.search')" />
					<UButton
						icon="ph:funnel-simple"
						:label="$t('main.words.filters')"
						variant="outline"
						@click="isOpenFilters = !isOpenFilters"
					>
						<template v-if="activeFiltersCount > 0" #trailing>
							<UBadge :label="activeFiltersCount" variant="solid" color="secondary" size="sm" class="rounded-full" />
						</template>
					</UButton>
				</div>

				<UDropdownMenu :items="columnsDropdownItems">
					<UButton trailing-icon="ph:caret-down" :label="$t('main.words.columns')" color="neutral" variant="outline" />
				</UDropdownMenu>
			</div>

			<UCard>
				<UTable
					ref="table"
					v-model:column-pinning="columnPinning"
					v-model:column-visibility="columnVisibility"
					:data="items?.collection || []"
					:columns="columns"
					:loading="isLoading"
				/>
				<UPagination v-model:page="params.page" :items-per-page="params.perPage" :total="items?.pagination?.total || 0" />
			</UCard>
		</div>

		<!-- Filter panel: a USlideover stacking one SFormField per filter,
		     with the reset action in its footer — see the List filters pattern guideline -->
		<USlideover v-model:open="isOpenFilters" :title="$t('main.words.filters')">
			<template #body>
				<div class="space-y-4">
					<SFormField :label="$t('main.words.date')">
						<SDatePicker v-model:date="params.from" class="w-full" />
					</SFormField>
					<USeparator />
					<!-- more filter groups -->
				</div>
			</template>
			<template #footer>
				<UButton variant="ghost" color="neutral" :label="$t('main.crud.reset')" :disabled="activeFiltersCount === 0" @click="reset()" />
			</template>
		</USlideover>
	</div>
</template>
```

### Filter panel conventions

- Every filter control is wrapped in an `SFormField` with a translated label; groups are spaced with `space-y-4` and separated with `USeparator`.
- Use **`USelectMenu`** (not `USelect`) for filter selects — it supports the `clear` prop.
- Always add `clear` (each filter is individually clearable via ×) and `:search-input="false"` for small option sets — search inside a five-item dropdown is clutter.
- The panel exposes a global **Reset** that clears all filters at once; `clear` handles one at a time.
- Option arrays derived from helpers or stores must be wrapped in a `computed`, never called inline in the template:

```ts
const statusOptions = computed(() => getStatusOptions());
```

### Search

Search is debounced (~500 ms) at the state layer — the input binds to a debounced ref (`refDebounced` from VueUse) synced into `params.search`, not debounced ad hoc in the component.

---

## Dual view mode (table + grid)

When a list must expose **both** a tabular and a card/grid visualization, split it into a wrapper plus one component per view. This is **opt-in** — use the single-file list when only the table exists.

```
Feature/List.vue    → wrapper: view switcher + search + filter toggle + filter panel
Feature/Table.vue   → table view (UTable + columns + pagination)
Feature/Grid.vue    → grid view (card grid + skeleton/empty states + pagination)
Feature/Card.vue    → single card used by Grid.vue
```

**Key rules:**

- Both views read the **same shared list state directly** (`params`, the collection, the loading flag) — not through props. Switching views must not re-fetch and must preserve page, filters, and search.
- The view switcher is a `UTabs` with `:content="false"` — triggers stay inline in the toolbar; content renders below via `v-if`.
- Persist the chosen view mode (cookie or storage) so it is shared across all list pages and survives reload.
- Search and the filter panel live in the **wrapper** — they drive shared query state.
- The columns dropdown lives in the wrapper toolbar but its items array is **built inside the table component** and exposed via `defineExpose({ columnsDropdownItems })`. The wrapper never touches the table API. Gate the dropdown with `v-if="view === 'list'"`.
- **No shared pagination in the wrapper.** Each view owns its pagination: the table renders it in the card `#footer`; the grid renders it as a sibling below its scroll region. Both anchor pagination in the viewport while rows/cards scroll internally.
- Render order in the grid matters — cards, then loading skeletons, then the empty state — so that keeping previous data during a refetch shows the old cards instead of flashing skeletons:

```vue
<UPageGrid v-if="items?.collection?.length">
	<FeatureCard v-for="item in items.collection" :key="item.id" :item="item" />
</UPageGrid>

<UPageGrid v-else-if="isLoading">
	<USkeleton v-for="i in 8" :key="i" class="h-48 rounded-lg" />
</UPageGrid>

<div v-else class="text-center py-12">
	<UIcon name="ph:magnifying-glass-minus" class="size-12 text-dimmed mb-4" />
	<p class="text-muted">{{ $t("main.words.no_results") }}</p>
</div>
```

---

## Bounded table height

Tall tables should keep their header visible and scroll only the body, while short tables stay content-sized. Use the layer's `useTableHeight` composable with `UTable`'s `sticky` prop:

```vue
<template>
	<div ref="wrapper">
		<UCard class="bg-default overflow-hidden" :ui="{ body: 'p-0', footer: 'p-0' }">
			<UTable
				ref="table"
				sticky
				:style="{ maxHeight }"
				:data="items?.collection || []"
				:columns="columns"
				:loading="isLoading"
			/>

			<template #footer>
				<UPagination
					v-model:page="params.page"
					:items-per-page="params.perPage"
					:total="items?.pagination?.total || 0"
					@update:page="y = 0"
				/>
			</template>
		</UCard>
	</div>
</template>

<script lang="ts" setup>
	const table = useTemplateRef("table");
	const wrapper = useTemplateRef("wrapper");
	const { maxHeight } = useTableHeight(wrapper);
	const { y } = useScroll(() => table.value?.$el, { behavior: "smooth" });
</script>
```

**Key rules:**

- `useTableHeight(target, { bottomOffset, minHeight })` returns a `maxHeight` computed you bind via `:style` — it adapts to whatever chrome sits above the table (navbar, header, toolbar), so no hard-coded per-page offsets.
- `UTable sticky` + `:style="{ maxHeight }"` is the core: thead sticks, tbody scrolls when content exceeds the computed height.
- Pagination lives in the card `#footer` with `footer: "p-0"` so borders and padding are not doubled; `body: "p-0"` lets the table render edge-to-edge.
- **Scroll to top on page change**: bind `useScroll` to the table's exposed `$el` and set `y = 0` in `@update:page`. Event-driven — no watcher.
- The pattern is **opt-in**: use it where the content region can grow tall; skip it when the collection is guaranteed short.
- In dual view mode, use the same defaults in both views so switching does not shift the layout, and put the grid's scroll region (`overflow-auto` + `maxHeight`) around **only** the cards and their loading/empty states, with pagination outside it.

---

## Tables

### Column definitions

Columns are a typed array using `h()` render functions for cells:

```ts
const columns: TableColumn<Customer>[] = [
	{
		accessorKey: "name",
		header: () => t("customers.fields.name"),
		cell: ({ row }: { row: Row<Customer> }) => {
			return h(NuxtLink, {
				to: `/customers/${row.original.id}`,
				class: "flex items-center max-w-56 gap-3 group"
			}, {
				default: () => [
					h(UAvatar, { alt: row.getValue("name"), size: "sm" }),
					h("span", { class: "font-medium truncate group-hover:underline" }, row.original.name.trim())
				]
			});
		}
	}
];
```

**Conventions:**

- `accessorKey` maps to the data field; `header()` returns a translated string (a function, so it stays locale-reactive).
- Use `row.original` for the full typed row, `row.getValue("key")` for the column value.
- Empty values display `"-"` as fallback — never a blank cell.
- Components used inside `h()` must be resolved at script top level: `const UBadge = resolveComponent("UBadge");`.

### Column visibility

Offer a "Columns" dropdown that toggles visibility. Keep a type-safe map of column IDs to translation keys, build the dropdown items as a `computed` inside the component that owns the table, and expose **only that array** — never leak the table API:

```ts
const columnsDropdownItems = computed(() => {
	const api = table.value?.tableApi;
	if (!api) return [];
	return api.getAllColumns()
		.filter((c) => c.getCanHide() && c.id in columnTranslationMap)
		.map((c) => ({
			label: t(columnTranslationMap[c.id as keyof typeof columnTranslationMap]),
			type: "checkbox" as const,
			checked: c.getIsVisible(),
			onUpdateChecked(checked: boolean) {
				api.getColumn(c.id)?.toggleVisibility(!!checked);
			},
			onSelect(e: Event) {
				e.preventDefault(); // keep the menu open after toggling
			}
		}));
});
```

### Column pinning

The actions column is always pinned right:

```ts
const columnPinning = ref({ left: [], right: ["actions"] });
```

### Common cell patterns

**Status badge** — map statuses to a color, render as a soft `UBadge`:

```ts
const getStatusColor = (status: number) => ({
	1: "neutral", 2: "info", 3: "success", 4: "error", 5: "warning"
}[status] ?? "neutral");

cell: ({ row }) => h(UBadge, {
	label: getStatusLabel(row.original.status),
	color: getStatusColor(row.original.status),
	variant: "soft"
})
```

**Date period with a count** — nest a small soft badge inside an outline badge:

```ts
cell: ({ row }) => {
	const start = new Date(row.original.start_date);
	const end = new Date(row.original.end_date);

	return h(UBadge, { color: "neutral", variant: "outline", size: "lg" }, {
		default: () => [
			h(UBadge, { color: "primary", variant: "soft", size: "sm", icon: "i-ph-moon", label: String(nights) }),
			h("span", { class: "text-xs" }, `${formatDate(start)} → ${formatDate(end)}`)
		]
	});
}
```

**Money** — always through a shared `formatMoney(value, currency, locale)` utility. Do not add `tabular-nums`.

### Row actions

The trailing actions column uses the layer's `SMoreActions` — the first action renders inline, the rest collapse into the kebab menu. **Never** compose `UButton` + `UDropdownMenu` by hand for row actions.

```ts
const getRowActions = (customer: Customer) => [
	{ label: t("main.crud.view"), icon: "ph:eye", to: `/customers/${customer.id}` },
	{ label: t("main.crud.edit"), icon: "ph:pencil-simple-line", onSelect: () => handleEdit(customer) },
	{ label: t("main.crud.remove"), icon: "ph:trash", color: "error", onSelect: () => handleDelete(customer) }
];
```

- Handlers are `onSelect`, **not** `onClick`.
- Edit opens an overlay with the record's **id** as a prop — see [Editing forms](#editing-forms).
- Destructive actions always go through the confirmation modal — see [Confirmation flows](#confirmation-flows).

---

## Pagination

Two shapes cover the two kinds of API:

| Kind | Use | Displays |
|---|---|---|
| Offset-based | APIs that return a total count | "Showing 1 to 15 of 120 results" + `UPagination` page buttons |
| Cursor-based | APIs without a total count | "Showing 1 - 15" + prev/next buttons |

```vue
<!-- Offset-based -->
<UPagination v-model:page="params.page" :items-per-page="params.perPage" :total="items?.pagination?.total || 0" />

<!-- Cursor-based: two outline buttons bound to prev/next cursors, disabled at the edges -->
```

Wrap each shape in one shared project component (range label + controls) so every list renders pagination identically. Pagination binds `v-model:page` directly to the shared `params` object so page changes drive the fetch.

---

## Overlays (`useOverlay`)

Slideovers and modals are mounted **programmatically** with Nuxt UI's `useOverlay()`. The composable is shared app-wide — the component is mounted by the `OverlayProvider` inside `<UApp>`, never in a page template.

What this buys you:

- **Cross-component coordination** — one shared manager, and `overlay.closeAll()` gives "one overlay at a time" with no shared refs.
- **Open with data, from anywhere** — edit a row straight from a table without navigating to a detail route.
- **No `isXxxOpen` refs** — no `v-model:open` ref, no template render, no `v-if` gate.
- **A result per open** — `await open()` resolves with whatever the component passed to `emit("close", value)`.

**Consumer side:**

```ts
import { LazyCustomersEditingForm } from "#components";
const overlay = useOverlay();

overlay.closeAll(); // one-at-a-time (global, cross-component)
const result = await overlay.create(LazyCustomersEditingForm, {
	props: { entityId },
	destroyOnClose: true // fresh mount each open — see gotcha below
}).open();
if (result?.saved) { /* if your data layer already refreshes the list on save, nothing to do */ }
```

**Hard rules for overlay-mounted components:**

- **No `:open` prop, no template render.** The manager owns the open state; pass data as **props** at `open()` time. Overlays mount outside the page tree, so `provide`/`inject` from the page does **not** reach them — props only. (Single exception: confirm-on-close, below.)
- **One `close` event carries the result.** `emit("close", value)` resolves the `open()` promise. Convention: success → `{ saved: true }` / `true`; plain dismiss → `emit("close")`. Keep `handleClose()` argument-free so it binds to both the cancel button and the header close; put the dismiss-only-on-`false` logic in a named `handleOpenChange(value)` bound to `@update:open` — no inline conditionals in the template.
- **`create()` per open + `destroyOnClose: true`.** Call `overlay.create()` inside the handler each time, not once in setup. This guarantees a fresh mount so `@after:enter` / `onMounted` re-run with the new props. Re-`open()`-ing a cached instance can skip the enter transition, so `@after:enter` never re-fires and the form opens stale or empty.
- **Reset shared state on close (`@after:leave`)** — it fires on every close path (emit, `closeAll`, esc, outside-click) and before unmount even with `destroyOnClose`. `@after:enter` should only **seed**. The one exception: if two instances can overlap (a non-modal overlay, or a `closeAll()` + `open()` "switch" in one tick), the old instance's `@after:leave` fires late and clobbers the new one's state — in that case move resets to the **start of `@after:enter`**.
- **No manual refetch after close** when your data layer already refreshes the affected data on save — refresh in one place, not two.
- **Nested overlays** are opened with `useOverlay()` too, from the handler that needs them. They stack naturally; do not call `closeAll()` when opening a child of an overlay that must stay open behind it.
- **A helper composable may wrap the open call** when the same overlay is opened from many places with the same shape — it must still `create()` per open with `destroyOnClose`.

**What is NOT overlay-mounted:** components whose content the caller supplies through a `<slot>` (the provider cannot forward slots), and trigger + panel pairs that own their open state locally. The filter side panel is the canonical example — it takes its fields as slot content, so it keeps `v-model:open` in the list template.

### Lazy-loaded overlays

Overlay forms are heavy (schema, pickers, sometimes a stepper) but not needed on first paint. Pass the auto-imported `Lazy*` component reference to `overlay.create()` so each form becomes its own chunk, fetched on first open:

```ts
import { LazyCustomersCreationForm, LazyCustomersEditingForm } from "#components";

const handleEdit = (customer: Customer) => {
	overlay.create(LazyCustomersEditingForm, { props: { entityId: customer.id }, destroyOnClose: true }).open();
};
```

- Lazy-load every creation/editing form, every on-demand modal or slideover (quick-view, bulk-edit, settings drawers), and multi-step wizards with their sub-forms.
- Do **not** lazy-load above-the-fold content (page header, list, table) — only deferred overlays.

---

## Slideover forms — canonical anatomy

Every slideover-based form or panel follows this exact skeleton — creation forms, editing forms, wizards, settings drawers, view panels:

```vue
<template>
	<USlideover
		:title="formTitle"
		:ui="{ header: 'p-0 sm:p-0' }"
		@update:open="handleOpenChange"
		@after:enter="handleAfterEnter"
		@after:leave="handleAfterLeave"
	>
		<template #header>
			<!-- Custom header component (optional) — see "Custom form headers and a11y" -->
		</template>

		<template #body>
			<!-- 1. The form, when one is needed -->
			<UForm id="feature-form" :schema :state="payload" @submit="handleSubmit" @error="handleFormError">
				<!-- SFormField-wrapped fields -->
			</UForm>

			<!-- 2. Non-form helpers go AFTER the form, still in #body -->
		</template>

		<template #footer>
			<!-- 3. Submit lives in the footer, OUTSIDE the form, linked by id -->
			<UButton variant="outline" color="neutral" @click="handleClose">{{ $t("main.crud.cancel") }}</UButton>
			<UButton form="feature-form" type="submit" :loading="isSaving">
				{{ $t("main.crud.save") }}
			</UButton>
		</template>
	</USlideover>
</template>

<script lang="ts" setup>
	// Data arrives as props at open() time — there is no `open` prop
	const props = defineProps<{ entityId: number }>();
	// ONE `close` event; its value resolves the caller's open() promise
	const emit = defineEmits<{ close: [saved?: boolean] }>();

	const handleClose = () => emit("close");
	const handleOpenChange = (value: boolean) => { if (!value) handleClose(); };
	const handleAfterEnter = () => { /* seed payload */ };
	const handleAfterLeave = () => { /* reset payload and any shared state */ };
	const handleSubmit = async () => { await save(); emit("close", true); };
</script>
```

**Hard rules — all slideovers must obey these:**

- **`USlideover` is the root element.** No `<Teleport to="body">`, no `<ClientOnly>`, no outer `<UForm>` wrapping the slideover. It portals itself internally and renders nothing when closed — manual wrappers are redundant and cause SSR hydration mismatches.
- **No `open` prop, no `:open` binding.** The overlay manager owns the open state; the component only ever *requests* close. (Exception: confirm-on-close, below.)
- **Never set `side`.** Right is the default — omit it.
- **`UForm` lives inside `#body`.** The `<form>` element is scoped to the body, not the whole slideover.
- **The submit button lives in `#footer`, outside the form**, wired with `form="feature-form"` + `type="submit"`. Back/Next/Cancel buttons use `@click`, not `type="submit"`.
- **Don't restate defaults on the submit button.** No `color="primary"`, no `variant="solid"` — those are the defaults.
- **Add `@after:enter` / `@after:leave`** whenever the overlay seeds or resets state.
- **Custom body layouts** (grids, split panes) are styled via the `UForm` class and the slideover's `:ui.body` slot — not by restructuring the skeleton:

```vue
<USlideover :ui="{ body: 'grid grid-cols-1 lg:grid-cols-7 divide-x divide-default p-0 sm:p-0' }">
```

### Custom form headers and a11y

When a slideover or modal renders a custom header component in `#header` (title + description + badges + actions + close button — define one shared header component per project), the hosting `USlideover`/`UModal` **must still receive the same `title` (and `description`) as props**:

```vue
<USlideover :title="formTitle" :description="entity?.name">
	<template #header>
		<!-- shared custom header component -->
		<FormHeader :title="formTitle" :description="entity?.name" @close="handleClose" />
	</template>
</USlideover>
```

Why: when `#header` is overridden and no `title` prop is set, Nuxt UI renders a hidden **empty** `DialogTitle` filler — `aria-labelledby` then points at the empty one and screen readers announce nothing. Passing the prop suppresses the filler. For composed titles, put the string in a `formTitle` **computed** (locale-reactive, single source for both bindings); for single-key titles inline the same `$t("…")` twice.

Other header rules:

- With a custom header, set `header: "p-0 sm:p-0"` in the overlay `:ui` so the header manages its own padding (needed when it renders a full-width second row, e.g. mobile section navigation or a stepper progress).
- Title and description must `truncate` (with `min-w-0` on the text column) so long values cannot grow the header.
- The header close button emits a close **request** — bind it to the same handler as `@update:open` so esc, outside-click, and X all route through one path.
- Header badges: entity metadata (status, name) under the title; technical ids (e.g. `ID: 42`) as neutral debug badges, visible to all users so they can relay them to support.
- Scope: header only. Footers stay per-form — Close/Save vs Back/Next/Submit diverge legitimately.

### Gating close with a confirm (unsaved changes)

An overlay-mounted form that must ask before discarding unsaved changes cannot gate the close from `@update:open` alone — it is a plain emit, not a cancelable event, and an async confirm resolves *after* the slideover has already gone. The provider's `v-model:open` falls through to the root `USlideover` when no `open` prop is declared, so the X closes it immediately.

**Fix — own the open state with `defineModel("open")`.** Declaring the model stops the fall-through; bind `:open` explicitly and do not lower it until the user confirms:

```vue
<template>
	<USlideover :open="open" @update:open="handleRequestClose">…</USlideover>
</template>

<script lang="ts" setup>
	const open = defineModel<boolean>("open", { default: false }); // intercepts the provider's v-model:open
	const emit = defineEmits<{ close: [saved?: boolean] }>();

	const handleClose = () => emit("close");
	const handleRequestClose = async () => {
		if (!isModified.value) { handleClose(); return; } // nothing to lose → close now
		await confirm({
			title: t("main.labels.unsaved_changes"),
			message: t("main.labels.lose_changes_without_saving"),
			destructive: true,
			action: () => handleClose() // confirmed → close; cancelled → no-op, stays open
		});
	};
</script>
```

- **Don't write `open` yourself on cancel.** Closing happens through `emit("close")` → the provider lowers its state → it propagates back into your model. On cancel you do nothing, so the slideover stays put.
- Add `:dismissible="false"` only to make esc / outside-click fully inert; otherwise they route through the same confirm (usually desirable).

---

## Forms

### Schema validation with translatable errors

Each feature defines **two Zod schemas**: strict for creation, lenient for editing.

**Error messages are i18n keys, not literal text.** Schemas stay plain (no `useI18n` inside them); the key is translated at display time by `SFormField` (the layer's `UFormField` wrapper), which guards with `te(msg) ? t(msg) : msg` — unknown keys pass through unchanged, so backend messages still render.

```ts
import { z } from "zod";

// Editing schema — relaxed validation
export const customerSchema = z.object({
	company_id: z.number({ error: "zod-errors.value_invalid" }).optional(),
	name: z.string().min(1, "zod-errors.name_required"),
	email: z.email("zod-errors.invalid_email").optional().or(z.literal("")).nullable(),
	rating: z.number({ error: "zod-errors.value_invalid" }).min(0, "zod-errors.value_min_zero").max(5, "zod-errors.value_out_of_range").default(0)
});

// Creation schema — strict validation
export const newCustomerSchema = z.object({
	type: z.number({ error: "zod-errors.type_required" }),
	first_name: z.string().min(1, "zod-errors.first_name_required"),
	email: z.email("zod-errors.invalid_email").min(1, "zod-errors.email_required")
});
```

**Rules — cover every throwable error, no bare checks:**

- A check with no message falls back to Zod's hard-coded English — **annotate every check** that can throw: `.min`, `.max`, `.email`, `.positive`, `.refine`, and the constructor itself.
- **Required-number edge case:** an empty numeric field is `undefined`, so the error is `invalid_type` from `z.number()`, not `too_small` from `.min(1)`. Put the key on the constructor too. Rule: attach the message to the check that fires for the field's real empty value (`undefined` → constructor; `0`/`""`/`[]` → `.min()`).
- Prefer **reusable constraint keys** for generic bounds (`value_invalid`, `required`, `value_min_zero`, `value_positive`, `value_out_of_range`); field-specific `*_required` keys where precise wording matters.
- Useful shapes: `.optional().nullable()` (absent, empty or null), `.optional().or(z.literal(""))` (allows empty string), `z.union([z.literal(0), z.literal(1)])` (boolean as 0/1 integers).

### Creation forms

Follow the slideover anatomy. The `UForm` is wired like this:

```vue
<UForm
	id="customer-creation-form"
	:schema="newCustomerSchema"
	:state="payload"
	:validate-on="['blur', 'change']"
	@submit="handleSubmit"
	@error="handleFormError"
>
```

- `id` links the form to the submit button in the footer via `form="customer-creation-form"`.
- `@error` shows an error toast through a shared handler — never fail silently.
- Multi-section **creation** forms use a stepper, not an accordion.
- Mark every schema-required field with the `required` prop so the asterisk shows.
- **Multi-field controls** (e.g. a date range driving two schema fields): wrap in ONE form field and use `error-pattern` (a regex matched against error names) to surface both errors under it:

```vue
<SFormField label="Check-in - Check-out" required :error-pattern="/^(start_date|end_date)$/">
	<SDatePicker v-model:start="payload.start_date" v-model:end="payload.end_date" range />
</SFormField>
```

Submit handler:

```ts
const handleSubmit = async () => {
	// Wire to your create call; emit only on success
	await createCustomer(payload.value);
	emit("close", true);
};
```

### Editing forms

Same skeleton as creation, with four differences:

1. **The caller passes the id, not the record.** The form takes an `entityId` prop and fetches the entity itself, rendering `USkeleton` placeholders while it loads. This keeps the row data and the form payload from drifting.
2. **Reset on `@after:leave`** — clear the payload and any shared state.
3. **Uses the lenient edit schema** instead of the strict creation schema.
4. **Confirm before save**, and confirm before discarding unsaved changes:

```ts
const confirmUpdate = async () => {
	await confirm({
		title: t("customers.title_update"),
		message: t("main.crud.confirm"),
		action: async () => {
			await updateCustomer(props.entityId, payload.value);
			emit("close", true);
		}
	});
};
```

Multi-section **editing** forms use tabbed/section navigation (desktop side menu + mobile hamburger), not a stepper.

### Boolean conversion (switch fields)

When the backend uses `0`/`1` integers, bridge with a writable computed:

```ts
const newsletterChecked = computed({
	get: () => !!payload.value.newsletter,
	set: (val) => { payload.value.newsletter = val ? 1 : 0; }
});
```

### Numeric and money fields

Pick the input by **what the value is**, not by what is convenient:

| Value | Component | Notes |
|---|---|---|
| Currency amount (price, fee, cost, deposit, tax) | Money input (one shared project component) | Renders the currency symbol + decimal formatting. Bind plain `v-model` (not `.number`); pass `:min` bound (`:min="0"`, never `min="0"`). |
| Simple integer count (quantity, guests, days, ages) | `UInputNumber` | Has +/- steppers, `step=1` by default — don't specify it. Keep `:min`/`:max`. |
| Pure percentage (VAT, deposit %) | `UInputNumber` | Add `:format-options="{ style: 'unit', unit: 'percent', maximumFractionDigits: 2 }"` for the inline `%`. Use `style: "unit"`, **not** `"percent"` — the latter multiplies by 100. |
| Read-only money/number | `formatMoney()` | Text only. Do not add `tabular-nums`. |

- `UInputNumber` has no `#trailing` slot (it owns that area for steppers) — the percent unit must come from `:format-options`, never a manual suffix, and the inline `%` **replaces** any `:hint="'%'"`. Keep `:hint` only for non-monetary units `format-options` cannot express (`nights`, `days`, `years`).
- When an amount-or-percent choice lives in a **separate** field (a calculation method select), render the input by the currently selected type instead of labelling a single input with a hint:

```vue
<SFormField :label="$t('feature.fields.amount')" name="amount" required>
	<UInputNumber
		v-if="isPercentageMethod"
		v-model="payload.amount"
		:format-options="{ style: 'unit', unit: 'percent', maximumFractionDigits: 2 }"
		class="w-full"
	/>
	<MoneyInput v-else v-model="payload.amount" />
</SFormField>
```

### Dependent selects (cascades)

When selects depend on each other (country → province → city), wrap each level in its own picker component: the downstream picker takes the upstream value as a prop and re-fetches its options when it changes. Illustrative shape:

```vue
<CountryPicker v-model="payload.country" :label="$t('main.address.country')" />
<ProvincePicker v-model="payload.state" :country-iso2="payload.country" />
<CityPicker v-model="payload.city" :country-iso2="payload.country" />
```

---

## Confirmation flows

Use the shared `useConfirm()` composable and its confirm modal for **every destructive action and every save confirmation** — never hand-roll a `UModal` for this.

```ts
const { confirm } = useConfirm();

const handleDelete = async (customer: Customer) => {
	await confirm({
		title: t("customers.title_delete"),
		message: t("main.crud.confirm_delete"),
		destructive: true,
		action: () => deleteCustomer(customer.id)
	});
};
```

- `action` runs on confirm and may return a promise — the modal waits for it before closing.
- `destructive: true` styles the confirm button as a danger action — set it for deletes and discard-changes prompts.
- The full delete flow: row action → `confirm()` → delete call → list refresh handled by the data layer. No manual refetch.

---

## Toasts and error feedback

- Every `UForm` binds `@error` to a shared handler that translates validation keys and shows an **error toast** — validation failures are never silent.
- Save/delete calls surface their errors as toasts through the data layer; the UI does not duplicate that with inline banners.
- Success feedback after create/update/delete is a toast, not a page banner. Keep messages short and translated.

---

## Loading, empty, and error states

| Context | Pattern |
|---|---|
| Table | `<UTable :loading="isLoading" />` — no external loader + `v-if` guard |
| Buttons | `<UButton :loading="isLoading" />` on the button that triggered the work |
| Overlay form fetching its entity | `USkeleton` placeholders while the entity's **first load** is pending |
| Grid view | A grid of `USkeleton` cards matching the card size |
| Full overlay | A loader shown with `v-show` while saving |

- Distinguish the two states: **"is fetching"** (true on every fetch, including refetches — drives spinners over existing content) vs **"first load pending"** (no data yet — drives skeletons). Expose both from your data layer.
- Keep previous data during refetches (placeholder data) so paginating does not flash empty states.
- **Empty states** are centered, with a dimmed Phosphor icon (`size-12`), a muted one-line message, and — when the user can act — a call-to-action button:

```vue
<div class="text-center py-12">
	<UIcon name="ph:magnifying-glass-minus" class="size-12 text-dimmed mb-4" />
	<p class="text-muted">{{ $t("main.words.no_results") }}</p>
</div>
```

---

## In-page section navigation (URL hash sync)

When a page hosts multiple in-page sections (desktop side navigation menu, mobile hamburger) and the active section must survive reload and be deep-linkable, sync it with the URL hash.

**Scope rule — sections only.** The hash tracks ONLY the active section (`#extras`, `#plans`). Never encode overlay/form state or entity ids in the hash — sync problems outweigh the benefit; contextual info belongs in the form header instead.

Model the hash as a **writable computed** where the hash IS the state — no watchers, no mirrored local ref:

- **Get:** the reactive `route.hash` stripped of `#`, whitelisted against the known sections, falling back to a default. Gate behind `useMounted` — the hash never reaches the server, so before mount return the default and match the server render (no hydration mismatch).
- **Set:** `router.replace({ query, hash })` — history replace, never push. Selecting the default section clears the hash (clean URL).
- Define a router `scrollBehavior` that returns `false` when only the hash changes — section hashes are UI state, not anchors.

**Single source of truth for sections.** Declare them once as a static `as const` array with `labelKey` (an i18n key, not a `t()` call — that lets the constant live outside a `computed` and keep literal types):

```ts
const sectionGroups = [
	[
		{ value: "overview", labelKey: "feature.tabs.overview", icon: "ph:squares-four" }
	],
	[
		{ value: "plans", labelKey: "feature.tabs.plans", icon: "ph:bookmark-simple" },
		{ value: "extras", labelKey: "feature.tabs.extras", icon: "ph:plus" }
	]
] as const;
```

Everything derives from it: the whitelist (`sectionGroups.flat().map((s) => s.value)`), and the nav items (a `computed` mapping with `label: t(section.labelKey)`, `active`, `onSelect`). Because the values stay literal, the current section is typed as a union — a typo in `v-if="currentSection === '…'"` is a type error.

- **Desktop:** a side navigation menu (`hidden md:block`) built from the grouped items.
- **Mobile:** the same items in a hamburger + left slideover, placed in the page header's mobile toolbar slot. Do not use a select dropdown for section switching.
- **Section-derived state** (e.g. a shared query param that must follow the active section) is claimed by each section component in its own `onMounted`, not from the nav's `onSelect` — with deep links the section activates without any setter running.

---

## Detail pages

Detail pages show a grid of clickable cards linking to sub-features, optionally filtered by a search input:

```vue
<UPageGrid class="gap-3 lg:gap-4 md:grid-cols-2 lg:grid-cols-3">
	<UPageCard
		v-for="card in filteredCards"
		:key="card.title"
		variant="subtle"
		v-bind="card"
		class="cursor-pointer"
	/>
</UPageGrid>
```

---

## Buttons — hierarchy and placement

| Role | Style | Placement |
|---|---|---|
| Primary page action (create) | solid `primary` with icon | Page header `#actions` slot |
| Submit / Save | solid `primary` (defaults — do not restate them) | Overlay `#footer`, right side |
| Cancel / Close | `variant="outline" color="neutral"` | Overlay `#footer`, left of submit |
| Secondary toolbar actions (export, columns) | `variant="outline"` | Toolbar, right side |
| Refresh | `variant="soft" color="info"`, icon-only, bound `:loading` | Toolbar, left side |
| Destructive | `color="error"`, always behind `useConfirm()` | Row actions / header actions |

- One primary action per view. Everything else is outline, soft, or ghost.
- Buttons that trigger async work bind `:loading` to that work's status.
- Prefer Phosphor icons (`ph:` prefix) everywhere.

---

## Info tooltips

For inline help affordances (a small info/question icon revealing text on hover), define one shared info-tooltip component per project and use it everywhere, instead of hand-rolling `UTooltip` + `UIcon` — ad-hoc versions drift on sizing and color tokens over time.

```vue
<!-- ✅ shared component: consistent icon, size, and color token -->
<InfoTooltip :text="$t('feature.help')" icon="question" />

<!-- ❌ ad-hoc tooltip + icon -->
<UTooltip :text="$t('feature.help')">
	<UIcon name="ph:question" class="size-3.5 text-dimmed cursor-help" />
</UTooltip>
```

Reach for the ad-hoc form only when you need a non-standard trigger — e.g. a tooltip wrapping a button or custom content.

---

## Quick reference

| Need | Pattern |
|---|---|
| New list page | Thin page shell with `#actions` create button + feature list component with filter side panel |
| Show a form/modal | `overlay.create(LazyFeatureForm, { props, destroyOnClose: true }).open()` — never render it in the template |
| New creation form | `USlideover` root + `UForm` in `#body`, submit in `#footer` linked by `form` id, strict schema |
| New editing form | Same, but the caller passes `entityId`; the form fetches the record and shows skeletons |
| Multi-section form | Creation → stepper; editing → section navigation |
| Confirm before discarding changes | `defineModel("open")` + `handleRequestClose` with `useConfirm()` |
| Validation messages | i18n keys as Zod messages, translated at display time; annotate every throwable check (constructor too for required numbers) |
| Row actions | `SMoreActions` with `onSelect` handlers; destructive ones behind `useConfirm()` |
| Confirmation | `useConfirm()` with `title`, `message`, `destructive`, `action` |
| Status badge | Label + status→color map, rendered as a soft `UBadge` |
| Filter selects | `USelectMenu` with `clear` + `:search-input="false"`; options in a `computed` |
| Column visibility | Translation map + a `columnsDropdownItems` computed (expose the array, not the table API) |
| Bounded table/grid height | `useTableHeight(wrapper)` + `UTable sticky` (table) or `overflow-auto` region (grid) |
| Delete flow | Row action → `confirm()` → delete call → data layer refreshes the list, no manual refetch |
| Empty state | Centered dimmed Phosphor icon + muted message + optional CTA |
