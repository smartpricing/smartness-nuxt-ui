import type { Meta, StoryObj } from "@storybook/vue3";
import UContainer from "@nuxt/ui/components/Container.vue";
import UFooter from "@nuxt/ui/components/Footer.vue";
import UHeader from "@nuxt/ui/components/Header.vue";
import UMain from "@nuxt/ui/components/Main.vue";

const meta = {
	title: "Layout/Main",
	component: UMain,
	tags: ["autodocs"],
	parameters: {
		docs: {
			description: {
				component: "A main element that fills the available viewport height."
			}
		}
	},
	argTypes: {
		as: {
			control: "text",
			description: "The element or component this component should render as",
			table: {
				defaultValue: { summary: "main" }
			}
		}
	}
} satisfies Meta<typeof UMain>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => ({
		components: { UMain },
		template: `
			<UMain>
				<div class="p-8">
					<h1 class="text-3xl font-bold mb-4">Page Title</h1>
					<p class="text-gray-600 dark:text-gray-300 mb-4">
						Main content area for your application.
					</p>
					<p class="text-gray-600 dark:text-gray-300">
						The UMain component automatically fills the available viewport height,
						making it perfect for creating full-height layouts.
					</p>
				</div>
			</UMain>
		`
	})
};

export const WithContainer: Story = {
	render: () => ({
		components: { UContainer, UMain },
		template: `
			<UMain>
				<UContainer class="py-12">
					<h1 class="text-4xl font-bold mb-6">Welcome</h1>
					<p class="text-lg text-gray-600 dark:text-gray-300 mb-8">
						Combining UMain with UContainer centers and constrains your content width.
					</p>
					<div class="grid md:grid-cols-3 gap-6">
						<div class="p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
							<h3 class="font-bold mb-2">Feature 1</h3>
							<p class="text-gray-600 dark:text-gray-400">Description of feature</p>
						</div>
						<div class="p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
							<h3 class="font-bold mb-2">Feature 2</h3>
							<p class="text-gray-600 dark:text-gray-400">Description of feature</p>
						</div>
						<div class="p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
							<h3 class="font-bold mb-2">Feature 3</h3>
							<p class="text-gray-600 dark:text-gray-400">Description of feature</p>
						</div>
					</div>
				</UContainer>
			</UMain>
		`
	})
};

export const WithSidebar: Story = {
	render: () => ({
		components: { UMain },
		template: `
			<div class="flex min-h-screen">
				<aside class="w-64 bg-gray-100 dark:bg-gray-800 p-6">
					<h3 class="font-bold mb-4 text-lg">Sidebar</h3>
					<nav class="space-y-2">
						<a href="#" class="block px-4 py-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700">Dashboard</a>
						<a href="#" class="block px-4 py-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700">Projects</a>
						<a href="#" class="block px-4 py-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700">Settings</a>
						<a href="#" class="block px-4 py-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700">Profile</a>
					</nav>
				</aside>
				<UMain class="flex-1">
					<div class="p-8">
						<h1 class="text-3xl font-bold mb-4">Dashboard</h1>
						<p class="text-gray-600 dark:text-gray-300 mb-6">
							Main content with sidebar navigation.
						</p>
						<div class="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
							<div class="p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
								<div class="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Users</div>
								<div class="text-2xl font-bold">1,234</div>
							</div>
							<div class="p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
								<div class="text-sm text-gray-600 dark:text-gray-400 mb-1">Revenue</div>
								<div class="text-2xl font-bold">$12,345</div>
							</div>
							<div class="p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
								<div class="text-sm text-gray-600 dark:text-gray-400 mb-1">Active Projects</div>
								<div class="text-2xl font-bold">42</div>
							</div>
						</div>
					</div>
				</UMain>
			</div>
		`
	})
};

export const FullHeight: Story = {
	render: () => ({
		components: { UFooter, UHeader, UMain },
		template: `
			<div class="min-h-screen flex flex-col">
				<UHeader>
					<div class="p-4">
						<span class="text-xl font-bold">Logo</span>
					</div>
				</UHeader>

				<UMain class="flex-1 flex items-center justify-center">
					<div class="text-center">
						<h1 class="text-5xl font-bold mb-4">Full Height Layout</h1>
						<p class="text-xl text-gray-600 dark:text-gray-300">
							Main content is centered vertically
						</p>
					</div>
				</UMain>

				<UFooter>
					<div class="p-4 text-center text-sm text-gray-600 dark:text-gray-400">
						© 2024 Company. All rights reserved.
					</div>
				</UFooter>
			</div>
		`
	})
};

export const Scrollable: Story = {
	render: () => ({
		components: { UFooter, UHeader, UMain },
		template: `
			<div class="min-h-screen flex flex-col">
				<UHeader>
					<div class="p-4">
						<span class="text-xl font-bold">Logo</span>
					</div>
				</UHeader>

				<UMain class="flex-1 overflow-y-auto">
					<div class="p-8 space-y-8">
						<section>
							<h1 class="text-3xl font-bold mb-4">Scrollable Content</h1>
							<p class="text-gray-600 dark:text-gray-300">
								This main area has a lot of content that requires scrolling.
							</p>
						</section>

						<section v-for="i in 20" :key="i" class="p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
							<h2 class="text-xl font-bold mb-2">Section {{ i }}</h2>
							<p class="text-gray-600 dark:text-gray-300">
								Lorem ipsum dolor sit amet, consectetur adipiscing elit.
								Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
							</p>
						</section>
					</div>
				</UMain>

				<UFooter>
					<div class="p-4 text-center text-sm text-gray-600 dark:text-gray-400">
						© 2024 Company. All rights reserved.
					</div>
				</UFooter>
			</div>
		`
	})
};

export const WithGrid: Story = {
	render: () => ({
		components: { UContainer, UMain },
		template: `
			<UMain>
				<UContainer class="py-12">
					<h1 class="text-4xl font-bold mb-8">Grid Layout</h1>
					<div class="grid lg:grid-cols-12 gap-6">
						<div class="lg:col-span-8">
							<div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-6">
								<h2 class="text-2xl font-bold mb-4">Main Content</h2>
								<p class="text-gray-600 dark:text-gray-300 mb-4">
									This is the primary content area that takes up most of the width.
								</p>
								<p class="text-gray-600 dark:text-gray-300">
									Perfect for blog posts, articles, or main application content.
								</p>
							</div>
							<div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
								<h3 class="font-bold mb-2">Additional Content</h3>
								<p class="text-gray-600 dark:text-gray-300">
									More content in the main column.
								</p>
							</div>
						</div>

						<div class="lg:col-span-4">
							<div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-6">
								<h3 class="font-bold mb-4">Sidebar</h3>
								<ul class="space-y-2 text-sm">
									<li class="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">Item 1</li>
									<li class="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">Item 2</li>
									<li class="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">Item 3</li>
								</ul>
							</div>
							<div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
								<h3 class="font-bold mb-2">Widget</h3>
								<p class="text-sm text-gray-600 dark:text-gray-400">
									Additional sidebar content.
								</p>
							</div>
						</div>
					</div>
				</UContainer>
			</UMain>
		`
	})
};

export const AsArticle: Story = {
	args: {
		as: "article"
	},
	render: (args) => ({
		components: { UContainer, UMain },
		setup() {
			return { args };
		},
		template: `
			<UMain v-bind="args">
				<UContainer class="py-12 max-w-3xl">
					<h1 class="text-4xl font-bold mb-4">Article Title</h1>
					<div class="text-sm text-gray-600 dark:text-gray-400 mb-8">
						Published on January 1, 2024 by Author Name
					</div>
					<div class="prose dark:prose-invert max-w-none">
						<p class="text-lg mb-4">
							This main component is rendered as an &lt;article&gt; element,
							which is semantically appropriate for article content.
						</p>
						<p class="mb-4">
							Lorem ipsum dolor sit amet, consectetur adipiscing elit.
							Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
						</p>
						<h2 class="text-2xl font-bold mt-8 mb-4">Section Heading</h2>
						<p class="mb-4">
							More article content here with proper semantic HTML structure.
						</p>
					</div>
				</UContainer>
			</UMain>
		`
	})
};

export const WithTabs: Story = {
	render: () => ({
		components: { UContainer, UMain },
		template: `
			<UMain>
				<UContainer class="py-8">
					<div class="border-b border-gray-200 dark:border-gray-700 mb-6">
						<nav class="flex gap-8">
							<button class="pb-4 border-b-2 border-primary font-medium text-primary">
								Overview
							</button>
							<button class="pb-4 border-b-2 border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
								Analytics
							</button>
							<button class="pb-4 border-b-2 border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
								Settings
							</button>
						</nav>
					</div>

					<div>
						<h2 class="text-2xl font-bold mb-4">Overview</h2>
						<div class="grid md:grid-cols-3 gap-6">
							<div class="p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
								<div class="text-sm text-gray-600 dark:text-gray-400 mb-1">Metric 1</div>
								<div class="text-3xl font-bold">123</div>
							</div>
							<div class="p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
								<div class="text-sm text-gray-600 dark:text-gray-400 mb-1">Metric 2</div>
								<div class="text-3xl font-bold">456</div>
							</div>
							<div class="p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
								<div class="text-sm text-gray-600 dark:text-gray-400 mb-1">Metric 3</div>
								<div class="text-3xl font-bold">789</div>
							</div>
						</div>
					</div>
				</UContainer>
			</UMain>
		`
	})
};
