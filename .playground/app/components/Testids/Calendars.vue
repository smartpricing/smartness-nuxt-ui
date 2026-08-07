<template>
	<section class="space-y-3">
		<h2 class="text-xl font-semibold">
			Calendars and date pickers
		</h2>
		<p class="text-sm text-muted max-w-3xl">
			The densest components in the set, and the two that answer the reachability question best —
			<code>SDatePicker</code> and <code>SDataCalendar</code> both expose an
			<code>attributes</code> prop keyed by node name, which is the canonical mechanic the standard
			settled on. They also share the layer's sharpest edge: they declare
			<code>inheritAttrs: false</code> and never re-bind <code>$attrs</code>, so the obvious way of
			marking them compiles, renders, and produces nothing at all.
		</p>
		<p class="text-sm text-warning max-w-3xl">
			<strong>Deprecated:</strong> <code>SDatePicker</code> is on its way out. It stays documented —
			and measured — because consumer apps ship it today and QA writes tests against it now.
		</p>

		<TestidCase
			id="u-calendar"
			component="UCalendar"
			rule="attributes"
			note="Four navigation buttons, four prop objects, all ButtonProps. Day cells deliberately get no id: they are generated from a date range, and a test targets them by their rendered date instead."
			:snippet="calendarSnippet"
			:channels="calendarChannels"
		>
			<template #default="{ id }">
				<UCalendar
					:prev-month="{ 'data-testid': id('prev-month') }"
					:next-month="{ 'data-testid': id('next-month') }"
					:prev-year="{ 'data-testid': id('prev-year') }"
					:next-year="{ 'data-testid': id('next-year') }"
					:data-testid="id('root')"
				/>
			</template>
		</TestidCase>

		<TestidCase
			id="s-date-picker"
			component="SDatePicker"
			rule="attributes"
			note="Six node keys, and the attribute written on the component itself as the seventh row — kept deliberately, because it is what a developer writes first and it fails without a warning."
			:snippet="datePickerSnippet"
			:channels="datePickerChannels"
			open-with="[data-testid='case-s-date-picker-input']"
			settle-on="popover"
		>
			<template #default="{ id }">
				<SDatePicker
					v-model="dateValue"
					placeholder="Select a date"
					:data-testid="id('naive')"
					:attributes="{
						root: { 'data-testid': id('root') },
						input: { 'data-testid': id('input') },
						triggerWrapper: { 'data-testid': id('trigger-wrapper') },
						popover: { 'data-testid': id('popover') },
						calendar: { 'data-testid': id('calendar') },
						clearButton: { 'data-testid': id('clear') },
					}"
				/>
			</template>
		</TestidCase>

		<TestidCase
			id="s-data-calendar"
			component="SDataCalendar"
			rule="attributes"
			note="Eleven node keys — read the list as a menu of what can be marked, not as a reference. Events take their attributes from their own item object, which is the repeated-child channel here. Shown in week view on purpose: the month grid collapses events into +N overflow chips at this width, and a collapsed event has no element to carry an id."
			:snippet="dataCalendarSnippet"
			:channels="dataCalendarChannels"
		>
			<template #default="{ id }">
				<!--
					Sized from the outside on purpose, and it is not a detail: `inheritAttrs:
					false` without a re-bind drops `class` and `style` along with everything
					else, so the calendar cannot even be sized from its own tag.
				-->
				<div class="h-[560px] min-w-[680px]">
					<SDataCalendar
						v-model="calendarDate"
						:items="calendarItems"
						view="week"
						:data-testid="id('naive')"
						:attributes="{
							root: { 'data-testid': id('root') },
							header: { 'data-testid': id('header') },
							todayButton: { 'data-testid': id('today') },
							prevButton: { 'data-testid': id('prev') },
							nextButton: { 'data-testid': id('next') },
							dateLabel: { 'data-testid': id('date-label') },
							viewSelector: { 'data-testid': id('view-selector') },
							gridContainer: { 'data-testid': id('grid') },
							weekdayHeader: { 'data-testid': id('weekday') },
							cell: { 'data-testid': id('cell') },
							addButton: { 'data-testid': id('add') },
						}"
					/>
				</div>
			</template>
		</TestidCase>
	</section>
</template>

<script setup lang="ts">
	import type { ChannelSpec } from "~/utils/testidProbing";
	import { caseTestid } from "~/utils/testidProbing";

	// Pre-filled on purpose: the clear button only exists once there is a value to clear.
	const dateValue = ref("2026-08-12");
	const calendarDate = ref("2026-08-04");

	const calendarItems = [
		{
			id: "booking-1",
			fromDate: "2026-08-03",
			toDate: "2026-08-05",
			label: "Villa Aurora",
			attributes: { "data-testid": caseTestid("s-data-calendar", "item"), "data-test-value": "booking-1" }
		},
		{
			id: "booking-2",
			fromDate: "2026-08-10",
			toDate: "2026-08-12",
			label: "Casa Mare",
			attributes: { "data-testid": caseTestid("s-data-calendar", "item"), "data-test-value": "booking-2" }
		}
	];

	const NAIVE = "Confirmed: the component declares inheritAttrs: false and never re-binds $attrs, so the attribute is discarded with no warning. Use the attributes prop.";

	const calendarChannels: ChannelSpec[] = [
		{ key: "root", label: "The calendar", mechanic: ":data-testid=\"ids.stayCalendar\"" },
		{ key: "prev-month", label: "Previous month", mechanic: ":prev-month=\"{ 'data-testid': … }\"" },
		{ key: "next-month", label: "Next month", mechanic: ":next-month=\"{ 'data-testid': … }\"" },
		{ key: "prev-year", label: "Previous year", mechanic: ":prev-year=\"{ 'data-testid': … }\"" },
		{ key: "next-year", label: "Next year", mechanic: ":next-year=\"{ 'data-testid': … }\"" }
	];

	const datePickerChannels: ChannelSpec[] = [
		{ key: "naive", label: "The component itself", mechanic: "<SDatePicker data-testid=\"…\" />", deadEnd: true, instead: NAIVE },
		{ key: "root", label: "The root wrapper", mechanic: ":attributes=\"{ root: { 'data-testid': … } }\"" },
		{ key: "input", label: "The date field", mechanic: ":attributes=\"{ input: { 'data-testid': … } }\"" },
		{ key: "trigger-wrapper", label: "The trigger wrapper", mechanic: ":attributes=\"{ triggerWrapper: { 'data-testid': … } }\"" },
		{ key: "popover", label: "The popover panel", mechanic: ":attributes=\"{ popover: { 'data-testid': … } }\"" },
		{ key: "calendar", label: "The calendar inside it", mechanic: ":attributes=\"{ calendar: { 'data-testid': … } }\"" },
		{ key: "clear", label: "The clear button", mechanic: ":attributes=\"{ clearButton: { 'data-testid': … } }\"" }
	];

	const dataCalendarChannels: ChannelSpec[] = [
		{ key: "naive", label: "The component itself", mechanic: "<SDataCalendar data-testid=\"…\" />", deadEnd: true, instead: NAIVE },
		{ key: "root", label: "The root", mechanic: ":attributes=\"{ root: … }\"" },
		{ key: "header", label: "The header bar", mechanic: ":attributes=\"{ header: … }\"" },
		{ key: "today", label: "The Today button", mechanic: ":attributes=\"{ todayButton: … }\"" },
		{ key: "prev", label: "Previous period", mechanic: ":attributes=\"{ prevButton: … }\"" },
		{ key: "next", label: "Next period", mechanic: ":attributes=\"{ nextButton: … }\"" },
		{ key: "date-label", label: "The period label", mechanic: ":attributes=\"{ dateLabel: … }\"" },
		{ key: "view-selector", label: "The view switcher", mechanic: ":attributes=\"{ viewSelector: … }\"" },
		{ key: "grid", label: "The grid container", mechanic: ":attributes=\"{ gridContainer: … }\"" },
		{ key: "weekday", label: "A weekday header", mechanic: ":attributes=\"{ weekdayHeader: … }\"", uniform: true },
		{ key: "cell", label: "A day cell", mechanic: ":attributes=\"{ cell: … }\"", uniform: true },
		{ key: "item", label: "An event in the grid", mechanic: "items: [{ …, attributes: { 'data-testid': …, 'data-test-value': … } }]", collection: true }
	];

	const calendarSnippet = `<UCalendar
	v-model="stay"
	:data-testid="ids.stayCalendar"
	:prev-month="{ 'data-testid': ids.stayPrevMonth }"
	:next-month="{ 'data-testid': ids.stayNextMonth }"
	:prev-year="{ 'data-testid': ids.stayPrevYear }"
	:next-year="{ 'data-testid': ids.stayNextYear }"
/>

// Day cells get no id — take them by their rendered date:
// page.getByTestId(ids.stayCalendar).getByRole("button", { name: "12" })`;

	const datePickerSnippet = `<!-- data-testid on the component reaches nothing: inheritAttrs: false, $attrs never re-bound -->
<SDatePicker
	v-model="checkIn"
	:attributes="{
		root:           { 'data-testid': ids.checkIn },
		input:          { 'data-testid': ids.checkInInput },
		triggerWrapper: { 'data-testid': ids.checkInTrigger },
		popover:        { 'data-testid': ids.checkInPanel },
		calendar:       { 'data-testid': ids.checkInCalendar },
		clearButton:    { 'data-testid': ids.checkInClear }
	}"
/>`;

	const dataCalendarSnippet = `<SDataCalendar
	v-model="month"
	:items="bookings"
	:attributes="{
		root:          { 'data-testid': ids.bookingCalendar },
		header:        { 'data-testid': ids.bookingCalendarHeader },
		todayButton:   { 'data-testid': ids.bookingCalendarToday },
		prevButton:    { 'data-testid': ids.bookingCalendarPrev },
		nextButton:    { 'data-testid': ids.bookingCalendarNext },
		dateLabel:     { 'data-testid': ids.bookingCalendarLabel },
		viewSelector:  { 'data-testid': ids.bookingCalendarView },
		gridContainer: { 'data-testid': ids.bookingCalendarGrid },
		weekdayHeader: { 'data-testid': ids.bookingCalendarWeekday },
		cell:          { 'data-testid': ids.bookingCalendarCell },
		addButton:     { 'data-testid': ids.bookingCalendarAdd }
	}"
/>

// Events carry their own attributes, one per item:
const bookings = [{
	id: "booking-1",
	start, end, label: "Villa Aurora",
	attributes: { "data-testid": ids.booking, "data-test-value": "booking-1" }
}];`;
</script>
