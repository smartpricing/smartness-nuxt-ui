import type { ConfirmOptions, SConfirmModalProps } from "../components/ConfirmationModal/types";
import type { MaybeReactive } from "~/types";
import SConfirmModal from "../components/ConfirmationModal/SConfirmModal.vue";

function resolveOptions(options?: MaybeReactive<ConfirmOptions>): SConfirmModalProps {
	if (!options) return {};

	return {
		...options,
		modalProps: {
			title: options?.title,
			...options?.modalProps
		}
	} as SConfirmModalProps;
}

export const useConfirm = () => {
	const overlay = useOverlay();

	function confirm(options?: MaybeReactive<ConfirmOptions>): Promise<boolean> {
		const modal = overlay.create(SConfirmModal, {
			destroyOnClose: true
		});
		const result = modal.open(resolveOptions(options));

		const stop = watchEffect(() => {
			modal.patch(resolveOptions(options));
		});
		result.finally(stop);

		return result;
	}

	return { confirm };
};
