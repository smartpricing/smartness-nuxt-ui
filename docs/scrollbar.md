# Scrollbar

Optional CSS utilities for a consistent Smartness-style scrollbar across browsers.

The styles are bundled with the layer (no extra import is required) but they are **opt-in**: native browser scrollbars are left untouched until you add a class to a scrollable element. The recipe is ported from the legacy Smartness UI library and is intentionally minimal — track + thumb + radius, nothing else — to maximize cross-browser stability.

## Why opt-in?

Different OSes and products expect different scrollbar behavior:

- macOS / iOS users expect thin overlay scrollbars that auto-hide.
- Windows / Linux users are used to wider scrollbars with visible tracks.

Forcing a single style globally can hurt accessibility and break user expectations. The Smartness scrollbar utilities give you a controlled way to apply the on-brand scrollbar to specific containers (typically full-bleed dashboards, code blocks, side panels, and data tables) — or to every nested scroller in a subtree when you want a uniform look.

## Utilities

| Class | Purpose |
| --- | --- |
| `.s-scrollbar` | Default 12px scrollbar with light elevated track (`var(--ui-bg-elevated)`) and a 8px gray thumb (`#c1c1c1`) inset by 2px on each side, with a 8px pill radius — matches the Figma design |
| `.s-scrollbar-thin` | Slimmer 8px variant with transparent track for compact panels |
| `.s-scrollbars` | Cascading helper that applies the default style to every nested scrollable descendant |

## Basic usage

```vue
<template>
  <!-- Default -->
  <div class="s-scrollbar overflow-y-scroll">…</div>

  <!-- Thin variant for compact panels -->
  <div class="s-scrollbar-thin overflow-y-scroll">…</div>

  <!-- Apply to every nested scroller in a layout -->
  <main class="s-scrollbars">
    <aside class="overflow-y-scroll">…</aside>
    <section class="overflow-y-scroll">…</section>
  </main>
</template>
```

## Forcing the scrollbar to always be visible

Browsers (especially macOS Safari/Chrome with trackpad input) only show scrollbars while the user is actively scrolling when `overflow: auto` is used. Use `overflow-scroll` (or `overflow-y-scroll` / `overflow-x-scroll`) on the container to reserve the gutter and keep the styled scrollbar visible at all times — matching the design system mockups:

```vue
<template>
  <!-- Always visible -->
  <div class="s-scrollbar h-64 overflow-y-scroll">…</div>

  <!-- Visible only when overflowing -->
  <div class="s-scrollbar h-64 overflow-y-auto">…</div>
</template>
```

## Customization

Override the CSS custom properties on any element to fine-tune size, colors, and radius without writing new selectors:

| Custom property | Default | Notes |
| --- | --- | --- |
| `--s-scrollbar-size` | `12px` | Width / height of the scrollbar gutter (WebKit only — Firefox uses `scrollbar-width: thin`) |
| `--s-scrollbar-thumb-size` | `8px` | Visible thumb thickness; the difference vs `--s-scrollbar-size` becomes the thumb's transparent inset on every side |
| `--s-scrollbar-track` | `var(--ui-bg-elevated, #f8fafc)` | Track background color |
| `--s-scrollbar-thumb` | `#c1c1c1` | Thumb background color |
| `--s-scrollbar-radius` | `8px` | Border radius of the thumb (pill shape by default) |

```vue
<template>
  <div
    class="s-scrollbar overflow-y-scroll"
    :style="{
      '--s-scrollbar-size': '14px',
      '--s-scrollbar-thumb-size': '10px',
      '--s-scrollbar-thumb': 'var(--ui-color-primary-700)',
      '--s-scrollbar-track': 'var(--ui-color-primary-50)',
      '--s-scrollbar-radius': '6px',
    }"
  >
    <!-- content -->
  </div>
</template>
```

## Browser support

- **Chromium / WebKit** (Chrome, Edge, Safari, Brave, Arc) — full styling via `::-webkit-scrollbar*` pseudo-elements.
- **Firefox** — falls back automatically to `scrollbar-color` (track + thumb) via an `@supports not selector(::-webkit-scrollbar)` block. Track radius and per-state hover colors aren't part of the spec, so Firefox renders a slightly simpler version while keeping the same color palette.

## When **not** to use it

- Long-form reading pages where users benefit from the OS native scrollbar.
- Full-height app shells where overriding the body scrollbar can break browser extensions or trackpad behavior.
- Areas where you need OS-specific affordances (e.g. arrow buttons on Windows for keyboard-centric users) — leave the default scrollbar in place.
