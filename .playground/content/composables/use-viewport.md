---
title: useViewport
description: Reactive viewport size with Tailwind's breakpoints as the single source of truth. Gives `isMobile` / `isTablet` / `isDesktop` plus the raw VueUse `breakpoints` object for any other threshold.
name: useViewport
tags: [viewport, breakpoints, responsive, mobile, tablet, desktop, media-query]
---

# useViewport

Tells you which viewport size class you're in, so responsive behaviour that CSS can't express — swapping a button row for a dropdown, hiding a tab bar, choosing a chart size — reads the *same* breakpoints as your `md:` / `lg:` utilities.

Tailwind is the source of truth: the layer does not override `--breakpoint-*`, so the scale is the default one (`sm` 640, `md` 768, `lg` 1024, `xl` 1280, `2xl` 1536) and the flags line up with the CSS prefixes.

## Quick example

```vue
<template>
	<UDropdownMenu v-if="isMobile" :items="actions">
		<UButton icon="ph:dots-three" variant="ghost" />
	</UDropdownMenu>
	<div v-else class="flex gap-2">
		<UButton v-for="action in actions" :key="action.label" v-bind="action" />
	</div>
</template>

<script lang="ts" setup>
	const { isMobile } = useViewport();
</script>
```

## Signature

```ts
useViewport(options?: UseBreakpointsOptions): {
	breakpoints: UseBreakpointReturn<"sm" | "md" | "lg" | "xl" | "2xl">,
	isMobile: ComputedRef<boolean>,
	isTablet: ComputedRef<boolean>,
	isDesktop: ComputedRef<boolean>
}
```

| Flag | Range | Equivalent |
|---|---|---|
| `isMobile` | `< 768px` | below `md:` |
| `isTablet` | `768px – 1023px` | `md:` up to `lg:` |
| `isDesktop` | `>= 1024px` | `lg:` and up |

`options` is VueUse's `UseBreakpointsOptions` (`strategy`, `ssrWidth`, `window`) and is forwarded untouched.

## Other thresholds

Don't hardcode a media query — reach for the returned `breakpoints`, which is VueUse's full [`useBreakpoints`](https://vueuse.org/core/useBreakpoints/) return: `smaller`, `smallerOrEqual`, `greater`, `greaterOrEqual`, `between`, `active()`, plus a ref per breakpoint name.

```ts
const { breakpoints } = useViewport();

const isNarrow = breakpoints.smaller("sm");      // < 640px
const isWide = breakpoints.greaterOrEqual("xl"); // >= 1280px
const current = breakpoints.active();            // "md" | "lg" | … | ""
```

## Notes

- Prefer CSS (`hidden md:flex`) whenever the difference is purely visual. Use this composable when the *component tree* has to change — a different component, a different prop, a value passed to a chart.
- Under SSR every query is `false` until hydration, so the server renders the "no flag set" branch. Pass `ssrWidth`, or call VueUse's `provideSSRWidth` once at app level, to render a specific width on the server.
- Auto-imported in any project extending the layer (`app/composables/useViewport.ts`).
