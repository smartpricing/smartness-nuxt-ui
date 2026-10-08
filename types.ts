export type { PhoneValidationResult } from "./app/composables/usePhoneValidation";

export { validatePhone } from "./app/composables/usePhoneValidation";
// Public `nuxt-ui-layer/types` entry. Kept outside app/types so Nuxt does not auto-import
// these names a second time: suite.ts and usePhoneValidation.ts are already scanned.
export * from "./app/types";

export type { SuiteProduct } from "./app/types/suite";
export { PRODUCTS } from "./app/types/suite";
