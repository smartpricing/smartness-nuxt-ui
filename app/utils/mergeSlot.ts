import type { SlotClass } from "#ui/types";

/**
 * Merge a component's default classes with a consumer `ui` slot override
 * before forwarding to a Nuxt UI component, which resolves conflicts via
 * tailwind-merge (consumer classes win). A function value is a
 * `SlotClassReplacer`: it is forwarded untouched so it replaces the defaults.
 */
export function mergeSlot(defaults: string | undefined, value?: SlotClass): SlotClass {
	return typeof value === "function" ? value : [defaults, value];
}
