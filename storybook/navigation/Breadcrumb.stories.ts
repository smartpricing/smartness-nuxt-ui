import type { Meta, StoryObj } from "@storybook/vue3";
import UBreadcrumb from "@nuxt/ui/components/Breadcrumb.vue";

const meta = {
	title: "Navigation/Breadcrumb",
	component: UBreadcrumb,
	tags: ["autodocs"],
	parameters: {
		docs: {
			description: {
				component: "A breadcrumb component for hierarchical navigation.",
			},
		},
	},
	argTypes: {
		items: {
			control: "object",
			description: "Array of breadcrumb items",
		},
		divider: {
			control: "text",
			description: "Custom divider character or icon",
		},
	},
} satisfies Meta<typeof UBreadcrumb>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		items: [
			{ label: "Home", to: "/" },
			{ label: "Products", to: "/products" },
			{ label: "Category", to: "/products/category" },
			{ label: "Item" },
		],
	},
};

export const WithIcons: Story = {
	args: {
		items: [
			{ label: "Home", to: "/", icon: "i-lucide-home" },
			{ label: "Products", to: "/products", icon: "i-lucide-package" },
			{ label: "Category", to: "/products/category", icon: "i-lucide-folder" },
			{ label: "Item", icon: "i-lucide-file" },
		],
	},
};

export const CustomDivider: Story = {
	render: () => ({
		components: { UBreadcrumb },
		setup() {
			return {
				items: [
					{ label: "Home", to: "/" },
					{ label: "Docs", to: "/docs" },
					{ label: "Components", to: "/docs/components" },
					{ label: "Breadcrumb" },
				],
			};
		},
		template: `
			<div class="space-y-6">
				<div>
					<p class="text-sm text-gray-600 dark:text-gray-400 mb-2">Arrow Divider:</p>
					<UBreadcrumb :items="items" divider="→" />
				</div>
				<div>
					<p class="text-sm text-gray-600 dark:text-gray-400 mb-2">Dot Divider:</p>
					<UBreadcrumb :items="items" divider="•" />
				</div>
				<div>
					<p class="text-sm text-gray-600 dark:text-gray-400 mb-2">Pipe Divider:</p>
					<UBreadcrumb :items="items" divider="|" />
				</div>
			</div>
		`,
	}),
};

export const LongPath: Story = {
	args: {
		items: [
			{ label: "Home", to: "/" },
			{ label: "Documents", to: "/documents" },
			{ label: "Projects", to: "/documents/projects" },
			{ label: "2024", to: "/documents/projects/2024" },
			{ label: "Q1", to: "/documents/projects/2024/q1" },
			{ label: "Reports", to: "/documents/projects/2024/q1/reports" },
			{ label: "Sales Report" },
		],
	},
};

export const WithCurrentPage: Story = {
	render: () => ({
		components: { UBreadcrumb },
		setup() {
			return {
				items: [
					{ label: "Home", to: "/" },
					{ label: "Blog", to: "/blog" },
					{ label: "2024", to: "/blog/2024" },
					{ label: "How to use Nuxt UI", active: true },
				],
			};
		},
		template: `
			<div class="space-y-4">
				<UBreadcrumb :items="items" />
				<div class="p-6 bg-gray-50 dark:bg-gray-900 rounded-lg">
					<h1 class="text-2xl font-bold mb-2">How to use Nuxt UI</h1>
					<p class="text-gray-600 dark:text-gray-400">Article content goes here...</p>
				</div>
			</div>
		`,
	}),
};

export const Nested: Story = {
	render: () => ({
		components: { UBreadcrumb },
		setup() {
			return {
				items: [
					{ label: "Dashboard", to: "/", icon: "i-lucide-home" },
					{ label: "Settings", to: "/settings", icon: "i-lucide-settings" },
					{ label: "Profile", to: "/settings/profile", icon: "i-lucide-user" },
					{ label: "Security", to: "/settings/profile/security", icon: "i-lucide-shield" },
					{ label: "Two-Factor Auth", icon: "i-lucide-key" },
				],
			};
		},
		template: `
			<div class="space-y-4">
				<UBreadcrumb :items="items" />
				<div class="p-6 bg-gray-50 dark:bg-gray-900 rounded-lg">
					<h2 class="text-xl font-bold mb-4">Two-Factor Authentication</h2>
					<p class="text-gray-600 dark:text-gray-400">
						Configure two-factor authentication for your account.
					</p>
				</div>
			</div>
		`,
	}),
};

export const Interactive: Story = {
	render: () => ({
		components: { UBreadcrumb },
		setup() {
			const paths = [
				[{ label: "Home" }],
				[{ label: "Home", to: "/" }, { label: "Products" }],
				[
					{ label: "Home", to: "/" },
					{ label: "Products", to: "/products" },
					{ label: "Electronics" },
				],
				[
					{ label: "Home", to: "/" },
					{ label: "Products", to: "/products" },
					{ label: "Electronics", to: "/products/electronics" },
					{ label: "Laptops" },
				],
			];

			return {
				currentIndex: 0,
				paths,
			};
		},
		template: `
			<div class="space-y-6">
				<UBreadcrumb :items="paths[currentIndex]" />

				<div class="flex gap-2">
					<button
						v-for="(path, index) in paths"
						:key="index"
						@click="currentIndex = index"
						class="px-4 py-2 rounded-lg transition-colors"
						:class="currentIndex === index ? 'bg-primary text-white' : 'bg-gray-100 dark:bg-gray-800'"
					>
						Level {{ index + 1 }}
					</button>
				</div>

				<div class="p-6 bg-gray-50 dark:bg-gray-900 rounded-lg">
					<p class="text-sm text-gray-600 dark:text-gray-400">
						Current depth: {{ paths[currentIndex].length }} {{ paths[currentIndex].length === 1 ? 'level' : 'levels' }}
					</p>
				</div>
			</div>
		`,
	}),
};

export const Responsive: Story = {
	render: () => ({
		components: { UBreadcrumb },
		setup() {
			return {
				items: [
					{ label: "Home", to: "/", icon: "i-lucide-home" },
					{ label: "Documentation", to: "/docs" },
					{ label: "Components", to: "/docs/components" },
					{ label: "Navigation", to: "/docs/components/navigation" },
					{ label: "Breadcrumb" },
				],
			};
		},
		template: `
			<div class="space-y-4">
				<p class="text-sm text-gray-600 dark:text-gray-400">
					Resize your browser to see the breadcrumb adapt to different screen sizes.
				</p>
				<UBreadcrumb :items="items" />
			</div>
		`,
	}),
};
