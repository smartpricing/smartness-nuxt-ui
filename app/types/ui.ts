import type { AppConfigInput } from "@nuxt/schema";

/**
 * Shape of the `ui` block accepted by `defineAppConfig`.
 *
 * Uses `AppConfigInput` — augmented statically by Nuxt UI from `#build/ui` —
 * instead of `AppConfig`, which Nuxt derives from app.config.ts's own default
 * export. Referencing `AppConfig` inside a file imported by app.config.ts
 * creates a circular type ("'default' implicitly has type 'any'").
 *
 * Index it per component to type each split config file, e.g.:
 *   export default { ... } satisfies UIConfig["colors"];
 *   export default { ... } satisfies UIConfig["badge"];
 */
export type UIConfig = NonNullable<AppConfigInput["ui"]>;
