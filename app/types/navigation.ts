/**
 * Navigation type definitions for Smartness UI
 */

/**
 * Product definition for the product switcher
 */
export interface NavigationProduct {
	/**
	 * Unique identifier for the product
	 */
	id: string

	/**
	 * Display label for the product
	 */
	label: string

	/**
	 * Optional icon name (Nuxt UI Icons)
	 */
	icon?: string

}
