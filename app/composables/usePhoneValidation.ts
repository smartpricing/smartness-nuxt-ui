import type { CountryCode } from "libphonenumber-js";
import { parsePhoneNumberFromString } from "libphonenumber-js";

export interface PhoneValidationResult {
	valid: boolean
	formatted?: string
	type?: string
	country?: string
}

export function validatePhone(phone: string, countryCode?: string): PhoneValidationResult {
	if (!phone) return { valid: false };

	const parsed = parsePhoneNumberFromString(phone, countryCode as CountryCode | undefined);
	if (!parsed) return { valid: false };

	return {
		valid: parsed.isValid(),
		formatted: parsed.formatInternational(),
		type: parsed.getType(),
		country: parsed.country
	};
}

export const usePhoneValidation = (phone: MaybeRefOrGetter<string>) => {
	const result = computed(() => {
		return validatePhone(toValue(phone));
	});

	return {
		validationResult: result
	};
};
