<template>
	<ShowcasePage
		title="Slider"
		description="Single value or range slider wrapped in a UFormField: label, description, help and error come from the field, the value sits in the label row as text (readonly) or as inputs."
	>
		<PropsTable :props="propsData" />

		<section
			id="design"
			class="space-y-6"
		>
			<ProseH3>
				Design reference
			</ProseH3>
			<div class="space-y-10 rounded-lg border border-primary-200 p-6">
				<!-- Readonly value in the hint, with a description and a help line -->
				<div class="max-w-md">
					<SSlider
						v-model="distance"
						label="Label"
						description="This is a description"
						help="Help! I need somebody!"
						:min="0"
						:max="200"
						readonly
						:format="formatKm"
					/>
				</div>

				<!-- Same slider, editable: the value becomes an input with a Km affix -->
				<div class="max-w-md">
					<SSlider
						v-model="distance"
						label="Label"
						help="Help! I need somebody!"
						:min="0"
						:max="200"
						:format="formatKm"
						trailing="Km"
						input-width="4.625rem"
					/>
				</div>

				<!-- Range: from/to labels come from the locale, one input per thumb -->
				<div class="max-w-md">
					<SSlider
						v-model="spread"
						label="Label"
						help="Help! I need somebody!"
						:min="-3"
						:max="3"
						:step="0.25"
						:format="formatSignedPercent"
						:input-format="formatSigned"
						trailing="%"
						input-width="4.3125rem"
					/>
				</div>

				<!-- Readonly range: same from/to labels, values as text -->
				<div class="max-w-md">
					<SSlider
						v-model="spread"
						label="Label"
						description="This is a description"
						help="Help! I need somebody!"
						:min="-3"
						:max="3"
						:step="0.25"
						readonly
						:format="formatSignedPercent"
					/>
				</div>

				<!-- Currency: locale-formatted min/max, plain numeric inputs with a € affix -->
				<div class="max-w-md">
					<SSlider
						v-model="budget"
						label="Budget"
						:min="0"
						:max="2000"
						:step="50"
						:format="formatEur"
						leading="€"
						input-width="5.5rem"
					/>
				</div>

				<!-- Error state: UFormField swaps help for the error message -->
				<div class="max-w-md">
					<SSlider
						v-model="percentage"
						label="Occupancy"
						required
						error="Pick a value above 60%"
						trailing="%"
						input-width="3.6875rem"
					/>
				</div>
			</div>
		</section>

		<section
			id="interactive"
			class="space-y-6"
		>
			<ProseH3>
				Interactive playground
			</ProseH3>
			<div class="space-y-6 rounded-lg border border-primary-200 p-6">
				<div class="max-w-lg">
					<SSlider
						v-model="playgroundValue"
						:label="playgroundLabel || undefined"
						:description="playgroundDescription || undefined"
						:help="playgroundHelp || undefined"
						:error="playgroundError || undefined"
						:min="playgroundMin"
						:max="playgroundMax"
						:step="playgroundStep"
						:disabled="playgroundDisabled"
						:readonly="playgroundReadonly"
						:tooltip="playgroundTooltip"
						:format="playgroundFormatter"
						:input-format="playgroundInputFormatter"
						:input-width="playgroundInputWidth"
						:color="playgroundColor"
						:min-label="playgroundMinLabel || undefined"
						:max-label="playgroundMaxLabel || undefined"
						:min-steps-between-thumbs="playgroundMinSteps || undefined"
						:leading="playgroundLeading || undefined"
						:trailing="playgroundTrailing || undefined"
					/>
				</div>
				<p class="text-xs text-primary-500">
					Value: {{ playgroundValue }}
				</p>
				<div class="grid grid-cols-2 gap-4 md:grid-cols-3">
					<UFormField label="Mode">
						<USelect
							v-model="playgroundMode"
							:items="['single', 'range']"
						/>
					</UFormField>
					<UFormField label="Label">
						<UInput v-model="playgroundLabel" />
					</UFormField>
					<UFormField label="Description">
						<UInput v-model="playgroundDescription" />
					</UFormField>
					<UFormField label="Help">
						<UInput v-model="playgroundHelp" />
					</UFormField>
					<UFormField
						label="Error"
						description="Replaces the help line"
					>
						<UInput v-model="playgroundError" />
					</UFormField>
					<UFormField
						label="Format"
						description="Readonly hint, tooltip and min/max labels"
					>
						<USelect
							v-model="playgroundFormat"
							:items="['plain', 'signed', 'words', 'currency (€)']"
						/>
					</UFormField>
					<UFormField
						label="Input format"
						description="Value input text — keep it round-trippable"
					>
						<USelect
							v-model="playgroundInputFormat"
							:items="['plain', 'signed', 'words', 'currency (€)']"
						/>
					</UFormField>
					<UFormField label="Color">
						<USelect
							v-model="playgroundColor"
							:items="[...colors]"
						/>
					</UFormField>
					<UFormField
						label="Leading"
						description="Affix inside the inputs"
					>
						<UInput
							v-model="playgroundLeading"
							placeholder="e.g. €"
						/>
					</UFormField>
					<UFormField
						label="Trailing"
						description="Affix inside the inputs"
					>
						<UInput
							v-model="playgroundTrailing"
							placeholder="e.g. %"
						/>
					</UFormField>
					<UFormField label="Input width">
						<UInput
							v-model="playgroundInputWidth"
							placeholder="5rem"
						/>
					</UFormField>
					<UFormField label="Min label">
						<UInput
							v-model="playgroundMinLabel"
							placeholder="defaults to format(min)"
						/>
					</UFormField>
					<UFormField label="Max label">
						<UInput
							v-model="playgroundMaxLabel"
							placeholder="defaults to format(max)"
						/>
					</UFormField>
					<UFormField
						label="Min steps between thumbs"
						:description="playgroundMode === 'range' ? undefined : 'Range mode only'"
					>
						<UInput
							v-model.number="playgroundMinSteps"
							type="number"
							:disabled="playgroundMode !== 'range'"
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
					<USwitch
						v-model="playgroundTooltip"
						label="Tooltip"
					/>
					<USwitch
						v-model="playgroundReadonly"
						label="Readonly (value as text)"
					/>
					<USwitch
						v-model="playgroundDisabled"
						label="Disabled"
					/>
				</div>
			</div>
		</section>

		<section
			id="slots"
			class="space-y-6"
		>
			<ProseH3>
				Replacing the inputs
			</ProseH3>
			<p class="text-sm text-muted">
				<code>#input-left</code> and <code>#input-right</code> replace the default inputs. Each slot receives
				<code>value</code>, <code>formatted</code> (via <code>inputFormat</code>), <code>disabled</code>, <code>readonly</code> and <code>setValue</code>.
			</p>
			<div class="max-w-lg rounded-lg border border-primary-200 p-6">
				<SSlider
					v-model="slotted"
					label="Guests"
					:min="0"
					:max="10"
					input-width="7rem"
				>
					<template #input-right="{ formatted, setValue, value }">
						<div class="flex items-center gap-1">
							<UButton
								icon="ph:minus"
								variant="outline"
								size="xs"
								@click="setValue(value - 1)"
							/>
							<span class="w-8 text-center text-sm">{{ formatted }}</span>
							<UButton
								icon="ph:plus"
								variant="outline"
								size="xs"
								@click="setValue(value + 1)"
							/>
						</div>
					</template>
				</SSlider>
			</div>
		</section>
	</ShowcasePage>
</template>

<script setup lang="ts">
	import type { PropDefinition } from "../Utility/PropsTable.vue";
	import ShowcasePage from "~/components/Utility/ShowcasePage.vue";
	import PropsTable from "../Utility/PropsTable.vue";

	// --- Design reference ---

	const distance = ref(50);
	const budget = ref([400, 1200]);
	const percentage = ref(50);
	const spread = ref([-1.75, 1.75]);
	const slotted = ref(5);

	const LEVELS: Record<number, string> = { 0: "Bassa", 50: "Media", 100: "Alta" };

	const formatLevel = (value: number) => LEVELS[value] ?? String(value);
	const formatKm = (value: number) => `${value} Km`;
	// Negative range → explicit sign on both ends, as in the design.
	const formatSigned = (value: number) => `${value > 0 ? "+" : ""}${value}`;
	const formatSignedPercent = (value: number) => `${formatSigned(value)} %`;
	// Labels get the full locale currency; the inputs stay numeric with a € affix.
	const eur = new Intl.NumberFormat("it-IT", { style: "currency", currency: "EUR", maximumFractionDigits: 0 });
	const formatEur = (value: number) => eur.format(value);

	// --- Playground ---

	const playgroundMode = ref<"single" | "range">("single");
	const playgroundInputFormat = ref("plain");
	const playgroundLabel = ref("Label");
	const playgroundDescription = ref("");
	const playgroundHelp = ref("Help! I need somebody!");
	const playgroundError = ref("");
	const playgroundLeading = ref("");
	const playgroundTrailing = ref("");
	const playgroundInputWidth = ref("5rem");
	const playgroundMinLabel = ref("");
	const playgroundMaxLabel = ref("");
	const playgroundMinSteps = ref(0);

	const { colors } = useConstants();
	const playgroundColor = ref<typeof colors[number]>("secondary");
	const playgroundFormat = ref("plain");
	const playgroundMin = ref(0);
	const playgroundMax = ref(100);
	const playgroundStep = ref(1);
	const playgroundTooltip = ref(true);
	const playgroundReadonly = ref(false);
	const playgroundDisabled = ref(false);

	const playgroundValue = ref<number | number[]>(40);

	watch(playgroundMode, (mode) => {
		playgroundValue.value = mode === "range" ? [25, 75] : 40;
	});

	function formatterFor(name: string) {
		switch (name) {
		case "signed": return formatSigned;
		case "words": return formatLevel;
		case "currency (€)": return formatEur;
		default: return (value: number) => String(value);
		}
	}

	const playgroundFormatter = computed(() => formatterFor(playgroundFormat.value));
	const playgroundInputFormatter = computed(() => formatterFor(playgroundInputFormat.value));

	const propsData: PropDefinition[] = [
		{ prop: "modelValue", type: "number | number[]", description: "Slider value. An array turns on range mode (one thumb per entry, from/to labels around the inputs)." },
		{ prop: "min", type: "number", description: "Minimum value. Always rendered under the track.", default: "0" },
		{ prop: "max", type: "number", description: "Maximum value. Always rendered under the track.", default: "100" },
		{ prop: "step", type: "number", description: "Stepping interval", default: "1" },
		{ prop: "readonly", type: "boolean", description: "Renders the current value as text in the form field hint instead of as editable inputs.", default: "false" },
		{ prop: "tooltip", type: "boolean", description: "Tooltip above the thumb. Shows on thumb hover (and while dragging) only.", default: "true" },
		{ prop: "format", type: "(value: number) => string", description: "Display formatter for the readonly hint, the tooltip and the min/max labels. Read-only surfaces, so Intl.NumberFormat, currencies and words are all fine.", default: "String(value)" },
		{ prop: "inputFormat", type: "(value: number) => string", description: "Text inside the value inputs. Independent of format because an input is an editor — its text has to survive a round trip through parse. Leave it plain and let leading/trailing carry the unit.", default: "String(value)" },
		{ prop: "leading", type: "string", description: "Non-editable affix before the value, inside the value inputs only. The hint, tooltip and min/max labels take their unit from format instead. Override per side with inputs.left.leading." },
		{ prop: "trailing", type: "string", description: "Affix after the value, inside the value inputs. Same rules as leading." },
		{ prop: "parse", type: "(raw: string) => number | null", description: "Reads a number back out of a typed input string. Defaults to stripping everything but digits, sign and decimal separator — supply it when inputFormat groups thousands. Return null to ignore the keystroke." },
		{ prop: "inputs", type: "{ left?, right? }", description: "Per-side UInput overrides. Accepts any UInput prop, plus leading/trailing to override the slider-wide affixes on that input only." },
		{ prop: "inputWidth", type: "string", description: "Width applied to the value inputs.", default: "5rem" },
		{ prop: "minLabel", type: "string", description: "Overrides the left label under the track (defaults to format(min))." },
		{ prop: "maxLabel", type: "string", description: "Overrides the right label under the track (defaults to format(max))." },
		{ prop: "disabled", type: "boolean", description: "Disabled slider and inputs.", default: "false" },
		{ prop: "color", type: "string", description: "USlider color passthrough.", default: "secondary" },
		{ prop: "minStepsBetweenThumbs", type: "number", description: "USlider passthrough — minimum number of steps between range thumbs." },
		{ prop: "label / description / help / error / hint / size / required / orientation / name / errorPattern / eagerValidation / validateOnInputDelay", type: "UFormField props", description: "Forwarded to the wrapping UFormField. hint defaults to the formatted value when readonly." },
		{ prop: "ui", type: "{ hint?, track?, tooltip?, limits?, slider?, formField? }", description: "Class overrides — hint row, track row, tooltip pill, min/max label row, the USlider ui object and the UFormField ui object." }
	];
</script>
