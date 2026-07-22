---
title: Test ids
description: Company-wide standard for declaring and binding data-testid attributes so every interactive element is addressable in automated tests.
category: testing
tags: [testing, data-testid, e2e, qa, naming, conventions]
---

# Test ids (`data-testid`)

Canonical, cross-project standard for `data-testid` coverage. Every interactive element must be addressable in tests via a **centrally-declared** `data-testid`. The rules below apply to every app built on Nuxt UI / Smartness UI.

## Where ids live

All ids are declared as `as const` objects in a dedicated constants folder (e.g. `shared/constants/testIds/<module>.ts`) — **never inline literal strings in templates**. One file per feature module; cross-cutting/shared elements live in `shared.ts`.

```ts
// shared/constants/testIds/customers.ts
export const customersCreationFormTestIds = {
	form: "customers-creation-form",
	firstNameInput: "customers-creation-form-first-name-input",
	submitButton: "customers-creation-form-submit-button"
} as const;
```

Import and bind:

```vue
<script lang="ts" setup>
	import { customersCreationFormTestIds } from "#shared/constants/testIds/customers";
</script>

<template>
	<UForm :data-testid="customersCreationFormTestIds.form">
		<UInput v-model="payload.firstName" :data-testid="customersCreationFormTestIds.firstNameInput" />
		<UButton type="submit" :data-testid="customersCreationFormTestIds.submitButton" />
	</UForm>
</template>
```

## Naming convention

- **Object name:** `<area><Component>TestIds` (camelCase, ends in `TestIds`). One object per page/component, e.g. `ordersEditingFormTestIds`, `dashboardHeaderTestIds`.
- **Key:** camelCase, ends with the element-type word: `Input`, `Textarea`, `Button`, `Select`, `Switch`, `Checkbox`, `RadioGroup`, `Tabs`, `Table`, `Dropdown`, `Modal`, `Form`, `Link`, `Trigger`, `Card`, `Cell`, `Page`. Examples: `firstNameInput`, `submitButton`, `countrySelect`, `notesTabs`, `actionsMenuButton`.
- **Value:** kebab-case mirroring the key path: `<area>-<component>-<element>-<kind>`, e.g. `orders-editing-form-given-name-input`. Plain ASCII only.
- Always bind: `:data-testid="obj.key"`. Never a bare string. Use `as const`.

## What gets an id (granularity)

Tag **every interactive element**:

- **Buttons** — submit, cancel, close, create, refresh, import/export/print, row-action buttons, kebab/`actionsMenuButton`, copy, add/delete, icon-only buttons.
- **Inputs / textareas / number inputs / switches / checkboxes / radio groups.**
- **Selects** — `USelect`/`USelectMenu` (key suffix `Select`).
- **Tabs** — the `UTabs` root (suffix `Tabs`), plus each trigger with a value-suffixed id via the `#default` slot.
- **Dropdown menus** — the `UDropdownMenu` trigger (suffix `Dropdown`). Individual menu items are **not** tagged by default (scope within the open menu in tests). If one item is critical, give it its own key.
- **Modals** — root (suffix `Modal`), plus their close/cancel/submit buttons. Slideover roots are tagged on request (their inner buttons/inputs are still tagged as usual).
- **Tables** — the `UTable` root (suffix `Table`).
- **Forms** — the `UForm` root (suffix `Form`).
- **Links** that drive navigation when they are the primary affordance.
- **Repeated cells** (calendar days, grid tiles) — the repeated element gets ONE static id (suffix `Cell`).

**Do NOT tag:** purely visual elements (icons, separators, decorative wrappers), admin/debug-only elements behind an admin flag.

## Per-component reference

Where the id ends up in the rendered DOM, whether the element gets an id **by default** on every instance or only **on request**, and whether a **value-suffixed id** is needed (see [Value-suffixed ids](#value-suffixed-ids)).

| Element | Component | Id lands on (DOM) | Default coverage | Value needed |
| --- | --- | --- | --- | --- |
| Button | `UButton` | `button` | Yes | No |
| Input field | `UInput` | `input` | Yes | No |
| Tab trigger | `UTabs` via `#default` slot | `span` inside the trigger | Yes | Yes |
| Dropdown trigger | `UDropdownMenu` | trigger `button` | Yes | No |
| Select | `USelect` / `USelectMenu` / `SMultiSelect` | component root | Yes | No |
| Select items | `#item-label` slot | `span` inside the option | Yes | Yes |
| Table | `UTable` | root `div` | Yes | No |
| Table rows / cells | `UTable` internals | row/cell | On request | Yes |
| Toggle | `USwitch` | inner `button` | Yes | No |
| Dialog | `UModal` | root `div` | Yes | No |
| Slideover | `USlideover` | root `div` | On request | No |
| Datepicker nav buttons | `UCalendar` prev/next | `button` | Yes | No |
| Datepicker day cells | `UCalendar` days | no id — target via the rendered date value | — | Yes |
| Segmented control items | — | `button` per item | Yes | Yes |
| Navigation menu items | `SNavigationShell` items | menu item | Yes | Yes |
| Toast / banner | `useToast` / banner | root | On request | No |

Reading the columns:

- **Id lands on (DOM)** — the node QA will actually find the id on in the rendered markup. You still bind the id on the component root / documented prop as usual; this column documents where it renders (e.g. a `USwitch` id ends up on the inner `button`).
- **Default coverage** — "Yes": every instance gets an id whenever a template is tagged. "On request": tag only when QA asks (slideovers, toasts, banners, table rows/cells). Ids already shipped on on-request elements stay.
- **Value needed** — "Yes": a single static id cannot target the specific item; use a value-suffixed id.

### Value-suffixed ids

When a value is needed, suffix the base id with the item's **value** (never the index): `` `${obj.base}-${item.value}` ``. The id stays deterministic and readable in test code.

```vue
<UTabs :items="tabItems" :data-testid="obj.typeTabs">
	<template #default="{ item }">
		<span :data-testid="`${obj.typeTabLabel}-${item.value}`">{{ item.label }}</span>
	</template>
</UTabs>
```

For select/multiselect items, bind the suffixed id via the `#item-label` slot — see [Options inside selects](#options-inside-selects--item-label-slot). For menu items (`UDropdownMenu`/`UContextMenu`), put the suffixed `"data-testid"` key directly in the item object.

## Looped / repeated elements — static id + parent scoping

Repeated **structural** elements (table rows, row-action buttons, grid cards, calendar cells) get **one static id**, NOT a per-row parametrised id. Tests scope queries within the parent container.

```vue
<!-- ✅ one static id on the repeated element -->
<tr v-for="r in rows" :key="r.id" :data-testid="ordersListTestIds.row">
<!-- ❌ do NOT do `${entity.id}`-suffixed ids -->
```

Two carve-outs:

- **Table rows / columns / cells** are tagged only **on request**; when QA asks, they need a value-suffixed id (based on a stable domain value, never the loop index).
- This rule is about entity-driven repetition (rows of data). **Option-like items** (tabs, select items, segmented controls, nav items) are value-suffixed instead — see [Value-suffixed ids](#value-suffixed-ids). The distinction: option values are a small fixed set known at build time; entity ids are unbounded data.

## Shared self-tagging components — do not pass ids to them

Reusable domain pickers/inputs shared across the app (country pickers, entity selectors, money inputs, search inputs, date pickers, …) should **hardcode their own `data-testid` internally** (bound on their inner control + search input), using shared `*PickerTestIds`/`*InputTestIds` objects in `shared.ts`.

Therefore, **at call sites do NOT add a `data-testid` to a self-tagging shared component** — it already carries one. Tag everything else around it. Because the same picker id repeats across forms, tests disambiguate by scoping within the enclosing form/modal (which DOES carry a unique `Form`/`Modal` id).

## Passing `data-testid` through component props (type augmentation)

Most ids are bound as a plain `:data-testid` attribute on an element or component, which always works. But some ids must be passed **inside a props object** rather than as a top-level attribute — e.g. a button rendered by another component (`confirmProps`/`cancelProps` on a confirm dialog, a modal/slideover close button via `close: { ... }`). For TypeScript to accept `data-testid` on those typed prop objects (`ButtonProps`, `ModalProps`, …), the Nuxt UI types must be augmented **in the consumer project**.

Put the augmentation in a root `nuxt-ui.d.ts`, which Nuxt auto-includes in the generated tsconfig:

```ts
declare module "#ui/types" {
	interface ButtonProps {
		[key: "data-testid"]: string
	}
	interface InputProps {
		[key: "data-testid"]: string
	}
	interface ModalProps {
		close?: {
			[key: "data-testid"]: string
		}
	}
}
```

Guidelines:

- The augmentation must live in the **consumer** project. A design-system layer can declare its own copy, but layer-level augmentations are not guaranteed to apply to the consumer's typecheck — so each app keeps its own `nuxt-ui.d.ts`.
- Extend the `declare module "#ui/types"` block when you need to pass `data-testid` through a new Nuxt UI / layer component prop that doesn't yet accept it.
- This is only needed for **prop-object** passthrough. A plain `:data-testid` attribute on an element or component needs no augmentation. Menu/dropdown **item objects** (`ContextMenuItem`, `DropdownMenuItem`) also accept `data-testid` already (open index signature) and are forwarded to the rendered item — no augmentation required there either.

## Reusable shells vs specific components

Where an id lives follows where the markup lives, not where it's used:

- **Reusable shell / generic components** (filter panels, shared pickers, any wrapper rendered across many features) carry **shared ids** declared in `shared.ts`. Their close/reset/search affordances belong to the shell, so they are tagged once there and reused everywhere. Example: a filter panel's X-close / reset / apply use a shared `filterPanelTestIds`; a settings drawer slotted **into** that panel does not re-declare its own close id.
- **Feature-specific components** keep their own `<area><Component>TestIds` object in the module file, even when they sit next to a shared shell.

Rule of thumb: if the same element would be meaningful in two unrelated features, its id is shared; otherwise it's module-specific.

## Options inside selects — `#item-label` slot

`USelect` / `USelectMenu` do **NOT** forward extra item keys to the DOM: their internal `RSelectItem`/`ComboboxItem` binds only `value`/`disabled`/`class`, so a `"data-testid"` key in the items array type-checks but **never renders**. Tag options through the `#item-label` slot with a value-suffixed id (works with `virtualize` too):

```vue
<USelectMenu :items="options" label-key="label" :data-testid="obj.select">
	<template #item-label="{ item }">
		<span :data-testid="`${obj.option}-${item.value}`">
			{{ item.label }}
		</span>
	</template>
</USelectMenu>
```

In the slot, render the same key `label-key` points at (`item.label`, `item.text`, …). The id lands on a span inside the option — same landing spot as tab triggers.

**Menus are the exception**: `UDropdownMenu` / `UContextMenu` items DO forward `data-*` keys to the rendered element, so menu items keep the `"data-testid"` key in the item object at the definition site — no slot needed there.

## Nuxt UI passthrough patterns

Some elements are rendered internally by a Nuxt UI component and can only be reached through a prop:

- **Slideover / Modal X-close** — bind the `close` prop as an object: `:close="{ 'data-testid': obj.closeButton }"`. (Needs the `ModalProps.close` / `ButtonProps` augmentation — see above.)
- **`UInputNumber` +/- buttons** — `:increment="{ 'data-testid': ... }"` and `:decrement="{ 'data-testid': ... }"` (both are `ButtonProps`).
- **`USelectMenu` internal search box** — `:search-input="{ 'data-testid': obj.searchInput }"` (requires `InputProps` augmentation).
- **Date pickers** — tag the trigger and the `UCalendar` nav via `:prev-month` / `:next-month` / `:prev-year` / `:next-year="{ 'data-testid': ... }"`. Day cells get **no id** — tests target them via the rendered date value.
- **`UTabs` triggers** — item objects do **not** forward `data-testid` to the rendered trigger. Tag via the `#default` slot with one base id suffixed by the tab value (see [Value-suffixed ids](#value-suffixed-ids)).

## Checklist when tagging a component

1. Does an object for this component already exist in the module's testIds file? Extend it; otherwise add a new `<area><Component>TestIds` object in the same file, same style.
2. Walk the template top-to-bottom; for every interactive element add/confirm a `:data-testid`.
3. Self-tagging shared pickers: leave untagged at the call site.
4. Keep keys camelCase + element suffix; values kebab mirroring the path.
5. Do not touch lint/formatting beyond the added attributes.
