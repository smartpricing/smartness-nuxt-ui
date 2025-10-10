import type { AlertProps } from "@nuxt/ui";
import type { Meta, StoryObj } from "@storybook/vue3";
import UAlert from "@nuxt/ui/components/Alert.vue";

const meta = {
	title: "Element/Alert",
	component: UAlert,
	tags: ["autodocs"],
	argTypes: {
		color: {
			control: "select",
			options: ["primary", "secondary", "success", "info", "warning", "error", "neutral"],
			description: "Color of the alert",
			table: {
				type: { summary: "string" },
				defaultValue: { summary: "primary" }
			}
		},
		variant: {
			control: "select",
			options: ["solid", "outline", "soft", "subtle"],
			description: "Variant style of the alert",
			table: {
				type: { summary: "string" },
				defaultValue: { summary: "solid" }
			}
		},
		orientation: {
			control: "select",
			options: ["vertical", "horizontal"],
			description: "Orientation between the content and the actions",
			table: {
				type: { summary: "string" },
				defaultValue: { summary: "vertical" }
			}
		},
		title: {
			control: "text",
			description: "Title of the alert",
			table: {
				type: { summary: "string" }
			}
		},
		description: {
			control: "text",
			description: "Description text of the alert",
			table: {
				type: { summary: "string" }
			}
		},
		icon: {
			control: "text",
			description: "Icon to display (Iconify icon name)",
			table: {
				type: { summary: "string | object" }
			}
		},
		close: {
			control: "boolean",
			description: "Display a close button to dismiss the alert",
			table: {
				type: { summary: "boolean | Partial<ButtonProps>" },
				defaultValue: { summary: "false" }
			}
		}
	}
} satisfies Meta<AlertProps>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		title: "Heads up!",
		description: "You can change the primary color in your app config."
	}
};

export const WithIcon: Story = {
	args: {
		title: "Heads up!",
		description: "You can change the primary color in your app config.",
		icon: "i-lucide-terminal"
	}
};

export const Success: Story = {
	args: {
		title: "Success",
		description: "Your changes have been saved successfully.",
		color: "success",
		icon: "i-lucide-check-circle"
	}
};

export const Error: Story = {
	args: {
		title: "Error",
		description: "Something went wrong. Please try again.",
		color: "error",
		icon: "i-lucide-alert-circle"
	}
};

export const WithClose: Story = {
	args: {
		title: "Dismissible Alert",
		description: "You can close this alert by clicking the close button.",
		color: "neutral",
		variant: "outline",
		close: true
	}
};

export const Horizontal: Story = {
	args: {
		title: "Horizontal Layout",
		description: "This alert uses horizontal orientation.",
		color: "info",
		variant: "soft",
		orientation: "horizontal",
		icon: "i-lucide-info"
	}
};
