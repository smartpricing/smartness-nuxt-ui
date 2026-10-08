type Echarts = typeof import("echarts");

let echartsPromise: Promise<Echarts> | undefined;

/**
 * Loads echarts and its locales on first chart mount, shared by every SDataviz.
 * Keeps echarts out of the page chunks and, through the server guard, out of the server bundle.
 */
export function loadEcharts() {
	if (import.meta.server)
		throw new Error("echarts is browser-only");

	echartsPromise ??= Promise.all([
		import("echarts"),
		// @ts-expect-error missing types
		import("echarts/lib/i18n/langDE.js"),
		// @ts-expect-error missing types
		import("echarts/lib/i18n/langEN.js"),
		// @ts-expect-error missing types
		import("echarts/lib/i18n/langES.js"),
		// @ts-expect-error missing types
		import("echarts/lib/i18n/langIT.js")
	]).then(([echarts, de, en, es, it]) => {
		echarts.registerLocale("DE", de.default);
		echarts.registerLocale("EN", en.default);
		echarts.registerLocale("ES", es.default);
		echarts.registerLocale("IT", it.default);
		return echarts;
	});

	return echartsPromise;
}
