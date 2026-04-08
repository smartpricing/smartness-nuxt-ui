# Adding Locale Support to Smartness Components

This guide explains how to add multilanguage labels to Smartness components, following the same pattern used by `@nuxt/ui`.

For where **`SNavigationBarTop`** and the other navigation components fit in the layout (shell, headers, tabs), see [navigation.md](./navigation.md).

## How Nuxt UI Does It

Nuxt UI has a built-in locale system:
- `useLocale()` composable returns a `t(path, params?)` translator function
- `defineLocale()` creates typed locale objects
- `extendLocale()` merges custom messages into an existing locale
- All are publicly exported from `@nuxt/ui/composables`
- 60+ locale files exported from `@nuxt/ui/locale`

## Strategy for Smartness

Since this is a Nuxt Layer on top of `@nuxt/ui`, we **extend** the existing locale system rather than building a parallel one. This means:
- Smartness components use the same `t()` function and injection key as Nuxt UI
- Consumers who already set a Nuxt UI locale automatically get Smartness translations too
- We use `extendLocale()` to add our keys to existing Nuxt UI locale objects

## Step-by-Step: Adding locale to the top bar (CTA)

### 1. Define the Messages Type

Create `app/types/locale.ts`:

```ts
import type { Messages as NuxtUIMessages } from "@nuxt/ui";

// Smartness-specific message keys
export type SmartnessMessages = {
	sTopBar: {
		ctaLabel: string
	}
	// Add more component keys here as needed:
	// sMyComponent: { ... }
}

// Combined messages type (Nuxt UI + Smartness)
export type Messages = NuxtUIMessages & SmartnessMessages;
```

### 2. Create Locale Files

Create `app/locale/en.ts`:

```ts
import { extendLocale } from "@nuxt/ui/composables";
import { en } from "@nuxt/ui/locale";
import type { SmartnessMessages } from "../types/locale";

export default extendLocale<SmartnessMessages>(en, {
	messages: {
		sTopBar: {
			ctaLabel: "Unlock full potential"
		}
	}
});
```

Create `app/locale/it.ts`:

```ts
import { extendLocale } from "@nuxt/ui/composables";
import { it } from "@nuxt/ui/locale";
import type { SmartnessMessages } from "../types/locale";

export default extendLocale<SmartnessMessages>(it, {
	messages: {
		sTopBar: {
			ctaLabel: "Sblocca il pieno potenziale"
		}
	}
});
```

Create `app/locale/de.ts`:

```ts
import { extendLocale } from "@nuxt/ui/composables";
import { de } from "@nuxt/ui/locale";
import type { SmartnessMessages } from "../types/locale";

export default extendLocale<SmartnessMessages>(de, {
	messages: {
		sTopBar: {
			ctaLabel: "Volles Potenzial freischalten"
		}
	}
});
```

Create `app/locale/es.ts`:

```ts
import { extendLocale } from "@nuxt/ui/composables";
import { es } from "@nuxt/ui/locale";
import type { SmartnessMessages } from "../types/locale";

export default extendLocale<SmartnessMessages>(es, {
	messages: {
		sTopBar: {
			ctaLabel: "Desbloquea todo el potencial"
		}
	}
});
```

Create `app/locale/index.ts` to re-export all locales:

```ts
export { default as en } from "./en";
export { default as it } from "./it";
export { default as de } from "./de";
export { default as es } from "./es";
```

### 3. Use `t()` in the Component

In `app/components/Navigation/SNavigationBarTop.vue`, replace the hardcoded label in `ctaResolvedProps`:

```vue
<script setup lang="ts">
import { useLocale } from "@nuxt/ui/composables";

const { t } = useLocale();

const ctaResolvedProps = computed<ButtonProps>(() => {
	return {
		color: "lemon",
		variant: "solid",
		label: t("sTopBar.ctaLabel"),   // <-- was "Unlock full potential"
		icon: "ph:rocket-launch-bold",
		size: "md",
		...cta
	};
});
</script>
```

The `t()` function:
- Takes a dot-path: `t("sTopBar.ctaLabel")`
- Supports `{key}` interpolation: `t("sTopBar.greeting", { name: "John" })` → `"Hello John"`
- Falls back to the path string if the key is missing

### 4. Provide the Locale to the App

The consuming app must provide the extended locale. In the consuming app's `app.vue` or a plugin:

```vue
<script setup lang="ts">
import { localeContextInjectionKey } from "@nuxt/ui/composables";
import { en } from "smartness-nuxt-ui/app/locale";  // or via the layer alias

provide(localeContextInjectionKey, ref(en));
</script>
```

Or if the layer wants to provide a default, create a Nuxt plugin at `app/plugins/locale.ts`:

```ts
import { localeContextInjectionKey } from "@nuxt/ui/composables";
import { en } from "../locale";

export default defineNuxtPlugin((nuxtApp) => {
	nuxtApp.vueApp.provide(localeContextInjectionKey, ref(en));
});
```

### 5. Re-export for Layer Consumers

Add to `runtime/index.ts`:

```ts
export * from "../app/locale";
export type { SmartnessMessages } from "../app/types/locale";
```

## Adding More Components

When adding locale support to a new component:

1. **Add keys** to `SmartnessMessages` in `app/types/locale.ts`
2. **Add translations** to each file in `app/locale/` (en, it, de, es)
3. **Use `t()`** in the component via `const { t } = useLocale()`

## Reference: Key Imports

| What                          | Import from                  |
| ----------------------------- | ---------------------------- |
| `useLocale`                   | `@nuxt/ui/composables`      |
| `defineLocale`                | `@nuxt/ui/composables`      |
| `extendLocale`                | `@nuxt/ui/composables`      |
| `localeContextInjectionKey`   | `@nuxt/ui/composables`      |
| Nuxt UI locale objects        | `@nuxt/ui/locale`           |
| `Messages` (Nuxt UI type)    | `@nuxt/ui`                  |
| `Locale`, `Direction` (types) | `@nuxt/ui`                  |

## How `t()` Works Internally

```
t("sTopBar.ctaLabel")
  → translate("sTopBar.ctaLabel", undefined, locale)
    → get(locale, "messages.sTopBar.ctaLabel")  // dot-path resolution
    → "Unlock full potential"                     // from en locale
```

With interpolation:
```
t("sTopBar.greeting", { name: "John" })
  → "Hello {name}".replace(/\{(\w+)\}/g, ...) → "Hello John"
```
