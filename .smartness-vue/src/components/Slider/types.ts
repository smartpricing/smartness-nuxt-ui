export type SliderTooltipMode = "hover" | "hidden" | "visible";

export type SliderTooltipSide = "top" | "bottom" | "left" | "right";

export interface SliderTooltipOptions {
	mode?: SliderTooltipMode
	side?: SliderTooltipSide
}

export type SliderTooltipProp = SliderTooltipMode | SliderTooltipOptions;

export interface SliderInlineOptions {
	position?: "both" | "left" | "right"
	value?: "selected" | "range"
}

export type SliderInlineProp = boolean | SliderInlineOptions;
