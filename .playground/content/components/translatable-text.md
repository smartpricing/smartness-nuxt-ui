---
title: Translatable text
description: A text written once and translated with AI into the languages a product manages — language switches, out-of-date warnings, Manage languages. The product passes translate in and persists the v-model.
category: form
prefix: S
componentName: TranslatableText
showcaseSlug: translatable-text
showcaseFile: TranslatableText
tags: [translation, i18n, languages, ai, description, textarea, multilingual]
---

# STranslatableText

A guest-facing text (a property description, guest instructions) written in the primary language and
translated into the languages the product manages. The component owns the UI and the translation
workflow: when to translate, what is under way, what failed, and how an answer lands without losing a
hand edit. It never calls an API: `translate` and `refine` are the product's.

No label or help props: compose `SFormField` around it.

## Usage

```vue
<script setup lang="ts">
import type { STranslatableTextProps, TranslatableText } from "#layers/smartness-nuxt-ui";

const description = ref<TranslatableText | undefined>(property.value?.description);
const languages = ref(organization.value.languages);

const translate: STranslatableTextProps["translate"] = (request) =>
	$fetch("/api/ai/translate", { method: "POST", body: request });

// Manage writes the organisation's languages at once: the product decides when to persist
watchDebounced(languages, (codes) => $fetch("/api/organization/languages", { method: "PUT", body: codes }), { debounce: 1000 });
</script>

<template>
	<SFormField label="Property description">
		<STranslatableText
			v-model="description"
			v-model:languages="languages"
			:primary-language="organization.primaryLanguage"
			:available-languages="SUPPORTED_LANGUAGES"
			:translate="translate"
		>
			<template #label="{ name }">
				{{ name }} description
			</template>
		</STranslatableText>
	</SFormField>
</template>
```

When the page switches to another item, key the component (`:key="item.id"`) so a translation still
under way does not land in the next item's text.

## The value

```json
{
	"language": "it",
	"texts": { "it": "Casa sul lago…", "en": "Lake house…", "de": "Haus am See…" },
	"inactive": ["de"],
	"digests": { "en": "9f1c2a7b", "de": "03aa41e0" }
}
```

- `texts`: what guests read, per language, the written text included.
- `inactive`: languages switched off on this text. Translated and kept, not shown to guests. Every language starts on.
- `digests`: per translation, a hash of the text it was made from. When the text changes the hash no longer
  matches and the translation is out of date (warning on the chip, "Update translations with AI").
  The product saves it and passes it back; without it, the warnings last only while the page is open.

`inactive` and `digests` are optional: existing data enters as `{ language, texts }`.

## Services

```ts
interface TranslationRequest { text: string, from: string, to: string[], fresh: boolean }
type TranslateFunction = (request: TranslationRequest) => Promise<Record<string, string>>;
type RefineFunction = (request: { text: string, language: string }) => Promise<string>;
```

- A language missing from the answer failed; a throw fails them all. Failures show an alert with "Try again".
- `fresh` is true for "Update translations" and "Translate again": an answer the product cached is not wanted.
- No `refine`, no wand on the source.

## Behaviour

- Typing in the source: after `debounce` the languages never translated are filled. Existing ones are not
  overwritten: they become out of date.
- Switching on an out-of-date language opens a confirm modal that updates every out-of-date translation.
- A hand-edited translation counts as made from the current text. A translation edited while its call is
  under way keeps the hand edit.
- Manage adds a language active and translates it at once; unchecking removes it from `v-model:languages`.
- After `visibleLanguages` the list folds behind "Show N more", which carries a warning when a hidden language is out of date.
- `fallbackLanguage`: always published, with a Fallback badge, and named in the hint of an inactive language.

## Waiting before saving

```vue
<script setup lang="ts">
const field = useTemplateRef("field");
</script>

<template>
	<STranslatableText ref="field" v-model="description" ... />
	<UButton :loading="!!field?.pending.length" :disabled="!!field?.failed.length" label="Save" @click="save" />
</template>
```

## Reading on the guest side

```ts
import { publishedTexts } from "#layers/smartness-nuxt-ui";

publishedTexts(description, { languages, fallbackLanguage: "en" }); // { it: "Casa sul lago…", en: "Lake house…" }
```

Also exported: `textDigest`, `translationLanguages`, `publishedLanguages`, `missingTranslations`,
`outdatedTranslations`, `staleTranslations`, `languageFlagIcon`.

## Test ids

The component adds none of its own. Every node is reachable through a prop object; repeated nodes (chip,
switch, Manage checkbox) get `data-test-value="<language code>"`.

```vue
<STranslatableText
	data-testid="property-description"
	:source-textarea="{ 'data-testid': 'property-description-source' }"
	:translation-textarea="{ 'data-testid': 'property-description-translation' }"
	:language-button="{ 'data-testid': 'property-description-language' }"
	:language-switch="{ 'data-testid': 'property-description-language-switch' }"
	:manage="{ checkbox: { 'data-testid': 'property-description-manage-language' }, slideover: { close: { 'data-testid': 'property-description-manage-x' } } }"
	:confirm="{ confirmProps: { 'data-testid': 'property-description-update-confirm' } }"
/>
```

```ts
page.getByTestId("property-description-language").and(page.locator("[data-test-value='de']"));
```
