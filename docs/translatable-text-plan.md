# STranslatableText — design proposal

Status: implemented (`app/components/TranslatableText/`, showcase `/translatable-text`). Differences from this plan: missing languages are the ones with no entry in `texts` (a translation emptied by hand stays empty), a `retryButton` prop joins the other button props, and refine failures get their own alert.

## Context

A guest-facing text written once in the organisation's primary language and translated with AI into the languages the organisation manages. The same field serves the property description, the unit type description and the guest instructions, across every product that extends the layer.

Sources reviewed:

- the spec "Componente testi per gli ospiti — come funziona" (derived from the designer's demo and the 12/11 walkthrough);
- the demo recording (frames only: the audio was not transcribed);
- the self-onboarding implementation: `apps/frontend/app/components/add-property/GuestTextField.vue`, `packages/shared/src/guest-text.ts`, `useGuestTextServices.ts`, `useGuestLanguages.ts`, `UnitInstructions.vue`.

The layer component owns the UI and the translation workflow. It never calls an API: the product passes the services in and persists what comes out.

## Decisions (round 1)

1. **Contract**: state goes through `v-model`; the work whose result the component needs (translate, refine) goes in as async function props. Why, with precedents: below.
2. **Model**: shaped for DX, not for self-onboarding's current drafts; self-onboarding adapts when it adopts the component.
3. **Test ids**: the `feat/data-test-ids` rules.
4. Self-onboarding additions:
   - no built-in English fallback: an optional `fallbackLanguage` prop, none by default;
   - "Translate again" on the translation field, switchable with `retranslateButton` (default on);
   - failure alert with Retry;
   - warning on "Show N more" when a hidden language is stale.

## Why a function prop for translate / refine

How Vue libraries hand async work to the parent. The three patterns differ in who keeps the in-flight state:

| Pattern | Precedents | The in-flight state lives in |
| --- | --- | --- |
| Function prop the component awaits | Nuxt UI `UForm` `validate?: (state) => Promise<FormError[]> \| FormError[]`; Vuetify `v-treeview` `load-children: (item) => Promise<void>`; Naive UI `n-tree` `on-load: (node) => Promise<void>`; Element Plus `el-upload` `http-request: (options) => XMLHttpRequest \| Promise<unknown>` and `before-upload` (may return a Promise) | the component |
| Listener declared as a prop, awaited for completion only | Nuxt UI `UForm` `onSubmit?: (event) => void \| Promise<void>`, `UButton` `onClick` + `loadingAuto` | the component (loading only) |
| Emit + state props pushed back by the parent | Nuxt UI `UInputMenu` `v-model:search-term` + `ignoreFilter` + `loading`, `UChatPromptSubmit` `status` + `@stop` / `@reload` (status kept by the AI SDK's `useChat`); Vuetify `v-data-table-server` `@update:options` + `items` / `items-length` / `loading`; PrimeVue `AutoComplete` `@complete` + `suggestions` | the parent |

Reka UI is headless and has no async contract of its own: its async cases (a combobox searching a server) go through `v-model:search-term` and the parent, the third pattern.

Vue's docs take no side between the first and the third: `$emit` is typed `void`, so an event can tell the parent something happened but cannot get an answer back, and `Function` is simply a valid prop type. The choice is between the first and the third.

The third fits when the parent owns a single request and its result (a search, a chat). Here the component decides **when** to translate (typing pause, missing languages, switching on a stale one, Manage adding one), **what** (which languages, `fresh` or not) and **how to apply** the answer (the source moved on meanwhile, a translation edited by hand meanwhile, one language missing in the answer). With emits every product would rewrite that bookkeeping, and getting it wrong loses a hand edit. Side by side:

```vue
<!-- Function prop: the product only says how to call its service -->
<STranslatableText
	v-model="description"
	:translate="(request) => $fetch('/api/translate', { method: 'POST', body: request })"
/>
```

```vue
<!-- Emit: the product keeps what is under way and applies the answer itself -->
<script setup lang="ts">
const translating = ref<string[]>([]);
const failed = ref<string[]>([]);

async function onTranslate({ text, from, to }: TranslationRequest) {
	translating.value = [...translating.value, ...to];
	try {
		const got = await $fetch("/api/translate", { method: "POST", body: { text, from, to } });
		// the source may have changed and a language may have been edited by hand meanwhile
		description.value = withTranslated(description.value, text, to, got);
	}
	catch {
		failed.value = [...failed.value, ...to];
	}
	finally {
		translating.value = translating.value.filter((code) => !to.includes(code));
	}
}
</script>

<template>
	<STranslatableText v-model="description" :translating="translating" :failed="failed" @translate="onTranslate" />
</template>
```

## Spec vs demo vs self-onboarding

| Topic | Spec | Demo | Self-onboarding | Proposal |
| --- | --- | --- | --- | --- |
| New language from Manage | starts active | starts off, "Turn on translation for the selected languages" toggle | starts active | spec: active, toggle dropped |
| Refine (wand) | source only | wand on source **and** on the translation field | removed (34b3393, waiting for the generate/refine service) | optional `refine` prop; no prop, no wand |
| Per-language "reset" | — | wand on the translation field | "Translate again" button under each translation (fresh call, overwrites hand edits) | wand on the translation field, `retranslateButton`, default on |
| Fallback language | "falls back to English" | primary is EN, untested | EN always published, badge "Fallback" | `fallbackLanguage` prop, none by default |
| Failed translation | — | — | alert + Retry, remembered across remounts (SSO-30) | alert + Retry while mounted; persistence stays in the product |
| Stale language hidden by the fold | — | — | warning on "Show N more" | kept |
| Stale modal copy | "The source content has changed…" / Cancel | same | "The translations are out of date" / Not now | spec |
| Update button | under the source | solid, wand icon, right-aligned | warning outline + caption | demo |
| Inactive language hint | "Enable it to show this translation…" | above the source | "X is switched off…" sentence | demo; the "falls back to X" half only with `fallbackLanguage` |
| Switch tooltip | — | "Active" / "Not active" | none | demo |
| AI notes | "Translated with AI…", "Re-written with AI…" | both | none | demo |
| Row order | — | fixed (EN, IT, ES, FR, DE, PT, NL) | published languages move to the top | fixed: primary, fallback, then the organisation's order |

## Structure

```
app/components/TranslatableText/
  STranslatableText.vue           coordinator: two-column layout, selected language, hint, AI notes, Update button
  STranslatableTextLanguages.vue  left column: chips, switch + tooltip, stale icon, Primary/Fallback badge, fold, Manage button
  STranslatableTextManage.vue     USlideover: info, search, select all, one checkbox per language
  useTranslatableText.ts          workflow: debounced auto-translate, pending/failed, race guards, update/retranslate/refine
  types.ts
app/utils/translatable-text.ts    pure rules, re-exported from runtime/index.ts
app/locale/{en,it,de,es,fr}.ts    sTranslatableText block
.playground/content/components/translatable-text.md   showcase with fake translate/refine (latency, failure toggle)
```

Built from Nuxt UI and layer parts only: `UTextarea`, `USwitch`, `UTooltip`, `UBadge`, `UButton`, `USlideover`, `UInput`, `UCheckbox`, `SAlert`, and the stale modal through `useConfirm()` (`SConfirmModal`). No label/help props: the field title, info icon and help text come from `SFormField` at the call site (repo rule: pure by default).

## Value model

```ts
interface TranslatableText {
	/** The language the text is written in; every other entry of `texts` is a translation of it. */
	language: string
	/** What guests read, per language: the written text and its translations. */
	texts: Record<string, string>
	/** Switched off: translated and kept, not shown to guests. A language added later starts on. */
	inactive?: string[]
	/** Per translation, a digest of the text it was made from: when it no longer matches, the translation is out of date. */
	digests?: Record<string, string>
}
```

```json
{
	"language": "it",
	"texts": { "it": "Casa sul lago…", "en": "Lake house…", "de": "Haus am See…" },
	"inactive": ["de"],
	"digests": { "en": "9f1c2a7b", "de": "03aa41e0" }
}
```

- `texts` is the plain per-language map most backends already keep, so a product reads, saves and serves it without the layer.
- `inactive` holds the languages switched off on this text (spec §3): their translation is kept, edited and refreshed like the others, but guests do not see it. It lists the ones switched off, not the ones on, because every language starts on, a language added later from Manage included.
- `digests` holds, per translation, a short hash of the source it was made from (spec §5, the stale warning). Write "Casa sul lago", English is translated, `digests.en` is the hash of "Casa sul lago". Change the source to "Casa sul lago con piscina": its hash no longer matches `digests.en`, so English is out of date, with the warning icon and "Update translations with AI". Updating stores the new hash; changing the source back clears the warning. A hash and not a copy of the source keeps the value small. The product neither reads nor computes it: it saves it and passes it back.
- `inactive` and `digests` are optional. A product that does not store `digests` still gets the stale warnings while the page is open, not after a reload. A translation with no digest counts as up to date, so existing data adopts the component as `{ language, texts }`.
- The digest is the FNV-1a hash self-onboarding uses, exported as `textDigest()` for a backend that wants to check it. Shopify's Translations API tracks staleness the same way: each registered translation carries a `translatableContentDigest` of the source, and `Translation.outdated` says the source changed since.
- A `undefined` model is an empty field: the first keystroke creates `{ language: primaryLanguage, texts: { … } }`.

## Public API

```ts
interface TranslationRequest {
	text: string
	from: string
	to: string[]
	/** true for "Update translations" and "Translate again": an answer the product cached is not wanted. */
	fresh: boolean
}
interface RefineRequest {
	text: string
	language: string
}
```

| Kind | Name | Notes |
| --- | --- | --- |
| model | `v-model` | `TranslatableText \| undefined` |
| model | `v-model:languages` | the organisation's languages; Manage writes it at once, the product persists it |
| prop | `primaryLanguage` | the language a new text starts in |
| prop | `availableLanguages` | every language Manage offers: each product passes its own, the layer ships no catalog |
| prop | `translate` | `(request: TranslationRequest) => Promise<Record<string, string>>`: a language missing from the answer failed, a throw fails them all |
| prop | `refine?` | `(request: RefineRequest) => Promise<string>`; no prop, no wand on the source |
| prop | `fallbackLanguage?` | always published, badge "Fallback", translated first; none by default |
| prop | `visibleLanguages?` | default 5 |
| prop | `debounce?` | typing pause before auto-translate, default 1000 ms |
| prop | `disabled?` | |
| prop | `sourceTextarea?`, `translationTextarea?` | `TextareaProps` (rows, placeholder, maxlength, `data-testid`…) |
| prop | `languageButton?`, `languageSwitch?` | applied to every chip / switch |
| prop | `manageButton?`, `retranslateButton?` | `boolean \| ButtonProps`, default on, `false` hides it |
| prop | `refineButton?`, `updateButton?`, `showMoreButton?` | `ButtonProps` |
| prop | `manage?` | `{ slideover?: SlideoverProps, searchInput?: InputProps, selectAll?: CheckboxProps, checkbox?: CheckboxProps, closeButton?: ButtonProps }` |
| prop | `confirm?` | `ConfirmOptions` of the stale modal (`confirmProps`, `cancelProps`, `modalProps`) |
| prop | `ui?` | slot classes, merged with `mergeSlot` like `SAlert` |
| slot | `#label="{ language, name, source }"` | the textarea label; default: the language name |
| expose | `pending`, `failed`, `retry()` | read-only, for a parent that waits before saving, as `UForm` exposes `errors` and `submit()` |

Language names come from `Intl.DisplayNames` in the current locale; flags are `circle-flags` icons from a language → country map in the utils, loaded from Iconify like the `ph:` icons already are (no local collection is installed, so no new dependency).

## Usage

### A field in a form

```vue
<script setup lang="ts">
import type { STranslatableTextProps, TranslatableText } from "#layers/smartness-nuxt-ui";

const { data: property } = await useFetch(`/api/properties/${id}`);
const { data: organization } = await useFetch("/api/organization");

const description = ref<TranslatableText | undefined>(property.value?.description);
const languages = ref(organization.value?.languages ?? []);

const translate: STranslatableTextProps["translate"] = (request) =>
	$fetch("/api/ai/translate", { method: "POST", body: request });

// Manage writes the organisation's languages at once: the product decides when to persist
watchDebounced(languages, (codes) => $fetch("/api/organization/languages", { method: "PUT", body: codes }), { debounce: 1000 });
</script>

<template>
	<SFormField label="Property description" help="Describe the property as guests will read it.">
		<STranslatableText
			v-model="description"
			v-model:languages="languages"
			:primary-language="organization.primaryLanguage"
			:available-languages="SUPPORTED_LANGUAGES"
			:translate="translate"
		/>
	</SFormField>
</template>
```

### Saving only once the translations are in

```vue
<script setup lang="ts">
const field = useTemplateRef("field");

async function save() {
	await $fetch(`/api/properties/${id}`, { method: "PATCH", body: { description: description.value } });
}
</script>

<template>
	<STranslatableText ref="field" v-model="description" ... />
	<UButton :loading="field?.pending" :disabled="!!field?.failed.length" @click="save">Save</UButton>
</template>
```

### Three texts on one page, one set of languages

```vue
<STranslatableText v-model="property.description" v-model:languages="languages" v-bind="services" />
<STranslatableText v-model="unit.description" v-model:languages="languages" v-bind="services" :manage-button="false" />
<STranslatableText v-model="unit.instructions" v-model:languages="languages" v-bind="services" :manage-button="false" />
```

`services` is `{ primaryLanguage, availableLanguages, translate, refine }` built once by the page.

### Refine, fallback, sub-components

```vue
<STranslatableText
	v-model="description"
	v-bind="services"
	:refine="(request) => $fetch('/api/ai/refine', { method: 'POST', body: request })"
	fallback-language="en"
	:retranslate-button="false"
	:source-textarea="{ rows: 6, maxlength: 2000, placeholder: 'Describe the property…' }"
	:update-button="{ size: 'sm' }"
/>
```

### Test ids

The layer adds none of its own. The call site names what its tests reach, and repeated nodes get `data-test-value="<language code>"` from the component:

```vue
<STranslatableText
	data-testid="property-description"
	:source-textarea="{ 'data-testid': 'property-description-source' }"
	:translation-textarea="{ 'data-testid': 'property-description-translation' }"
	:language-button="{ 'data-testid': 'property-description-language' }"
	:language-switch="{ 'data-testid': 'property-description-language-switch' }"
	:manage="{ slideover: { close: { 'data-testid': 'property-description-manage-close' } } }"
	:confirm="{ confirmProps: { 'data-testid': 'property-description-update-confirm' } }"
/>
```

```ts
page.getByTestId("property-description-language").and(page.locator("[data-test-value='de']"));
```

### On the guest side

```ts
import { publishedTexts } from "#layers/smartness-nuxt-ui";

publishedTexts(description, { languages, fallbackLanguage: "en" }); // { it: "Casa sul lago…", en: "Lake house…" }
```

## Pure rules (`app/utils/translatable-text.ts`)

Ported from self-onboarding's `guest-text.ts` onto the new model, without zod and without what belongs to one backend (batching, `TRANSLATION_LIMITS`, `textType`):

`textDigest`, `publishedLanguages`, `publishedTexts`, `missingLanguages`, `outdatedLanguages`, `staleLanguages` (outdated ∩ published), `withSource`, `withEditedTranslation`, `withLanguage`, `withTranslated` (keeps a hand edit made while the call was under way).

## Data flow

- Typing in the source → `update:modelValue`; after `debounce`, the missing languages (active or not) are translated; existing ones are left alone and become outdated → the stale icon on active chips, "Update translations with AI" under the source for all outdated ones.
- Switching on an outdated language → `useConfirm()` modal → on confirm, all outdated languages are translated again (`fresh: true`).
- Manage → `update:languages`; an added language starts active and is translated at once; an unchecked one leaves the organisation's list, its text stays in the model, not shown and not published.
- Refine → `refine()` replaces the source, "Re-written with AI" note, then the same path as typing.
- A hand-edited translation counts as made from the current source.

## Development steps

1. `types.ts` + `app/utils/translatable-text.ts`, re-exported from `runtime/index.ts`.
2. `useTranslatableText.ts`.
3. `STranslatableTextLanguages`, `STranslatableTextManage`, `STranslatableText`.
4. `sTranslatableText` locale block in the five languages.
5. Playground page with fake services: latency, failure toggle, refine.
6. Lint, typecheck, Snyk scan, browser check of every spec point on the playground; CLAUDE.md entry.
7. Later, in self-onboarding (own PR): replace `GuestTextField` and map its drafts to the new model; `translationMemory`, batching and `useGuestLanguages` stay there.

## Choices made without asking

- Name `STranslatableText`.
- Flags from `circle-flags` (Iconify, like `ph:`), not emoji: Windows shows emoji flags as two letters.
- AI notes are session state, not part of the model.
- `undefined` model = empty field.
- No test runner added to the layer; the pure rules are where tests would pay off.

## Decisions (round 2)

- The value model `{ language, texts, inactive?, digests? }` and the usage above, names as they are.
- Each product manages its own languages, so `availableLanguages` stays a required prop with no layer default.
