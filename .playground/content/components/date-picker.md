---
title: DatePicker
description: SDatePicker (single date), SRangeDatePicker (start/end with segmented presets) and SDateNavigator (today + prev/next + calendar) — typed segments plus a UCalendar popover, ISO string models, locale inferred from the app.
category: form
prefix: S
componentName: DatePicker
showcaseSlug: date-picker
showcaseFile: DatePicker
tags: [date, datepicker, calendar, range, presets, navigator, form-input, internationalized-date]
subcomponents:
  - SRangeDatePicker
  - SDateNavigator
---

# SDatePicker

A `UInputDate` you can type into, with a clear button and a `UCalendar` popover. The model is an ISO
string, so it goes straight to an API; the `@internationalized/date` values stay inside.

```vue
<SDatePicker v-model:date="checkIn" min-value="2025-01-01" with-today />
```

- `v-model:date` — `"YYYY-MM-DD"` or `undefined`.
- `minValue` / `maxValue` — ISO string or `DateValue`.
- `isDateDisabled` / `isDateUnavailable` — predicates over `DateValue`; a typed disabled date is flagged invalid.
- `calendarProps` — any other `UCalendar` prop (`weekNumbers`, `fixedWeeks`, `defaultPlaceholder`, `color`…).
- Slots: `#day` (cell), `#calendar-header` / `#calendar-footer` (receive `close`).

## Locale

No prop needed. The locale comes from the active `@nuxtjs/i18n` language, else from `<UApp :locale>`.
Bare `"en"` always becomes `"en-GB"`, so day and month never swap. `locale="en-US"` overrides it for one field.
The same resolution backs `useDateLocale()` and the date utils (`formatDate`, `formatTime`…).

# SRangeDatePicker

```vue
<SRangeDatePicker
	v-model:start="filters.from"
	v-model:end="filters.to"
	show-presets
	@change="refetch"
/>
```

- `v-model:start` / `v-model:end` — ISO strings; a partial range (start only) is kept mid-selection.
- `change` — once per complete range, after both models are updated.
- `lazy` — commit typed dates on focus out instead of on every keystroke.
- `numberOfMonths` defaults to 2 (1 on mobile).

## Presets

```vue
<!-- Both segments: "Custom range", then Past and Future, five presets each -->
<SRangeDatePicker v-model:start="from" v-model:end="to" show-presets />

<!-- One segment only -->
<SRangeDatePicker v-model:start="from" v-model:end="to" show-presets="past" />

<!-- Merge your own: sorted by length within their segment, same dates as a built-in replace it -->
<SRangeDatePicker
	v-model:start="from"
	v-model:end="to"
	show-presets
	:presets="[{ label: 'Next 2 weeks', days: 14, direction: 'future' }]"
/>
```

A `DateRangePreset` sets one unit (`days`, `months`, `years`) and a `direction` (`"past"` by default):
past presets end today, future ones start today. `months: 0` is the current month up to (or from) today.
`:default-presets="false"` lists only yours. "Custom range" is always first and lights up when the range matches no preset.

# SDateNavigator

The toolbar filter for day-by-day views (tasks, housekeeping): "Today", previous/next arrows and a label that opens the calendar.

```vue
<SDateNavigator v-model:date="params.date" />
<SDateNavigator v-model:date="params.date" period="week" />
```

- `period="week"` labels the seven-day range and steps by a week; `weekAnchor` picks `"from-selection"` (default) or `"week-start"`.
- `format` replaces the label; `minValue` / `maxValue` disable the arrows past the bounds.

## Beyond the components

Cases too specific for a prop compose `UPopover` + `UCalendar` directly — the showcase has one for each:
multiple dates, minimum range length, independent months, year → month → day flow, semantic labels,
scroll-to-change-month. `UCalendar` is styled by the layer either way.

## Notes

- Test ids are fixed (`date-picker-input`, `range-date-picker-trigger-button`, `date-navigator-prev-button`…), shared by every consumer.
- Disabled fields use the layer's segmented-field treatment (`DISABLED_SEGMENTED_FIELD`), applied to every `UInputDate` / `UInputTime`.
- Replaces the deprecated [`SDatePickerOld`](/components/date-picker-old).
