---
title: Navigation
description: Sidebar + main panel dashboard layout — composable shell, panel, top bar, breadcrumb, header bar, and product switcher.
category: navigation
prefix: S
componentName: Navigation
showcaseSlug: navigation
showcaseFile: Navigation
tags: [navigation, sidebar, dashboard, layout, breadcrumb, top-bar, header, products, shell, panel]
subcomponents:
  - SNavigationShell
  - SNavigationPage
  - SNavigationBarTop
  - SNavigationBarBreadcrumb
  - SNavigationBarHeader
  - SNavigationProducts
---

# Navigation system

The Smartness navigation system is a **layered composition** built on Nuxt UI dashboard primitives. Compose it from individual pieces and only include what you need. See `docs/navigation.md` in the layer for the full architectural overview.

## Layout sketch

```
SNavigationShell — UDashboardGroup
  ├── UDashboardSidebar
  │     ├── #sidebar-logo (default: Smartness logo)
  │     ├── #sidebar-header (e.g. SNavigationProducts)
  │     ├── UNavigationMenu (items prop)
  │     └── #sidebar-footer
  └── default slot — usually SNavigationPage
        ├── #header — bar stack (top + breadcrumb + page header)
        │     ├── SNavigationBarTop
        │     ├── SNavigationBarBreadcrumb
        │     └── SNavigationBarHeader
        ├── default slot → panel #body (page content)
        └── #footer
```

## Quick example

```vue
<SNavigationShell :items="navItems">
	<template #sidebar-header="{ collapsed }">
		<SNavigationProducts v-model="product" :products="products" :collapsed="collapsed" />
	</template>

	<SNavigationPage>
		<template #header>
			<SNavigationBarTop :user="{ name: 'Jane Doe' }" />
			<SNavigationBarBreadcrumb :items="breadcrumb" />
			<SNavigationBarHeader title="Listings" :back="{ label: 'Back' }" />
		</template>

		<!-- page body here -->
	</SNavigationPage>
</SNavigationShell>
```

## Components

| Component | Purpose | Key models |
|---|---|---|
| **`SNavigationShell`** | Sidebar + `UDashboardGroup`. | `v-model:collapsed`, `v-model:open` |
| **`SNavigationPage`** | Thin `UDashboardPanel` wrapper. | — |
| **`SNavigationBarTop`** | Top bar with mobile sidebar toggle, CTA, MakeAWish, HelpCenter, User. | `cta`, `makeAWish`, `helpCenter`, `user` |
| **`SNavigationBarBreadcrumb`** | Breadcrumb row with optional `#left`/`#right` overrides. | — |
| **`SNavigationBarHeader`** | Title / back / how-does-it-work / tabs / actions row. | `v-model:active-tab` |
| **`SNavigationProducts`** | Product switcher for sidebar header. | `v-model: SuiteProduct` |

## Notes

- All navigation components accept `ui` for class overrides.
- `SNavigationShell` persists collapsed state to localStorage (`storageKey` defaults to `smartness-navigation-v2`).
- For full prop and slot documentation, see `docs/navigation.md` in the layer repository.
