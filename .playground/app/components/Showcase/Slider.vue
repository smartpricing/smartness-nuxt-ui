<template>
	<ShowcasePage
		title="Slider"
		description="Single value or range slider with a hover-only thumb tooltip, optional side inputs and optional from/to labels."
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
				<!-- Single thumb: unit in the labels via `format`, in the input via `trailing` -->
				<div class="max-w-md">
					<SSlider
						v-model="distance"
						:min="0"
						:max="200"
						limits
						:format="formatKm"
						trailing="Km"
						inputs
						input-width="4.625rem"
					/>
				</div>

				<!-- Single thumb, right input, no labels: only the input affix is needed -->
				<div class="max-w-md">
					<SSlider
						v-model="percentage"
						trailing="%"
						inputs
						input-width="3.6875rem"
					/>
				</div>

				<!-- Formatter mapping values to words, readonly input -->
				<div class="max-w-md">
					<SSlider
						v-model="level"
						:min="0"
						:max="100"
						:step="50"
						readonly
						:format="formatLevel"
						:input-format="formatLevel"
						:inputs="{ right: { ui: { base: 'bg-elevated opacity-75 text-center' } } }"
						input-width="3.6875rem"
					/>
				</div>

				<!-- Currency: locale-formatted labels, plain numeric inputs with a € affix -->
				<div class="max-w-md">
					<SSlider
						v-model="budget"
						:min="0"
						:max="2000"
						:step="50"
						limits
						:format="formatEur"
						leading="€"
						inputs
						input-width="5.5rem"
					/>
				</div>

				<!-- Range with negative values: the sign comes from both formatters -->
				<div class="max-w-md">
					<SSlider
						v-model="spread"
						:min="-3"
						:max="3"
						:step="0.25"
						limits
						:format="formatSignedPercent"
						:input-format="formatSigned"
						trailing="%"
						inputs
						input-width="4.3125rem"
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
						:min="playgroundMin"
						:max="playgroundMax"
						:step="playgroundStep"
						:disabled="playgroundDisabled"
						:readonly="playgroundReadonly"
						:tooltip="playgroundTooltip"
						:limits="playgroundLimits"
						:inputs="playgroundInputs"
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
					<UFormField label="Inputs">
						<USelect
							v-model="playgroundInputsMode"
							:items="['none', 'auto', 'left only', 'right only']"
						/>
					</UFormField>
					<UFormField
						label="Format"
						description="Tooltip and from/to labels"
					>
						<USelect
							v-model="playgroundFormat"
							:items="['plain', 'signed', 'words', 'currency (€)']"
						/>
					</UFormField>
					<UFormField
						label="Input format"
						description="Side input text — keep it round-trippable"
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
						v-model="playgroundLimits"
						label="From/to labels"
					/>
					<USwitch
						v-model="playgroundReadonly"
						label="Readonly inputs"
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
					:min="0"
					:max="10"
					limits
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

	const distance = ref(100);
	const budget = ref([400, 1200]);
	const percentage = ref(50);
	const level = ref(50);
	const spread = ref([-1.75, 1.75]);
	const slotted = ref(5);

	const LEVELS: Record<number, string> = { 0: "Bassa", 50: "Media", 100: "Alta" };

	const formatLevel = (value: number) => LEVELS[value] ?? String(value);
	const formatKm = (value: number) => `${value} Km`;
	// Negative range → explicit sign on both ends, as in the design.
	const formatSigned = (value: number) => `${value > 0 ? "+" : ""}${value}`;
	const formatSignedPercent = (value: number) => `${formatSigned(value)}%`;
	// Labels get the full locale currency; the inputs stay numeric with a € affix.
	const eur = new Intl.NumberFormat("it-IT", { style: "currency", currency: "EUR", maximumFractionDigits: 0 });
	const formatEur = (value: number) => eur.format(value);

	// --- Playground ---

	const playgroundMode = ref<"single" | "range">("single");
	const playgroundInputsMode = ref("auto");
	const playgroundInputFormat = ref("plain");
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
	const playgroundLimits = ref(true);
	const playgroundReadonly = ref(false);
	const playgroundDisabled = ref(false);

	const playgroundValue = ref<number | number[]>(40);

	watch(playgroundMode, (mode) => {
		playgroundValue.value = mode === "range" ? [25, 75] : 40;
	});

	const playgroundInputs = computed(() => {
		switch (playgroundInputsMode.value) {
		case "none": return false;
		case "left only": return { left: true };
		case "right only": return { right: true };
		default: return true;
		}
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
		{ prop: "modelValue", type: "number | number[]", description: "Slider value. An array turns on range mode (one thumb per entry)." },
		{ prop: "min", type: "number", description: "Minimum value", default: "0" },
		{ prop: "max", type: "number", description: "Maximum value", default: "100" },
		{ prop: "step", type: "number", description: "Stepping interval", default: "1" },
		{ prop: "tooltip", type: "boolean", description: "Tooltip above the thumb. Shows on thumb hover (and while dragging) only.", default: "true" },
		{ prop: "format", type: "(value: number) => string", description: "Display formatter for the tooltip and the from/to labels. Read-only surfaces, so Intl.NumberFormat, currencies and words are all fine.", default: "String(value)" },
		{ prop: "inputFormat", type: "(value: number) => string", description: "Text inside the side inputs. Independent of format because an input is an editor — its text has to survive a round trip through parse. Leave it plain and let leading/trailing carry the unit.", default: "String(value)" },
		{ prop: "leading", type: "string", description: "Non-editable affix before the value, inside the side inputs only. The tooltip and from/to labels take their unit from format instead. Override per side with inputs.left.leading." },
		{ prop: "trailing", type: "string", description: "Affix after the value, inside the side inputs. Same rules as leading." },
		{ prop: "parse", type: "(raw: string) => number | null", description: "Reads a number back out of a typed input string. Defaults to stripping everything but digits, sign and decimal separator — supply it when inputFormat groups thousands. Return null to ignore the keystroke." },
		{ prop: "inputs", type: "boolean | { left?, right? }", description: "Side inputs. true = right input for a single thumb, both for a range. Per-side value accepts any UInput prop, plus leading/trailing to override the slider-wide affixes on that input only." },
		{ prop: "inputWidth", type: "string", description: "Width applied to both side inputs.", default: "5rem" },
		{ prop: "readonly", type: "boolean", description: "Side inputs are readonly — the value stays selectable, unlike disabled.", default: "false" },
		{ prop: "limits", type: "boolean", description: "Show the min/max labels under the track.", default: "false" },
		{ prop: "minLabel", type: "string", description: "Overrides the left label (defaults to format(min))." },
		{ prop: "maxLabel", type: "string", description: "Overrides the right label (defaults to format(max))." },
		{ prop: "disabled", type: "boolean", description: "Disabled slider and inputs.", default: "false" },
		{ prop: "color", type: "string", description: "USlider color passthrough.", default: "secondary" },
		{ prop: "minStepsBetweenThumbs", type: "number", description: "USlider passthrough — minimum number of steps between range thumbs." },
		{ prop: "name", type: "string", description: "Native form field name, forwarded to USlider." },
		{ prop: "ui", type: "{ root?, tooltip?, limits?, slider? }", description: "Class overrides — root row, tooltip pill, from/to label row, and the USlider ui object (track, range, thumb)." }
	];
</script>
