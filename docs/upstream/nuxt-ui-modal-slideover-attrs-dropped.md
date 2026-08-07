# `UModal` / `USlideover` — attributes on the component are silently dropped

## Summary

`<UModal data-testid="x">` compiles, renders, and the attribute never appears in the DOM. No warning, no error. The same holds for `USlideover`, and for any fallthrough attribute — `id`, `aria-*`, `data-*`.

The failure is silent, which makes it worse than a missing feature: the attribute *looks* applied at the call site.

## Versions

`@nuxt/ui@4.7.1`, `reka-ui@2.9.6`.

## Impact

Dialogs and slideovers cannot be marked the way every other component in the library is marked. Consumers discover this only when a test fails to find an element they believe they tagged.

The library's own documentation reinforces the wrong expectation by describing the dialog's identity as living on its root element.

## Root cause

`src/runtime/components/Modal.vue` (`dist/runtime/components/Modal.vue:68`), same shape in `Slideover.vue:75`.

The component's template root is `DialogRoot`:

```vue
<template>
	<DialogRoot v-slot="{ open, close }" v-bind="rootProps">
		<DefineContentTemplate>
			<DialogContent … v-bind="contentProps">
```

`DialogRoot` is renderless — `reka-ui/dist/Dialog/DialogRoot.js` ends in `renderSlot(_ctx.$slots, "default", …)` and renders no element of its own. Its slot then yields several siblings (the reusable template definition, the optional trigger, the portal), so the component resolves to a **fragment**.

Vue cannot apply fallthrough attributes to a multi-root component, so they are discarded. `inheritAttrs` is not set to `false` here, which is precisely why nothing warns: the component never opts out, it simply has nowhere to put them.

## Repro

```vue
<UModal data-testid="confirm-modal" title="Delete">
	<UButton label="Open" />
</UModal>
```

Open the modal and inspect the dialog element: no `data-testid` anywhere in the rendered tree.

## Workaround

Pass attributes through the `content` prop, which is bound onto `DialogContent`:

```vue
<UModal :content="{ 'data-testid': 'confirm-modal' }" title="Delete">
```

TypeScript rejects this without augmentation, because `content` is typed as `Omit<DialogContentProps, 'as' | 'asChild' | 'forceMount'>` and `DialogContentProps` has no index signature. Consumers need:

```ts
declare module "#ui/types" {
	interface ModalProps {
		content?: { [key: `data-${string}`]: string }
	}
}
```

It works at runtime regardless — `v-bind="contentProps"` forwards whatever it is given.

## Proposed fix

Either of these would remove the trap; the first is the smaller change.

1. **Forward `$attrs` to `DialogContent`.** Set `inheritAttrs: false` on the component and add `v-bind="$attrs"` to `DialogContent`, so a plain attribute on the component lands on the dialog — which is where a consumer expects it. This is the pattern `UBanner` already uses (`inheritAttrs: false` plus `v-bind="{ to, target, ...$attrs }"` on its root), so it is consistent with the library's own precedent.

2. **Warn instead of dropping.** If the fragment root is deliberate, at least make the failure loud in development, and document `content` as the supported channel.

Whichever is chosen, `DialogContentProps` gaining a `data-*` index signature upstream in Reka UI would remove the need for consumer-side type augmentation.

## Upstream status

Not yet reported.
