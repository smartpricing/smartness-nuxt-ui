import type { CheckboxGroupProps } from "@nuxt/ui";
import type { Meta, StoryObj } from "@storybook/vue3";
import UCheckboxGroup from "@nuxt/ui/components/CheckboxGroup.vue";

const meta = {
	title: "Form/CheckboxGroup",
	component: UCheckboxGroup,
	tags: ["autodocs"],
	argTypes: {
		items: {
			control: "object",
			description: "Array of checkbox items (strings or objects)"
		},
		modelValue: {
			control: "object",
			description: "Selected values array"
		},
		legend: {
			control: "text",
			description: "Legend text for the checkbox group"
		},
		orientation: {
			control: "select",
			options: ["horizontal", "vertical"],
			description: "Layout orientation of checkboxes"
		},
		color: {
			control: "select",
			options: ["primary", "secondary", "success", "info", "warning", "error", "neutral"],
			description: "Color theme for checkboxes"
		},
		variant: {
			control: "select",
			options: ["list", "card", "table"],
			description: "Visual variant"
		},
		size: {
			control: "select",
			options: ["xs", "sm", "md", "lg", "xl"],
			description: "Size of checkboxes"
		},
		indicator: {
			control: "select",
			options: ["start", "end", "hidden"],
			description: "Position of checkbox indicators"
		},
		disabled: {
			control: "boolean",
			description: "Whether the checkbox group is disabled"
		},
		required: {
			control: "boolean",
			description: "Whether selection is required"
		}
	}
} satisfies Meta<CheckboxGroupProps>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default checkbox group with simple string items
 */
export const Default: Story = {
	args: {
		items: ["System", "Light", "Dark"]
	}
};

/**
 * Checkbox group with legend
 */
export const WithLegend: Story = {
	args: {
		legend: "Theme Preferences",
		items: ["System", "Light", "Dark"]
	}
};

/**
 * Horizontal layout
 */
export const Horizontal: Story = {
	args: {
		legend: "Select preferences",
		items: ["Email", "SMS", "Push"],
		orientation: "horizontal"
	}
};

/**
 * Checkbox group with object items including descriptions
 */
export const WithDescription: Story = {
	args: {
		legend: "Notification Settings",
		items: [
			{
				label: "Email",
				description: "Receive notifications via email",
				value: "email"
			},
			{
				label: "SMS",
				description: "Receive notifications via text message",
				value: "sms"
			},
			{
				label: "Push",
				description: "Receive push notifications",
				value: "push"
			}
		]
	}
};

/**
 * Pre-selected values
 */
export const PreSelected: Story = {
	args: {
		legend: "Features",
		items: ["Analytics", "Reports", "API Access", "Team Collaboration"],
		defaultValue: ["Analytics", "Reports"]
	}
};

/**
 * Disabled checkbox group
 */
export const Disabled: Story = {
	args: {
		legend: "Disabled Options",
		items: ["Option 1", "Option 2", "Option 3"],
		disabled: true,
		defaultValue: ["Option 1"]
	}
};

/**
 * Individual disabled items
 */
export const IndividualDisabled: Story = {
	args: {
		legend: "Mixed State",
		items: [
			{
				label: "Available",
				value: "available"
			},
			{
				label: "Unavailable",
				value: "unavailable",
				disabled: true
			},
			{
				label: "Available 2",
				value: "available2"
			}
		]
	}
};

/**
 * Required checkbox group
 */
export const Required: Story = {
	args: {
		legend: "Required Selection",
		items: ["Terms of Service", "Privacy Policy", "Cookie Policy"],
		required: true
	}
};

/**
 * Card variant
 */
export const CardVariant: Story = {
	args: {
		legend: "Choose Plan Features",
		variant: "card",
		items: [
			{
				label: "Unlimited Projects",
				description: "Create and manage unlimited projects",
				value: "projects"
			},
			{
				label: "Priority Support",
				description: "24/7 dedicated support team",
				value: "support"
			},
			{
				label: "Advanced Analytics",
				description: "Detailed insights and reporting",
				value: "analytics"
			}
		],
		defaultValue: ["projects", "analytics"]
	}
};

/**
 * Table variant with vertical orientation
 */
export const TableVariantVertical: Story = {
	args: {
		legend: "Select Services",
		variant: "table",
		orientation: "vertical",
		items: ["Hosting", "Domain", "SSL Certificate", "Email Service"]
	}
};

/**
 * Table variant with horizontal orientation
 */
export const TableVariantHorizontal: Story = {
	args: {
		legend: "Select Days",
		variant: "table",
		orientation: "horizontal",
		items: ["Mon", "Tue", "Wed", "Thu", "Fri"]
	}
};

/**
 * Extra small size
 */
export const SizeXS: Story = {
	args: {
		legend: "Extra Small",
		size: "xs",
		items: ["Option 1", "Option 2", "Option 3"]
	}
};

/**
 * Small size
 */
export const SizeSmall: Story = {
	args: {
		legend: "Small",
		size: "sm",
		items: ["Option 1", "Option 2", "Option 3"]
	}
};

/**
 * Medium size (default)
 */
export const SizeMedium: Story = {
	args: {
		legend: "Medium",
		size: "md",
		items: ["Option 1", "Option 2", "Option 3"]
	}
};

/**
 * Large size
 */
export const SizeLarge: Story = {
	args: {
		legend: "Large",
		size: "lg",
		items: ["Option 1", "Option 2", "Option 3"]
	}
};

/**
 * Extra large size
 */
export const SizeXL: Story = {
	args: {
		legend: "Extra Large",
		size: "xl",
		items: ["Option 1", "Option 2", "Option 3"]
	}
};

/**
 * Secondary color
 */
export const ColorSecondary: Story = {
	args: {
		legend: "Secondary Color",
		color: "secondary",
		items: ["Option 1", "Option 2", "Option 3"],
		defaultValue: ["Option 1"]
	}
};

/**
 * Success color
 */
export const ColorSuccess: Story = {
	args: {
		legend: "Success Color",
		color: "success",
		items: ["Option 1", "Option 2", "Option 3"],
		defaultValue: ["Option 2"]
	}
};

/**
 * Error color
 */
export const ColorError: Story = {
	args: {
		legend: "Error Color",
		color: "error",
		items: ["Option 1", "Option 2", "Option 3"],
		defaultValue: ["Option 3"]
	}
};

/**
 * Indicator at the end
 */
export const IndicatorEnd: Story = {
	args: {
		legend: "Indicator Position",
		indicator: "end",
		variant: "card",
		items: [
			{
				label: "Feature 1",
				description: "Description for feature 1",
				value: "f1"
			},
			{
				label: "Feature 2",
				description: "Description for feature 2",
				value: "f2"
			}
		]
	}
};
