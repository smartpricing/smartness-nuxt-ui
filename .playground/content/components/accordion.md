---
title: Accordion
description: Single, always-collapsible disclosure panel rendered as a bordered card with an elevated header and a content slot. A restyled composition of UCard + UCollapsible + UButton.
category: element
prefix: S
componentName: Accordion
tags: [accordion, collapsible, disclosure, expand, collapse, card, panel]
subcomponents: []
---

# SAccordion

`SAccordion` is a **single, always-collapsible** disclosure panel: a bordered card with an elevated header (label + chevron) and a slot for the body content. It is intentionally *not* a stacked accordion — for one expandable panel only.

It is composed of design-system primitives rather than custom markup:

- **`UCard`** (outline) provides the bordered, rounded, `overflow-hidden` card chrome.
- **`UCollapsible`** provides the open/close state and the height animation.
- **`UButton`** (`block`, `color="neutral"`, `variant="ghost"`) is the header trigger, restyled flat (`bg-elevated`) with a chevron that rotates on open.

## Quick example

```vue
<SAccordion label="4 periods selected">
	<div class="space-y-3">
		<div v-for="period in periods" :key="period">{{ period }}</div>
	</div>
</SAccordion>
```

## Open by default (uncontrolled)

```vue
<SAccordion label="Summary" default-open>
	<p>Visible on load.</p>
</SAccordion>
```

## Controlled state

```vue
<SAccordion v-model:open="open" label="Filters">
	<!-- ... -->
</SAccordion>
```

## With a leading icon

```vue
<SAccordion label="Schedule" icon="ph:calendar">
	<!-- ... -->
</SAccordion>
```

## Custom header via slot

```vue
<SAccordion>
	<template #label>
		<span class="flex items-center gap-2">
			Periods <UBadge>4</UBadge>
		</span>
	</template>

	<!-- body -->
</SAccordion>
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

- Always single — there is no `items`/`type`/`multiple` concept. For a stacked set of panels use Nuxt UI `UAccordion` directly.
- The divider between header and body is a static `border-t border-default` on the body, revealed cleanly as the panel animates open (no flicker).
- Header styling and disabled state are scoped to the component, so it does **not** globally restyle `UCollapsible`/`UButton` in consumer apps.
