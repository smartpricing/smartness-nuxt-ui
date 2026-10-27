---
title: UChart
description: Native Nuxt UI chart built on TanStack Charts — line, area, bar and donut rendered as SVG. Replaces SDataviz for new charts.
category: dataviz
prefix: U
componentName: Chart
showcaseSlug: charts
showcaseFile: Charts
tags: [chart, tanstack, dataviz, line, area, bar, donut, tooltip, legend]
subcomponents: []
---

# UChart

`UChart` is used as is, with no Smartness wrapper. Full API and examples: [ui.nuxt.com/docs/components/chart](https://ui.nuxt.com/docs/components/chart).

It supersedes [`SDataviz`](/components/dataviz), which stays available (with `echarts`) while existing usages migrate.

## Quick example

```vue
<UChart
	type="bar"
	:data="data"
	index="month"
	:categories="[{ key: 'direct', label: 'Direct' }, { key: 'booking', label: 'Booking.com' }]"
	:colors="['primary', 'secondary']"
	:format="(value) => currency.format(value)"
	aria-label="Revenue by channel"
/>
```

## Notes

- `@tanstack/charts` (optional peer of `@nuxt/ui`) is a dependency of the layer, consumers don't need to install it.
- `colors` accepts the layer theme colors (`primary`, `secondary`, `burgundy`, `lemon`…) or any CSS color. Without it the series use the `--ui-chart-1` … `--ui-chart-6` CSS variables.
- Set `aria-label` on every chart, it is the only accessible name when using `definition`.
