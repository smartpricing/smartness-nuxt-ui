---
title: Locale integration with @nuxtjs/i18n
description: How to wire Smartness UI locales together with `@nuxtjs/i18n` in a consumer Nuxt project so the active language is reactive and a language-switcher dropdown is straightforward to build.
section: i18n
tags: [i18n, locale, nuxt-i18n, UApp, language-switcher, dropdown, useI18n]
---

# Locale integration with @nuxtjs/i18n

The Smartness UI layer ships **5 locales** (`en`, `it`, `de`, `es`, `fr`) that extend Nuxt UI's locale objects with the layer-specific keys (`sStepper.*`, `sNavigationBarTop.*`, ecc.).

The integration that works in real consumer projects (paired with `@nuxtjs/i18n`) is the one documented below. It supersedes the manual `provide(localeContextInjectionKey, ref(en))` pattern shown in the older `docs/locale-guide.md` of the layer.

## Pre-requisites

In the consumer Nuxt project:

```ts
// nuxt.config.ts
export default defineNuxtConfig({
	extends: [["github:smartpricing/smartness-nuxt-ui#vX.Y.Z", { install: true }]],
	modules: ["@nuxtjs/i18n"],
	i18n: {
		locales: [
			{ code: "en", name: "English" },
			{ code: "it", name: "Italiano" },
			{ code: "de", name: "Deutsch" },
			{ code: "es", name: "Español" },
			{ code: "fr", name: "Français" }
		],
		defaultLocale: "it"
	}
});
```

## Wiring `<UApp>`

In `app.vue`, pass the matching Smartness locale object to `UApp` reactively. The layer aliases `#smartness/locale` so consumers can import every locale at once:

```vue
<template>
	<UApp
		:tooltip="{ delayDuration: 0 }"
		:locale="locales[locale]"
	>
		<NuxtLayout>
			<NuxtPage />
		</NuxtLayout>
	</UApp>
</template>

<script setup lang="ts">
	import * as locales from "#smartness/locale";

	const { locale } = useI18n();
</script>
```

`locales[locale]` resolves at render time to the matching extended locale (e.g. `locales.it`), so when `useI18n` switches the active locale, `UApp` re-renders with the right translations for both Nuxt UI keys and Smartness keys.

## Language-switcher dropdown

Build a `UDropdownMenu` (or `SMoreActions`) trigger from the i18n locale list:

```vue
<script setup lang="ts">
	const { t, setLocale, locales: i18nLocales, locale } = useI18n();

	const items = computed(() => [{
		label: t("main.navbar.language"),
		icon: "ph:globe-simple",
		children: i18nLocales.value.map((loc) => ({
			label: loc.name,
			type: "checkbox" as const,
			checked: loc.code === locale.value,
			onSelect: () => { setLocale(loc.code); }
		}))
	}]);
</script>

<template>
	<UDropdownMenu :items="items" />
</template>
```

## Adding new translation keys

When adding locale support to a new component in the layer:

1. Extend the type in `app/types/locale.ts` (`SmartnessMessages`).
2. Add translations to each file under `app/locale/<code>.ts` (use `extendSmartnessLocale(base, messages)`).
3. Use `useLocale()` from `@nuxt/ui/composables` inside the component:

```ts
import { useLocale } from "@nuxt/ui/composables";
const { t } = useLocale();
// t("sNewComponent.label")
```

The `_extend.ts` helper merges the Smartness keys onto the base Nuxt UI locale via `extendLocale`, so consumers do not need to do anything special — they get both sets of keys for free as soon as they pass `locales[locale]` to `UApp`.

## Notes

- Do **not** call `provide(localeContextInjectionKey, …)` manually when you have `@nuxtjs/i18n` in the picture — `UApp :locale` already handles the injection.
- The 5 locales are kept in sync; if you add a key to `SmartnessMessages`, add the translation to all five files.
- Module package: `@nuxtjs/i18n` v9+ provides the `useI18n()` composable shape used above.
