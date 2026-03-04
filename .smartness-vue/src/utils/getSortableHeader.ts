import type { HeaderContext } from "@tanstack/vue-table";
import UButton from "@nuxt/ui/components/Button.vue";
import { h } from "vue";

export function getSortableHeader<T>(
	{ column }: HeaderContext<T, unknown>,
	label: string
) {
	const isSorted = column.getIsSorted();

	return h(UButton, {
		color: "neutral",
		variant: "ghost",
		label,
		icon: isSorted ? (isSorted === "asc" ? "ph:sort-ascending" : "ph:sort-descending") : "",
		class: "-mx-2.5",
		onClick: () => column.toggleSorting(column.getIsSorted() === "asc"),
		ui: {
			base: "py-3.5 -my-3"
		}
	});
}
