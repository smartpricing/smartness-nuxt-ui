<template>
	<ShowcasePage
		title="DataCalendar"
		description="A calendar component supporting month and week views, item rendering, drag-and-drop, localization, and extensive customization through slots."
	>
		<PropsTable :props="propsData" />

		<!-- Basic Usage -->
		<section id="basic" class="space-y-4">
			<ProseH3>Basic Usage</ProseH3>
			<p class="text-muted">
				Default month view with sample calendar items. Navigate with the arrows or click "Today" to return to the current date.
			</p>
			<div class="h-[700px]">
				<UDataCalendar :items="sampleItems" />
			</div>
		</section>

		<!-- Week View -->
		<section id="week-view" class="space-y-4">
			<ProseH3>Week View</ProseH3>
			<p class="text-muted">
				In week view, only 7 days are shown with tall cells. All items are visible (no overflow truncation).
			</p>
			<div class="h-[500px]">
				<UDataCalendar
					:items="sampleItems"
					view="week"
				/>
			</div>
		</section>

		<!-- Item Colors -->
		<section id="items-colors" class="space-y-4">
			<ProseH3>Item Colors</ProseH3>
			<p class="text-muted">
				Items accept CSS color values (hex, rgb, hsl). Items without a color fall back to the default secondary style.
			</p>
			<div class="h-[700px]">
				<UDataCalendar :items="colorItems" />
			</div>
		</section>

		<!-- Legend -->
		<section id="legend" class="space-y-4">
			<ProseH3>Legend</ProseH3>
			<p class="text-muted">
				Pass an array of legend items to display colored dots with labels in the header.
			</p>
			<div class="h-[700px]">
				<UDataCalendar
					:items="colorItems"
					:legend="legendItems"
				/>
			</div>
		</section>

		<!-- Max Visible Items -->
		<section id="overflow" class="space-y-4">
			<ProseH3>Max Visible Items</ProseH3>
			<p class="text-muted">
				Control how many items are visible per cell before showing a "+N" overflow indicator.
				Left: <code>maxVisibleItems="2"</code>, Right: <code>maxVisibleItems="5"</code>.
			</p>
			<div class="flex flex-col gap-4">
				<UDataCalendar
					:items="manyItems"
					:max-visible-items="2"
				/>

				<UDataCalendar
					:items="manyItems"
					:max-visible-items="5"
				/>
			</div>
		</section>

		<!-- Localization -->
		<section id="locales" class="space-y-4">
			<ProseH3>Localization</ProseH3>
			<p class="text-muted">
				The calendar supports multiple locales for date formatting and UI labels. Select a locale below.
			</p>
			<div class="flex items-center gap-2 flex-wrap">
				<UButton
					v-for="loc in localeOptions"
					:key="loc.value"
					:variant="selectedLocale === loc.value ? 'solid' : 'outline'"
					size="sm"
					@click="selectedLocale = loc.value"
				>
					{{ loc.label }}
				</UButton>
			</div>
			<div class="h-[700px]">
				<UDataCalendar
					:items="sampleItems"
					:locale="selectedLocale"
				/>
			</div>
		</section>

		<!-- First Day of Week -->
		<section id="first-day-of-week" class="space-y-4">
			<ProseH3>First Day of Week</ProseH3>
			<p class="text-muted">
				Override the first day of the week to reorder the grid columns.
			</p>
			<div class="flex items-center gap-2 flex-wrap">
				<UButton
					v-for="day in firstDayOptions"
					:key="day.value"
					:variant="selectedFirstDay === day.value ? 'solid' : 'outline'"
					size="sm"
					@click="selectedFirstDay = day.value"
				>
					{{ day.label }}
				</UButton>
			</div>
			<div class="h-[700px]">
				<UDataCalendar
					:items="sampleItems"
					:first-day-of-week="selectedFirstDay"
				/>
			</div>
		</section>

		<!-- Drag and Drop -->
		<section id="draggable" class="space-y-4">
			<ProseH3>Drag and Drop</ProseH3>
			<p class="text-muted">
				Enable <code>draggable</code> to allow items to be dragged between dates. Drop events are logged below.
			</p>
			<div class="h-[700px]">
				<UDataCalendar
					:items="draggableItems"
					draggable
					@drop="onDrop"
				/>
			</div>
			<div v-if="dropLog.length > 0" class="space-y-2">
				<ProseH4>Drop Event Log</ProseH4>
				<div class="rounded-lg border border-default bg-white p-3 max-h-40 overflow-y-auto">
					<div
						v-for="(entry, idx) in dropLog"
						:key="idx"
						class="font-mono text-xs text-primary-700"
					>
						{{ entry }}
					</div>
				</div>
				<UButton
					variant="outline"
					size="xs"
					@click="dropLog = []"
				>
					Clear Log
				</UButton>
			</div>
		</section>

		<!-- Events -->
		<section id="events" class="space-y-4">
			<ProseH3>Events</ProseH3>
			<p class="text-muted">
				The calendar emits <code>click:item</code>, <code>click:date</code>, and <code>click:add</code> events.
				Interact with the calendar below to see emitted events.
			</p>
			<div class="h-[700px]">
				<UDataCalendar
					:items="sampleItems"
					@click:item="onClickItem"
					@click:date="onClickDate"
					@click:add="onClickAdd"
				/>
			</div>
			<div v-if="eventLog.length > 0" class="space-y-2">
				<ProseH4>Event Log</ProseH4>
				<div class="rounded-lg border border-default bg-white p-3 max-h-40 overflow-y-auto">
					<div
						v-for="(entry, idx) in eventLog"
						:key="idx"
						class="font-mono text-xs text-primary-700"
					>
						{{ entry }}
					</div>
				</div>
				<UButton
					variant="outline"
					size="xs"
					@click="eventLog = []"
				>
					Clear Log
				</UButton>
			</div>
		</section>

		<!-- Custom Item Slot -->
		<section id="custom-item-slot" class="space-y-4">
			<ProseH3>Custom Item Slot</ProseH3>
			<p class="text-muted">
				Use the <code>#item</code> slot to completely customize how each item is rendered inside a cell.
			</p>
			<div class="h-[700px]">
				<UDataCalendar :items="sampleItems">
					<template #item="{ item }">
						<div class="flex items-center gap-1">
							<UIcon
								name="ph:circle-fill"
								class="size-2 shrink-0"
								:style="{ color: item.color || 'var(--color-secondary-500)' }"
							/>
							<span class="truncate text-xs">{{ item.label }}</span>
						</div>
					</template>
				</UDataCalendar>
			</div>
		</section>

		<!-- Custom Cell Content Slot -->
		<section id="custom-cell-slot" class="space-y-4">
			<ProseH3>Custom Cell Content Slot</ProseH3>
			<p class="text-muted">
				Use the <code>#cell-content</code> slot to replace the entire cell body. This example shows
				just the item count as a centered badge when there are items.
			</p>
			<div class="h-[700px]">
				<UDataCalendar :items="sampleItems">
					<template #cell-content="{ items: cellItems }">
						<div class="flex flex-1 items-center justify-center">
							<UBadge
								v-if="cellItems.length > 0"
								color="primary"
								variant="soft"
								size="sm"
							>
								{{ cellItems.length }} {{ cellItems.length === 1 ? "event" : "events" }}
							</UBadge>
							<span
								v-else
								class="text-xs text-primary-400"
							>
								&mdash;
							</span>
						</div>
					</template>
				</UDataCalendar>
			</div>
		</section>

		<!-- Toolbar Slot -->
		<section id="toolbar-slot" class="space-y-4">
			<ProseH3>Toolbar Slot</ProseH3>
			<p class="text-muted">
				Use the <code>#toolbar</code> slot to inject custom content into the center of the header bar.
			</p>
			<div class="h-[700px]">
				<UDataCalendar :items="sampleItems">
					<template #toolbar>
						<div class="flex items-center gap-2">
							<UInput
								:model-value="toolbarSearch"
								placeholder="Filter events..."
								icon="ph:magnifying-glass"
								size="sm"
								class="w-48"
								@update:model-value="toolbarSearch = String($event)"
							/>
							<UBadge
								v-if="toolbarSearch"
								color="info"
								variant="soft"
								size="sm"
							>
								Filtering: "{{ toolbarSearch }}"
							</UBadge>
						</div>
					</template>
				</UDataCalendar>
			</div>
		</section>

		<!-- Sub-Header Slot -->
		<section id="sub-header-slot" class="space-y-4">
			<ProseH3>Sub-Header Slot</ProseH3>
			<p class="text-muted">
				Use the <code>#sub-header</code> slot to add content between the header and the calendar grid.
			</p>
			<div class="h-[750px]">
				<UDataCalendar :items="sampleItems">
					<template #sub-header>
						<UAlert
							title="Upcoming deadline"
							description="Sprint review is scheduled for this week. Make sure all tasks are completed."
							icon="ph:warning-circle"
							color="warning"
							variant="soft"
						/>
					</template>
				</UDataCalendar>
			</div>
		</section>
	</ShowcasePage>
</template>

<script lang="ts" setup>
	import type { CalendarDate } from "@internationalized/date";
	import type { DataCalendarDayOfWeek, DataCalendarDropEvent, DataCalendarItem, DataCalendarLegendItem } from "../../../../app/components/DataCalendar/types";
	import type { PropDefinition } from "../Utility/PropsTable.vue";
	import { today as getToday } from "@internationalized/date";
	import ShowcasePage from "~/components/Utility/ShowcasePage.vue";
	import UDataCalendar from "../../../../app/components/DataCalendar/UDataCalendar.vue";
	import PropsTable from "../Utility/PropsTable.vue";

	// --- Props table ---
	const propsData: PropDefinition[] = [
		{ prop: "items", type: "DataCalendarItem[]", description: "List of calendar event items", default: "[]" },
		{ prop: "locale", type: "string", description: "BCP 47 locale (e.g. \"en-US\", \"it-IT\")", default: "\"en-US\"" },
		{ prop: "timezone", type: "string", description: "IANA timezone identifier", default: "Browser timezone" },
		{ prop: "firstDayOfWeek", type: "DataCalendarDayOfWeek", description: "Override first day of week (sun, mon, tue, ...)", default: "Locale default" },
		{ prop: "legend", type: "DataCalendarLegendItem[]", description: "Legend items displayed in the header", default: "[]" },
		{ prop: "maxVisibleItems", type: "number", description: "Max visible items per cell before \"+N\" overflow", default: "3" },
		{ prop: "draggable", type: "boolean", description: "Enable drag-and-drop of items between dates", default: "false" },
		{ prop: "translationLocale", type: "DataCalendarLocale", description: "Translation locale key (en, it, de, es)", default: "Derived from locale" }
	];

	// --- Helpers ---
	const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
	const todayDate = getToday(tz);

	/** Format a CalendarDate as ISO string "YYYY-MM-DD" */
	function toISO(date: CalendarDate): string {
		return date.toString();
	}

	/** Create a date string offset from today by N days */
	function dayOffset(days: number): string {
		if (days >= 0) {
			return toISO(todayDate.add({ days }));
		}
		return toISO(todayDate.subtract({ days: Math.abs(days) }));
	}

	// --- Sample Items ---
	const sampleItems = ref<DataCalendarItem[]>([
		{ id: 1, date: dayOffset(0), label: "Team Standup", color: "#3b82f6" },
		{ id: 2, date: dayOffset(0), label: "Sprint Planning" },
		{ id: 3, date: dayOffset(1), label: "Design Review", color: "#8b5cf6" },
		{ id: 4, date: dayOffset(2), label: "Client Call", color: "#ef4444" },
		{ id: 5, date: dayOffset(2), label: "Deploy v2.1", color: "#22c55e" },
		{ id: 6, date: dayOffset(3), label: "1:1 with Manager" },
		{ id: 7, date: dayOffset(-1), label: "Retrospective", color: "#f59e0b" },
		{ id: 8, date: dayOffset(-2), label: "Code Review" },
		{ id: 9, date: dayOffset(-3), label: "Architecture Meeting", color: "#06b6d4" },
		{ id: 10, date: dayOffset(5), label: "Product Demo", color: "#ec4899" },
		{ id: 11, date: dayOffset(7), label: "Lunch & Learn" },
		{ id: 12, date: dayOffset(-5), label: "Bug Triage", color: "#ef4444" },
		{ id: 13, date: dayOffset(4), label: "QA Testing" },
		{ id: 14, date: dayOffset(-7), label: "Planning Poker", color: "#8b5cf6" },
		{ id: 15, date: dayOffset(6), label: "Release Prep", color: "#22c55e" }
	]);

	// --- Color Items ---
	const colorItems = ref<DataCalendarItem[]>([
		{ id: "c1", date: dayOffset(0), label: "Hex: #3b82f6", color: "#3b82f6" },
		{ id: "c2", date: dayOffset(0), label: "Hex: #ef4444", color: "#ef4444" },
		{ id: "c3", date: dayOffset(1), label: "RGB: rgb(34,197,94)", color: "rgb(34, 197, 94)" },
		{ id: "c4", date: dayOffset(1), label: "HSL: hsl(270,60%,60%)", color: "hsl(270, 60%, 60%)" },
		{ id: "c5", date: dayOffset(2), label: "No color (default)" },
		{ id: "c6", date: dayOffset(2), label: "Hex: #f59e0b", color: "#f59e0b" },
		{ id: "c7", date: dayOffset(-1), label: "Hex: #06b6d4", color: "#06b6d4" },
		{ id: "c8", date: dayOffset(-1), label: "No color (default)" }
	]);

	// --- Legend Items ---
	const legendItems: DataCalendarLegendItem[] = [
		{ label: "Meeting", color: "#3b82f6" },
		{ label: "Deadline", color: "#ef4444" },
		{ label: "Personal", color: "hsl(270, 60%, 60%)" },
		{ label: "Default", color: "rgb(34, 197, 94)" }
	];

	// --- Many Items (for overflow demo) ---
	const manyItems = ref<DataCalendarItem[]>([
		{ id: "m1", date: dayOffset(0), label: "Meeting 1", color: "#3b82f6" },
		{ id: "m2", date: dayOffset(0), label: "Meeting 2", color: "#ef4444" },
		{ id: "m3", date: dayOffset(0), label: "Meeting 3", color: "#22c55e" },
		{ id: "m4", date: dayOffset(0), label: "Meeting 4", color: "#f59e0b" },
		{ id: "m5", date: dayOffset(0), label: "Meeting 5", color: "#8b5cf6" },
		{ id: "m6", date: dayOffset(0), label: "Meeting 6", color: "#ec4899" },
		{ id: "m7", date: dayOffset(1), label: "Task A" },
		{ id: "m8", date: dayOffset(1), label: "Task B", color: "#06b6d4" },
		{ id: "m9", date: dayOffset(1), label: "Task C", color: "#3b82f6" },
		{ id: "m10", date: dayOffset(1), label: "Task D", color: "#ef4444" }
	]);

	// --- Locale demo ---
	const localeOptions = [
		{ label: "English (US)", value: "en-US" },
		{ label: "Italiano", value: "it-IT" },
		{ label: "Deutsch", value: "de-DE" },
		{ label: "Español", value: "es-ES" }
	];
	const selectedLocale = ref("en-US");

	// --- First day of week demo ---
	const firstDayOptions: { label: string, value: DataCalendarDayOfWeek }[] = [
		{ label: "Sunday", value: "sun" },
		{ label: "Monday", value: "mon" },
		{ label: "Saturday", value: "sat" }
	];
	const selectedFirstDay = ref<DataCalendarDayOfWeek>("mon");

	// --- Drag and drop demo ---
	const draggableItems = ref<DataCalendarItem[]>([
		{ id: "d1", date: dayOffset(0), label: "Drag me!", color: "#3b82f6" },
		{ id: "d2", date: dayOffset(0), label: "Move this task", color: "#ef4444" },
		{ id: "d3", date: dayOffset(1), label: "Reschedule me", color: "#22c55e" },
		{ id: "d4", date: dayOffset(2), label: "Flexible meeting", color: "#f59e0b" },
		{ id: "d5", date: dayOffset(-1), label: "Overdue task", color: "#8b5cf6" }
	]);

	const dropLog = ref<string[]>([]);

	function onDrop(event: DataCalendarDropEvent) {
		// Update the item's date locally
		const item = draggableItems.value.find((i) => i.id === event.item.id);
		if (item) {
			item.date = event.toDate;
		}
		dropLog.value.unshift(
			`[drop] "${event.item.label}" moved from ${event.fromDate} to ${event.toDate}`
		);
	}

	// --- Events demo ---
	const eventLog = ref<string[]>([]);

	function onClickItem(item: DataCalendarItem) {
		eventLog.value.unshift(`[click:item] "${item.label}" (id: ${item.id})`);
	}

	function onClickDate(date: CalendarDate) {
		eventLog.value.unshift(`[click:date] ${date.toString()}`);
	}

	function onClickAdd(date: CalendarDate) {
		eventLog.value.unshift(`[click:add] ${date.toString()}`);
	}

	// --- Toolbar demo ---
	const toolbarSearch = ref("");
</script>
