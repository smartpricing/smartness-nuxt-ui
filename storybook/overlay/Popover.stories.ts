import type { PopoverProps } from "@nuxt/ui";
import type { Meta, StoryObj } from "@storybook/vue3";
import UButton from "@nuxt/ui/components/Button.vue";
import UPopover from "@nuxt/ui/components/Popover.vue";

const meta = {
	title: "Overlay/Popover",
	component: UPopover,
	tags: ["autodocs"],
	parameters: {
		docs: {
			description: {
				component: "A popover component for displaying rich content in an overlay."
			}
		}
	},
	argTypes: {
		placement: {
			control: "select",
			options: [
				"top",
				"top-start",
				"top-end",
				"bottom",
				"bottom-start",
				"bottom-end",
				"left",
				"left-start",
				"left-end",
				"right",
				"right-start",
				"right-end"
			],
			description: "Popover placement",
			table: {
				defaultValue: { summary: "bottom" }
			}
		},
		mode: {
			control: "select",
			options: ["click", "hover"],
			description: "Trigger mode",
			table: {
				defaultValue: { summary: "click" }
			}
		},
		arrow: {
			control: "boolean",
			description: "Show popover arrow"
		}
	}
} satisfies Meta<PopoverProps>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => ({
		components: { UButton, UPopover },
		template: `
			<UPopover>
				<UButton label="Click me" />

				<template #content>
					<div class="p-4 min-w-[200px]">
						<h3 class="font-semibold mb-2">Popover Title</h3>
						<p class="text-sm text-gray-600 dark:text-gray-400">
							This is the popover content. Click outside to close.
						</p>
					</div>
				</template>
			</UPopover>
		`
	})
};
