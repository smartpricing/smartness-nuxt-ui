---
title: useComponentRenderToHTML
description: Render a Vue component to a static HTML string — useful for ECharts custom tooltips, PDF generation, and any place that takes raw HTML.
name: useComponentRenderToHTML
tags: [render, html, ssr, echarts, tooltip, server-render]
---

# useComponentRenderToHTML

Renders a Vue component (with its props/slots) to a plain HTML string. The component is mounted on a detached element, snapshotted, and unmounted — so it never appears in the DOM.

## Quick example — ECharts tooltip

```ts
import { useComponentRenderToHTML } from "#imports";
import SDatavizTooltip from "#components/Dataviz/SDatavizTooltip.vue";

const { renderToHTML } = useComponentRenderToHTML();

const tooltipFormatter = (params) =>
	renderToHTML(SDatavizTooltip, {
		title: params.name,
		series: params.value
	});
```

## Notes

- Returns a string of the component's outerHTML.
- Reactive props are not tracked — call again to update.
- Server-side: works in Nuxt SSR too, although the typical use case is client-side rendering of HTML to feed to non-Vue libraries (ECharts, MapLibre popups).
