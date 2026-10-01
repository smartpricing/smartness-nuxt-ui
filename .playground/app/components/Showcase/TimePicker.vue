<template>
	<ShowcasePage
		title="TimePicker"
		description="STimePicker — a segmented time input on UInputTime. The 12/24h cycle follows the locale, inferred from @nuxtjs/i18n or <UApp :locale> (bare &quot;en&quot; reads as en-GB, so 24h)."
	>
		<PropsTable :props="propsData" />

		<section id="basic" class="space-y-4">
			<ProseH3>Basic</ProseH3>
			<p class="text-sm text-muted">
				<code>v-model:time</code> is a <code>"HH:mm"</code> string (<code>"HH:mm:ss"</code> with <code>granularity="second"</code>) or <code>undefined</code>.
			</p>
			<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
				<div class="space-y-2">
					<div class="text-xs font-medium text-muted">
						Empty
					</div>
					<STimePicker v-model:time="basicTime" />
					<div class="text-xs text-muted">
						Value: {{ basicTime ?? "undefined" }}
					</div>
				</div>
				<div class="space-y-2">
					<div class="text-xs font-medium text-muted">
						With initial value
					</div>
					<STimePicker v-model:time="prefilledTime" />
					<div class="text-xs text-muted">
						Value: {{ prefilledTime ?? "undefined" }}
					</div>
				</div>
			</div>
		</section>

		<section id="hour-cycle" class="space-y-4">
			<ProseH3>Hour Cycle &amp; Locale</ProseH3>
			<p class="text-sm text-muted">
				The clock follows the locale; <code>hourCycle</code> forces it.
			</p>
			<div class="grid grid-cols-1 md:grid-cols-3 gap-4">
				<div class="space-y-2">
					<div class="text-xs font-medium text-muted">
						Inferred ({{ appDateLocale }})
					</div>
					<STimePicker v-model:time="cycleTime" />
				</div>
				<div class="space-y-2">
					<div class="text-xs font-medium text-muted">
						en-US (12h)
					</div>
					<STimePicker v-model:time="cycleTime" locale="en-US" />
				</div>
				<div class="space-y-2">
					<div class="text-xs font-medium text-muted">
						en-US forced to 24h
					</div>
					<STimePicker v-model:time="cycleTime" locale="en-US" :hour-cycle="24" />
				</div>
			</div>
			<div class="text-xs text-muted">
				Value (shared): {{ cycleTime ?? "undefined" }}
			</div>
		</section>

		<section id="granularity" class="space-y-4">
			<ProseH3>Granularity</ProseH3>
			<div class="grid grid-cols-1 md:grid-cols-3 gap-4">
				<div
					v-for="granularity in granularities"
					:key="granularity"
					class="space-y-2"
				>
					<div class="text-xs font-medium text-muted capitalize">
						{{ granularity }}
					</div>
					<STimePicker v-model:time="granularityTimes[granularity]" :granularity="granularity" />
					<div class="text-xs text-muted">
						Value: {{ granularityTimes[granularity] ?? "undefined" }}
					</div>
				</div>
			</div>
		</section>

		<section id="sizes" class="space-y-4">
			<ProseH3>Sizes &amp; Variants</ProseH3>
			<div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 items-end">
				<div
					v-for="size in sizes"
					:key="size"
					class="space-y-2"
				>
					<div class="text-xs font-medium text-muted capitalize">
						{{ size }}
					</div>
					<STimePicker v-model:time="sizeTime" :size="size" />
				</div>
			</div>
			<div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
				<div
					v-for="variant in variants"
					:key="variant"
					class="space-y-2"
				>
					<div class="text-xs font-medium text-muted capitalize">
						{{ variant }}
					</div>
					<STimePicker v-model:time="sizeTime" :variant="variant" />
				</div>
			</div>
		</section>

		<section id="icon" class="space-y-4">
			<ProseH3>Icon</ProseH3>
			<div class="grid grid-cols-1 md:grid-cols-3 gap-4">
				<div class="space-y-2">
					<div class="text-xs font-medium text-muted">
						Default (ph:clock)
					</div>
					<STimePicker v-model:time="iconTime" />
				</div>
				<div class="space-y-2">
					<div class="text-xs font-medium text-muted">
						Custom (ph:alarm)
					</div>
					<STimePicker v-model:time="iconTime" icon="ph:alarm" />
				</div>
				<div class="space-y-2">
					<div class="text-xs font-medium text-muted">
						No icon
					</div>
					<STimePicker v-model:time="iconTime" :icon="false" />
				</div>
			</div>
		</section>

		<section id="states" class="space-y-4">
			<ProseH3>Disabled / Readonly</ProseH3>
			<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
				<div class="space-y-2">
					<div class="text-xs font-medium text-muted">
						Disabled
					</div>
					<STimePicker time="09:30" disabled />
				</div>
				<div class="space-y-2">
					<div class="text-xs font-medium text-muted">
						Readonly
					</div>
					<STimePicker time="09:30" readonly />
				</div>
			</div>
		</section>

		<section id="lazy" class="space-y-4">
			<ProseH3>Lazy</ProseH3>
			<p class="text-sm text-muted">
				With <code>lazy</code> the typed time is committed on focus out instead of on every keystroke.
			</p>
			<div class="max-w-sm space-y-2">
				<STimePicker v-model:time="lazyTime" lazy />
				<div class="text-xs text-muted">
					Value: {{ lazyTime ?? "undefined" }}
				</div>
			</div>
		</section>

		<section id="format" class="space-y-4">
			<ProseH3>Formatting</ProseH3>
			<p class="text-sm text-muted">
				To show a bound time as text, use <code>formatTime</code> from the layer: same inferred locale, always 24h.
			</p>
			<div class="max-w-sm space-y-2">
				<STimePicker v-model:time="formatTimeValue" />
				<div class="text-xs text-muted">
					formatTime: {{ formatTime(formatTimeValue) ?? "—" }}
				</div>
			</div>
		</section>
	</ShowcasePage>
</template>

<script lang="ts" setup>
	import type { PropDefinition } from "../Utility/PropsTable.vue";
	import { formatTime, useDateLocale } from "#layers/smartness-nuxt-ui";
	import ShowcasePage from "~/components/Utility/ShowcasePage.vue";
	import PropsTable from "../Utility/PropsTable.vue";

	const { sizes } = useConstants();
	const appDateLocale = useDateLocale();

	const variants = ["outline", "soft", "subtle", "ghost", "none"] as const;
	const granularities = ["hour", "minute", "second"] as const;

	const basicTime = ref<string>();
	const prefilledTime = ref<string | undefined>("14:30");
	const cycleTime = ref<string | undefined>("18:45");
	const granularityTimes = ref<Record<string, string | undefined>>({});
	const sizeTime = ref<string>();
	const iconTime = ref<string>();
	const lazyTime = ref<string>();
	const formatTimeValue = ref<string | undefined>("08:05");

	const propsData: PropDefinition[] = [
		{ prop: "v-model:time", type: "string | undefined", description: "\"HH:mm\" (or \"HH:mm:ss\")" },
		{ prop: "locale", type: "string", description: "BCP 47 override. Default: @nuxtjs/i18n language, else <UApp :locale>; \"en\" → \"en-GB\"" },
		{ prop: "hourCycle", type: "12 | 24", description: "Forces the clock; follows the locale by default" },
		{ prop: "granularity", type: "\"hour\" | \"minute\" | \"second\"", description: "Smallest editable segment", default: "\"minute\"" },
		{ prop: "disabled / readonly", type: "boolean", description: "Lock the field", default: "false" },
		{ prop: "size / color / variant / highlight", type: "UInputTime props", description: "Forwarded to UInputTime" },
		{ prop: "placeholder", type: "Time", description: "Time the segments start from when typing" },
		{ prop: "icon", type: "string | false", description: "Leading icon", default: "ph:clock" },
		{ prop: "lazy", type: "boolean", description: "Commit on focus out", default: "false" },
		{ prop: "ui", type: "UInputTime ui", description: "Class overrides forwarded to UInputTime" }
	];
</script>
