import type { TooltipProps } from "@nuxt/ui";

export type SliderTooltipMode = "hover" | "hidden" | "visible";

export type SliderTooltipSide = "top" | "bottom";

// Extends the native Nuxt UI TooltipProps so any tooltip prop (portal, arrow,
// content, delayDuration, …) can be set at the usage site, plus our conveniences.
export interface SliderTooltipOptions extends Partial<TooltipProps> {
	mode?: SliderTooltipMode
	side?: SliderTooltipSide
	prefix?: string
	suffix?: string
	// Opt-in margin reserved on the slider row when `mode: "visible"`, as a Tailwind class
	// (e.g. "mt-7" / "mb-10"). No margin is applied by default — set this when the
	// always-visible tooltip needs headroom so it doesn't overlap adjacent content.
	spacing?: string
}

export type SliderTooltipProp = SliderTooltipMode | SliderTooltipOptions;

export interface SliderInlineOptions {
	position?: "both" | "left" | "right"
	value?: "selected" | "range"
}

export type SliderInlineProp = boolean | SliderInlineOptions;
