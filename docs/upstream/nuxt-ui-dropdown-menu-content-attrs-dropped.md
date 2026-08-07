# `UDropdownMenu` / `UContextMenu`: the `content` prop drops unknown attributes

## Summary

`UModal`, `USlideover`, `UPopover`, `UTooltip` and `USelectMenu` all accept arbitrary attributes inside their `content` prop and render them on the panel element. `UDropdownMenu` and `UContextMenu` accept the same shape, type-check it, and render nothing: the panel comes out with no `data-testid`, and no warning is emitted.

The inconsistency is what makes it a bug rather than a limitation. Every other overlay in the library treats `content` as "props for the panel"; these two treat it as "positioning options only", and nothing in the types or the docs says so.

## Versions

- `@nuxt/ui` 4.7.1
- `reka-ui` 2.6.x

## Impact

Writing an end-to-end test against an open menu means naming the panel — to scope a query inside it, or to assert it opened at all. Today that is impossible through the documented channel, and the failure is silent: the attribute is written, the menu renders, and the selector matches nothing.

The two workarounds both cost something. `[role="menu"]` is not unique when two menus can be open. Rendering a marker through `#content-top` puts an empty element in the accessibility tree of every menu that needs a test.

## Root cause

`UModal` binds the prop straight onto the panel:

```js
// Modal.vue:42
const contentProps = toRef(() => props.content);
// …bound on DialogContent, so every key lands on the element
```

`UDropdownMenu` instead forwards the prop to an intermediate component:

```js
// DropdownMenu.vue:42
const contentProps = toRef(() => defu(props.content, { side: "bottom", sideOffset: 8, collisionPadding: 8 }));
```

```vue
<!-- DropdownMenu.vue:56-61 -->
<UDropdownMenuContent
  …
  v-bind="contentProps"
```

`UDropdownMenuContent` then rebuilds its own `contentProps` from its **declared props only**:

```js
// DropdownMenuContent.vue:77
const contentProps = useForwardPropsEmits(
  reactiveOmit(props, "sub", "items", "portal", "labelKey", /* … */ "class", "ui", "uiOverride"),
  emits
);
```

`data-testid` is not a declared prop of `UDropdownMenuContent`, so `reactiveOmit(props, …)` never sees it. What is left of it is a fallthrough attribute on `UDropdownMenuContent`, whose own root is `DropdownMenu.Portal` — a renderless component — so it has no element to land on and is discarded.

`UContextMenu` has the same shape via `ContextMenuContent.vue:54`.

## Repro

```vue
<UDropdownMenu
  :items="[[{ label: 'Duplicate' }]]"
  :content="{ 'data-testid': 'actions-menu' }"
>
  <UButton label="Actions" />
</UDropdownMenu>
```

Open the menu. `document.querySelectorAll('[data-testid="actions-menu"]')` is empty. The same prop on a `UModal` returns the panel.

## Workaround

Render a marker inside the panel through the `content-top` slot:

```vue
<UDropdownMenu :items="items">
  <UButton label="Actions" :data-testid="ids.actionsButton" />

  <template #content-top>
    <span class="sr-only" :data-testid="ids.actionsMenu" />
  </template>
</UDropdownMenu>
```

Or scope on `[role="menu"]`, accepting that it is ambiguous when more than one menu can be open.

## Proposed fix

Merge the caller's `content` object into what `UDropdownMenuContent` binds onto `DropdownMenu.Content`, rather than reconstructing it from declared props. Passing the raw object down as a dedicated prop — the way `UModal` keeps it — is the smaller change and makes the two families consistent.

## Upstream status

Not yet reported. Belongs with the `UModal` / `USlideover` / `UPopover` family: same class of failure (a fragment or renderless root eating attributes), and a reviewer looking at one will want to see the others.
