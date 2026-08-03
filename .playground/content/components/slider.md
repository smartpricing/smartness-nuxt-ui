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
	trailing="Km"
	inputs
/>
```

`format` puts the unit in the tooltip and the from/to labels (`0 Km` … `200 Km`);
`trailing` puts it in the input as a non-editable affix, next to a plain `100`.

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
	:input-format="(v) => `${v > 0 ? '+' : ''}${v}`"
	trailing="%"
	inputs
/>
```

## Currency

Labels can be as rich as `Intl.NumberFormat` allows; the inputs stay numeric and
take the currency from an affix, so what the user types still parses back.

```vue
<SSlider
	v-model="budget"
	:min="0"
	:max="2000"
	:step="50"
	limits
	:format="(v) => eur.format(v)"
	leading="€"
	inputs
/>
```

## Notes

- **Tooltip** appears only while a thumb is hovered (and while it is dragged). Turn it off with `:tooltip="false"`.
- **Two formatters, by role** — `format` drives the tooltip and the from/to labels, which are read-only and can be as rich as you like. `inputFormat` drives the side inputs, which are editors: their text has to survive a round trip through `parse`, so it defaults to the bare number. Supply `parse` when `inputFormat` groups thousands or uses another notation.
- **Units** — `leading` / `trailing` are **input-only**: a non-editable affix beside the value, so the text the user edits stays a plain number. The tooltip and the labels take their unit from `format`, which is free to place it wherever the locale wants. Override the affix on one side with `inputs.left.trailing` (`''` removes it).
- **Inputs** commit on every keystroke, clamped to `[min, max]`, to the step grid and to the neighbouring thumb.
- **Readonly** (`readonly`) keeps the input value selectable, unlike `disabled`.
- **Side inputs** accept any `UInput` prop, plus `leading` / `trailing` to override the slider-wide affixes on one side only (`trailing: ''` removes it). They can also be replaced entirely with the `#input-left` / `#input-right` slots (`{ value, formatted, disabled, readonly, setValue }`).

`SSliderOld` remains available during the migration — see [Slider (old)](/components/slider-old).
