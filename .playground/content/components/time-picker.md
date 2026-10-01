---
title: TimePicker
description: STimePicker — segmented time input on UInputTime, "HH:mm" string model, 12/24h cycle from the inferred locale, optional lazy commit.
category: form
prefix: S
componentName: TimePicker
showcaseSlug: time-picker
showcaseFile: TimePicker
tags: [time, timepicker, clock, form-input, internationalized-date]
subcomponents: []
---

# STimePicker

```vue
<STimePicker v-model:time="checkInTime" />
```

- `v-model:time` — `"HH:mm"` (`"HH:mm:ss"` with `granularity="second"`) or `undefined`.
- The clock follows the locale, inferred like the date pickers (`@nuxtjs/i18n` → `<UApp :locale>`, bare `"en"` → `"en-GB"`, so 24h). `hourCycle` forces it.
- `lazy` — commit the typed time on focus out instead of on every keystroke.
- `icon` — leading icon, `ph:clock` by default, `false` to hide it.
- `size`, `color`, `variant`, `highlight`, `placeholder` (a `Time`), `ui` are forwarded to `UInputTime`.

## Formatting

Show a bound time as text with `formatTime` (layer util), which uses the same locale:

```ts
formatTime("18:45"); // "18:45"
```

The shared `time` preset is always 24h (`hourCycle: "h23"`), whatever the locale.

## Notes

- Test id: `time-picker-input`.
- Disabled uses the layer's segmented-field treatment (`DISABLED_SEGMENTED_FIELD`).
