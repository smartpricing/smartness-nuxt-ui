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
	},
	sTranslatableText: {
		primary: "Principale",
		fallback: "Secours",
		active: "Active",
		inactive: "Inactive",
		outOfDate: "Obsolète : le texte d'origine a changé",
		manage: "Gérer",
		showMore: "Afficher {n} de plus",
		showLess: "Afficher moins",
		refine: "Réécrire avec l'IA",
		retranslate: "Traduire à nouveau",
		update: "Mettre à jour les traductions avec l'IA",
		translatedNote: "Traduit avec l'IA. Vérifiez-le avant d'enregistrer.",
		refinedNote: "Réécrit avec l'IA. Vérifiez-le avant d'enregistrer.",
		inactiveHint: "Activez-la pour montrer cette traduction aux clients.",
		inactiveHintFallback: "Activez-la pour montrer cette traduction ; sinon, les clients lisent le texte en {language}.",
		staleTitle: "Le texte d'origine a changé",
		staleMessage: "Mettez à jour les traductions de toutes les langues pour que celle-ci corresponde au texte que les clients lisent en {language}.",
		failed: "Ces traductions n'ont pas pu être générées : {languages}.",
		refineFailed: "Le texte n'a pas pu être réécrit.",
		retry: "Réessayer",
		manageTitle: "Gérer les langues",
		manageInfo: "Ce choix est enregistré dans les paramètres de l'entreprise : tous les textes traduits utilisent les mêmes langues.",
		search: "Rechercher une langue",
		selectAll: "Tout sélectionner",
		empty: "Aucune langue trouvée",
		close: "Fermer"
	}
});
