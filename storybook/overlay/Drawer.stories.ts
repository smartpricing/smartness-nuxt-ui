import type { DrawerProps } from "@nuxt/ui";
import type { Meta, StoryObj } from "@storybook/vue3";
import UButton from "@nuxt/ui/components/Button.vue";
import UDrawer from "@nuxt/ui/components/Drawer.vue";
import { ref } from "vue";

const meta = {
	title: "Overlay/Drawer",
	component: UDrawer,
	tags: ["autodocs"],
	parameters: {
		docs: {
			description: {
				component: "A drawer component that slides in from the edge of the screen."
			}
		}
	}
} satisfies Meta<DrawerProps>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => ({
		components: { UButton, UDrawer },
		setup() {
			const isOpen = ref(false);
			return { isOpen };
		},
		template: `
			<div>
			<UDrawer v-model="isOpen" title="Drawer Title">
			<UButton label="Open Drawer" />
			<template #content>
					<div class="p-4">
						<p class="text-gray-600 dark:text-gray-400 mb-4">
							This is a drawer component that slides in from the right side of the screen.
						</p>
						<p class="text-gray-600 dark:text-gray-400">
							It's perfect for sidebars, filters, or any content that needs to slide in temporarily.
						</p>
					</div>
					</template>
				</UDrawer>
			</div>
		`
	})
};
