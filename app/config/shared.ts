/**
 * Smartness disabled treatment for form fields (input, select, select menu, …).
 *
 * Nuxt UI signals `disabled` by lowering opacity; the Smartness design system
 * instead greys the control out with a flat surface. These classes must be
 * appended to the theme's `variants.variant` entry — NOT to `slots.base` —
 * because Nuxt UI sets `disabled:bg-default` / `disabled:bg-elevated` there and
 * variant classes are emitted after base ones, so a `slots.base` override loses.
 */
export const DISABLED_FIELD = "disabled:bg-primary-50 disabled:text-muted disabled:opacity-100";

/**
 * The `ghost` variant additionally carries `dark:disabled:bg-transparent`, which
 * tailwind-merge keeps alongside the unprefixed override — so it needs its own pair.
 */
export const DISABLED_FIELD_GHOST = `${DISABLED_FIELD} dark:disabled:bg-primary-50`;

/**
 * Same rule for indicators — checkbox box, radio dot, switch track. Nuxt UI only
 * dims them (`disabled: { true: { root: "opacity-75" } }`), which leaves the brand
 * colour showing through; the design system wants a flat grey at full opacity,
 * matching the disabled treatment of buttons and selectors.
 *
 * Must go in `compoundVariants` as `{ disabled: true, class: … }`, NOT in
 * `variants.disabled.true`: with `tv({ extend })` the variants declared in
 * app.config are applied *before* the extended ones, so `color`'s `bg-${color}`
 * would land after the override and win on the indicator. Compound variants are
 * always emitted last.
 *
 * `primary-100` = #ECEEF0, `primary-200` = #DDE2E5.
 *
 * Every value below must stay a literal class string: Tailwind scans these files
 * as plain text, so a class assembled by interpolation is never generated.
 */
export const DISABLED_INDICATOR = {
	/** Checked state: the filled box or dot. */
	fill: "bg-primary-200",
	/** The outline around the box or dot. */
	ring: "ring-primary-200",
	/** Unchecked state: the empty box. */
	surface: "bg-primary-100",
	/** Cancels the theme's opacity fade so the grey reads at full strength. */
	noFade: "opacity-100",
	/** A switch track is a single element, so both states need their own class. */
	switchTrack: "data-[state=checked]:bg-primary-200 data-[state=unchecked]:bg-primary-100",
	/**
	 * `card` / `table` variants also tint the whole row when checked — the layer adds
	 * `hover:bg-${c}-50 has-data-[state=checked]:bg-${c}-50 has-data-[state=checked]:outline-${c}-600`
	 * and Nuxt UI adds `has-data-[state=checked]:border-${c}`. All of it has to go grey too.
	 */
	cardSurface: "hover:bg-primary-50 has-data-[state=checked]:bg-primary-50 has-data-[state=checked]:outline-primary-200 has-data-[state=checked]:border-primary-200",
	/** UCheckbox puts the card border on its own `root`, not on the group's `item`. */
	cardBorder: "has-data-[state=checked]:border-primary-200"
};
