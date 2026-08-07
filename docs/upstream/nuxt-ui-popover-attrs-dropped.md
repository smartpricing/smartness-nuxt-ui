# `UPopover` — fallthrough attributes are silently dropped

## Summary

A `data-testid` (or any attribute) placed on `<UPopover>` never reaches the DOM. The component does not set `inheritAttrs: false`, and its root renders a fragment, so Vue discards `$attrs` with a dev-only warning.

Same symptom and same family as [`UModal` / `USlideover`](nuxt-ui-modal-slideover-attrs-dropped.md). Reported separately because the fix target differs: there the content is teleported, here the trigger is rendered in place and could receive the attributes.

## Versions

`@nuxt/ui@4.7.1`, `reka-ui@2.9.6`.

## Impact

Every component built on `UPopover` inherits the defect, including our own `SMultiSelect`, whose root is a `UPopover`. The trigger button — the only element a test can click — cannot be identified at all: not by fallthrough, not by `ui.trigger` (a `ClassNameValue`, classes only), not by a forwarding prop.

The contrast with `USelect` makes this sharp: `USelect` sets `inheritAttrs: false` and binds `$attrs` to its `SelectTrigger` (`dist/runtime/components/Select.vue:22,177`), so an attribute on the component lands on `<button role="combobox">`. Two components with the same apparent API behave differently.

## Root cause

`src/runtime/components/Popover.vue` (`dist/runtime/components/Popover.vue:63-77`).

```vue
<Component.Root v-slot="{ open, close }" v-bind="rootProps">
	<Component.Trigger v-if="!!slots.default || !!reference" as-child :reference="reference" :class="props.class">
		<slot :open="open" :close="close" />
	</Component.Trigger>
	...
	<Component.Portal v-bind="portalProps">
		...
	</Component.Portal>
</Component.Root>
```

Two things combine:

1. The component declares no `inheritAttrs: false`, so Vue attempts automatic fallthrough.
2. `Component.Root` is `PopoverRoot`, which delegates to `PopperRoot` — a pure `renderSlot` with no host element (`dist/Popper/PopperRoot.js:2,16`). Its slot holds two or more nodes (`Trigger` plus `Portal`), so the component's rendered output is a fragment.

Vue cannot attach fallthrough attributes to a fragment, so it drops them. The warning appears only in development builds; in production the attribute vanishes with no signal at all.

Note that `props.class` **is** forwarded to the trigger (`Popover.vue:64`) — so a class reaches the trigger while a `data-*` attribute does not.

## Repro

```vue
<UPopover data-testid="filters">
	<UButton label="Filters" />
	<template #content>…</template>
</UPopover>
```

No element in the document carries `data-testid="filters"`.

## Workaround

Mark inside the default slot, on the element that becomes the trigger:

```vue
<UPopover>
	<UButton label="Filters" data-testid="filters-trigger" />
	<template #content>…</template>
</UPopover>
```

For components that wrap `UPopover` and expose a `#trigger` slot — as our `SMultiSelect` does — the consumer must override that slot purely to attach an identifier, which means reimplementing the default trigger.

## Proposed fix

Set `inheritAttrs: false` and bind `$attrs` onto `Component.Trigger`, alongside the `:class` already forwarded there:

```vue
<Component.Trigger v-if="…" as-child :reference="reference" :class="props.class" v-bind="$attrs">
```

The trigger is the right target: it is the interactive element, it is rendered in place rather than teleported, and it is already the node that receives `props.class`. This also aligns `UPopover` with `USelect`, which binds `$attrs` to its trigger for the same reason.

Consumers that need to mark the *panel* rather than the trigger already have `:content` / the `content` slot, so no second binding is required.

## Upstream status

Not yet reported.
