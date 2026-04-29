---
title: Slider
description: Single-value or range slider input, with min/max/step controls, value labels and disabled state.
category: form
prefix: S
componentName: Slider
showcaseSlug: slider
showcaseFile: Slider
tags: [slider, range, min, max, step, input]
subcomponents: []
---

# SSlider

`SSlider` provides a single-value or range slider input integrated with the Smartness color system.

## Quick example — single value

```vue
<SSlider v-model="value" :min="0" :max="100" :step="5" />
```

## Quick example — range

```vue
<SSlider
	v-model="range"
	:range="true"
	:min="0"
	:max="365"
	:step="1"
/>
```

## Notes

- Built on top of Reka UI primitives.
- Range mode requires `model-value` to be a `[number, number]` tuple.
