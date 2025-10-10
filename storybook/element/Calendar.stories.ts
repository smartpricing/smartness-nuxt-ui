import type { CalendarProps } from "@nuxt/ui";
import type { Meta, StoryObj } from "@storybook/vue3";
import { CalendarDate } from "@internationalized/date";
import UCalendar from "@nuxt/ui/components/Calendar.vue";

const meta = {
	title: "Element/Calendar",
	component: UCalendar,
	tags: ["autodocs"],
	argTypes: {
		color: {
			control: "select",
			options: ["primary", "secondary", "success", "info", "warning", "error", "neutral"],
			description: "Color theme of the calendar",
			table: {
				type: { summary: "string" },
				defaultValue: { summary: "primary" }
			}
		},
		size: {
			control: "select",
			options: ["xs", "sm", "md", "lg", "xl"],
			description: "Size of the calendar",
			table: {
				type: { summary: "string" },
				defaultValue: { summary: "md" }
			}
		},
		range: {
			control: "boolean",
			description: "Enable date range selection",
			table: {
				type: { summary: "boolean" },
				defaultValue: { summary: "false" }
			}
		},
		multiple: {
			control: "boolean",
			description: "Enable multiple date selection",
			table: {
				type: { summary: "boolean" },
				defaultValue: { summary: "false" }
			}
		},
		monthControls: {
			control: "boolean",
			description: "Show month navigation controls",
			table: {
				type: { summary: "boolean" },
				defaultValue: { summary: "true" }
			}
		},
		yearControls: {
			control: "boolean",
			description: "Show year navigation controls",
			table: {
				type: { summary: "boolean" },
				defaultValue: { summary: "true" }
			}
		},
		fixedWeeks: {
			control: "boolean",
			description: "Always display 6 weeks",
			table: {
				type: { summary: "boolean" },
				defaultValue: { summary: "false" }
			}
		},
		numberOfMonths: {
			control: "number",
			description: "Number of months to display",
			table: {
				type: { summary: "number" },
				defaultValue: { summary: "1" }
			}
		},
		disabled: {
			control: "boolean",
			description: "Disable the calendar",
			table: {
				type: { summary: "boolean" },
				defaultValue: { summary: "false" }
			}
		}
	}
} satisfies Meta<CalendarProps>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		modelValue: new CalendarDate(2024, 1, 15)
	}
};

export const Colors: Story = {
	render: () => ({
		components: { UCalendar },
		template: `
      <div class="space-y-4">
        <UCalendar color="primary" />
        <UCalendar color="secondary" />
        <UCalendar color="success" />
        <UCalendar color="error" />
      </div>
    `
	})
};

export const Sizes: Story = {
	render: () => ({
		components: { UCalendar },
		template: `
      <div class="space-y-4">
        <UCalendar size="xs" />
        <UCalendar size="sm" />
        <UCalendar size="md" />
        <UCalendar size="lg" />
        <UCalendar size="xl" />
      </div>
    `
	})
};

export const Multiple: Story = {
	render: () => ({
		components: { UCalendar },
		setup() {
			const dates = [
				new CalendarDate(2024, 1, 5),
				new CalendarDate(2024, 1, 12),
				new CalendarDate(2024, 1, 20)
			];
			return { dates };
		},
		template: `
      <UCalendar v-model="dates" multiple />
    `
	})
};

export const Range: Story = {
	render: () => ({
		components: { UCalendar },
		setup() {
			const range = {
				start: new CalendarDate(2024, 1, 10),
				end: new CalendarDate(2024, 1, 20)
			};
			return { range };
		},
		template: `
      <UCalendar v-model="range" range />
    `
	})
};

export const WithMinMax: Story = {
	render: () => ({
		components: { UCalendar },
		setup() {
			const today = new CalendarDate(2024, 1, 15);
			const minValue = new CalendarDate(2024, 1, 1);
			const maxValue = new CalendarDate(2024, 1, 31);
			return { today, minValue, maxValue };
		},
		template: `
      <UCalendar
        v-model="today"
        :min-value="minValue"
        :max-value="maxValue"
      />
    `
	})
};

export const MultipleMonths: Story = {
	args: {
		numberOfMonths: 2,
		modelValue: new CalendarDate(2024, 1, 15)
	}
};

export const WithoutControls: Story = {
	args: {
		monthControls: false,
		yearControls: false,
		modelValue: new CalendarDate(2024, 1, 15)
	}
};

export const FixedWeeks: Story = {
	args: {
		fixedWeeks: true,
		modelValue: new CalendarDate(2024, 2, 15)
	}
};

export const Disabled: Story = {
	args: {
		disabled: true,
		modelValue: new CalendarDate(2024, 1, 15)
	}
};
