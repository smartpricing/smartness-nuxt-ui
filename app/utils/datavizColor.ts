import type { DatavizColor, DatavizLinearGradient, DatavizRadialGradient } from "../components/Dataviz/types";

type DatavizGradient = DatavizLinearGradient | DatavizRadialGradient;

export function isDatavizGradient(color?: DatavizColor): color is DatavizGradient {
	return typeof color === "object" && color !== null && Array.isArray(color.colorStops);
}

function sortedStops(gradient: DatavizGradient) {
	return [...gradient.colorStops].sort((a, b) => a.offset - b.offset);
}

/**
 * A plain CSS color for surfaces that cannot paint a gradient — a line swatch's
 * `border-top`, for instance. Gradients collapse to their first stop.
 */
export function datavizSolidColor(color?: DatavizColor): string | undefined {
	if (!color)
		return undefined;
	if (!isDatavizGradient(color))
		return color;
	return sortedStops(color)[0]?.color;
}

/**
 * A CSS `background` value: the color itself when it is a string, or the
 * equivalent CSS gradient. ZRender's gradient coordinates are bounding-box
 * fractions with a top-left origin, which maps onto a CSS angle where 0deg
 * points up and angles run clockwise.
 */
export function datavizColorToCss(color?: DatavizColor): string | undefined {
	if (!color)
		return undefined;
	if (!isDatavizGradient(color))
		return color;

	const stops = sortedStops(color)
		.map((stop) => `${stop.color} ${Math.round(stop.offset * 100)}%`)
		.join(", ");

	if (color.type === "radial")
		return `radial-gradient(circle, ${stops})`;

	const dx = (color.x2 ?? 1) - (color.x ?? 0);
	const dy = (color.y2 ?? 0) - (color.y ?? 0);
	// Straight down (the common "fade to transparent" case) is 180deg; atan2 of a
	// zero-length vector would give 0deg, i.e. upwards, so keep the default here.
	const angle = dx === 0 && dy === 0 ? 180 : Math.round((Math.atan2(dx, -dy) * 180) / Math.PI);

	return `linear-gradient(${(angle + 360) % 360}deg, ${stops})`;
}
