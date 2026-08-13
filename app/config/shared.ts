/**
 * Smartness disabled treatment for form fields (input, select, select menu, …).
 *
 * Nuxt UI signals `disabled` by lowering opacity; the Smartness design system
 * instead greys the control out with a flat surface. These classes must be
 * appended to the theme's `variants.variant` entry — NOT to `slots.base` —
 * because Nuxt UI sets `disabled:bg-default` / `disabled:bg-elevated` there and
 * variant classes are emitted after base ones, so a `slots.base` override loses.
 */
export const DISABLED_FIELD = "disabled:bg-primary-50 disabled:text-muted disabled:opacity-100";

/**
 * The `ghost` variant additionally carries `dark:disabled:bg-transparent`, which
 * tailwind-merge keeps alongside the unprefixed override — so it needs its own pair.
 */
export const DISABLED_FIELD_GHOST = `${DISABLED_FIELD} dark:disabled:bg-primary-50`;
