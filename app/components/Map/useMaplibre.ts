type Maplibre = typeof import("maplibre-gl");

let maplibrePromise: Promise<Maplibre> | undefined;
let maplibre: Maplibre | undefined;

/**
 * Loads maplibre-gl when the first SMap mounts, shared by every map.
 * Keeps maplibre out of the page chunks and, through the server guard, out of the server bundle.
 */
export function loadMaplibre() {
	if (import.meta.server)
		throw new Error("maplibre-gl is browser-only");

	maplibrePromise ??= import("maplibre-gl").then((module) => {
		maplibre = module;
		return module;
	});

	return maplibrePromise;
}

/**
 * The module SMap already loaded: map children only render once SMap has a map instance.
 */
export function loadedMaplibre() {
	if (!maplibre)
		throw new Error("maplibre-gl is not loaded: map components must render inside SMap");

	return maplibre;
}
