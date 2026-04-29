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
- Default palette has 12 colors. Override per series with the `color` prop.
