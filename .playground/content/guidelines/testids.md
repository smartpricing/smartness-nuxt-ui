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

Tag **every element a test acts on or asserts against**:

- **Buttons** — submit, cancel, close, create, refresh, import/export/print, row actions, kebab menus, copy, add/delete, icon-only buttons.
- **Inputs, textareas, number inputs, switches, checkboxes, radio groups, sliders.**
- **Selects** — the control, its search box, and its options.
- **Collections** — the container, plus every repeated child (see [Repeated children](#repeated-children-data-test-value)).
- **Overlays** — the trigger, the panel, and the panel's close / confirm / cancel buttons.
- **Tables** — the table, plus each row through its cell content.
- **Forms** — the `UForm` root.
- **Links** that drive navigation when they are the primary affordance.
- **Badges** carrying state a test reads.

**Do NOT tag** what no test looks at: decorative wrappers, separators, icons that carry no state, admin-only affordances behind a flag. The rule is not "nothing visual" — a badge is visual and gets an id — it is "nothing the test ignores".

## Repeated children: `data-test-value`

One rule covers every collection, and it replaces the older "value-suffixed id" convention:

- the **container** carries a `data-testid` that gives the context;
- each **repeated child** carries the *same* static `data-testid` plus a **`data-test-value`** holding the discriminant.

```vue
<UTabs :items="items" :data-testid="ids.propertyTabs">
	<template #default="{ item }">
		<span :data-testid="ids.propertyTab" :data-test-value="item.value">{{ item.label }}</span>
	</template>
</UTabs>
```

```ts
page.getByTestId(ids.propertyTab).filter({ has: page.locator("[data-test-value=bookings]") });
```

The discriminant must be **stable, domain-owned and ASCII-kebab** — a slug, a code, an enum value. **Never the loop index**, with two declared exceptions where cardinality and order are fixed and no channel exists at all: slider thumbs and pin-input boxes.

`data-test-value`, not `data-value`: Reka UI already occupies `data-value` on nine components.

## Which channel reaches which node

There is no single mechanic. Which one works is a property of the component, and getting it wrong **fails silently** — the attribute type-checks, renders nothing, and no warning is emitted. The five channels:

| Channel | Written as | Reaches |
| --- | --- | --- |
| Fallthrough | `<C data-testid="…" />` | the component's root node |
| Prop object | `:search-input="{ 'data-testid': … }"` | one internal node the component renders itself |
| `attributes` prop | `:attributes="{ input: { 'data-testid': … } }"` | any internal node, keyed by name — the layer's canonical mechanic |
| Item object | `items: [{ …, 'data-testid': …, 'data-test-value': … }]` | one repeated child, at its definition site |
| Slot | `<template #item-label>` … `</template>` | a node you render yourself inside the component |

The **live truth is the review page**, not this table: `/testids` renders every component with every channel bound at once and reads the DOM back, so it stays correct when Nuxt UI changes underneath us. What follows is the summary of what it currently measures.

### Selects — the item array is a trap

`USelect`, `USelectMenu` and `UInputMenu` accept a `data-testid` inside `items` and **never render it**: their internal `ComboboxItem` / `SelectItem` binds only `value`, `disabled` and `class`. Tag options through `#item-label` instead.

```vue
<USelectMenu
	v-model="roomType"
	:items="roomTypes"
	value-key="value"
	label-key="label"
	:data-testid="ids.roomTypeSelect"
	:search-input="{ 'data-testid': ids.roomTypeSearch }"
	:content="{ 'data-testid': ids.roomTypePanel }"
>
	<template #item-label="{ item }">
		<span :data-testid="ids.roomTypeOption" :data-test-value="item.value">
			{{ item.label }}
		</span>
	</template>
</USelectMenu>
```

`USelect` has no `search-input` (it has no filter). `UInputMenu`'s root *is* the search field. In the slot, render the same key `label-key` points at.

### Menus and link lists — the item array is the answer

`UDropdownMenu`, `UContextMenu`, `UNavigationMenu`, `UBreadcrumb` and `UCommandPalette` render their items through `pickLinkProps()`, which forwards **every** `data-*` and `aria-*` key on the item object. Both ids go in the item, at the definition site:

```vue
<UDropdownMenu :items="items">
	<UButton label="Actions" :data-testid="ids.actionsButton" />

	<!-- the content prop does NOT carry data-* here — see below -->
	<template #content-top>
		<span class="sr-only" :data-testid="ids.actionsMenu" />
	</template>
</UDropdownMenu>
```

```ts
const items = [[
	{ label: "Duplicate", "data-testid": ids.actionItem, "data-test-value": "duplicate" },
	{ label: "Archive",   "data-testid": ids.actionItem, "data-test-value": "archive" }
]];
```

Two exceptions inside the exception:

- items of type `label`, `separator` and `checkbox`, and the parent of a submenu, take a different branch and **drop** their `data-*` keys;
- the **`content` prop does not reach the panel** on menus, unlike on `UModal`. Render a marker through `#content-top`, or scope on `[role="menu"]`.

### Collections — three different answers

| Component | Container | Repeated child |
| --- | --- | --- |
| `UCheckboxGroup` | fallthrough | **item object** — it spreads the whole item onto the control |
| `URadioGroup` | fallthrough | `#label` slot — lands on a span inside the `<label>`, not on the input |
| `UTabs` | fallthrough | `#default` slot |
| `UAccordion` | fallthrough | `#default` slot |
| `UTable` | fallthrough | `#<columnId>-cell` slot — `tr` / `td` take no attributes |
| `UStepper` | fallthrough | `#title` slot — lands on the step's title text, not on its trigger |
| `SStepper` | fallthrough | **nothing works** — take the step by accessible name |
| `UNavigationMenu`, `SNavigationMenu` | fallthrough | item object |
| `SActionsGroup`, `SMoreActions` | fallthrough | item object, on both sides of the inline/overflow split |
| `SDataCalendar` | `attributes` prop | `item.attributes` |

`UCheckboxGroup` working through the item object while its twin `URadioGroup` needs a slot is an upstream inconsistency, not a convention — and the two land the id on different nodes for the same job: the control in one case, the label in the other.

### Overlays — the panel is teleported

The body is mounted outside the component's own subtree, so an attribute on the component cannot reach it. The trigger is your own element; the panel and the X button are theirs.

```vue
<UModal
	title="New booking"
	:content="{ 'data-testid': ids.newBookingModal }"
	:close="{ 'data-testid': ids.newBookingClose }"
>
	<UButton label="Open" :data-testid="ids.newBookingButton" />
	<template #body>…</template>
</UModal>
```

`USlideover` is identical. `UPopover` is the sharp edge: its default slot is a **fragment**, so `data-testid` written on the component is discarded outright — tag the trigger and pass `content`. `SConfirmModal` nests one level deeper: `:modal-props="{ content: { … } }"`, plus `confirmProps` and `cancelProps` for the buttons.

### Layer components with an `attributes` prop

`SDatePicker` (6 keys: `root`, `input`, `triggerWrapper`, `popover`, `calendar`, `clearButton`) and `SDataCalendar` (11 keys, from `header` to `addButton`) expose every internal node by name. **Both declare `inheritAttrs: false` and never re-bind `$attrs`**, so an attribute — or a `class`, or a `style` — written on the component is dropped with no warning. There is no fallthrough to fall back on:

```vue
<SDatePicker
	v-model="checkIn"
	:attributes="{
		root:        { 'data-testid': ids.checkIn },
		input:       { 'data-testid': ids.checkInInput },
		popover:     { 'data-testid': ids.checkInPanel },
		clearButton: { 'data-testid': ids.checkInClear }
	}"
/>
```

An `attributes` key that names a repeated node (`cell`, `weekdayHeader`) applies **the same object to every copy**: the ids are identical and there is no discriminant, so scope by position or by rendered content.

### The nodes only a prop reaches

| Node | Channel |
| --- | --- |
| Modal / slideover X button | `:close="{ 'data-testid': … }"` |
| `UAlert` dismiss | `:close="{ 'data-testid': … }"` |
| `UInputNumber` +/− | `:increment` / `:decrement` |
| `USelectMenu` search box | `:search-input="{ 'data-testid': … }"` |
| `UCalendar` navigation | `:prev-month` / `:next-month` / `:prev-year` / `:next-year` |
| `SPhoneInput` halves | `:input-props` and `:select-menu-props` |
| `SMoreActions` kebab | `:button-props="{ 'data-testid': … }"` |

`UCalendar` day cells are reachable through the `#day` slot, with `day.toString()` — the ISO date — as the discriminant. Targeting them by their rendered number stays the simpler option when a test only needs one day.

### Where nothing reaches

- **`SMultiSelect`** — the root is a `UPopover`, so fallthrough is discarded; no prop reaches the trigger, the search box, select-all or the rows. The only way in is re-implementing the trigger through the `#trigger` slot, which costs the app the default trigger.
- **`SFormField`** — the attribute lands on the field wrapper (label + help + control), not on the control. Every component that uses it as its root inherits this, `SSlider` included: tag the control you pass in as well.
- **`SStepper`** steps — no item channel and no slot at all, unlike the `UStepper` it stands next to.
- **`UPinInput`** boxes and **`USlider`** thumbs — no slot exists; both are the declared fixed-order exception.

These are recorded as defects, not as conventions: upstream ones one-per-file in `docs/upstream/`, ours in `docs/internal/testid-gaps.md`.

## Which node does the id actually land on?

The guideline deliberately **does not promise** a landing node, because Nuxt UI is not consistent: a `USelect` id lands on the trigger button, a `USelectMenu` id on the wrapper, a `USwitch` id on the inner button, a `USlider` id on the root span. Write a defensive selector rather than assuming:

```css
[data-testid="x"]:is(button), [data-testid="x"] button
```

The review page reports the landing node for every component, and flags the ones that are not clickable.

## Passing `data-testid` through typed props

A plain attribute needs nothing. A key inside a **typed prop object** (`ButtonProps`, `InputProps`, `ModalProps`, `SelectMenuProps`) needs the Nuxt UI types augmented, in a root `nuxt-ui.d.ts` that Nuxt auto-includes:

```ts
declare module "#ui/types" {
	interface ButtonProps { [key: `data-${string}`]: unknown }
	interface InputProps { [key: `data-${string}`]: unknown }
	interface SelectMenuProps { [key: `data-${string}`]: unknown }
}

export {};
```

`ButtonProps` is the one that matters most: `close`, `increment`, `decrement`, `confirmProps`, `prev-month` and every `SActionsGroup` item are all `ButtonProps`.

The augmentation must live in the **consumer** project — a layer's own copy is not guaranteed to apply to the consumer's typecheck. Menu item objects need no augmentation: they already carry an open index signature.

## Shared self-tagging components — do not pass ids to them

Reusable domain pickers and inputs shared across an app (country pickers, entity selectors, money inputs, search boxes) **hardcode their own `data-testid` internally**, from shared `*PickerTestIds` objects in `shared.ts`. At call sites, do **not** add a `data-testid` to them; tag everything around them. Tests disambiguate by scoping within the enclosing form or modal, which does carry a unique id.

## Reusable shells vs specific components

Where an id lives follows where the markup lives, not where it is used. A reusable shell's own affordances (a filter panel's close / reset / apply) are tagged once in `shared.ts` and reused everywhere; feature-specific components keep their own `<area><Component>TestIds` object. Rule of thumb: if the same element would be meaningful in two unrelated features, its id is shared.

## Ids owned by the layer

The layer does not tag its own components — with one declared exception: a component that is a **singleton per application** whose node no prop exposes. Today that is the navigation shell, and it ships four ids: `sidebar-collapse`, `product-navigation-menu`, `navigation-products-select`. They are **public API**; renaming one is a breaking change for every consumer's test suite.

## Checklist when tagging a component

1. Does an object for this component already exist in the module's testIds file? Extend it; otherwise add a new `<area><Component>TestIds` object in the same file, same style.
2. Walk the template top to bottom; for every element a test touches, add a `data-testid`.
3. For each one, pick the channel from the tables above — do not assume fallthrough works.
4. For every collection, give the container an id and every child the same id plus a `data-test-value`.
5. Leave self-tagging shared pickers untagged at the call site.
6. Keys camelCase with an element suffix, values kebab mirroring the path.
7. Open `/testids` and check the component's case if anything behaves unexpectedly — a silent drop looks exactly like a typo.
