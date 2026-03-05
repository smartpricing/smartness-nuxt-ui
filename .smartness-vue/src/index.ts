import css from "./assets/css/main.css?inline";
import type { App } from "vue";
import NuxtUIPlugin from "@nuxt/ui/vue-plugin";

// Components
import SMoreActions from "./components/MoreActions/SMoreActions.vue";
import SDataviz from "./components/Dataviz/SDataviz.vue";
import SDatavizBar from "./components/Dataviz/SDatavizBar.vue";
import SDatavizLine from "./components/Dataviz/SDatavizLine.vue";
import SDatavizArea from "./components/Dataviz/SDatavizArea.vue";
import SDatavizPie from "./components/Dataviz/SDatavizPie.vue";
import SDatavizScatter from "./components/Dataviz/SDatavizScatter.vue";
import SDatavizFunnel from "./components/Dataviz/SDatavizFunnel.vue";
import SDatavizTooltip from "./components/Dataviz/SDatavizTooltip.vue";
import SDataCalendar from "./components/DataCalendar/SDataCalendar.vue";
import SDataCalendarHeader from "./components/DataCalendar/SDataCalendarHeader.vue";
import SDataCalendarMonthGrid from "./components/DataCalendar/SDataCalendarMonthGrid.vue";
import SDataCalendarWeekGrid from "./components/DataCalendar/SDataCalendarWeekGrid.vue";
import SDataCalendarCell from "./components/DataCalendar/SDataCalendarCell.vue";
import SDataCalendarItem from "./components/DataCalendar/SDataCalendarItem.vue";
import SDatePicker from "./components/DatePicker/SDatePicker.vue";
import SConfirmModal from "./components/ConfirmationModal/SConfirmModal.vue";
import AppPage from "./components/AppPage.vue";
import NavigationShell from "./components/NavigationShell.vue";
import ProductSwitcher from "./components/Navigation/ProductSwitcher.vue";

const components: Record<string, object> = {
	SMoreActions,
	SDataviz,
	SDatavizBar,
	SDatavizLine,
	SDatavizArea,
	SDatavizPie,
	SDatavizScatter,
	SDatavizFunnel,
	SDatavizTooltip,
	SDataCalendar,
	SDataCalendarHeader,
	SDataCalendarMonthGrid,
	SDataCalendarWeekGrid,
	SDataCalendarCell,
	SDataCalendarItem,
	SDatePicker,
	SConfirmModal,
	AppPage,
	NavigationShell,
	ProductSwitcher,
};

// Re-export types
export * from "./types/index";

// Re-export composables
export { useComponentRenderToHTML } from "./composables/useComponentRenderToHTML";
export { useConfirm } from "./composables/useConfirm";

// Re-export utils
export { getSortableHeader } from "./utils/getSortableHeader";

export default {
	install(app: App, options?: Record<string, unknown>) {
		app.use(NuxtUIPlugin, options);
		for (const [name, component] of Object.entries(components)) {
			app.component(name, component);
		}
		const styleTag = document.createElement('style');
		styleTag.innerHTML = css;
		document.head.appendChild(styleTag);
	},
};

export {
	SMoreActions,
	SDataviz,
	SDatavizBar,
	SDatavizLine,
	SDatavizArea,
	SDatavizPie,
	SDatavizScatter,
	SDatavizFunnel,
	SDatavizTooltip,
	SDataCalendar,
	SDataCalendarHeader,
	SDataCalendarMonthGrid,
	SDataCalendarWeekGrid,
	SDataCalendarCell,
	SDataCalendarItem,
	SDatePicker,
	SConfirmModal,
	AppPage,
	NavigationShell,
	ProductSwitcher,
};
