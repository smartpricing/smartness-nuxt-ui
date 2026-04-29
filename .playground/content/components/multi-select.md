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

## Subcomponents

- **`SMultiSelectTree`** — internal tree renderer with checkbox state.
- **`SMultiSelectRadioGroup`** — internal radio mode wrapper.

## Notes

- `model-value` returns an array of leaf keys (always — both modes).
- The tree is fully searchable: matching parent nodes auto-expand and only matching leaves are visible.
- Items shape: `{ key, label, children?: Item[] }`.
