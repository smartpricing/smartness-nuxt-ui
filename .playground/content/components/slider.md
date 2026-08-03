---
title: Slider
description: Single value or range slider with hover-only thumb tooltip, optional side inputs and optional from/to labels.
category: form
prefix: S
componentName: Slider
showcaseSlug: slider
showcaseFile: Slider
tags: [slider, range, min, max, step, input, tooltip, formatter]
subcomponents: []
---

# SSlider

`SSlider` wraps `USlider` with the Smartness design tokens and adds a formatted hover tooltip, optional side inputs and optional from/to labels.

## Single value

```vue
<SSlider
	v-model="distance"
	:min="0"
	:max="200"
	limits
	:format="(v) => `${v} Km`"
	:inputs="{ right: { trailing: 'Km' } }"
/>
```

## Range

An array `v-model` turns on range mode. `:inputs="true"` puts one input on each side.

```vue
<SSlider
	v-model="spread"
	:min="-3"
	:max="3"
	:step="0.25"
	limits
	:format="(v) => `${v > 0 ? '+' : ''}${v}%`"
	:inputs="true"
/>
```

## Notes

- **Tooltip** appears only while a thumb is hovered (and while it is dragged). Turn it off with `:tooltip="false"`.
- **Formatter** — `format` drives the tooltip, the side inputs and the from/to labels, so units and explicit `+`/`-` signs are defined in one place. Typing in an input is parsed back with `parse` (default: strips everything except digits, sign and decimal separator).
- **Inputs** commit on every keystroke, clamped to `[min, max]`, to the step grid and to the neighbouring thumb.
- **Readonly** (`readonly`) keeps the input value selectable, unlike `disabled`.
- **Side inputs** accept any `UInput` prop plus `leading` / `trailing` text affixes, or can be replaced entirely with the `#input-left` / `#input-right` slots (`{ value, formatted, disabled, readonly, setValue }`).

`SSliderOld` remains available during the migration — see [Slider (old)](/components/slider-old).
