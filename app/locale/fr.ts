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
	sSlider: {
		from: "de",
		to: "à"
	},
	sActions: {
		clear: "Effacer",
		today: "Aujourd'hui",
		previous: "Précédent",
		next: "Suivant"
	},
	sDatePicker: {
		openCalendar: "Ouvrir le calendrier"
	},
	sRangeDatePicker: {
		openCalendar: "Sélectionner une période",
		custom: "Période personnalisée",
		past: "Passé",
		future: "Futur",
		presets: {
			last7Days: "7 derniers jours",
			last30Days: "30 derniers jours",
			thisMonth: "Ce mois-ci",
			last3Months: "3 derniers mois",
			last12Months: "12 derniers mois",
			next7Days: "7 prochains jours",
			next30Days: "30 prochains jours",
			next3Months: "3 prochains mois",
			next6Months: "6 prochains mois",
			next12Months: "12 prochains mois"
		}
	},
	sExitConfirmation: {
		title: "Modifications non enregistrées",
		message: "Vous avez des modifications non enregistrées. Voulez-vous vraiment quitter ?",
		confirm: "Quitter la page",
		cancel: "Rester sur la page"
	},
	sConfirmModal: {
		message: "Êtes-vous sûr ?",
		confirm: "Confirmer",
		cancel: "Annuler"
	}
});
