---
title: Map
description: MapLibre GL wrapper with declarative children for layers, clusters, markers, popups, routes, and built-in controls.
category: data
prefix: S
componentName: Map
showcaseSlug: map
showcaseFile: Map
tags: [map, maplibre, geo, marker, cluster, route, layer, popup]
subcomponents:
  - SMapClusterLayer
  - SMapControls
  - SMapLayer
  - SMapMarker
  - SMapPopup
  - SMapRoute
---

# SMap

`SMap` is a Vue wrapper around `maplibre-gl`. Children mount themselves as map sources/layers when the underlying map is ready.

## Quick example

```vue
<SMap
	:center="[12.5, 41.9]"
	:zoom="6"
	style="--ui-map-height: 480px"
>
	<SMapControls />
	<SMapMarker
		v-for="m in markers"
		:key="m.id"
		:longitude="m.lng"
		:latitude="m.lat"
		:color="m.color"
	/>
</SMap>
```

## Subcomponents

- **`SMapMarker`** — pin a single point.
- **`SMapClusterLayer`** — cluster many points with adaptive zoom rules.
- **`SMapLayer`** — register a custom MapLibre layer (heatmap/fill/line).
- **`SMapPopup`** — anchored popup attached to a marker or a coordinate.
- **`SMapRoute`** — render a polyline from an ordered list of coordinates.
- **`SMapControls`** — zoom + compass + scale controls bundle.

## Notes

- **Scrolling the page over a map scrolls the page** (`cooperativeGestures`, on by default): the map zooms with Ctrl/⌘ + scroll and says so, in the map's `locale`, when the plain gesture is tried. With the mouse, dragging the map, its markers and the zoom buttons work as before; on touch screens one finger scrolls the page, two move the map, and a draggable marker is still dragged with one. Set `:cooperative-gestures="false"` where the map is the whole page.
- **A draggable marker shows the pointing hand** on hover, not the map's grab hand, so it reads as something to drag.

- Requires `maplibre-gl` as a peer dependency in the consumer project (`pnpm add maplibre-gl`).
- The `LazyMap.vue` utility in the playground is an example wrapper that defers mounting until the map container is in viewport.
