import type { Meta, StoryObj } from "@storybook/vue3";
import UContainer from "@nuxt/ui/components/Container.vue";

const meta = {
	title: "Layout/Container",
	component: UContainer,
	tags: ["autodocs"],
	parameters: {
		docs: {
			description: {
				component: "A container lets you center and constrain the width of your content."
			}
		}
	},
	argTypes: {
		as: {
			control: "text",
			description: "The element or component this component should render as",
			table: {
				defaultValue: { summary: "div" }
			}
		}
	}
} satisfies Meta<typeof UContainer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => ({
		components: { UContainer },
		template: `
			<div class="bg-gray-50 dark:bg-gray-900 min-h-screen py-8">
				<UContainer>
					<div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
						<h2 class="text-2xl font-bold mb-4">Container Content</h2>
						<p class="text-gray-600 dark:text-gray-300">
							This content is constrained within a container with a maximum width.
							It will be centered on the page and responsive to different screen sizes.
						</p>
					</div>
				</UContainer>
			</div>
		`
	})
};

export const MultipleContainers: Story = {
	render: () => ({
		components: { UContainer },
		template: `
			<div class="bg-gray-50 dark:bg-gray-900 min-h-screen py-8 space-y-8">
				<UContainer>
					<div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
						<h2 class="text-2xl font-bold mb-4">First Container</h2>
						<p class="text-gray-600 dark:text-gray-300">
							Each container is centered and constrained independently.
						</p>
					</div>
				</UContainer>

				<UContainer>
					<div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
						<h2 class="text-2xl font-bold mb-4">Second Container</h2>
						<p class="text-gray-600 dark:text-gray-300">
							Containers maintain consistent max-width across the page.
						</p>
					</div>
				</UContainer>
			</div>
		`
	})
};

export const Nested: Story = {
	render: () => ({
		components: { UContainer },
		template: `
			<div class="bg-gray-50 dark:bg-gray-900 min-h-screen py-8">
				<UContainer>
					<div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow mb-4">
						<h2 class="text-2xl font-bold mb-4">Outer Container</h2>
						<p class="text-gray-600 dark:text-gray-300 mb-6">
							This is the outer container content.
						</p>

						<div class="bg-gray-100 dark:bg-gray-700 p-4 rounded">
							<h3 class="text-lg font-semibold mb-2">Nested Content</h3>
							<p class="text-gray-600 dark:text-gray-300">
								Content can be nested within containers for better organization.
							</p>
						</div>
					</div>
				</UContainer>
			</div>
		`
	})
};

export const WithSections: Story = {
	render: () => ({
		components: { UContainer },
		template: `
			<div>
				<section class="bg-primary-50 dark:bg-primary-900 py-16">
					<UContainer>
						<h2 class="text-3xl font-bold mb-4">Hero Section</h2>
						<p class="text-lg text-gray-600 dark:text-gray-300">
							Container ensures content is readable and centered on all devices.
						</p>
					</UContainer>
				</section>

				<section class="bg-white dark:bg-gray-800 py-16">
					<UContainer>
						<h2 class="text-3xl font-bold mb-4">Features Section</h2>
						<div class="grid md:grid-cols-3 gap-6">
							<div class="p-4 border border-gray-200 dark:border-gray-700 rounded">
								<h3 class="font-bold mb-2">Feature 1</h3>
								<p class="text-gray-600 dark:text-gray-400">Description</p>
							</div>
							<div class="p-4 border border-gray-200 dark:border-gray-700 rounded">
								<h3 class="font-bold mb-2">Feature 2</h3>
								<p class="text-gray-600 dark:text-gray-400">Description</p>
							</div>
							<div class="p-4 border border-gray-200 dark:border-gray-700 rounded">
								<h3 class="font-bold mb-2">Feature 3</h3>
								<p class="text-gray-600 dark:text-gray-400">Description</p>
							</div>
						</div>
					</UContainer>
				</section>

				<section class="bg-gray-50 dark:bg-gray-900 py-16">
					<UContainer>
						<h2 class="text-3xl font-bold mb-4">Content Section</h2>
						<p class="text-gray-600 dark:text-gray-300">
							Multiple sections with containers maintain consistent width across the page.
						</p>
					</UContainer>
				</section>
			</div>
		`
	})
};

export const Responsive: Story = {
	render: () => ({
		components: { UContainer },
		template: `
			<div class="bg-gray-50 dark:bg-gray-900 min-h-screen py-8">
				<UContainer>
					<div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
						<h2 class="text-2xl font-bold mb-4">Responsive Container</h2>
						<p class="text-gray-600 dark:text-gray-300 mb-4">
							The container automatically adjusts to different screen sizes while maintaining optimal readability.
						</p>
						<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
							<div class="bg-gray-100 dark:bg-gray-700 p-4 rounded">
								<p class="font-semibold">Mobile</p>
								<p class="text-sm text-gray-600 dark:text-gray-400">Full width</p>
							</div>
							<div class="bg-gray-100 dark:bg-gray-700 p-4 rounded">
								<p class="font-semibold">Tablet</p>
								<p class="text-sm text-gray-600 dark:text-gray-400">2 columns</p>
							</div>
							<div class="bg-gray-100 dark:bg-gray-700 p-4 rounded">
								<p class="font-semibold">Desktop</p>
								<p class="text-sm text-gray-600 dark:text-gray-400">3 columns</p>
							</div>
						</div>
					</div>
				</UContainer>
			</div>
		`
	})
};

export const AsSection: Story = {
	args: {
		as: "section"
	},
	render: (args) => ({
		components: { UContainer },
		setup() {
			return { args };
		},
		template: `
			<div class="bg-gray-50 dark:bg-gray-900 min-h-screen py-8">
				<UContainer v-bind="args">
					<div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
						<h2 class="text-2xl font-bold mb-4">Container as Section</h2>
						<p class="text-gray-600 dark:text-gray-300">
							The container can render as different HTML elements using the 'as' prop.
							This example renders as a &lt;section&gt; element.
						</p>
					</div>
				</UContainer>
			</div>
		`
	})
};
