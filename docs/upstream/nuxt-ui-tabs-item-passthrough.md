# `UTabs` — item objects do not forward `data-*` to the rendered trigger

## Summary

A `data-*` key on a `UTabs` item never reaches the rendered trigger. `TabsTrigger` binds a fixed set of props from the item and ignores the rest.

Same root cause and same inconsistency as [`USelect` / `USelectMenu`](nuxt-ui-select-menu-item-passthrough.md): `UDropdownMenu`, `UContextMenu`, and `UNavigationMenu` all forward item `data-*` keys.

## Versions

`@nuxt/ui@4.7.1`, `reka-ui@2.9.6`.

## Impact

Tab triggers cannot be identified where they are defined. Since tabs are a small, fixed set known at build time, this is exactly the case where marking at the definition site would be most natural — and it is the one that requires a slot.

## Root cause

`src/runtime/components/Tabs.vue` (`dist/runtime/components/Tabs.vue:68`).

```vue
<TabsTrigger
	v-for="(item, index) of items"
	:key="get(item, props.valueKey) ?? index"
	:ref="(el) => setTriggerRef(index, el)"
	:value="get(item, props.valueKey) ?? String(index)"
	:disabled="item.disabled"
	data-slot="trigger"
	:class="ui.trigger({ class: [uiProp?.trigger, item.ui?.trigger] })"
>
```

Only `value`, `disabled`, `ui.trigger`, and `class` are read from the item. Nothing else on the object is bound.

## Repro

```vue
<UTabs :items="[{ label: 'Overview', value: 'overview', 'data-testid': 'tab-overview' }]" />
```

The rendered trigger carries no `data-testid`.

## Workaround

Use the `#default` slot, which receives the item:

```vue
<UTabs :items="tabItems" data-testid="section-tabs">
	<template #default="{ item }">
		<span data-testid="section-tabs-item" :data-test-value="item.value">
			{{ item.label }}
		</span>
	</template>
</UTabs>
```

The identifier lands on a `span` inside the trigger, not on the trigger element itself — so a test locates the span and must click it or walk up to the button, depending on what the assertion needs.

## Proposed fix

Same as for `USelectMenu`: forward the item's `data-*` and `aria-*` keys onto `TabsTrigger`, using the filter `pickLinkProps` already applies in `src/runtime/utils/link.ts`, bound before the component's own `data-slot` so the library's attributes stay authoritative.

Fixing `UTabs` and `USelectMenu` in one PR is the coherent change: it makes "put a `data-*` key in the item object" work uniformly across every item-driven component in the library, instead of on three of them.

## Upstream status

Not yet reported.
