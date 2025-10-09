import type { ModalProps } from "@nuxt/ui";
import type { Meta, StoryObj } from "@storybook/vue3";
import UButton from "@nuxt/ui/components/Button.vue";
import UModal from "@nuxt/ui/components/Modal.vue";
import { ref } from "vue";

const meta = {
	title: "Overlay/Modal",
	component: UModal,
	tags: ["autodocs"],
	parameters: {
		docs: {
			description: {
				component: "A modal dialog component for displaying content in an overlay."
			}
		}
	}
} satisfies Meta<ModalProps>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => ({
		components: { UButton, UModal },
		setup() {
			const isOpen = ref(false);
			return { isOpen };
		},
		template: `
			<div>
				<UButton @click="isOpen = true" label="Open Modal" />
				<UModal v-model="isOpen">
					<div class="p-6">
						<h2 class="text-xl font-bold mb-4">Modal Title</h2>
						<p class="text-gray-600 dark:text-gray-400 mb-6">
							This is a basic modal dialog. You can include any content here.
						</p>
						<div class="flex justify-end gap-2">
							<UButton variant="ghost" label="Cancel" @click="isOpen = false" />
							<UButton label="Confirm" @click="isOpen = false" />
						</div>
					</div>
				</UModal>
			</div>
		`
	})
};
