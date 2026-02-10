<template>
	<ShowcasePage
		title="DataCalendar"
		description="A calendar component supporting month and week views, multi-day event spanning, drag-and-drop, localization, and extensive customization through slots."
	>
		<PropsTable :props="propsData" />

		<!-- Basic Usage -->
		<section id="basic" class="space-y-4">
			<ProseH3>Basic Usage</ProseH3>
			<p class="text-muted">
				Default month view with sample calendar items. Navigate with the arrows or click "Today" to return to the current date.
			</p>
			<div class="h-[700px]">
				<SDataCalendar :items="sampleItems" />
			</div>
		</section>

		<!-- Multi-Day Events -->
		<section id="multi-day" class="space-y-4">
			<ProseH3>Multi-Day Events</ProseH3>
			<p class="text-muted">
				Events can span multiple days using <code>fromDate</code> and <code>toDate</code>.
				Multi-day events render as bars spanning across columns. When an event crosses a week
				boundary, it is clipped with continuation indicators (arrows).
			</p>
			<div class="h-[700px]">
				<SDataCalendar :items="multiDayItems" />
			</div>
		</section>

		<!-- Week View -->
		<section id="week-view" class="space-y-4">
			<ProseH3>Week View</ProseH3>
			<p class="text-muted">
				In week view, only 7 days are shown with tall cells. Multi-day events that extend beyond
				the visible week are clipped with continuation indicators.
			</p>
			<div class="h-[500px]">
				<SDataCalendar
					:items="multiDayItems"
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
				<SDataCalendar :items="colorItems" />
			</div>
		</section>

		<!-- Legend -->
		<section id="legend" class="space-y-4">
			<ProseH3>Legend</ProseH3>
			<p class="text-muted">
				Pass an array of legend items to display colored dots with labels in the header.
			</p>
			<div class="h-[700px]">
				<SDataCalendar
					:items="colorItems"
					:legend="legendItems"
				/>
			</div>
		</section>

		<!-- Max Visible Items -->
		<section id="overflow" class="space-y-4">
			<ProseH3>Max Visible Items</ProseH3>
			<p class="text-muted">
				Control how many event lanes are visible per row before showing a "+N" overflow indicator.
				Left: <code>maxVisibleItems="2"</code>, Right: <code>maxVisibleItems="5"</code>.
			</p>
			<div class="flex flex-col gap-4">
				<div class="h-[700px]">
					<SDataCalendar
						:items="manyItems"
						:max-visible-items="2"
					/>
				</div>

				<div class="h-[700px]">
					<SDataCalendar
						:items="manyItems"
						:max-visible-items="5"
					/>
				</div>
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
				<SDataCalendar
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
				<SDataCalendar
					:items="sampleItems"
					:first-day-of-week="selectedFirstDay"
				/>
			</div>
		</section>

		<!-- Drag and Drop -->
		<section id="draggable" class="space-y-4">
			<ProseH3>Drag and Drop</ProseH3>
			<p class="text-muted">
				Enable <code>draggable</code> to allow items to be dragged between dates.
				Dragging shifts the entire event (both fromDate and toDate move by the same delta).
				Drop events are logged below.
			</p>
			<div class="h-[700px]">
				<SDataCalendar
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
				<SDataCalendar
					:items="sampleItems"
					@click-item="onClickItem"
					@click-date="onClickDate"
					@click-add="onClickAdd"
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
				Use the <code>#item</code> slot to completely customize how each item is rendered inside event bars.
			</p>
			<div class="h-[700px]">
				<SDataCalendar :items="sampleItems">
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
				</SDataCalendar>
			</div>
		</section>

		<!-- Toolbar Slot -->
		<section id="toolbar-slot" class="space-y-4">
			<ProseH3>Toolbar Slot</ProseH3>
			<p class="text-muted">
				Use the <code>#toolbar</code> slot to inject custom content into the center of the header bar.
			</p>
			<div class="h-[700px]">
				<SDataCalendar :items="sampleItems">
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
				</SDataCalendar>
			</div>
		</section>

		<!-- Sub-Header Slot -->
		<section id="sub-header-slot" class="space-y-4">
			<ProseH3>Sub-Header Slot</ProseH3>
			<p class="text-muted">
				Use the <code>#sub-header</code> slot to add content between the header and the calendar grid.
			</p>
			<div class="h-[750px]">
				<SDataCalendar :items="sampleItems">
					<template #sub-header>
						<UAlert
							title="Upcoming deadline"
							description="Sprint review is scheduled for this week. Make sure all tasks are completed."
							icon="ph:warning-circle"
							color="warning"
							variant="soft"
						/>
					</template>
				</SDataCalendar>
			</div>
		</section>

		<!-- Responsive Sizing -->
		<section id="responsive-sizing" class="space-y-4">
			<ProseH3>Responsive Sizing</ProseH3>
			<p class="text-muted">
				The calendar adapts to its container dimensions. Toggle between sizes to see how events
				reflow and the layout adjusts.
			</p>
			<div class="flex items-center gap-2 flex-wrap">
				<UButton
					v-for="preset in sizePresets"
					:key="preset.label"
					:variant="selectedSize === preset.label ? 'solid' : 'outline'"
					size="sm"
					@click="selectedSize = preset.label"
				>
					{{ preset.label }}
				</UButton>
			</div>
			<div
				class="overflow-hidden rounded-lg border border-dashed border-primary-300 transition-all duration-300"
				:style="currentSizeStyle"
			>
				<SDataCalendar :items="multiDayItems" />
			</div>
		</section>

		<!-- Disable Add Button -->
		<section id="disable-add" class="space-y-4">
			<ProseH3>Disable Add Button</ProseH3>
			<p class="text-muted">
				Use the <code>disableAdd</code> prop to conditionally disable the add button on specific dates.
				In this example, past dates have the add button disabled. Hover over any cell to see the button.
			</p>
			<div class="h-[700px]">
				<SDataCalendar
					:items="sampleItems"
					:disable-add="disablePastDates"
				/>
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
	import SDataCalendar from "../../../../app/components/DataCalendar/SDataCalendar.vue";
	import PropsTable from "../Utility/PropsTable.vue";

	// --- Props table ---
	const propsData: PropDefinition[] = [
		{ prop: "items", type: "DataCalendarItem[]", description: "List of calendar event items", default: "[]" },
		{ prop: "locale", type: "string", description: "BCP 47 locale (e.g. \"en-US\", \"it-IT\")", default: "\"en-US\"" },
		{ prop: "timezone", type: "string", description: "IANA timezone identifier", default: "Browser timezone" },
		{ prop: "firstDayOfWeek", type: "DataCalendarDayOfWeek", description: "Override first day of week (sun, mon, tue, ...)", default: "Locale default" },
		{ prop: "legend", type: "DataCalendarLegendItem[]", description: "Legend items displayed in the header", default: "[]" },
		{ prop: "maxVisibleItems", type: "number", description: "Max visible event lanes per row before \"+N\" overflow", default: "3" },
		{ prop: "draggable", type: "boolean", description: "Enable drag-and-drop of items between dates", default: "false" },
		{ prop: "translationLocale", type: "DataCalendarLocale", description: "Translation locale key (en, it, de, es)", default: "Derived from locale" },
		{ prop: "disableAdd", type: "(date: string) => boolean", description: "Callback to disable the add button for specific dates. Return true to disable.", default: "undefined" }
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

	// --- Sample Items (single-day) ---
	const sampleItems = ref<DataCalendarItem[]>([
		{ id: 1, fromDate: dayOffset(0), label: "Team Standup", color: "#3b82f6" },
		{ id: 2, fromDate: dayOffset(0), label: "Sprint Planning" },
		{ id: 3, fromDate: dayOffset(1), label: "Design Review", color: "#8b5cf6" },
		{ id: 4, fromDate: dayOffset(2), label: "Client Call", color: "#ef4444" },
		{ id: 5, fromDate: dayOffset(2), label: "Deploy v2.1", color: "#22c55e" },
		{ id: 6, fromDate: dayOffset(3), label: "1:1 with Manager" },
		{ id: 7, fromDate: dayOffset(-1), label: "Retrospective", color: "#f59e0b" },
		{ id: 8, fromDate: dayOffset(-2), label: "Code Review" },
		{ id: 9, fromDate: dayOffset(-3), label: "Architecture Meeting", color: "#06b6d4" },
		{ id: 10, fromDate: dayOffset(5), label: "Product Demo", color: "#ec4899" },
		{ id: 11, fromDate: dayOffset(7), label: "Lunch & Learn" },
		{ id: 12, fromDate: dayOffset(-5), label: "Bug Triage", color: "#ef4444" },
		{ id: 13, fromDate: dayOffset(4), label: "QA Testing" },
		{ id: 14, fromDate: dayOffset(-7), label: "Planning Poker", color: "#8b5cf6" },
		{ id: 15, fromDate: dayOffset(6), label: "Release Prep", color: "#22c55e" }
	]);

	// --- Multi-Day Items ---
	const multiDayItems = ref<DataCalendarItem[]>([
		// Single-day events
		{ id: "md1", fromDate: dayOffset(0), label: "Daily Standup", color: "#3b82f6" },
		{ id: "md2", fromDate: dayOffset(0), label: "Quick Sync", color: "#06b6d4" },

		// 2-day event
		{ id: "md3", fromDate: dayOffset(1), toDate: dayOffset(2), label: "Design Sprint", color: "#8b5cf6" },

		// 3-day event
		{ id: "md4", fromDate: dayOffset(-1), toDate: dayOffset(1), label: "Conference", color: "#ef4444" },

		// 5-day event (crosses a week boundary in most layouts)
		{ id: "md5", fromDate: dayOffset(3), toDate: dayOffset(7), label: "Team Offsite", color: "#22c55e" },

		// Event that starts before current week
		{ id: "md6", fromDate: dayOffset(-4), toDate: dayOffset(-2), label: "Past Workshop", color: "#f59e0b" },

		// Long event (full week+)
		{ id: "md7", fromDate: dayOffset(2), toDate: dayOffset(10), label: "Sprint Cycle", color: "#ec4899" },

		// Single day far out
		{ id: "md8", fromDate: dayOffset(5), label: "Product Demo", color: "#06b6d4" },

		// Overlapping with md5
		{ id: "md9", fromDate: dayOffset(4), toDate: dayOffset(6), label: "Hackathon", color: "#3b82f6" }
	]);

	// --- Color Items ---
	const colorItems = ref<DataCalendarItem[]>([
		{ id: "c1", fromDate: dayOffset(0), label: "Hex: #3b82f6", color: "#3b82f6" },
		{ id: "c2", fromDate: dayOffset(0), label: "Hex: #ef4444", color: "#ef4444" },
		{ id: "c3", fromDate: dayOffset(1), label: "RGB: rgb(34,197,94)", color: "rgb(34, 197, 94)" },
		{ id: "c4", fromDate: dayOffset(1), label: "HSL: hsl(270,60%,60%)", color: "hsl(270, 60%, 60%)" },
		{ id: "c5", fromDate: dayOffset(2), label: "No color (default)" },
		{ id: "c6", fromDate: dayOffset(2), label: "Hex: #f59e0b", color: "#f59e0b" },
		{ id: "c7", fromDate: dayOffset(-1), label: "Hex: #06b6d4", color: "#06b6d4" },
		{ id: "c8", fromDate: dayOffset(-1), label: "No color (default)" }
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
		{ id: "m1", fromDate: dayOffset(0), label: "Meeting 1", color: "#3b82f6" },
		{ id: "m2", fromDate: dayOffset(0), label: "Meeting 2", color: "#ef4444" },
		{ id: "m3", fromDate: dayOffset(0), label: "Meeting 3", color: "#22c55e" },
		{ id: "m4", fromDate: dayOffset(0), label: "Meeting 4", color: "#f59e0b" },
		{ id: "m5", fromDate: dayOffset(0), label: "Meeting 5", color: "#8b5cf6" },
		{ id: "m6", fromDate: dayOffset(0), label: "Meeting 6", color: "#ec4899" },
		{ id: "m7", fromDate: dayOffset(1), label: "Task A" },
		{ id: "m8", fromDate: dayOffset(1), label: "Task B", color: "#06b6d4" },
		{ id: "m9", fromDate: dayOffset(1), label: "Task C", color: "#3b82f6" },
		{ id: "m10", fromDate: dayOffset(1), label: "Task D", color: "#ef4444" },
		// Multi-day overflow test
		{ id: "m11", fromDate: dayOffset(0), toDate: dayOffset(2), label: "Multi-day A", color: "#8b5cf6" },
		{ id: "m12", fromDate: dayOffset(0), toDate: dayOffset(1), label: "Multi-day B", color: "#ec4899" }
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
		{ id: "d1", fromDate: dayOffset(0), label: "Drag me!", color: "#3b82f6" },
		{ id: "d2", fromDate: dayOffset(0), toDate: dayOffset(1), label: "2-day event", color: "#ef4444" },
		{ id: "d3", fromDate: dayOffset(1), toDate: dayOffset(3), label: "3-day span", color: "#22c55e" },
		{ id: "d4", fromDate: dayOffset(2), label: "Flexible meeting", color: "#f59e0b" },
		{ id: "d5", fromDate: dayOffset(-1), toDate: dayOffset(0), label: "Overdue span", color: "#8b5cf6" }
	]);

	const dropLog = ref<string[]>([]);

	function onDrop(event: DataCalendarDropEvent) {
		// Update the item's dates locally by shifting both fromDate and toDate
		const item = draggableItems.value.find((i) => i.id === event.item.id);
		if (item) {
			const delta = event.dayDelta;
			item.fromDate = shiftDate(item.fromDate, delta);
			if (item.toDate) {
				item.toDate = shiftDate(item.toDate, delta);
			}
		}
		dropLog.value.unshift(
			`[drop] "${event.item.label}" shifted by ${event.dayDelta} days (${event.sourceDate} -> ${event.targetDate})`
		);
	}

	function shiftDate(isoDate: string, days: number): string {
		const date = new Date(`${isoDate}T00:00:00`);
		date.setDate(date.getDate() + days);
		const y = date.getFullYear();
		const m = String(date.getMonth() + 1).padStart(2, "0");
		const d = String(date.getDate()).padStart(2, "0");
		return `${y}-${m}-${d}`;
	}

	// --- Events demo ---
	const eventLog = ref<string[]>([]);

	function onClickItem(item: DataCalendarItem) {
		eventLog.value.unshift(`[clickItem] "${item.label}" (id: ${item.id})`);
	}

	function onClickDate(date: CalendarDate) {
		eventLog.value.unshift(`[clickDate] ${date.toString()}`);
	}

	function onClickAdd(date: CalendarDate) {
		eventLog.value.unshift(`[clickAdd] ${date.toString()}`);
	}

	// --- Toolbar demo ---
	const toolbarSearch = ref("");

	// --- Responsive sizing demo ---
	const sizePresets = [
		{ label: "400 x 400", width: "400px", height: "400px" },
		{ label: "600 x 500", width: "600px", height: "500px" },
		{ label: "800 x 600", width: "800px", height: "600px" },
		{ label: "100% x 700", width: "100%", height: "700px" }
	];
	const selectedSize = ref("100% x 700");
	const currentSizeStyle = computed(() => {
		const preset = sizePresets.find((p) => p.label === selectedSize.value) ?? sizePresets[3]!;
		return { width: preset.width, height: preset.height };
	});

	// --- Disable add button demo ---
	function disablePastDates(dateStr: string): boolean {
		const date = new Date(`${dateStr}T00:00:00`);
		const now = new Date();
		now.setHours(0, 0, 0, 0);
		return date.getTime() < now.getTime();
	}
</script>
