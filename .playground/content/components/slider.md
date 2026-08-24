---
title: Slider
description: Single value or range slider with hover-only thumb tooltip — SSliderField adds the form field and editable value inputs, SSlider is the bare track.
category: form
prefix: S
componentName: Slider
showcaseSlug: slider
showcaseFile: Slider
tags: [slider, range, min, max, step, input, tooltip, formatter, filter]
subcomponents:
  - SSliderField
---

# SSliderField

The one to reach for. It wraps `SSlider` in an `SFormField` and puts the value in the label row —
as editable inputs, or as text when `readonly`. Label, description, help and error come from the field.

## Single value

```vue
<SSliderField
	v-model="distance"
	label="Distance"
	help="Help! I need somebody!"
	:min="0"
	:max="200"
	:format="(v) => `${v} Km`"
	trailing="Km"
/>
```

`format` puts the unit in the tooltip and the min/max labels (`0 Km` … `200 Km`);
`trailing` puts it in the input as a non-editable affix, next to a plain `100`.

## Range

An array `v-model` turns on range mode: one thumb and one input per entry, with `from` / `to` labels.

```vue
<SSliderField
	v-model="spread"
	label="Spread"
	:min="-3"
	:max="3"
	:step="0.25"
	:format="(v) => `${v > 0 ? '+' : ''}${v} %`"
	:input-format="(v) => `${v > 0 ? '+' : ''}${v}`"
	trailing="%"
/>
```

## Currency

Labels can be as rich as `Intl.NumberFormat` allows; the inputs stay numeric and
take the currency from an affix, so what the user types still parses back.

```vue
<SSliderField
	v-model="budget"
	label="Budget"
	:min="0"
	:max="2000"
	:step="50"
	:format="(v) => eur.format(v)"
	leading="€"
/>
```

## Notes

- **Tooltip** appears only while a thumb is hovered (and while it is dragged). Turn it off with `:tooltip="false"`.
- **Two formatters, by role** — `format` drives the tooltip and the min/max labels, which are read-only and can be as rich as you like. `inputFormat` drives the value inputs, which are editors: their text has to survive a round trip through `parse`, so it defaults to the bare number. Supply `parse` when `inputFormat` groups thousands or uses another notation.
- **Units** — `leading` / `trailing` are **input-only**: a non-editable affix beside the value, so the text the user edits stays a plain number. The tooltip and the labels take their unit from `format`, which is free to place it wherever the locale wants. Override the affix on one side with `inputs.left.trailing` (`''` removes it).
- **Inputs** commit on every keystroke, clamped to `[min, max]`, to the step grid and to the neighbouring thumb.
- **Readonly** (`readonly`) renders the value as text in the label row, unlike `disabled`.
- **Value inputs** accept any `UInput` prop, plus `leading` / `trailing` to override the slider-wide affixes on one side only (`trailing: ''` removes it). They can also be replaced entirely with the `#input-left` / `#input-right` slots (`{ value, formatted, disabled, readonly, setValue }`).

# SSlider

The bare track: `USlider` with the Smartness design tokens, the formatted hover tooltip and the
min/max labels. No form field, no value inputs. Use it where there is no label row — filter panels,
popovers, toolbars — or inside a form field you are composing yourself.

```vue
<SSlider
	v-model="filterPrice"
	:min="0"
	:max="2000"
	:step="50"
	:format="(v) => eur.format(v)"
/>
```

It accepts `min`, `max`, `step`, `disabled`, `color`, `name`, `minStepsBetweenThumbs`, `tooltip`,
`format`, `minLabel`, `maxLabel` and `ui`. It deliberately does **not** accept `label`,
`description`, `help`, `error`, `hint`, `required` or `readonly` — those belong to `SSliderField`,
and passing one here logs a dev-mode warning saying so.

Editing by keyboard lives with the inputs, so `inputFormat`, `parse`, `leading`, `trailing`,
`inputs` and `inputWidth` are `SSliderField` props too. Dragging is snapped and clamped by
`USlider` itself, which is why the bare track carries no value maths at all.

---

`SSliderOld` remains available during the migration — see [Slider (old)](/components/slider-old).
