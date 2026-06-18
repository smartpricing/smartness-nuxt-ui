import type { MaybeRefOrGetter } from "vue";
import { toValue } from "vue";

interface TableComponentRefBase {
	$el?: HTMLElement
}

function isHTMLElement(value: unknown): value is HTMLElement {
	return typeof HTMLElement !== "undefined" && value instanceof HTMLElement;
}

/**
 * Tracks the scroll state needed by sticky pinned columns.
 *
 * Pass the same ref used on `UTable`. The composable toggles scroll-state
 * classes used by the global table config so pinned-column shadows render only
 * on the side that still has hidden content.
 */
export function useStickyTableColumns<T extends TableComponentRefBase = TableComponentRefBase>(
	tableRef: MaybeRefOrGetter<T | HTMLElement | null | undefined>,
	...sources: MaybeRefOrGetter<unknown>[]
) {
	const isScrolledHorizontally = ref(false);
	const isScrolledLeft = ref(false);
	const isScrolledRight = ref(false);

	function getScrollElement() {
		const target = toValue(tableRef);
		if (!target) return null;

		if (isHTMLElement(target)) {
			return target;
		}

		return target.$el ?? null;
	}

	function setScrollClasses(el: HTMLElement | null, canScrollLeft: boolean, canScrollRight: boolean) {
		if (!el) return;

		const table = el.matches("table") ? el : el.querySelector("table");
		for (const target of [el, table]) {
			target?.classList.toggle("is-scrolled-left", canScrollLeft);
			target?.classList.toggle("is-scrolled-right", canScrollRight);
			target?.classList.toggle("is-scrolled-x", canScrollLeft || canScrollRight);
		}
	}

	function updateScrollState() {
		const el = getScrollElement();
		const maxScrollLeft = el ? el.scrollWidth - el.clientWidth : 0;
		const canScrollLeft = !!el && el.scrollLeft > 1;
		const canScrollRight = !!el && maxScrollLeft - el.scrollLeft > 1;

		isScrolledLeft.value = canScrollLeft;
		isScrolledRight.value = canScrollRight;
		isScrolledHorizontally.value = canScrollLeft || canScrollRight;
		setScrollClasses(el, canScrollLeft, canScrollRight);
	}

	const scrollRoot = computed(() => getScrollElement());
	useResizeObserver(scrollRoot, updateScrollState);
	useEventListener(scrollRoot, "scroll", updateScrollState, { passive: true });

	watch(
		() => sources.map((source) => toValue(source)),
		() => nextTick(updateScrollState),
		{ deep: true, flush: "post" }
	);

	onMounted(() => nextTick(updateScrollState));

	return {
		isScrolledHorizontally,
		isScrolledLeft,
		isScrolledRight,
		updateScrollState
	};
}
