---
title: Accordion
description: Restyled UAccordion rendering stacked collapsible cards with an elevated header, a white body, and a per-item selected state that tints the header with the secondary color.
category: element
prefix: S
componentName: Accordion
tags: [accordion, collapsible, disclosure, expand, collapse, card, selected, multiple]
subcomponents: []
---

# SAccordion

> **Renamed** — the previous `SAccordion` (single disclosure card) is now `SCollapsible`. This component is the true multi-item accordion.

`SAccordion` is a thin wrapper around Nuxt UI's **`UAccordion`** that restyles each item as a **card**: rounded border, elevated gray header that darkens on hover, and a white padded body. Items accept an extra `selected: boolean` field that tints the header with the light secondary color (also darkening on hover).

It exists as a wrapper (instead of an `app.config.ts` variant) because `UAccordion` has no `variant` prop — its theme only receives `disabled` — so a custom variant could never be activated. The wrapper keeps `UAccordion` untouched globally: plain `UAccordion` keeps its default Nuxt UI look.

## Quick example

```vue
<script setup lang="ts">
// SAccordionItem = AccordionItem & { selected?: boolean }
const items: SAccordionItem[] = [
	{ label: "Rooms", value: "rooms", content: "Configure room types and amenities." },
	{ label: "Payments", value: "payments", content: "Payment providers and invoicing.", selected: true }
];
</script>

<template>
	<SAccordion :items="items" />
</template>
```

## Multiple open items

```vue
<SAccordion :items="items" type="multiple" :default-value="['rooms', 'payments']" />
```

## Controlled

```vue
<SAccordion v-model="expanded" :items="items" />
<!-- expanded: string for type="single", string[] for type="multiple" -->
```

## Selected state

`selected: true` on an item recolors its header: `bg-secondary-50`, darkening to `bg-secondary-100` on hover (the unselected header is `bg-elevated`, darkening to `bg-accented`). Selection is an app-level concept — the component only renders it; toggle it from your own state:

```ts
const items = computed<SAccordionItem[]>(() => sections.map((s) => ({
	...s,
	selected: selectedIds.value.includes(s.value)
})));
```

## Custom header and body (slots)

All `UAccordion` slots pass through: `#leading`, `#default`, `#trailing`, `#content`, `#body`, plus per-item `#{item.slot}` / `#{item.slot}-body`.

```vue
<SAccordion :items="items" type="multiple">
	<template #default="{ item }">
		<span class="flex flex-col text-start min-w-0">
			<span class="font-semibold text-highlighted">{{ item.label }}</span>
			<span class="text-sm font-normal text-muted">{{ item.description }}</span>
		</span>
	</template>

	<template #trailing="{ item }">
		<span class="ms-auto flex items-center gap-3">
			<UBadge color="warning" variant="soft">{{ item.badge }}</UBadge>
			<UIcon
				name="ph:caret-down"
				class="size-5 shrink-0 transition-transform duration-200 group-data-[state=open]:rotate-180"
			/>
		</span>
	</template>

	<template #body="{ item }">
		<!-- white padded card body -->
	</template>
</SAccordion>
```

> The whole header is an `AccordionTrigger` **button** — do not nest interactive buttons inside header slots. Use non-interactive elements (icons, badges), or stop propagation deliberately if you must.

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `items` | `SAccordionItem[]` | — | `AccordionItem` plus `selected?: boolean` to tint the item header. |
| `type` | `'single' \| 'multiple'` | `'single'` | Whether one or multiple items can be open at the same time. |
| `collapsible` | `boolean` | `true` | When `type` is `'single'`, whether the open item can be collapsed. |
| `defaultValue` | `string \| string[]` | — | Value(s) expanded on load (uncontrolled). Ignored when `v-model` is bound. |
| `disabled` | `boolean` | `false` | Disable the whole accordion (per-item via `item.disabled`). |
| `unmountOnHide` | `boolean` | `true` | Unmount item bodies when collapsed. |
| `trailingIcon` | `string` | `appConfig.ui.icons.chevronDown` | Trailing chevron icon (rotates 180° when open). |
| `ui` | `AccordionProps["ui"]` | — | Class overrides for the underlying `UAccordion` slots (tailwind-merged). |
| `v-model` | `string \| string[]` | — | Controlled expanded value(s). |

Per-item overrides also pass through: `item.ui` (slot classes for that item), `item.class`, `item.icon`, `item.trailingIcon`, `item.slot`, `item.disabled`.

## Notes

- Root lays out items as separated cards (`flex flex-col gap-3`) instead of the default divided list.
- Each item is `rounded-lg border border-default bg-default overflow-hidden`; the body adds `p-4 border-t border-default`.
- Hover darkening only applies to enabled triggers (`enabled:hover:*`), so disabled items don't react.
- For a single standalone panel prefer `SCollapsible`.
