import type { Locale } from "@nuxt/ui";
import type { Messages, SmartnessMessages } from "../types/locale";
import { extendLocale } from "@nuxt/ui/composables";

export function extendSmartnessLocale(
	base: Locale<any>,
	messages: SmartnessMessages
): Locale<Messages> {
	return extendLocale(base, { messages } as any) as unknown as Locale<Messages>;
}
