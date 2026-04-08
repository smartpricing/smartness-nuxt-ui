# Navigation (SNavigationShell & SAppPage)

This layer provides a **sidebar + main panel** layout aligned with the Smartness dashboard pattern. Use **`SNavigationShell`** for the left rail (logo, collapse, product switcher, nav menu) and **`SAppPage`** for the main content area with an optional **three-level header**.

`SAppPage` must be rendered **inside** the same `UDashboardGroup` tree as the shell (typically as the default child of `SNavigationShell`) so the mobile sidebar toggle can call `useDashboard()` correctly.

---

## Composition

```vue
<template>
	<SNavigationShell
		v-model:selected-product="currentProduct"
		v-model:collapsed="sidebarCollapsed"
		v-model:open="sidebarOpen"
		:products="products"
		:items="navigationItems"
	>
		<!-- Optional: content below the vertical nav -->
		<template #sidebar-footer="{ collapsed }">
			<!-- e.g. product-specific links or promos -->
		</template>

		<SAppPage
			:breadcrumb="breadcrumbItems"
			title="Page title"
			back-label="Back"
			:tabs="tabs"
			:active-tab="activeTab"
			:user="{ dropdown: { items: userMenuItems } }"
			@back="router.back()"
			@tab-change="onTabChange"
			@cta="onCta"
			@help-center="onHelp"
			@make-a-wish="onWish"
		>
			<template #header-actions>
				<UButton label="Primary action" />
			</template>

			<!-- Main page body -->
			<UContainer>
				<NuxtPage />
			</UContainer>
		</SAppPage>
	</SNavigationShell>
</template>
```

Reference implementation: `.playground/app/layouts/default.vue`.

---

## SNavigationShell

| Concern | Details |
| --- | --- |
| **Props** | `products?: SuiteProduct[]`, `items: NavigationMenuItem[] \| NavigationMenuItem[][]` |
| **v-models** | `selectedProduct`, `collapsed`, `open` (sidebar drawer on small screens) |
| **Slot** | `#sidebar-footer` — optional; receives `{ collapsed: boolean }`; rendered after `UNavigationMenu` |
| **Persistence** | Collapse/open state uses `storage-key="smartness-navigation"` on the underlying `UDashboardGroup` |

`items` follows Nuxt UI’s navigation menu shape. Use a **2D array** to separate groups (e.g. main links vs. footer links).

---

## SAppPage — three header levels

Headers are plain rows inside `UDashboardPanel`’s header slot (not `UDashboardNavbar`). Each level can be omitted when you do not pass the corresponding props or slots.

### Level 1 — Top navigation (always shown)

- **Left (desktop):** `#top-left` — optional product or page-specific content (search, badges, etc.).
- **Right:** By default renders **`STopBar`** with props `cta`, `makeAWish`, `helpCenter`, `helpCenterText`, `user`. Override the whole right side with **`#top-right`**.
- **Mobile:** A Smartness logo button toggles the sidebar; it sits in this row (`lg:hidden`).

Events from the default bar are re-emitted on `SAppPage`: `@cta`, `@make-a-wish`, `@help-center`.

### Level 2 — Breadcrumb navigation (conditional)

Shown if **any** of:

- `breadcrumb` is a non-empty `BreadcrumbItem[]`, or
- `#breadcrumb-left` or `#breadcrumb-right` is used.

Default left content is `UBreadcrumb` with `:items="breadcrumb"`. Replace the left side with `#breadcrumb-left` when you need a custom layout.

### Level 3 — Header navigation (conditional)

Shown if **any** of:

- `title` or `#title`
- `backLabel` (shows back button that emits `@back`)
- `#header-actions`
- `tabs` is a non-empty array

**Title row:** On small screens the title/back row stacks above `#header-actions` (wrapping actions). On large screens they align in one row.

**Tabs:** Pass `tabs` as Nuxt UI **`TabsItem[]`** (`label`, `value`, optional `icon`, etc.). Bind the active tab with **`active-tab`** (supports `string | number`) and listen for **`@tab-change`** — the payload is the new tab value from `UTabs` (`update:modelValue`).

Tabs use `color="secondary"`, `variant="link"`, `size="md"`, and `content={false}` so only the tab list is shown in the header.

---

## SAppPage API summary

**Props**

- **Top bar → STopBar:** `cta`, `makeAWish`, `helpCenter`, `helpCenterText`, `user`
- **Breadcrumb:** `breadcrumb?: BreadcrumbItem[]`
- **Header:** `title?`, `backLabel?`, `tabs?: TabsItem[]`, `activeTab?: string | number`
- **Panel:** `panelProps?` — forwarded to `UDashboardPanel`

**Emits**

- `cta`, `makeAWish`, `helpCenter`, `back`, `tabChange` (use `@tab-change` in templates)

**Slots**

- `top-left`, `top-right`, `breadcrumb-left`, `breadcrumb-right`, `title`, `header-actions`, default (body), `footer`

Types (`BreadcrumbItem`, `TabsItem`, `ButtonProps`, etc.) come from **`@nuxt/ui`**.

---

## STopBar (standalone)

`STopBar` is a compact **actions cluster** only (no full-width shell). Use it inside your own top row, or rely on `SAppPage` to embed it.

- **Props:** same as forwarded from `SAppPage` (`cta`, `makeAWish`, `helpCenter`, `helpCenterText`, `user`)
- **Slots:** `#cta`, `#makeAWish`, `#helpCenter`, `#user` to replace individual controls
- **Default CTA label:** from locale key `sTopBar.ctaLabel` (extended in `app/locale/*.ts`)

---

## Localization

- Sidebar toggle uses Nuxt UI’s `dashboardSidebarToggle.open` / `dashboardSidebarToggle.close` strings.
- STopBar CTA default label uses **`sTopBar.ctaLabel`** in the Smartness locale files.

See [locale-guide.md](./locale-guide.md) for extending messages.
