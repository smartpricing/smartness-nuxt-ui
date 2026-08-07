# `USelect` / `USelectMenu` — item objects do not forward `data-*` to the DOM

## Summary

A `data-*` key placed in a `USelectMenu` items array type-checks and never renders. The internal `ComboboxItem` binds a fixed set of props and ignores everything else on the item object.

This is inconsistent with sibling components: `UDropdownMenu`, `UContextMenu`, and `UNavigationMenu` all forward item `data-*` keys to the rendered element.

## Versions

`@nuxt/ui@4.7.1`, `reka-ui@2.9.6`.

## Impact

Options cannot be identified at the place they are defined. Consumers must reach for a slot purely to attach an identifier, which moves the identifier away from the data it belongs to and forces them to re-render the label by hand.

The inconsistency is the real cost: the same key works on a dropdown item and silently does nothing on a select item, with nothing in the types or the DOM to explain the difference.

## Root cause

`src/runtime/components/SelectMenu.vue` (`dist/runtime/components/SelectMenu.vue:277`); `Select.vue` has the same shape with `SelectItem`.

```vue
<ComboboxItem
	v-else
	data-slot="item"
	:class="ui.item({ … })"
	:disabled="isSelectItem(item) && item.disabled"
	:value="props.valueKey && isSelectItem(item) ? get(item, props.valueKey) : item"
	@select="onSelect($event, item)"
>
```

Only `class`, `disabled`, and `value` are read from the item. There is no `v-bind` of the remaining keys.

Compare `src/runtime/utils/link.ts`, which `UNavigationMenu` uses, where the opposite choice is made explicitly:

```ts
const dataKeys = keys.filter(key => key.startsWith('data-'))
const propsToInclude = [...linkKeys, ...ariaKeys, ...dataKeys]
```

`UNavigationMenu` deliberately whitelists every `data-` and `aria-` key. `USelectMenu` has no equivalent.

## Repro

```vue
<USelectMenu
	:items="[{ label: 'Italy', value: 'IT', 'data-testid': 'country-option' }]"
	label-key="label"
/>
```

The rendered option carries no `data-testid`. The item type accepts the key because `SelectItem` has an open index signature, so nothing flags it at author time either.

## Workaround

Use the `#item-label` slot and re-render the label:

```vue
<USelectMenu :items="options" label-key="label" data-testid="country-select">
	<template #item-label="{ item }">
		<span data-testid="country-select-item" :data-test-value="item.value">
			{{ item.label }}
		</span>
	</template>
</USelectMenu>
```

Works, including with `virtualize`. Two costs: the identifier lands on a `span` inside the option rather than on the option element itself, and the consumer must remember which key `label-key` points at in order to reproduce the default rendering.

## Proposed fix

Forward the item's `data-*` and `aria-*` keys onto `ComboboxItem` / `SelectItem`, reusing the filter that `pickLinkProps` already applies:

```vue
<ComboboxItem
	v-bind="pickDataAttrs(item)"
	data-slot="item"
	…
>
```

Binding the picked attributes **first** keeps the component's own `data-slot` and state attributes authoritative.

This makes item-driven components behave the same way across the library, which is the outcome worth having: today the answer to "can I put a `data-testid` in the item object?" is *it depends on the component*, with no way to tell but reading the source.

## Upstream status

Not yet reported. Worth taking upstream together with the same issue in `UTabs` — see [`nuxt-ui-tabs-item-passthrough.md`](nuxt-ui-tabs-item-passthrough.md).
