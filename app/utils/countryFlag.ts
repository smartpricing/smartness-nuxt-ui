/**
 * Iconify name of a country's round flag in the `circle-flags` set, for `UIcon`.
 * @param country ISO 3166-1 alpha-2 code, any case (e.g. "IT", "gb")
 */
export function countryFlagIcon(country: string): string {
	return `circle-flags:${country.toLowerCase()}`;
}
