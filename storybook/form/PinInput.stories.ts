import type { Meta, StoryObj } from "@storybook/vue3";
import UPinInput from "@nuxt/ui/components/PinInput.vue";

const meta = {
	title: "Form/PinInput",
	component: UPinInput,
	tags: ["autodocs"],
	argTypes: {
		modelValue: {
			control: "object",
			description: "The controlled checked state of the pin input. Can be binded as v-model",
			table: {
				type: { summary: "string[] | null" }
			}
		},
		defaultValue: {
			control: "object",
			description: "The default value of the pin inputs when it is initially rendered. Use when you do not need to control its checked state",
			table: {
				type: { summary: "string[][]" }
			}
		},
		type: {
			control: "select",
			options: ["text", "number"],
			description: "Input type for the inputs",
			table: {
				type: { summary: "PinInputType" },
				defaultValue: { summary: "text" }
			}
		},
		length: {
			control: "number",
			description: "The number of input fields",
			table: {
				type: { summary: "string | number" },
				defaultValue: { summary: "5" }
			}
		},
		mask: {
			control: "boolean",
			description: "When true, pin inputs will be treated as password",
			table: {
				type: { summary: "boolean" }
			}
		},
		otp: {
			control: "boolean",
			description: "When true, mobile devices will autodetect the OTP from messages or clipboard, and enable the autocomplete field",
			table: {
				type: { summary: "boolean" }
			}
		},
		placeholder: {
			control: "text",
			description: "The placeholder character to use for empty pin-inputs",
			table: {
				type: { summary: "string" }
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
			description: "Size of the pin input",
			table: {
				type: { summary: "string" },
				defaultValue: { summary: "md" }
			}
		},
		disabled: {
			control: "boolean",
			description: "When true, prevents the user from interacting with the pin input",
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
		highlight: {
			control: "boolean",
			description: "Highlight the ring color like a focus state",
			table: {
				type: { summary: "boolean" }
			}
		},
		autofocus: {
			control: "boolean",
			description: "Autofocus the first input",
			table: {
				type: { summary: "boolean" }
			}
		},
		autofocusDelay: {
			control: "number",
			description: "Delay before autofocus",
			table: {
				type: { summary: "number" },
				defaultValue: { summary: "0" }
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
		},
		onComplete: {
			action: "complete",
			description: "Emitted when all inputs are filled"
		}
	}
} satisfies Meta<typeof UPinInput>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default 5-digit pin input
 */
export const Default: Story = {
	args: {}
};

/**
 * Text type (default)
 */
export const TypeText: Story = {
	args: {
		type: "text"
	}
};

/**
 * Number type (numeric only)
 */
export const TypeNumber: Story = {
	args: {
		type: "number"
	}
};

/**
 * With placeholder
 */
export const WithPlaceholder: Story = {
	args: {
		placeholder: "○"
	}
};

/**
 * 4-digit PIN
 */
export const Length4: Story = {
	args: {
		length: 4
	}
};

/**
 * 6-digit PIN
 */
export const Length6: Story = {
	args: {
		length: 6
	}
};

/**
 * 8-digit PIN
 */
export const Length8: Story = {
	args: {
		length: 8
	}
};

/**
 * Masked input (password mode)
 */
export const Masked: Story = {
	args: {
		mask: true
	}
};

/**
 * OTP mode with autocomplete
 */
export const OTPMode: Story = {
	args: {
		otp: true,
		length: 6,
		type: "number"
	}
};

/**
 * Disabled state
 */
export const Disabled: Story = {
	args: {
		disabled: true
	}
};

/**
 * Required field
 */
export const Required: Story = {
	args: {
		required: true
	}
};

/**
 * Extra small size
 */
export const SizeXS: Story = {
	args: {
		size: "xs"
	}
};

/**
 * Small size
 */
export const SizeSmall: Story = {
	args: {
		size: "sm"
	}
};

/**
 * Medium size (default)
 */
export const SizeMedium: Story = {
	args: {
		size: "md"
	}
};

/**
 * Large size
 */
export const SizeLarge: Story = {
	args: {
		size: "lg"
	}
};

/**
 * Extra large size
 */
export const SizeXL: Story = {
	args: {
		size: "xl"
	}
};

/**
 * Outline variant (default)
 */
export const VariantOutline: Story = {
	args: {
		variant: "outline"
	}
};

/**
 * Soft variant
 */
export const VariantSoft: Story = {
	args: {
		variant: "soft"
	}
};

/**
 * Subtle variant
 */
export const VariantSubtle: Story = {
	args: {
		variant: "subtle"
	}
};

/**
 * Ghost variant
 */
export const VariantGhost: Story = {
	args: {
		variant: "ghost"
	}
};

/**
 * None variant
 */
export const VariantNone: Story = {
	args: {
		variant: "none"
	}
};

/**
 * Primary color (default)
 */
export const ColorPrimary: Story = {
	args: {
		color: "primary",
		highlight: true
	}
};

/**
 * Secondary color
 */
export const ColorSecondary: Story = {
	args: {
		color: "secondary",
		highlight: true
	}
};

/**
 * Success color
 */
export const ColorSuccess: Story = {
	args: {
		color: "success",
		highlight: true
	}
};

/**
 * Info color
 */
export const ColorInfo: Story = {
	args: {
		color: "info",
		highlight: true
	}
};

/**
 * Warning color
 */
export const ColorWarning: Story = {
	args: {
		color: "warning",
		highlight: true
	}
};

/**
 * Error color
 */
export const ColorError: Story = {
	args: {
		color: "error",
		highlight: true
	}
};

/**
 * Neutral color
 */
export const ColorNeutral: Story = {
	args: {
		color: "neutral",
		highlight: true
	}
};

/**
 * 2FA verification code
 */
export const TwoFactorAuth: Story = {
	args: {
		length: 6,
		type: "number",
		otp: true,
		placeholder: "0"
	}
};

/**
 * SMS verification code
 */
export const SMSVerification: Story = {
	args: {
		length: 4,
		type: "number",
		otp: true
	}
};

/**
 * Secure PIN entry
 */
export const SecurePIN: Story = {
	args: {
		length: 4,
		type: "number",
		mask: true
	}
};

/**
 * Alphanumeric code
 */
export const AlphanumericCode: Story = {
	args: {
		length: 6,
		type: "text",
		placeholder: "-"
	}
};
