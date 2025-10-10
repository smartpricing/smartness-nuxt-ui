import type { Meta, StoryObj } from "@storybook/vue3";
import UInput from "@nuxt/ui/components/Input.vue";

const meta = {
	title: "Form/Input",
	component: UInput,
	tags: ["autodocs"],
	argTypes: {
		type: {
			control: "select",
			options: ["text", "email", "password", "number", "tel", "url", "search", "date", "time", "file"],
			description: "Input type",
			table: {
				type: { summary: "InputTypeHTMLAttribute" },
				defaultValue: { summary: "text" }
			}
		},
		placeholder: {
			control: "text",
			description: "The placeholder text when the input is empty",
			table: {
				type: { summary: "string" }
			}
		},
		modelValue: {
			control: "text",
			description: "The input value",
			table: {
				type: { summary: "AcceptableValue" }
			}
		},
		defaultValue: {
			control: "text",
			description: "Default value for the input",
			table: {
				type: { summary: "AcceptableValue" }
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
			description: "Size of the input",
			table: {
				type: { summary: "string" },
				defaultValue: { summary: "md" }
			}
		},
		disabled: {
			control: "boolean",
			description: "Whether the input is disabled",
			table: {
				type: { summary: "boolean" }
			}
		},
		required: {
			control: "boolean",
			description: "Whether the input is required",
			table: {
				type: { summary: "boolean" }
			}
		},
		loading: {
			control: "boolean",
			description: "When true, the loading icon will be displayed",
			table: {
				type: { summary: "boolean" }
			}
		},
		icon: {
			control: "text",
			description: "Display an icon based on the leading and trailing props",
			table: {
				type: { summary: "string | object" }
			}
		},
		leadingIcon: {
			control: "text",
			description: "Display an icon on the left side",
			table: {
				type: { summary: "string | object" }
			}
		},
		trailingIcon: {
			control: "text",
			description: "Display an icon on the right side",
			table: {
				type: { summary: "string | object" }
			}
		},
		loadingIcon: {
			control: "text",
			description: "The icon when the loading prop is true",
			table: {
				type: { summary: "string | object" },
				defaultValue: { summary: "i-lucide-loader-circle" }
			}
		},
		leading: {
			control: "boolean",
			description: "When true, the icon will be displayed on the left side",
			table: {
				type: { summary: "boolean" }
			}
		},
		trailing: {
			control: "boolean",
			description: "When true, the icon will be displayed on the right side",
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
		id: {
			control: "text",
			description: "ID attribute",
			table: {
				type: { summary: "string" }
			}
		},
		name: {
			control: "text",
			description: "Name attribute",
			table: {
				type: { summary: "string" }
			}
		},
		autocomplete: {
			control: "text",
			description: "Autocomplete attribute",
			table: {
				type: { summary: "string" },
				defaultValue: { summary: "off" }
			}
		},
		autofocus: {
			control: "boolean",
			description: "Autofocus the input",
			table: {
				type: { summary: "boolean" }
			}
		},
		autofocusDelay: {
			control: "number",
			description: "Delay in ms before autofocus",
			table: {
				type: { summary: "number" },
				defaultValue: { summary: "0" }
			}
		},
		"onUpdate:modelValue": {
			action: "update:modelValue",
			description: "Emitted when the value changes"
		},
		onChange: {
			action: "change",
			description: "Emitted when input value changes"
		},
		onBlur: {
			action: "blur",
			description: "Emitted when input loses focus"
		}
	}
} satisfies Meta<typeof UInput>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default text input
 */
export const Default: Story = {
	args: {
		placeholder: "Enter text..."
	}
};

/**
 * Email input type
 */
export const TypeEmail: Story = {
	args: {
		type: "email",
		placeholder: "Enter your email"
	}
};

/**
 * Password input type
 */
export const TypePassword: Story = {
	args: {
		type: "password",
		placeholder: "Enter password"
	}
};

/**
 * Number input type
 */
export const TypeNumber: Story = {
	args: {
		type: "number",
		placeholder: "Enter number"
	}
};

/**
 * Tel input type
 */
export const TypeTel: Story = {
	args: {
		type: "tel",
		placeholder: "Enter phone number"
	}
};

/**
 * URL input type
 */
export const TypeUrl: Story = {
	args: {
		type: "url",
		placeholder: "https://example.com"
	}
};

/**
 * Search input type
 */
export const TypeSearch: Story = {
	args: {
		type: "search",
		placeholder: "Search...",
		icon: "i-lucide-search"
	}
};

/**
 * Date input type
 */
export const TypeDate: Story = {
	args: {
		type: "date"
	}
};

/**
 * File input type
 */
export const TypeFile: Story = {
	args: {
		type: "file"
	}
};

/**
 * Input with leading icon
 */
export const WithLeadingIcon: Story = {
	args: {
		placeholder: "Search...",
		leadingIcon: "i-lucide-search"
	}
};

/**
 * Input with trailing icon
 */
export const WithTrailingIcon: Story = {
	args: {
		type: "email",
		placeholder: "Enter your email",
		trailingIcon: "i-lucide-at-sign"
	}
};

/**
 * Input with both icons
 */
export const WithBothIcons: Story = {
	args: {
		placeholder: "Username",
		leadingIcon: "i-lucide-user",
		trailingIcon: "i-lucide-check"
	}
};

/**
 * Loading state with leading icon
 */
export const LoadingLeading: Story = {
	args: {
		placeholder: "Loading...",
		loading: true,
		leading: true
	}
};

/**
 * Loading state with trailing icon
 */
export const LoadingTrailing: Story = {
	args: {
		placeholder: "Processing...",
		loading: true,
		trailing: true
	}
};

/**
 * Disabled input
 */
export const Disabled: Story = {
	args: {
		placeholder: "Disabled input",
		disabled: true
	}
};

/**
 * Disabled with value
 */
export const DisabledWithValue: Story = {
	args: {
		defaultValue: "Disabled value",
		disabled: true
	}
};

/**
 * Extra small size
 */
export const SizeXS: Story = {
	args: {
		size: "xs",
		placeholder: "Extra small"
	}
};

/**
 * Small size
 */
export const SizeSmall: Story = {
	args: {
		size: "sm",
		placeholder: "Small input"
	}
};

/**
 * Medium size (default)
 */
export const SizeMedium: Story = {
	args: {
		size: "md",
		placeholder: "Medium input"
	}
};

/**
 * Large size
 */
export const SizeLarge: Story = {
	args: {
		size: "lg",
		placeholder: "Large input"
	}
};

/**
 * Extra large size
 */
export const SizeXL: Story = {
	args: {
		size: "xl",
		placeholder: "Extra large"
	}
};

/**
 * Outline variant (default)
 */
export const VariantOutline: Story = {
	args: {
		variant: "outline",
		placeholder: "Outline variant"
	}
};

/**
 * Soft variant
 */
export const VariantSoft: Story = {
	args: {
		variant: "soft",
		placeholder: "Soft variant"
	}
};

/**
 * Subtle variant
 */
export const VariantSubtle: Story = {
	args: {
		variant: "subtle",
		placeholder: "Subtle variant"
	}
};

/**
 * Ghost variant
 */
export const VariantGhost: Story = {
	args: {
		variant: "ghost",
		placeholder: "Ghost variant"
	}
};

/**
 * None variant
 */
export const VariantNone: Story = {
	args: {
		variant: "none",
		placeholder: "None variant"
	}
};

/**
 * Primary color (default)
 */
export const ColorPrimary: Story = {
	args: {
		color: "primary",
		placeholder: "Primary color",
		highlight: true
	}
};

/**
 * Secondary color
 */
export const ColorSecondary: Story = {
	args: {
		color: "secondary",
		placeholder: "Secondary color",
		highlight: true
	}
};

/**
 * Success color
 */
export const ColorSuccess: Story = {
	args: {
		color: "success",
		placeholder: "Success color",
		highlight: true
	}
};

/**
 * Error color
 */
export const ColorError: Story = {
	args: {
		color: "error",
		placeholder: "Error color",
		highlight: true
	}
};

/**
 * Warning color
 */
export const ColorWarning: Story = {
	args: {
		color: "warning",
		placeholder: "Warning color",
		highlight: true
	}
};

/**
 * Info color
 */
export const ColorInfo: Story = {
	args: {
		color: "info",
		placeholder: "Info color",
		highlight: true
	}
};

/**
 * Neutral color
 */
export const ColorNeutral: Story = {
	args: {
		color: "neutral",
		placeholder: "Neutral color",
		highlight: true
	}
};
