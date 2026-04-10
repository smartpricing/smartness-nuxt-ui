# Navigation

This layer provides a **sidebar + main panel** layout aligned with the Smartness dashboard pattern. The system is fully modular: you compose it from individual components and only include the pieces you need.

---

## How it works

### Big picture

Navigation is built on Nuxt UI’s **dashboard** primitives. **`SNavigationShell`** renders a `UDashboardGroup` with a **collapsible sidebar** (logo, collapse control, sidebar slots, nav menu). Its **default slot** should contain **`SNavigationPage`**, a thin **`UDashboardPanel`** wrapper that exposes **`#header`**, **default** (panel **`#body`**), and **`#footer`**.

All top-of-content UI (**top bar**, **breadcrumb**, **page header**) is **opt-in**: compose `SNavigationBarTop`, `SNavigationBarBreadcrumb`, and/or `SNavigationBarHeader` in **`SNavigationPage`’s `#header`**, in order. Put scrollable page content in **`SNavigationPage`’s default** slot (scoped body props from Nuxt UI apply). Optional **`#footer`** maps to the panel footer.

```mermaid
flowchart TB
	subgraph shell["SNavigationShell — UDashboardGroup"]
		subgraph sidebar["UDashboardSidebar"]
			logo["#sidebar-logo (default: Smartness) + collapse"]
			sh["#sidebar-header — e.g. SNavigationProducts"]
			menu["UNavigationMenu — items prop"]
			sf["#sidebar-footer — optional"]
		end
		page["SNavigationPage — UDashboardPanel"]
	end
	page --> ph["#header — bar stack"]
	page --> pb["Default → #body"]
	page --> pf["#footer — optional"]
```

### Dashboard context and mobile sidebar

**`SNavigationBarTop`** uses **`useDashboard()`** to open/close the mobile drawer and to read whether the sidebar is open. That composable is wired by **`UDashboardGroup`**, which **`SNavigationShell`** already provides. **`SNavigationPage`** must be a child of **`SNavigationShell`** (same `UDashboardGroup`). Put the top bar in **`SNavigationPage`’s `#header`** (or anywhere still under that shell). If you mount the top bar outside **`SNavigationShell`**, the logo toggle will not control the drawer.

On **small viewports**, the **Smartness icon** in the top bar toggles the sidebar full-screen (Nuxt UI behavior). On **`lg` and up**, that control is hidden; collapse/expansion uses the control next to the full logo in the sidebar header.

### Sidebar: what you control

| Area | Who owns it |
| --- | --- |
| Logo | **`#sidebar-logo`** (`{ collapsed }`) — defaults to the Smartness full logo, hidden when collapsed. Override to swap brand or render a collapsed-state icon |
| Collapse control | Built into **`SNavigationShell`** next to the logo slot |
| Above the nav list | **`#sidebar-header`**, e.g. **`SNavigationProducts`** with `v-model` and `:collapsed` from the slot props |
| Nav links | **`items`** on the shell (**`NavigationMenuItem[]`** or grouped **`[][]`**) |
| Below the nav list | **`#sidebar-footer`** |

The shell does **not** include a product switcher by default; you add **`SNavigationProducts`** (or your own UI) in **`#sidebar-header`** so switching logic stays explicit.

### Main column: three optional bars

In **`SNavigationPage`’s `#header`** slot, the usual stack is:

1. **`SNavigationBarTop`** — Product-wide actions (CTA, make-a-wish, help, user), plus **optional `#left`**. This is the row that contains the **mobile drawer toggle** on the left.
2. **`SNavigationBarBreadcrumb`** — Breadcrumbs; optional **`#right`**. Omit the component if you do not want this row.
3. **`SNavigationBarHeader`** — Page title, back, optional “How does it work”, **`#actions`**, and optional tabs. Omit the component if the route does not need this block.

Order matters: they stack top to bottom as **separate bordered rows**, matching the Figma-style dashboard header.

### Responsiveness (page header row)

**`SNavigationBarHeader`** lays out **title + optional how-it-works** on one cluster; **actions** wrap on a **second row on small screens** and align to the **trailing edge on large screens**. Tabs render under that block when **`tabs`** is set. **`SNavigationBarTop`** keeps actions in a horizontal cluster (with optional **`#default`** replacing the whole cluster).

### State and persistence

- Sidebar **collapsed** / **open** (drawer) can be bound with **`v-model:collapsed`** and **`v-model:open`** on **`SNavigationShell`** when you need control.
- The shell’s group uses **`storage-key="smartness-navigation"`** so collapse preference can persist (Nuxt UI / local storage, depending on setup).

### Adopting this in your app (short checklist)

1. Wrap your logged-in layout with **`SNavigationShell`** and pass **`items`** for **`UNavigationMenu`**.
2. Optionally fill **`#sidebar-header`** (e.g. **`SNavigationProducts`**) and **`#sidebar-footer`**.
3. As the shell’s default child, render **`SNavigationPage`**; put **`SNavigationBarTop`**, **`SNavigationBarBreadcrumb`**, **`SNavigationBarHeader`** in **`SNavigationPage`’s `#header`** where needed; put page content in **`SNavigationPage`’s default** slot (optionally **`#footer`**).
4. Use **`@cta`**, **`@help-center`**, etc. on the top bar and **`@back`**, **`@tab-change`**, **`@how-does-it-work`** on the header for page-level handlers.
5. Override visuals with each component’s **`ui`** prop where needed (same idea as Nuxt UI **`ui`** overrides).

The playground’s **`.playground/app/layouts/default.vue`** is the canonical end-to-end example.

---

## Components overview

| Component | Purpose |
| --- | --- |
| **`SNavigationShell`** | `UDashboardGroup`: sidebar + default slot (typically **`SNavigationPage`**) |
| **`SNavigationPage`** | Thin **`UDashboardPanel`** wrapper: **`#header`**, default (body), **`#footer`**; **`panelProps`** |
| **`SNavigationBarTop`** | Top bar with mobile sidebar toggle, optional `#left`, and shared actions (CTA, make-a-wish, help, user) |
| **`SNavigationBarBreadcrumb`** | Breadcrumb row |
| **`SNavigationBarHeader`** | Title / back / "How does it work" / tabs / actions row |
| **`SNavigationProducts`** | Product select / collapsed menu; placed in `SNavigationShell`'s `#sidebar-header` slot by the consumer |

All custom components accept a **`ui`** prop (object of CSS class strings keyed by slot name) so consumers can override default styling, following the same pattern as Nuxt UI.

---

## Composition

Use **`SNavigationShell`** → **`SNavigationPage`** so the app stays in one **`UDashboardGroup`** and **`useDashboard()`** in **`SNavigationBarTop`** keeps working.

Optional **`panelProps`** on **`SNavigationPage`** are forwarded to **`UDashboardPanel`** (e.g. **`ui`**, **`id`**).

```vue
<template>
  <SNavigationShell :items="navigationItems">
    <template #sidebar-header="{ collapsed }">
      <SNavigationProducts
        v-model="currentProduct"
        :products="products"
        :collapsed="collapsed"
      />
    </template>

    <SNavigationPage :panel-props="{ ui: { body: 'custom-class' } }">
      <template #header>
        <SNavigationBarTop
          :user="{ dropdown: { items: userMenuItems } }"
          @cta="onCta"
        />
        <SNavigationBarBreadcrumb
          :items="[{ label: 'Home', to: '/' }, { label: 'Calendar' }]"
        />
        <SNavigationBarHeader
          title="Calendar"
          :back="{ label: 'Back' }"
          how-does-it-work
          :tabs="tabs"
          :active-tab="activeTab"
          @back="router.back()"
          @how-does-it-work="onGuide"
          @tab-change="onTab"
        >
          <template #actions>
            <UButton label="Primary action" />
          </template>
        </SNavigationBarHeader>
      </template>

      <UContainer>
        <NuxtPage />
      </UContainer>
    </SNavigationPage>
  </SNavigationShell>
</template>
```

Reference implementation: `.playground/app/layouts/default.vue`.

---

## SNavigationShell

| Concern | Details |
| --- | --- |
| **Props** | `items: NavigationMenuItem[] \| NavigationMenuItem[][]`; **`storage?`** — passed to **`UDashboardGroup`** (`local` \| `cookie` \| …; defaults to `local`) |
| **v-models** | `collapsed`, `open` (sidebar drawer on small screens) |
| **Slots** | **`#sidebar-logo`** (`{ collapsed }`) — defaults to the Smartness full logo (hidden while collapsed); override to swap brand or add a collapsed-state icon. **`#sidebar-header`** (`{ collapsed }`), **`#sidebar-footer`** (`{ collapsed }`); **default** — main column (use **`SNavigationPage`**) |
| **Persistence** | Collapse/open state uses `storage-key="smartness-navigation"` on the underlying `UDashboardGroup` |

`items` follows Nuxt UI's navigation menu shape. Use a **2D array** to separate groups (e.g. main links vs. footer links).

---

## SNavigationPage

Thin wrapper around **`UDashboardPanel`**. Intended as the **default slot** child of **`SNavigationShell`**.

| Concern | Details |
| --- | --- |
| **Props** | **`panelProps?`** — spread onto **`UDashboardPanel`** |
| **Slots** | **`#header`**, **default** (panel body; scoped body props from Nuxt UI), **`#footer`** |

The layer theme sets **`dashboardPanel.slots.body`** to **`bg-muted sm:p-4 p-4`** (`app/app.config.ts`). That padding applies to **panel body** only, not to **`#header`**, so navigation bars stay edge-to-edge while main content is inset.

---

## SNavigationBarTop

Always visible when placed. Contains the mobile sidebar toggle (Smartness logo icon), optional `#left`, and the shared actions row (or a custom `#default` replacing the whole actions area).

| Concern | Details |
| --- | --- |
| **Props** | `cta?`, `makeAWish?`, `helpCenter?`, `helpCenterText?`, `user?` |
| **Emits** | `cta`, `makeAWish`, `helpCenter`, `user` |
| **Slots** | `#logo` (mobile sidebar toggle icon — defaults to Smartness icon, only rendered while the drawer is closed); `#left`; `#default` (entire actions cluster); `#cta`, `#makeAWish`, `#helpCenter`, `#user` (override one control while keeping the default cluster) |
| **`ui` slots** | `root`, `left` |

---

## SNavigationBarBreadcrumb

Simple breadcrumb row. Omit the component entirely if you don't need breadcrumbs.

| Concern | Details |
| --- | --- |
| **Props** | `items?: BreadcrumbItem[]` |
| **Slots** | `#left` (overrides `UBreadcrumb`), `#right` |
| **`ui` slots** | `root` |

---

## SNavigationBarHeader

Title bar with optional back button, "How does it work" control, secondary actions, and tabs. Omit entirely if you don't need a header row.

| Concern | Details |
| --- | --- |
| **Props** | `title?`, `back?: ButtonProps \| boolean`, `howDoesItWork?: ButtonProps \| boolean`, `tabs?: TabsItem[]`, `activeTab?: string \| number` |
| **Emits** | `back`, `howDoesItWork`, `tabChange` |
| **Slots** | `#back`, `#howDoesItWork`, `#title`, `#actions` |
| **`ui` slots** | `root`, `titleRow`, `titleGroup`, `title`, `actions`, `tabs` |

**Back button:** Enable with `:back="true"` (icon-only) or `:back="{ label: 'Back' }"` for a labeled button. Defaults: `color="neutral"`, `variant="ghost"`, `icon="ph:arrow-left-bold"`, label from locale `sAppPage.backLabel` (empty by default). Click emits `@back`. Override entirely via `#back` slot.

**How does it work:** Enable with `how-does-it-work` (boolean) or `:how-does-it-work="{ label: 'Custom' }"` (`ButtonProps`). Click emits `@how-does-it-work`. Default label comes from locale `sAppPage.howDoesItWorkLabel`; override via `ButtonProps.label`. Below `md` only the icon is shown; from `md` upward icon + label are shown. Override entirely via `#howDoesItWork` slot.

**Title:** Uses `line-clamp-2` on smaller screens and `lg:truncate` on desktop. When the how-does-it-work button is present, the title shrinks to fit beside it.

**Actions (`#actions`):** On `max-lg` they render on a second row under the title. On `lg+` they sit on the same row, aligned to the end.

**Tabs:** `UTabs` with `color="secondary"`, `variant="link"`, `size="md"`, `content={false}`.

---

## SNavigationProducts

Product switcher: `USelect` when the sidebar is expanded, `UDropdownMenu` + icon button when collapsed. Labels use a two-tone “Smart” + product name treatment matching suite labels in `app/types/suite.ts`.

| Concern | Details |
| --- | --- |
| **Props** | `products: SuiteProduct[]` (owned products; others appear under “Recommended for you”), `collapsed?` |
| **v-model** | `SuiteProduct` |

---

## Localization

- Sidebar toggle: Nuxt UI's `dashboardSidebarToggle.open` / `dashboardSidebarToggle.close`
- Top bar CTA: `sTopBar.ctaLabel` (used inside `SNavigationBarTop`)
- Back label: `sAppPage.backLabel` (empty by default — icon-only)
- How does it work: `sAppPage.howDoesItWorkLabel`

See [locale-guide.md](./locale-guide.md) for extending messages.
