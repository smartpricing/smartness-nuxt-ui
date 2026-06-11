// Single source of truth for the Smartness color palette.
// `pnpm generate:colors` derives app/assets/css/variables.css (@theme) from this file,
// and useColors() exposes the same values to JS — never edit the generated CSS by hand.

export const SHADES = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950] as const;

export type Shade = (typeof SHADES)[number];
export type ColorScale = Record<Shade, string>;

export const palette = {
	"off-black": { 50: "#171715", 100: "#171715", 200: "#171715", 300: "#171715", 400: "#171715", 500: "#171715", 600: "#171715", 700: "#171715", 800: "#171715", 900: "#171715", 950: "#171715" },
	"petrol-blue": { 50: "#F0F2F3", 100: "#ECEEF0", 200: "#DDE2E5", 300: "#D1D7DB", 400: "#C9CFD4", 500: "#A4AFB8", 600: "#84939E", 700: "#617482", 800: "#415768", 900: "#253D4F", 950: "#0C2435" },
	"sky": { 50: "#F2F2FF", 100: "#ECECFF", 200: "#DEDEFF", 300: "#D3D3FF", 400: "#CACAFF", 500: "#A5A5FF", 600: "#9191FF", 700: "#6868C4", 800: "#4D4D95", 900: "#353568", 950: "#1F1F3C" },
	"warm-gray": { 50: "#F5F1EF", 100: "#F3EDEA", 200: "#E9DFDA", 300: "#DED5D0", 400: "#D6CDC8", 500: "#B4ACA8", 600: "#96908D", 700: "#76716E", 800: "#585453", 900: "#3D3A39", 950: "#24211F" },
	"burgundy": { 50: "#F6F2F3", 100: "#F2ECEE", 200: "#E9DEE0", 300: "#E1D3D6", 400: "#DBCACE", 500: "#C4A7AD", 600: "#AE878F", 700: "#96646F", 800: "#7E4350", 900: "#672432", 950: "#490614" },
	"lemon": { 50: "#FFFFE4", 100: "#FEFFC4", 200: "#FBFF90", 300: "#F3FF50", 400: "#E4FF00", 500: "#C8E600", 600: "#9BB800", 700: "#758B00", 800: "#5C6D07", 900: "#4D5C0B", 950: "#283400" },
	"info": { 50: "#EFF4FF", 100: "#D1E0FF", 200: "#B2CCFF", 300: "#84ADFF", 400: "#528BFF", 500: "#2970FF", 600: "#155EEF", 700: "#004EEB", 800: "#0040C1", 900: "#00359E", 950: "#002266" },
	"success": { 50: "#ECFDF3", 100: "#DCFAE6", 200: "#A9EFC5", 300: "#75E0A7", 400: "#47CD89", 500: "#17B26A", 600: "#079455", 700: "#067647", 800: "#085D3A", 900: "#074D31", 950: "#053321" },
	"warning": { 50: "#FFFAEB", 100: "#FEF0C7", 200: "#FEDF89", 300: "#FEC84B", 400: "#FDB022", 500: "#F79009", 600: "#DC6803", 700: "#B54708", 800: "#93370D", 900: "#7A2E0E", 950: "#4E1D09" },
	"error": { 50: "#FEF3F2", 100: "#FEE4E2", 200: "#FECDCA", 300: "#FDA29B", 400: "#F97066", 500: "#F04438", 600: "#D92D20", 700: "#B42318", 800: "#973131", 900: "#7A271A", 950: "#55160C" }
} satisfies Record<string, ColorScale>;

// Gradients are emitted to :root (not @theme) so Tailwind doesn't try to build color utilities from them.
export const gradients = {
	"ai": "linear-gradient(to right, #00C6FF 0%, #0072FF 33.33%, #B721FF 66.67%, #FDBB2D 100%)",
	"learning": "linear-gradient(to right, #00C6FF 0%, #0072FF 100%)",
	"learning-icon": "linear-gradient(to bottom, #00C6FF 0%, #0072FF 100%)"
} satisfies Record<string, string>;
