import type { UseBreakpointsOptions } from "@vueuse/core";
import { breakpointsTailwind, useBreakpoints } from "@vueuse/core";

/**
 * Reactive viewport size, with Tailwind's breakpoints as the single source of
 * truth (`sm` 640, `md` 768, `lg` 1024, `xl` 1280, `2xl` 1536 — the layer does
 * not override `--breakpoint-*`, so these match the CSS utilities exactly).
 *
 *   const { isMobile, isDesktop } = useViewport();
 *
 * The three flags split the scale at the same points as the `md` and `lg`
 * utility prefixes:
 *
 *   isMobile   < md    (< 768px)
 *   isTablet   md–lg   (768px – 1023px)
 *   isDesktop  >= lg   (>= 1024px)
 *
 * For any other threshold use the raw `breakpoints` object rather than
 * hardcoding a media query — it exposes VueUse's full API
 * (`smaller`, `smallerOrEqual`, `greater`, `greaterOrEqual`, `between`,
 * `active()`, plus a ref per breakpoint name):
 *
 *   const { breakpoints } = useViewport();
 *   const isNarrow = breakpoints.smaller("sm");
 *
 * Under SSR every query resolves to `false` until the client hydrates, so the
 * first paint is the "no flag set" state. Pass `ssrWidth` (or call VueUse's
 * `provideSSRWidth` once at app level) to render a specific width on the
 * server instead.
 */
export const useViewport = (options: UseBreakpointsOptions = {}) => {
	const breakpoints = useBreakpoints(breakpointsTailwind, options);

	return {
		breakpoints,
		isMobile: breakpoints.smaller("md"),
		isTablet: breakpoints.between("md", "lg"),
		isDesktop: breakpoints.greaterOrEqual("lg")
	};
};
