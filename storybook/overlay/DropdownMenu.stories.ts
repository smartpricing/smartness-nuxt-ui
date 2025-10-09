import type { DropdownMenuProps } from "@nuxt/ui";
import type { Meta, StoryObj } from "@storybook/vue3";
import UButton from "@nuxt/ui/components/Button.vue";
import UDropdownMenu from "@nuxt/ui/components/DropdownMenu.vue";

const meta = {
	title: "Overlay/DropdownMenu",
	component: UDropdownMenu,
	tags: ["autodocs"],
	parameters: {
		docs: {
			description: {
				component: "A dropdown menu component for displaying a list of actions or options."
			}
		}
	}
} satisfies Meta<DropdownMenuProps>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => ({
		components: { UButton, UDropdownMenu },
		setup() {
			return {
				items: [
					[
						{ label: "Profile", icon: "i-lucide-user" },
						{ label: "Settings", icon: "i-lucide-settings" }
					],
					[
						{ label: "Logout", icon: "i-lucide-log-out" }
					]
				]
			};
		},
		template: `
			<UDropdownMenu :items="items">
				<UButton label="Menu" trailing-icon="i-lucide-chevron-down" />
			</UDropdownMenu>
		`
	})
};
