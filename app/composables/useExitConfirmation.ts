import type { MaybeRefOrGetter } from "vue";
import type { ConfirmOptions } from "../components/ConfirmationModal/types";
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
	options?: ExitConfirmationOptions
) {
	const { confirm } = useConfirm();
	const { t } = useLocale();

	const blockBrowserExit = options?.blockBrowserExit ?? true;

	// --- Vue Router guard ---
	onBeforeRouteLeave(async () => {
		if (!toValue(shouldBlockNavigation)) return;

		const { blockBrowserExit: _, ...userOpts } = options ?? {};

		const confirmed = await confirm({
			...userOpts,
			title: computed(() => userOpts.title ?? t("sExitConfirmation.title")),
			message: computed(() => userOpts.message ?? t("sExitConfirmation.message")),
			confirmProps: userOpts.confirmProps ?? { label: t("sExitConfirmation.confirm") },
			cancelProps: userOpts.cancelProps ?? { label: t("sExitConfirmation.cancel") }
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
