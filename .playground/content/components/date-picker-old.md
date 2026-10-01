---
title: DatePicker (old)
description: Deprecated — kept while consumers migrate to SDatePicker. Wrapper around `@vuepic/vue-datepicker` themed with Smartness UI tokens — single date or range, color/size variants, clearable, with custom icon.
category: form
prefix: S
componentName: DatePickerOld
showcaseSlug: date-picker-old
showcaseFile: DatePickerOld
tags: [date, datepicker, calendar, range, form-input, deprecated]
subcomponents: []
---

# SDatePickerOld

**Deprecated** — use [`SDatePicker`](/components/date-picker) or [`SRangeDatePicker`](/components/date-picker). `SDatePickerOld` is a thin wrapper over `@vuepic/vue-datepicker` that adapts the theming and sizing to match the rest of the layer.

## Quick example

```vue
<SDatePickerOld
	v-model="date"
	color="primary"
	size="md"
	placeholder="Select a date"
	clearable
/>
```

## Range mode

```vue
<SDatePickerOld
	v-model="range"
	:range="true"
	color="secondary"
	icon="ph:calendar-blank"
/>
```

## Notes

- Underlying lib is `@vuepic/vue-datepicker` v12 — full prop forwarding is supported.
- Uses Phosphor icons by default (`ph:calendar`).
