export const PRODUCTS = [
	{
		value: "pms",
		label: "SmartPms"
	},
	{
		value: "pricing",
		label: "SmartPricing"
	},
	{
		value: "chat",
		label: "SmartChat"
	},
	{
		value: "connect",
		label: "SmartConnect"
	}
] as const;

export const ADMIN_ITEM = {
	value: "administration",
	icon: "ph:gear-bold"
} as const;

export type SuiteProduct = (typeof PRODUCTS)[number]["value"] | typeof ADMIN_ITEM["value"];
