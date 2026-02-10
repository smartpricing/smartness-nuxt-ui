export type { SConfirmModalProps } from "../components/ConfirmationModal/types";

export type MaybeReactive<T> = {
	[K in keyof T]: MaybeRefOrGetter<T[K]>
};

// Dataviz types
export type {
	AreaDataPoint,
	DataPoint,
	DatavizAction,
	DatavizAnimationOptions,
	DatavizEventParams,
	DatavizInitOptions,
	DatavizLocale,
	DatavizOptions,
	DatavizSerieOption,
	DatavizSerieState,
	PieDataPoint,
	TooltipDataItem,
	TooltipSlotData
} from "../components/Dataviz/types";
// Dataviz constants (injection keys kept internal)
export {
	datavizTranslations,
	DEFAULT_COLOR_PALETTE
} from "../components/Dataviz/types";

export type { SuiteProduct } from "./suite";

export { PRODUCTS } from "./suite";
