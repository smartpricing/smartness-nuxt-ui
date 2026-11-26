import { de } from "@nuxt/ui/locale";
import { extendSmartnessLocale } from "./_extend";

export default extendSmartnessLocale(de, {
	sTopBar: {
		ctaLabel: "Volles Potenzial freischalten",
		makeAWishLabel: "Wunsch äußern",
		helpCenterLabel: "Ressourcenzentrum"
	},
	sAppPage: {
		backLabel: "",
		howDoesItWorkLabel: "Wie funktioniert das?"
	},
	sNavigationProducts: {
		otherSmartProducts: "Weitere Smartness-Produkte",
		administration: "Verwaltung"
	},
	sMultiSelect: {
		search: "Suchen...",
		selectAll: "Alle auswählen",
		empty: "Keine Ergebnisse",
		selected: "{n} ausgewählt"
	},
	sActionsGroup: {
		actions: "Aktionen",
		selected: "{n} ausgewählt"
	},
	sStepper: {
		optional: "Optional",
		missingValue: "Fehlender Wert"
	},
	sAuthFormCard: {
		brandAlt: "Smartness",
		supportPrompt: "Brauchen Sie Hilfe?"
	},
	sSlider: {
		from: "von",
		to: "bis"
	},
	sActions: {
		clear: "Löschen",
		today: "Heute",
		previous: "Zurück",
		next: "Weiter",
		close: "Schließen",
		retry: "Erneut versuchen"
	},
	sDatePicker: {
		openCalendar: "Kalender öffnen"
	},
	sRangeDatePicker: {
		openCalendar: "Zeitraum auswählen",
		custom: "Benutzerdefinierter Zeitraum",
		past: "Vergangenheit",
		future: "Zukunft",
		presets: {
			last7Days: "Letzte 7 Tage",
			last30Days: "Letzte 30 Tage",
			thisMonth: "Dieser Monat",
			last3Months: "Letzte 3 Monate",
			last12Months: "Letzte 12 Monate",
			next7Days: "Nächste 7 Tage",
			next30Days: "Nächste 30 Tage",
			next3Months: "Nächste 3 Monate",
			next6Months: "Nächste 6 Monate",
			next12Months: "Nächste 12 Monate"
		}
	},
	sExitConfirmation: {
		title: "Nicht gespeicherte Änderungen",
		message: "Sie haben ungespeicherte Änderungen. Möchten Sie die Seite wirklich verlassen?",
		confirm: "Seite verlassen",
		cancel: "Auf der Seite bleiben"
	},
	sConfirmModal: {
		message: "Sind Sie sicher?",
		confirm: "Bestätigen",
		cancel: "Abbrechen"
	},
	sTranslatableText: {
		primary: "Primär",
		required: "Erforderlich",
		active: "Aktiv",
		inactive: "Nicht aktiv",
		outOfDate: "Veraltet: der Ausgangstext hat sich geändert",
		manage: "Verwalten",
		showMore: "{n} weitere anzeigen",
		showLess: "Weniger anzeigen",
		refine: "Mit KI umschreiben",
		retranslate: "Erneut übersetzen",
		update: "Übersetzungen mit KI aktualisieren",
		translatedNote: "Mit KI übersetzt. Prüfen Sie den Text vor dem Speichern.",
		refinedNote: "Mit KI umgeschrieben. Prüfen Sie den Text vor dem Speichern.",
		inactiveHint: "Aktivieren Sie sie, um diese Übersetzung zu zeigen, sonst sehen Gäste den Text auf {language}.",
		requiredEmpty: "Dieser Text ist auf {language} erforderlich.",
		staleTitle: "Der Ausgangstext hat sich geändert",
		staleMessage: "Aktualisieren Sie die Übersetzungen aller Sprachen, damit diese dem Text entspricht, den Gäste auf {language} lesen.",
		failed: "Diese Übersetzungen konnten nicht erstellt werden: {languages}.",
		refineFailed: "Der Text konnte nicht umgeschrieben werden.",
		manageTitle: "Sprachen verwalten",
		manageInfo: "Diese Auswahl wird in den Unternehmenseinstellungen gespeichert: Alle übersetzten Texte verwenden dieselben Sprachen.",
		search: "Sprache suchen",
		selectAll: "Alle auswählen",
		empty: "Keine Sprachen gefunden",
		clearAll: "Alle Sprachen leeren",
		clearAllTitle: "Diesen Text in allen Sprachen leeren?",
		clearAllMessage: "Der Text und alle Übersetzungen werden gelöscht. Das kann nicht rückgängig gemacht werden.",
		clearAllConfirm: "Alle leeren",
		outdatedTitle: "Die Übersetzungen sind nicht aktuell",
		outdatedMessage: "Sie haben den Text auf {language} geändert. In den ausgewählten Sprachen würden Gäste noch den vorherigen Text lesen.",
		outdatedBack: "Zurück zur Bearbeitung",
		outdatedConfirm: "Aktualisieren und weiter",
		outdatedUpdating: "Wird aktualisiert…",
		outdatedFailed: "Die Übersetzungen konnten nicht aktualisiert werden. Versuchen Sie es erneut oder kehren Sie zur Bearbeitung zurück: Es wurde nichts gespeichert.",
		optional: "(optional)",
		fieldsTitle: "Texte auf {language}",
		fieldsPrimary: "Ausgangssprache: Wenn Sie ein Feld bearbeiten, sind nur seine eigenen Übersetzungen veraltet.",
		fieldsSummary: "Zu aktualisierende Felder: {n} von {total}.",
		fieldsUpToDate: "Alle Felder sind aktuell.",
		fieldsStale: "Zu aktualisierende Felder: {n}",
		fieldStale: "Der Text auf {language} hat sich geändert: Dieses Feld ist nicht aktuell.",
		updateField: "Dieses Feld aktualisieren"
	}
});
