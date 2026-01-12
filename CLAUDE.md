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

### Typography

Uses the custom **Saans** variable font:
- Font files: `app/assets/fonts/SaansVF.woff2` (normal) and `SaansVFItalics.woff2` (italic)
- Font declarations: `app/assets/css/main.css` (@font-face)
- Applied globally: `--font-sans: "Saans", "sans-serif"` in @theme

## Layer Components

### Core Components (`app/components/`)

**AppPage.vue** - Dashboard page wrapper
- Props: `panelProps`, `navbarProps` (partial types from @nuxt/ui)
- Slots: `header` (default: `UDashboardNavbar`), default body, `footer`
- Wraps `UDashboardPanel` with consistent layout

**NavigationShell.vue** - Complete navigation system with collapsible sidebar
- Props: `products` (SuiteProduct[]), `items` (NavigationMenuItem[][])
- Models: `collapsed`, `open`, `selectedProduct`
- Features: Product switcher, `UNavigationMenu` with tooltips, localStorage persistence (`smartness-navigation`)

**Navigation/ProductSwitcher.vue** - Adaptive product switcher
- Props: `products`, `currentProduct`, `collapsed`
- Renders as `UDropdownMenu` (collapsed) or `USelect` (expanded)
- Separates products into purchased vs. available sections

### Dataviz Components (`app/components/Dataviz/`)

Complete data visualization system built on ECharts v6:

**UDataviz.vue** - Main chart container
- Props: `loading`, `title`, `actions`, `options`, `locale`
- Features: Header with actions, loading state, no-data state, legend display
- i18n: Supports `en`, `it`, `de`, `es` locales
- Uses inject/provide for child serie registration

**Chart Types**:
- `UDatavizBar.vue` - Bar charts with customizable bar widths and gaps
- `UDatavizLine.vue` - Line charts with smooth curves, mark points/lines
- `UDatavizArea.vue` - Area charts with min/max range data
- `UDatavizPie.vue` - Pie charts with per-slice colors
- `UDatavizScatter.vue` - Scatter plots
- `UDatavizFunnel.vue` - Funnel charts
- `UDatavizTooltip.vue` - Custom tooltip rendering

**Type Definitions** (`types.ts`):
- `DataPoint`: `{ x: string | number, y: number | null }`
- `AreaDataPoint`: `{ x: string | number, min: number, max: number }`
- `PieDataPoint`: `{ name, value, id, color, active }`
- `DatavizSerieOption`: Discriminated union for all chart types
- Default color palette: 12 colors

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
- `echarts: ^6.0.0` - Data visualization engine
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
1. Create new component in `app/components/Dataviz/`
2. Use inject keys `DATAVIZ_UPSERT_SERIE` and `DATAVIZ_REMOVE_SERIE` for registration
3. Add types to `app/components/Dataviz/types.ts`
4. Add showcase examples to `.playground/app/components/Showcase/Dataviz.vue`

**Overriding Component Styles**:
- Modify `app/app.config.ts` using Nuxt UI's slots/variants system
- See existing examples: input, select, tabs, button, slideover, alert, dashboardPanel

**Adding New Layer Components**:
1. Create component in `app/components/`
2. Export types from `app/types/` if needed
3. Add showcase in `.playground/app/components/Showcase/`
4. Register showcase in `.playground/app/composables/useSections.ts`

**ESLint Style**:
- Indentation: tabs (not spaces)
- Quotes: double quotes
- Semicolons: required
- Brace style: 1tbs
- Arrow functions: always use parens
- Vue blocks: template, script, style order
