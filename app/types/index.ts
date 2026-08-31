export type {
	ActionItem,
	ActionsGroupLabels,
	ActionsGroupUi,
	PrimaryAction,
	SActionsGroupProps
} from "../components/ActionsGroup/types";

export type { SConfirmModalProps } from "../components/ConfirmationModal/types";

export type MaybeReactive<T> = {
	[K in keyof T]: MaybeRefOrGetter<T[K]>
};
// DataCalendar types
export type {
	DataCalendarDayOfWeek,
	DataCalendarDropEvent,
	DataCalendarItem,
	DataCalendarLegendItem,
	DataCalendarLocale,
	DataCalendarView
} from "../components/DataCalendar/types";
// DataCalendar constants (injection keys kept internal)
export {
	dataCalendarTranslations
} from "../components/DataCalendar/types";

// Dataviz types
export type {
	AreaDataPoint,
	DataPoint,
	DatavizAction,
	DatavizAnimationOptions,
	DatavizAxisLabelOption,
	DatavizAxisOption,
	DatavizColor,
	DatavizEasing,
	DatavizEventParams,
	DatavizGradientStop,
	DatavizInitOptions,
	DatavizLinearGradient,
	DatavizLocale,
	DatavizMarkArea,
	DatavizMarkLine,
	DatavizMarkPoint,
	DatavizMarkValue,
	DatavizOptions,
	DatavizRadialGradient,
	DatavizSerieOption,
	DatavizSerieState,
	DatavizZoomOption,
	PieDataPoint,
	TooltipDataItem,
	TooltipSlotData
} from "../components/Dataviz/types";
// Dataviz constants (injection keys kept internal)
export {
	datavizTranslations,
	DEFAULT_COLOR_PALETTE
} from "../components/Dataviz/types";

export type {
	MoreActionInlineItem,
	MoreActionItem,
	SMoreActionsProps
} from "../components/MoreActions/types";

// MultiSelect types
export type {
	MultiSelectColor,
	MultiSelectItem,
	MultiSelectLocale,
	MultiSelectUi
} from "../components/MultiSelect/types";

// Stepper types
export type {
	StepperStep,
	StepperStepChild,
	StepperStepStatus
} from "../components/Stepper/types";

// Phone validation
export type { PhoneValidationResult } from "../composables/usePhoneValidation";

export { validatePhone } from "../composables/usePhoneValidation";

export type { SuiteProduct } from "./suite";
export { PRODUCTS } from "./suite";
