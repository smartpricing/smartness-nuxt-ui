<template>
	<ShowcasePage
		title="DatePicker"
		description="SDatePicker (single date), SRangeDatePicker (start/end with presets) and SDateNavigator (today + prev/next + calendar), built on UInputDate and UCalendar. Locale is inferred from @nuxtjs/i18n or <UApp :locale>, bare &quot;en&quot; reads as en-GB. Where a case is too specific for a component, the example composes UPopover + UCalendar directly."
	>
		<PropsTable :props="propsData" />

		<!-- ============================== -->
		<!-- Single Date                    -->
		<!-- ============================== -->
		<section id="single" class="space-y-4">
			<ProseH3>Single Date</ProseH3>
			<p class="text-sm text-muted">
				Type the date in the segments or pick it from the calendar. <code>v-model:date</code> is an ISO string (<code>"YYYY-MM-DD"</code>) or <code>undefined</code>.
			</p>
			<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
				<div class="space-y-2">
					<div class="text-xs font-medium text-muted">
						Default
					</div>
					<SDatePicker v-model:date="singleDate" />
					<div class="text-xs text-muted">
						Value: {{ singleDate ?? "undefined" }}
					</div>
				</div>
				<div class="space-y-2">
					<div class="text-xs font-medium text-muted">
						With initial value and "Today" shortcut
					</div>
					<SDatePicker v-model:date="singleDatePrefilled" with-today />
					<div class="text-xs text-muted">
						Value: {{ singleDatePrefilled ?? "undefined" }}
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
				<code>color</code> drives the input highlight; the calendar selection color goes through <code>calendarProps.color</code>.
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
						v-model:date="colorValues[color]"
						:color="color"
						highlight
						:calendar-props="{ color }"
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
				The <code>size</code> prop adjusts the input. Available: <code>xs</code>, <code>sm</code>, <code>md</code>, <code>lg</code>, <code>xl</code>.
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
					<SDatePicker v-model:date="sizeValue" :size="size" />
				</div>
			</div>
		</section>

		<!-- ============================== -->
		<!-- Placeholder                    -->
		<!-- ============================== -->
		<section id="placeholder" class="space-y-4">
			<ProseH3>Placeholder</ProseH3>
			<p class="text-sm text-muted">
				Empty segments show the locale's own pattern (<code>dd/mm/yyyy</code> in en-GB), so there is no free-text placeholder.
				<code>placeholder</code> — forwarded to <code>UInputDate</code> — is the date the segments start from when typing or using the arrow keys.
			</p>
			<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
				<div class="space-y-2">
					<div class="text-xs font-medium text-muted">
						Locale pattern (default)
					</div>
					<SDatePicker v-model:date="placeholderValue" />
				</div>
				<div class="space-y-2">
					<div class="text-xs font-medium text-muted">
						Arrow keys start from 1 Jan 1990
					</div>
					<SDatePicker v-model:date="placeholderValue2" :placeholder="birthdayPlaceholder" />
				</div>
			</div>
		</section>

		<!-- ============================== -->
		<!-- Icon                           -->
		<!-- ============================== -->
		<section id="icon" class="space-y-4">
			<ProseH3>Icon</ProseH3>
			<p class="text-sm text-muted">
				The <code>icon</code> prop changes the calendar button icon. Defaults to <code>ph:calendar-blank</code>.
			</p>
			<div class="grid grid-cols-1 md:grid-cols-3 gap-4">
				<div class="space-y-2">
					<div class="text-xs font-medium text-muted">
						Default (ph:calendar-blank)
					</div>
					<SDatePicker v-model:date="iconValue1" />
				</div>
				<div class="space-y-2">
					<div class="text-xs font-medium text-muted">
						Custom (ph:calendar-dots)
					</div>
					<SDatePicker v-model:date="iconValue2" icon="ph:calendar-dots" />
				</div>
				<div class="space-y-2">
					<div class="text-xs font-medium text-muted">
						No calendar button (<code>:calendar="false"</code>)
					</div>
					<SDatePicker v-model:date="iconValue3" :calendar="false" />
				</div>
			</div>
		</section>

		<!-- ============================== -->
		<!-- Clearable                      -->
		<!-- ============================== -->
		<section id="clearable" class="space-y-4">
			<ProseH3>Clearable</ProseH3>
			<p class="text-sm text-muted">
				The <code>clearable</code> prop (default <code>true</code>) shows an X button while there is a value.
			</p>
			<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
				<div class="space-y-2">
					<div class="text-xs font-medium text-muted">
						Clearable (default)
					</div>
					<SDatePicker v-model:date="clearableValue1" />
					<div class="text-xs text-muted">
						Value: {{ clearableValue1 ?? "undefined" }}
					</div>
				</div>
				<div class="space-y-2">
					<div class="text-xs font-medium text-muted">
						Not clearable
					</div>
					<SDatePicker v-model:date="clearableValue2" :clearable="false" />
					<div class="text-xs text-muted">
						Value: {{ clearableValue2 ?? "undefined" }}
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
				<code>disabled</code> greys the field out (the layer's disabled treatment for segmented fields); <code>readonly</code> keeps it readable but locked.
			</p>
			<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
				<div class="space-y-2">
					<div class="text-xs font-medium text-muted">
						Disabled
					</div>
					<SDatePicker date="2025-06-15" disabled />
				</div>
				<div class="space-y-2">
					<div class="text-xs font-medium text-muted">
						Readonly
					</div>
					<SDatePicker date="2025-06-15" readonly />
				</div>
			</div>
		</section>

		<!-- ============================== -->
		<!-- Range                          -->
		<!-- ============================== -->
		<section id="range" class="space-y-4">
			<ProseH3>Range Selection</ProseH3>
			<p class="text-sm text-muted">
				<code>SRangeDatePicker</code> binds <code>v-model:start</code> and <code>v-model:end</code> (ISO strings) and emits <code>change</code> once per complete range.
				A partial range (start only) is kept while selecting.
			</p>
			<div class="grid grid-cols-1 md:grid-cols-3 gap-4">
				<div class="space-y-2">
					<div class="text-xs font-medium text-muted">
						Basic range (one month)
					</div>
					<SRangeDatePicker
						v-model:start="range1.start"
						v-model:end="range1.end"
						:number-of-months="1"
					/>
					<div class="text-xs text-muted">
						Value: {{ JSON.stringify(range1) }}
					</div>
				</div>
				<div class="space-y-2">
					<div class="text-xs font-medium text-muted">
						Multi-calendar range (default: 2 months)
					</div>
					<SRangeDatePicker v-model:start="range2.start" v-model:end="range2.end" />
					<div class="text-xs text-muted">
						Value: {{ JSON.stringify(range2) }}
					</div>
				</div>
				<div class="space-y-2">
					<div class="text-xs font-medium text-muted">
						Pre-selected with disabled dates
					</div>
					<SRangeDatePicker
						v-model:start="rangeWithDisabled.start"
						v-model:end="rangeWithDisabled.end"
						:is-date-disabled="isMiddleDisabled"
					/>
					<div class="text-xs text-muted">
						Value: {{ JSON.stringify(rangeWithDisabled) }}
					</div>
				</div>
			</div>
		</section>

		<!-- ============================== -->
		<!-- Range presets                  -->
		<!-- ============================== -->
		<section id="range-presets" class="space-y-4">
			<ProseH3>Range Presets</ProseH3>
			<p class="text-sm text-muted">
				<code>show-presets</code> adds a sidebar: <code>true</code> lists the past and future segments (five built-in presets each), <code>"past"</code> or <code>"future"</code> only one.
				"Custom range" always comes first and lights up when the range matches no preset.
				<code>presets</code> merges extra entries into their segment (sorted by length; same dates as a built-in replaces it), <code>:default-presets="false"</code> keeps only yours.
			</p>
			<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
				<div class="space-y-2">
					<div class="text-xs font-medium text-muted">
						All segments
					</div>
					<SRangeDatePicker v-model:start="presetRange1.start" v-model:end="presetRange1.end" show-presets />
				</div>
				<div class="space-y-2">
					<div class="text-xs font-medium text-muted">
						Past only
					</div>
					<SRangeDatePicker v-model:start="presetRange2.start" v-model:end="presetRange2.end" show-presets="past" />
				</div>
				<div class="space-y-2">
					<div class="text-xs font-medium text-muted">
						Future only, merged with custom presets
					</div>
					<SRangeDatePicker
						v-model:start="presetRange3.start"
						v-model:end="presetRange3.end"
						show-presets="future"
						:presets="customPresets"
					/>
				</div>
				<div class="space-y-2">
					<div class="text-xs font-medium text-muted">
						Only custom presets
					</div>
					<SRangeDatePicker
						v-model:start="presetRange4.start"
						v-model:end="presetRange4.end"
						show-presets
						:presets="customPresets"
						:default-presets="false"
					/>
				</div>
			</div>
		</section>

		<!-- ============================== -->
		<!-- Range Config (advanced)        -->
		<!-- ============================== -->
		<section id="range-config" class="space-y-4">
			<ProseH3>Advanced Range Config</ProseH3>
			<p class="text-sm text-muted">
				<code>maximumDays</code> is a <code>UCalendar</code> prop (via <code>calendarProps</code>). A minimum length or an automatic range are composed from the atoms:
				<code>UCalendar</code>'s <code>update:startValue</code> tells which day was picked first.
			</p>
			<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
				<div class="space-y-2">
					<div class="text-xs font-medium text-muted">
						Max range: 7 days
					</div>
					<SRangeDatePicker
						v-model:start="maxRange.start"
						v-model:end="maxRange.end"
						:calendar-props="{ maximumDays: 7 }"
					/>
					<div class="text-xs text-muted">
						Value: {{ JSON.stringify(maxRange) }}
					</div>
				</div>
				<div class="space-y-2">
					<div class="text-xs font-medium text-muted">
						Min range: 3 days (UCalendar)
					</div>
					<UCalendar
						v-model="minRangeValue"
						range
						:is-date-unavailable="isTooShort"
						class="w-fit"
						@update:start-value="minRangeStart = $event"
					/>
					<div class="text-xs text-muted">
						Value: {{ formatRange(minRangeValue) }}
					</div>
				</div>
				<div class="space-y-2">
					<div class="text-xs font-medium text-muted">
						Auto range: 5 days from the picked start
					</div>
					<SDatePicker v-model:date="autoRangeStart" />
					<SRangeDatePicker :start="autoRangeStart" :end="autoRangeEnd" readonly />
				</div>
				<div class="space-y-2">
					<div class="text-xs font-medium text-muted">
						Partial range allowed
					</div>
					<SRangeDatePicker v-model:start="partialRange.start" v-model:end="partialRange.end" />
					<div class="text-xs text-muted">
						Pick only a start: it stays. Value: {{ JSON.stringify(partialRange) }}
					</div>
				</div>
			</div>
		</section>

		<!-- ============================== -->
		<!-- Lazy                           -->
		<!-- ============================== -->
		<section id="lazy" class="space-y-4">
			<ProseH3>Lazy</ProseH3>
			<p class="text-sm text-muted">
				With <code>lazy</code>, typed dates are committed on focus out instead of on every keystroke — useful when the model drives a fetch.
			</p>
			<div class="max-w-sm space-y-2">
				<SRangeDatePicker
					v-model:start="lazyRange.start"
					v-model:end="lazyRange.end"
					lazy
				/>
				<div class="text-xs text-muted">
					Value: {{ JSON.stringify(lazyRange) }}
				</div>
			</div>
		</section>

		<!-- ============================== -->
		<!-- Multiple                       -->
		<!-- ============================== -->
		<section id="multiple" class="space-y-4">
			<ProseH3>Multiple Selection</ProseH3>
			<p class="text-sm text-muted">
				Several loose dates have no segmented input to type into: compose a <code>UPopover</code> with a <code>multiple</code> <code>UCalendar</code>.
			</p>
			<div class="max-w-sm space-y-2">
				<UPopover>
					<UButton
						color="neutral"
						variant="outline"
						icon="ph:calendar-blank"
						:label="multiDates.length ? multiDates.map((date) => formatDate(date, 'date')).join(', ') : 'Select dates'"
						class="w-full"
					/>
					<template #content>
						<UCalendar v-model="multiDates" multiple class="p-2" />
					</template>
				</UPopover>
				<div class="text-xs text-muted">
					Value: {{ JSON.stringify(multiDates.map((date) => date.toString())) }}
				</div>
			</div>
		</section>

		<!-- ============================== -->
		<!-- Min / Max Value                -->
		<!-- ============================== -->
		<section id="min-max" class="space-y-4">
			<ProseH3>Min / Max Value</ProseH3>
			<p class="text-sm text-muted">
				<code>minValue</code> and <code>maxValue</code> take an ISO string or a date value. Days outside are disabled in the calendar and invalid in the segments.
			</p>
			<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
				<div class="space-y-2">
					<div class="text-xs font-medium text-muted">
						Min: today / Max: +30 days
					</div>
					<SDatePicker
						v-model:date="minMaxValue"
						:min-value="todayISO"
						:max-value="addDays(todayISO, 30)"
					/>
					<div class="text-xs text-muted">
						Min: {{ todayISO }} / Max: {{ addDays(todayISO, 30) }}
					</div>
				</div>
				<div class="space-y-2">
					<div class="text-xs font-medium text-muted">
						Only past dates (max: today)
					</div>
					<SDatePicker v-model:date="minMaxValue2" :max-value="todayISO" />
				</div>
			</div>
		</section>

		<!-- ============================== -->
		<!-- Disabled Dates                 -->
		<!-- ============================== -->
		<section id="disabled-dates" class="space-y-4">
			<ProseH3>Disabled Dates (isDateDisabled)</ProseH3>
			<p class="text-sm text-muted">
				<code>isDateDisabled</code> receives a date value and returns <code>true</code> to disable it. A typed disabled date is flagged as invalid.
				Use <code>isDateUnavailable</code> for days that stay visible but cannot be picked (struck through).
			</p>
			<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
				<div class="space-y-2">
					<div class="text-xs font-medium text-muted">
						No weekends
					</div>
					<SDatePicker v-model:date="disabledDatesValue" :is-date-disabled="isWeekendDay" />
				</div>
				<div class="space-y-2">
					<div class="text-xs font-medium text-muted">
						Past dates unavailable
					</div>
					<SDatePicker v-model:date="disabledDatesValue2" :is-date-unavailable="isPastDay" />
				</div>
			</div>
		</section>

		<!-- ============================== -->
		<!-- Week Starts On                 -->
		<!-- ============================== -->
		<section id="week-starts-on" class="space-y-4">
			<ProseH3>Week Starts On</ProseH3>
			<p class="text-sm text-muted">
				<code>weekStartsOn</code>: <code>0</code> = Sunday, <code>1</code> = Monday (default), … <code>6</code> = Saturday.
			</p>
			<div class="grid grid-cols-1 md:grid-cols-3 gap-4">
				<div class="space-y-2">
					<div class="text-xs font-medium text-muted">
						Monday (default)
					</div>
					<SDatePicker v-model:date="weekStartValue1" />
				</div>
				<div class="space-y-2">
					<div class="text-xs font-medium text-muted">
						Sunday
					</div>
					<SDatePicker v-model:date="weekStartValue2" :week-starts-on="0" />
				</div>
				<div class="space-y-2">
					<div class="text-xs font-medium text-muted">
						Saturday
					</div>
					<SDatePicker v-model:date="weekStartValue3" :week-starts-on="6" />
				</div>
			</div>
		</section>

		<!-- ============================== -->
		<!-- Week Numbers                   -->
		<!-- ============================== -->
		<section id="week-numbers" class="space-y-4">
			<ProseH3>Week Numbers</ProseH3>
			<p class="text-sm text-muted">
				<code>calendarProps.weekNumbers</code> shows the week number of each row.
			</p>
			<div class="max-w-sm space-y-2">
				<SDatePicker v-model:date="weekNumbersValue" :calendar-props="{ weekNumbers: true }" />
			</div>
		</section>

		<!-- ============================== -->
		<!-- Fixed Weeks                    -->
		<!-- ============================== -->
		<section id="fixed-weeks" class="space-y-4">
			<ProseH3>Fixed Weeks</ProseH3>
			<p class="text-sm text-muted">
				<code>fixedWeeks</code> always renders six rows, so the popover does not change height between months.
			</p>
			<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
				<div class="space-y-2">
					<div class="text-xs font-medium text-muted">
						Fixed weeks (6 rows always)
					</div>
					<UCalendar v-model="fixedWeeksValue1" fixed-weeks class="w-fit" />
				</div>
				<div class="space-y-2">
					<div class="text-xs font-medium text-muted">
						Dynamic weeks (variable rows)
					</div>
					<UCalendar v-model="fixedWeeksValue2" :fixed-weeks="false" class="w-fit" />
				</div>
			</div>
		</section>

		<!-- ============================== -->
		<!-- Number of Months               -->
		<!-- ============================== -->
		<section id="number-of-months" class="space-y-4">
			<ProseH3>Number of Months</ProseH3>
			<p class="text-sm text-muted">
				<code>numberOfMonths</code> shows several months side by side — always one on mobile.
			</p>
			<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
				<div class="space-y-2">
					<div class="text-xs font-medium text-muted">
						2 months
					</div>
					<SDatePicker v-model:date="multiMonthValue1" :number-of-months="2" />
				</div>
				<div class="space-y-2">
					<div class="text-xs font-medium text-muted">
						3 months
					</div>
					<SDatePicker v-model:date="multiMonthValue2" :number-of-months="3" />
				</div>
			</div>
		</section>

		<!-- ============================== -->
		<!-- Independent Months             -->
		<!-- ============================== -->
		<section id="independent-months" class="space-y-4">
			<ProseH3>Independent Months</ProseH3>
			<p class="text-sm text-muted">
				Months shown by one calendar always move together (<code>pagedNavigation</code> moves them by the whole page).
				For panels that navigate on their own, use two <code>UCalendar</code>s sharing one range: the first click sets the start, the second the end.
			</p>
			<div class="space-y-4">
				<div class="space-y-2">
					<div class="text-xs font-medium text-muted">
						Synced months, paged navigation
					</div>
					<SRangeDatePicker
						v-model:start="pagedRange.start"
						v-model:end="pagedRange.end"
						:calendar-props="{ pagedNavigation: true }"
					/>
				</div>
				<div class="space-y-2">
					<div class="text-xs font-medium text-muted">
						Independent months
					</div>
					<div class="flex flex-wrap gap-4">
						<UCalendar
							v-for="panel in 2"
							:key="panel"
							:default-placeholder="getTodayCalendarDate().add({ months: panel - 1 })"
							:range="false"
							:multiple="false"
							class="w-fit"
							@update:model-value="pickIndependent"
						>
							<template #day="{ day }">
								<span
									class="flex size-full items-center justify-center rounded-full"
									:class="isInIndependentRange(day) ? 'bg-secondary-700 text-inverted' : ''"
								>{{ day.day }}</span>
							</template>
						</UCalendar>
					</div>
					<div class="text-xs text-muted">
						Value: {{ formatRange(independentRange) }}
					</div>
				</div>
			</div>
		</section>

		<!-- ============================== -->
		<!-- Month / Year Controls          -->
		<!-- ============================== -->
		<section id="navigation-controls" class="space-y-4">
			<ProseH3>Month / Year Controls</ProseH3>
			<p class="text-sm text-muted">
				<code>monthControls</code> and <code>yearControls</code> toggle the navigation arrows; <code>viewControl</code> the heading button that switches to the month and year views.
			</p>
			<div class="grid grid-cols-1 md:grid-cols-3 gap-4">
				<div class="space-y-2">
					<div class="text-xs font-medium text-muted">
						Both (default)
					</div>
					<UCalendar v-model="navControlsValue1" class="w-fit" />
				</div>
				<div class="space-y-2">
					<div class="text-xs font-medium text-muted">
						No year arrows
					</div>
					<UCalendar v-model="navControlsValue2" :year-controls="false" class="w-fit" />
				</div>
				<div class="space-y-2">
					<div class="text-xs font-medium text-muted">
						No month arrows, no view switch
					</div>
					<UCalendar
						v-model="navControlsValue3"
						:month-controls="false"
						:view-control="false"
						class="w-fit"
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
				Today's marker is a <code>data-today</code> style on the cell, so a <code>ui.cellTrigger</code> override removes it.
			</p>
			<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
				<div class="space-y-2">
					<div class="text-xs font-medium text-muted">
						Today marker shown (default)
					</div>
					<UCalendar v-model="noTodayValue1" class="w-fit" />
				</div>
				<div class="space-y-2">
					<div class="text-xs font-medium text-muted">
						No today marker
					</div>
					<UCalendar v-model="noTodayValue2" :ui="{ cellTrigger: 'data-today:bg-transparent data-today:not-data-[selected]:text-highlighted' }" class="w-fit" />
				</div>
			</div>
		</section>

		<!-- ============================== -->
		<!-- Hide Offset Dates              -->
		<!-- ============================== -->
		<section id="hide-offset-dates" class="space-y-4">
			<ProseH3>Hide Offset Dates</ProseH3>
			<p class="text-sm text-muted">
				Days of the adjacent months carry <code>data-outside-view</code>: hide them with a <code>ui.cellTrigger</code> class, or keep them visible but inert with <code>disableDaysOutsideCurrentView</code>.
			</p>
			<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
				<div class="space-y-2">
					<div class="text-xs font-medium text-muted">
						Offset dates visible (default)
					</div>
					<UCalendar v-model="hideOffsetValue1" class="w-fit" />
				</div>
				<div class="space-y-2">
					<div class="text-xs font-medium text-muted">
						Offset dates hidden
					</div>
					<UCalendar v-model="hideOffsetValue2" :ui="{ cellTrigger: 'data-outside-view:invisible' }" class="w-fit" />
				</div>
			</div>
		</section>

		<!-- ============================== -->
		<!-- Markers                        -->
		<!-- ============================== -->
		<section id="markers" class="space-y-4">
			<ProseH3>Markers</ProseH3>
			<p class="text-sm text-muted">
				The <code>#day</code> slot renders each cell: add dots, lines and tooltips there.
			</p>
			<div class="max-w-sm space-y-2">
				<SDatePicker v-model:date="markerValue">
					<template #day="{ day }">
						<UTooltip
							v-if="markerFor(day)"
							:text="markerFor(day)?.tooltip"
							:disabled="!markerFor(day)?.tooltip"
						>
							<span class="relative">
								{{ day.day }}
								<span
									class="absolute -bottom-1 left-1/2 -translate-x-1/2 rounded-full"
									:class="markerFor(day)?.type === 'line' ? 'h-0.5 w-3' : 'size-1'"
									:style="{ background: markerFor(day)?.color }"
								/>
							</span>
						</UTooltip>
						<template v-else>
							{{ day.day }}
						</template>
					</template>
				</SDatePicker>
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
				Same <code>#day</code> slot, styling the label from any predicate: a function over the date, a set of weekdays, a list of dates.
			</p>
			<div class="grid grid-cols-1 md:grid-cols-3 gap-4">
				<div class="space-y-2">
					<div class="text-xs font-medium text-muted">
						Highlight weekends (function)
					</div>
					<SDatePicker v-model:date="highlightValue1">
						<template #day="{ day }">
							<span :class="isWeekendDay(day) ? 'font-semibold text-error-600' : ''">{{ day.day }}</span>
						</template>
					</SDatePicker>
				</div>
				<div class="space-y-2">
					<div class="text-xs font-medium text-muted">
						Highlight Mondays and Fridays (weekdays)
					</div>
					<SDatePicker v-model:date="highlightValue2">
						<template #day="{ day }">
							<span :class="[1, 5].includes(dayOfWeek(day)) ? 'font-semibold text-info-600' : ''">{{ day.day }}</span>
						</template>
					</SDatePicker>
				</div>
				<div class="space-y-2">
					<div class="text-xs font-medium text-muted">
						Highlight specific dates, success color
					</div>
					<SDatePicker v-model:date="highlightValue3" :calendar-props="{ color: 'success' }">
						<template #day="{ day }">
							<span :class="highlightedDates.includes(day.toString()) ? 'font-semibold text-success-600 underline' : ''">{{ day.day }}</span>
						</template>
					</SDatePicker>
				</div>
			</div>
		</section>

		<!-- ============================== -->
		<!-- Formats                        -->
		<!-- ============================== -->
		<section id="formats" class="space-y-4">
			<ProseH3>Formats</ProseH3>
			<p class="text-sm text-muted">
				Segment order and separators come from the locale, never from a pattern string — the bound value is always ISO.
				Bare <code>en</code> is normalized to <code>en-GB</code>, so day/month never swap by accident.
			</p>
			<div class="grid grid-cols-1 md:grid-cols-3 gap-4">
				<div class="space-y-2">
					<div class="text-xs font-medium text-muted">
						en-GB (dd/mm/yyyy, default for "en")
					</div>
					<SDatePicker v-model:date="formatsValue" locale="en-GB" />
				</div>
				<div class="space-y-2">
					<div class="text-xs font-medium text-muted">
						en-US (mm/dd/yyyy)
					</div>
					<SDatePicker v-model:date="formatsValue" locale="en-US" />
				</div>
				<div class="space-y-2">
					<div class="text-xs font-medium text-muted">
						sv-SE (yyyy-mm-dd)
					</div>
					<SDatePicker v-model:date="formatsValue" locale="sv-SE" />
				</div>
			</div>
			<div class="text-xs text-muted">
				Value (shared): {{ formatsValue ?? "undefined" }}
			</div>
		</section>

		<!-- ============================== -->
		<!-- Locale                         -->
		<!-- ============================== -->
		<section id="locale" class="space-y-4">
			<ProseH3>Locale</ProseH3>
			<p class="text-sm text-muted">
				Without <code>locale</code> the pickers follow the app: the active <code>@nuxtjs/i18n</code> language, else <code>&lt;UApp :locale&gt;</code>.
				The prop is an override for one-off cases.
			</p>
			<div class="grid grid-cols-1 md:grid-cols-3 gap-4">
				<div class="space-y-2">
					<div class="text-xs font-medium text-muted">
						Inferred from the app ({{ appDateLocale }})
					</div>
					<SDatePicker v-model:date="localeValue1" :number-of-months="1" />
				</div>
				<div class="space-y-2">
					<div class="text-xs font-medium text-muted">
						Italian (it-IT)
					</div>
					<SDatePicker v-model:date="localeValue2" locale="it-IT" />
				</div>
				<div class="space-y-2">
					<div class="text-xs font-medium text-muted">
						German (de-DE)
					</div>
					<SDatePicker v-model:date="localeValue3" locale="de-DE" />
				</div>
			</div>
		</section>

		<!-- ============================== -->
		<!-- Start Date                     -->
		<!-- ============================== -->
		<section id="start-date" class="space-y-4">
			<ProseH3>Start Date</ProseH3>
			<p class="text-sm text-muted">
				<code>calendarProps.defaultPlaceholder</code> opens the empty calendar on a given month instead of today's.
			</p>
			<div class="max-w-sm space-y-2">
				<SDatePicker v-model:date="startDateValue" :calendar-props="{ defaultPlaceholder: parseDate('2024-01-01') }" />
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
				Bounds also limit the year view (click the heading to open it): years outside <code>minValue</code>–<code>maxValue</code> are disabled.
			</p>
			<div class="max-w-sm space-y-2">
				<SDatePicker v-model:date="yearRangeValue" min-value="2020-01-01" max-value="2030-12-31" />
				<div class="text-xs text-muted">
					Only 2020–2030 can be picked
				</div>
			</div>
		</section>

		<!-- ============================== -->
		<!-- Preset Dates                   -->
		<!-- ============================== -->
		<section id="preset-dates" class="space-y-4">
			<ProseH3>Preset Dates</ProseH3>
			<p class="text-sm text-muted">
				The <code>#calendar-footer</code> slot (and <code>#calendar-header</code>) receives <code>close</code>: put quick picks there.
			</p>
			<div class="max-w-md space-y-2">
				<SDatePicker v-model:date="presetValue">
					<template #calendar-footer="{ close }">
						<div class="flex flex-wrap gap-1">
							<UButton
								v-for="preset in presetDates"
								:key="preset.label"
								:label="preset.label"
								size="xs"
								color="neutral"
								variant="soft"
								@click="presetValue = preset.value; close()"
							/>
						</div>
					</template>
				</SDatePicker>
				<div class="text-xs text-muted">
					Value: {{ presetValue ?? "undefined" }}
				</div>
			</div>
		</section>

		<!-- ============================== -->
		<!-- Flow                           -->
		<!-- ============================== -->
		<section id="flow" class="space-y-4">
			<ProseH3>Flow (Step-by-step)</ProseH3>
			<p class="text-sm text-muted">
				<code>UCalendar</code>'s <code>type</code> renders a standalone <code>year</code> or <code>month</code> picker: chain them to pick a year, then a month, then a day.
			</p>
			<div class="max-w-sm space-y-2">
				<UPopover v-model:open="flowOpen">
					<UButton
						color="neutral"
						variant="outline"
						icon="ph:calendar-blank"
						:label="flowValue ? formatDate(flowValue, 'date') : 'Year → Month → Day'"
						class="w-full"
					/>
					<template #content>
						<div class="p-2">
							<UCalendar
								v-if="flowStep === 'year'"
								type="year"
								:range="false"
								:multiple="false"
								@update:model-value="(date) => date && pickFlow(date, 'month')"
							/>
							<UCalendar
								v-else-if="flowStep === 'month'"
								type="month"
								:range="false"
								:multiple="false"
								:default-placeholder="flowPlaceholder"
								@update:model-value="(date) => date && pickFlow(date, 'day')"
							/>
							<UCalendar
								v-else
								:range="false"
								:multiple="false"
								:default-placeholder="flowPlaceholder"
								@update:model-value="(date) => date && pickFlow(date, 'done')"
							/>
						</div>
					</template>
				</UPopover>
				<div class="text-xs text-muted">
					Value: {{ flowValue ?? "undefined" }}
				</div>
			</div>
		</section>

		<!-- ============================== -->
		<!-- Inline                         -->
		<!-- ============================== -->
		<section id="inline" class="space-y-4">
			<ProseH3>Inline</ProseH3>
			<p class="text-sm text-muted">
				Without an input, the calendar is just <code>UCalendar</code> — styled by the layer like the one inside the pickers.
			</p>
			<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
				<div class="space-y-2">
					<div class="text-xs font-medium text-muted">
						Inline single
					</div>
					<UCalendar v-model="inlineValue" class="w-fit" />
					<div class="text-xs text-muted">
						Value: {{ inlineValue?.toString() ?? "undefined" }}
					</div>
				</div>
				<div class="space-y-2">
					<div class="text-xs font-medium text-muted">
						Inline range
					</div>
					<UCalendar
						v-model="inlineRangeValue"
						range
						:number-of-months="2"
						:ui="{ body: 'flex-row' }"
						class="w-fit"
					/>
					<div class="text-xs text-muted">
						Value: {{ formatRange(inlineRangeValue) }}
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
				The calendar popover is portalled to <code>&lt;body&gt;</code>, so <code>overflow-hidden</code> parents never clip it.
				Use <code>content</code> to change its placement.
			</p>
			<div class="max-w-sm space-y-2">
				<div class="overflow-hidden rounded border border-default p-4">
					<div class="text-xs font-medium text-muted mb-2">
						Inside overflow-hidden, opening above
					</div>
					<SDatePicker v-model:date="teleportValue" :content="{ side: 'top', align: 'end' }" />
				</div>
			</div>
		</section>

		<!-- ============================== -->
		<!-- Loading                        -->
		<!-- ============================== -->
		<section id="loading" class="space-y-4">
			<ProseH3>Loading</ProseH3>
			<p class="text-sm text-muted">
				Overlay the calendar from <code>#calendar-header</code>, with <code>ui.content</code> making the popover body the positioning context.
			</p>
			<div class="max-w-sm space-y-2">
				<USwitch v-model="isCalendarLoading" label="Loading" />
				<SDatePicker v-model:date="loadingValue" :ui="{ content: 'relative' }">
					<template #calendar-header>
						<div
							v-if="isCalendarLoading"
							class="absolute inset-0 z-10 flex items-center justify-center bg-default/70"
						>
							<UIcon name="ph:spinner-gap" class="size-6 animate-spin text-muted" />
						</div>
					</template>
				</SDatePicker>
			</div>
		</section>

		<!-- ============================== -->
		<!-- Month Change On Scroll         -->
		<!-- ============================== -->
		<section id="month-change-on-scroll" class="space-y-4">
			<ProseH3>Month Change on Scroll</ProseH3>
			<p class="text-sm text-muted">
				Bind <code>v-model:placeholder</code> — the month on screen — and move it from a <code>wheel</code> listener.
			</p>
			<div class="max-w-sm space-y-2">
				<UCalendar
					v-model="scrollMonthValue"
					v-model:placeholder="scrollPlaceholder"
					class="w-fit"
					@wheel.prevent="scrollMonth"
				/>
				<div class="text-xs text-muted">
					Scroll your mouse wheel over the calendar.
				</div>
			</div>
		</section>

		<!-- ============================== -->
		<!-- Formatter                      -->
		<!-- ============================== -->
		<section id="formatter" class="space-y-4">
			<ProseH3>Formatter</ProseH3>
			<p class="text-sm text-muted">
				Segments are an editor, so they always show the date itself. For a semantic label ("Today", "Tomorrow", an arrow between dates) use a button trigger
				with <code>formatDate</code> from the layer, and a <code>UCalendar</code> in the popover.
			</p>
			<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
				<div class="space-y-2">
					<div class="text-xs font-medium text-muted">
						Semantic formatter
					</div>
					<UPopover>
						<UButton
							color="neutral"
							variant="outline"
							icon="ph:calendar-blank"
							:label="semanticLabel(formatterValue)"
							class="w-full"
						/>
						<template #content="{ close }">
							<UCalendar
								:model-value="safeParseDate(formatterValue)"
								class="p-2"
								@update:model-value="(date) => { formatterValue = date?.toString(); close(); }"
							/>
						</template>
					</UPopover>
					<div class="text-xs text-muted">
						Value: {{ formatterValue ?? "undefined" }}
					</div>
				</div>
				<div class="space-y-2">
					<div class="text-xs font-medium text-muted">
						Range formatter (arrow)
					</div>
					<UPopover>
						<UButton
							color="neutral"
							variant="outline"
							icon="ph:calendar-blank"
							:label="formatRange(formatterRange, ' → ') || 'Select range'"
							class="w-full"
						/>
						<template #content>
							<UCalendar
								v-model="formatterRange"
								range
								:number-of-months="2"
								:ui="{ body: 'flex-row' }"
								class="p-2"
							/>
						</template>
					</UPopover>
				</div>
			</div>
		</section>

		<!-- ============================== -->
		<!-- Date Navigator                 -->
		<!-- ============================== -->
		<section id="navigator" class="space-y-4">
			<ProseH3>Date Navigator</ProseH3>
			<p class="text-sm text-muted">
				<code>SDateNavigator</code> is the toolbar filter for day-by-day views: "Today", previous/next arrows and a label that opens the calendar.
				<code>period="week"</code> labels the seven-day range and steps by a week.
			</p>
			<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
				<div class="space-y-2">
					<div class="text-xs font-medium text-muted">
						Day
					</div>
					<SDateNavigator v-model:date="navigatorDay" />
					<div class="text-xs text-muted">
						Value: {{ navigatorDay }}
					</div>
				</div>
				<div class="space-y-2">
					<div class="text-xs font-medium text-muted">
						Week, within ±60 days
					</div>
					<SDateNavigator
						v-model:date="navigatorWeek"
						period="week"
						:min-value="addDays(todayISO, -60)"
						:max-value="addDays(todayISO, 60)"
					/>
					<div class="text-xs text-muted">
						Value: {{ navigatorWeek }}
					</div>
				</div>
			</div>
		</section>

		<!-- ============================== -->
		<!-- Events                         -->
		<!-- ============================== -->
		<section id="events" class="space-y-4">
			<ProseH3>Events</ProseH3>
			<p class="text-sm text-muted">
				<code>SDatePicker</code> emits <code>update:date</code> on every change; <code>SRangeDatePicker</code> also emits <code>change</code> once per complete range.
			</p>
			<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
				<div class="space-y-2">
					<SDatePicker v-model:date="eventsValue" @update:date="lastDateEvent = String($event)" />
					<div class="text-xs text-muted">
						Last @update:date: {{ lastDateEvent }}
					</div>
				</div>
				<div class="space-y-2">
					<SRangeDatePicker
						v-model:start="eventsRange.start"
						v-model:end="eventsRange.end"
						@change="lastChangeEvent = JSON.stringify($event)"
					/>
					<div class="text-xs text-muted">
						Last @change: {{ lastChangeEvent }}
					</div>
				</div>
			</div>
		</section>

		<!-- ============================== -->
		<!-- Left Sidebar                   -->
		<!-- ============================== -->
		<section id="left-sidebar" class="space-y-4">
			<ProseH3>Left Sidebar</ProseH3>
			<p class="text-sm text-muted">
				For ranges, the sidebar is <code>show-presets</code>. For any other layout beside the calendar, compose <code>UPopover</code> and <code>UCalendar</code>.
			</p>
			<div class="max-w-md space-y-2">
				<UPopover>
					<UButton
						color="neutral"
						variant="outline"
						icon="ph:calendar-blank"
						:label="sidebarValue ? formatDate(sidebarValue, 'date') : 'With sidebar'"
						class="w-full"
					/>
					<template #content="{ close }">
						<div class="flex divide-x divide-default">
							<div class="flex min-w-28 flex-col py-2">
								<UButton
									v-for="preset in presetDates"
									:key="preset.label"
									:label="preset.label"
									color="neutral"
									variant="ghost"
									size="sm"
									class="justify-start rounded-none px-4"
									@click="sidebarValue = preset.value; close()"
								/>
							</div>
							<UCalendar
								:model-value="safeParseDate(sidebarValue)"
								class="p-2"
								@update:model-value="(date) => { sidebarValue = date?.toString(); close(); }"
							/>
						</div>
					</template>
				</UPopover>
				<div class="text-xs text-muted">
					Value: {{ sidebarValue ?? "undefined" }}
				</div>
			</div>
		</section>

		<!-- ============================== -->
		<!-- UI Overrides                   -->
		<!-- ============================== -->
		<section id="ui" class="space-y-4">
			<ProseH3>UI Overrides</ProseH3>
			<p class="text-sm text-muted">
				<code>ui.input</code> and <code>ui.calendar</code> are forwarded to <code>UInputDate</code> and <code>UCalendar</code>; <code>ui.content</code> styles the popover body.
			</p>
			<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
				<div class="space-y-2">
					<div class="text-xs font-medium text-muted">
						Custom input base (dashed border)
					</div>
					<SDatePicker v-model:date="uiValue1" :ui="{ input: { base: 'ring-2 ring-dashed ring-sky-300' } }" />
				</div>
				<div class="space-y-2">
					<div class="text-xs font-medium text-muted">
						Bold segments, square day cells
					</div>
					<SDatePicker v-model:date="uiValue2" :ui="{ input: { segment: 'font-bold' }, calendar: { cellTrigger: 'rounded-md' } }" />
				</div>
			</div>
		</section>
	</ShowcasePage>
</template>

<script lang="ts" setup>
	import type { DateValue } from "@internationalized/date";
	import type { PropDefinition } from "../Utility/PropsTable.vue";
	import type { DateRangePreset } from "~/../../app/components/DatePicker/types";
	import { CalendarDate, getDayOfWeek, isWeekend, parseDate, toCalendarDate } from "@internationalized/date";
	import { formatDate, getTodayCalendarDate, getTodayString, safeParseDate, useDateLocale } from "#layers/smartness-nuxt-ui";
	import ShowcasePage from "~/components/Utility/ShowcasePage.vue";
	import PropsTable from "../Utility/PropsTable.vue";

	type DateRange = { start: DateValue | undefined, end: DateValue | undefined } | null | undefined;
	interface IsoRange { start?: string, end?: string };

	const { sizes } = useConstants();
	const appDateLocale = useDateLocale();

	const datePickerColors = ["primary", "secondary", "success", "info", "warning", "error", "neutral"] as const;

	// ---- Helpers ----
	const todayISO = getTodayString();
	const addDays = (iso: string, days: number) => parseDate(iso).add({ days }).toString();

	const isWeekendDay = (date: DateValue) => isWeekend(date, appDateLocale.value);
	const isPastDay = (date: DateValue) => date.compare(getTodayCalendarDate()) < 0;
	const dayOfWeek = (date: DateValue) => getDayOfWeek(date, "en-GB", "sun");

	const isMiddleDisabled = (date: DateValue) => {
		const iso = date.toString();
		return iso >= addDays(todayISO, 2) && iso <= addDays(todayISO, 4);
	};

	const formatRange = (range: DateRange, separator = " - ") => {
		if (!range?.start) return "";
		const start = formatDate(range.start, "date");
		return range.end ? `${start}${separator}${formatDate(range.end, "date")}` : start;
	};

	// ---- State: Single ----
	const singleDate = ref<string>();
	const singleDatePrefilled = ref<string | undefined>(todayISO);

	// ---- State: Colors & Sizes ----
	const sizeValue = ref<string>();
	const colorValues = ref<Record<string, string | undefined>>({});

	// ---- State: Placeholder ----
	const placeholderValue = ref<string>();
	const placeholderValue2 = ref<string>();
	const birthdayPlaceholder = new CalendarDate(1990, 1, 1);

	// ---- State: Icon & Clearable ----
	const iconValue1 = ref<string>();
	const iconValue2 = ref<string>();
	const iconValue3 = ref<string>();
	const clearableValue1 = ref<string>();
	const clearableValue2 = ref<string | undefined>(todayISO);

	// ---- State: Range ----
	const range1 = reactive<IsoRange>({});
	const range2 = reactive<IsoRange>({});
	const rangeWithDisabled = reactive<IsoRange>({ start: todayISO, end: addDays(todayISO, 6) });
	const presetRange1 = reactive<IsoRange>({});
	const presetRange2 = reactive<IsoRange>({});
	const presetRange3 = reactive<IsoRange>({});
	const presetRange4 = reactive<IsoRange>({});
	const maxRange = reactive<IsoRange>({});
	const partialRange = reactive<IsoRange>({});
	const lazyRange = reactive<IsoRange>({});
	const pagedRange = reactive<IsoRange>({});

	const customPresets: DateRangePreset[] = [
		{ label: "Next 2 weeks", days: 14, direction: "future" },
		{ label: "Rest of this month", months: 0, direction: "future" },
		{ label: "Last 14 days", days: 14 },
		{ label: "Past week", days: 7 }
	];

	// Min range: while a start is pending, the next two days cannot close the range
	const minRangeValue = shallowRef<DateRange>(null);
	const minRangeStart = shallowRef<DateValue>();
	const isTooShort = (date: DateValue) => {
		const start = minRangeStart.value;
		if (!start) return false;
		return date.compare(start) !== 0 && Math.abs(date.compare(start)) < 3;
	};

	// Auto range: the end follows the start
	const autoRangeStart = ref<string>();
	const autoRangeEnd = computed(() => (autoRangeStart.value ? addDays(autoRangeStart.value, 4) : undefined));

	// ---- State: Multiple ----
	const multiDates = shallowRef<DateValue[]>([]);

	// ---- State: Min / Max & Disabled ----
	const minMaxValue = ref<string>();
	const minMaxValue2 = ref<string>();
	const disabledDatesValue = ref<string>();
	const disabledDatesValue2 = ref<string>();

	// ---- State: Week config ----
	const weekStartValue1 = ref<string>();
	const weekStartValue2 = ref<string>();
	const weekStartValue3 = ref<string>();
	const weekNumbersValue = ref<string>();
	const fixedWeeksValue1 = shallowRef<DateValue>();
	const fixedWeeksValue2 = shallowRef<DateValue>();

	// ---- State: Multi-month ----
	const multiMonthValue1 = ref<string>();
	const multiMonthValue2 = ref<string>();

	// Independent months: two calendars, one range — first click starts it, second click ends it
	const independentRange = shallowRef<DateRange>(null);
	const pickIndependent = (value: DateValue | undefined) => {
		if (!value) return;
		const day = toCalendarDate(value);
		const { start, end } = independentRange.value ?? {};
		if (!start || end) {
			independentRange.value = { start: day, end: undefined };
			return;
		}
		independentRange.value = day.compare(start) < 0 ? { start: day, end: start } : { start, end: day };
	};
	const isInIndependentRange = (day: DateValue) => {
		const { start, end } = independentRange.value ?? {};
		if (!start) return false;
		if (!end) return day.compare(start) === 0;
		return day.compare(start) >= 0 && day.compare(end) <= 0;
	};

	// ---- State: Navigation, today, offset ----
	const navControlsValue1 = shallowRef<DateValue>();
	const navControlsValue2 = shallowRef<DateValue>();
	const navControlsValue3 = shallowRef<DateValue>();
	const noTodayValue1 = shallowRef<DateValue>();
	const noTodayValue2 = shallowRef<DateValue>();
	const hideOffsetValue1 = shallowRef<DateValue>();
	const hideOffsetValue2 = shallowRef<DateValue>();

	// ---- State: Markers & Highlight ----
	const markerValue = ref<string>();
	const markers = [
		{ date: addDays(todayISO, 2), type: "dot", tooltip: "Meeting", color: "var(--color-success-500)" },
		{ date: addDays(todayISO, 5), type: "line", tooltip: "Deadline", color: "var(--color-error-500)" },
		{ date: addDays(todayISO, 10), type: "dot", tooltip: undefined, color: "var(--color-warning-500)" }
	] as const;
	const markerFor = (day: DateValue) => markers.find((marker) => marker.date === day.toString());

	const highlightValue1 = ref<string>();
	const highlightValue2 = ref<string>();
	const highlightValue3 = ref<string>();
	const highlightedDates = [addDays(todayISO, 3), addDays(todayISO, 8), addDays(todayISO, 13)];

	// ---- State: Formats & Locale ----
	const formatsValue = ref<string | undefined>(todayISO);
	const localeValue1 = ref<string>();
	const localeValue2 = ref<string>();
	const localeValue3 = ref<string>();

	// ---- State: Start date, year range, presets ----
	const startDateValue = ref<string>();
	const yearRangeValue = ref<string>();
	const presetValue = ref<string>();
	const presetDates = [
		{ label: "Today", value: todayISO },
		{ label: "Tomorrow", value: addDays(todayISO, 1) },
		{ label: "In a week", value: addDays(todayISO, 7) },
		{ label: "In a month", value: addDays(todayISO, 30) }
	];

	// ---- State: Flow ----
	const flowOpen = ref(false);
	const flowStep = ref<"year" | "month" | "day">("year");
	const flowPlaceholder = shallowRef<DateValue>(getTodayCalendarDate());
	const flowValue = ref<string>();
	const pickFlow = (date: DateValue, next: "month" | "day" | "done") => {
		flowPlaceholder.value = date;
		if (next === "done") {
			flowValue.value = toCalendarDate(date).toString();
			flowOpen.value = false;
			return;
		}
		flowStep.value = next;
	};
	watch(flowOpen, (open) => {
		if (open) flowStep.value = "year";
	});

	// ---- State: Inline ----
	const inlineValue = shallowRef<DateValue>();
	const inlineRangeValue = shallowRef<DateRange>(null);

	// ---- State: Teleport, loading, scroll ----
	const teleportValue = ref<string>();
	const loadingValue = ref<string>();
	const isCalendarLoading = ref(true);
	const scrollMonthValue = shallowRef<DateValue>();
	const scrollPlaceholder = shallowRef<DateValue>(getTodayCalendarDate());
	const scrollMonth = (event: WheelEvent) => {
		scrollPlaceholder.value = scrollPlaceholder.value.add({ months: event.deltaY > 0 ? 1 : -1 });
	};

	// ---- State: Formatter ----
	const formatterValue = ref<string>();
	const formatterRange = shallowRef<DateRange>(null);
	const semanticLabel = (iso: string | undefined) => {
		if (!iso) return "Select a date";
		if (iso === todayISO) return "Today";
		if (iso === addDays(todayISO, 1)) return "Tomorrow";
		if (iso === addDays(todayISO, -1)) return "Yesterday";
		return formatDate(iso, "date");
	};

	// ---- State: Navigator ----
	const navigatorDay = ref(todayISO);
	const navigatorWeek = ref(todayISO);

	// ---- State: Events, sidebar, ui ----
	const eventsValue = ref<string>();
	const eventsRange = reactive<IsoRange>({});
	const lastDateEvent = ref("(none)");
	const lastChangeEvent = ref("(none)");
	const sidebarValue = ref<string>();
	const uiValue1 = ref<string>();
	const uiValue2 = ref<string>();

	// ---- Props table ----
	const propsData: PropDefinition[] = [
		{ prop: "v-model:date", type: "string | undefined", description: "SDatePicker / SDateNavigator — ISO \"YYYY-MM-DD\"" },
		{ prop: "v-model:start / v-model:end", type: "string | undefined", description: "SRangeDatePicker — ISO strings; a partial range is allowed mid-selection" },
		{ prop: "locale", type: "string", description: "BCP 47 override. Default: @nuxtjs/i18n language, else <UApp :locale>; \"en\" → \"en-GB\"" },
		{ prop: "minValue / maxValue", type: "DateValue | string", description: "Bounds, ISO string or date value" },
		{ prop: "isDateDisabled", type: "(date: DateValue) => boolean", description: "Disabled days; typed ones are flagged invalid" },
		{ prop: "isDateUnavailable", type: "(date: DateValue) => boolean", description: "Visible but not pickable days" },
		{ prop: "disabled / readonly", type: "boolean", description: "Lock the field", default: "false" },
		{ prop: "clearable", type: "boolean", description: "Clear button while there is a value", default: "true" },
		{ prop: "calendar", type: "boolean", description: "Calendar popover button", default: "true" },
		{ prop: "closeOnSelect", type: "boolean", description: "Close the popover on a complete pick", default: "true" },
		{ prop: "icon", type: "string", description: "Calendar button icon", default: "ph:calendar-blank" },
		{ prop: "size / color / variant / highlight", type: "UInputDate props", description: "Forwarded to the segments input" },
		{ prop: "weekStartsOn", type: "0-6", description: "First weekday", default: "1" },
		{ prop: "numberOfMonths", type: "number", description: "Months in the popover (1 on mobile)", default: "1 (range: 2)" },
		{ prop: "content", type: "PopoverProps[\"content\"]", description: "Popover placement", default: "{ align: 'end' }" },
		{ prop: "calendarProps", type: "CalendarProps", description: "Any other UCalendar prop (weekNumbers, fixedWeeks, maximumDays, pagedNavigation, defaultPlaceholder, color…)" },
		{ prop: "ui", type: "{ input?, calendar?, content? }", description: "Class overrides for UInputDate, UCalendar and the popover body" },
		{ prop: "withToday", type: "boolean", description: "SDatePicker — \"Today\" button under the calendar", default: "false" },
		{ prop: "showPresets", type: "boolean | \"past\" | \"future\"", description: "SRangeDatePicker — preset sidebar, both segments or one", default: "false" },
		{ prop: "presets", type: "DateRangePreset[]", description: "SRangeDatePicker — extra presets merged into their segment" },
		{ prop: "defaultPresets", type: "boolean", description: "SRangeDatePicker — keep the five built-in presets per segment", default: "true" },
		{ prop: "lazy", type: "boolean", description: "SRangeDatePicker — commit typed dates on focus out", default: "false" },
		{ prop: "period / weekAnchor", type: "\"day\" | \"week\" / \"week-start\" | \"from-selection\"", description: "SDateNavigator — step and label span", default: "\"day\" / \"from-selection\"" },
		{ prop: "todayButton / format", type: "boolean / (date) => string", description: "SDateNavigator — \"Today\" button, custom label", default: "true" },
		{ prop: "@change", type: "event", description: "SRangeDatePicker — once per complete range" },
		{ prop: "#day", type: "slot", description: "Calendar day cell { day }" },
		{ prop: "#calendar-header / #calendar-footer", type: "slot", description: "SDatePicker — popover content around the calendar { close }" }
	];
</script>
