import type { TooltipProps } from "@nuxt/ui";
import type { Meta, StoryObj } from "@storybook/vue3";
import UApp from "@nuxt/ui/components/App.vue";
import UButton from "@nuxt/ui/components/Button.vue";
import UTooltip from "@nuxt/ui/components/Tooltip.vue";

const meta = {
	title: "Overlay/Tooltip",
	component: UTooltip,
	tags: ["autodocs"],
	parameters: {
		docs: {
			description: {
				component: "A tooltip component for displaying helpful hints and information on hover. Must be wrapped with App component."
			}
		}
	}
} satisfies Meta<TooltipProps>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => ({
		components: { UApp, UButton, UTooltip },
		template: `
			<UApp>
				<UTooltip text="This is a helpful tooltip">
					<UButton label="Hover me" />
				</UTooltip>
			</UApp>
		`
	})
};
