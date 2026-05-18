import type { MaybeComputedElementRef } from "@vueuse/core";

/**
 * Caps a table's height to the space left in the viewport so the header can
 * stay sticky while only the body scrolls.
 *
 * Pair with `<UTable sticky :style="{ maxHeight }">` and point `target` at the
 * table's wrapper element. `bottomOffset` reserves room for whatever sits below
 * the table (pagination footer, action bars) — default `5rem`.
 *
 * The result is clamped to `minHeight` (default `112px`, two 56px rows) so the
 * table never collapses to 0 when its wrapper is scrolled out of the viewport
 * and `top` becomes negative.
 *
 *   const wrapper = useTemplateRef("wrapper");
 *   const { maxHeight } = useTableHeight(wrapper);
 */
export const useTableHeight = (
	target: MaybeComputedElementRef,
	options: { bottomOffset?: string, minHeight?: string } = {}
) => {
	const { bottomOffset = "5rem", minHeight = "112px" } = options;
	const { top } = useElementBounding(target, { windowScroll: false });
	const maxHeight = computed(() => `max(${minHeight}, calc(100dvh - ${top.value}px - ${bottomOffset}))`);

	return { maxHeight };
};
