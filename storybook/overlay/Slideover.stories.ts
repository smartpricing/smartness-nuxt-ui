import type { SlideoverProps } from "@nuxt/ui";
import type { Meta, StoryObj } from "@storybook/vue3";
import UButton from "@nuxt/ui/components/Button.vue";
import USlideover from "@nuxt/ui/components/Slideover.vue";
import { ref } from "vue";

const meta = {
	title: "Overlay/Slideover",
	component: USlideover,
	tags: ["autodocs"],
	parameters: {
		docs: {
			description: {
				component: "A slideover component that slides in from the side with an overlay backdrop."
			}
		}
	}
} satisfies Meta<SlideoverProps>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => ({
		components: { UButton, USlideover },
		setup() {
			const isOpen = ref(false);
			return { isOpen };
		},
		template: `
			<div>
			<USlideover v-model="isOpen" title="Slideover Title">
			<UButton label="Open Slideover" />
			<template #content>
					<div class="p-4">
						<p class="text-gray-600 dark:text-gray-400 mb-4">
							This is a slideover component that appears from the right side with a backdrop overlay.
						</p>
						<p class="text-gray-600 dark:text-gray-400">
							It's perfect for detailed views, forms, or any content that needs focus.
						</p>
					</div>
					</template>
				</USlideover>
			</div>
		`
	})
};

export const FromLeft: Story = {
	render: () => ({
		components: { UButton, USlideover },
		setup() {
			const isOpen = ref(false);
			return { isOpen };
		},
		template: `
			<div>
			<USlideover v-model="isOpen" side="left" title="Left Slideover">
			<UButton label="Open From Left" />
			<template #content>
					<div class="p-4">
						<p class="text-gray-600 dark:text-gray-400">
							This slideover appears from the left side of the screen.
						</p>
					</div>
					</template>
				</USlideover>
			</div>
		`
	})
};

export const WithDescription: Story = {
	render: () => ({
		components: { UButton, USlideover },
		setup() {
			const isOpen = ref(false);
			return { isOpen };
		},
		template: `
			<div>
				<UButton @click="isOpen = true" label="View Details" />
				<USlideover v-model="isOpen" title="Product Details" description="View and edit product information">
					<div class="p-4 space-y-4">
						<div>
							<h3 class="font-semibold mb-2">Description</h3>
							<p class="text-gray-600 dark:text-gray-400 text-sm">
								This is a detailed view of the product with all its information.
							</p>
						</div>
						<div>
							<h3 class="font-semibold mb-2">Specifications</h3>
							<ul class="text-sm text-gray-600 dark:text-gray-400 space-y-1">
								<li>• Weight: 1.5 kg</li>
								<li>• Dimensions: 30 x 20 x 10 cm</li>
								<li>• Color: Blue</li>
							</ul>
						</div>
					</div>
				</USlideover>
			</div>
		`
	})
};

export const WithForm: Story = {
	render: () => ({
		components: { UButton, USlideover },
		setup() {
			const isOpen = ref(false);
			return { isOpen };
		},
		template: `
			<div>
				<UButton @click="isOpen = true" label="Add Task" icon="i-lucide-plus" />
				<USlideover v-model="isOpen" title="Create New Task">
					<div class="p-4 space-y-4">
						<div>
							<label class="block text-sm font-medium mb-1">Task Name</label>
							<input
								type="text"
								placeholder="Enter task name"
								class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800"
							/>
						</div>
						<div>
							<label class="block text-sm font-medium mb-1">Description</label>
							<textarea
								rows="4"
								placeholder="Enter description"
								class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800"
							></textarea>
						</div>
						<div>
							<label class="block text-sm font-medium mb-1">Priority</label>
							<select class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800">
								<option>Low</option>
								<option>Medium</option>
								<option>High</option>
							</select>
						</div>
						<div>
							<label class="block text-sm font-medium mb-1">Due Date</label>
							<input
								type="date"
								class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800"
							/>
						</div>
						<div class="flex gap-2 pt-4">
							<UButton variant="ghost" label="Cancel" class="flex-1" @click="isOpen = false" />
							<UButton label="Create Task" class="flex-1" @click="isOpen = false" />
						</div>
					</div>
				</USlideover>
			</div>
		`
	})
};

export const DetailView: Story = {
	render: () => ({
		components: { UButton, USlideover },
		setup() {
			const isOpen = ref(false);
			return { isOpen };
		},
		template: `
			<div>
				<UButton @click="isOpen = true" label="View Order" icon="i-lucide-package" />
				<USlideover v-model="isOpen" title="Order #12345">
					<div class="p-4 space-y-6">
						<div>
							<div class="flex items-center justify-between mb-4">
								<h3 class="font-semibold">Order Status</h3>
								<span class="px-2 py-1 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100 rounded text-sm">
									Delivered
								</span>
							</div>
							<div class="space-y-2 text-sm">
								<div class="flex justify-between">
									<span class="text-gray-600 dark:text-gray-400">Order Date</span>
									<span>Jan 15, 2024</span>
								</div>
								<div class="flex justify-between">
									<span class="text-gray-600 dark:text-gray-400">Delivery Date</span>
									<span>Jan 18, 2024</span>
								</div>
								<div class="flex justify-between">
									<span class="text-gray-600 dark:text-gray-400">Tracking Number</span>
									<span class="font-mono">TRK123456789</span>
								</div>
							</div>
						</div>

						<div>
							<h3 class="font-semibold mb-3">Items</h3>
							<div class="space-y-3">
								<div class="flex gap-3 pb-3 border-b border-gray-200 dark:border-gray-700">
									<div class="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded"></div>
									<div class="flex-1">
										<h4 class="font-medium">Product Name</h4>
										<p class="text-sm text-gray-600 dark:text-gray-400">Quantity: 2</p>
										<p class="font-semibold">$49.99</p>
									</div>
								</div>
								<div class="flex gap-3 pb-3 border-b border-gray-200 dark:border-gray-700">
									<div class="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded"></div>
									<div class="flex-1">
										<h4 class="font-medium">Another Product</h4>
										<p class="text-sm text-gray-600 dark:text-gray-400">Quantity: 1</p>
										<p class="font-semibold">$29.99</p>
									</div>
								</div>
							</div>
						</div>

						<div>
							<h3 class="font-semibold mb-3">Summary</h3>
							<div class="space-y-2 text-sm">
								<div class="flex justify-between">
									<span class="text-gray-600 dark:text-gray-400">Subtotal</span>
									<span>$79.98</span>
								</div>
								<div class="flex justify-between">
									<span class="text-gray-600 dark:text-gray-400">Shipping</span>
									<span>$5.00</span>
								</div>
								<div class="flex justify-between">
									<span class="text-gray-600 dark:text-gray-400">Tax</span>
									<span>$6.80</span>
								</div>
								<div class="flex justify-between font-bold text-base pt-2 border-t border-gray-200 dark:border-gray-700">
									<span>Total</span>
									<span>$91.78</span>
								</div>
							</div>
						</div>

						<div class="flex gap-2">
							<UButton variant="outline" label="Download Invoice" icon="i-lucide-download" class="flex-1" />
							<UButton variant="ghost" label="Contact Support" icon="i-lucide-help-circle" class="flex-1" />
						</div>
					</div>
				</USlideover>
			</div>
		`
	})
};

export const WithSections: Story = {
	render: () => ({
		components: { UButton, USlideover },
		setup() {
			const isOpen = ref(false);
			return { isOpen };
		},
		template: `
			<div>
				<UButton @click="isOpen = true" label="User Profile" icon="i-lucide-user" />
				<USlideover v-model="isOpen" title="John Doe">
					<div>
						<div class="p-4 border-b border-gray-200 dark:border-gray-700">
							<div class="flex items-center gap-3 mb-4">
								<div class="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white text-2xl font-bold">
									JD
								</div>
								<div>
									<h3 class="font-bold text-lg">John Doe</h3>
									<p class="text-sm text-gray-600 dark:text-gray-400">john@example.com</p>
								</div>
							</div>
							<div class="flex gap-2">
								<UButton size="sm" label="Message" icon="i-lucide-mail" class="flex-1" />
								<UButton size="sm" variant="outline" label="Call" icon="i-lucide-phone" class="flex-1" />
							</div>
						</div>

						<div class="p-4 border-b border-gray-200 dark:border-gray-700">
							<h4 class="font-semibold mb-3">About</h4>
							<p class="text-sm text-gray-600 dark:text-gray-400">
								Senior Product Designer with 10+ years of experience creating user-centered designs.
							</p>
						</div>

						<div class="p-4 border-b border-gray-200 dark:border-gray-700">
							<h4 class="font-semibold mb-3">Details</h4>
							<div class="space-y-2 text-sm">
								<div class="flex justify-between">
									<span class="text-gray-600 dark:text-gray-400">Role</span>
									<span>Product Designer</span>
								</div>
								<div class="flex justify-between">
									<span class="text-gray-600 dark:text-gray-400">Department</span>
									<span>Design</span>
								</div>
								<div class="flex justify-between">
									<span class="text-gray-600 dark:text-gray-400">Location</span>
									<span>San Francisco, CA</span>
								</div>
							</div>
						</div>

						<div class="p-4">
							<h4 class="font-semibold mb-3">Recent Activity</h4>
							<div class="space-y-3">
								<div class="text-sm">
									<div class="font-medium">Updated project design</div>
									<div class="text-gray-600 dark:text-gray-400">2 hours ago</div>
								</div>
								<div class="text-sm">
									<div class="font-medium">Created new task</div>
									<div class="text-gray-600 dark:text-gray-400">5 hours ago</div>
								</div>
								<div class="text-sm">
									<div class="font-medium">Commented on issue</div>
									<div class="text-gray-600 dark:text-gray-400">Yesterday</div>
								</div>
							</div>
						</div>
					</div>
				</USlideover>
			</div>
		`
	})
};

export const Nested: Story = {
	render: () => ({
		components: { UButton, USlideover },
		setup() {
			const isFirstOpen = ref(false);
			const isSecondOpen = ref(false);
			return { isFirstOpen, isSecondOpen };
		},
		template: `
			<div>
				<UButton @click="isFirstOpen = true" label="Open First Slideover" />

				<USlideover v-model="isFirstOpen" title="First Slideover">
					<div class="p-4">
						<p class="text-gray-600 dark:text-gray-400 mb-4">
							This is the first slideover. You can open another slideover from here.
						</p>
						<UButton @click="isSecondOpen = true" label="Open Second Slideover" />
					</div>
				</USlideover>

				<USlideover v-model="isSecondOpen" side="left" title="Second Slideover">
					<div class="p-4">
						<p class="text-gray-600 dark:text-gray-400">
							This is the second slideover, opened from within the first slideover.
						</p>
					</div>
				</USlideover>
			</div>
		`
	})
};
