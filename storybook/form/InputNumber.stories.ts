import type { Meta, StoryObj } from "@storybook/vue3";
import UInputNumber from "@nuxt/ui/components/InputNumber.vue";

const meta = {
	title: "Form/InputNumber",
	component: UInputNumber,
	tags: ["autodocs"],
	argTypes: {
		modelValue: {
			control: "number",
			description: "The controlled value of the InputNumber",
			table: {
				type: { summary: "number | null" }
			}
		},
		defaultValue: {
			control: "number",
			description: "The value of the InputNumber when initially rendered. Use when you do not need to control the state",
			table: {
				type: { summary: "number" }
			}
		},
		placeholder: {
			control: "text",
			description: "The placeholder text when the input is empty",
			table: {
				type: { summary: "string" }
			}
		},
		min: {
			control: "number",
			description: "The smallest value allowed for the input",
			table: {
				type: { summary: "number" }
			}
		},
		max: {
			control: "number",
			description: "The largest value allowed for the input",
			table: {
				type: { summary: "number" }
			}
		},
		step: {
			control: "number",
			description: "The amount that the input value changes with each increment or decrement \"tick\"",
			table: {
				type: { summary: "number" }
			}
		},
		stepSnapping: {
			control: "boolean",
			description: "When false, prevents the value from snapping to the nearest increment of the step value",
			table: {
				type: { summary: "boolean" }
			}
		},
		orientation: {
			control: "select",
			options: ["horizontal", "vertical"],
			description: "The orientation of the input menu",
			table: {
				type: { summary: "string" },
				defaultValue: { summary: "horizontal" }
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
			options: ["outline", "soft", "subtle", "ghost", "none"],
			description: "Visual variant",
			table: {
				type: { summary: "string" },
				defaultValue: { summary: "outline" }
			}
		},
		size: {
			control: "select",
			options: ["xs", "sm", "md", "lg", "xl"],
			description: "Size of the input number",
			table: {
				type: { summary: "string" },
				defaultValue: { summary: "md" }
			}
		},
		disabled: {
			control: "boolean",
			description: "When true, prevents the user from interacting with the Number Field",
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
		readonly: {
			control: "boolean",
			description: "When true, the Number Field is read-only",
			table: {
				type: { summary: "boolean" }
			}
		},
		highlight: {
			control: "boolean",
			description: "Highlight the ring color like a focus state",
			table: {
				type: { summary: "boolean" }
			}
		},
		incrementIcon: {
			control: "text",
			description: "The icon displayed to increment the value",
			table: {
				type: { summary: "string | object" },
				defaultValue: { summary: "i-lucide-plus" }
			}
		},
		decrementIcon: {
			control: "text",
			description: "The icon displayed to decrement the value",
			table: {
				type: { summary: "string | object" },
				defaultValue: { summary: "i-lucide-minus" }
			}
		},
		incrementDisabled: {
			control: "boolean",
			description: "Disable the increment button",
			table: {
				type: { summary: "boolean" }
			}
		},
		decrementDisabled: {
			control: "boolean",
			description: "Disable the decrement button",
			table: {
				type: { summary: "boolean" }
			}
		},
		formatOptions: {
			control: "object",
			description: "Formatting options for the value displayed in the number field",
			table: {
				type: { summary: "Intl.NumberFormatOptions" }
			}
		},
		disableWheelChange: {
			control: "boolean",
			description: "When true, prevents the value from changing on wheel scroll",
			table: {
				type: { summary: "boolean" }
			}
		},
		invertWheelChange: {
			control: "boolean",
			description: "When true, inverts the direction of the wheel change",
			table: {
				type: { summary: "boolean" }
			}
		},
		locale: {
			control: "text",
			description: "The locale to use for formatting and parsing numbers",
			table: {
				type: { summary: "string" }
			}
		},
		id: {
			control: "text",
			description: "Id of the element",
			table: {
				type: { summary: "string" }
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
		},
		onBlur: {
			action: "blur",
			description: "Emitted when input loses focus"
		}
	}
} satisfies Meta<typeof UInputNumber>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default input number with value 5
 */
export const Default: Story = {
	args: {
		defaultValue: 5
	}
};

/**
 * With placeholder text
 */
export const WithPlaceholder: Story = {
	args: {
		placeholder: "Enter a number"
	}
};

/**
 * With min and max constraints
 */
export const WithMinMax: Story = {
	args: {
		defaultValue: 5,
		min: 0,
		max: 10
	}
};

/**
 * With custom step increment
 */
export const WithStep: Story = {
	args: {
		defaultValue: 10,
		step: 5
	}
};

/**
 * Vertical orientation
 */
export const Vertical: Story = {
	args: {
		defaultValue: 5,
		orientation: "vertical"
	}
};

/**
 * Horizontal orientation (default)
 */
export const Horizontal: Story = {
	args: {
		defaultValue: 5,
		orientation: "horizontal"
	}
};

/**
 * Disabled state
 */
export const Disabled: Story = {
	args: {
		defaultValue: 5,
		disabled: true
	}
};

/**
 * Read-only state
 */
export const ReadOnly: Story = {
	args: {
		defaultValue: 5,
		readonly: true
	}
};

/**
 * Required field
 */
export const Required: Story = {
	args: {
		defaultValue: 5,
		required: true
	}
};

/**
 * With custom increment/decrement icons
 */
export const CustomIcons: Story = {
	args: {
		defaultValue: 5,
		incrementIcon: "i-lucide-chevron-up",
		decrementIcon: "i-lucide-chevron-down"
	}
};

/**
 * With increment disabled
 */
export const IncrementDisabled: Story = {
	args: {
		defaultValue: 10,
		max: 10,
		incrementDisabled: true
	}
};

/**
 * With decrement disabled
 */
export const DecrementDisabled: Story = {
	args: {
		defaultValue: 0,
		min: 0,
		decrementDisabled: true
	}
};

/**
 * Extra small size
 */
export const SizeXS: Story = {
	args: {
		defaultValue: 5,
		size: "xs"
	}
};

/**
 * Small size
 */
export const SizeSmall: Story = {
	args: {
		defaultValue: 5,
		size: "sm"
	}
};

/**
 * Medium size (default)
 */
export const SizeMedium: Story = {
	args: {
		defaultValue: 5,
		size: "md"
	}
};

/**
 * Large size
 */
export const SizeLarge: Story = {
	args: {
		defaultValue: 5,
		size: "lg"
	}
};

/**
 * Extra large size
 */
export const SizeXL: Story = {
	args: {
		defaultValue: 5,
		size: "xl"
	}
};

/**
 * Outline variant (default)
 */
export const VariantOutline: Story = {
	args: {
		defaultValue: 5,
		variant: "outline"
	}
};

/**
 * Soft variant
 */
export const VariantSoft: Story = {
	args: {
		defaultValue: 5,
		variant: "soft"
	}
};

/**
 * Subtle variant
 */
export const VariantSubtle: Story = {
	args: {
		defaultValue: 5,
		variant: "subtle"
	}
};

/**
 * Ghost variant
 */
export const VariantGhost: Story = {
	args: {
		defaultValue: 5,
		variant: "ghost"
	}
};

/**
 * None variant
 */
export const VariantNone: Story = {
	args: {
		defaultValue: 5,
		variant: "none"
	}
};

/**
 * Primary color (default)
 */
export const ColorPrimary: Story = {
	args: {
		defaultValue: 5,
		color: "primary",
		highlight: true
	}
};

/**
 * Secondary color
 */
export const ColorSecondary: Story = {
	args: {
		defaultValue: 5,
		color: "secondary",
		highlight: true
	}
};

/**
 * Success color
 */
export const ColorSuccess: Story = {
	args: {
		defaultValue: 5,
		color: "success",
		highlight: true
	}
};

/**
 * Info color
 */
export const ColorInfo: Story = {
	args: {
		defaultValue: 5,
		color: "info",
		highlight: true
	}
};

/**
 * Warning color
 */
export const ColorWarning: Story = {
	args: {
		defaultValue: 5,
		color: "warning",
		highlight: true
	}
};

/**
 * Error color
 */
export const ColorError: Story = {
	args: {
		defaultValue: 5,
		color: "error",
		highlight: true
	}
};

/**
 * Neutral color
 */
export const ColorNeutral: Story = {
	args: {
		defaultValue: 5,
		color: "neutral",
		highlight: true
	}
};

/**
 * Decimal format with sign display
 */
export const DecimalFormat: Story = {
	args: {
		defaultValue: 5,
		formatOptions: {
			signDisplay: "exceptZero",
			minimumFractionDigits: 1
		}
	}
};

/**
 * Percentage format
 */
export const PercentageFormat: Story = {
	args: {
		defaultValue: 0.05,
		step: 0.01,
		formatOptions: {
			style: "percent"
		}
	}
};

/**
 * Currency format (EUR)
 */
export const CurrencyFormat: Story = {
	args: {
		defaultValue: 1500,
		formatOptions: {
			style: "currency",
			currency: "EUR",
			currencyDisplay: "code",
			currencySign: "accounting"
		}
	}
};

/**
 * Currency format (USD)
 */
export const CurrencyUSD: Story = {
	args: {
		defaultValue: 99.99,
		formatOptions: {
			style: "currency",
			currency: "USD"
		}
	}
};

/**
 * Price selector (0-1000 range)
 */
export const PriceSelector: Story = {
	args: {
		defaultValue: 500,
		min: 0,
		max: 1000,
		step: 50,
		formatOptions: {
			style: "currency",
			currency: "USD"
		}
	}
};

/**
 * Quantity selector
 */
export const QuantitySelector: Story = {
	args: {
		defaultValue: 1,
		min: 1,
		max: 99,
		step: 1
	}
};

/**
 * Disable wheel change
 */
export const DisableWheelChange: Story = {
	args: {
		defaultValue: 5,
		disableWheelChange: true
	}
};

/**
 * Inverted wheel change
 */
export const InvertedWheelChange: Story = {
	args: {
		defaultValue: 5,
		invertWheelChange: true
	}
};
