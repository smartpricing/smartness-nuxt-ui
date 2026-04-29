---
title: TruncatedText
description: Text container that truncates overflowing content with an ellipsis and shows the full text inside a tooltip on hover.
category: typography
prefix: S
componentName: TruncatedText
showcaseSlug: truncated-text
showcaseFile: TruncatedText
tags: [text, truncate, ellipsis, tooltip, overflow]
subcomponents: []
---

# STruncatedText

`STruncatedText` truncates overflowing text with an ellipsis and reveals the full content in a `UTooltip` on hover. Detects overflow on resize so it works inside flex/grid layouts.

## Quick example

```vue
<STruncatedText :text="title" class="max-w-[200px]" />
```

## With multi-line clamp

```vue
<STruncatedText
	:text="description"
	:lines="3"
	class="max-w-prose"
/>
```

## Notes

- The tooltip is shown only when truncation actually occurs (the component measures overflow).
- For multi-line clamp, `-webkit-line-clamp` is applied with the `lines` prop.
