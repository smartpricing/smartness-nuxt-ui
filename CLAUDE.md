# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Smartness Nuxt UI** is a Nuxt Layer built on top of Nuxt UI v4, featuring the Smartness design system with custom color palette, typography, and component variants. It's designed to be extended by other Nuxt 4 projects as a reusable layer.

**Current Version**: 0.1.6

## Key Architecture Concepts

### Nuxt Layer Architecture

This repository is structured as a **Nuxt Layer**, not a standalone application:
- The root configuration (`nuxt.config.ts`) defines the layer that other projects extend
- `.playground/` contains a development environment that extends the layer for testing
- When extending this layer, projects reference it via: `extends: ["github:smartpricing/smartness-nuxt-ui#v0.1.6"]`

### Dependency Resolution Workaround

Due to Nuxt layer limitations, dependencies installed only in the layer cannot be directly imported by extending projects. The solution:
- `runtime/index.ts` re-exports layer dependencies (zod, @vueuse/core)
- `nuxt.config.ts` creates an alias: `#layers/smartness-nuxt-ui` → `runtime/index.ts`
- Extending projects import as: `import { z } from "#layers/smartness-nuxt-ui"`
- `build.transpile` includes `["zod", "@vueuse/core"]` for proper bundling

### Design System Structure

**Color System**: Defined in two places that must stay synchronized:
1. CSS Variables: `app/assets/css/variables.css` (`:root` variables)
2. UI Config: `app/app.config.ts` (ui.colors mapping) and `nuxt.config.ts` (ui.theme.colors array)

**Custom Color Mappings**:
- `primary` → `petrol-blue-900`
- `secondary` → `sky`
- `support` → `warm-gray`
- Special colors: `ai` and `learning` use CSS gradients, not color scales

**Available Colors**: primary, secondary, support, burgundy, lemon, info, success, warning, error, offblack, learning, ai

**Component Customization**: Custom variants are defined in `app.config.ts` using Nuxt UI's compound variants system. Examples include:
- `btn-ai` and `btn-learning` classes in `app/assets/css/main.css` for gradient border buttons
- `alert-ai-outline` and `alert-learning-outline` for gradient border alerts

**Scrollbar utilities**: Opt-in CSS classes in `app/assets/css/scrollbar.css` for an Apple-style thin scrollbar across browsers. See [docs/scrollbar.md](docs/scrollbar.md). Available classes: `.s-scrollbar`, `.s-scrollbar-thin`, `.s-scrollbars`. All accept CSS custom properties (`--s-scrollbar-size`, `--s-scrollbar-thumb-size`, `--s-scrollbar-thumb`, `--s-scrollbar-track`, `--s-scrollbar-radius`) for per-element overrides.

### Typography

Uses the custom **Saans** variable font:
- Font files: `app/assets/fonts/SaansVF.woff2` (normal) and `SaansVFItalics.woff2` (italic)
- Font declarations: `app/assets/css/main.css` (@font-face)
- Applied globally: `--font-sans: "Saans", "sans-serif"` in @theme

### Icons

**Prefer Phosphor icons** over other icon sets (Lucide, Heroicons, etc.):
- Use the `ph:` prefix format (e.g., `ph:magnifying-glass`, `ph:warning-circle`, `ph:arrows-clockwise`)
- Browse available icons at https://phosphoricons.com/
- Common icons used in this project:
  - `ph:chart-line` - charts/dataviz
  - `ph:warning-circle` - errors/alerts
  - `ph:arrows-clockwise` - refresh/retry
  - `ph:magnifying-glass-minus` - no results/empty search

## Layer Components

### Core Components (`app/components/`)

#### Navigation (`app/components/Navigation/`)

Full usage (composition, props, slots, responsive behavior) and **how the layout fits together** (dashboard group, optional bars, mobile toggle): **[docs/navigation.md](docs/navigation.md)**.

**Quick layout:** `SNavigationShell` (sidebar + group) → default child **`SNavigationPage`** (`UDashboardPanel`). Put `SNavigationBarTop`, `SNavigationBarBreadcrumb`, `SNavigationBarHeader` in `SNavigationPage`’s `#header`; `SNavigationPage` default slot is panel body; optional `#footer`. Place `SNavigationProducts` in `#sidebar-header`. Pass optional `panelProps` on **`SNavigationPage`**.

**SNavigationShell.vue** - Sidebar + `UDashboardGroup`
- Props: `items` (NavigationMenuItem[][]), `storage?` (`UDashboardGroup`)
- Models: `collapsed`, `open`
- Slots: `sidebar-logo` (default: Smartness full logo, hidden when collapsed), `sidebar-header`, `sidebar-footer` (each receives `{ collapsed }`); default (typically `SNavigationPage`)

**SNavigationPage.vue** - Thin `UDashboardPanel` wrapper
- Props: `panelProps?` (forwarded to `UDashboardPanel`)
- Slots: `header`, default (body), `footer`
- Features: `UNavigationMenu` with tooltips, localStorage persistence (`storageKey` default `smartness-navigation-v2`)

**SNavigationBarTop.vue** - Top bar (mobile sidebar toggle + shared actions)
- Props: `cta`, `makeAWish`, `helpCenter`, `helpCenterText`, `user`
- Emits: `cta`, `makeAWish`, `helpCenter`, `user`
- Slots: `logo` (mobile toggle icon, default: Smartness icon); `left`; `default` (whole actions row); `cta`, `makeAWish`, `helpCenter`, `user` (override single controls when using default actions row)

**SNavigationBarBreadcrumb.vue** - Breadcrumb row
- Props: `items?` (BreadcrumbItem[])
- Slots: `left` (overrides UBreadcrumb), `right`

**SNavigationBarHeader.vue** - Title / back / tabs / actions row
- Props: `title?`, `back?` (`ButtonProps | boolean`), `howDoesItWork?` (`ButtonProps | boolean`), `tabs?` (TabsItem[]), `activeTab?`
- Emits: `back`, `howDoesItWork`, `tabChange`
- Slots: `back`, `howDoesItWork`, `title`, `actions`

**SNavigationProducts.vue** - Product switcher for the sidebar header
- Props: `products` (`SuiteProduct[]`), `collapsed?`
- v-model: `SuiteProduct`
- Expanded: `USelect` with leading icon and part-colored labels; collapsed: `UDropdownMenu` with outline icon button
- Purchased vs. recommended grouping unchanged (see `PRODUCTS` in `types/suite.ts`)

All navigation components accept a `ui` prop for CSS class overrides (same pattern as Nuxt UI), except where noted.

#### Auth (`app/components/Auth/`)

Full-page auth layout with animated chevron background for login, signup, and password-reset flows.

**SAuthLayout.vue** - Full-page wrapper with chevron background
- Props: `chevrons?` (`('top-left' | 'top-right' | 'bottom-left' | 'bottom-right')[]`, default `['top-left', 'bottom-right']`), `ui?`
- Slots: `background` (override entire background), `top-right`, `default` (page content), `bottom`

**SAuthFormCard.vue** - Centered card with brand, title, and form body
- Props: `title?`, `maxWidth?` (default 512), `ui?`
- Slots: `brand` (default: Smartness wordmark), `title`, `header-actions`, `default` (form body), `footer` (default: support email)
- i18n: `sAuthFormCard.brandAlt`, `sAuthFormCard.supportPrompt` via `useLocale()`

**SAuthBackground.vue** - Internal: chevron shapes at enabled corners (variant "a" for top, variant "b" for bottom; top-right and bottom-left auto-mirrored)

**SAuthChevron.vue** - Internal: single chevron SVG with breathing pulse animation

#### Alert (`app/components/Alert/`)

**SAlert.vue** — the layer's alert, **to be preferred over `UAlert`** for regular feedback.
- Wraps `UAlert` with a slide-in/out transition driven by `show`, an `#actions` slot (the only source of actions) and a `#default` slot for the text
- Defaults: `color="secondary"`, `variant="soft"` (same default variant as `UBadge`), `orientation="horizontal"` — `color`/`variant` drive surface *and* text, nothing is forced
- Baseline `ui`: `root` = `rounded-lg shrink-0 px-3 py-2 max-lg:order-last max-lg:w-full lg:w-fit`, `title` = `font-medium max-w-96 truncate`; `ui` classes from the consumer are appended and win on conflicts (`mergeSlot` + tailwind-merge)
- Use a bare `UAlert` only for full-width blocks, the `actions` prop, or the `ai`/`learning` gradient outlines

### Dataviz Components (`app/components/Dataviz/`)

Complete data visualization system built on TanStack Charts (`@tanstack/charts`, pinned pre-alpha).

The container collects its children's registrations into a **single immutable chart definition**
(`buildChartDefinition.ts`) that is handed to the library's Vue `<Chart>` component. There is no
imperative instance and no incremental update path — a change rebuilds the definition.

Two things to know before touching it:
- The default slot is invoked from `SDataviz`'s own render, so a child given an inline literal
  (`:data="build()"`) returns a fresh object each pass. Series are re-read only when a
  registration's **signature string** changes; reading `serie` straight into a computed loops.
- The chart host must be sized in pixels from the measured container and positioned absolutely, or
  its own size feeds back into that measurement.

**SDataviz.vue** - Main chart container
- Props: `loading`, `title`, `actions`, `options`, `locale`
- Features: Header with actions, loading state, no-data state, legend display (optional `legendTooltip`; `showInLegend: false` grays out the chip and disables toggle; pie/funnel support per-slice fields on data points)
- i18n: Supports `en`, `it`, `de`, `es` locales
- Uses inject/provide for child serie registration

**Chart Types**:
- `SDatavizBar.vue` - Bar charts with customizable bar widths and gaps
- `SDatavizLine.vue` - Line charts with smooth curves, mark points/lines
- `SDatavizArea.vue` - Area charts with min/max range data
- `SDatavizPie.vue` - Pie charts with per-slice colors
- `SDatavizScatter.vue` - Scatter plots
- `SDatavizFunnel.vue` - Funnel charts
- `SDatavizTooltip.vue` - Tooltip body, rendered into the host's `#tooltipBody` slot

**Type Definitions** (`types.ts`):
- `DataPoint`: `{ x: string | number, y: number | null }`
- `AreaDataPoint`: `{ x: string | number, min: number, max: number }`
- `PieDataPoint`: `{ name, value, id, color, active, legendTooltip?, showInLegend? }`
- `DatavizSerieOption`: Discriminated union for all chart types
- `DatavizOptions`: engine-neutral `xAxis` / `yAxis` / `grid` / `legend` / `tooltip` / `dataZoom`
- Default color palette: 12 colors

**Not supported** (no renderer equivalent): `toolbox`, `visualMap`, polar coordinates for line/bar,
radial gradients, and several distinct bar stacks side by side. See
`.playground/content/components/dataviz.md`.

### Composables (`app/composables/`)

- `useComponentRenderToHTML.ts` - Renders Vue components to HTML strings

### Types (`app/types/`)

- `suite.ts` - Product type definitions for navigation (`SuiteProduct`)

## Playground Structure

### Development Environment (`.playground/`)

**Configuration**:
- Extends parent layer: `extends: [".."]`
- SSR disabled for development
- Compatibility date: 2025-09-01

**Pages**:
- `index.vue` - Homepage with component links grid
- `[slug].vue` - Dynamic showcase pages based on route parameter

**Showcase Components** (`.playground/app/components/Showcase/`):
- `Alerts.vue` - Alert variants and states
- `Auth.vue` - Auth layout and form card examples (full-page preview at `/auth-preview`)
- `Buttons.vue` - All color/variant/size combinations
- `Dataviz.vue` - Extensive chart examples (37KB)
- `Header.vue` - Navigation header variations
- `Navigation.vue` - Navigation menu examples
- `Select.vue` - Select dropdown variants
- `Switch.vue` - Toggle switch examples
- `Tables.vue` - Table variants with expandable rows, search

**Utility Components**:
- `ShowcasePage.vue` - Wrapper that auto-scans sections for navigation
- `PropsTable.vue` - Component property documentation table

**Composables**:
- `useSections()` - Section navigation state management (`scanSections`, `clearSections`)
- `constants.ts` - Design tokens (colors, variants, sizes arrays)

## Development Commands

```bash
# Install dependencies
pnpm install

# Development server (playground)
pnpm dev                     # Runs .playground dev server
pnpm dev:playground         # Explicit playground dev server
pnpm prepare:playground     # Prepare playground environment

# Layer preparation
pnpm prepare                # Prepare the layer itself

# Build & preview
pnpm build                  # Build playground for production
pnpm generate              # Generate static site
pnpm preview               # Preview production build

# Linting
pnpm lint                  # Run ESLint
pnpm lint:fix              # Auto-fix ESLint issues
```

## Key Configuration Files

- `nuxt.config.ts` - Layer configuration (modules, UI theme, CSS imports, aliases)
- `app/app.config.ts` - UI component customization (colors, variants, slots)
- `app/assets/css/main.css` - Main stylesheet with custom button/alert variants
- `app/assets/css/variables.css` - Complete color system CSS variables
- `runtime/index.ts` - Dependency re-exports for layer consumers
- `eslint.config.mjs` - ESLint rules (tabs, double quotes, semicolons)

## Key Dependencies

- `@nuxt/ui: ^4.3.0` - Core UI framework
- `@tanstack/charts: 0.15.0` - Chart grammar (pinned; pre-alpha)
- `d3-scale` / `d3-shape` - Time scales and curve factories for the chart builder
- `reka-ui: ^2.6.1` - Headless UI components
- `tailwindcss: ^4.1.18` - Styling framework
- `zod: ^4.2.1` - Schema validation
- `@vueuse/core: ^14.1.0` - Vue composition utilities

**Nuxt Modules** (in nuxt.config.ts):
- @nuxt/eslint, @nuxt/fonts, @vueuse/nuxt, @nuxt/ui, reka-ui/nuxt

## Important Constraints

**Node Version**: Requires Node.js >= 23 (specified in package.json engines)

**Package Manager**: Use pnpm (specified in packageManager field)

**Lockfile Management**: If layer dependencies update, the lockfile must be recreated to prevent `ERR_PNPM_OUTDATED_LOCKFILE` errors on Netlify builds

**Color Mode**: `colorMode: false` in nuxt.config.ts - dark mode is disabled in current development stage

**SSR**: The playground runs with `ssr: false` for development purposes

## Making Changes

**Adding New Colors**:
1. Add CSS variables to `app/assets/css/variables.css` (all shades 50-950)
2. Add color mapping to `app/app.config.ts` (ui.colors object)
3. Add color name to `nuxt.config.ts` (ui.theme.colors array)

**Creating Custom Button Variants**:
1. Add CSS class to `app/assets/css/main.css` (@layer utilities)
2. Add compound variant to `app/app.config.ts` (ui.button.compoundVariants)
3. Reference the CSS class in the compound variant's `class` property

**Creating Custom Alert Variants**:
1. Add CSS class to `app/assets/css/main.css` (@layer utilities)
2. Add compound variant to `app/app.config.ts` (ui.alert.compoundVariants)
3. Reference the CSS class in the compound variant's `class` property

**Using Gradient Colors (ai/learning)**:
- These colors use CSS gradients defined in `variables.css`
- Apply via compound variants in `app.config.ts` referencing CSS classes
- Cannot be used like standard color scales (no ai-500, learning-200, etc.)

**Adding Dataviz Chart Types**:
1. Create new component in `app/components/Dataviz/` — it renders `<slot />` only
2. Register with `useDatavizSerieRegistration` (id, serie, chartSignature, legendSignature)
3. Add the serie shape to the `DatavizSerieOption` union in `app/components/Dataviz/types.ts`
4. Build its marks in `app/components/Dataviz/buildChartDefinition.ts`, giving each cartesian mark a
   `z` channel — an axis-triggered tooltip groups points by it
5. Add showcase examples to `.playground/app/components/Showcase/Dataviz.vue`

**Overriding Component Styles**:
- Modify `app/app.config.ts` using Nuxt UI's slots/variants system
- See existing examples: input, select, tabs, button, slideover, alert, dashboardPanel

**Adding New Layer Components**:
1. Create component in `app/components/`
2. Export types from `app/types/` if needed
3. Add showcase in `.playground/app/components/Showcase/`
4. Register showcase in `.playground/app/composables/useSections.ts`

**Pure Components and Composed Siblings**:

Components are **pure by default**: they render their own concern and take no form-field props (`label`, `description`, `help`, `error`, `hint`, `required`, `readonly`). A consumer who wants a label composes `SFormField` themselves. This keeps a component usable in filters, toolbars and popovers, where there is no label row.

When the composed version is worth shipping ready-made, add it as a **sibling component**, not a prop or a mode flag on the pure one:

1. Name it for what it adds, not for its layer — `SSliderField` ("slider inside a form field"), never `SSliderOrganism`. The caller reads the name, not the taxonomy.
2. Give the composed one every prop of the pure one, declared explicitly via a shared interface in the component's `types.ts` (`SSliderProps` / `SSliderFieldProps`), and forward them with a computed pick. Attrs fallthrough is cheaper to write but costs autocomplete at the call site, which is the whole point of the composed version.
3. Logic follows the part that needs it. Value parsing and editing state belong with the inputs in the composed component; the pure one keeps only what the bare render needs.
4. Document both on **one** page in `.playground/content/components/`, composed version first — it is the default, and one page keeps the choice visible.
5. During a migration, have the pure component warn under `import.meta.dev` when it receives a prop that moved. Dropping a `label` silently is an accessibility regression that ships green.

Live example: `app/components/Slider/SSlider.vue` (pure) and `SSliderField.vue` (composed).

**ESLint Style**:
- Indentation: tabs (not spaces)
- Quotes: double quotes
- Semicolons: required
- Brace style: 1tbs
- Arrow functions: always use parens
- Vue blocks: template, script, style order

# context-mode — MANDATORY routing rules

You have context-mode MCP tools available. These rules are NOT optional — they protect your context window from flooding. A single unrouted command can dump 56 KB into context and waste the entire session.

## BLOCKED commands — do NOT attempt these

### curl / wget — BLOCKED
Any Bash command containing `curl` or `wget` is intercepted and replaced with an error message. Do NOT retry.
Instead use:
- `ctx_fetch_and_index(url, source)` to fetch and index web pages
- `ctx_execute(language: "javascript", code: "const r = await fetch(...)")` to run HTTP calls in sandbox

### Inline HTTP — BLOCKED
Any Bash command containing `fetch('http`, `requests.get(`, `requests.post(`, `http.get(`, or `http.request(` is intercepted and replaced with an error message. Do NOT retry with Bash.
Instead use:
- `ctx_execute(language, code)` to run HTTP calls in sandbox — only stdout enters context

### WebFetch — BLOCKED
WebFetch calls are denied entirely. The URL is extracted and you are told to use `ctx_fetch_and_index` instead.
Instead use:
- `ctx_fetch_and_index(url, source)` then `ctx_search(queries)` to query the indexed content

## REDIRECTED tools — use sandbox equivalents

### Bash (>20 lines output)
Bash is ONLY for: `git`, `mkdir`, `rm`, `mv`, `cd`, `ls`, `npm install`, `pip install`, and other short-output commands.
For everything else, use:
- `ctx_batch_execute(commands, queries)` — run multiple commands + search in ONE call
- `ctx_execute(language: "shell", code: "...")` — run in sandbox, only stdout enters context

### Read (for analysis)
If you are reading a file to **Edit** it → Read is correct (Edit needs content in context).
If you are reading to **analyze, explore, or summarize** → use `ctx_execute_file(path, language, code)` instead. Only your printed summary enters context. The raw file content stays in the sandbox.

### Grep (large results)
Grep results can flood context. Use `ctx_execute(language: "shell", code: "grep ...")` to run searches in sandbox. Only your printed summary enters context.

## Tool selection hierarchy

1. **GATHER**: `ctx_batch_execute(commands, queries)` — Primary tool. Runs all commands, auto-indexes output, returns search results. ONE call replaces 30+ individual calls.
2. **FOLLOW-UP**: `ctx_search(queries: ["q1", "q2", ...])` — Query indexed content. Pass ALL questions as array in ONE call.
3. **PROCESSING**: `ctx_execute(language, code)` | `ctx_execute_file(path, language, code)` — Sandbox execution. Only stdout enters context.
4. **WEB**: `ctx_fetch_and_index(url, source)` then `ctx_search(queries)` — Fetch, chunk, index, query. Raw HTML never enters context.
5. **INDEX**: `ctx_index(content, source)` — Store content in FTS5 knowledge base for later search.

## Subagent routing

When spawning subagents (Agent/Task tool), the routing block is automatically injected into their prompt. Bash-type subagents are upgraded to general-purpose so they have access to MCP tools. You do NOT need to manually instruct subagents about context-mode.

## Output constraints

- Keep responses under 500 words.
- Write artifacts (code, configs, PRDs) to FILES — never return them as inline text. Return only: file path + 1-line description.
- When indexing content, use descriptive source labels so others can `ctx_search(source: "label")` later.

## ctx commands

| Command | Action |
|---------|--------|
| `ctx stats` | Call the `ctx_stats` MCP tool and display the full output verbatim |
| `ctx doctor` | Call the `ctx_doctor` MCP tool, run the returned shell command, display as checklist |
| `ctx upgrade` | Call the `ctx_upgrade` MCP tool, run the returned shell command, display as checklist |
