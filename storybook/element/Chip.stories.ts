import type { ChipProps } from "@nuxt/ui";
import type { Meta, StoryObj } from "@storybook/vue3";
import UChip from "@nuxt/ui/components/Chip.vue";

const meta = {
	title: "Element/Chip",
	component: UChip,
	tags: ["autodocs"],
	argTypes: {
		text: {
			control: "text",
			description: "Display some text inside the chip",
			table: {
				type: { summary: "string | number" }
			}
		},
		color: {
			control: "select",
			options: ["primary", "secondary", "success", "info", "warning", "error", "neutral"],
			description: "Color theme of the chip",
			table: {
				type: { summary: "string" },
				defaultValue: { summary: "primary" }
			}
		},
		size: {
			control: "select",
			options: ["3xs", "2xs", "xs", "sm", "md", "lg", "xl", "2xl", "3xl"],
			description: "Size of the chip",
			table: {
				type: { summary: "string" },
				defaultValue: { summary: "md" }
			}
		},
		position: {
			control: "select",
			options: ["top-right", "bottom-right", "top-left", "bottom-left"],
			description: "Position of the chip",
			table: {
				type: { summary: "string" },
				defaultValue: { summary: "top-right" }
			}
		},
		inset: {
			control: "boolean",
			description: "Keep the chip inside the component for rounded elements",
			table: {
				type: { summary: "boolean" },
				defaultValue: { summary: "false" }
			}
		},
		standalone: {
			control: "boolean",
			description: "Render the chip relatively to the parent",
			table: {
				type: { summary: "boolean" },
				defaultValue: { summary: "false" }
			}
		},
		show: {
			control: "boolean",
			description: "Control the visibility of the chip",
			table: {
				type: { summary: "boolean" },
				defaultValue: { summary: "true" }
			}
		},
		as: {
			control: "text",
			description: "The element or component this component should render as",
			table: {
				type: { summary: "any" }
			}
		}
	}
} satisfies Meta<ChipProps>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => ({
		components: { UChip },
		template: `
      <UChip>
        <div class="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
          Icon
        </div>
      </UChip>
    `
	})
};

export const WithText: Story = {
	render: () => ({
		components: { UChip },
		template: `
      <UChip :text="5">
        <div class="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
          Icon
        </div>
      </UChip>
    `
	})
};

export const Colors: Story = {
	render: () => ({
		components: { UChip },
		template: `
      <div class="flex flex-wrap gap-4">
        <UChip color="primary">
          <div class="w-12 h-12 bg-gray-200 rounded-lg"></div>
        </UChip>
        <UChip color="secondary">
          <div class="w-12 h-12 bg-gray-200 rounded-lg"></div>
        </UChip>
        <UChip color="success">
          <div class="w-12 h-12 bg-gray-200 rounded-lg"></div>
        </UChip>
        <UChip color="info">
          <div class="w-12 h-12 bg-gray-200 rounded-lg"></div>
        </UChip>
        <UChip color="warning">
          <div class="w-12 h-12 bg-gray-200 rounded-lg"></div>
        </UChip>
        <UChip color="error">
          <div class="w-12 h-12 bg-gray-200 rounded-lg"></div>
        </UChip>
        <UChip color="neutral">
          <div class="w-12 h-12 bg-gray-200 rounded-lg"></div>
        </UChip>
      </div>
    `
	})
};

export const Sizes: Story = {
	render: () => ({
		components: { UChip },
		template: `
      <div class="flex flex-wrap items-center gap-4">
        <UChip size="3xs">
          <div class="w-8 h-8 bg-gray-200 rounded-lg"></div>
        </UChip>
        <UChip size="2xs">
          <div class="w-8 h-8 bg-gray-200 rounded-lg"></div>
        </UChip>
        <UChip size="xs">
          <div class="w-10 h-10 bg-gray-200 rounded-lg"></div>
        </UChip>
        <UChip size="sm">
          <div class="w-10 h-10 bg-gray-200 rounded-lg"></div>
        </UChip>
        <UChip size="md">
          <div class="w-12 h-12 bg-gray-200 rounded-lg"></div>
        </UChip>
        <UChip size="lg">
          <div class="w-12 h-12 bg-gray-200 rounded-lg"></div>
        </UChip>
        <UChip size="xl">
          <div class="w-14 h-14 bg-gray-200 rounded-lg"></div>
        </UChip>
        <UChip size="2xl">
          <div class="w-14 h-14 bg-gray-200 rounded-lg"></div>
        </UChip>
        <UChip size="3xl">
          <div class="w-16 h-16 bg-gray-200 rounded-lg"></div>
        </UChip>
      </div>
    `
	})
};

export const Positions: Story = {
	render: () => ({
		components: { UChip },
		template: `
      <div class="flex flex-wrap gap-8">
        <UChip position="top-right">
          <div class="w-16 h-16 bg-gray-200 rounded-lg"></div>
        </UChip>
        <UChip position="top-left">
          <div class="w-16 h-16 bg-gray-200 rounded-lg"></div>
        </UChip>
        <UChip position="bottom-right">
          <div class="w-16 h-16 bg-gray-200 rounded-lg"></div>
        </UChip>
        <UChip position="bottom-left">
          <div class="w-16 h-16 bg-gray-200 rounded-lg"></div>
        </UChip>
      </div>
    `
	})
};

export const Inset: Story = {
	render: () => ({
		components: { UChip },
		template: `
      <div class="flex gap-4">
        <UChip inset>
          <div class="w-16 h-16 bg-gray-200 rounded-full"></div>
        </UChip>
        <UChip :inset="false">
          <div class="w-16 h-16 bg-gray-200 rounded-full"></div>
        </UChip>
      </div>
    `
	})
};

export const Standalone: Story = {
	render: () => ({
		components: { UChip },
		template: `
      <div class="flex gap-4 items-center">
        <UChip standalone inset />
        <span>Status indicator</span>
      </div>
    `
	})
};

export const NotificationBadge: Story = {
	render: () => ({
		components: { UChip },
		template: `
      <div class="flex gap-8">
        <UChip :text="3" color="error">
          <div class="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
            📧
          </div>
        </UChip>
        <UChip :text="99" color="error">
          <div class="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
            📧
          </div>
        </UChip>
        <UChip :text="999" color="error">
          <div class="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
            📧
          </div>
        </UChip>
      </div>
    `
	})
};
