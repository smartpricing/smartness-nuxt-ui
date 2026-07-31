---
title: Collapsible
description: Single, always-collapsible disclosure panel rendered as a bordered card with an elevated header and a content slot. A restyled composition of UCard + UCollapsible + UButton.
category: element
prefix: S
componentName: Collapsible
tags: [collapsible, disclosure, expand, collapse, card, panel]
subcomponents: []
---

# SCollapsible

> **Renamed** — this component was previously called `SAccordion`. The `SAccordion` name now belongs to the true multi-item accordion built on `UAccordion`.

`SCollapsible` is a **single, always-collapsible** disclosure panel: a bordered card with an elevated header (label + chevron) and a slot for the body content. It is intentionally *not* a stacked accordion — for one expandable panel only. For a stacked set of panels use `SAccordion`.

It is composed of design-system primitives rather than custom markup:

- **`UCard`** (outline) provides the bordered, rounded, `overflow-hidden` card chrome.
- **`UCollapsible`** provides the open/close state and the height animation.
- **`UButton`** (`block`, `color="neutral"`, `variant="ghost"`) is the header trigger, restyled flat (`bg-elevated`) with a chevron that rotates on open.

## Quick example

```vue
<SCollapsible label="4 periods selected">
	<div class="space-y-3">
		<div v-for="period in periods" :key="period">{{ period }}</div>
	</div>
</SCollapsible>
```

## Open by default (uncontrolled)

```vue
<SCollapsible label="Summary" default-open>
	<p>Visible on load.</p>
</SCollapsible>
```

## Controlled state

```vue
<SCollapsible v-model:open="open" label="Filters">
	<!-- ... -->
</SCollapsible>
```

## With a leading icon

```vue
<SCollapsible label="Schedule" icon="ph:calendar">
	<!-- ... -->
</SCollapsible>
```

## Custom header via slot

```vue
<SCollapsible>
	<template #label>
		<span class="flex items-center gap-2">
			Periods <UBadge>4</UBadge>
		</span>
	</template>

	<!-- body -->
</SCollapsible>
```

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `label` | `string` | — | Text shown in the trigger header. Overridden by the `#label` slot. |
| `icon` | `string` | — | Optional leading icon in the header. |
| `trailingIcon` | `string` | `"ph:caret-down"` | Trailing chevron icon (rotates 180° when open). |
| `defaultOpen` | `boolean` | `false` | Start expanded (uncontrolled). Ignored when `v-model:open` is bound. |
| `disabled` | `boolean` | `false` | Disable toggling. The header takes the disabled-select look (`primary-50` fill). |
| `unmountOnHide` | `boolean` | `true` | Unmount the body when collapsed. |
| `ui` | `{ root?, header?, content?, body? }` | — | Class overrides (tailwind-merged). |
| `v-model:open` | `boolean` | — | Controlled open state. |

## Slots

- **`default`** — the body content (shown when open).
- **`label`** — overrides the header text (`label` prop).

## Notes

- Always single — there is no `items`/`type`/`multiple` concept. For a stacked set of panels use `SAccordion`.
- The divider between header and body is a static `border-t border-default` on the body, revealed cleanly as the panel animates open (no flicker).
- Header styling and disabled state are scoped to the component, so it does **not** globally restyle `UCollapsible`/`UButton` in consumer apps.

## Migration from SAccordion (pre-rename)

Rename the tag — the API is unchanged:

```diff
- <SAccordion label="Filters" default-open>
+ <SCollapsible label="Filters" default-open>
```
