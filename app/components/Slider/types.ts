import type { FormFieldProps, InputProps, SliderProps, TooltipProps } from "@nuxt/ui";

// ---------------------------------------------------------------------------
// SSlider (pure) — the track on its own, no form field
// ---------------------------------------------------------------------------

/**
 * Everything the bare track needs. Deliberately free of form-field props: a
 * slider used as a filter has no label row, and the composed `SSliderField`
 * owns that concern instead.
 */
export interface SSliderProps {
	min?: number
	max?: number
	step?: number
	disabled?: boolean
	color?: SliderProps["color"]
	minStepsBetweenThumbs?: number
	/** Tooltip above the hovered/dragged thumb. */
	tooltip?: boolean
	/**
	 * Display formatter for the tooltip and the min/max labels — read-only
	 * surfaces, so anything goes: `Intl.NumberFormat`, currencies, words.
	 */
	format?: (value: number) => string
	minLabel?: string
	maxLabel?: string
	/** Names the native slider input, and matches form errors on `SSliderField`. */
	name?: string
	ui?: {
		track?: string
		tooltip?: string
		limits?: string
		slider?: SliderProps["ui"]
	}
}

// ---------------------------------------------------------------------------
// SSliderField (composed) — slider inside a form field, with value inputs
// ---------------------------------------------------------------------------

/**
 * The pure slider plus the label row: form-field passthrough, and the editable
 * value inputs that live in its hint slot. All value parsing lives here — the
 * pure slider never edits by keyboard, so it needs none of it.
 */
export interface SSliderFieldProps extends Omit<SSliderProps, "ui"> {
	/**
	 * Text inside the value inputs. Deliberately independent of `format`: an input is an
	 * editor, so its text has to survive a round trip through `parse`. Defaults to the
	 * bare number, with any unit supplied by `leading` / `trailing` instead.
	 */
	inputFormat?: (value: number) => string
	/**
	 * Unit rendered as a non-editable affix slot inside every value input. Inputs only —
	 * the tooltip and the min/max labels get their unit from `format`, which is free to
	 * place it however the locale wants. Override per input with `inputs.right.leading`.
	 */
	leading?: string
	/** Unit rendered after the value, inside the inputs. Same rules as `leading`. */
	trailing?: string
	/** Reads a number back out of a formatted input string. Return null to ignore the keystroke. */
	parse?: (raw: string) => number | null
	/** Per-side `UInput` overrides. Whether inputs show at all is driven by `readonly`. */
	inputs?: SliderInputsProp
	/** Width of the value inputs. */
	inputWidth?: string
	/** Render the value as text in the form field hint instead of as editable inputs. */
	readonly?: boolean

	// --- UFormField passthrough ---
	label?: string
	description?: string
	help?: string
	error?: string | boolean
	/** Overrides the value shown in the label row when `readonly`. */
	hint?: string
	size?: FormFieldProps["size"]
	required?: boolean
	orientation?: FormFieldProps["orientation"]
	errorPattern?: RegExp
	eagerValidation?: boolean
	validateOnInputDelay?: number

	ui?: SSliderProps["ui"] & {
		hint?: string
		formField?: FormFieldProps["ui"]
	}
}

// Side input attached to the slider. Every Nuxt UI `UInput` prop is accepted
// (icon, placeholder, size, …); `leading` / `trailing` override the slider's
// input affixes for this side only, and are rendered in UInput's leading/trailing slots.
export interface SliderInputOptions extends Partial<InputProps> {
	leading?: string
	trailing?: string
}

// Per-side `UInput` overrides. Which inputs render is decided by the model shape
// (a tuple gives left + right) and by `readonly`, not by this.
export interface SliderInputsProp {
	left?: SliderInputOptions
	right?: SliderInputOptions
}

// ---------------------------------------------------------------------------
// SSliderOld (deprecated — kept until consumers migrate to SSlider)
// ---------------------------------------------------------------------------

export type SliderTooltipMode = "hover" | "hidden" | "visible";

export type SliderTooltipSide = "top" | "bottom" | "left" | "right";

// Extends the native Nuxt UI TooltipProps so any tooltip prop (portal, arrow,
// content, delayDuration, …) can be set at the usage site, plus our conveniences.
export interface SliderTooltipOptions extends Partial<TooltipProps> {
	mode?: SliderTooltipMode
	side?: SliderTooltipSide
	prefix?: string
	suffix?: string
	// Opt-in margin reserved on the slider row when `mode: "visible"`, as a Tailwind class
	// (e.g. "mt-7" / "mb-10", or "ml-*" / "mr-*" for vertical sliders). No margin is
	// applied by default — set this when the
	// always-visible tooltip needs headroom so it doesn't overlap adjacent content.
	spacing?: string
}

export type SliderTooltipProp = SliderTooltipMode | SliderTooltipOptions;

export interface SliderThumbLimit {
	min?: number
	max?: number
}

// Single object → applies to the single thumb (or every thumb).
// Array → per-thumb limits by index (use undefined to skip a thumb).
export type SliderThumbLimitsProp = SliderThumbLimit | (SliderThumbLimit | undefined)[];

export interface SliderInlineOptions {
	position?: "both" | "left" | "right"
	value?: "selected" | "range"
}

export type SliderInlineProp = boolean | SliderInlineOptions;
