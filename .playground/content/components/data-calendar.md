---
title: DataCalendar
description: Calendar layout that renders one or multiple months with custom per-day cells driven by a data array — useful for occupancy/availability/heatmap displays.
category: data
prefix: S
componentName: DataCalendar
showcaseSlug: data-calendar
showcaseFile: DataCalendar
tags: [calendar, occupancy, dataviz, range, monthly, day-cell]
subcomponents:
  - SDataCalendarCell
  - SDataCalendarHeader
  - SDataCalendarItem
  - SDataCalendarMonthGrid
  - SDataCalendarWeekGrid
---

# SDataCalendar

`SDataCalendar` renders a multi-month calendar grid where each day cell can be customized via slots and bound to a data array. Built on top of `@internationalized/date` so it is locale-aware out of the box.

## Quick example

```vue
<SDataCalendar
	v-model="visibleMonth"
	:items="bookings"
	:months="2"
>
	<template #cell="{ day, items }">
		<SDataCalendarCell
			:day="day"
			:badge="items.length || undefined"
		/>
	</template>
</SDataCalendar>
```

## Subcomponents

- **`SDataCalendarCell`** — single day cell renderer (badge, color, tooltip).
- **`SDataCalendarHeader`** — month + navigation arrows.
- **`SDataCalendarItem`** — bar/block representing a multi-day item.
- **`SDataCalendarMonthGrid`** / **`SDataCalendarWeekGrid`** — internal grid primitives.

## Notes

Data items must expose `start: CalendarDate` and `end: CalendarDate` (use `parseDate` from `@internationalized/date`).
