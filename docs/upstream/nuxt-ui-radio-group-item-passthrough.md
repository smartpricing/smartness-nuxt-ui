# `URadioGroup` — item objects do not forward `data-*`, but `UCheckboxGroup` does

## Summary

A `data-*` key on a `URadioGroup` item never reaches the rendered radio. The template reads a fixed set of keys from the item and ignores the rest.

Its sibling `UCheckboxGroup` — same shape of API, same kind of item array — spreads the whole item onto the rendered control, so the identical code works there. The two are inconsistent with each other.

Same family as [`UTabs`](nuxt-ui-tabs-item-passthrough.md) and [`USelect` / `USelectMenu`](nuxt-ui-select-menu-item-passthrough.md), but this one carries its own counter-example inside the library.

## Versions

`@nuxt/ui@4.7.1`, `reka-ui@2.9.6`.

## Impact

Individual radio options cannot be identified where they are defined. A test must locate the group and then walk down to an option by index or by label — index because Reka renders each option as `<button role="radio">` with no domain-stable hook of its own.

The asymmetry is the real cost: a developer who learns "put `data-testid` in the item object" from `UCheckboxGroup` writes the same code for `URadioGroup`, it compiles, it renders, and the attribute is not there. Nothing warns.

## Root cause

`src/runtime/components/RadioGroup.vue` (`dist/runtime/components/RadioGroup.vue:113-123`).

```vue
<component :is="variant === 'list' ? 'div' : Label" v-for="item in normalizedItems" :key="item.value" data-slot="item" :class="…">
	…
	<RRadioGroupItem
		:id="item.id"
		:value="item.value"
		…
	>
```

Only `id` and `value` (plus `disabled` and the `ui`/`class` keys) are read from the item. There is no `v-bind="item"`.

Compare `src/runtime/components/CheckboxGroup.vue` (`dist/runtime/components/CheckboxGroup.vue:114`):

```vue
<UCheckbox
	v-bind="{ ...item, ...checkboxProps }"
	…
>
```

The whole item is spread, so arbitrary `data-*` keys land on the checkbox.

## Repro

```vue
<URadioGroup :items="[{ label: 'Monthly', value: 'monthly', 'data-testid': 'plan-monthly' }]" />
<UCheckboxGroup :items="[{ label: 'Monthly', value: 'monthly', 'data-testid': 'plan-monthly' }]" />
```

The checkbox carries `data-testid`. The radio does not.

## Workaround

Address the option from the group, either by accessible name or by position:

```ts
page.getByTestId("billing-period").getByRole("radio", { name: "Monthly" });
```

Both are weaker than an identifier: the first couples the test to display copy (and breaks under translation), the second to render order.

## Proposed fix

Bind the item's `data-*` and `aria-*` keys onto `RRadioGroupItem`, using the same filter `pickLinkProps` applies in `src/runtime/utils/link.ts`, bound before the component's own `data-slot` so the library's attributes stay authoritative.

The narrower alternative — mirroring `UCheckboxGroup` with a plain `v-bind="{ ...item }"` — makes the two components consistent with the least change, at the cost of also forwarding `label` and `description` as attributes.

Fixing this together with `UTabs` and `USelectMenu` is the coherent change: it makes "put a `data-*` key in the item object" work uniformly across every item-driven component in the library.

## Upstream status

Not yet reported.
