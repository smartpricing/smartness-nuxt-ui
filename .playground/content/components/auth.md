---
title: Auth
description: Full-page auth layout with animated chevron background and centered form card for login, signup, password-reset and similar flows.
category: layout
prefix: S
componentName: Auth
showcaseSlug: auth
showcaseFile: Auth
tags: [auth, login, signup, layout, chevron, background, form, card]
subcomponents:
  - SAuthLayout
  - SAuthFormCard
  - SAuthBackground
  - SAuthChevron
---

# Auth layout system

A full-page layout for authentication screens. Composes a decorative animated chevron background with a centered form card.

## Layout sketch

```
SAuthLayout
  ├── #background (default: SAuthBackground)
  │     └── SAuthChevron × N (one per enabled corner)
  ├── #top-right (locale switcher, etc.)
  ├── <main> — default slot
  │     └── SAuthFormCard
  │           ├── #brand (default: Smartness wordmark)
  │           ├── #title / title prop
  │           ├── #header-actions
  │           ├── default slot (form body)
  │           └── #footer (default: support email)
  └── #bottom (terms link, etc.)
```

## Quick example

```vue
<SAuthLayout>
  <template #top-right>
    <MyLocaleSwitcher />
  </template>
  <SAuthFormCard title="Sign in">
    <UFormField label="Email">
      <UInput placeholder="you@example.com" />
    </UFormField>
    <UFormField label="Password">
      <UInput type="password" />
    </UFormField>
    <UButton label="Sign in" color="primary" block />
  </SAuthFormCard>
  <template #bottom>
    <NuxtLink to="/terms">Terms and Conditions</NuxtLink>
  </template>
</SAuthLayout>
```

## Components

| Component | Purpose | Public API |
|---|---|---|
| **`SAuthLayout`** | Full-page wrapper with chevron background. | `chevrons` prop, `#top-right`, `#bottom`, `#background` slots |
| **`SAuthFormCard`** | Centered card with brand, title, form body, footer. | `title`, `maxWidth` props; `#brand`, `#title`, `#header-actions`, `#footer` slots |
| **`SAuthBackground`** | Internal: renders chevrons at enabled corners. | `chevrons` prop |
| **`SAuthChevron`** | Internal: single animated chevron SVG with pulse. | `variant`, `size`, `flipX`, `flipY` props |

## Chevron positions

The `chevrons` prop controls which corners show decorative shapes. Default: `['top-left', 'bottom-right']`.

Available corners: `top-left`, `top-right`, `bottom-left`, `bottom-right`.

- Top corners use variant "a" (smaller, 650px desktop / 300px mobile)
- Bottom corners use variant "b" (larger, 1000px desktop / 400px mobile)
- `top-right` and `bottom-left` are automatically mirrored so wedges point inward

```vue
<!-- All four corners -->
<SAuthLayout :chevrons="['top-left', 'top-right', 'bottom-left', 'bottom-right']">
  ...
</SAuthLayout>

<!-- No background -->
<SAuthLayout :chevrons="[]">
  ...
</SAuthLayout>
```

## Notes

- Both components accept `ui` prop for CSS class overrides.
- `SAuthFormCard` default footer shows `support@smartpricing.it` — override with `#footer` slot.
- `SAuthFormCard` default brand shows Smartness wordmark — override with `#brand` slot.
- Localized strings (`sAuthFormCard.brandAlt`, `sAuthFormCard.supportPrompt`) come from the layer's i18n keys.
- Pulse animation is disabled on mobile and when `prefers-reduced-motion` is active.
