---
title: Slider (old)
description: Deprecated slider — kept while consumers migrate to SSliderField.
category: form
prefix: S
componentName: SliderOld
showcaseSlug: slider-old
showcaseFile: SliderOld
tags: [slider, range, min, max, step, input, deprecated]
subcomponents: []
---

# SSliderOld

**Deprecated** — use [`SSliderField`](/components/slider), or [`SSlider`](/components/slider) if you do not need a label row. `SSliderOld` is the previous slider, kept unchanged so existing consumers keep working during the migration.

`SSliderOld` carries its own label and value inputs, so the like-for-like replacement is `SSliderField`. `SSlider` is the bare track only.

## Quick example — single value

```vue
<SSliderOld v-model="value" :min="0" :max="100" :step="5" />
```

## Quick example — range

```vue
<SSliderOld
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
