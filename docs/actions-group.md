# SActionsGroup — Design Specification

## Overview

A bulk-action toolbar placed above a list of items (table, cards, checkbox group). Renders **secondary actions** as outline buttons on the left and an **optional single primary action** on the right, both wrapped in a violet pill background. Overflowing secondaries collapse into a primary dropdown; a counter and a disabled-hint state cover the no-selection case. Built from `UButton` + `UDropdownMenu` + `UTooltip`.

**Component**: `SActionsGroup`
**Directory**: `app/components/ActionsGroup/SActionsGroup.vue`
**Types**: `app/components/ActionsGroup/types.ts`

---

## Data Structure

```ts
import type { ButtonProps, TooltipProps } from "@nuxt/ui";

// Secondary actions: variant is enforced to `outline`; color is selectable.
type ActionItem = Omit<ButtonProps, "variant"> & {
	tooltip?: string | TooltipProps
}

// The primary action: variant is enforced to `solid`, color to `primary`.
type PrimaryAction = Omit<ButtonProps, "variant" | "color"> & {
	tooltip?: string | TooltipProps
}
```

Both accept the rest of the Nuxt UI button API (label, icon, size, disabled, loading, `to`, `onClick`, etc.). Tooltips render on inline buttons; when an item overflows into the dropdown, its tooltip is carried through onto the menu entry.

---

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `items` | `ActionItem[]` | **required** | Secondary actions. Outline buttons on the left. |
| `primaryAction` | `PrimaryAction` | — | Optional single primary action, rendered solid/primary on the far right. |
| `size` | `ButtonProps["size"]` | `"sm"` | Component-wide button size, applied uniformly to every button (secondaries, primary, dropdown trigger). Per-item `size` is intentionally not allowed. |
| `forceDropdown` | `boolean` | `false` | Collapse every action — including the primary — into the dropdown. Use this when the toolbar would otherwise overflow its container. |
| `counter` | `number` | — | Selected items count. Renders a label to the left of the group; omit to hide. |
| `disabledHint` | `string \| TooltipProps` | — | When set, render the trigger as disabled with this tooltip. Use in the no-selection state. |
| `hideCaret` | `boolean` | `false` | Force-hide the dropdown caret. Automatic below `sm` (640px). |
| `dropdownButtonProps` | `ButtonProps` | see below | Overrides for the dropdown trigger button. |
| `dropdownTooltip` | `string \| TooltipProps` | — | Tooltip on the dropdown trigger (when overflow is active). |
| `dropdownMenuProps` | `Partial<DropdownMenuProps>` | `{ content: { side: "bottom", align: "end" } }` | Forwarded to `UDropdownMenu`. The dropdown opens **bottom-right** by default; override `content.side` / `content.align` to change. |
| `labels` | `ActionsGroupLabels` | `sActionsGroup.*` | i18n key overrides. `labels.actions` (default `sActionsGroup.actions`) and `labels.selected` (default `sActionsGroup.selected`) point at locale paths resolved via `t()`. |
| `ui` | `ActionsGroupUi` | — | Class overrides for internal slots. |

### UI Slots

```ts
ui?: {
	root?: ClassNameValue         // outer flex wrapper
	counter?: ClassNameValue      // counter text
	button?: ClassNameValue       // each inline secondary UButton
	primary?: ClassNameValue      // primary UButton
	dropdown?: ClassNameValue     // dropdown trigger UButton
	dropdownMenu?: ClassNameValue // UDropdownMenu root
}
```

---

## Visual

The toolbar carries a violet (`#ececff`) **pill background**, painted as a CSS `outline` so it never expands the buttons' bounding box or shifts surrounding spacing.

The pill is rendered **only when at least one row is selected** (`counter > 0`). With no selection — including the `disabledHint` state — the toolbar is rendered transparent, so the surrounding list chrome looks unchanged until the user actually has something to act on.

```
inline-flex items-center justify-end gap-2 rounded
bg-[#ececff]                  // applied only when counter > 0
outline-4 outline-[#ececff]   // applied only when counter > 0
```

Override via `ui.root` if a different framing (or none) is required.

## Button variants

Exactly **one solid button** is shown at a time. Specifically:

- **Secondary actions (`items`)** are always rendered as `variant: "outline"`. Consumers pick `color` (e.g. `neutral`, `error`).
- **Primary action (`primaryAction`)** is always rendered as `variant: "solid", color: "primary"`, on the far right.
- **Dropdown trigger** automatically switches between:
  - `variant: "solid", color: "primary"` — when there is no inline primary action (i.e. it *is* the primary affordance).
  - `variant: "outline", color: "primary"` — when an inline `primaryAction` is present (so the trigger doesn't compete with it).
  - `variant: "soft"` + `disabled` — when `disabledHint` is set.

Consumers can still override the trigger via `dropdownButtonProps`, but the defaults guarantee that — without any overrides — a single `SActionsGroup` instance renders **at most one solid button**.

---

## Defaults

### Dropdown trigger button

```ts
{
	color: "primary",
	variant: "solid",                      // "soft" + disabled when `disabledHint` is set
	label: t("sActionsGroup.actions"),     // "Actions"
	icon: "ph:dots-three-vertical-bold",
	trailingIcon: "ph:caret-down-bold"     // hidden when hideCaret || < sm || disabledHint
}
```

Merge `dropdownButtonProps` to override.

### Tooltip default sides

- **Per-item tooltip, inline button**: `top`
- **Per-item tooltip, dropdown menu entry**: `right` (so it escapes the menu panel)
- **Dropdown trigger tooltip / disabled-hint tooltip / primary tooltip**: `top`

All accept a plain string (→ `{ text, content: { side } }`) or a full `TooltipProps` object. A provided `content.side` always wins over the default.

---

## Behavior

### Inline / overflow rule

The split is **all-or-nothing** — either every action is inline, or every action is inside the dropdown. The dropdown trigger only appears when the menu would actually contain something.

| Condition | Inline | Dropdown |
|-----------|--------|----------|
| `disabledHint` set | — | trigger only (disabled) |
| Viewport `< sm` (640px) | — | all `items` + `primaryAction` |
| `forceDropdown === true` | — | all `items` + `primaryAction` |
| Otherwise | all `items` + `primaryAction` (right) | — |

When everything collapses, the dropdown items follow the original left-to-right order, with the primary appended last so the menu reads in the same scanning direction. The decision of *when* to set `forceDropdown` is left to the consumer — there's no automatic count-based collapse.

### Counter

- Hidden when `counter` is `undefined`.
- Template comes from the `sActionsGroup.selected` i18n key (e.g. `"{n} selected"` in English), interpolated via `t()`. Point `labels.selected` at a different locale path to swap per-instance.
- Rendered as a `<span class="text-sm font-medium text-primary-900">` at the start of the flex row.

### Disabled-hint state

When `disabledHint` is provided, the no-selection state is rendered:

- Only the dropdown trigger is shown (no secondaries, no primary).
- The trigger is `disabled` with `variant: "soft"` so it reads as inert.
- The `disabledHint` value is shown as a tooltip on hover.
- Caret is omitted.

```vue
<SActionsGroup
	:items="[]"
	disabled-hint="Select rows in the table to run actions"
/>
```

### Small viewport

Uses `@vueuse/core`'s `useBreakpoints(breakpointsTailwind).smaller("sm")`.

- **Auto-collapse**: below 640px every action is rendered inside the dropdown, regardless of `maxInline` or `forceDropdown`.
- **Caret hidden**: at the same breakpoint the trailing caret is omitted.
- `hideCaret: true` hides the caret at any breakpoint without forcing collapse.
- A user-supplied `dropdownButtonProps.trailingIcon` always wins.

### Dropdown items

Inline `ActionItem`s and the `primaryAction` (when collapsed) are mapped to `DropdownMenuItem` by preserving `label`, `icon` (or `leadingIcon`), `disabled`, `loading`, `color`, `to`, `target`, and wrapping `onClick` as `onSelect`. `variant` and `size` are dropped — dropdown items follow native Nuxt UI styling.

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

Translations provided in `app/locale/{en,it,de,es,fr}.ts`. Per-instance, `labels.actions` and `labels.selected` can point at different i18n keys (in your app's locale) — both are resolved through `t()`.

---

## Architecture

```
<div role="toolbar">             // pill-bg, outline-4 (layout-neutral)
  ├── <span> counter (optional)
  ├── UTooltip? → UButton  (inline secondary, variant: outline)
  ├── UTooltip? → UButton  (inline secondary…)
  ├── UDropdownMenu? (overflow / forceDropdown / disabledHint)
  │     └── UTooltip? → UButton  (dropdown trigger)
  └── UTooltip? → UButton  (primary, variant: solid, color: primary)
```

---

## File Structure

```
app/components/ActionsGroup/
├── SActionsGroup.vue   # Main component
└── types.ts            # ActionItem, PrimaryAction, ActionsGroupLabels, ActionsGroupUi, SActionsGroupProps
```

---

## Migration (from pre-`primaryAction` API)

Earlier versions accepted a single flat `items: ActionItem[]` where `variant` and `color` were free-form. The current API enforces a stricter contract:

- Move the solid/primary action out of `items` into the new `primaryAction` prop.
- Drop `variant` from secondary items (it is forced to `outline`).
- Use `disabledHint` instead of manually constructing `forceDropdown + dropdownButtonProps:{ disabled: true } + dropdownTooltip` for the no-selection state.

Before:

```vue
<SActionsGroup :items="[
	{ label: 'Edit', icon: 'ph:pencil', variant: 'outline', color: 'neutral' },
	{ label: 'Apply', icon: 'ph:check', variant: 'solid', color: 'primary' }
]" />
```

After:

```vue
<SActionsGroup
	:items="[{ label: 'Edit', icon: 'ph:pencil', color: 'neutral' }]"
	:primary-action="{ label: 'Apply', icon: 'ph:check' }"
/>
```

---

## Related

- `SMoreActions` — per-row/table overflow actions. Ghost icon-only trigger, `DropdownMenuItem`-driven. Different use case: row-level dense controls. See `app/components/MoreActions/SMoreActions.vue`.
