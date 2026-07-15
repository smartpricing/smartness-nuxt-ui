<template>
	<ShowcasePage
		title="Slider"
		description="A form field to select either a single numeric value or a range of values. Built on top of USlider with Smartness design tokens."
	>
		<PropsTable :props="propsData" />

		<section id="interactive" class="space-y-6">
			<ProseH3>
				Interactive playground
			</ProseH3>
			<div class="rounded-lg border border-primary-200 p-6 space-y-6">
				<div class="max-w-lg">
					<SSlider
						v-model="playgroundValue"
						:tooltip="playgroundTooltip"
						:inline="playgroundInlineConfig"
						:disabled="playgroundDisabled"
						:badge-width="playgroundBadgeWidth || undefined"
						:format-label="playgroundFormatter"
						:min="playgroundMin"
						:max="playgroundMax"
						:step="playgroundStep"
						:center-marker="playgroundCenterMarkerEnabled ? playgroundCenterMarkerValue : undefined"
						:thumb-limits="playgroundThumbLimits"
					/>
				</div>
				<p class="text-xs text-primary-500">
					Value: {{ playgroundValue }}
				</p>
				<div class="grid grid-cols-2 md:grid-cols-3 gap-4">
					<UFormField label="Tooltip mode">
						<USelect
							v-model="playgroundTooltipMode"
							:items="['hover', 'visible', 'hidden']"
						/>
					</UFormField>
					<UFormField label="Tooltip side">
						<USelect
							v-model="playgroundTooltipSide"
							:items="['top', 'bottom', 'left', 'right']"
						/>
					</UFormField>
					<UFormField label="Tooltip prefix">
						<UInput
							v-model="playgroundTooltipPrefix"
							placeholder="e.g. €"
						/>
					</UFormField>
					<UFormField label="Tooltip suffix">
						<UInput
							v-model="playgroundTooltipSuffix"
							placeholder="e.g. ' km'"
						/>
					</UFormField>
					<UFormField label="Inline position">
						<USelect
							v-model="playgroundInlinePosition"
							:items="['none', 'both', 'left', 'right']"
						/>
					</UFormField>
					<UFormField label="Inline value">
						<USelect
							v-model="playgroundInlineValue"
							:items="['selected', 'range']"
						/>
					</UFormField>
					<UFormField label="Badge width">
						<UInput
							v-model="playgroundBadgeWidth"
							placeholder="e.g. 60px"
						/>
					</UFormField>
					<UFormField label="Min">
						<UInput
							v-model.number="playgroundMin"
							type="number"
						/>
					</UFormField>
					<UFormField label="Max">
						<UInput
							v-model.number="playgroundMax"
							type="number"
						/>
					</UFormField>
					<UFormField label="Step">
						<UInput
							v-model.number="playgroundStep"
							type="number"
						/>
					</UFormField>
					<UFormField label="Format">
						<USelect
							v-model="playgroundFormat"
							:items="['none', 'km', 'percent', 'currency']"
						/>
					</UFormField>
					<UFormField label="Center marker">
						<div class="flex items-center gap-2">
							<USwitch v-model="playgroundCenterMarkerEnabled" />
							<UInput
								v-if="playgroundCenterMarkerEnabled"
								v-model.number="playgroundCenterMarkerValue"
								type="number"
								class="w-20"
							/>
						</div>
					</UFormField>
					<UFormField label="Disabled">
						<USwitch v-model="playgroundDisabled" />
					</UFormField>
					<UFormField label="Range mode">
						<USwitch v-model="playgroundRange" />
					</UFormField>
					<UFormField label="Thumb limits">
						<div class="flex items-center gap-2">
							<USwitch v-model="playgroundThumbLimitsEnabled" />
							<template v-if="playgroundThumbLimitsEnabled">
								<UInput
									v-model.number="playgroundLimitMin"
									type="number"
									class="w-20"
								/>
								<UInput
									v-model.number="playgroundLimitMax"
									type="number"
									class="w-20"
								/>
							</template>
						</div>
					</UFormField>
				</div>
			</div>
		</section>

		<section id="default" class="space-y-4">
			<ProseH3>
				Default (tooltip on hover)
			</ProseH3>
			<p class="text-sm text-primary-600 mb-2">
				Basic slider with tooltip appearing on thumb hover.
			</p>
			<div class="max-w-md">
				<SSlider v-model="singleValue" />
			</div>
		</section>

		<section id="tooltip-visible" class="space-y-4">
			<ProseH3>
				Always visible tooltip
			</ProseH3>
			<p class="text-sm text-primary-600 mb-2">
				Tooltip stays visible at all times. Supports top and bottom placement.
			</p>
			<div class="max-w-md space-y-6">
				<SSlider
					v-model="singleValue"
					tooltip="visible"
					:format-label="kmLabel"
				/>
				<SSlider
					v-model="singleValue"
					:tooltip="{ mode: 'visible', side: 'bottom' }"
					:format-label="kmLabel"
				/>
			</div>
		</section>

		<section id="tooltip-spacing" class="space-y-4">
			<ProseH3>
				Always-visible tooltip spacing
			</ProseH3>
			<p class="text-sm text-primary-600 mb-2">
				An always-visible tooltip floats above (or below) the thumb and can overlap
				adjacent content. Reserve headroom on the slider row with <code>spacing</code>, a
				Tailwind margin class on the tooltip's side (e.g. <code>mt-10</code> /
				<code>mb-10</code>). No margin is applied by default — it's opt-in per usage.
			</p>
			<div class="max-w-md space-y-6">
				<div class="space-y-1">
					<ProseH4 class="text-muted">
						No spacing (default)
					</ProseH4>
					<SSlider
						v-model="singleValue"
						:tooltip="{ mode: 'visible' }"
						:format-label="kmLabel"
					/>
				</div>
				<div class="space-y-1">
					<ProseH4 class="text-muted">
						spacing: 'mt-10' (top)
					</ProseH4>
					<SSlider
						v-model="singleValue"
						:tooltip="{ mode: 'visible', spacing: 'mt-10' }"
						:format-label="kmLabel"
					/>
				</div>
				<div class="space-y-1">
					<ProseH4 class="text-muted">
						spacing: 'mb-10' (bottom)
					</ProseH4>
					<SSlider
						v-model="singleValue"
						:tooltip="{ mode: 'visible', side: 'bottom', spacing: 'mb-10' }"
						:format-label="kmLabel"
					/>
				</div>
			</div>
		</section>

		<section id="tooltip-affix" class="space-y-4">
			<ProseH3>
				Tooltip unit prefix / suffix
			</ProseH3>
			<p class="text-sm text-primary-600 mb-2">
				Add a unit to the tooltip value via <code>prefix</code> / <code>suffix</code>.
				Spacing is controlled by your string (<code>"km"</code> → 50km,
				<code>" km"</code> → 50 km).
			</p>
			<div class="max-w-md space-y-6">
				<div class="space-y-1">
					<ProseH4 class="text-muted">
						Suffix with leading space
					</ProseH4>
					<SSlider
						v-model="singleValue"
						:tooltip="{ mode: 'visible', suffix: ' km' }"
					/>
				</div>
				<div class="space-y-1">
					<ProseH4 class="text-muted">
						Prefix
					</ProseH4>
					<SSlider
						v-model="singleValue"
						:tooltip="{ mode: 'visible', prefix: '€' }"
					/>
				</div>
				<div class="space-y-1">
					<ProseH4 class="text-muted">
						Range, both affixes
					</ProseH4>
					<SSlider
						v-model="rangeValue"
						:tooltip="{ mode: 'visible', prefix: '~', suffix: ' km' }"
					/>
				</div>
			</div>
		</section>

		<section id="tooltip-portal" class="space-y-4">
			<ProseH3>
				Always-visible tooltip near an overlay
			</ProseH3>
			<p class="text-sm text-primary-600 mb-2">
				An always-visible tooltip portals to <code>&lt;body&gt;</code> and can paint over an
				overlay opened nearby (e.g. a date picker / popover). Pass the native
				<code>portal: false</code> so the tooltip stays in the slider's stacking context and
				the overlay correctly paints on top. Open the popover over each slider to compare.
			</p>
			<div class="max-w-md grid grid-cols-2 gap-4">
				<div class="space-y-2">
					<ProseH4 class="text-muted">
						Default (portal)
					</ProseH4>
					<SSlider
						v-model="singleValue"
						:tooltip="{ mode: 'visible', suffix: ' km' }"
					/>
				</div>
				<div class="space-y-2">
					<ProseH4 class="text-muted">
						portal: false
					</ProseH4>
					<SSlider
						v-model="singleValue"
						:tooltip="{ mode: 'visible', suffix: ' km', portal: false }"
					/>
				</div>
			</div>
			<UPopover>
				<UButton
					label="Open overlay over the sliders"
					color="secondary"
					variant="outline"
				/>
				<template #content>
					<div class="p-6 w-72 text-sm text-primary-700">
						This popover content should cover the left slider's tooltip but be covered by
						nothing on the right (portal: false). Drag the page so this overlaps the
						sliders above.
					</div>
				</template>
			</UPopover>
		</section>

		<section id="tooltip-hidden" class="space-y-4">
			<ProseH3>
				Hidden tooltip
			</ProseH3>
			<p class="text-sm text-primary-600 mb-2">
				No tooltip. Pointer only.
			</p>
			<div class="max-w-md">
				<SSlider v-model="singleValue" tooltip="hidden" />
			</div>
		</section>

		<section id="inline-selected" class="space-y-4">
			<ProseH3>
				Inline badges (selected value)
			</ProseH3>
			<p class="text-sm text-primary-600 mb-2">
				Badges display the current thumb value. Tooltip is independent.
			</p>
			<div class="max-w-md space-y-6">
				<div class="space-y-1">
					<ProseH4 class="text-muted">
						Both sides
					</ProseH4>
					<SSlider
						v-model="singleValue"
						:inline="{ position: 'both', value: 'selected' }"
						badge-width="55px"
						:format-label="kmLabel"
					/>
				</div>
				<div class="space-y-1">
					<ProseH4 class="text-muted">
						Left only
					</ProseH4>
					<SSlider
						v-model="singleValue"
						:inline="{ position: 'left' }"
						badge-width="55px"
						:format-label="kmLabel"
					/>
				</div>
				<div class="space-y-1">
					<ProseH4 class="text-muted">
						Right only
					</ProseH4>
					<SSlider
						v-model="singleValue"
						:inline="{ position: 'right' }"
						badge-width="55px"
						:format-label="kmLabel"
					/>
				</div>
			</div>
		</section>

		<section id="inline-range" class="space-y-4">
			<ProseH3>
				Inline badges (min/max range)
			</ProseH3>
			<p class="text-sm text-primary-600 mb-2">
				Badges display the min/max endpoints. Tooltip can show the current value.
			</p>
			<div class="max-w-md space-y-6">
				<div class="space-y-1">
					<ProseH4 class="text-muted">
						Range endpoints + hover tooltip
					</ProseH4>
					<SSlider
						v-model="singleValue"
						:inline="{ value: 'range' }"
						badge-width="55px"
						:format-label="kmLabel"
					/>
				</div>
				<div class="space-y-1">
					<ProseH4 class="text-muted">
						Range endpoints + always visible tooltip
					</ProseH4>
					<SSlider
						v-model="singleValue"
						:inline="{ value: 'range' }"
						tooltip="visible"
						badge-width="55px"
						:format-label="kmLabel"
					/>
				</div>
			</div>
		</section>

		<section id="range" class="space-y-4">
			<ProseH3>
				Range slider
			</ProseH3>
			<p class="text-sm text-primary-600 mb-2">
				Pass an array to v-model for a two-thumb range slider.
			</p>
			<div class="max-w-md space-y-6">
				<div class="space-y-1">
					<ProseH4 class="text-muted">
						Default (hover tooltip)
					</ProseH4>
					<SSlider v-model="rangeValue" />
				</div>
				<div class="space-y-1">
					<ProseH4 class="text-muted">
						With center marker
					</ProseH4>
					<SSlider
						v-model="rangeValue"
						:center-marker="50"
						inline
						badge-width="55px"
						:format-label="kmLabel"
					/>
				</div>
				<div class="space-y-1">
					<ProseH4 class="text-muted">
						Inline badges (selected values)
					</ProseH4>
					<SSlider
						v-model="rangeValue"
						inline
						badge-width="55px"
						:format-label="kmLabel"
					/>
				</div>
				<div class="space-y-1">
					<ProseH4 class="text-muted">
						Always visible tooltip
					</ProseH4>
					<SSlider
						v-model="rangeValue"
						tooltip="visible"
						:format-label="kmLabel"
					/>
				</div>
			</div>
		</section>

		<section id="thumb-limits" class="space-y-4">
			<ProseH3>
				Thumb limits
			</ProseH3>
			<p class="text-sm text-primary-600 mb-2">
				Restrict each thumb to a sub-range of the track with <code>thumb-limits</code>.
				Pass a single object for a single-value slider, or an array with per-thumb
				limits (by index) for a range slider. Limits constrain dragging/keyboard only —
				programmatic v-model writes are not clamped.
			</p>
			<div class="max-w-md space-y-6">
				<div class="space-y-1">
					<ProseH4 class="text-muted">
						Range: left thumb ≤ 40, right thumb ≥ 60
					</ProseH4>
					<SSlider
						v-model="limitedRangeValue"
						:thumb-limits="[{ max: 40 }, { min: 60 }]"
						inline
						badge-width="55px"
					/>
				</div>
				<div class="space-y-1">
					<ProseH4 class="text-muted">
						Single value: limited to 20–80
					</ProseH4>
					<SSlider
						v-model="limitedSingleValue"
						:thumb-limits="{ min: 20, max: 80 }"
						tooltip="visible"
					/>
				</div>
			</div>
		</section>

		<section id="disabled" class="space-y-4">
			<ProseH3>
				Disabled
			</ProseH3>
			<p class="text-sm text-primary-600 mb-2">
				Disabled state uses distinct colors (no opacity change).
			</p>
			<div class="max-w-md space-y-6">
				<div class="space-y-1">
					<ProseH4 class="text-muted">
						Pointer only
					</ProseH4>
					<SSlider :model-value="40" disabled />
				</div>
				<div class="space-y-1">
					<ProseH4 class="text-muted">
						With inline badges
					</ProseH4>
					<SSlider
						:model-value="40"
						disabled
						inline
						badge-width="55px"
						:format-label="kmLabel"
					/>
				</div>
				<div class="space-y-1">
					<ProseH4 class="text-muted">
						Range with inline badges
					</ProseH4>
					<SSlider
						:model-value="[20, 60]"
						disabled
						inline
						badge-width="55px"
						:format-label="kmLabel"
					/>
				</div>
				<div class="space-y-1">
					<ProseH4 class="text-muted">
						With visible tooltip
					</ProseH4>
					<SSlider
						:model-value="40"
						disabled
						tooltip="visible"
						:format-label="kmLabel"
					/>
				</div>
			</div>
		</section>

		<section id="stepped" class="space-y-4">
			<ProseH3>
				Stepped
			</ProseH3>
			<p class="text-sm text-primary-600 mb-2">
				Use the step prop to snap to increments.
			</p>
			<div class="max-w-md space-y-6">
				<div class="space-y-1">
					<ProseH4 class="text-muted">
						Step = 10
					</ProseH4>
					<SSlider
						v-model="steppedValue"
						:step="10"
						tooltip="visible"
					/>
				</div>
				<div class="space-y-1">
					<ProseH4 class="text-muted">
						Step = 25
					</ProseH4>
					<SSlider
						v-model="steppedValue25"
						:step="25"
						tooltip="visible"
						:format-label="percentLabel"
					/>
				</div>
			</div>
		</section>

		<section id="custom-range" class="space-y-4">
			<ProseH3>
				Custom min / max
			</ProseH3>
			<p class="text-sm text-primary-600 mb-2">
				Set custom min and max boundaries.
			</p>
			<div class="max-w-md">
				<SSlider
					v-model="customValue"
					:min="0"
					:max="50"
					:inline="{ value: 'range' }"
					tooltip="visible"
					badge-width="55px"
					:format-label="kmLabel"
				/>
			</div>
		</section>

		<section id="vertical" class="space-y-4">
			<ProseH3>
				Vertical
			</ProseH3>
			<p class="text-sm text-primary-600 mb-2">
				Vertical orientation. The consumer provides the height via class; badges sit above (max) and below (min) the track.
			</p>
			<div class="flex gap-16">
				<SSlider
					v-model="verticalValue"
					orientation="vertical"
					class="h-64"
					:tooltip="{ side: 'right' }"
					inline
				/>
				<SSlider
					v-model="verticalRangeValue"
					orientation="vertical"
					class="h-64"
					:tooltip="{ side: 'right' }"
					:inline="{ value: 'range' }"
					:center-marker="50"
				/>
			</div>
		</section>

		<section id="inverted" class="space-y-4">
			<ProseH3>
				Inverted
			</ProseH3>
			<p class="text-sm text-primary-600 mb-2">
				Inverted direction: max at the left end. Badges and center marker mirror accordingly.
			</p>
			<div class="max-w-md">
				<SSlider
					v-model="invertedRangeValue"
					inverted
					:inline="{ value: 'range' }"
					:center-marker="50"
				/>
			</div>
		</section>
	</ShowcasePage>
</template>

<script lang="ts" setup>
	import type { PropDefinition } from "../Utility/PropsTable.vue";
	import type { SliderInlineProp, SliderTooltipProp, SliderTooltipSide } from "~/components/Slider/types";
	import ShowcasePage from "~/components/Utility/ShowcasePage.vue";
	import PropsTable from "../Utility/PropsTable.vue";

	// --- Props table ---
	const propsData: PropDefinition[] = [
		{ prop: "modelValue", type: "number | number[]", description: "Slider value. Pass an array for range mode." },
		{ prop: "min", type: "number", description: "Minimum value", default: "0" },
		{ prop: "max", type: "number", description: "Maximum value", default: "100" },
		{ prop: "step", type: "number", description: "Stepping interval", default: "1" },
		{ prop: "tooltip", type: "string | { mode, side, prefix, suffix, ...TooltipProps }", description: "Tooltip behavior. 'hover' | 'visible' | 'hidden', or an object that also accepts side ('top' | 'bottom' | 'left' | 'right'), prefix/suffix (unit affixes, e.g. suffix: ' km') and any native Nuxt UI TooltipProps (portal, arrow, content, …).", default: "hover" },
		{ prop: "inline", type: "boolean | { position, value }", description: "Inline badges. true = shorthand for { position: 'both', value: 'selected' }. position: 'both' | 'left' | 'right'. value: 'selected' | 'range'.", default: "false" },
		{ prop: "badgeWidth", type: "string", description: "Fixed width for inline badges (e.g. '60px'). Prevents layout shift." },
		{ prop: "formatLabel", type: "(value: number) => string", description: "Formatter for inline badge labels. Tooltips show the raw value (use tooltip prefix/suffix for units).", default: "String(value)" },
		{ prop: "disabled", type: "boolean", description: "Disabled state with distinct color changes (no opacity).", default: "false" },
		{ prop: "color", type: "string", description: "USlider color prop passthrough.", default: "secondary" },
		{ prop: "centerMarker", type: "number", description: "Position value for a center marker tick on the track. Only visible in range mode (array v-model). If omitted, no marker is shown." },
		{ prop: "thumbLimits", type: "{ min?, max? } | ({ min?, max? } | undefined)[]", description: "Restrict thumbs to a sub-range of the track (snapped inward onto the step grid). Single object applies to the single thumb (or every thumb); array sets per-thumb limits by index. While dragging, the grabbed thumb keeps its identity — it can't cross a neighbor or hand the drag over to it. Only constrains slider interaction — programmatic v-model writes are not clamped." },
		{ prop: "orientation", type: "'horizontal' | 'vertical'", description: "Track orientation. Vertical requires a height on the component (e.g. class=\"h-64\"); badges render above (max) and below (min) the track.", default: "horizontal" },
		{ prop: "inverted", type: "boolean", description: "Reverses the value direction (max at the left end, or at the bottom when vertical). Badges and center marker follow.", default: "false" },
		{ prop: "minStepsBetweenThumbs", type: "number", description: "USlider passthrough — minimum number of steps between range thumbs." },
		{ prop: "ui", type: "SliderProps['ui']", description: "Slot class overrides merged over the internal USlider ui (track, range, thumb, …)." },
		{ prop: "name", type: "string", description: "Native form field name, forwarded to USlider." },
		{ prop: "defaultValue", type: "number | number[]", description: "Initial value for uncontrolled usage." }
	];

	// --- Demo state ---
	const singleValue = ref(50);
	const rangeValue = ref([20, 80]);
	const limitedRangeValue = ref([20, 80]);
	const limitedSingleValue = ref(50);
	const steppedValue = ref(30);
	const steppedValue25 = ref(50);
	const customValue = ref(25);
	const verticalValue = ref(40);
	const verticalRangeValue = ref([20, 80]);
	const invertedRangeValue = ref([20, 80]);

	const formatters: Record<string, (v: number) => string> = {
		none: (v: number) => String(v),
		km: (v: number) => `${v} Km`,
		percent: (v: number) => `${v}%`,
		currency: (v: number) => `€${v}`
	};

	const kmLabel = formatters.km;
	const percentLabel = formatters.percent;

	// --- Interactive playground ---
	const playgroundValue = ref<number | number[]>(50);
	const playgroundTooltipMode = ref("hover");
	const playgroundTooltipSide = ref("top");
	const playgroundTooltipPrefix = ref("");
	const playgroundTooltipSuffix = ref("");
	const playgroundInlinePosition = ref("none");
	const playgroundInlineValue = ref("selected");
	const playgroundDisabled = ref(false);
	const playgroundBadgeWidth = ref("");
	const playgroundMin = ref(0);
	const playgroundMax = ref(100);
	const playgroundStep = ref(1);
	const playgroundFormat = ref("none");
	const playgroundCenterMarkerEnabled = ref(false);
	const playgroundCenterMarkerValue = ref(50);
	const playgroundRange = ref(false);
	const playgroundThumbLimitsEnabled = ref(false);
	const playgroundLimitMin = ref(20);
	const playgroundLimitMax = ref(80);

	watch(playgroundRange, (isRange) => {
		playgroundValue.value = isRange ? [20, 80] : 50;
	});

	// Single object → applies to every thumb (per-thumb arrays are demoed in the section below)
	const playgroundThumbLimits = computed(() => {
		if (!playgroundThumbLimitsEnabled.value) return undefined;
		return { min: playgroundLimitMin.value, max: playgroundLimitMax.value };
	});

	const playgroundTooltip = computed<SliderTooltipProp>(() => {
		const hasAffix = !!playgroundTooltipPrefix.value || !!playgroundTooltipSuffix.value;
		if (
			playgroundTooltipMode.value === "hover"
			&& playgroundTooltipSide.value === "top"
			&& !hasAffix
		) {
			return "hover";
		}
		return {
			mode: playgroundTooltipMode.value as "hover" | "visible" | "hidden",
			side: playgroundTooltipSide.value as SliderTooltipSide,
			prefix: playgroundTooltipPrefix.value || undefined,
			suffix: playgroundTooltipSuffix.value || undefined
		};
	});

	const playgroundInlineConfig = computed<SliderInlineProp>(() => {
		if (playgroundInlinePosition.value === "none") return false;
		return {
			position: playgroundInlinePosition.value as "both" | "left" | "right",
			value: playgroundInlineValue.value as "selected" | "range"
		};
	});

	const playgroundFormatter = computed(() => formatters[playgroundFormat.value] ?? formatters.none);
</script>
