import type { ButtonProps } from "@nuxt/ui";
import type { InjectionKey } from "vue";
import STranslatableTextOutdatedModal from "../components/TranslatableText/STranslatableTextOutdatedModal.vue";

/** What one STranslatableText of the group tells it */
export interface TranslatableTextGroupMember {
	/** The language the text is written in */
	language: () => string
	/** Its out-of-date translations guests can read (switched-on languages and the required ones) */
	stale: () => readonly string[]
	/** Translates again every out-of-date translation; resolves once the answers are in */
	update: () => Promise<void>
}

/** The dialog's buttons, e.g. their `data-testid` */
export interface TranslatableTextGroupConfirmOptions {
	confirmProps?: ButtonProps
	cancelProps?: ButtonProps
}

export interface TranslatableTextGroup {
	/** Called by each STranslatableText of the page; returns the function that removes it */
	register: (member: TranslatableTextGroupMember) => () => void
	/** Whether any text of the page has an out-of-date translation guests can read */
	stale: ComputedRef<boolean>
	/** Translates again every out-of-date translation of the page; true when none is left out of date */
	update: () => Promise<boolean>
	/**
	 * Before the page's main action ("Avanti", "Salva"): true at once when every published translation is up to date.
	 * Otherwise one dialog for the whole page: "Aggiorna e continua" updates them all and answers true; "Torna alla
	 * modifica", × or Esc answer false. A failed update keeps the dialog open with the error.
	 */
	confirmUpToDate: (options?: TranslatableTextGroupConfirmOptions) => Promise<boolean>
}

export const translatableTextGroupKey: InjectionKey<TranslatableTextGroup> = Symbol("STranslatableTextGroup");

/**
 * The page's group of translatable texts: every STranslatableText below the component that calls it joins it.
 * The page asks it once before its main action instead of asking each text.
 */
export function useTranslatableTextGroup(): TranslatableTextGroup {
	const members = shallowRef<TranslatableTextGroupMember[]>([]);
	const overlay = useOverlay();

	function register(member: TranslatableTextGroupMember) {
		members.value = [...members.value, member];
		return () => {
			members.value = members.value.filter((m) => m !== member);
		};
	}

	const staleMembers = () => members.value.filter((m) => m.stale().length > 0);
	const stale = computed(() => staleMembers().length > 0);

	// One text after the other: each answer reaches the page through its v-model, and two landing in the same tick
	// would write over each other where the page spreads its fields
	async function update() {
		for (const member of staleMembers()) {
			await member.update();
			await nextTick();
		}
		return !stale.value;
	}

	// The dialog lives in the app's overlays, not in the page: leaving the page answers no
	let open: { close: (value: boolean) => void } | null = null;
	onScopeDispose(() => open?.close(false));

	async function confirmUpToDate(options: TranslatableTextGroupConfirmOptions = {}) {
		const first = staleMembers()[0];
		if (!first) return true;
		const modal = overlay.create(STranslatableTextOutdatedModal, { destroyOnClose: true });
		open = modal;
		try {
			return await modal.open({ language: first.language(), update, ...options });
		} finally {
			open = null;
		}
	}

	const group: TranslatableTextGroup = { register, stale, update, confirmUpToDate };
	provide(translatableTextGroupKey, group);
	return group;
}
