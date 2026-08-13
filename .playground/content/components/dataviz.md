---
title: Dataviz
description: Smartness data visualization system built on ECharts v6 — declarative chart container with composable serie children for bar, line, area, pie, scatter, funnel.
category: dataviz
prefix: S
componentName: Dataviz
showcaseSlug: dataviz
showcaseFile: Dataviz
tags: [chart, echarts, dataviz, bar, line, area, pie, scatter, funnel, tooltip, legend]
subcomponents:
  - SDatavizArea
  - SDatavizBar
  - SDatavizFunnel
  - SDatavizLine
  - SDatavizPie
  - SDatavizScatter
  - SDatavizTooltip
---

# SDataviz

`SDataviz` is the chart container. Children components register themselves as series via inject/provide using the keys `DATAVIZ_UPSERT_SERIE` / `DATAVIZ_REMOVE_SERIE`.

## Quick example — line chart

```vue
<SDataviz title="Revenue" :loading="loading">
	<SDatavizLine
		name="2025"
		:data="revenue2025"
		smooth
	/>
	<SDatavizLine
		name="2024"
		:data="revenue2024"
		dashed
	/>
</SDataviz>
```

## Subcomponents

- **`SDatavizBar`** — bar series, configurable bar widths and gaps.
- **`SDatavizLine`** — line series with smooth curves, mark points/lines.
- **`SDatavizArea`** — area chart with optional `min`/`max` range data points.
- **`SDatavizPie`** — pie series with per-slice color.
- **`SDatavizScatter`** — scatter plot series.
- **`SDatavizFunnel`** — funnel chart series.
- **`SDatavizTooltip`** — custom tooltip renderer.

## Data point types

```ts
type DataPoint = { x: string | number, y: number | null };
type AreaDataPoint = { x: string | number, min: number, max: number };
type PieDataPoint = {
	name: string
	value: number
	id: string
	color?: string
	active?: boolean
	legendTooltip?: string
	showInLegend?: boolean
};
```

## Notes

- i18n built-in for `en`, `it`, `de`, `es` (legend strings, "no data", "loading").
- `legendTooltip` and `showInLegend: false` work on pie/funnel slices for fine-grained legend control.
- **Legend chips follow the Figma Chip, Dataviz variant** (6003-15915): a pill whose ring is
  secondary while the series is shown and neutral once it is toggled off. The chip's own colors are
  fixed — the series color appears only in the leading swatch, never in the ring or the background.
- **Gradients** — `SDatavizArea`'s `color` also takes a ZRender gradient object; coordinates are
  fractions of the band's bounding box, so `{ type: "linear", y: 0, y2: 1, colorStops: [...] }` fades
  top to bottom. The band's min/max edges take the gradient's **first stop** (a gradient across a 2px
  line would read as an arbitrary flat color), and the legend chip and tooltip marker paint the
  gradient itself. Line and bar series stay solid-color.
- **`borderWidth`** on `SDatavizArea` sizes the min/max edge lines (default `2`). `0` skips them
  entirely, which is usually what a gradient band wants — the fill fades out with no line stopping it.
- Default palette has 12 colors. Override per series with the `color` prop.
