# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Smartness Nuxt UI** is a Nuxt 4 layer built on top of Nuxt UI v4 with the Smartness design system: palette, Saans typography, AI/Learning gradients, Nuxt UI theme overrides and the `S*` components. It is extended by other Nuxt 4 projects; the version is the one in `package.json` (released as a git tag).

## Documentation: the `smartness-ui` skill

How to **use** the layer (every component, composable, theme override, token, locale key and the UI guidelines) is documented only in the `smartness-ui` skill of the team's claude-collection repo (`skills/smartness-ui/`). This repo keeps no usage docs besides this file and `README.md`.

**Whenever you add or change a component, prop, slot, variant, composable, export, token or locale key, update the skill in the same change** (`references/components/<name>.md`, `references/customizations.md`, `references/theming.md`, …). An outdated skill is the main way consumers get this layer wrong.

## Architecture

### Nuxt layer

- `nuxt.config.ts` defines the layer; `.playground/` is a dev app that extends it and is deployed as the showcase.
- Consumers install it as a git dependency aliased `nuxt-ui-layer` (`"nuxt-ui-layer": "github:smartpricing/smartness-nuxt-ui#vX.Y.Z"`) and extend it with `extends: [["nuxt-ui-layer"]]`.
- Consumers receive only `app/`, `runtime/`, `public/`, `nuxt.config.ts`, `types.ts`, `smartness-ui.d.ts`, `README.md` and this file.
- `smartness-ui.d.ts` lets `data-*` attributes through the prop objects of Nuxt UI components; the `prepare:types` hook in `nuxt.config.ts` adds it to the types of every consumer, so apps import nothing.

### Dependency re-exports

Dependencies installed only in the layer cannot be imported directly by consumers:
- `runtime/index.ts` re-exports them (zod, `@vueuse/core` types, date and translatable-text utils, …)
- `nuxt.config.ts` aliases `#layers/smartness-nuxt-ui` → `runtime/index.ts` and `#smartness/locale` → `app/locale/index.ts`
- `build.transpile` lists the packages that must be bundled

### Where things live

- `app/components/` — `S*` components (one folder each, with `types.ts` when they export types)
- `app/composables/`, `app/utils/`, `app/types/` (public types re-exported by `types.ts`)
- `app/config/*.ts` — Nuxt UI theme overrides, wired in `app/app.config.ts`
- `app/config/palette.ts` — the single source of the colors; `pnpm generate:colors` writes `app/assets/css/variables.css`
- `app/assets/css/` — `main.css` (the only Tailwind entry point), typography, gradients, scrollbar utilities
- `app/locale/` — the five locales (`en`, `it`, `de`, `es`, `fr`) extending Nuxt UI's
- `public/fonts/` — Saans variable fonts, served by `@nuxt/fonts` (`fonts.families` in `nuxt.config.ts`)

## Development Commands

```bash
pnpm install
pnpm dev                    # playground dev server
pnpm build                  # nuxt prepare + build the playground
pnpm generate:colors        # after editing app/config/palette.ts
pnpm lint                   # or pnpm lint:fix
pnpm release                # bump, changelog, tag and push (on main)
```

## Important Constraints

- **Package manager**: pnpm (version in `packageManager`).
- **Lockfile**: after a dependency change, regenerate the lockfile so the playground image build (`--frozen-lockfile`) does not fail.
- **Playground deploy**: Kubernetes, https://ui.smartness.com, on every push to `main` (`.github/workflows/deploy.yml`, `Dockerfile`, `helm/`). Health endpoint `.playground/server/api/health.get.ts`. See [docs/deployment.md](docs/deployment.md).
- **Icon data ships with the layer**: `@iconify-json/ph`, `@iconify-json/lucide` (the Nuxt UI icons `app/config/icons.ts` doesn't override) and `@iconify-json/circle-flags` are layer dependencies, found by `@nuxt/icon` in the layer's directory. Apps on `icon.provider: "none"` only render icons their client bundle holds, and the scan finds literal names only: a name built at runtime (like `circle-flags:${code}`) must be listed in `icon.clientBundle.icons` in `nuxt.config.ts`, as the flags are.
- **Color mode**: `colorMode: false`, no dark mode.
- **Playground**: `ssr: false`.

## Making Changes

**Adding a layer component**:
1. Create it in `app/components/<Name>/` and export its public types through `app/types/`
2. Add a showcase in `.playground/app/components/Showcase/` and register it in `.playground/app/composables/useSections.ts`
3. Document it in the skill (`references/components/<name>.md` and `references/components/index.md`)

**Pure components and composed siblings**:

Components are **pure by default**: they render their own concern and take no form-field props (`label`, `description`, `help`, `error`, `hint`, `required`, `readonly`). A consumer who wants a label composes `SFormField`. When a composed version is worth shipping, add it as a **sibling component**, not a prop or a mode flag:

1. Name it for what it adds (`SSliderField`, "slider inside a form field").
2. Give it every prop of the pure one through a shared interface in the component's `types.ts` (`SSliderProps` / `SSliderFieldProps`) and forward them with a computed pick, so autocomplete works at the call site.
3. Logic follows the part that needs it: value parsing and editing state live in the composed component.
4. Document both on one skill page, composed version first.
5. During a migration, have the pure component warn under `import.meta.dev` when it receives a prop that moved.

Live example: `app/components/Slider/SSlider.vue` (pure) and `SSliderField.vue` (composed).

**Theme overrides and variants**: edit the component's file in `app/config/`; gradient colors (`ai`, `learning`) are applied through compound variants that reference the classes in `app/assets/css/`. The full procedures (adding a color, a gradient, a variant) are in the skill's `references/theming.md` and `references/customizations.md`.

**ESLint style**: tabs, double quotes, semicolons, 1tbs, parens around arrow params, SFC order `<template>` → `<script>` → `<style>`.
