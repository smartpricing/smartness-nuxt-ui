# @dev.smartpricing/smartness-vue

Vue 3 component library for the **Smartness Design System**. Built on top of [Nuxt UI v4](https://ui.nuxt.com), this package provides the full Smartness color palette, typography, component variants, and custom components — ready to use in any Vue 3 + Vite project.

## Installation

```bash
pnpm add @dev.smartpricing/smartness-vue
```

### Peer dependencies

Vue 3 is required:

```bash
pnpm add vue@^3.5
```

## Setup

### 1. Register the Vite plugin

The library ships a Vite plugin that configures Nuxt UI with Smartness design tokens (colors, component variants, etc.) and enables auto-import of all `U*` components from Nuxt UI.

```ts
// vite.config.ts
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import tailwindcss from "@tailwindcss/vite";
import smartnessUI from "@dev.smartpricing/smartness-vue/vite";

export default defineConfig({
  plugins: [
    vue(),
    smartnessUI(),
    tailwindcss(),
  ],
});
```

You can pass [Nuxt UI options](https://ui.nuxt.com/getting-started/installation/vue) to override defaults:

```ts
smartnessUI({
  colorMode: true, // enable dark mode (disabled by default)
  ui: {
    button: { /* your overrides */ },
  },
});
```

### 2. Install the Vue plugin

Register the plugin in your app entry. This globally registers all Smartness components and injects the stylesheet.

```ts
// main.ts
import { createApp } from "vue";
import smartnessVue from "@dev.smartpricing/smartness-vue";
import App from "./App.vue";

const app = createApp(App);
app.use(smartnessVue);
app.mount("#app");
```

### 3. Import the stylesheet

The CSS is injected automatically by the Vue plugin, but you can also import it explicitly if needed (e.g., for SSR or custom setups):

```ts
import "@dev.smartpricing/smartness-vue/style.css";
```

### 4. Tailwind CSS

Your project's main CSS file must import Tailwind and the Nuxt UI theme:

```css
/* main.css */
@import "tailwindcss";
@import "@nuxt/ui/theme";
```

## Usage

### Nuxt UI components

All Nuxt UI components (`UButton`, `UInput`, `UTable`, etc.) are auto-imported and pre-configured with Smartness design tokens via the Vite plugin. Use them as documented at [ui.nuxt.com](https://ui.nuxt.com/components).

```vue
<template>
  <UButton color="primary" variant="solid">Click me</UButton>
  <UInput placeholder="Enter text..." />
  <UBadge color="success" variant="soft">Active</UBadge>
</template>
```

### Smartness custom components

These are registered globally by the Vue plugin. You can also import them individually.

```vue
<script setup lang="ts">
import { SDataviz, SDatavizBar } from "@dev.smartpricing/smartness-vue";
</script>
```

## Components

### Dataviz

Chart components built on ECharts v6. Nest series components inside `SDataviz`.

```vue
<template>
  <SDataviz title="Revenue" :options="{ xAxis: { data: months } }">
    <SDatavizBar :data="barData" name="Revenue" />
    <SDatavizLine :data="lineData" name="Trend" />
  </SDataviz>
</template>

<script setup lang="ts">
import type { DataPoint } from "@dev.smartpricing/smartness-vue";

const months = ["Jan", "Feb", "Mar"];
const barData: DataPoint[] = [
  { x: "Jan", y: 100 },
  { x: "Feb", y: 200 },
  { x: "Mar", y: 150 },
];
const lineData: DataPoint[] = [
  { x: "Jan", y: 120 },
  { x: "Feb", y: 180 },
  { x: "Mar", y: 160 },
];
</script>
```

**Available chart types:**

| Component | Description |
|---|---|
| `SDataviz` | Main container — handles loading, no-data, header, and legend |
| `SDatavizBar` | Bar charts |
| `SDatavizLine` | Line charts (with optional smooth curves, mark points/lines) |
| `SDatavizArea` | Area charts with min/max range data (`AreaDataPoint`) |
| `SDatavizPie` | Pie charts with per-slice colors (`PieDataPoint`) |
| `SDatavizScatter` | Scatter plots |
| `SDatavizFunnel` | Funnel charts |
| `SDatavizTooltip` | Custom tooltip rendering via slot |

### Data Calendar

Calendar views with drag-and-drop support.

| Component | Description |
|---|---|
| `SDataCalendar` | Main calendar container |
| `SDataCalendarHeader` | Navigation header (prev/next, view toggle) |
| `SDataCalendarMonthGrid` | Month grid layout |
| `SDataCalendarWeekGrid` | Week grid layout |
| `SDataCalendarCell` | Individual day cell |
| `SDataCalendarItem` | Event item within a cell |

### Other components

| Component | Description |
|---|---|
| `AppPage` | Dashboard page wrapper with navbar and panel |
| `NavigationShell` | Full navigation system with collapsible sidebar and product switcher |
| `ProductSwitcher` | Adaptive product switcher (dropdown when collapsed, select when expanded) |
| `SDatePicker` | Date picker (wraps `@vuepic/vue-datepicker`) |
| `SConfirmModal` | Confirmation dialog |
| `SMoreActions` | Dropdown menu for contextual actions |

## Composables

```ts
import { useConfirm, useComponentRenderToHTML } from "@dev.smartpricing/smartness-vue";
```

| Composable | Description |
|---|---|
| `useConfirm()` | Programmatic confirmation dialogs. Returns `confirm(options)` → `Promise<boolean>` |
| `useComponentRenderToHTML()` | Renders a Vue component to an HTML string |

## Utilities

```ts
import { getSortableHeader } from "@dev.smartpricing/smartness-vue";
```

| Utility | Description |
|---|---|
| `getSortableHeader` | Creates a sortable table header button for TanStack Table |

## Types

All types are exported from the main entry point:

```ts
import type {
  // Dataviz
  DataPoint,
  AreaDataPoint,
  PieDataPoint,
  DatavizSerieOption,
  DatavizOptions,
  DatavizLocale,

  // Data Calendar
  DataCalendarItem,
  DataCalendarView,
  DataCalendarLocale,
  DataCalendarDropEvent,

  // Other
  SConfirmModalProps,
  SMoreActionsProps,
  MoreActionItem,
  SuiteProduct,
  MaybeReactive,
} from "@dev.smartpricing/smartness-vue";
```

Constants are also exported:

```ts
import {
  DEFAULT_COLOR_PALETTE,
  datavizTranslations,
  dataCalendarTranslations,
  PRODUCTS,
} from "@dev.smartpricing/smartness-vue";
```

## Design System

### Colors

The Smartness palette is pre-configured. Use these color names with any Nuxt UI component:

| Token | Maps to | Usage |
|---|---|---|
| `primary` | petrol-blue | Main actions, links |
| `secondary` | sky | Secondary actions |
| `support` | warm-gray | Neutral/support elements |
| `info` | - | Informational |
| `success` | - | Positive states |
| `warning` | - | Caution states |
| `error` | - | Error states |
| `burgundy` | - | Accent |
| `lemon` | - | Accent |
| `ai` | gradient | AI-related features |
| `learning` | gradient | Learning-related features |

`ai` and `learning` use CSS gradients and are available as special compound variants on `UButton`, `UBadge`, and `UAlert` — they don't have numeric scales (no `ai-500`, etc.).

### Typography

The custom **Saans** variable font is loaded automatically. It's set as the default `--font-sans`.

### Icons

The design system uses [Phosphor icons](https://phosphoricons.com/) with the `ph:` prefix:

```vue
<UIcon name="ph:magnifying-glass" />
<UButton icon="ph:plus" label="Add" />
```

## Package exports

| Export path | Description |
|---|---|
| `@dev.smartpricing/smartness-vue` | Vue plugin + components + types + composables |
| `@dev.smartpricing/smartness-vue/vite` | Vite plugin (Nuxt UI config with Smartness tokens) |
| `@dev.smartpricing/smartness-vue/style.css` | Compiled CSS (colors, typography, component styles) |
