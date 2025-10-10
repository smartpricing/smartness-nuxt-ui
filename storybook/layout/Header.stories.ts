import type { Meta, StoryObj } from "@storybook/vue3";
import UButton from "@nuxt/ui/components/Button.vue";
import UContainer from "@nuxt/ui/components/Container.vue";
import UHeader from "@nuxt/ui/components/Header.vue";

const meta = {
	title: "Layout/Header",
	component: UHeader,
	tags: ["autodocs"],
	parameters: {
		docs: {
			description: {
				component: "A responsive header component."
			}
		}
	},
	argTypes: {
		as: {
			control: "text",
			description: "The element or component this component should render as",
			table: {
				defaultValue: { summary: "header" }
			}
		},
		title: {
			control: "text",
			description: "The title displayed in the header",
			table: {
				defaultValue: { summary: "Nuxt UI" }
			}
		},
		to: {
			control: "text",
			description: "The URL to navigate to when clicking the title",
			table: {
				defaultValue: { summary: "/" }
			}
		},
		mode: {
			control: "select",
			options: ["modal", "slideover", "drawer"],
			description: "The mode of the header menu",
			table: {
				defaultValue: { summary: "modal" }
			}
		}
	}
} satisfies Meta<typeof UHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => ({
		components: { UButton, UHeader },
		template: `
			<UHeader>
				<div class="flex justify-between items-center">
					<div class="flex items-center gap-2">
						<span class="text-xl font-bold">Logo</span>
					</div>
					<div class="flex gap-2">
						<UButton label="Sign In" variant="ghost" />
						<UButton label="Sign Up" />
					</div>
				</div>
			</UHeader>
		`
	})
};

export const WithNavigation: Story = {
	render: () => ({
		components: { UButton, UHeader },
		template: `
			<UHeader>
				<div class="flex justify-between items-center">
					<div class="flex items-center gap-8">
						<span class="text-xl font-bold">Logo</span>
						<nav class="hidden md:flex gap-6">
							<a href="#" class="text-gray-600 dark:text-gray-400 hover:text-primary font-medium">Home</a>
							<a href="#" class="text-gray-600 dark:text-gray-400 hover:text-primary font-medium">Products</a>
							<a href="#" class="text-gray-600 dark:text-gray-400 hover:text-primary font-medium">About</a>
							<a href="#" class="text-gray-600 dark:text-gray-400 hover:text-primary font-medium">Contact</a>
						</nav>
					</div>
					<UButton label="Get Started" />
				</div>
			</UHeader>
		`
	})
};

export const WithActions: Story = {
	render: () => ({
		components: { UButton, UHeader },
		template: `
			<UHeader>
				<div class="flex justify-between items-center">
					<span class="text-xl font-bold">Logo</span>
					<div class="flex items-center gap-3">
						<UButton icon="i-lucide-search" variant="ghost" color="neutral" square />
						<UButton icon="i-lucide-bell" variant="ghost" color="neutral" square />
						<UButton icon="i-lucide-user" variant="soft" color="neutral" square />
					</div>
				</div>
			</UHeader>
		`
	})
};

export const WithSearch: Story = {
	render: () => ({
		components: { UButton, UHeader },
		template: `
			<UHeader>
				<div class="flex justify-between items-center gap-4">
					<span class="text-xl font-bold flex-shrink-0">Logo</span>
					<div class="flex-1 max-w-md">
						<div class="relative">
							<input
								type="text"
								placeholder="Search..."
								class="w-full px-4 py-2 pl-10 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary"
							/>
							<div class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
								<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
								</svg>
							</div>
						</div>
					</div>
					<div class="flex gap-2">
						<UButton label="Sign In" variant="ghost" />
						<UButton label="Sign Up" />
					</div>
				</div>
			</UHeader>
		`
	})
};

export const WithContainer: Story = {
	render: () => ({
		components: { UButton, UContainer, UHeader },
		template: `
			<UHeader>
				<UContainer>
					<div class="flex justify-between items-center">
						<span class="text-xl font-bold">Logo</span>
						<nav class="hidden md:flex gap-6">
							<a href="#" class="text-gray-600 dark:text-gray-400 hover:text-primary">Features</a>
							<a href="#" class="text-gray-600 dark:text-gray-400 hover:text-primary">Pricing</a>
							<a href="#" class="text-gray-600 dark:text-gray-400 hover:text-primary">About</a>
						</nav>
						<UButton label="Get Started" />
					</div>
				</UContainer>
			</UHeader>
		`
	})
};

export const WithMenu: Story = {
	args: {
		title: "My App",
		to: "/"
	},
	render: (args) => ({
		components: { UButton, UHeader },
		setup() {
			return { args };
		},
		template: `
			<UHeader v-bind="args">
				<template #right>
					<div class="flex gap-2">
						<UButton label="Sign In" variant="ghost" />
						<UButton label="Sign Up" />
					</div>
				</template>

				<template #content>
					<nav class="space-y-2 p-4">
						<a href="#" class="block px-4 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800">Home</a>
						<a href="#" class="block px-4 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800">Products</a>
						<a href="#" class="block px-4 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800">About</a>
						<a href="#" class="block px-4 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800">Contact</a>
					</nav>
				</template>
			</UHeader>
		`
	})
};

export const WithLogo: Story = {
	render: () => ({
		components: { UButton, UHeader },
		template: `
			<UHeader>
				<div class="flex justify-between items-center">
					<div class="flex items-center gap-3">
						<div class="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-white font-bold">
							L
						</div>
						<span class="text-xl font-bold">Logo</span>
					</div>
					<nav class="hidden md:flex gap-6">
						<a href="#" class="text-gray-600 dark:text-gray-400 hover:text-primary font-medium">Features</a>
						<a href="#" class="text-gray-600 dark:text-gray-400 hover:text-primary font-medium">Pricing</a>
						<a href="#" class="text-gray-600 dark:text-gray-400 hover:text-primary font-medium">Docs</a>
					</nav>
					<UButton label="Get Started" />
				</div>
			</UHeader>
		`
	})
};

export const WithBreadcrumbs: Story = {
	render: () => ({
		components: { UButton, UHeader },
		template: `
			<UHeader>
				<div class="flex flex-col gap-2">
					<div class="flex justify-between items-center">
						<span class="text-xl font-bold">Logo</span>
						<div class="flex gap-2">
							<UButton icon="i-lucide-bell" variant="ghost" color="neutral" square />
							<UButton icon="i-lucide-user" variant="soft" color="neutral" square />
						</div>
					</div>
					<nav class="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
						<a href="#" class="hover:text-primary">Home</a>
						<span>/</span>
						<a href="#" class="hover:text-primary">Products</a>
						<span>/</span>
						<span class="text-gray-900 dark:text-white font-medium">Details</span>
					</nav>
				</div>
			</UHeader>
		`
	})
};

export const Transparent: Story = {
	render: () => ({
		components: { UButton, UHeader },
		template: `
			<div class="relative min-h-screen">
				<div class="absolute inset-0 bg-gradient-to-br from-primary-500 to-blue-600"></div>
				<UHeader class="relative bg-transparent border-none">
					<div class="flex justify-between items-center">
						<span class="text-xl font-bold text-white">Logo</span>
						<nav class="hidden md:flex gap-6">
							<a href="#" class="text-white/90 hover:text-white font-medium">Home</a>
							<a href="#" class="text-white/90 hover:text-white font-medium">Features</a>
							<a href="#" class="text-white/90 hover:text-white font-medium">About</a>
						</nav>
						<UButton label="Get Started" color="white" variant="solid" />
					</div>
				</UHeader>
				<div class="relative p-8 text-white">
					<h1 class="text-4xl font-bold mb-4">Hero Section</h1>
					<p class="text-xl text-white/90">Transparent header over hero content</p>
				</div>
			</div>
		`
	})
};

export const WithDropdowns: Story = {
	render: () => ({
		components: { UButton, UHeader },
		template: `
			<UHeader>
				<div class="flex justify-between items-center">
					<div class="flex items-center gap-8">
						<span class="text-xl font-bold">Logo</span>
						<nav class="hidden md:flex gap-6">
							<div class="relative group">
								<button class="flex items-center gap-1 text-gray-600 dark:text-gray-400 hover:text-primary font-medium">
									Products
									<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
									</svg>
								</button>
							</div>
							<div class="relative group">
								<button class="flex items-center gap-1 text-gray-600 dark:text-gray-400 hover:text-primary font-medium">
									Solutions
									<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
									</svg>
								</button>
							</div>
							<a href="#" class="text-gray-600 dark:text-gray-400 hover:text-primary font-medium">Pricing</a>
							<a href="#" class="text-gray-600 dark:text-gray-400 hover:text-primary font-medium">Docs</a>
						</nav>
					</div>
					<div class="flex gap-2">
						<UButton label="Sign In" variant="ghost" />
						<UButton label="Get Started" />
					</div>
				</div>
			</UHeader>
		`
	})
};
