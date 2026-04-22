import { fr } from "@nuxt/ui/locale";
import { extendSmartnessLocale } from "./_extend";

export default extendSmartnessLocale(fr, {
	sTopBar: {
		ctaLabel: "Débloquez tout le potentiel"
	},
	sAppPage: {
		backLabel: "",
		howDoesItWorkLabel: "Comment ça marche?"
	},
	sMultiSelect: {
		search: "Rechercher...",
		selectAll: "Tout sélectionner",
		empty: "Aucun résultat",
		selected: "{n} sélectionnés"
	},
	sActionsGroup: {
		actions: "Actions",
		selected: "{n} sélectionnés"
	}
});
