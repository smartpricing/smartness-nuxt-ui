<template>
	<ShowcasePage
		title="Translatable text"
		description="STranslatableText: a text written once and translated with AI into the languages a product manages. The component owns the UI and the translation workflow; the product passes translate (and refine) in and persists the v-model."
	>
		<PropsTable :props="propsData" />

		<section
			id="design"
			class="space-y-6"
		>
			<ProseH3>
				Design reference
			</ProseH3>
			<p class="text-sm text-muted">
				Type a description: after a pause the other languages are translated. Change it again and the
				translations become out of date. The fake service below waits, and can fail on purpose.
			</p>
			<div class="grid gap-4 rounded-lg border border-primary-200 p-6 md:grid-cols-4">
				<UFormField label="Latency">
					<USelect
						v-model="latency"
						:items="latencies"
					/>
				</UFormField>
				<UFormField label="Fail">
					<USelect
						v-model="failMode"
						:items="failModes"
					/>
				</UFormField>
				<UFormField label="Fallback language">
					<USelect
						v-model="fallback"
						:items="fallbacks"
					/>
				</UFormField>
				<div class="flex flex-col justify-end gap-2">
					<USwitch
						v-model="withRefine"
						label="Refine (wand on the source)"
					/>
					<USwitch
						v-model="withRetranslate"
						label="Translate again (wand on the translation)"
					/>
					<USwitch
						v-model="disabled"
						label="Disabled"
					/>
				</div>
			</div>

			<div class="rounded-lg border border-primary-200 p-6">
				<SFormField
					label="Property description"
					description="Write the description in the primary language. Turn on the languages you want to show it in to guests: translations are already generated and you can edit them."
				>
					<STranslatableText
						ref="field"
						v-model="description"
						v-model:languages="languages"
						primary-language="en"
						:available-languages="CATALOG"
						:translate="translate"
						:refine="withRefine ? refine : undefined"
						:fallback-language="fallback === 'none' ? undefined : fallback"
						:retranslate-button="withRetranslate"
						:disabled="disabled"
						data-testid="property-description"
						:source-textarea="{ 'placeholder': 'Describe the property…', 'data-testid': 'property-description-source' }"
						:translation-textarea="{ 'data-testid': 'property-description-translation' }"
						:language-button="{ 'data-testid': 'property-description-language' }"
						:language-switch="{ 'data-testid': 'property-description-language-switch' }"
						:manage-button="{ 'data-testid': 'property-description-manage' }"
						:manage="{ checkbox: { 'data-testid': 'property-description-manage-language' }, closeButton: { 'data-testid': 'property-description-manage-close' } }"
						:confirm="{ confirmProps: { 'data-testid': 'property-description-update-confirm' } }"
					>
						<template #label="{ name }">
							{{ name }} description
						</template>
					</STranslatableText>
				</SFormField>

				<div class="mt-6 flex items-center justify-end gap-3">
					<span class="text-xs text-muted">
						{{ field?.pending.length ? `Translating: ${field.pending.join(", ")}` : "Nothing under way" }}
					</span>
					<UButton
						label="Save"
						:disabled="!!field?.pending.length || !!field?.failed.length"
						@click="saved = JSON.stringify(description, null, 2)"
					/>
				</div>
			</div>

			<div class="grid gap-4 md:grid-cols-2">
				<div>
					<p class="mb-2 text-xs font-semibold text-muted">
						v-model
					</p>
					<pre class="max-h-80 overflow-auto rounded-md bg-elevated p-3 text-xs">{{ description }}</pre>
				</div>
				<div>
					<p class="mb-2 text-xs font-semibold text-muted">
						v-model:languages · published texts
					</p>
					<pre class="max-h-80 overflow-auto rounded-md bg-elevated p-3 text-xs">{{ { languages, published } }}</pre>
				</div>
			</div>
			<div>
				<p class="mb-2 text-xs font-semibold text-muted">
					Service calls (newest first)
				</p>
				<pre
					data-testid="translatable-text-calls"
					class="max-h-40 overflow-auto rounded-md bg-elevated p-3 text-xs"
				>{{ calls.join("\n") || "None yet" }}</pre>
			</div>
			<pre
				v-if="saved"
				class="max-h-60 overflow-auto rounded-md bg-elevated p-3 text-xs"
			>Saved: {{ saved }}</pre>
		</section>

		<section
			id="existing"
			class="space-y-6"
		>
			<ProseH3>
				Existing text with out-of-date translations
			</ProseH3>
			<p class="text-sm text-muted">
				Written in Italian, English as fallback. The source changed after German and French were translated,
				so their digests no longer match; German is switched off. Switch it on to get the update modal.
			</p>
			<div class="rounded-lg border border-primary-200 p-6">
				<STranslatableText
					v-model="existing"
					v-model:languages="existingLanguages"
					primary-language="it"
					fallback-language="en"
					:available-languages="CATALOG"
					:translate="translate"
				>
					<template #label="{ name }">
						{{ name }}
					</template>
				</STranslatableText>
			</div>
			<pre class="max-h-60 overflow-auto rounded-md bg-elevated p-3 text-xs">{{ existing }}</pre>
		</section>
	</ShowcasePage>
</template>

<script setup lang="ts">
	import type { RefineRequest, STranslatableTextExposed, TranslatableText, TranslationRequest } from "#layers/smartness-nuxt-ui";
	import type { PropDefinition } from "../Utility/PropsTable.vue";
	import { publishedTexts, textDigest } from "#layers/smartness-nuxt-ui";
	import ShowcasePage from "~/components/Utility/ShowcasePage.vue";
	import PropsTable from "../Utility/PropsTable.vue";

	const CATALOG = ["en", "it", "es", "fr", "de", "pt", "nl", "pl", "ro", "el", "sv", "ru", "zh"];

	// --- Fake services: the product would call its backend here ---

	const latencies = [{ label: "Fast (300 ms)", value: 300 }, { label: "Normal (1.2 s)", value: 1200 }, { label: "Slow (4 s)", value: 4000 }];
	const failModes = [{ label: "Never", value: "never" }, { label: "German only", value: "de" }, { label: "Every call", value: "all" }];
	const fallbacks = [{ label: "None", value: "none" }, { label: "English", value: "en" }, { label: "Italian", value: "it" }];

	const latency = ref(1200);
	const failMode = ref("never");
	const fallback = ref("none");
	const withRefine = ref(true);
	const withRetranslate = ref(true);
	const disabled = ref(false);

	const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

	// Every request the component makes, newest first: what a product's backend would receive
	const calls = ref<string[]>([]);

	async function translate({ text, from, to, fresh }: TranslationRequest): Promise<Record<string, string>> {
		calls.value = [`translate ${from} → ${to.join(", ")}${fresh ? " (fresh)" : ""}: "${text.slice(0, 40)}"`, ...calls.value];
		await wait(latency.value);
		if (failMode.value === "all") throw new Error("Translation service unavailable");
		return Object.fromEntries(to
			.filter((code) => !(failMode.value === "de" && code === "de"))
			.map((code) => [code, `[${code.toUpperCase()}] ${text}`]));
	}

	async function refine({ text, language }: RefineRequest): Promise<string> {
		calls.value = [`refine ${language}: "${text.slice(0, 40)}"`, ...calls.value];
		await wait(latency.value);
		if (failMode.value === "all") throw new Error("Refine service unavailable");
		const sentence = text.trim().replace(/\s+/g, " ");
		return `${sentence.charAt(0).toUpperCase()}${sentence.slice(1)}${/[.!?]$/.test(sentence) ? "" : "."} Guests love its quiet, central location.`;
	}

	// --- Design reference ---

	const field = useTemplateRef<STranslatableTextExposed>("field");
	const description = ref<TranslatableText>();
	const languages = ref(["it", "es", "fr", "de", "pt", "nl"]);
	const saved = ref("");

	const published = computed(() => (description.value
		? publishedTexts(description.value, { languages: languages.value, fallbackLanguage: fallback.value === "none" ? undefined : fallback.value })
		: {}));

	// --- Existing text ---

	const previous = "Appartamento nel cuore di Roma.";
	const existingLanguages = ref(["es", "fr", "de"]);
	const existing = ref<TranslatableText>({
		language: "it",
		texts: {
			it: "Appartamento luminoso nel cuore di Roma, a due passi da Via del Corso.",
			en: "Bright apartment in the heart of Rome, a short walk from Via del Corso.",
			es: "Apartamento luminoso en el corazón de Roma, a pocos pasos de Via del Corso.",
			fr: "Appartement au cœur de Rome.",
			de: "Wohnung im Herzen von Rom."
		},
		inactive: ["de"],
		digests: {
			en: textDigest("Appartamento luminoso nel cuore di Roma, a due passi da Via del Corso."),
			es: textDigest("Appartamento luminoso nel cuore di Roma, a due passi da Via del Corso."),
			fr: textDigest(previous),
			de: textDigest(previous)
		}
	});

	// --- Props ---

	const propsData: PropDefinition[] = [
		{ prop: "v-model", type: "TranslatableText | undefined", description: "{ language, texts, inactive?, digests? }. undefined is an empty field: the first keystroke creates it in primaryLanguage." },
		{ prop: "v-model:languages", type: "string[]", description: "The organisation's languages. Manage writes them at once; the product persists them." },
		{ prop: "primaryLanguage", type: "string", description: "The language a new text starts in." },
		{ prop: "availableLanguages", type: "string[]", description: "Every language Manage offers: each product passes its own." },
		{ prop: "translate", type: "(request: TranslationRequest) => Promise<Record<string, string>>", description: "A language missing from the answer failed, a throw fails them all." },
		{ prop: "refine", type: "(request: RefineRequest) => Promise<string>", description: "Rewrites the source. No function, no wand on the source." },
		{ prop: "fallbackLanguage", type: "string", description: "Always published, with a Fallback badge; what an inactive language falls back to." },
		{ prop: "visibleLanguages", type: "number", description: "Languages shown before \"Show N more\".", default: "5" },
		{ prop: "debounce", type: "number", description: "Typing pause before the missing languages are translated, in ms.", default: "1000" },
		{ prop: "disabled", type: "boolean", description: "Read-only field: languages can still be browsed.", default: "false" },
		{ prop: "sourceTextarea / translationTextarea", type: "TextareaProps", description: "Forwarded to the two UTextarea (rows, placeholder, maxlength, data-testid…)." },
		{ prop: "languageButton / languageSwitch", type: "ButtonProps / SwitchProps", description: "Applied to every chip and switch; data-test-value carries the language code." },
		{ prop: "manageButton / retranslateButton", type: "boolean | ButtonProps", description: "false hides it.", default: "true" },
		{ prop: "refineButton / updateButton / showMoreButton / retryButton", type: "ButtonProps", description: "Forwarded to those buttons." },
		{ prop: "manage", type: "{ slideover, searchInput, selectAll, checkbox, closeButton }", description: "Forwarded to the Manage slideover and its parts." },
		{ prop: "confirm", type: "ConfirmOptions", description: "Overrides for the modal shown when an out-of-date language is switched on." },
		{ prop: "ui", type: "{ root, languages, content, label, note, hint }", description: "Slot classes, merged with tailwind-merge." }
	];
</script>
