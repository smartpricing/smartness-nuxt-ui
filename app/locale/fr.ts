import { fr } from "@nuxt/ui/locale";
import { extendSmartnessLocale } from "./_extend";

export default extendSmartnessLocale(fr, {
	sTopBar: {
		ctaLabel: "Débloquez tout le potentiel",
		makeAWishLabel: "Faire un vœu",
		helpCenterLabel: "Centre de ressources"
	},
	sAppPage: {
		backLabel: "",
		howDoesItWorkLabel: "Comment ça marche?"
	},
	sNavigationProducts: {
		otherSmartProducts: "Autres produits Smartness",
		administration: "Administration"
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
	},
	sStepper: {
		optional: "Facultatif",
		missingValue: "Valeur manquante"
	},
	sAuthFormCard: {
		brandAlt: "Smartness",
		supportPrompt: "Besoin d'aide ?"
	},
	sExitConfirmation: {
		title: "Modifications non enregistrées",
		message: "Vous avez des modifications non enregistrées. Voulez-vous vraiment quitter ?",
		confirm: "Quitter la page",
		cancel: "Rester sur la page"
	}
});
