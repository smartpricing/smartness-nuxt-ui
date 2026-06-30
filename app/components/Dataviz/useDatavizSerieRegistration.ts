import type { DatavizSerieRegistration } from "./types";
import { inject, onUnmounted } from "vue";
import { DATAVIZ_SERIE_REGISTRY } from "./types";

export function useDatavizSerieRegistration(registration: DatavizSerieRegistration) {
	const registry = inject(DATAVIZ_SERIE_REGISTRY);

	if (!registry) {
		if (import.meta.dev) {
			console.warn("[SDataviz] Serie components must be rendered inside SDataviz.");
		}
		return;
	}

	const unregister = registry.registerSerie(registration);

	onUnmounted(() => {
		unregister();
	});
}
