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
- Consumers receive only `app/`, `runtime/`, `public/`, `nuxt.config.ts`, `types.ts`, `README.md` and this file.

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
