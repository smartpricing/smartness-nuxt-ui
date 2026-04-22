# SActionsGroup — Design Specification

## Overview

A bulk-action toolbar placed above a list of items (table, cards, checkbox group). Renders up to `maxInline` buttons inline; overflow collapses into a primary dropdown. Includes an optional selected-items counter and responsive caret hiding on small viewports. Built from `UButton` + `UDropdownMenu` + `UTooltip`.

**Component**: `SActionsGroup`
**Directory**: `app/components/ActionsGroup/SActionsGroup.vue`
**Types**: `app/components/ActionsGroup/types.ts`

---

## Data Structure

Each action extends Nuxt UI `ButtonProps` with an optional `tooltip`:

```ts
import type { ButtonProps, TooltipProps } from "@nuxt/ui";

interface ActionItem extends ButtonProps {
	/** Tooltip on the inline button. String shorthand sets `text`. */
	tooltip?: string | TooltipProps
}
```

Consumers express the full Nuxt UI button API (label, icon, color, variant, size, disabled, loading, `to`, `onClick`, etc.). Tooltips render only on the inline buttons — when an item overflows into the dropdown, its tooltip is ignored.

---

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `items` | `ActionItem[]` | **required** | Flat list of action buttons |
| `maxInline` | `number` | `3` | Max inline buttons. When `items.length > maxInline`, shows `maxInline − 1` inline + dropdown |
| `forceDropdown` | `boolean` | `false` | Collapse every item into the dropdown, regardless of `maxInline` |
| `counter` | `number` | — | Selected items count. Renders a label to the left of the group; omit to hide |
| `counterLabel` | `string` | locale default | Override the counter text template. Supports `{n}` interpolation |
| `hideCounterLabel` | `boolean` | `false` | Render only the counter number (drops the label word) |
| `hideCaret` | `boolean` | `false` | Force-hide the dropdown caret. Automatic below `sm` (640px) |
| `dropdownButtonProps` | `ButtonProps` | see below | Overrides for the dropdown trigger button |
| `dropdownTooltip` | `string \| TooltipProps` | — | Tooltip on the dropdown trigger. Default side: `top` |
| `dropdownMenuProps` | `Partial<DropdownMenuProps>` | — | Forwarded to `UDropdownMenu` (e.g. `content.side`, `content.align`) |
| `locale` | `ActionsGroupLocale` | locale defaults | Inline overrides for `sActionsGroup.*` keys |
| `ui` | `ActionsGroupUi` | — | Class overrides for internal slots |

### UI Slots

```ts
ui?: {
	root?: ClassNameValue         // outer flex wrapper
	counter?: ClassNameValue      // counter text
	button?: ClassNameValue       // each inline UButton
	dropdown?: ClassNameValue     // dropdown trigger UButton
	dropdownMenu?: ClassNameValue // UDropdownMenu root
}
```

---

## Defaults

### Dropdown trigger button

```ts
{
	color: "primary",
	variant: "solid",
	label: t("sActionsGroup.actions"),     // "Actions"
	icon: "ph:dots-three-vertical-bold",
	trailingIcon: "ph:caret-down-bold"     // hidden when hideCaret || < sm viewport
}
```

Merge `dropdownButtonProps` to override any of these.

### Tooltip default sides

- **Per-item tooltip, inline button**: `top`
- **Per-item tooltip, dropdown menu entry**: `right` (so it escapes the menu panel)
- **Dropdown trigger tooltip**: `top`

All accept a plain string (→ `{ text, content: { side } }`) or a full `TooltipProps` object. A provided `content.side` always wins over the default.

---

## Behavior

### Inline / overflow split

| Condition | Inline | Dropdown |
|-----------|--------|----------|
| Viewport `< sm` (640px) | — | all `items` (auto-collapse) |
| `forceDropdown === true` | — | all `items` |
| `items.length <= maxInline` | all `items` | — |
| `items.length > maxInline` | first `maxInline − 1` | remaining |

Example at ≥ `sm` with default `maxInline: 3`:

- 2 items → 2 inline, no dropdown
- 3 items → 3 inline, no dropdown
- 4 items → 2 inline + 2 in dropdown
- 5 items → 2 inline + 3 in dropdown

Below `sm` the component auto-collapses into the dropdown (equivalent to `forceDropdown`) and the trailing caret is hidden.

### Counter

- Hidden when `counter` is `undefined`.
- Default template comes from `sActionsGroup.selected` (e.g. `"{n} selected"` in English). Override via `counterLabel` (supports `{n}`) or set `hideCounterLabel` to render the number only.
- Rendered as a `<span class="text-sm font-medium text-primary-900">` at the start of the flex row (left side).

### Small viewport

Uses `@vueuse/core`'s `useBreakpoints(breakpointsTailwind).smaller("sm")`.

- **Auto-collapse**: below the `sm` breakpoint (640px) every item is rendered inside the dropdown, regardless of `maxInline` or `forceDropdown`.
- **Caret hidden**: at the same breakpoint the dropdown's trailing caret is omitted. The leading dots icon and label remain.
- `hideCaret: true` hides the caret at any breakpoint (but does not force auto-collapse).
- A user-supplied `dropdownButtonProps.trailingIcon` always wins (no auto-hiding).

### Dropdown items

Inline `ActionItem`s are mapped to `DropdownMenuItem` by preserving `label`, `icon` (or `leadingIcon`), `disabled`, `loading`, `color`, `to`, `target`, and wrapping `onClick` as `onSelect`. `variant` and `size` are intentionally dropped — dropdown items follow the native Nuxt UI dropdown styling.

Per-item `tooltip` is carried through via the `#item-label` slot and rendered with `UTooltip`. Default side is `right` so the popover renders outside the menu panel.

---

## Locale

Keys live under `sActionsGroup` in `app/types/locale.ts`:

```ts
sActionsGroup: {
	actions: string    // default trigger label when no dropdownButtonProps.label
	selected: string   // counter template, e.g. "{n} selected"
}
```

Translations provided in `app/locale/{en,it,de,es,fr}.ts`. Runtime overrides via the `locale` prop or inline `counterLabel` / `dropdownButtonProps.label`.

---

## Architecture

```
<div role="toolbar">
  └── <span> counter (optional)
  ├── UTooltip? → UButton  (inline item 1)
  ├── UTooltip? → UButton  (inline item 2…)
  └── UDropdownMenu (if overflow or forceDropdown)
        └── UTooltip? → UButton  (dropdown trigger)
```

---

## File Structure

```
app/components/ActionsGroup/
├── SActionsGroup.vue   # Main component
└── types.ts            # ActionItem, ActionsGroupLocale, ActionsGroupUi, SActionsGroupProps
```

---

## Related

- `SMoreActions` — per-row/table overflow actions. Ghost icon-only trigger, `DropdownMenuItem`-driven. Different use case: row-level dense controls. See `app/components/MoreActions/SMoreActions.vue`.
