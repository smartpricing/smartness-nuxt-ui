---
title: DataCalendar
description: Calendar that renders month/week views with multi-day event bars, drag-and-drop, range selection, localization and per-cell customization — useful for occupancy/availability/booking displays.
category: data
prefix: S
componentName: DataCalendar
showcaseSlug: data-calendar
showcaseFile: DataCalendar
tags: [calendar, occupancy, dataviz, range, range-selection, monthly, weekly, day-cell, booking]
subcomponents:
  - SDataCalendarCell
  - SDataCalendarHeader
  - SDataCalendarItem
  - SDataCalendarMonthGrid
  - SDataCalendarWeekGrid
---

# SDataCalendar

`SDataCalendar` renders a month or week calendar grid with multi-day event bars, optional drag-and-drop, range selection and localization. Built on `@internationalized/date`, so it is locale-aware out of the box. The model is an ISO `"YYYY-MM-DD"` string.

## Quick example

```vue
<script setup lang="ts">
import type { DataCalendarItem } from "#components";

const visibleDate = ref("2026-06-01"); // ISO "YYYY-MM-DD"
const items = ref<DataCalendarItem[]>([
	{ id: 1, fromDate: "2026-06-03", label: "Standup", color: "#3b82f6" },
	{ id: 2, fromDate: "2026-06-04", toDate: "2026-06-07", label: "Offsite", color: "#22c55e" }
]);
</script>

<template>
	<SDataCalendar
		v-model="visibleDate"
		v-model:view="view"
		:items="items"
		@click-add="(date) => {}"
		@click-item="(item) => {}"
	/>
</template>
```

## Data items

Each `DataCalendarItem` exposes:

- `id: string | number` — unique key
- `fromDate: string` — ISO `"YYYY-MM-DD"` (inclusive)
- `toDate?: string` — ISO end (inclusive); defaults to `fromDate`
- `label: string`
- `color?: string` — any CSS color (hex/rgb/hsl)
- `tags?: string[]`, `attributes?: Record<string, unknown>`
- **arbitrary extra fields** are allowed (`[key: string]: unknown`) — handy to carry domain data (e.g. `roomTypeId`) that you read back in your own handlers.

## Key props

| Prop | Type | Default | Description |
|---|---|---|---|
| `items` | `DataCalendarItem[]` | `[]` | Calendar events |
| `view` | `"month" \| "week"` (`v-model:view`) | `"month"` | Active view |
| `locale` | `string` | `"en-US"` | BCP 47 locale |
| `firstDayOfWeek` | `DataCalendarDayOfWeek` | locale default | Override first column |
| `maxVisibleItems` | `number` | auto | Lanes per cell before `+N` overflow |
| `draggable` | `boolean` | `false` | Drag-and-drop of items between dates |
| `rangeSelectable` | `boolean` | `false` | Drag across cells to select a date range (see below) |
| `disableAdd` | `(date: string) => boolean` | — | Disable the hover `+` per date |
| `minDate` / `maxDate` | `string` | — | Bound navigation (ISO); does not filter items |

Events: `clickItem`, `clickDate`, `clickAdd`, `drop`, `rangeSelect`, `updateView`. Cells expose `data-date` (ISO) for targeting.

## Range selection

Set `rangeSelectable` to let users **drag across cells to select an inclusive date range**. While dragging, the cells are highlighted; the hover `+` is suppressed on selected cells. On release the `rangeSelect` event fires with `{ fromDate, toDate }` (ISO, normalized). If the `#range-selection` slot is provided, a popover opens **at the pointer-release point** with that slot as its content, and the highlight persists until the popover closes (dismiss, `close()`, or an action).

The component stays schema-agnostic: it emits only the date range. Merge any domain context (room type, unit, …) in your own handler/slot from page state, or join per-day data via a `Record<ISODate, T>` map keyed by date.

```vue
<template>
	<SDataCalendar
		:items="items"
		range-selectable
		@range-select="onRangeSelect"
	>
		<!-- Optional: contextual menu anchored at the release point -->
		<template #range-selection="{ fromDate, toDate, close }">
			<div class="flex flex-col p-1">
				<UButton
					variant="ghost"
					icon="ph:calendar-plus"
					label="Create event"
					@click="() => { create(fromDate, toDate); close(); }"
				/>
				<UButton
					variant="ghost"
					color="neutral"
					icon="ph:x"
					label="Cancel"
					@click="close"
				/>
			</div>
		</template>
	</SDataCalendar>
</template>

<script setup lang="ts">
import type { DataCalendarRangeSelectEvent } from "#components";

function onRangeSelect(event: DataCalendarRangeSelectEvent) {
	// event.fromDate / event.toDate are inclusive ISO "YYYY-MM-DD"
}
</script>
```

Notes:

- `rangeSelect` fires on every completed drag-selection, **regardless** of the slot.
- The `#range-selection` slot only opens a menu when present; without it you get the event only.
- A selection that didn't move (a plain click) does **not** trigger range selection — `clickDate` / `clickAdd` still work.
- Works in both month and week views (shared cell).

## Subcomponents

- **`SDataCalendarCell`** — single day cell (day number, hover `+`, range highlight, `data-date`).
- **`SDataCalendarHeader`** — title, navigation arrows, today, view selector, legend.
- **`SDataCalendarItem`** — bar/block representing a (multi-)day item.
- **`SDataCalendarMonthGrid`** / **`SDataCalendarWeekGrid`** — internal grid primitives.

## Slots

`header`, `toolbar`, `sub-header`, `item`, `cell-content`, `overflow-trigger`, `overflow-header`, `overflow-item`, and `range-selection`.
