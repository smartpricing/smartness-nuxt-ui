import type { Meta, StoryObj } from "@storybook/vue3";
import UApp from "@nuxt/ui/components/App.vue";
import UButton from "@nuxt/ui/components/Button.vue";
import UContainer from "@nuxt/ui/components/Container.vue";
import UFooter from "@nuxt/ui/components/Footer.vue";
import UHeader from "@nuxt/ui/components/Header.vue";
import UMain from "@nuxt/ui/components/Main.vue";

const meta = {
	title: "Layout/App",
	component: UApp,
	tags: ["autodocs"],
	parameters: {
		docs: {
			description: {
				component: "Wraps your app to provide global configurations and more."
			}
		}
	}
} satisfies Meta<typeof UApp>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => ({
		components: { UApp, UButton, UContainer, UFooter, UHeader, UMain },
		template: `
			<UApp>
				<UHeader>
					<div class="flex justify-between items-center p-4">
						<span class="text-xl font-bold">App Header</span>
					</div>
				</UHeader>
				<UMain>
					<div class="p-8">
						<h1 class="text-3xl font-bold mb-4">Main Content</h1>
						<p class="text-gray-600 dark:text-gray-300">Application content goes here.</p>
					</div>
				</UMain>
				<UFooter>
					<div class="p-4 text-center text-sm text-gray-600 dark:text-gray-400">
						© 2024 Company. All rights reserved.
					</div>
				</UFooter>
			</UApp>
		`
	})
};

export const WithHeader: Story = {
	render: () => ({
		components: { UApp, UButton, UHeader, UMain },
		template: `
			<UApp>
				<UHeader>
					<div class="flex justify-between items-center p-4">
						<div class="flex items-center gap-2">
							<span class="text-xl font-bold">Logo</span>
						</div>
						<div class="flex gap-2">
							<UButton label="Sign In" variant="ghost" />
							<UButton label="Sign Up" />
						</div>
					</div>
				</UHeader>
				<UMain>
					<div class="p-8">
						<h1 class="text-3xl font-bold mb-4">Welcome</h1>
						<p class="text-gray-600 dark:text-gray-300">This layout includes a header with navigation.</p>
					</div>
				</UMain>
			</UApp>
		`
	})
};

export const WithSidebar: Story = {
	render: () => ({
		components: { UApp, UFooter, UHeader, UMain },
		template: `
			<UApp>
				<UHeader>
					<div class="p-4">
						<span class="text-xl font-bold">Logo</span>
					</div>
				</UHeader>
				<div class="flex min-h-screen">
					<aside class="w-64 bg-gray-100 dark:bg-gray-800 p-4">
						<h3 class="font-bold mb-4">Sidebar</h3>
						<ul class="space-y-2">
							<li class="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded cursor-pointer">Dashboard</li>
							<li class="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded cursor-pointer">Settings</li>
							<li class="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded cursor-pointer">Profile</li>
						</ul>
					</aside>
					<UMain class="flex-1">
						<div class="p-8">
							<h1 class="text-3xl font-bold mb-4">Dashboard</h1>
							<p class="text-gray-600 dark:text-gray-300">Main content with sidebar navigation.</p>
						</div>
					</UMain>
				</div>
				<UFooter>
					<div class="p-4 text-center text-sm text-gray-600 dark:text-gray-400">
						© 2024 Company. All rights reserved.
					</div>
				</UFooter>
			</UApp>
		`
	})
};

export const FullLayout: Story = {
	render: () => ({
		components: { UApp, UButton, UContainer, UFooter, UHeader, UMain },
		template: `
			<UApp>
				<UHeader>
					<UContainer>
						<div class="flex justify-between items-center py-4">
							<span class="text-xl font-bold">Logo</span>
							<nav class="hidden md:flex gap-6">
								<a href="#" class="hover:text-primary">Home</a>
								<a href="#" class="hover:text-primary">About</a>
								<a href="#" class="hover:text-primary">Services</a>
								<a href="#" class="hover:text-primary">Contact</a>
							</nav>
							<UButton label="Get Started" />
						</div>
					</UContainer>
				</UHeader>

				<UMain>
					<UContainer class="py-12">
						<h1 class="text-4xl font-bold mb-6">Complete Page Layout</h1>
						<div class="grid md:grid-cols-3 gap-6 mb-8">
							<div class="p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
								<h3 class="font-bold mb-2">Feature 1</h3>
								<p class="text-gray-600 dark:text-gray-300">Description of the first feature.</p>
							</div>
							<div class="p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
								<h3 class="font-bold mb-2">Feature 2</h3>
								<p class="text-gray-600 dark:text-gray-300">Description of the second feature.</p>
							</div>
							<div class="p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
								<h3 class="font-bold mb-2">Feature 3</h3>
								<p class="text-gray-600 dark:text-gray-300">Description of the third feature.</p>
							</div>
						</div>
					</UContainer>
				</UMain>

				<UFooter>
					<UContainer>
						<div class="py-8">
							<div class="grid md:grid-cols-4 gap-8 mb-8">
								<div>
									<h4 class="font-bold mb-4">Product</h4>
									<ul class="space-y-2 text-sm text-gray-600 dark:text-gray-400">
										<li><a href="#" class="hover:text-primary">Features</a></li>
										<li><a href="#" class="hover:text-primary">Pricing</a></li>
										<li><a href="#" class="hover:text-primary">Security</a></li>
									</ul>
								</div>
								<div>
									<h4 class="font-bold mb-4">Company</h4>
									<ul class="space-y-2 text-sm text-gray-600 dark:text-gray-400">
										<li><a href="#" class="hover:text-primary">About</a></li>
										<li><a href="#" class="hover:text-primary">Blog</a></li>
										<li><a href="#" class="hover:text-primary">Careers</a></li>
									</ul>
								</div>
								<div>
									<h4 class="font-bold mb-4">Resources</h4>
									<ul class="space-y-2 text-sm text-gray-600 dark:text-gray-400">
										<li><a href="#" class="hover:text-primary">Documentation</a></li>
										<li><a href="#" class="hover:text-primary">Support</a></li>
										<li><a href="#" class="hover:text-primary">Community</a></li>
									</ul>
								</div>
								<div>
									<h4 class="font-bold mb-4">Legal</h4>
									<ul class="space-y-2 text-sm text-gray-600 dark:text-gray-400">
										<li><a href="#" class="hover:text-primary">Privacy</a></li>
										<li><a href="#" class="hover:text-primary">Terms</a></li>
										<li><a href="#" class="hover:text-primary">License</a></li>
									</ul>
								</div>
							</div>
							<div class="border-t border-gray-200 dark:border-gray-700 pt-8 text-center text-sm text-gray-600 dark:text-gray-400">
								© 2024 Company. All rights reserved.
							</div>
						</div>
					</UContainer>
				</UFooter>
			</UApp>
		`
	})
};
