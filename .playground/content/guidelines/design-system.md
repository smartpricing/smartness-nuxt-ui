---
title: Design system
description: How to consume the Smartness UI Nuxt layer in any project — architecture, tokens, components, icons, and prescriptive usage patterns.
category: design-system
tags: [layer, tokens, colors, typography, components, icons, patterns, guidelines]
---

# Design system guidelines

Reference for consuming the Smartness design system (the `smartness-nuxt-ui` Nuxt layer, built on Nuxt UI v4) from any project.

> **Live source of truth:** the **Smartness UI MCP server** (`mcp__SmartnessUI__*` tools) serves the current layer's component/composable/token docs and always matches the installed version. Prefer it for component-level lookups; this page is the cross-project orientation.

## Architecture

The UI stack is layered:

```
┌──────────────────────────────────────────────────────────┐
│  Your project                                             │
│  App-specific components, pages, layouts                  │
├──────────────────────────────────────────────────────────┤
│  smartness-nuxt-ui (Nuxt layer)                           │
│  S* components (SNavigation*, SDataviz, SMultiSelect …),  │
│  design tokens, palette, Saans font, AI/Learning gradients│
├──────────────────────────────────────────────────────────┤
│  @nuxt/ui v4 (component library)                          │
│  UButton, UCard, UTable, UModal, UForm, …                 │
├──────────────────────────────────────────────────────────┤
│  Reka UI (headless primitives) + Tailwind CSS v4          │
└──────────────────────────────────────────────────────────┘
```

The layer auto-registers all its components, composables, and utilities via Nuxt's layer system — no manual imports needed.

## Extending the layer

Install the layer as a **git dependency**, aliased (conventionally to `nuxt-ui-layer`) and pinned to a release tag:

```jsonc
// package.json
"dependencies": {
	"nuxt-ui-layer": "git+ssh://git@github.com:smartpricing/smartness-nuxt-ui#vX.Y.Z"
}
```

Then extend it in `nuxt.config.ts`:

```ts
export default defineNuxtConfig({
	extends: [
		["nuxt-ui-layer"]
	]
});
```

Because it is a real dependency (not a bare `github:` shorthand), its own deps (`@nuxt/ui`, ECharts, MapLibre, `libphonenumber-js`, `@vuepic/vue-datepicker`, …) are already installed — no `{ install: true }` flag is needed. To bump the layer, change the version tag in `package.json` and re-run `pnpm install`.

### Package exports and aliases

| Import specifier | Resolves to | Use for |
|------------------|-------------|---------|
| `nuxt-ui-layer/types` | `app/types/index.ts` | **Explicit type imports** (preferred pattern) |
| `#layers/smartness-nuxt-ui` | `runtime/index.ts` | Runtime re-exports (`z`, `getSortableHeader`, `validatePhone`, `useComponentRenderToHTML`, `@vueuse/core` types) |
| `#smartness/locale` | `app/locale` | The layer locale objects (`en`, `it`, `de`, `es`, `fr`) |
| `nuxt-ui-layer/eslint` | `eslint.preset.mjs` | ESLint preset |

Import types from `nuxt-ui-layer/types` and locales from `#smartness/locale`; components and composables are auto-imported.

Because Nuxt layers cannot expose their npm deps directly, `runtime/index.ts` re-exports them:

```ts
import { z, getSortableHeader } from "#layers/smartness-nuxt-ui";
```

## Components from the layer

All components are auto-imported. Use them directly in templates. There are two families:

- **`S*` components** — bespoke Smartness components.
- **`U*` components** — Nuxt UI primitives, some with extra Smartness variants (see below).

**Rule: never rebuild what a `U*` or `S*` component already provides.** Check the layer (or the MCP server) before writing custom HTML/CSS.

### Navigation and layout (`SNavigation*`)

The dashboard layout is composed of small pieces, so a page can omit any header bar.

| Component | Purpose |
|-----------|---------|
| `SNavigationShell` | Root shell — collapsible/resizable sidebar + main panel (`storage="cookie"`, `resizable`) |
| `SNavigationPage` | Main panel wrapper; `#header` slot hosts the bars, body is the page |
| `SNavigationBarTop` | Top bar (user menu, CTA slot) |
| `SNavigationBarBreadcrumb` | Breadcrumb row |
| `SNavigationBarHeader` | Page header bar (title + optional tabs) |
| `SNavigationProducts` | Suite product switcher for the sidebar header |
| `SNavigationMenu` | Fixed-width vertical in-page section switcher, placed inside the page body |

```vue
<SNavigationShell :items="sections" storage="cookie" resizable>
	<template #sidebar-logo="{ collapsed }">…</template>
	<template #sidebar-header="{ collapsed }">
		<SNavigationProducts v-model="product" :products="products" :collapsed="collapsed" />
	</template>

	<SNavigationPage>
		<template #header>
			<SNavigationBarTop :cta="false" />
			<SNavigationBarBreadcrumb :items="crumbs" />
			<SNavigationBarHeader :title="title" :tabs="tabs" />
		</template>
		<!-- page body -->
	</SNavigationPage>
</SNavigationShell>
```

### Actions (`SActionsGroup`, `SMoreActions`)

| Component | Purpose |
|-----------|---------|
| `SActionsGroup` | Horizontal button group that overflows extra actions into a dropdown |
| `SMoreActions` | Trailing "kebab" menu; shows up to `max-inline` buttons before collapsing the rest |

```vue
<SMoreActions
	:actions="[
		{ label: 'Edit', icon: 'ph:pencil-line', onSelect: handleEdit },
		{ label: 'Delete', icon: 'ph:trash', color: 'error', onSelect: handleDelete }
	]"
	:max-inline="1"
/>
```

### Data visualization (`SDataviz*`)

ECharts v6 wrapper system. Use `SDataviz` as the container and nest chart-type components inside — series register themselves via `inject/provide`.

| Component | Purpose |
|-----------|---------|
| `SDataviz` | Chart container — loading, error, no-data states, legend, grid |
| `SDatavizLine` | Line chart series |
| `SDatavizBar` | Bar chart series |
| `SDatavizArea` | Area chart with min/max ranges |
| `SDatavizPie` | Pie/donut chart |
| `SDatavizScatter` | Scatter plot |
| `SDatavizFunnel` | Funnel chart |
| `SDatavizTooltip` | Custom HTML tooltip slot component |

```vue
<ClientOnly>
	<SDataviz title="Monthly totals" :loading="isLoading" locale="it">
		<SDatavizLine name="Users" :data="lineData" color="#14b8a6" smooth />
		<SDatavizBar name="Items" :data="barData" color="#3b82f6" />
	</SDataviz>
	<template #fallback>
		<USkeleton class="h-64 w-full" />
	</template>
</ClientOnly>
```

- `SDataviz` key props: `title`, `options` (`DatavizOptions`), `loading`, `locale` (`"en" | "it" | "de" | "es"`); slots `#header`, `#body`, `#footer`.
- Series key props: `name`, `data` (`DataPoint[]`), `color`, `smooth`/`showSymbol` (line only).

### Data calendar (`SDataCalendar`)

Month/week calendar with multi-day event bars, drag-and-drop, range selection, localization, and per-cell customization.

- Key props: `items` (`DataCalendarItem[]`), `locale`, `draggable`, `firstDayOfWeek`.
- Events: `@itemClick`, `@dateClick`, `@addClick`, `@itemDrop`.
- Subcomponents: `SDataCalendarCell`, `SDataCalendarHeader`, `SDataCalendarItem`, `SDataCalendarMonthGrid`, `SDataCalendarWeekGrid`.

### Map (`SMap`)

MapLibre GL wrapper with declarative children: `SMapLayer`, `SMapClusterLayer`, `SMapMarker`, `SMapPopup`, `SMapRoute`, `SMapControls`.

### Form components

| Component | Purpose |
|-----------|---------|
| `SFormField` | `UFormField` wrapper that translates zod error messages through i18n (treats the zod message as a translation key) |
| `SMultiSelect` | Hierarchical multi-select (tree, search, select-all); `mode="radio-group"` for single-root |
| `SPhoneInput` | International phone input with country selector + `libphonenumber-js` validation |
| `SDatePicker` | `@vuepic/vue-datepicker` themed with Smartness tokens — single or `range` |
| `SSlider` | Single-value or range slider with min/max/step and value labels |
| `SStepper` | Vertical step indicator for wizards — nested sub-steps, error/optional/disabled states, click-to-jump, i18n |

### Overlay and display

| Component | Purpose |
|-----------|---------|
| `SConfirmModal` | Confirmation dialog — prefer the `useConfirm()` composable over mounting it directly |
| `SAccordion` | Single collapsible disclosure card (UCard + UCollapsible + UButton) |
| `STruncatedText` | Truncates overflow with ellipsis, shows full text in a tooltip on hover |

### Auth

`SAuthLayout` (+ `SAuthFormCard`, `SAuthBackground`, `SAuthChevron`) — full-page auth layout with animated chevron background and a centered form card (login/signup/reset).

## Composables and utilities from the layer

### Auto-imported composables

| Name | Purpose |
|------|---------|
| `useConfirm()` | Imperative confirmation modal → returns `Promise<boolean>` (paired with `SConfirmModal`) |
| `useComponentRenderToHTML()` | Render a Vue component to an HTML string (e.g. ECharts tooltips) |
| `usePhoneValidation()` | Reactive phone validation / E.164 formatting via `libphonenumber-js` |
| `useStepperNavigation(steps, activeStepId)` | Active-step state + transitions for `SStepper` wizards |
| `useTableHeight(wrapperRef)` | Caps table height to remaining viewport so a sticky header stays pinned |
| `useStickyTableColumns()` | Scroll-aware pinned-column treatment for `UTable` |

### Utilities

| Name | Purpose |
|------|---------|
| `getSortableHeader(ctx, label)` | Build a sortable TanStack table column header (import from `#layers/smartness-nuxt-ui`) |

## Exported types

Import from `nuxt-ui-layer/types`:

```ts
import type { DataPoint, StepperStep, SMoreActionsProps } from "nuxt-ui-layer/types";
```

### Dataviz types

| Type | Description |
|------|-------------|
| `DataPoint` | `{ x: number \| string, y: number }` — line/bar/scatter data |
| `AreaDataPoint` | `{ x, min, max }` — area chart data |
| `PieDataPoint` | `{ name, value, id?, color?, active? }` — pie chart data |
| `DatavizOptions` | Chart options (xAxis, yAxis, grid, legend, tooltip, toolbox) |
| `DatavizAction` | Action button config (label, icon, onClick) |
| `DatavizSerieOption` / `DatavizSerieState` | Series discriminated union / internal state |
| `DatavizLocale` | `"en" \| "it" \| "de" \| "es"` |
| `DatavizAnimationOptions`, `DatavizEventParams`, `DatavizInitOptions` | Animation / event / init config |
| `TooltipDataItem` / `TooltipSlotData` | Tooltip item(s) |
| `DEFAULT_COLOR_PALETTE` | 12-color hex array constant (value export) |
| `datavizTranslations` | Built-in dataviz i18n strings (value export) |

### Data calendar types

`DataCalendarItem`, `DataCalendarView` (`"month" \| "week"`), `DataCalendarDayOfWeek`, `DataCalendarDropEvent`, `DataCalendarLegendItem`, `DataCalendarLocale`, plus the `dataCalendarTranslations` value export.

### Actions / more actions / stepper / misc

| Type | Description |
|------|-------------|
| `ActionItem`, `SActionsGroupProps`, `ActionsGroupLocale`, `ActionsGroupUi` | `SActionsGroup` config |
| `MoreActionItem`, `MoreActionInlineItem`, `SMoreActionsProps` | `SMoreActions` config |
| `StepperStep`, `StepperStepChild`, `StepperStepStatus` | `SStepper` config |
| `SConfirmModalProps` | Confirmation modal props |
| `MaybeReactive<T>` | Maps each key of `T` to `MaybeRefOrGetter` |

## Design tokens and colors

### Semantic colors

Each palette exposes shades `50…950` (e.g. `bg-primary-700`, `text-burgundy-500`). The **anchor shade** is the one the semantic token maps to (overridden in the layer's `main.css`, e.g. `--ui-primary: var(--ui-color-primary-900)`).

| Nuxt UI token | Palette (`--color-*`) | Anchor shade | Usage |
|---------------|-----------------------|--------------|-------|
| `primary` | `petrol-blue` | 900 | Primary brand color, main actions |
| `secondary` | `sky` | 700 | Secondary actions, accents |
| `support` | `warm-gray` | 200 | Backgrounds, borders |
| `burgundy` | `burgundy` | 950 | Special accents |
| `lemon` | `lemon` | 400 | Special accents |
| `info` | `info` | 700 | Informational elements |
| `success` | `success` | 700 | Success states |
| `warning` | `warning` | 700 | Warning states |
| `error` | `error` | 700 | Error / destructive actions |
| `offblack` | `off-black` | — | Solid dark color |

**Always use semantic tokens** (`color="primary"`, `text-error-700`) instead of raw hex values or Tailwind's default palettes.

### AI and Learning gradients

`ai` and `learning` are **CSS gradients, not numeric scales** — never write `bg-ai-500` or `text-learning-200`. Use them via component props (`color="ai"`) or the utility classes wired through `compoundVariants` in the layer's `app.config.ts`.

| Name | Gradient |
|------|----------|
| `ai` | `#00C6FF → #0072FF → #B721FF → #FDBB2D` |
| `learning` | `#00C6FF → #0072FF` |

```vue
<UButton color="ai" variant="solid">Generate</UButton>
<UButton color="learning" variant="outline" icon="ph:graduation-cap">Lesson</UButton>
<UAlert color="ai" variant="outline" title="AI suggestion" />
```

Utility classes: `btn-ai-{solid,outline,soft,subtle,ghost}`, `btn-learning-{solid,outline,soft,subtle,ghost,link}`, `alert-ai-outline`, `alert-learning-outline`. (`link` exists for `learning` only.)

### Typography

**Font:** Saans (variable weight 100–900, normal + italic), applied globally via `--font-sans`. Default radius `--ui-radius: 0.25rem`. Do not import other fonts or override the radius per component.

CSS lives in the layer under `app/assets/css/` (`main.css`, `variables.css`, `typography.css`, `transitions.css`, `ai.css`, `learning.css`).

## Icons

**Prefer Phosphor** (`ph:`) over other icon sets — stay consistent (`ph:pencil-line`, `ph:eye`, `ph:trash`, `ph:graduation-cap`, `ph:warning-circle`, …). Browse at [phosphoricons.com](https://phosphoricons.com). Bundle icons locally (`icon: { serverBundle: "local" }`).

```vue
<UButton icon="ph:plus" label="Add" />
<UIcon name="ph:arrows-clockwise" />
```

## Nuxt UI components and Smartness variants

`@nuxt/ui` v4 components are auto-imported and configured via the layer's `app.config.ts`. Some carry **extra Smartness variants**:

| Component | Smartness customization |
|-----------|-------------------------|
| `UButton` | `color="ai"` / `color="learning"` across all variants (gradient utility classes) |
| `UAlert` | `ai` / `learning` outline variants (gradient borders) |
| `UBadge` | `ai` / `learning` color tokens (gradient backgrounds) |
| `UTabs` | Extra full-width `link-fit` and `pill-fit` variants for header rows |
| `UInput` | Full-width by default (slot override) |
| `USelect` / `USelectMenu` | Full-width + disabled-state slot overrides; `USelectMenu` supports the "create item" pattern |
| `UTable` | Smartness body-cell color + opt-in scroll-aware pinned columns (pair with `useStickyTableColumns` + `useTableHeight`) |

Other commonly used Nuxt UI components (unmodified):

| Category | Components |
|----------|------------|
| **Layout** | `UCard`, `UDashboardPanel`, `UDashboardNavbar`, `UNavigationMenu` |
| **Forms** | `UForm`, `UFormField`, `USwitch`, `UTextarea`, `UCheckbox`, `URadioGroup` |
| **Data** | `UTable`, `UPagination` |
| **Feedback** | `UAlert`, `UBadge`, toasts via `useToast()` |
| **Overlay** | `UModal`, `USlideover`, `UDrawer`, `UDropdownMenu`, `UTooltip` |
| **Navigation** | `NuxtLink`, `UBreadcrumb`, `UTabs` |
| **Display** | `UIcon`, `UAvatar`, `USkeleton`, `USeparator`, `UAccordion`, `UCollapsible` |

For Nuxt UI component API details, refer to the [Nuxt UI docs](https://ui.nuxt.com/components) or the `mcp__NuxtUI__*` MCP tools.

## How to check what the layer exports

Two authoritative options — prefer whichever is available:

1. **Smartness UI MCP server** (`mcp__SmartnessUI__*`) — always matches the current layer: `list-components`, `get-component`, `list-composables`, `get-composable`, `list-design-tokens`, `list-examples`, `get-example`.

2. **The installed layer on disk** — the alias is a symlink into `node_modules`:

```bash
# Version (from the alias dependency)
grep nuxt-ui-layer package.json

# Components / composables / utils
ls node_modules/nuxt-ui-layer/app/components/
ls node_modules/nuxt-ui-layer/app/composables/
ls node_modules/nuxt-ui-layer/app/utils/

# Exported types, runtime re-exports, theme config
cat node_modules/nuxt-ui-layer/app/types/index.ts
cat node_modules/nuxt-ui-layer/runtime/index.ts
cat node_modules/nuxt-ui-layer/app/app.config.ts
```

This always reflects the **actually installed version**, not potentially stale docs.

## Usage patterns

### Charts — always wrap in `ClientOnly`

ECharts requires the DOM, so always wrap `SDataviz` in `ClientOnly` with a skeleton fallback (see the `SDataviz` example above).

### Data format for charts

```ts
// Line, Bar, Scatter
const data: DataPoint[] = [{ x: "Jan", y: 100 }, { x: "Feb", y: 200 }];

// Pie
const data: PieDataPoint[] = [
	{ name: "Category A", value: 45 },
	{ name: "Category B", value: 30, color: "#ff6384" }
];

// Area (min/max range)
const data: AreaDataPoint[] = [{ x: "Mon", min: 10, max: 50 }];
```

### Confirmation before destructive actions

`useConfirm()` returns `{ confirm }`; `confirm(...)` resolves to a `boolean`. You can either await the boolean or pass an `action` callback:

```ts
const { confirm } = useConfirm();

async function handleDelete(item: Item) {
	const confirmed = await confirm({
		title: t("crud.remove"),
		message: t("crud.confirm"),
		destructive: true,
		confirmProps: { color: "error" },
		headerIcon: "ph:trash",
		action: () => deleteItem(item.id) // optional — runs on confirm; may return a promise
	});
	if (confirmed) { /* ... */ }
}
```

### Sortable table headers

```ts
import { getSortableHeader } from "#layers/smartness-nuxt-ui";

const columns: TableColumn<Item>[] = [
	{
		accessorKey: "name",
		header: (ctx) => getSortableHeader(ctx, t("items.fields.name"))
	}
];
```

### Sticky table header (viewport-capped)

```vue
<script setup lang="ts">
const wrapper = useTemplateRef("wrapper");
const { maxHeight } = useTableHeight(wrapper);
</script>

<template>
	<div ref="wrapper">
		<UTable sticky :style="{ maxHeight }" :data="rows" :columns="columns" />
	</div>
</template>
```

### Field components in forms

Keep app-level field components **field-only** — they render just the control. Label and validation come from a `SFormField` wrapper at the call site (the standard Nuxt UI form-field pattern).

```vue
<!-- with label + validation -->
<SFormField :label="$t('items.fields.owner')" name="owner_id" required>
	<UserPicker v-model="payload.owner_id" />
</SFormField>

<!-- no label and no validation → use it bare -->
<SDatePicker v-model:date="filters.from" />
```

Guidelines:

- Put `label` / `name` / `required` / `description` / `hint` / `error-pattern` / `class` on the **`SFormField`**; keep `v-model`, functional props, events and `:data-testid` on the field component.
- Use `SFormField` (not `UFormField`) when zod validation messages are translation keys — it translates the `zod-errors.*` message keys.
- `name` must match the zod schema path / `v-model` field (e.g. a field bound to `payload.state` → `name="state"`).
- Don't wrap a field that needs neither a label nor validation.

### Multi-step wizards

Pair `SStepper` with `useStepperNavigation(steps, activeStepId)` (auto-imported) for `goBack` / `goNext` / `canGoBack` / `canGoNext` / `goToStep` / `goToChild`, plus `currentLabel` / `currentIndex` / `flatItems` to drive a progress indicator. Render `SStepper` in a body sidebar on desktop; keep the mobile progress row in the header.
