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
| `rows` | `DataCalendarRow[]` | `[]` | Turns the week view into a rows × days board (see below) |
| `rowId` | `(item) => string \| number \| null` | reads `item.rowId` | Resolves an item's row |
| `showDayNumbers` | `boolean` | `false` | Day-of-month number in the week header |
| `showCellCount` | `boolean` | `false` | Non-interactive item count stacked above each cell's cards |
| `cellCountProps` | `BadgeProps["ui"]` | — | Design overrides for that badge |
| `draggableFromPopover` | `boolean` | `false` | Drag items out of the `+N` overflow popover |
| `stickyRowHeader` | `boolean` | `true` | Pin the leading column while scrolling horizontally |
| `rowHeaderWidth` / `dayMinWidth` | `number` | `180` / `140` | Sizing of the row-grouped grid (px) |
| `ui` | `DataCalendarUi` | `{}` | Class overrides for the day-cell background slots (`cell`, `cellToday`, `cellWeekend`), merged over the theme defaults — e.g. `:ui="{ cellToday: 'bg-secondary-50/50' }"` |

Events: `clickItem`, `clickDate`, `clickAdd`, `drop`, `dropDenied`, `rangeSelect`, `updateView`. Cells expose `data-date` (ISO) for targeting.

## Row-grouped week view (resource board)

Passing `rows` switches the **week** view (month view is unaffected) to a rows × days board: a **sticky leading column** holds the row headers, and items render as stacked cards inside their cell instead of spanning lanes. Rows can be anything — staff, resources, a status bucket. Items are matched to rows through `item.rowId`, or a custom `:row-id` resolver.

```vue
<SDataCalendar
  :items="tasks"
  :rows="[
    { id: 'unassigned', label: 'Unassigned', hideWhenEmpty: true },
    { id: 'maria', label: 'Maria' },
  ]"
  view="week"
  draggable
  show-day-numbers
  show-cell-count
  @drop="onDrop"
>
  <template #row-header="{ row, count }">{{ row.label }} ({{ count }})</template>
  <template #row-item="{ item }">…custom card…</template>
</SDataCalendar>
```

`DataCalendarRow` is `{ id, label, description?, class?, hideWhenEmpty?, revealOnDrag?, disableDrop?, …extra }`. Extra fields survive to the `row-header` slot.

Nothing in the API names a kind of row: a row is an `id` and a `label`, and every behaviour below is a flag you set on it. The "unassigned" row used in the examples is just the most familiar case of a bucket that empties out — the same flags describe a closed resource, a triage lane, or an overflow team equally well.

**Row background.** `class` paints the entire band — header plus all seven cells — so a bucket like "unassigned" reads as one strip:

```ts
{ id: "unassigned", label: "Unassigned", class: "bg-(--color-lemon-50)" }
```

A row that sets `class` owns its background: the today and weekend tints stand down rather than fight it (competing `bg-*` utilities would otherwise be resolved by stylesheet order, not by intent). The drag-target highlight still wins over everything. Keep the colour opaque — the leading column is sticky, and content scrolls underneath it.

**Dragging** works in both axes: dropping a card on another row reassigns it. The `drop` event then carries `sourceRow` / `targetRow` in addition to `sourceDate`, `targetDate` and `dayDelta`. A ghost of the card follows the pointer while dragging, rendered through the same `#row-item` slot so custom cards drag as themselves. Rows with `disableDrop` refuse incoming drops: mid-drag the whole band drops to 60% opacity and the pointer turns into the deny cursor. Outside a drag the row looks and behaves normally, and its own cards can still be dragged *out* — `disableDrop` is about what may land there, not about what may leave.

Releasing over a refused cell emits **`dropDenied`** instead of `drop`, with the same payload (`item`, `sourceDate`, `targetDate`, `dayDelta`, `sourceRow`, `targetRow`), where the target describes where the card *would* have gone. The item is not moved; reacting is up to you:

```vue
@drop-denied="(e) => toast.add({ title: `${e.targetRow?.label} can't take ${e.item.label}` })"
```

Releasing back on the origin cell is a no-op and emits nothing, even from a locked row.

**Cell count.** `showCellCount` stacks a count badge above the cards, in normal flow — it is never a drag source nor a click target. That boolean is the only switch; `cellCountProps` is design only and is handed straight to `UBadge`'s `ui` prop:

```vue
:cell-count-props="{ base: 'rounded-full font-semibold' }"
```

For anything past restyling, replace the badge with the `#cell-header` slot (it receives `{ row, date, items, count }`).

**Overflow.** `maxVisibleItems` caps how many cards a cell renders inline; the rest collapse into a `+N` chip opening a popover. Those items are **not** draggable unless you also set `draggableFromPopover` — off by default so existing calendars keep their current behaviour. With it on, the popover closes the instant a drag starts, which is what makes the cells it was covering reachable as drop targets. Customize via `#row-overflow-trigger` and `#row-overflow-header`; the cards inside reuse `#row-item`.

**`hideWhenEmpty`** hides a row once the visible week holds none of its items. By default that row is force-shown for the duration of any drag, which closes the trap where an emptied bucket (the classic "Unassigned") becomes unreachable: begin dragging any card and the row reappears as a valid drop target. Add **`revealOnDrag: false`** to the row when emptying it should be one-way — items may leave it, but can never be dragged back in.

The calendar never creates, derives or removes rows: it renders exactly the `rows` it is given and reports where the drop landed. Merging domain data back into the item is the consumer's job.

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
- **`SDataCalendarMonthGrid`** / **`SDataCalendarWeekGrid`** / **`SDataCalendarRowGrid`** — internal grid primitives.

## Slots

`header`, `toolbar`, `sub-header`, `item`, `cell-content`, `overflow-trigger`, `overflow-header`, `overflow-item`, and `range-selection`.

Row-grouped week view only: `row-corner`, `row-header`, `cell-header`, `row-item`, `row-overflow-trigger`, `row-overflow-header`, `cell-empty`.

`row-corner` fills the sticky top-left cell and takes any content — a filter, a `USwitch` driving what the cards show, a legend — not just an icon.
