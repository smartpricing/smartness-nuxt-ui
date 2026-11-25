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
						data-testid="translatable-text-latency"
					>
						<template #item-label="{ item }">
							<span
								data-testid="translatable-text-latency-option"
								:data-test-value="item.value"
							>{{ item.label }}</span>
						</template>
					</USelect>
				</UFormField>
				<UFormField label="Fail">
					<USelect
						v-model="failMode"
						:items="failModes"
						data-testid="translatable-text-fail"
					>
						<template #item-label="{ item }">
							<span
								data-testid="translatable-text-fail-option"
								:data-test-value="item.value"
							>{{ item.label }}</span>
						</template>
					</USelect>
				</UFormField>
				<UFormField label="Required languages">
					<USelect
						v-model="required"
						:items="requiredOptions"
						data-testid="translatable-text-required"
					>
						<template #item-label="{ item }">
							<span
								data-testid="translatable-text-required-option"
								:data-test-value="item.value"
							>{{ item.label }}</span>
						</template>
					</USelect>
				</UFormField>
				<div class="flex flex-col justify-end gap-2">
					<USwitch
						v-model="withRefine"
						label="Refine (wand on the source)"
						data-testid="translatable-text-refine-toggle"
					/>
					<USwitch
						v-model="withRetranslate"
						label="Translate again (wand on the translation)"
						data-testid="translatable-text-retranslate-toggle"
					/>
					<USwitch
						v-model="withClearAll"
						label="Clear all languages (under Manage)"
						data-testid="translatable-text-clear-all-toggle"
					/>
					<USwitch
						v-model="disabled"
						label="Disabled"
						data-testid="translatable-text-disabled-toggle"
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
						:translate="translate"
						:refine="withRefine ? refine : undefined"
						:required-languages="requiredLanguages"
						:retranslate-button="withRetranslate ? testIds.retranslateButton : false"
						:clear-all-button="withClearAll ? testIds.clearAllButton : false"
						:clear-confirm="testIds.clearConfirm"
						:disabled="disabled"
						data-testid="property-description"
						:source-textarea="{ placeholder: 'Describe the property…', ...testIds.sourceTextarea }"
						:translation-textarea="testIds.translationTextarea"
						:language-button="testIds.languageButton"
						:language-switch="testIds.languageSwitch"
						:manage-button="testIds.manageButton"
						:refine-button="testIds.refineButton"
						:update-button="testIds.updateButton"
						:show-more-button="testIds.showMoreButton"
						:retry-button="testIds.retryButton"
						:manage="testIds.manage"
						:confirm="testIds.confirm"
						:attributes="testIds.attributes"
					>
						<template #label="{ name }">
							{{ name }} description
						</template>
					</STranslatableText>
				</SFormField>

				<div class="mt-6 flex items-center justify-end gap-3">
					<span
						class="text-xs text-muted"
						data-testid="translatable-text-status"
					>
						{{ field?.pending.length ? `Translating: ${field.pending.join(", ")}` : "Nothing under way" }}
					</span>
					<UButton
						label="Save"
						data-testid="translatable-text-save"
						:disabled="!!field?.pending.length || !!field?.failed.length || !!field?.emptyRequired.length"
						@click="saved = JSON.stringify(description, null, 2)"
					/>
				</div>
			</div>

			<div class="grid gap-4 md:grid-cols-2">
				<div>
					<p class="mb-2 text-xs font-semibold text-muted">
						v-model
					</p>
					<pre
						data-testid="translatable-text-model"
						class="max-h-80 overflow-auto rounded-md bg-elevated p-3 text-xs"
					>{{ description }}</pre>
				</div>
				<div>
					<p class="mb-2 text-xs font-semibold text-muted">
						v-model:languages · published texts
					</p>
					<pre
						data-testid="translatable-text-published"
						class="max-h-80 overflow-auto rounded-md bg-elevated p-3 text-xs"
					>{{ { languages, published } }}</pre>
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
				data-testid="translatable-text-saved"
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
				Written in Italian with English required, as on a storefront. The source changed after German and French were translated,
				so their digests no longer match; German is switched off. Switch it on to get the update modal.
			</p>
			<div class="rounded-lg border border-primary-200 p-6">
				<STranslatableText
					v-model="existing"
					v-model:languages="existingLanguages"
					primary-language="it"
					:required-languages="['en']"
					:translate="translate"
					data-testid="existing-description"
					:language-button="{ 'data-testid': 'existing-description-language' }"
					:language-switch="{ 'data-testid': 'existing-description-language-switch' }"
					:update-button="{ 'data-testid': 'existing-description-update' }"
					:confirm="{ confirmProps: { 'data-testid': 'existing-description-update-confirm' }, cancelProps: { 'data-testid': 'existing-description-update-cancel' } }"
					:attributes="{ staleIcon: { 'data-testid': 'existing-description-stale' }, badge: { 'data-testid': 'existing-description-badge' } }"
				>
					<template #label="{ name }">
						{{ name }}
					</template>
				</STranslatableText>
			</div>
			<pre
				data-testid="existing-description-model"
				class="max-h-60 overflow-auto rounded-md bg-elevated p-3 text-xs"
			>{{ existing }}</pre>
		</section>
	</ShowcasePage>
</template>

<script setup lang="ts">
	import type { ModalProps, SlideoverProps } from "@nuxt/ui";
	import type { RefineRequest, STranslatableTextExposed, TranslatableText, TranslationRequest } from "#layers/smartness-nuxt-ui";
	import type { PropDefinition } from "../Utility/PropsTable.vue";
	import { publishedTexts, textDigest } from "#layers/smartness-nuxt-ui";
	import ShowcasePage from "~/components/Utility/ShowcasePage.vue";
	import PropsTable from "../Utility/PropsTable.vue";

	// --- Fake services: the product would call its backend here ---

	const latencies = [{ label: "Fast (300 ms)", value: 300 }, { label: "Normal (1.2 s)", value: 1200 }, { label: "Slow (4 s)", value: 4000 }];
	const failModes = [{ label: "Never", value: "never" }, { label: "German only", value: "de" }, { label: "Every call", value: "all" }];
	const requiredOptions = [{ label: "None", value: "none" }, { label: "Italian", value: "it" }, { label: "Italian and German", value: "it,de" }];

	const latency = ref(1200);
	const failMode = ref("never");
	const required = ref("none");
	const requiredLanguages = computed(() => (required.value === "none" ? [] : required.value.split(",")));
	const withRefine = ref(true);
	const withRetranslate = ref(true);
	const withClearAll = ref(true);
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

	// Every test-id channel the component offers, bound at once, so a test can reach each node
	const testId = (name: string) => ({ "data-testid": `property-description-${name}` });
	const testIds = {
		sourceTextarea: testId("source"),
		translationTextarea: testId("translation"),
		languageButton: testId("language"),
		languageSwitch: testId("language-switch"),
		manageButton: testId("manage"),
		retranslateButton: testId("retranslate"),
		clearAllButton: testId("clear-all"),
		refineButton: testId("refine"),
		updateButton: testId("update"),
		showMoreButton: testId("show-more"),
		retryButton: testId("retry"),
		manage: {
			// `content` is typed by Reka without data-* keys: reachable at runtime, cast to type-check
			slideover: { content: testId("manage-panel") as SlideoverProps["content"], close: testId("manage-x") },
			searchInput: testId("manage-search"),
			selectAll: testId("manage-select-all"),
			checkbox: testId("manage-language"),
			closeButton: testId("manage-close")
		},
		clearConfirm: {
			confirmProps: testId("clear-confirm"),
			cancelProps: testId("clear-cancel"),
			modalProps: { content: testId("clear-modal") as ModalProps["content"] }
		},
		confirm: {
			confirmProps: testId("update-confirm"),
			cancelProps: testId("update-cancel"),
			modalProps: { content: testId("update-modal") as ModalProps["content"], close: testId("update-x") }
		},
		attributes: {
			languages: testId("languages"),
			badge: testId("badge"),
			staleIcon: testId("stale"),
			tooltip: testId("tooltip"),
			hint: testId("hint"),
			label: testId("label"),
			note: testId("note"),
			error: testId("error"),
			alert: testId("alert"),
			manageInfo: testId("manage-info"),
			manageEmpty: testId("manage-empty")
		}
	};

	const field = useTemplateRef<STranslatableTextExposed>("field");
	const description = ref<TranslatableText>();
	const languages = ref(["it", "es", "fr", "de", "pt", "nl"]);
	const saved = ref("");

	const published = computed(() => (description.value
		? publishedTexts(description.value, { languages: languages.value, requiredLanguages: requiredLanguages.value })
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
		{ prop: "availableLanguages", type: "string[]", description: "Every language Manage offers; a product with its own catalog passes it. Keeping v-model:languages inside it is the product's job (Manage cannot remove a language outside it).", default: "SMARTNESS_LANGUAGES" },
		{ prop: "translate", type: "(request: TranslationRequest) => Promise<Record<string, string>>", description: "A language missing from the answer failed, a throw fails them all." },
		{ prop: "refine", type: "(request: RefineRequest) => Promise<string>", description: "Rewrites the source. No function, no wand on the source." },
		{ prop: "requiredLanguages", type: "string[]", description: "Languages the text must have (e.g. English on a storefront written in Italian): always translated and published, no switch, a Required badge, locked in Manage. An empty one is flagged once the source has a text, and exposed as emptyRequired." },
		{ prop: "visibleLanguages", type: "number", description: "Languages shown before \"Show N more\".", default: "5" },
		{ prop: "debounce", type: "number", description: "Typing pause before the missing languages are translated, in ms.", default: "1000" },
		{ prop: "disabled", type: "boolean", description: "Read-only field: languages can still be browsed.", default: "false" },
		{ prop: "sourceTextarea / translationTextarea", type: "TextareaProps", description: "Forwarded to the two UTextarea (rows, placeholder, maxlength, data-testid…)." },
		{ prop: "languageButton / languageSwitch", type: "ButtonProps / SwitchProps", description: "Applied to every chip and switch; data-test-value carries the language code." },
		{ prop: "manageButton / retranslateButton / clearAllButton", type: "boolean | ButtonProps", description: "false hides it. \"Clear all languages\" empties the text in every language once confirmed: hide it on a required field.", default: "true" },
		{ prop: "refineButton / updateButton / showMoreButton / retryButton", type: "ButtonProps", description: "Forwarded to those buttons." },
		{ prop: "manage", type: "{ slideover, searchInput, selectAll, checkbox, closeButton }", description: "Forwarded to the Manage slideover and its parts." },
		{ prop: "confirm", type: "ConfirmOptions", description: "Overrides for the modal shown when an out-of-date language is switched on." },
		{ prop: "clearConfirm", type: "ConfirmOptions", description: "Overrides for the confirm modal of \"Clear all languages\"." },
		{ prop: "attributes", type: "TranslatableTextAttributes", description: "HTML attributes for the nodes no prop object reaches: languages, badge, staleIcon, tooltip, hint, label, note, error, alert, manageInfo, manageEmpty. Repeated ones get a data-test-value." },
		{ prop: "ui", type: "{ root, languages, content, label, note, error, hint }", description: "Slot classes, merged with tailwind-merge." }
	];
</script>
