---
title: useTableHeight
description: Caps a table's height to the space left in the viewport so a sticky header stays pinned and only the body scrolls. Pair with `<UTable sticky :style="{ maxHeight }">`.
name: useTableHeight
tags: [table, height, sticky, scroll, viewport, pagination]
---

# useTableHeight

Caps a table's height to the viewport space below it, so a `sticky` header stays pinned while only the body scrolls — and any footer (pagination, action bar) stays anchored in view. This is the standard list pattern in the PMS app.

## Quick example

```vue
<template>
	<UCard ref="wrapper">
		<UTable sticky :style="{ maxHeight }" :data="rows" :columns="columns" />
	</UCard>
</template>

<script lang="ts" setup>
	const wrapper = useTemplateRef("wrapper");
	const { maxHeight } = useTableHeight(wrapper);
</script>
```

## Signature

```ts
useTableHeight(
	target: MaybeComputedElementRef,
	options?: { bottomOffset?: string }
): { maxHeight: ComputedRef<string> }
```

- `target` — ref to the table's wrapper element. A `UCard` component ref works; component refs are unwrapped to their `$el`.
- `bottomOffset` — space reserved below the table for a pagination footer / action bar. Default `"5rem"`.

## How it works

`maxHeight` is `calc(100dvh - top - bottomOffset)`, where `top` comes from `useElementBounding(target, { windowScroll: false })` — the wrapper's distance from the top of the viewport.

`windowScroll: false` is important: without it `top` shrinks as the page scrolls, `maxHeight` grows, and the table "follows" the viewport instead of letting the page scroll past it.

## Notes

- Short tables stay content-sized; only long tables hit the cap and scroll their body internally.
- Pair with `<UTable sticky>` — the header needs a bounded scroll container to stick against.
- Auto-imported in any project extending the layer (`app/composables/table.ts`).
