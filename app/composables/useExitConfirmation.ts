import type { MaybeRefOrGetter } from "vue";
import type { ConfirmOptions } from "../components/ConfirmationModal/types";
import type { MaybeReactive } from "../types";
import { useLocale } from "@nuxt/ui/composables";

export interface ExitConfirmationOptions extends ConfirmOptions {
	/**
	 * Whether to block browser tab close / reload with a native dialog.
	 * @default true
	 */
	blockBrowserExit?: boolean
}

export function useExitConfirmation(
	shouldBlockNavigation: MaybeRefOrGetter<boolean>,
	options?: MaybeReactive<ExitConfirmationOptions>
) {
	const { confirm } = useConfirm();
	const { t } = useLocale();

	const blockBrowserExit = toValue(options?.blockBrowserExit) ?? true;

	// --- Vue Router guard ---
	onBeforeRouteLeave(async () => {
		if (!toValue(shouldBlockNavigation)) return;

		const confirmed = await confirm({
			title: toValue(options?.title) ?? t("sExitConfirmation.title"),
			message: toValue(options?.message) ?? t("sExitConfirmation.message"),
			confirmProps: toValue(options?.confirmProps) ?? { label: t("sExitConfirmation.confirm") },
			cancelProps: toValue(options?.cancelProps) ?? { label: t("sExitConfirmation.cancel") },
			destructive: toValue(options?.destructive),
			headerIcon: toValue(options?.headerIcon),
			modalProps: toValue(options?.modalProps),
		});

		if (!confirmed) return false;
	});

	// --- Browser beforeunload ---
	if (blockBrowserExit) {
		const handler = (e: BeforeUnloadEvent) => {
			if (toValue(shouldBlockNavigation)) {
				e.preventDefault();
			}
		};

		onMounted(() => {
			window.addEventListener("beforeunload", handler);
		});

		onUnmounted(() => {
			window.removeEventListener("beforeunload", handler);
		});
	}
}
