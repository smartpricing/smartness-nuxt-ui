import type { SwitchProps } from "@nuxt/ui";
import type { Meta, StoryObj } from "@storybook/vue3";
import USwitch from "@nuxt/ui/components/Switch.vue";

const meta = {
	title: "Form/Switch",
	component: USwitch,
	tags: ["autodocs"],
	argTypes: {
		modelValue: {
			control: "boolean",
			description: "The checked state of the switch"
		},
		label: {
			control: "text",
			description: "The label text for the switch"
		},
		description: {
			control: "text",
			description: "Helper text displayed below the label"
		},
		color: {
			control: "select",
			options: ["primary", "secondary", "success", "info", "warning", "error", "neutral"],
			description: "The color theme of the switch"
		},
		size: {
			control: "select",
			options: ["xs", "sm", "md", "lg", "xl"],
			description: "The size of the switch"
		},
		disabled: {
			control: "boolean",
			description: "Whether the switch is disabled"
		},
		required: {
			control: "boolean",
			description: "Whether the switch is required"
		},
		loading: {
			control: "boolean",
			description: "Show loading state"
		},
		checkedIcon: {
			control: "text",
			description: "Icon when checked"
		},
		uncheckedIcon: {
			control: "text",
			description: "Icon when unchecked"
		},
		loadingIcon: {
			control: "text",
			description: "Custom loading icon"
		}
	}
} satisfies Meta<SwitchProps>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default switch without label
 */
export const Default: Story = {
	args: {}
};

/**
 * Switch with label
 */
export const WithLabel: Story = {
	args: {
		label: "Enable notifications"
	}
};

/**
 * Switch in checked state
 */
export const Checked: Story = {
	args: {
		label: "Notifications enabled",
		defaultValue: true
	}
};

/**
 * Switch with label and description
 */
export const WithDescription: Story = {
	args: {
		label: "Email notifications",
		description: "Receive email updates about your account activity"
	}
};

/**
 * Disabled switch
 */
export const Disabled: Story = {
	args: {
		label: "Disabled option",
		disabled: true
	}
};

/**
 * Disabled switch in checked state
 */
export const DisabledChecked: Story = {
	args: {
		label: "Disabled checked",
		disabled: true,
		defaultValue: true
	}
};

/**
 * Required switch with asterisk indicator
 */
export const Required: Story = {
	args: {
		label: "Accept terms",
		required: true
	}
};

/**
 * Loading state
 */
export const Loading: Story = {
	args: {
		label: "Processing...",
		loading: true,
		defaultValue: true
	}
};

/**
 * Loading with custom icon
 */
export const LoadingCustomIcon: Story = {
	args: {
		label: "Saving changes",
		loading: true,
		loadingIcon: "i-lucide-loader",
		defaultValue: true
	}
};

/**
 * Switch with checked icon
 */
export const WithCheckedIcon: Story = {
	args: {
		label: "With icons",
		checkedIcon: "i-lucide-check",
		defaultValue: true
	}
};

/**
 * Switch with both checked and unchecked icons
 */
export const WithBothIcons: Story = {
	args: {
		label: "Power",
		checkedIcon: "i-lucide-check",
		uncheckedIcon: "i-lucide-x",
		defaultValue: true
	}
};

/**
 * Extra small size
 */
export const SizeXS: Story = {
	args: {
		label: "Extra small switch",
		size: "xs"
	}
};

/**
 * Small size
 */
export const SizeSmall: Story = {
	args: {
		label: "Small switch",
		size: "sm"
	}
};

/**
 * Medium size (default)
 */
export const SizeMedium: Story = {
	args: {
		label: "Medium switch",
		size: "md"
	}
};

/**
 * Large size
 */
export const SizeLarge: Story = {
	args: {
		label: "Large switch",
		size: "lg"
	}
};

/**
 * Extra large size
 */
export const SizeXL: Story = {
	args: {
		label: "Extra large switch",
		size: "xl"
	}
};

/**
 * Primary color (default)
 */
export const ColorPrimary: Story = {
	args: {
		label: "Primary color",
		color: "primary",
		defaultValue: true
	}
};

/**
 * Secondary color
 */
export const ColorSecondary: Story = {
	args: {
		label: "Secondary color",
		color: "secondary",
		defaultValue: true
	}
};

/**
 * Success color
 */
export const ColorSuccess: Story = {
	args: {
		label: "Success color",
		color: "success",
		defaultValue: true
	}
};

/**
 * Info color
 */
export const ColorInfo: Story = {
	args: {
		label: "Info color",
		color: "info",
		defaultValue: true
	}
};

/**
 * Warning color
 */
export const ColorWarning: Story = {
	args: {
		label: "Warning color",
		color: "warning",
		defaultValue: true
	}
};

/**
 * Error color
 */
export const ColorError: Story = {
	args: {
		label: "Error color",
		color: "error",
		defaultValue: true
	}
};

/**
 * Neutral color
 */
export const ColorNeutral: Story = {
	args: {
		label: "Neutral color",
		color: "neutral",
		defaultValue: true
	}
};
