<template>
	<ShowcasePage
		title="DatePicker"
		description="A date picker component based on VueDatePicker, with Nuxt UI styled input and the Smartness design system. Supports single date, range, and multiple selection modes."
	>
		<PropsTable :props="propsData" />

		<!-- ============================== -->
		<!-- Single Date                    -->
		<!-- ============================== -->
		<section id="single" class="space-y-4">
			<ProseH3>Single Date</ProseH3>
			<p class="text-sm text-muted">
				Basic single date selection. The v-model is an ISO string (<code>"YYYY-MM-DD"</code>) or <code>null</code>.
			</p>
			<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
				<div class="space-y-2">
					<div class="text-xs font-medium text-muted">
						Default
					</div>
					<SDatePicker
						v-model="singleDate"
						placeholder="Select a date"
					/>
					<div class="text-xs text-muted">
						Value: {{ singleDate ?? "null" }}
					</div>
				</div>
				<div class="space-y-2">
					<div class="text-xs font-medium text-muted">
						With initial value
					</div>
					<SDatePicker
						v-model="singleDatePrefilled"
						placeholder="Has a value"
					/>
					<div class="text-xs text-muted">
						Value: {{ singleDatePrefilled ?? "null" }}
					</div>
				</div>
			</div>
		</section>

		<!-- ============================== -->
		<!-- Colors                         -->
		<!-- ============================== -->
		<section id="colors" class="space-y-4">
			<ProseH3>Colors</ProseH3>
			<p class="text-sm text-muted">
				The <code>color</code> prop changes the selected date highlight, hover, and range-between colors in the calendar popup.
			</p>
			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
				<div
					v-for="color in datePickerColors"
					:key="color"
					class="space-y-2"
				>
					<div class="text-xs font-medium text-muted capitalize">
						{{ color }}
					</div>
					<SDatePicker
						v-model="colorValues[color]"
						:color="color"
						placeholder="Select a date"
					/>
				</div>
			</div>
		</section>

		<!-- ============================== -->
		<!-- Sizes                          -->
		<!-- ============================== -->
		<section id="sizes" class="space-y-4">
			<ProseH3>Sizes</ProseH3>
			<p class="text-sm text-muted">
				The <code>size</code> prop adjusts the input field size. Available: <code>xs</code>, <code>sm</code>, <code>md</code>, <code>lg</code>, <code>xl</code>.
			</p>
			<div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 items-end">
				<div
					v-for="size in sizes"
					:key="size"
					class="space-y-2"
				>
					<div class="text-xs font-medium text-muted capitalize">
						{{ size }}
					</div>
					<SDatePicker
						v-model="sizeValue"
						:size="size"
						placeholder="Select"
					/>
				</div>
			</div>
		</section>

		<!-- ============================== -->
		<!-- Placeholder                    -->
		<!-- ============================== -->
		<section id="placeholder" class="space-y-4">
			<ProseH3>Placeholder</ProseH3>
			<p class="text-sm text-muted">
				The <code>placeholder</code> prop sets the input placeholder text shown when no date is selected.
			</p>
			<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
				<div class="space-y-2">
					<div class="text-xs font-medium text-muted">
						Custom placeholder
					</div>
					<SDatePicker
						v-model="placeholderValue"
						placeholder="Pick your birthday"
					/>
				</div>
				<div class="space-y-2">
					<div class="text-xs font-medium text-muted">
						No placeholder
					</div>
					<SDatePicker
						v-model="placeholderValue2"
					/>
				</div>
			</div>
		</section>

		<!-- ============================== -->
		<!-- Icon                           -->
		<!-- ============================== -->
		<section id="icon" class="space-y-4">
			<ProseH3>Icon</ProseH3>
			<p class="text-sm text-muted">
				The <code>icon</code> prop changes the trailing icon on the input. Defaults to <code>ph:calendar</code>.
			</p>
			<div class="grid grid-cols-1 md:grid-cols-3 gap-4">
				<div class="space-y-2">
					<div class="text-xs font-medium text-muted">
						Default (ph:calendar)
					</div>
					<SDatePicker
						v-model="iconValue1"
						placeholder="Default icon"
					/>
				</div>
				<div class="space-y-2">
					<div class="text-xs font-medium text-muted">
						Custom (ph:calendar-dots)
					</div>
					<SDatePicker
						v-model="iconValue2"
						icon="ph:calendar-dots"
						placeholder="Custom icon"
					/>
				</div>
				<div class="space-y-2">
					<div class="text-xs font-medium text-muted">
						Custom (ph:clock)
					</div>
					<SDatePicker
						v-model="iconValue3"
						icon="ph:clock"
						placeholder="Clock icon"
					/>
				</div>
			</div>
		</section>

		<!-- ============================== -->
		<!-- Clearable                      -->
		<!-- ============================== -->
		<section id="clearable" class="space-y-4">
			<ProseH3>Clearable</ProseH3>
			<p class="text-sm text-muted">
				The <code>clearable</code> prop (default <code>true</code>) shows an X icon to clear the value. Set to <code>false</code> to disable clearing.
			</p>
			<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
				<div class="space-y-2">
					<div class="text-xs font-medium text-muted">
						Clearable (default)
					</div>
					<SDatePicker
						v-model="clearableValue1"
						placeholder="Select, then clear"
					/>
					<div class="text-xs text-muted">
						Value: {{ clearableValue1 ?? "null" }}
					</div>
				</div>
				<div class="space-y-2">
					<div class="text-xs font-medium text-muted">
						Not clearable
					</div>
					<SDatePicker
						v-model="clearableValue2"
						:clearable="false"
						placeholder="Cannot clear"
					/>
					<div class="text-xs text-muted">
						Value: {{ clearableValue2 ?? "null" }}
					</div>
				</div>
			</div>
		</section>

		<!-- ============================== -->
		<!-- Disabled / Readonly            -->
		<!-- ============================== -->
		<section id="states" class="space-y-4">
			<ProseH3>Disabled / Readonly</ProseH3>
			<p class="text-sm text-muted">
				The <code>disabled</code> prop prevents all interaction. The <code>readonly</code> prop allows viewing but not changing the value.
			</p>
			<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
				<div class="space-y-2">
					<div class="text-xs font-medium text-muted">
						Disabled
					</div>
					<SDatePicker
						model-value="2025-06-15"
						disabled
						placeholder="Disabled"
					/>
				</div>
				<div class="space-y-2">
					<div class="text-xs font-medium text-muted">
						Readonly
					</div>
					<SDatePicker
						model-value="2025-06-15"
						readonly
						placeholder="Readonly"
					/>
				</div>
			</div>
		</section>

		<!-- ============================== -->
		<!-- Range                          -->
		<!-- ============================== -->
		<section id="range" class="space-y-4">
			<ProseH3>Range Selection</ProseH3>
			<p class="text-sm text-muted">
				Enable range mode to select a start and end date. The v-model is <code>{{ "{ start: string, end: string | null }" }}</code> or <code>null</code>.
				Set <code>mode="range"</code> and use <code>rangeConfig</code> for advanced options (partialRange, maxRange, minRange, fixedStart, fixedEnd, autoRange).
			</p>
			<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
				<div class="space-y-2">
					<div class="text-xs font-medium text-muted">
						Basic range
					</div>
					<SDatePicker
						v-model="rangeDate"
						mode="range"
						placeholder="Select date range"
					/>
					<div class="text-xs text-muted">
						Value: {{ rangeDate ? JSON.stringify(rangeDate) : "null" }}
					</div>
				</div>
				<div class="space-y-2">
					<div class="text-xs font-medium text-muted">
						Multi-calendar range
					</div>
					<SDatePicker
						v-model="rangeDate2"
						mode="range"
						:number-of-months="2"
						placeholder="Select range"
					/>
					<div class="text-xs text-muted">
						Value: {{ rangeDate2 ? JSON.stringify(rangeDate2) : "null" }}
					</div>
				</div>
			</div>
		</section>

		<!-- ============================== -->
		<!-- Range Config (advanced)        -->
		<!-- ============================== -->
		<section id="range-config" class="space-y-4">
			<ProseH3>Advanced Range Config</ProseH3>
			<p class="text-sm text-muted">
				Pass an object to <code>rangeConfig</code> with <code>mode="range"</code> for advanced configuration: <code>maxRange</code>, <code>minRange</code>, <code>autoRange</code>, <code>partialRange</code>, etc.
			</p>
			<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
				<div class="space-y-2">
					<div class="text-xs font-medium text-muted">
						Max range: 7 days
					</div>
					<SDatePicker
						v-model="rangeConfigValue1"
						mode="range"
						:range-config="{ maxRange: 7 }"
						placeholder="Max 7 days"
					/>
					<div class="text-xs text-muted">
						Value: {{ rangeConfigValue1 ? JSON.stringify(rangeConfigValue1) : "null" }}
					</div>
				</div>
				<div class="space-y-2">
					<div class="text-xs font-medium text-muted">
						Min range: 3 days
					</div>
					<SDatePicker
						v-model="rangeConfigValue2"
						mode="range"
						:range-config="{ minRange: 3 }"
						placeholder="Min 3 days"
					/>
					<div class="text-xs text-muted">
						Value: {{ rangeConfigValue2 ? JSON.stringify(rangeConfigValue2) : "null" }}
					</div>
				</div>
				<div class="space-y-2">
					<div class="text-xs font-medium text-muted">
						Auto range: 5 days
					</div>
					<SDatePicker
						v-model="rangeConfigValue3"
						mode="range"
						:range-config="{ autoRange: 5 }"
						placeholder="Auto 5 days"
					/>
					<div class="text-xs text-muted">
						Value: {{ rangeConfigValue3 ? JSON.stringify(rangeConfigValue3) : "null" }}
					</div>
				</div>
				<div class="space-y-2">
					<div class="text-xs font-medium text-muted">
						Partial range allowed
					</div>
					<SDatePicker
						v-model="rangeConfigValue4"
						mode="range"
						:range-config="{ partialRange: true }"
						placeholder="Partial OK"
					/>
					<div class="text-xs text-muted">
						Value: {{ rangeConfigValue4 ? JSON.stringify(rangeConfigValue4) : "null" }}
					</div>
				</div>
			</div>
		</section>

		<!-- ============================== -->
		<!-- Multiple                       -->
		<!-- ============================== -->
		<section id="multiple" class="space-y-4">
			<ProseH3>Multiple Selection</ProseH3>
			<p class="text-sm text-muted">
				Select multiple individual dates. The v-model is <code>string[]</code>.
			</p>
			<div class="max-w-sm space-y-2">
				<SDatePicker
					v-model="multiDates"
					mode="multiple"
					placeholder="Select multiple dates"
				/>
				<div class="text-xs text-muted">
					Value: {{ multiDates.length > 0 ? JSON.stringify(multiDates) : "[]" }}
				</div>
			</div>
		</section>

		<!-- ============================== -->
		<!-- Min / Max Value                -->
		<!-- ============================== -->
		<section id="min-max" class="space-y-4">
			<ProseH3>Min / Max Value</ProseH3>
			<p class="text-sm text-muted">
				Restrict selection to a date range using <code>minValue</code> and <code>maxValue</code> (ISO strings). Dates outside the range are disabled.
			</p>
			<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
				<div class="space-y-2">
					<div class="text-xs font-medium text-muted">
						Min: today / Max: +30 days
					</div>
					<SDatePicker
						v-model="minMaxValue"
						:min-value="todayISO"
						:max-value="addDays(todayISO, 30)"
						placeholder="Limited range"
					/>
					<div class="text-xs text-muted">
						Min: {{ todayISO }} / Max: {{ addDays(todayISO, 30) }}
					</div>
				</div>
				<div class="space-y-2">
					<div class="text-xs font-medium text-muted">
						Only past dates (max: today)
					</div>
					<SDatePicker
						v-model="minMaxValue2"
						:max-value="todayISO"
						placeholder="Past dates only"
					/>
				</div>
			</div>
		</section>

		<!-- ============================== -->
		<!-- Disabled Dates                 -->
		<!-- ============================== -->
		<section id="disabled-dates" class="space-y-4">
			<ProseH3>Disabled Dates (isDateDisabled)</ProseH3>
			<p class="text-sm text-muted">
				Use <code>isDateDisabled</code> to programmatically disable specific dates. The function receives an ISO date string and returns <code>true</code> to disable.
			</p>
			<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
				<div class="space-y-2">
					<div class="text-xs font-medium text-muted">
						No weekends
					</div>
					<SDatePicker
						v-model="disabledDatesValue"
						:is-date-disabled="isWeekend"
						placeholder="No weekends"
					/>
				</div>
				<div class="space-y-2">
					<div class="text-xs font-medium text-muted">
						No past dates
					</div>
					<SDatePicker
						v-model="disabledDatesValue2"
						:is-date-disabled="isPastDate"
						placeholder="Future only"
					/>
				</div>
			</div>
		</section>

		<!-- ============================== -->
		<!-- Week Starts On                 -->
		<!-- ============================== -->
		<section id="week-starts-on" class="space-y-4">
			<ProseH3>Week Starts On</ProseH3>
			<p class="text-sm text-muted">
				The <code>weekStartsOn</code> prop sets the first day of the week. <code>0</code> = Sunday, <code>1</code> = Monday (default), ... <code>6</code> = Saturday.
			</p>
			<div class="grid grid-cols-1 md:grid-cols-3 gap-4">
				<div class="space-y-2">
					<div class="text-xs font-medium text-muted">
						Monday (default)
					</div>
					<SDatePicker
						v-model="weekStartValue1"
						:week-starts-on="1"
						placeholder="Mon start"
					/>
				</div>
				<div class="space-y-2">
					<div class="text-xs font-medium text-muted">
						Sunday
					</div>
					<SDatePicker
						v-model="weekStartValue2"
						:week-starts-on="0"
						placeholder="Sun start"
					/>
				</div>
				<div class="space-y-2">
					<div class="text-xs font-medium text-muted">
						Saturday
					</div>
					<SDatePicker
						v-model="weekStartValue3"
						:week-starts-on="6"
						placeholder="Sat start"
					/>
				</div>
			</div>
		</section>

		<!-- ============================== -->
		<!-- Week Numbers                   -->
		<!-- ============================== -->
		<section id="week-numbers" class="space-y-4">
			<ProseH3>Week Numbers</ProseH3>
			<p class="text-sm text-muted">
				The <code>weekNumbers</code> prop displays ISO week numbers alongside each row in the calendar.
			</p>
			<div class="max-w-sm space-y-2">
				<SDatePicker
					v-model="weekNumbersValue"
					week-numbers
					placeholder="With week numbers"
				/>
			</div>
		</section>

		<!-- ============================== -->
		<!-- Fixed Weeks                    -->
		<!-- ============================== -->
		<section id="fixed-weeks" class="space-y-4">
			<ProseH3>Fixed Weeks</ProseH3>
			<p class="text-sm text-muted">
				The <code>fixedWeeks</code> prop (default <code>true</code>) always displays 6 rows. Set to <code>false</code> to allow the calendar height to vary.
			</p>
			<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
				<div class="space-y-2">
					<div class="text-xs font-medium text-muted">
						Fixed weeks (default, 6 rows always)
					</div>
					<SDatePicker
						v-model="fixedWeeksValue1"
						inline
					/>
				</div>
				<div class="space-y-2">
					<div class="text-xs font-medium text-muted">
						Dynamic weeks (variable rows)
					</div>
					<SDatePicker
						v-model="fixedWeeksValue2"
						:fixed-weeks="false"
						inline
					/>
				</div>
			</div>
		</section>

		<!-- ============================== -->
		<!-- Number of Months               -->
		<!-- ============================== -->
		<section id="number-of-months" class="space-y-4">
			<ProseH3>Number of Months</ProseH3>
			<p class="text-sm text-muted">
				The <code>numberOfMonths</code> prop displays multiple calendar months side by side. Useful for range selection or quick overview.
			</p>
			<div class="space-y-4">
				<div class="space-y-2">
					<div class="text-xs font-medium text-muted">
						2 months
					</div>
					<SDatePicker
						v-model="multiMonthValue1"
						:number-of-months="2"
						placeholder="2 months"
					/>
				</div>
				<div class="space-y-2">
					<div class="text-xs font-medium text-muted">
						3 months
					</div>
					<SDatePicker
						v-model="multiMonthValue2"
						:number-of-months="3"
						placeholder="3 months"
					/>
				</div>
			</div>
		</section>

		<!-- ============================== -->
		<!-- Month / Year Controls          -->
		<!-- ============================== -->
		<section id="navigation-controls" class="space-y-4">
			<ProseH3>Month / Year Controls</ProseH3>
			<p class="text-sm text-muted">
				The <code>monthControls</code> and <code>yearControls</code> props toggle the visibility of month/year navigation.
			</p>
			<div class="grid grid-cols-1 md:grid-cols-3 gap-4">
				<div class="space-y-2">
					<div class="text-xs font-medium text-muted">
						Both (default)
					</div>
					<SDatePicker
						v-model="navControlsValue1"
						inline
					/>
				</div>
				<div class="space-y-2">
					<div class="text-xs font-medium text-muted">
						No month navigation
					</div>
					<SDatePicker
						v-model="navControlsValue2"
						:month-controls="false"
						inline
					/>
				</div>
				<div class="space-y-2">
					<div class="text-xs font-medium text-muted">
						No year select
					</div>
					<SDatePicker
						v-model="navControlsValue3"
						:year-controls="false"
						inline
					/>
				</div>
			</div>
		</section>

		<!-- ============================== -->
		<!-- No Today                       -->
		<!-- ============================== -->
		<section id="no-today" class="space-y-4">
			<ProseH3>No Today</ProseH3>
			<p class="text-sm text-muted">
				The <code>noToday</code> prop removes the visual marker/highlight from today's date.
			</p>
			<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
				<div class="space-y-2">
					<div class="text-xs font-medium text-muted">
						Today marker shown (default)
					</div>
					<SDatePicker
						v-model="noTodayValue1"
						inline
					/>
				</div>
				<div class="space-y-2">
					<div class="text-xs font-medium text-muted">
						No today marker
					</div>
					<SDatePicker
						v-model="noTodayValue2"
						no-today
						inline
					/>
				</div>
			</div>
		</section>

		<!-- ============================== -->
		<!-- Hide Offset Dates              -->
		<!-- ============================== -->
		<section id="hide-offset-dates" class="space-y-4">
			<ProseH3>Hide Offset Dates</ProseH3>
			<p class="text-sm text-muted">
				The <code>hideOffsetDates</code> prop hides dates from adjacent (previous/next) months that appear in the current view.
			</p>
			<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
				<div class="space-y-2">
					<div class="text-xs font-medium text-muted">
						Offset dates visible (default)
					</div>
					<SDatePicker
						v-model="hideOffsetValue1"
						inline
					/>
				</div>
				<div class="space-y-2">
					<div class="text-xs font-medium text-muted">
						Offset dates hidden
					</div>
					<SDatePicker
						v-model="hideOffsetValue2"
						hide-offset-dates
						inline
					/>
				</div>
			</div>
		</section>

		<!-- ============================== -->
		<!-- Markers                        -->
		<!-- ============================== -->
		<section id="markers" class="space-y-4">
			<ProseH3>Markers</ProseH3>
			<p class="text-sm text-muted">
				Add visual markers (dots or lines) to specific dates with optional tooltips via the <code>markers</code> prop.
			</p>
			<div class="max-w-sm space-y-2">
				<SDatePicker
					v-model="markerValue"
					:markers="markers"
					placeholder="With markers"
				/>
				<div class="text-xs text-muted">
					Hover over marked dates to see tooltips.
				</div>
			</div>
		</section>

		<!-- ============================== -->
		<!-- Highlight                      -->
		<!-- ============================== -->
		<section id="highlight" class="space-y-4">
			<ProseH3>Highlight</ProseH3>
			<p class="text-sm text-muted">
				The <code>highlight</code> prop visually highlights specific dates. Accepts a function <code>(date: Date) => boolean</code>
				or a config object with <code>dates</code>, <code>weekdays</code>, <code>months</code>, or <code>years</code> arrays.
			</p>
			<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
				<div class="space-y-2">
					<div class="text-xs font-medium text-muted">
						Highlight weekends (function)
					</div>
					<SDatePicker
						v-model="highlightValue1"
						:highlight="highlightWeekends"
						placeholder="Weekends highlighted"
					/>
				</div>
				<div class="space-y-2">
					<div class="text-xs font-medium text-muted">
						Highlight specific weekdays (config)
					</div>
					<SDatePicker
						v-model="highlightValue2"
						:highlight="{ weekdays: [0, 6] }"
						placeholder="Weekdays 0 & 6"
					/>
				</div>
			</div>
		</section>

		<!-- ============================== -->
		<!-- Formats                        -->
		<!-- ============================== -->
		<section id="formats" class="space-y-4">
			<ProseH3>Formats</ProseH3>
			<p class="text-sm text-muted">
				The <code>formats</code> prop customizes how dates are displayed. The <code>input</code> field controls the input display format (default <code>dd/MM/yyyy</code>).
			</p>
			<div class="grid grid-cols-1 md:grid-cols-3 gap-4">
				<div class="space-y-2">
					<div class="text-xs font-medium text-muted">
						Default (dd/MM/yyyy)
					</div>
					<SDatePicker
						v-model="formatsValue1"
						placeholder="dd/MM/yyyy"
					/>
					<div class="text-xs text-muted">
						Value: {{ formatsValue1 ?? "null" }}
					</div>
				</div>
				<div class="space-y-2">
					<div class="text-xs font-medium text-muted">
						MM/dd/yyyy
					</div>
					<SDatePicker
						v-model="formatsValue2"
						:formats="{ input: 'MM/dd/yyyy' }"
						placeholder="MM/dd/yyyy"
					/>
					<div class="text-xs text-muted">
						Value: {{ formatsValue2 ?? "null" }}
					</div>
				</div>
				<div class="space-y-2">
					<div class="text-xs font-medium text-muted">
						yyyy-MM-dd (ISO)
					</div>
					<SDatePicker
						v-model="formatsValue3"
						:formats="{ input: 'yyyy-MM-dd' }"
						placeholder="yyyy-MM-dd"
					/>
					<div class="text-xs text-muted">
						Value: {{ formatsValue3 ?? "null" }}
					</div>
				</div>
			</div>
		</section>

		<!-- ============================== -->
		<!-- Locale                         -->
		<!-- ============================== -->
		<section id="locale" class="space-y-4">
			<ProseH3>Locale</ProseH3>
			<p class="text-sm text-muted">
				The <code>locale</code> prop accepts a date-fns <code>Locale</code> object to localize day names, month names, and formatting.
			</p>
			<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
				<div class="space-y-2">
					<div class="text-xs font-medium text-muted">
						Italian (it)
					</div>
					<SDatePicker
						v-model="localeValue1"
						:locale="itLocale"
						placeholder="Seleziona una data"
					/>
				</div>
				<div class="space-y-2">
					<div class="text-xs font-medium text-muted">
						German (de)
					</div>
					<SDatePicker
						v-model="localeValue2"
						:locale="deLocale"
						placeholder="Datum auswählen"
					/>
				</div>
			</div>
		</section>

		<!-- ============================== -->
		<!-- Start Date                     -->
		<!-- ============================== -->
		<section id="start-date" class="space-y-4">
			<ProseH3>Start Date</ProseH3>
			<p class="text-sm text-muted">
				The <code>startDate</code> prop opens the calendar to a specific date (ISO string) instead of today.
			</p>
			<div class="max-w-sm space-y-2">
				<SDatePicker
					v-model="startDateValue"
					start-date="2024-01-01"
					placeholder="Opens on Jan 2024"
				/>
				<div class="text-xs text-muted">
					Calendar opens to January 2024
				</div>
			</div>
		</section>

		<!-- ============================== -->
		<!-- Year Range                     -->
		<!-- ============================== -->
		<section id="year-range" class="space-y-4">
			<ProseH3>Year Range</ProseH3>
			<p class="text-sm text-muted">
				The <code>yearRange</code> prop limits the years available in the year picker overlay. Default is <code>[1900, 2100]</code>.
			</p>
			<div class="max-w-sm space-y-2">
				<SDatePicker
					v-model="yearRangeValue"
					:year-range="[2020, 2030]"
					placeholder="2020-2030 only"
				/>
				<div class="text-xs text-muted">
					Year picker shows only 2020-2030
				</div>
			</div>
		</section>

		<!-- ============================== -->
		<!-- Preset Dates                   -->
		<!-- ============================== -->
		<section id="preset-dates" class="space-y-4">
			<ProseH3>Preset Dates</ProseH3>
			<p class="text-sm text-muted">
				The <code>presetDates</code> prop adds a sidebar with predefined date options for quick selection.
			</p>
			<div class="max-w-md space-y-2">
				<SDatePicker
					v-model="presetValue"
					:preset-dates="presetDates"
					placeholder="With presets"
				/>
				<div class="text-xs text-muted">
					Value: {{ presetValue ?? "null" }}
				</div>
			</div>
		</section>

		<!-- ============================== -->
		<!-- Flow                           -->
		<!-- ============================== -->
		<section id="flow" class="space-y-4">
			<ProseH3>Flow (Step-by-step)</ProseH3>
			<p class="text-sm text-muted">
				The <code>flow</code> prop defines a step-by-step selection order. For example, pick a year first, then a month, then a day.
			</p>
			<div class="max-w-sm space-y-2">
				<SDatePicker
					v-model="flowValue"
					:flow="{ steps: ['year', 'month', 'calendar'] }"
					placeholder="Year → Month → Day"
				/>
				<div class="text-xs text-muted">
					Value: {{ flowValue ?? "null" }}
				</div>
			</div>
		</section>

		<!-- ============================== -->
		<!-- Inline                         -->
		<!-- ============================== -->
		<section id="inline" class="space-y-4">
			<ProseH3>Inline</ProseH3>
			<p class="text-sm text-muted">
				The <code>inline</code> prop renders the calendar directly without an input trigger.
			</p>
			<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
				<div class="space-y-2">
					<div class="text-xs font-medium text-muted">
						Inline single
					</div>
					<SDatePicker
						v-model="inlineValue"
						inline
					/>
					<div class="text-xs text-muted">
						Value: {{ inlineValue ?? "null" }}
					</div>
				</div>
				<div class="space-y-2">
					<div class="text-xs font-medium text-muted">
						Inline range
					</div>
					<SDatePicker
						v-model="inlineRangeValue"
						inline
						mode="range"
						:number-of-months="2"
					/>
					<div class="text-xs text-muted">
						Value: {{ inlineRangeValue ? JSON.stringify(inlineRangeValue) : "null" }}
					</div>
				</div>
			</div>
		</section>

		<!-- ============================== -->
		<!-- Teleport                       -->
		<!-- ============================== -->
		<section id="teleport" class="space-y-4">
			<ProseH3>Teleport</ProseH3>
			<p class="text-sm text-muted">
				The <code>teleport</code> prop moves the popup to the <code>&lt;body&gt;</code> or a custom CSS selector. Useful inside overflow-hidden containers.
			</p>
			<div class="max-w-sm space-y-2">
				<div
					class="overflow-hidden rounded border border-default p-4"
					style="height: 60px;"
				>
					<div class="text-xs font-medium text-muted mb-2">
						Without teleport (clipped)
					</div>
					<SDatePicker
						v-model="teleportValue1"
						placeholder="Clipped popup"
					/>
				</div>
				<div
					class="overflow-hidden rounded border border-default p-4"
					style="height: 60px;"
				>
					<div class="text-xs font-medium text-muted mb-2">
						With teleport (not clipped)
					</div>
					<SDatePicker
						v-model="teleportValue2"
						teleport
						placeholder="Teleported popup"
					/>
				</div>
			</div>
		</section>

		<!-- ============================== -->
		<!-- Loading                        -->
		<!-- ============================== -->
		<section id="loading" class="space-y-4">
			<ProseH3>Loading</ProseH3>
			<p class="text-sm text-muted">
				The <code>loading</code> prop shows a loading indicator overlay inside the calendar popup.
			</p>
			<div class="max-w-sm space-y-2">
				<SDatePicker
					v-model="loadingValue"
					loading
					placeholder="Loading state"
				/>
				<div class="text-xs text-muted">
					Open the calendar to see the loading indicator.
				</div>
			</div>
		</section>

		<!-- ============================== -->
		<!-- Month Change On Scroll         -->
		<!-- ============================== -->
		<section id="month-change-on-scroll" class="space-y-4">
			<ProseH3>Month Change on Scroll</ProseH3>
			<p class="text-sm text-muted">
				The <code>monthChangeOnScroll</code> prop allows changing months by scrolling the mouse wheel over the calendar.
			</p>
			<div class="max-w-sm space-y-2">
				<SDatePicker
					v-model="scrollMonthValue"
					month-change-on-scroll
					placeholder="Scroll to change month"
				/>
				<div class="text-xs text-muted">
					Open the calendar and scroll your mouse wheel.
				</div>
			</div>
		</section>

		<!-- ============================== -->
		<!-- Formatter                      -->
		<!-- ============================== -->
		<section id="formatter" class="space-y-4">
			<ProseH3>Formatter</ProseH3>
			<p class="text-sm text-muted">
				The <code>formatter</code> prop accepts a function <code>(value: DatePickerValue) => string</code> to fully customize the input display.
				Useful for semantic labels like "Today", relative dates, or custom formatting.
			</p>
			<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
				<div class="space-y-2">
					<div class="text-xs font-medium text-muted">
						Semantic formatter
					</div>
					<SDatePicker
						v-model="formatterValue1"
						:formatter="semanticFormatter"
						placeholder="Select a date"
					/>
					<div class="text-xs text-muted">
						Value: {{ formatterValue1 ?? "null" }}
					</div>
				</div>
				<div class="space-y-2">
					<div class="text-xs font-medium text-muted">
						Range formatter (arrow)
					</div>
					<SDatePicker
						v-model="formatterRangeValue"
						mode="range"
						:formatter="rangeArrowFormatter"
						placeholder="Select range"
					/>
					<div class="text-xs text-muted">
						Value: {{ formatterRangeValue ? JSON.stringify(formatterRangeValue) : "null" }}
					</div>
				</div>
			</div>
		</section>

		<!-- ============================== -->
		<!-- Events (change / input)        -->
		<!-- ============================== -->
		<section id="events" class="space-y-4">
			<ProseH3>Events (change / input)</ProseH3>
			<p class="text-sm text-muted">
				The <code>@change</code> event fires whenever the model value updates. The <code>@input</code> event fires specifically on user date click interactions.
			</p>
			<div class="max-w-sm space-y-2">
				<SDatePicker
					v-model="eventsValue"
					placeholder="Select a date"
					@change="onChangeEvent"
					@input="onInputEvent"
				/>
				<div class="text-xs text-muted space-y-1">
					<div>Value: {{ eventsValue ?? "null" }}</div>
					<div>Last @change: {{ lastChangeEvent }}</div>
					<div>Last @input: {{ lastInputEvent }}</div>
				</div>
			</div>
		</section>

		<!-- ============================== -->
		<!-- Left Sidebar Slot              -->
		<!-- ============================== -->
		<section id="left-sidebar" class="space-y-4">
			<ProseH3>Left Sidebar Slot</ProseH3>
			<p class="text-sm text-muted">
				The <code>#left-sidebar</code> slot renders custom content to the left of the calendar. Useful for quick-pick buttons or navigation aids.
			</p>
			<div class="max-w-md space-y-2">
				<SDatePicker
					v-model="leftSidebarValue"
					placeholder="With sidebar"
				>
					<template #left-sidebar>
						<div class="flex flex-col gap-1 p-2 text-xs min-w-[100px]">
							<button
								v-for="preset in sidebarPresets"
								:key="preset.label"
								class="text-left px-2 py-1 rounded hover:bg-sky-100 transition-colors"
								@click="leftSidebarValue = preset.value"
							>
								{{ preset.label }}
							</button>
						</div>
					</template>
				</SDatePicker>
				<div class="text-xs text-muted">
					Value: {{ leftSidebarValue ?? "null" }}
				</div>
			</div>
		</section>

		<!-- ============================== -->
		<!-- UI Overrides                   -->
		<!-- ============================== -->
		<section id="ui" class="space-y-4">
			<ProseH3>UI Overrides</ProseH3>
			<p class="text-sm text-muted">
				The <code>ui</code> prop allows passing CSS class overrides to the <code>root</code>, <code>input</code>, and <code>calendar</code> parts of the component.
			</p>
			<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
				<div class="space-y-2">
					<div class="text-xs font-medium text-muted">
						Custom root class (border)
					</div>
					<SDatePicker
						v-model="uiValue1"
						:ui="{ root: 'p-2 border-2 border-dashed border-sky-300 rounded-lg' }"
						placeholder="Custom wrapper"
					/>
				</div>
				<div class="space-y-2">
					<div class="text-xs font-medium text-muted">
						Custom input class
					</div>
					<SDatePicker
						v-model="uiValue2"
						:ui="{ input: 'font-bold' }"
						placeholder="Bold input"
					/>
				</div>
			</div>
		</section>
	</ShowcasePage>
</template>

<script lang="ts" setup>
	import type { PropDefinition } from "../Utility/PropsTable.vue";
	import type { DatePickerRangeValue, DatePickerValue } from "~/../../app/components/DatePicker/types";
	import { de as deLocale, it as itLocale } from "date-fns/locale";
	import ShowcasePage from "~/components/Utility/ShowcasePage.vue";
	import PropsTable from "../Utility/PropsTable.vue";

	const { sizes } = useConstants();

	const datePickerColors = ["primary", "secondary", "success", "info", "warning", "error", "neutral"] as const;

	// ---- Helpers ----
	const today = new Date();
	const todayISO = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

	function addDays(iso: string, days: number): string {
		const d = new Date(`${iso}T00:00:00`);
		d.setDate(d.getDate() + days);
		return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
	}

	function isWeekend(date: string): boolean {
		const d = new Date(`${date}T00:00:00`);
		const day = d.getDay();
		return day === 0 || day === 6;
	}

	function isPastDate(date: string): boolean {
		return date < todayISO;
	}

	function highlightWeekends(date: unknown): boolean {
		if (!(date instanceof Date)) return false;
		const day = date.getDay();
		return day === 0 || day === 6;
	}

	// ---- State: Single ----
	const singleDate = ref<string | null>(null);
	const singleDatePrefilled = ref<string | null>(todayISO);

	// ---- State: Colors & Sizes ----
	const sizeValue = ref<string | null>(null);
	const colorValues = ref<Record<string, string | null>>({});

	// ---- State: Placeholder ----
	const placeholderValue = ref<string | null>(null);
	const placeholderValue2 = ref<string | null>(null);

	// ---- State: Icon ----
	const iconValue1 = ref<string | null>(null);
	const iconValue2 = ref<string | null>(null);
	const iconValue3 = ref<string | null>(null);

	// ---- State: Clearable ----
	const clearableValue1 = ref<string | null>(null);
	const clearableValue2 = ref<string | null>(null);

	// ---- State: Range ----
	const rangeDate = ref<DatePickerRangeValue | null>(null);
	const rangeDate2 = ref<DatePickerRangeValue | null>(null);
	const rangeConfigValue1 = ref<DatePickerRangeValue | null>(null);
	const rangeConfigValue2 = ref<DatePickerRangeValue | null>(null);
	const rangeConfigValue3 = ref<DatePickerRangeValue | null>(null);
	const rangeConfigValue4 = ref<DatePickerRangeValue | null>(null);

	// ---- State: Multiple ----
	const multiDates = ref<string[]>([]);

	// ---- State: Min / Max ----
	const minMaxValue = ref<string | null>(null);
	const minMaxValue2 = ref<string | null>(null);

	// ---- State: Disabled Dates ----
	const disabledDatesValue = ref<string | null>(null);
	const disabledDatesValue2 = ref<string | null>(null);

	// ---- State: Week config ----
	const weekStartValue1 = ref<string | null>(null);
	const weekStartValue2 = ref<string | null>(null);
	const weekStartValue3 = ref<string | null>(null);
	const weekNumbersValue = ref<string | null>(null);
	const fixedWeeksValue1 = ref<string | null>(null);
	const fixedWeeksValue2 = ref<string | null>(null);

	// ---- State: Multi-month ----
	const multiMonthValue1 = ref<string | null>(null);
	const multiMonthValue2 = ref<string | null>(null);

	// ---- State: Navigation controls ----
	const navControlsValue1 = ref<string | null>(null);
	const navControlsValue2 = ref<string | null>(null);
	const navControlsValue3 = ref<string | null>(null);

	// ---- State: No Today / Hide Offset ----
	const noTodayValue1 = ref<string | null>(null);
	const noTodayValue2 = ref<string | null>(null);
	const hideOffsetValue1 = ref<string | null>(null);
	const hideOffsetValue2 = ref<string | null>(null);

	// ---- State: Markers & Highlight ----
	const markerValue = ref<string | null>(null);
	const highlightValue1 = ref<string | null>(null);
	const highlightValue2 = ref<string | null>(null);

	// ---- State: Formats ----
	const formatsValue1 = ref<string | null>(null);
	const formatsValue2 = ref<string | null>(null);
	const formatsValue3 = ref<string | null>(null);

	// ---- State: Locale ----
	const localeValue1 = ref<string | null>(null);
	const localeValue2 = ref<string | null>(null);

	// ---- State: Start Date / Year Range ----
	const startDateValue = ref<string | null>(null);
	const yearRangeValue = ref<string | null>(null);

	// ---- State: Preset Dates ----
	const presetValue = ref<string | null>(null);

	// ---- State: Flow ----
	const flowValue = ref<string | null>(null);

	// ---- State: Inline ----
	const inlineValue = ref<string | null>(null);
	const inlineRangeValue = ref<DatePickerRangeValue | null>(null);

	// ---- State: Teleport ----
	const teleportValue1 = ref<string | null>(null);
	const teleportValue2 = ref<string | null>(null);

	// ---- State: Loading ----
	const loadingValue = ref<string | null>(null);

	// ---- State: Scroll month ----
	const scrollMonthValue = ref<string | null>(null);

	// ---- State: UI overrides ----
	const uiValue1 = ref<string | null>(null);
	const uiValue2 = ref<string | null>(null);

	// ---- State: Formatter ----
	const formatterValue1 = ref<string | null>(null);
	const formatterRangeValue = ref<DatePickerRangeValue | null>(null);

	function semanticFormatter(value: DatePickerValue): string {
		if (!value || (typeof value === "string" && value === "")) return "";
		if (typeof value === "string") {
			if (value === todayISO) return "Today";
			if (value === addDays(todayISO, 1)) return "Tomorrow";
			if (value === addDays(todayISO, -1)) return "Yesterday";
			return value;
		}
		return String(value);
	}

	function rangeArrowFormatter(value: DatePickerValue): string {
		if (!value || typeof value !== "object" || Array.isArray(value)) return "";
		const rv = value as DatePickerRangeValue;
		if (!rv.start) return "";
		return rv.end ? `${rv.start} → ${rv.end}` : rv.start;
	}

	// ---- State: Events ----
	const eventsValue = ref<string | null>(null);
	const lastChangeEvent = ref<string>("(none)");
	const lastInputEvent = ref<string>("(none)");

	function onChangeEvent(value: DatePickerValue) {
		lastChangeEvent.value = JSON.stringify(value);
	}

	function onInputEvent(value: DatePickerValue) {
		lastInputEvent.value = JSON.stringify(value);
	}

	// ---- State: Left Sidebar ----
	const leftSidebarValue = ref<string | null>(null);
	const sidebarPresets = [
		{ label: "Today", value: todayISO },
		{ label: "Tomorrow", value: addDays(todayISO, 1) },
		{ label: "+7 days", value: addDays(todayISO, 7) },
		{ label: "+30 days", value: addDays(todayISO, 30) }
	];

	// ---- Data ----
	const markers = [
		{
			date: addDays(todayISO, 2),
			type: "dot" as const,
			tooltip: [{ text: "Meeting", color: "green" }]
		},
		{
			date: addDays(todayISO, 5),
			type: "line" as const,
			tooltip: [{ text: "Deadline", color: "red" }]
		},
		{
			date: addDays(todayISO, 10),
			type: "dot" as const,
			color: "orange"
		}
	];

	const presetDates = [
		{ label: "Today", value: todayISO },
		{ label: "Tomorrow", value: addDays(todayISO, 1) },
		{ label: "In a week", value: addDays(todayISO, 7) },
		{ label: "In a month", value: addDays(todayISO, 30) }
	];

	// ---- Props table ----
	const propsData: PropDefinition[] = [
		{ prop: "modelValue", type: "DatePickerValue", description: "Selected date(s) (v-model). ISO \"YYYY-MM-DD\" for single, { start, end } for range, string[] for multiple." },
		{ prop: "color", type: "DatePickerColor", description: "Theme color for the selected date highlight", default: "primary" },
		{ prop: "size", type: "DatePickerSize", description: "Input field size", default: "md" },
		{ prop: "disabled", type: "boolean", description: "Disable the datepicker", default: "false" },
		{ prop: "readonly", type: "boolean", description: "Readonly state", default: "false" },
		{ prop: "mode", type: "\"single\" | \"range\" | \"multiple\"", description: "Selection mode", default: "single" },
		{ prop: "rangeConfig", type: "DatePickerRangeConfig", description: "Advanced range options (used when mode is \"range\")" },
		{ prop: "weekStartsOn", type: "0-6", description: "First day of the week (0=Sun, 1=Mon)", default: "1" },
		{ prop: "fixedWeeks", type: "boolean", description: "Always display 6 weeks in the calendar", default: "true" },
		{ prop: "weekNumbers", type: "boolean", description: "Show ISO week numbers", default: "false" },
		{ prop: "numberOfMonths", type: "number", description: "Number of calendars displayed side by side", default: "1" },
		{ prop: "minValue", type: "string", description: "Minimum selectable date (ISO string)" },
		{ prop: "maxValue", type: "string", description: "Maximum selectable date (ISO string)" },
		{ prop: "isDateDisabled", type: "(date: string) => boolean", description: "Function to disable specific dates" },
		{ prop: "monthControls", type: "boolean", description: "Show month navigation controls", default: "true" },
		{ prop: "yearControls", type: "boolean", description: "Show year navigation/select controls", default: "true" },
		{ prop: "locale", type: "Locale (date-fns)", description: "Localization via date-fns Locale object" },
		{ prop: "inline", type: "boolean", description: "Render calendar inline without input", default: "false" },
		{ prop: "markers", type: "DatePickerMarker[]", description: "Dot/line markers on specific dates", default: "[]" },
		{ prop: "highlight", type: "HighlightFn | Partial<HighlightConfig>", description: "Highlight specific dates via function or config" },
		{ prop: "presetDates", type: "DatePickerPresetDate[]", description: "Preset date entries shown in sidebar", default: "[]" },
		{ prop: "noToday", type: "boolean", description: "Hide today marker on calendar", default: "false" },
		{ prop: "hideOffsetDates", type: "boolean", description: "Hide dates from adjacent months", default: "false" },
		{ prop: "formats", type: "DatePickerFormats", description: "Format configuration for input/preview display" },
		{ prop: "flow", type: "DatePickerFlowConfig", description: "Step-by-step selection flow (e.g. year → month → day)" },
		{ prop: "yearRange", type: "[number, number]", description: "Year picker range bounds", default: "[1900, 2100]" },
		{ prop: "startDate", type: "string", description: "Open calendar to a specific date (ISO string)" },
		{ prop: "teleport", type: "boolean | string", description: "Teleport popup to body or custom selector", default: "false" },
		{ prop: "placeholder", type: "string", description: "Input placeholder text" },
		{ prop: "clearable", type: "boolean", description: "Show clear (X) button on the input when a value exists", default: "true" },
		{ prop: "icon", type: "string", description: "Trailing icon on the input", default: "ph:calendar" },
		{ prop: "loading", type: "boolean", description: "Show loading overlay in the calendar popup", default: "false" },
		{ prop: "monthChangeOnScroll", type: "boolean | string", description: "Change months by scrolling mouse wheel over calendar" },
		{ prop: "formatter", type: "(value: DatePickerValue) => string", description: "Custom function to format the display value in the input" },
		{ prop: "ui", type: "DatePickerUi", description: "CSS class overrides for root, input, and calendar parts" },
		{ prop: "@change", type: "event", description: "Emitted whenever the model value changes" },
		{ prop: "@input", type: "event", description: "Emitted on user date click interactions" },
		{ prop: "#left-sidebar", type: "slot", description: "Custom content rendered to the left of the calendar" }
	];
</script>
