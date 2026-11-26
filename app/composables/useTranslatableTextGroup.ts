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
	confirmUpToDate: () => Promise<boolean>
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

	async function update() {
		await Promise.all(staleMembers().map((m) => m.update()));
		// The answers reach the texts through their v-model
		await nextTick();
		return !stale.value;
	}

	async function confirmUpToDate() {
		const first = staleMembers()[0];
		if (!first) return true;
		const modal = overlay.create(STranslatableTextOutdatedModal, { destroyOnClose: true });
		return modal.open({ language: first.language(), update });
	}

	const group: TranslatableTextGroup = { register, stale, update, confirmUpToDate };
	provide(translatableTextGroupKey, group);
	return group;
}
