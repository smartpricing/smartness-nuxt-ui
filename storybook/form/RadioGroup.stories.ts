import type { Meta, StoryObj } from "@storybook/vue3";
import URadioGroup from "@nuxt/ui/components/RadioGroup.vue";

const meta = {
	title: "Form/RadioGroup",
	component: URadioGroup,
	tags: ["autodocs"],
	argTypes: {
		items: {
			control: "object",
			description: "Array of radio items (strings, numbers, or objects)",
			table: {
				type: { summary: "RadioGroupItem[]" }
			}
		},
		modelValue: {
			control: "text",
			description: "The controlled value of the RadioGroup. Can be bind as v-model",
			table: {
				type: { summary: "any" }
			}
		},
		defaultValue: {
			control: "text",
			description: "The value of the RadioGroup when initially rendered. Use when you do not need to control the state",
			table: {
				type: { summary: "any" }
			}
		},
		legend: {
			control: "text",
			description: "Legend text for the radio group",
			table: {
				type: { summary: "string" }
			}
		},
		orientation: {
			control: "select",
			options: ["horizontal", "vertical"],
			description: "The orientation the radio buttons are laid out",
			table: {
				type: { summary: "DataOrientation" },
				defaultValue: { summary: "vertical" }
			}
		},
		color: {
			control: "select",
			options: ["primary", "secondary", "success", "info", "warning", "error", "neutral"],
			description: "Color theme",
			table: {
				type: { summary: "string" },
				defaultValue: { summary: "primary" }
			}
		},
		variant: {
			control: "select",
			options: ["list", "card", "table"],
			description: "Visual variant",
			table: {
				type: { summary: "string" },
				defaultValue: { summary: "list" }
			}
		},
		size: {
			control: "select",
			options: ["xs", "sm", "md", "lg", "xl"],
			description: "Size of radio buttons",
			table: {
				type: { summary: "string" },
				defaultValue: { summary: "md" }
			}
		},
		indicator: {
			control: "select",
			options: ["start", "end", "hidden"],
			description: "Position of the indicator",
			table: {
				type: { summary: "string" },
				defaultValue: { summary: "start" }
			}
		},
		valueKey: {
			control: "text",
			description: "When items is an array of objects, select the field to use as the value",
			table: {
				type: { summary: "GetItemKeys<RadioGroupItem[]>" },
				defaultValue: { summary: "value" }
			}
		},
		labelKey: {
			control: "text",
			description: "When items is an array of objects, select the field to use as the label",
			table: {
				type: { summary: "GetItemKeys<RadioGroupItem[]>" },
				defaultValue: { summary: "label" }
			}
		},
		descriptionKey: {
			control: "text",
			description: "When items is an array of objects, select the field to use as the description",
			table: {
				type: { summary: "GetItemKeys<RadioGroupItem[]>" },
				defaultValue: { summary: "description" }
			}
		},
		disabled: {
			control: "boolean",
			description: "When true, prevents the user from interacting with radio items",
			table: {
				type: { summary: "boolean" }
			}
		},
		required: {
			control: "boolean",
			description: "When true, indicates that the user must set the value before the owning form can be submitted",
			table: {
				type: { summary: "boolean" }
			}
		},
		loop: {
			control: "boolean",
			description: "When true, keyboard navigation will loop from last item to first, and vice versa",
			table: {
				type: { summary: "boolean" }
			}
		},
		name: {
			control: "text",
			description: "The name of the field. Submitted with its owning form as part of a name/value pair",
			table: {
				type: { summary: "string" }
			}
		},
		"onUpdate:modelValue": {
			action: "update:modelValue",
			description: "Emitted when the value changes"
		},
		onChange: {
			action: "change",
			description: "Emitted when the value changes"
		}
	}
} satisfies Meta<typeof URadioGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default radio group with string items
 */
export const Default: Story = {
	args: {
		items: ["System", "Light", "Dark"],
		defaultValue: "System"
	}
};

/**
 * Radio group with legend
 */
export const WithLegend: Story = {
	args: {
		legend: "Theme Preference",
		items: ["System", "Light", "Dark"],
		defaultValue: "Light"
	}
};

/**
 * Horizontal layout
 */
export const Horizontal: Story = {
	args: {
		legend: "Select size",
		items: ["Small", "Medium", "Large"],
		orientation: "horizontal",
		defaultValue: "Medium"
	}
};

/**
 * Radio group with descriptions
 */
export const WithDescription: Story = {
	args: {
		legend: "Choose a plan",
		items: [
			{
				label: "Pro",
				description: "Tailored for indie hackers, freelancers and solo founders.",
				value: "pro"
			},
			{
				label: "Startup",
				description: "Best suited for small teams, startups and agencies.",
				value: "startup"
			},
			{
				label: "Enterprise",
				description: "Ideal for larger teams and organizations.",
				value: "enterprise"
			}
		],
		defaultValue: "pro"
	}
};

/**
 * Card variant
 */
export const CardVariant: Story = {
	args: {
		legend: "Select Plan",
		variant: "card",
		items: [
			{
				label: "Basic",
				description: "Essential features for individuals",
				value: "basic"
			},
			{
				label: "Pro",
				description: "Advanced features for professionals",
				value: "pro"
			},
			{
				label: "Enterprise",
				description: "Full features for organizations",
				value: "enterprise"
			}
		],
		defaultValue: "pro"
	}
};

/**
 * Table variant vertical
 */
export const TableVariantVertical: Story = {
	args: {
		legend: "Payment Method",
		variant: "table",
		orientation: "vertical",
		items: ["Credit Card", "PayPal", "Bank Transfer"],
		defaultValue: "Credit Card"
	}
};

/**
 * Table variant horizontal
 */
export const TableVariantHorizontal: Story = {
	args: {
		legend: "Delivery Speed",
		variant: "table",
		orientation: "horizontal",
		items: ["Standard", "Express", "Overnight"],
		defaultValue: "Standard"
	}
};

/**
 * Disabled radio group
 */
export const Disabled: Story = {
	args: {
		legend: "Disabled Options",
		items: ["Option 1", "Option 2", "Option 3"],
		disabled: true,
		defaultValue: "Option 1"
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
				label: "Also Available",
				value: "available2"
			}
		],
		defaultValue: "available"
	}
};

/**
 * Required radio group
 */
export const Required: Story = {
	args: {
		legend: "Required Selection",
		items: ["Yes", "No", "Maybe"],
		required: true
	}
};

/**
 * Indicator at the end
 */
export const IndicatorEnd: Story = {
	args: {
		legend: "Choose Option",
		indicator: "end",
		variant: "card",
		items: [
			{
				label: "Option A",
				description: "Description for option A",
				value: "a"
			},
			{
				label: "Option B",
				description: "Description for option B",
				value: "b"
			}
		],
		defaultValue: "a"
	}
};

/**
 * Extra small size
 */
export const SizeXS: Story = {
	args: {
		legend: "Extra Small",
		size: "xs",
		items: ["Option 1", "Option 2", "Option 3"],
		defaultValue: "Option 1"
	}
};

/**
 * Small size
 */
export const SizeSmall: Story = {
	args: {
		legend: "Small",
		size: "sm",
		items: ["Option 1", "Option 2", "Option 3"],
		defaultValue: "Option 1"
	}
};

/**
 * Medium size (default)
 */
export const SizeMedium: Story = {
	args: {
		legend: "Medium",
		size: "md",
		items: ["Option 1", "Option 2", "Option 3"],
		defaultValue: "Option 1"
	}
};

/**
 * Large size
 */
export const SizeLarge: Story = {
	args: {
		legend: "Large",
		size: "lg",
		items: ["Option 1", "Option 2", "Option 3"],
		defaultValue: "Option 1"
	}
};

/**
 * Extra large size
 */
export const SizeXL: Story = {
	args: {
		legend: "Extra Large",
		size: "xl",
		items: ["Option 1", "Option 2", "Option 3"],
		defaultValue: "Option 1"
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
		defaultValue: "Option 1"
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
		defaultValue: "Option 2"
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
		defaultValue: "Option 3"
	}
};
