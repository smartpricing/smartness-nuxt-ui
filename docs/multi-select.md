# SMultiSelect — Design Specification

## Overview

A custom select-like component for hierarchical multi-selection with checkboxes and an optional radio-group variant. Built from `UButton` + `UPopover` + `UInput` + `UTree`.

**Component**: `SMultiSelect`
**Directory**: `app/components/MultiSelect/SMultiSelect.vue`
**Types**: `app/components/MultiSelect/types.ts`

---

## Data Structure

Extends Nuxt UI `TreeItem` with an optional `value` field:

```ts
import type { TreeItem } from "@nuxt/ui";

interface MultiSelectItem extends TreeItem {
	/** Unique identifier. Falls back to `label` if not provided. */
	value?: string;
	children?: MultiSelectItem[];
}
```

No `getKey` prop — use `value` for unique identification when labels are ambiguous.

---

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `items` | `MultiSelectItem[]` | **required** | Tree items |
| `modelValue` | `string[]` | `[]` | Selected leaf values (flat array of `value` or `label` keys) |
| `mode` | `"multiple" \| "radio-group"` | `"multiple"` | Selection mode |
| `selectAll` | `boolean` | `false` | Show "Select all" checkbox (ignored in `radio-group` mode) |
| `searchable` | `boolean` | `false` | Show search input |
| `searchFn` | `(item: MultiSelectItem, term: string) => boolean` | leaf-label match | Custom filter function |
| `labelFn` | `(selectedItems: MultiSelectItem[]) => string` | `"{n} selected"` | Custom trigger label function |
| `placeholder` | `string` | `""` | Trigger placeholder when nothing selected |
| `disabled` | `boolean` | `false` | Disable the component |
| `color` | Nuxt UI color | `"primary"` | Color for trigger + checkboxes/radios |
| `variant` | `"outline" \| "soft" \| "subtle" \| "ghost" \| "none"` | `"outline"` | Trigger button variant |
| `size` | `"xs" \| "sm" \| "md" \| "lg" \| "xl"` | `"md"` | Component size |
| `defaultExpanded` | `boolean \| "all" \| "none"` | `"all"` | Initial expand state of tree items |
| `locale` | `{ search?: string, selectAll?: string, empty?: string, selected?: string }` | English defaults | i18n strings |
| `searchPlaceholder` | `string` | — | Overrides `locale.search` |
| `selectAllLabel` | `string` | — | Overrides `locale.selectAll` |
| `emptyText` | `string` | — | Overrides `locale.empty` |
| `ui` | see [UI Slots](#ui-slots) | — | CSS class overrides |

### UI Slots

```ts
ui?: {
	trigger?: ClassNameValue;    // trigger button
	popover?: ClassNameValue;    // popover container
	search?: ClassNameValue;     // search input
	selectAll?: ClassNameValue;  // select all row
	tree?: ClassNameValue;       // tree container (maps to UTree ui.root)
	empty?: ClassNameValue;      // empty search state
	footer?: ClassNameValue;     // footer area
}
```

---

## Emits

| Event | Payload | Description |
|-------|---------|-------------|
| `update:modelValue` | `string[]` | Selected values changed |
| `update:open` | `boolean` | Popover opened/closed |
| `update:searchTerm` | `string` | Search text changed |
| `select` | `{ item: MultiSelectItem, selected: boolean }` | Individual item selected/deselected |

---

## Slots

| Slot | Scope | Description |
|------|-------|-------------|
| `trigger` | `{ open, modelValue, label }` | Replace trigger entirely |
| `label` | `{ modelValue, selectedItems }` | Custom label inside trigger |
| `empty` | `{ searchTerm }` | Custom empty search state |
| `item-label` | `{ item }` | Custom item label rendering |
| `item-trailing` | `{ item }` | Content after item label |
| `footer` | — | Content at bottom of popover |

---

## Variant: Multiple Selection (`mode="multiple"`)

### Behavior

- Items render as a `UTree` with `multiple`, `propagateSelect`, and `bubbleSelect` enabled.
- Checkboxes appear via the `item-leading` slot of UTree (using `UCheckbox`).
- Parent checkboxes show **indeterminate** state when some (not all) children are checked.
- "Select all" checkbox (when `selectAll` prop is true):
  - **Checked**: all leaves are selected
  - **Unchecked**: no leaves are selected
  - **Indeterminate**: some leaves are selected
  - Click toggles between all/none
  - When search is active, "Select all" applies to **visible (filtered) items only**
  - Disabled items are **excluded** from "Select all" logic

### Model Value

- Flat array of leaf `value` strings (or `label` if no `value`).
- Parent values are never in the model — parent state is derived from children.

---

## Variant: Radio Group (`mode="radio-group"`)

### Behavior

- Root items render as **radio buttons** (mutually exclusive).
- Each root item is **collapsible** (like UTree parent nodes).
- Children within each root render as **checkboxes** (can be a nested tree).
- **Selecting a radio**: checks all children of that group, unchecks all children of the previously active group.
- **Clicking a child checkbox**: does not change the active radio. Toggles that child only within the active group.
- **Clicking a child in a non-active group**: switches the radio to that group, checks only the clicked child (not all siblings).
- Radio stays selected even if all its children are unchecked (model can be `[]`).
- "Select all" is **not available** in radio-group mode (`selectAll` prop is ignored).

### Model Value

- Same flat array of leaf values as multiple mode.
- Only contains leaves from the currently active radio group.

---

## Shared Behaviors

### Trigger

- Styled as `UButton` matching `USelect` appearance (outline variant, trailing chevron icon).
- Forwards `color`, `variant`, `size` props.
- Label display priority:
  1. `trigger` slot (replaces everything)
  2. `label` slot (custom label content)
  3. `labelFn(selectedItems)` result
  4. Default: `"{n} selected"` or placeholder if nothing selected

### Popover

- Opens on trigger click.
- Width matches trigger width exactly.
- Fixed max height with scrollable tree area; search input and "Select all" pinned at top.
- Max height overridable via `ui.popover` or `ui.tree`.
- Closes on: outside click, Escape key.
- **Never closes on item selection** (stays open for multi-select interaction).

### Search

- Optional, controlled by `searchable` prop.
- Auto-focuses when popover opens.
- Default behavior: filters **leaves only** by label match.
- Custom filter via `searchFn` prop.
- When a leaf matches, its **entire parent chain** is shown and expanded.
- Non-matching siblings are hidden.
- In radio-group mode: search filters across **all groups** visually. Does not affect selection state. Radio buttons and checkboxes remain clickable in filtered results.

### Empty State

- Shown when search yields no matches.
- Default: `ph:magnifying-glass-minus` icon + "No results" text.
- Customizable via `empty` slot or `emptyText` prop / `locale.empty`.

### Keyboard Navigation

- **Escape**: closes popover
- **Arrow keys**: navigate tree items (delegated to UTree)
- Search input auto-focuses on popover open

### Expand State

- Controlled by `defaultExpanded` prop:
  - `"all"` (default): all tree nodes expanded
  - `"none"`: all collapsed
  - `true`/`false`: same as `"all"`/`"none"`
- Individual items can override via `defaultExpanded` on the item.
- Pre-selected items (`v-model` on mount): parent chains **auto-expanded** regardless of `defaultExpanded` setting.

### Disabled Items

- Supported via `disabled` property on `MultiSelectItem`.
- Disabled items render but cannot be checked/selected.
- Excluded from "Select all" logic.

### Color Propagation

- `color` prop applies to: trigger button + checkboxes/radios inside the tree.
- Search input uses `variant="none"` (borderless, inside popover).

---

## Architecture

```
UButton (trigger)
  └── UPopover
        ├── UInput (search, optional)
        ├── UCheckbox ("Select all", optional, multiple mode only)
        ├── UTree (scrollable area)
        │     ├── item-leading slot → UCheckbox (multiple) or URadio (radio-group root)
        │     └── children → UCheckbox (both modes)
        ├── Empty state (when search has no results)
        └── Footer slot
```

---

## File Structure

```
app/components/MultiSelect/
├── SMultiSelect.vue      # Main component
└── types.ts              # MultiSelectItem type, locale type, ui type
```

---

## Locale Defaults

```ts
const defaultLocale = {
	search: "Search...",
	selectAll: "Select all",
	empty: "No results",
	selected: "{n} selected",  // {n} replaced with count
};
```

Individual string props (`searchPlaceholder`, `selectAllLabel`, `emptyText`) override the corresponding locale key.
