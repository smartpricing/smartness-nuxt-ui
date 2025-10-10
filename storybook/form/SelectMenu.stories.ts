import type { SelectMenuProps } from "@nuxt/ui";
import type { Meta, StoryObj } from "@storybook/vue3";
import USelectMenu from "@nuxt/ui/components/SelectMenu.vue";

const meta = {
	title: "Form/SelectMenu",
	component: USelectMenu,
	tags: ["autodocs"],
	argTypes: {
		placeholder: {
			control: "text",
			description: "Placeholder text"
		},
		modelValue: {
			control: "text",
			description: "Selected value"
		},
		items: {
			control: "object",
			description: "Array of items"
		},
		searchInput: {
			control: "boolean",
			description: "Show search input"
		},
		color: {
			control: "select",
			options: ["primary", "secondary", "success", "info", "warning", "error", "neutral"],
			description: "Color theme"
		},
		variant: {
			control: "select",
			options: ["outline", "soft", "subtle", "ghost", "none"],
			description: "Variant style"
		},
		size: {
			control: "select",
			options: ["xs", "sm", "md", "lg", "xl"],
			description: "Size of the select menu"
		},
		multiple: {
			control: "boolean",
			description: "Allow multiple selections"
		},
		disabled: {
			control: "boolean",
			description: "Whether the select menu is disabled"
		},
		loading: {
			control: "boolean",
			description: "Show loading state"
		},
		createItem: {
			control: "boolean",
			description: "Allow creating custom items"
		}
	}
} satisfies Meta<SelectMenuProps>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultItems = ["Backlog", "Todo", "In Progress", "Done"];

export const Default: Story = {
	args: {
		modelValue: "Backlog",
		items: defaultItems
	}
};

export const WithPlaceholder: Story = {
	args: {
		placeholder: "Select status",
		items: defaultItems
	}
};

export const WithSearch: Story = {
	args: {
		modelValue: "Backlog",
		items: defaultItems,
		searchInput: true
	}
};

export const NoSearch: Story = {
	args: {
		modelValue: "Backlog",
		items: defaultItems,
		searchInput: false
	}
};

export const Multiple: Story = {
	args: {
		multiple: true,
		items: defaultItems
	}
};

export const WithObjectItems: Story = {
	args: {
		modelValue: { label: "Backlog", value: "backlog" },
		items: [
			{ label: "Backlog", value: "backlog" },
			{ label: "Todo", value: "todo" },
			{ label: "In Progress", value: "in_progress" },
			{ label: "Done", value: "done" }
		]
	}
};

export const WithIcons: Story = {
	args: {
		modelValue: { label: "Backlog", value: "backlog", icon: "i-lucide-circle-help" },
		items: [
			{ label: "Backlog", value: "backlog", icon: "i-lucide-circle-help" },
			{ label: "Todo", value: "todo", icon: "i-lucide-circle-plus" },
			{ label: "In Progress", value: "in_progress", icon: "i-lucide-circle-arrow-up" },
			{ label: "Done", value: "done", icon: "i-lucide-circle-check" }
		]
	}
};

export const Disabled: Story = {
	args: {
		placeholder: "Select status",
		items: defaultItems,
		disabled: true
	}
};

export const Loading: Story = {
	args: {
		modelValue: "Backlog",
		items: defaultItems,
		loading: true
	}
};

export const CreateItem: Story = {
	args: {
		modelValue: "Backlog",
		items: defaultItems,
		createItem: true
	}
};

export const WithGroups: Story = {
	args: {
		modelValue: "Apple",
		items: [
			[
				"Apple",
				"Banana",
				"Blueberry",
				"Grapes",
				"Pineapple"
			],
			[
				"Aubergine",
				"Broccoli",
				"Carrot",
				"Courgette",
				"Leek"
			]
		]
	}
};

export const SizeXS: Story = {
	args: {
		modelValue: "Backlog",
		items: defaultItems,
		size: "xs"
	}
};

export const SizeSmall: Story = {
	args: {
		modelValue: "Backlog",
		items: defaultItems,
		size: "sm"
	}
};

export const SizeMedium: Story = {
	args: {
		modelValue: "Backlog",
		items: defaultItems,
		size: "md"
	}
};

export const SizeLarge: Story = {
	args: {
		modelValue: "Backlog",
		items: defaultItems,
		size: "lg"
	}
};

export const SizeXL: Story = {
	args: {
		modelValue: "Backlog",
		items: defaultItems,
		size: "xl"
	}
};

export const VariantOutline: Story = {
	args: {
		modelValue: "Backlog",
		items: defaultItems,
		variant: "outline"
	}
};

export const VariantSoft: Story = {
	args: {
		modelValue: "Backlog",
		items: defaultItems,
		variant: "soft"
	}
};

export const VariantSubtle: Story = {
	args: {
		modelValue: "Backlog",
		items: defaultItems,
		variant: "subtle"
	}
};

export const VariantGhost: Story = {
	args: {
		modelValue: "Backlog",
		items: defaultItems,
		variant: "ghost"
	}
};

export const ColorPrimary: Story = {
	args: {
		modelValue: "Backlog",
		items: defaultItems,
		color: "primary"
	}
};

export const ColorSecondary: Story = {
	args: {
		modelValue: "Backlog",
		items: defaultItems,
		color: "secondary"
	}
};

export const ColorSuccess: Story = {
	args: {
		modelValue: "Backlog",
		items: defaultItems,
		color: "success"
	}
};

export const ColorInfo: Story = {
	args: {
		modelValue: "Backlog",
		items: defaultItems,
		color: "info"
	}
};

export const ColorWarning: Story = {
	args: {
		modelValue: "Backlog",
		items: defaultItems,
		color: "warning"
	}
};

export const ColorError: Story = {
	args: {
		modelValue: "Backlog",
		items: defaultItems,
		color: "error"
	}
};

export const ColorNeutral: Story = {
	args: {
		modelValue: "Backlog",
		items: defaultItems,
		color: "neutral"
	}
};
