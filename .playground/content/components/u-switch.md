---
title: USwitch (Smartness)
description: Nuxt UI USwitch — used as-is by the layer with the design system color palette.
category: form
prefix: U
componentName: Switch
showcaseSlug: switch
showcaseFile: Switch
tags: [switch, toggle, form]
subcomponents: []
---

# USwitch — Smartness usage

`USwitch` is consumed without component-level overrides; it inherits the design system colors via the `theme.colors` array (`primary`, `secondary`, `success`, etc.).

## Quick examples

```vue
<USwitch v-model="enabled" />
<USwitch v-model="enabled" color="success" label="Notifications" />
<USwitch v-model="enabled" color="warning" disabled />
```

## Notes

- For driving large preference forms, prefer `UFormField + USwitch` to get the label + description ergonomics.
- **Disabled is always `bg-accented`** (Figma 6696-3770), on *and* off. Nuxt UI only paints the track
  accented while unchecked, so a disabled-on switch kept its color — the layer overrides that in
  `app/config/switch.ts`. `UCheckbox` and `URadioGroup` carry the same fix on their indicator, so all
  three selection controls read the same when disabled.
