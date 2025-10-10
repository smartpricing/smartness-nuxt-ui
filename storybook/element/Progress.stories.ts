import type { ProgressProps } from "@nuxt/ui";
import type { Meta, StoryObj } from "@storybook/vue3";
import UProgress from "@nuxt/ui/components/Progress.vue";

const meta = {
	title: "Element/Progress",
	component: UProgress,
	tags: ["autodocs"],
	argTypes: {
		modelValue: {
			control: "number",
			description: "The progress value (null for indeterminate)",
			table: {
				type: { summary: "number | null" },
				defaultValue: { summary: "null" }
			}
		},
		max: {
			control: "number",
			description: "The maximum progress value",
			table: {
				type: { summary: "number | any[]" }
			}
		},
		color: {
			control: "select",
			options: ["primary", "secondary", "success", "info", "warning", "error", "neutral"],
			description: "Color theme of the progress bar",
			table: {
				type: { summary: "string" },
				defaultValue: { summary: "primary" }
			}
		},
		size: {
			control: "select",
			options: ["2xs", "xs", "sm", "md", "lg", "xl", "2xl"],
			description: "Size of the progress bar",
			table: {
				type: { summary: "string" },
				defaultValue: { summary: "md" }
			}
		},
		orientation: {
			control: "select",
			options: ["horizontal", "vertical"],
			description: "Orientation of the progress bar",
			table: {
				type: { summary: "string" },
				defaultValue: { summary: "horizontal" }
			}
		},
		animation: {
			control: "select",
			options: ["carousel", "carousel-inverse", "swing", "elastic"],
			description: "Animation of the progress bar",
			table: {
				type: { summary: "string" },
				defaultValue: { summary: "carousel" }
			}
		},
		status: {
			control: "boolean",
			description: "Display the current progress value",
			table: {
				type: { summary: "boolean" }
			}
		},
		inverted: {
			control: "boolean",
			description: "Visually invert the progress bar",
			table: {
				type: { summary: "boolean" },
				defaultValue: { summary: "false" }
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
} satisfies Meta<ProgressProps>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		modelValue: 50
	}
};

export const Colors: Story = {
	render: () => ({
		components: { UProgress },
		template: `
      <div class="space-y-4">
        <UProgress :model-value="50" color="primary" />
        <UProgress :model-value="50" color="secondary" />
        <UProgress :model-value="50" color="success" />
        <UProgress :model-value="50" color="info" />
        <UProgress :model-value="50" color="warning" />
        <UProgress :model-value="50" color="error" />
        <UProgress :model-value="50" color="neutral" />
      </div>
    `
	})
};

export const Sizes: Story = {
	render: () => ({
		components: { UProgress },
		template: `
      <div class="space-y-4">
        <UProgress :model-value="50" size="2xs" />
        <UProgress :model-value="50" size="xs" />
        <UProgress :model-value="50" size="sm" />
        <UProgress :model-value="50" size="md" />
        <UProgress :model-value="50" size="lg" />
        <UProgress :model-value="50" size="xl" />
        <UProgress :model-value="50" size="2xl" />
      </div>
    `
	})
};

export const WithStatus: Story = {
	args: {
		modelValue: 75,
		status: true
	}
};

export const Indeterminate: Story = {
	render: () => ({
		components: { UProgress },
		template: `
      <UProgress />
    `
	})
};

export const Animations: Story = {
	render: () => ({
		components: { UProgress },
		template: `
      <div class="space-y-4">
        <div>
          <p class="text-sm mb-2">Carousel</p>
          <UProgress animation="carousel" />
        </div>
        <div>
          <p class="text-sm mb-2">Carousel Inverse</p>
          <UProgress animation="carousel-inverse" />
        </div>
        <div>
          <p class="text-sm mb-2">Swing</p>
          <UProgress animation="swing" />
        </div>
        <div>
          <p class="text-sm mb-2">Elastic</p>
          <UProgress animation="elastic" />
        </div>
      </div>
    `
	})
};

export const ProgressSteps: Story = {
	render: () => ({
		components: { UProgress },
		template: `
      <div class="space-y-4">
        <UProgress :model-value="0" :max="100" status />
        <UProgress :model-value="25" :max="100" status />
        <UProgress :model-value="50" :max="100" status />
        <UProgress :model-value="75" :max="100" status />
        <UProgress :model-value="100" :max="100" status />
      </div>
    `
	})
};

export const Vertical: Story = {
	render: () => ({
		components: { UProgress },
		template: `
      <div class="flex gap-4 h-48">
        <UProgress :model-value="25" orientation="vertical" />
        <UProgress :model-value="50" orientation="vertical" />
        <UProgress :model-value="75" orientation="vertical" />
        <UProgress :model-value="100" orientation="vertical" />
      </div>
    `
	})
};

export const Inverted: Story = {
	args: {
		modelValue: 25,
		inverted: true,
		status: true
	}
};

export const WithMax: Story = {
	render: () => ({
		components: { UProgress },
		template: `
      <div class="space-y-4">
        <UProgress :model-value="3" :max="4" status />
        <UProgress :model-value="7" :max="10" status />
      </div>
    `
	})
};
