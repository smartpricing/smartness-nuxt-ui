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
	</ShowcasePage>
</template>

<script lang="ts" setup>
	import type { PropDefinition } from "../Utility/PropsTable.vue";
	import type { SliderInlineProp, SliderTooltipProp } from "~/components/Slider/types";
	import ShowcasePage from "~/components/Utility/ShowcasePage.vue";
	import PropsTable from "../Utility/PropsTable.vue";

	// --- Props table ---
	const propsData: PropDefinition[] = [
		{ prop: "modelValue", type: "number | number[]", description: "Slider value. Pass an array for range mode." },
		{ prop: "min", type: "number", description: "Minimum value", default: "0" },
		{ prop: "max", type: "number", description: "Maximum value", default: "100" },
		{ prop: "step", type: "number", description: "Stepping interval", default: "1" },
		{ prop: "tooltip", type: "string | { mode, side }", description: "Tooltip behavior. 'hover' | 'visible' | 'hidden', or object { mode, side }.", default: "hover" },
		{ prop: "inline", type: "boolean | { position, value }", description: "Inline badges. true = shorthand for { position: 'both', value: 'selected' }. position: 'both' | 'left' | 'right'. value: 'selected' | 'range'.", default: "false" },
		{ prop: "badgeWidth", type: "string", description: "Fixed width for inline badges (e.g. '60px'). Prevents layout shift." },
		{ prop: "formatLabel", type: "(value: number) => string", description: "Formatter for tooltip and badge labels.", default: "String(value)" },
		{ prop: "disabled", type: "boolean", description: "Disabled state with distinct color changes (no opacity).", default: "false" },
		{ prop: "color", type: "string", description: "USlider color prop passthrough.", default: "secondary" },
		{ prop: "centerMarker", type: "number", description: "Position value for a center marker tick on the track. Only visible in range mode (array v-model). If omitted, no marker is shown." },
		{ prop: "defaultValue", type: "number | number[]", description: "Initial value for uncontrolled usage." }
	];

	// --- Demo state ---
	const singleValue = ref(50);
	const rangeValue = ref([20, 80]);
	const steppedValue = ref(30);
	const steppedValue25 = ref(50);
	const customValue = ref(25);

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

	const playgroundTooltip = computed<SliderTooltipProp>(() => {
		if (playgroundTooltipMode.value === "hover" && playgroundTooltipSide.value === "top") {
			return "hover";
		}
		return {
			mode: playgroundTooltipMode.value as "hover" | "visible" | "hidden",
			side: playgroundTooltipSide.value as "top" | "bottom" | "left" | "right"
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
