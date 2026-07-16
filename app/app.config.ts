import alert from "./config/alert";
import badge from "./config/badge";
import banner from "./config/banner";
import breadcrumb from "./config/breadcrumb";
import button from "./config/button";
import checkboxGroup from "./config/checkbox-group";
import colors from "./config/colors";
import dashboardNavbar from "./config/dashboard-navbar";
import dashboardPanel from "./config/dashboard-panel";
import icons from "./config/icons";
import input from "./config/input";
import modal from "./config/modal";
import navigationMenu from "./config/navigation-menu";
import radioGroup from "./config/radio-group";
import select from "./config/select";
import selectMenu from "./config/select-menu";
import skeleton from "./config/skeleton";
import slideover from "./config/slideover";
import slider from "./config/slider";
import table from "./config/table";
import tabs from "./config/tabs";

export default defineAppConfig({
	ui: {
		colors,
		icons,
		input,
		select,
		selectMenu,
		skeleton,
		badge,
		banner,
		tabs,
		button,
		breadcrumb,
		dashboardPanel,
		navigationMenu,
		dashboardNavbar,
		radioGroup,
		checkboxGroup,
		table,
		alert,
		modal,
		slideover,
		slider
	}
});
