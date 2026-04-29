---
title: usePhoneValidation
description: Reactive phone number validation and E.164 formatting backed by `libphonenumber-js`.
name: usePhoneValidation
tags: [phone, validation, libphonenumber, e164, format]
---

# usePhoneValidation

Reactive wrapper around `libphonenumber-js` that exposes the current phone state.

## Quick example

```ts
const phone = ref("");
const { isValid, formatted, country } = usePhoneValidation(phone);
```

## Returned refs

- `isValid: ComputedRef<boolean>` — `true` when the number is parseable and valid for the inferred country.
- `formatted: ComputedRef<string>` — E.164 formatted output (e.g. `+393331234567`).
- `country: ComputedRef<CountryCode | null>` — ISO country code inferred from the number.

## Notes

- Pair with `SPhoneInput` for the canonical phone-input flow.
- Bundle size: `libphonenumber-js` is ~75kb gzipped — add to `build.transpile` in `nuxt.config` (already done in this layer).
