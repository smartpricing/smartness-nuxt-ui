import type { UIConfig } from "@/types/ui";

export default {
	variants: {
		active: {
			true: {
				link: "text-secondary-700"
			}
		}
	},
} satisfies UIConfig["breadcrumb"];
