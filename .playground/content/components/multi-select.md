---
title: MultiSelect
description: Hierarchical multi-selection dropdown with tree structure, search, select-all, and an optional radio-group mode for single-root selection.
category: form
prefix: S
componentName: MultiSelect
showcaseSlug: multi-select
showcaseFile: MultiSelect
tags: [multiselect, tree, hierarchy, checkbox, radio, search, popover]
subcomponents:
  - SMultiSelectTree
  - SMultiSelectRadioGroup
---

# SMultiSelect

`SMultiSelect` is built on top of `UTree` and `UPopover`. Items form a hierarchy where parents auto-select when all children are checked.

## Quick example — multi mode (default)

```vue
<SMultiSelect
	v-model="selected"
	:items="roomTypes"
	placeholder="Select room types"
	searchable
	select-all
/>
```

## Radio-group mode

```vue
<SMultiSelect
	v-model="selected"
	:items="roomTypes"
	mode="radio-group"
	placeholder="Select a property"
/>
```

In `radio-group` mode, picking a root item auto-checks all its children; individual children can still be toggled within the active group.

## Clear button — `clear`

Same API as `USelectMenu`: `clear` (boolean or `ButtonProps`) shows a clear button next to the chevron when there is a selection; it empties the `v-model` and emits `clear`. `clear-icon` overrides the icon (default `appConfig.ui.icons.close`).

```vue
<SMultiSelect v-model="selected" :items="items" clear @clear="onClear" />
<SMultiSelect v-model="selected" :items="items" :clear="{ color: 'error' }" clear-icon="ph:x-circle" />
```

## Large lists — `virtualize`

By default every item is mounted in the DOM, which freezes the popover with a thousand+ items. `virtualize` is forwarded to `UTree` (same signature as `USelectMenu`): only the visible rows are rendered.

```vue
<SMultiSelect
	v-model="excludedPortals"
	:items="portalItems"
	mode="multiple"
	searchable
	select-all
	virtualize
/>

<!-- tune overscan / row height -->
<SMultiSelect v-model="selected" :items="items" :virtualize="{ overscan: 8, estimateSize: 32 }" />
```

- Virtualized trees use `UTree`'s **flattened layout** (same indentation); the nested guide line is redrawn with CSS in `SMultiSelectTree`, so it looks the same.
- Keyboard navigation and ARIA (`tree` / `treeitem`, arrows, Home/End, typeahead) are kept — it is still `UTree`.
- Rows are 32px (`md`); pass `estimateSize` if a custom `item-label` changes the row height.
- A prefilled `v-model` is reflected on open; parents of prefilled leaves are auto-expanded.
- `multiple` mode only: in `radio-group` mode the prop is ignored (root radios are a `URadioGroup`).

## Subcomponents

- **`SMultiSelectTree`** — internal tree renderer with checkbox state.
- **`SMultiSelectRadioGroup`** — internal radio mode wrapper.

## Notes

- `model-value` returns an array of leaf keys (always — both modes).
- The tree is fully searchable: matching parent nodes auto-expand and only matching leaves are visible.
- Long labels are truncated with a native `title` attribute (no tooltip component).
- Items shape: `{ key, label, children?: Item[] }`.
