# SMultiSelect Implementation Plan

## Context

We need a new `SMultiSelect` component — a USelect-like dropdown with hierarchical multi-selection (checkboxes in a tree) and a radio-group variant. Full design spec in `docs/multi-select.md`. All 32 design decisions were resolved in the interview.

## Files to Create

### 1. `app/components/MultiSelect/types.ts`

Type definitions:

```ts
import type { TreeItem } from "@nuxt/ui";
import type { ClassNameValue } from "tailwind-merge";

export interface MultiSelectItem extends TreeItem {
  value?: string;
  children?: MultiSelectItem[];
}

export interface MultiSelectLocale {
  search?: string;
  selectAll?: string;
  empty?: string;
  selected?: string; // "{n} selected" pattern
}

export interface MultiSelectUi {
  trigger?: ClassNameValue;
  popover?: ClassNameValue;
  search?: ClassNameValue;
  selectAll?: ClassNameValue;
  tree?: ClassNameValue;
  empty?: ClassNameValue;
  footer?: ClassNameValue;
}
```

### 2. `app/components/MultiSelect/SMultiSelect.vue`

**Architecture** (UButton + UPopover + UInput + UTree):

```
UPopover (v-model:open)
  default slot -> UButton (trigger, styled like USelect)
  #content slot ->
    UInput (search, optional, variant="none", auto-focus)
    UCheckbox ("Select all", optional, multiple mode only)
    <div> (scrollable tree container, max-h-60 overflow-y-auto)
      UTree (multiple, propagateSelect, bubbleSelect)
        #item-leading slot -> UCheckbox or custom radio rendering
    </div>
    Empty state (when no search results)
    Footer slot
```

**Key implementation details:**

#### Props
- `items`, `modelValue` (v-model, `string[]`), `mode` ("multiple" | "radio-group"), `selectAll`, `searchable`, `searchFn`, `labelFn`, `placeholder`, `disabled`, `color`, `variant`, `size`, `defaultExpanded`, `locale`, `searchPlaceholder`, `selectAllLabel`, `emptyText`, `ui`

#### Tree Item Key Resolution
- Helper: `getItemKey(item) => item.value ?? item.label ?? ""`
- Helper: `getLeaves(items)` — recursively collect leaf items (no children)
- Helper: `getLeafKeys(items)` — collect keys of leaves
- Helper: `findItemsByKeys(items, keys)` — find full item objects from keys

#### Multiple Mode
- Use UTree with `multiple`, `propagateSelect`, `bubbleSelect` props
- `#item-leading` slot renders `UCheckbox` with `{ selected, indeterminate, handleSelect }` from slot scope
- Items rendered with `as="div"` (since checkbox is also a button)
- v-model maps between flat leaf keys array and UTree's internal selection

#### Radio-Group Mode
- **Do NOT use URadioGroup** — we need custom rendering inside UTree
- Render root items manually (not via UTree) with radio-button styling
- Each root item is collapsible, contains a UTree for its children
- Track `activeRadio: string | null` (ref) for which root is selected
- Selecting a radio: set activeRadio, emit all children keys as modelValue
- Clicking a child checkbox in active group: toggle that child in modelValue
- Clicking a child in non-active group: switch activeRadio to that group, emit only clicked child key

#### Search Filtering
- `searchTerm` ref, bound to UInput v-model
- `filteredItems` computed: recursively filter tree
  - Default filter: match leaf labels case-insensitive against searchTerm
  - Custom filter via `searchFn` prop
  - Keep parent chain of matching leaves
  - Return empty array if no matches (triggers empty state)
- When search active, force-expand all filtered items

#### Select All Logic
- `allLeafKeys` computed from current `filteredItems` (excludes disabled)
- `selectAllState` computed: "checked" | "unchecked" | "indeterminate"
- Toggle: if not all selected -> select all; else -> deselect all
- Only visible in multiple mode

#### Trigger Label
- Priority: `trigger` slot > `label` slot > `labelFn` > default
- Default: `"{n} selected"` using locale.selected with count replacement
- When nothing selected: show `placeholder`

#### Expand State
- Compute `initialExpanded: string[]` from `defaultExpanded` prop + pre-selected item parent chains
- Pass to UTree via `v-model:expanded`
- When search active, override expanded to show all matching parent chains

#### Popover
- Width matches trigger: use CSS `w-(--reka-popover-trigger-width)` on content (this is how USelectMenu does it)
- Close on outside click and Escape (UPopover default behavior)
- Never close on selection: handled by UTree events, no close trigger

#### Keyboard
- Search auto-focus via `autofocus` on UInput when popover opens
- Escape closes popover (UPopover default)
- Arrow keys delegated to UTree

#### Empty State
- Shown when `filteredItems` is empty and `searchTerm` is not empty
- Default: `ph:magnifying-glass-minus` icon + emptyText
- Customizable via `#empty` slot

### 3. `.playground/app/components/Showcase/MultiSelect.vue`

Showcase page with examples:
- Basic multiple selection
- Multiple with select all
- Multiple with search
- Radio-group mode
- Custom label function
- Different colors/sizes

### 4. Register in playground

Add "MultiSelect" to `.playground/app/composables/useSections.ts` and link from `.playground/app/pages/index.vue`.

## Existing Patterns to Reuse

- **Trigger styling**: Match `USelect` appearance — `app/app.config.ts` line 22-28 for select slot overrides
- **Popover pattern**: `SDatePicker.vue` lines 9-14 for UPopover + trigger setup
- **Component structure**: `SSlider.vue` for `withDefaults(defineProps<>())` + `defineEmits` + `defineModel` pattern
- **Empty state icon**: `ph:magnifying-glass-minus` (already used in project per CLAUDE.md)
- **UTree slot scope**: `{ item, selected, indeterminate, handleSelect, handleToggle, expanded, level, index }` — use `selected`, `indeterminate`, `handleSelect` for checkboxes

## Critical Implementation Notes

1. **UTree with checkboxes requires `as="div"` on items** — because UCheckbox renders as `<button>` and nesting buttons is invalid HTML
2. **Popover trigger width**: use Reka UI's CSS variable `--reka-popover-trigger-width` to match width
3. **Color prop**: forward to both trigger UButton and UCheckbox instances inside tree
4. **ESLint**: tabs, double quotes, semicolons, 1tbs braces

## Verification

1. `pnpm dev` — start playground
2. Navigate to MultiSelect showcase page
3. Test multiple mode: check/uncheck items, verify v-model output, test select all with partial selection (indeterminate)
4. Test search: type to filter, verify parent chains shown, verify "Select all" applies to visible only
5. Test radio mode: click radios to switch groups, verify children auto-check, verify clicking child in non-active group switches radio
6. Test empty state: search for non-existent term
7. Test keyboard: Escape closes, arrow keys navigate
8. `pnpm lint` — verify no lint errors
