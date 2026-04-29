---
title: PhoneInput
description: International phone number input with country code selector, masking, and validation via libphonenumber-js.
category: form
prefix: S
componentName: PhoneInput
showcaseSlug: phone-input
showcaseFile: PhoneInput
tags: [phone, input, country, libphonenumber, validation, mask]
subcomponents: []
---

# SPhoneInput

`SPhoneInput` combines a country selector and a number field into a single input, with masking and validation powered by `libphonenumber-js`.

## Quick example

```vue
<SPhoneInput
	v-model="phone"
	default-country="IT"
	placeholder="Phone number"
/>
```

## Validation

Pair with the `usePhoneValidation` composable:

```ts
const { isValid, formatted } = usePhoneValidation(phone);
```

## Notes

- Country list comes from `libphonenumber-js` metadata.
- The model value is the E.164 international format (e.g. `+393331234567`).
- Mask updates dynamically when the user changes country.
