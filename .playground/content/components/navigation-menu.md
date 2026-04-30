---
title: NavigationMenu
description: Fixed-width vertical sidebar for in-page section switching, placed inside SNavigationPage's body.
category: navigation
prefix: S
componentName: NavigationMenu
showcaseSlug: navigation-menu
showcaseFile: NavigationMenu
tags: [navigation, sidebar, menu, sections, in-page, secondary]
subcomponents: []
---

# SNavigationMenu

Secondary, in-page navigation column. It renders a fixed-width vertical `UNavigationMenu` and is intended to live **inside `SNavigationPage`'s body**, alongside section content (e.g. Presets / Rate plans / Promotions inside a single route).

It is **not** the main app sidebar — that role belongs to `SNavigationShell`. Use `SNavigationMenu` for sub-navigation within a single page.

## Props

| Prop | Type | Description |
|---|---|---|
| `items` | `NavigationMenuItem[] \| NavigationMenuItem[][]` | Menu entries in Nuxt UI format. Pass a 2D array to render groups; the last group gets an indented sub-list border treatment. |

## Slots

| Slot | Description |
|---|---|
| `default` | Rendered below the menu — handy for a footer button or note. |

## Layout

- Fixed `250px` wide, full-height vertical column
- `bg-default`, right border (`border-r border-default`), `p-4`
- Internal `UNavigationMenu` uses `orientation="vertical"`, hides separators, and indents the **last** sub-list (`last:ms-5 last:border-s last:border-default last:ps-1.5`)

## State

The component does **not** persist or own selection state. Drive `active` from a local `ref` and update it from each item's `onSelect`:

```vue
<template>
	<SNavigationPage>
		<div class="flex h-full">
			<SNavigationMenu :items="sideNavItems" />

			<div class="flex-1 p-4">
				<!-- render content for `currentSection` here -->
			</div>
		</div>
	</SNavigationPage>
</template>

<script lang="ts" setup>
	import type { NavigationMenuItem } from "#ui/types";

	const currentSection = ref("presets");

	const sideNavItems = computed<NavigationMenuItem[][]>(() => [
		[
			{
				label: "Presets",
				icon: "ph:copy",
				active: currentSection.value === "presets",
				onSelect: () => {
					currentSection.value = "presets";
				}
			}
		],
		[
			{
				label: "Rate plans",
				icon: "ph:bookmark-simple",
				active: currentSection.value === "rate-plans",
				onSelect: () => {
					currentSection.value = "rate-plans";
				}
			},
			{
				label: "Promotions",
				icon: "ph:percent",
				active: currentSection.value === "promotions",
				onSelect: () => {
					currentSection.value = "promotions";
				}
			},
			{
				label: "Extras",
				icon: "ph:plus",
				active: currentSection.value === "extras",
				onSelect: () => {
					currentSection.value = "extras";
				}
			},
			{
				label: "City tax",
				icon: "ph:receipt",
				active: currentSection.value === "city-tax",
				onSelect: () => {
					currentSection.value = "city-tax";
				}
			}
		]
	]);
</script>
```

## When to use it

- In-page section switching (Settings → Profile / Security / Notifications)
- Sub-areas of a single feature page (Presets → Rate plans / Promotions / Extras / City tax)

## When NOT to use it

- For the app's main sidebar — use `SNavigationShell` (it provides `UDashboardGroup`, mobile drawer, collapse, persisted state).
- When you need the menu to be collapsible or responsive — `SNavigationMenu` is intentionally fixed-width.
