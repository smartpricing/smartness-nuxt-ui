import type { Meta, StoryObj } from "@storybook/vue3";
import ULink from "@nuxt/ui/components/Link.vue";

const meta = {
	title: "Navigation/Link",
	component: ULink,
	tags: ["autodocs"],
	parameters: {
		docs: {
			description: {
				component: "A link component with support for internal and external navigation."
			}
		}
	},
	argTypes: {
		to: {
			control: "text",
			description: "The destination of the link"
		},
		label: {
			control: "text",
			description: "The text content of the link"
		},
		active: {
			control: "boolean",
			description: "Whether the link is active"
		},
		disabled: {
			control: "boolean",
			description: "Whether the link is disabled"
		},
		icon: {
			control: "text",
			description: "Icon to display before the label"
		},
		trailingIcon: {
			control: "text",
			description: "Icon to display after the label"
		},
		external: {
			control: "boolean",
			description: "Whether the link is external"
		}
	}
} satisfies Meta<typeof ULink>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: (args) => ({
		components: { ULink },
		setup() {
			return { args };
		},
		template: `<ULink to="/">Home</ULink>`
	})
};

export const External: Story = {
	render: () => ({
		components: { ULink },
		template: `<ULink to="https://nuxt.com" external target="_blank">Visit Nuxt</ULink>`
	})
};

export const Active: Story = {
	render: () => ({
		components: { ULink },
		template: `<ULink to="/dashboard" active>Dashboard</ULink>`
	})
};

export const WithIcon: Story = {
	render: () => ({
		components: { ULink },
		template: `
			<div class="space-y-4">
				<ULink to="/" icon="i-lucide-home">Home</ULink>
				<ULink to="/settings" icon="i-lucide-settings">Settings</ULink>
				<ULink to="/profile" icon="i-lucide-user">Profile</ULink>
			</div>
		`
	})
};

export const WithTrailingIcon: Story = {
	render: () => ({
		components: { ULink },
		template: `
			<div class="space-y-4">
				<ULink to="https://nuxt.com" trailing-icon="i-lucide-external-link" external target="_blank">External Link</ULink>
				<ULink to="/next" trailing-icon="i-lucide-chevron-right">Next Page</ULink>
				<ULink to="/download" trailing-icon="i-lucide-download">Download</ULink>
			</div>
		`
	})
};

export const Disabled: Story = {
	render: () => ({
		components: { ULink },
		template: `<ULink to="/disabled" disabled>Disabled Link</ULink>`
	})
};

export const Navigation: Story = {
	render: () => ({
		components: { ULink },
		template: `
			<nav class="flex flex-col gap-2 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
				<ULink to="/" icon="i-lucide-home">Home</ULink>
				<ULink to="/products" icon="i-lucide-package">Products</ULink>
				<ULink to="/about" icon="i-lucide-info">About</ULink>
				<ULink to="/contact" icon="i-lucide-mail">Contact</ULink>
			</nav>
		`
	})
};

export const HorizontalNavigation: Story = {
	render: () => ({
		components: { ULink },
		template: `
			<nav class="flex gap-6 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
				<ULink to="/" active>Home</ULink>
				<ULink to="/products">Products</ULink>
				<ULink to="/about">About</ULink>
				<ULink to="/contact">Contact</ULink>
			</nav>
		`
	})
};

export const WithVariants: Story = {
	render: () => ({
		components: { ULink },
		template: `
			<div class="space-y-4">
				<div>
					<p class="text-sm text-gray-600 dark:text-gray-400 mb-2">Primary Links:</p>
					<div class="flex gap-4">
						<ULink to="/">Home</ULink>
						<ULink to="/products">Products</ULink>
						<ULink to="/about">About</ULink>
					</div>
				</div>
				<div>
					<p class="text-sm text-gray-600 dark:text-gray-400 mb-2">With Icons:</p>
					<div class="flex gap-4">
						<ULink to="/" icon="i-lucide-home">Home</ULink>
						<ULink to="/products" icon="i-lucide-package">Products</ULink>
						<ULink to="/about" icon="i-lucide-info">About</ULink>
					</div>
				</div>
				<div>
					<p class="text-sm text-gray-600 dark:text-gray-400 mb-2">Active State:</p>
					<div class="flex gap-4">
						<ULink to="/" active>Home</ULink>
						<ULink to="/products">Products</ULink>
						<ULink to="/about">About</ULink>
					</div>
				</div>
			</div>
		`
	})
};
