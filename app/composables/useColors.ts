import type uiColors from "../config/colors";
import type { ColorScale } from "../config/palette";
import tailwindColorsRaw from "tailwindcss/colors";
import { palette, SHADES } from "../config/palette";

// Tailwind doesn't type colors
type TailwindColorName
	= | "slate" | "gray" | "zinc" | "neutral" | "stone"
		| "red" | "orange" | "amber" | "yellow" | "lime"
		| "green" | "emerald" | "teal" | "cyan" | "sky"
		| "blue" | "indigo" | "violet" | "purple" | "fuchsia"
		| "pink" | "rose";

const tailwind = tailwindColorsRaw as Record<TailwindColorName, ColorScale>;

// Sanitize exports
const { "off-black": offBlack, "petrol-blue": petrolBlue, "warm-gray": warmGray, ...paletteColors } = palette;

// Semantic aliases
const aliases = {
	primary: petrolBlue,
	secondary: paletteColors.sky,
	support: warmGray,
	burgundy: paletteColors.burgundy,
	lemon: paletteColors.lemon,
	info: paletteColors.info,
	success: paletteColors.success,
	warning: paletteColors.warning,
	error: paletteColors.error,
	offblack: offBlack
} satisfies Record<keyof typeof uiColors, ColorScale>;

const colors = { ...tailwind, ...paletteColors, ...aliases };

// Single source of truth for color values
export const useColors = () => colors;

export type ColorName = keyof typeof colors;
