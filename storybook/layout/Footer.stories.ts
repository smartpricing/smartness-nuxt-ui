import type { Meta, StoryObj } from "@storybook/vue3"
import UButton from "@nuxt/ui/components/Button.vue"
import UContainer from "@nuxt/ui/components/Container.vue"
import UFooter from "@nuxt/ui/components/Footer.vue"

const meta = {
	title: "Layout/Footer",
	component: UFooter,
	tags: ["autodocs"],
	parameters: {
		docs: {
			description: {
				component: "A responsive footer component.",
			},
		},
	},
	argTypes: {
		as: {
			control: "text",
			description: "The element or component this component should render as",
			table: {
				defaultValue: { summary: "footer" },
			},
		},
	},
} satisfies Meta<typeof UFooter>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
	render: () => ({
		components: { UContainer, UFooter },
		template: `
			<UFooter>
				<UContainer>
					<div class="flex flex-col sm:flex-row justify-between items-center gap-4 py-6">
						<p class="text-sm text-gray-600 dark:text-gray-400">
							© 2024 Company Name. All rights reserved.
						</p>
						<div class="flex gap-6 text-sm">
							<a href="#" class="text-gray-600 dark:text-gray-400 hover:text-primary">Privacy</a>
							<a href="#" class="text-gray-600 dark:text-gray-400 hover:text-primary">Terms</a>
							<a href="#" class="text-gray-600 dark:text-gray-400 hover:text-primary">Contact</a>
						</div>
					</div>
				</UContainer>
			</UFooter>
		`,
	}),
}

export const WithLinks: Story = {
	render: () => ({
		components: { UContainer, UFooter },
		template: `
			<UFooter>
				<UContainer>
					<div class="py-8">
						<div class="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
							<div>
								<h3 class="font-semibold mb-4">Product</h3>
								<ul class="space-y-2 text-sm text-gray-600 dark:text-gray-400">
									<li><a href="#" class="hover:text-primary">Features</a></li>
									<li><a href="#" class="hover:text-primary">Pricing</a></li>
									<li><a href="#" class="hover:text-primary">Security</a></li>
									<li><a href="#" class="hover:text-primary">Enterprise</a></li>
								</ul>
							</div>
							<div>
								<h3 class="font-semibold mb-4">Company</h3>
								<ul class="space-y-2 text-sm text-gray-600 dark:text-gray-400">
									<li><a href="#" class="hover:text-primary">About</a></li>
									<li><a href="#" class="hover:text-primary">Blog</a></li>
									<li><a href="#" class="hover:text-primary">Careers</a></li>
									<li><a href="#" class="hover:text-primary">Press</a></li>
								</ul>
							</div>
							<div>
								<h3 class="font-semibold mb-4">Resources</h3>
								<ul class="space-y-2 text-sm text-gray-600 dark:text-gray-400">
									<li><a href="#" class="hover:text-primary">Documentation</a></li>
									<li><a href="#" class="hover:text-primary">Help Center</a></li>
									<li><a href="#" class="hover:text-primary">Community</a></li>
									<li><a href="#" class="hover:text-primary">Guides</a></li>
								</ul>
							</div>
							<div>
								<h3 class="font-semibold mb-4">Legal</h3>
								<ul class="space-y-2 text-sm text-gray-600 dark:text-gray-400">
									<li><a href="#" class="hover:text-primary">Privacy</a></li>
									<li><a href="#" class="hover:text-primary">Terms</a></li>
									<li><a href="#" class="hover:text-primary">License</a></li>
									<li><a href="#" class="hover:text-primary">Cookies</a></li>
								</ul>
							</div>
						</div>
						<div class="border-t border-gray-200 dark:border-gray-700 pt-6 text-center text-sm text-gray-600 dark:text-gray-400">
							© 2024 Company Name. All rights reserved.
						</div>
					</div>
				</UContainer>
			</UFooter>
		`,
	}),
}

export const WithSocial: Story = {
	render: () => ({
		components: { UButton, UContainer, UFooter },
		template: `
			<UFooter>
				<UContainer>
					<div class="py-8">
						<div class="flex flex-col md:flex-row justify-between items-center gap-6">
							<div class="text-center md:text-left">
								<h3 class="text-xl font-bold mb-2">Company Name</h3>
								<p class="text-sm text-gray-600 dark:text-gray-400">
									Building amazing products since 2024
								</p>
							</div>
							<div class="flex gap-3">
								<UButton icon="i-lucide-github" variant="ghost" color="neutral" square />
								<UButton icon="i-lucide-twitter" variant="ghost" color="neutral" square />
								<UButton icon="i-lucide-linkedin" variant="ghost" color="neutral" square />
								<UButton icon="i-lucide-youtube" variant="ghost" color="neutral" square />
							</div>
						</div>
						<div class="border-t border-gray-200 dark:border-gray-700 mt-8 pt-6 text-center text-sm text-gray-600 dark:text-gray-400">
							© 2024 Company Name. All rights reserved.
						</div>
					</div>
				</UContainer>
			</UFooter>
		`,
	}),
}

export const WithColumns: Story = {
	render: () => ({
		components: { UButton, UContainer, UFooter },
		template: `
			<UFooter>
				<UContainer>
					<div class="py-12">
						<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
							<div class="lg:col-span-2">
								<h3 class="text-2xl font-bold mb-3">Company Name</h3>
								<p class="text-gray-600 dark:text-gray-400 mb-4">
									Making the world a better place through quality software.
								</p>
								<div class="flex gap-2">
									<UButton icon="i-lucide-github" variant="soft" color="neutral" size="sm" square />
									<UButton icon="i-lucide-twitter" variant="soft" color="neutral" size="sm" square />
									<UButton icon="i-lucide-linkedin" variant="soft" color="neutral" size="sm" square />
								</div>
							</div>
							<div>
								<h4 class="font-semibold mb-4">Product</h4>
								<ul class="space-y-3 text-sm text-gray-600 dark:text-gray-400">
									<li><a href="#" class="hover:text-primary">Features</a></li>
									<li><a href="#" class="hover:text-primary">Pricing</a></li>
									<li><a href="#" class="hover:text-primary">Integrations</a></li>
									<li><a href="#" class="hover:text-primary">Changelog</a></li>
								</ul>
							</div>
							<div>
								<h4 class="font-semibold mb-4">Company</h4>
								<ul class="space-y-3 text-sm text-gray-600 dark:text-gray-400">
									<li><a href="#" class="hover:text-primary">About</a></li>
									<li><a href="#" class="hover:text-primary">Blog</a></li>
									<li><a href="#" class="hover:text-primary">Careers</a></li>
									<li><a href="#" class="hover:text-primary">Contact</a></li>
								</ul>
							</div>
							<div>
								<h4 class="font-semibold mb-4">Support</h4>
								<ul class="space-y-3 text-sm text-gray-600 dark:text-gray-400">
									<li><a href="#" class="hover:text-primary">Documentation</a></li>
									<li><a href="#" class="hover:text-primary">Help Center</a></li>
									<li><a href="#" class="hover:text-primary">Community</a></li>
									<li><a href="#" class="hover:text-primary">Status</a></li>
								</ul>
							</div>
						</div>
						<div class="border-t border-gray-200 dark:border-gray-700 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
							<p>© 2024 Company Name. All rights reserved.</p>
							<div class="flex gap-6">
								<a href="#" class="hover:text-primary">Privacy Policy</a>
								<a href="#" class="hover:text-primary">Terms of Service</a>
							</div>
						</div>
					</div>
				</UContainer>
			</UFooter>
		`,
	}),
}

export const Minimal: Story = {
	render: () => ({
		components: { UContainer, UFooter },
		template: `
			<UFooter>
				<UContainer>
					<div class="py-4 text-center text-sm text-gray-600 dark:text-gray-400">
						© 2024 Company Name
					</div>
				</UContainer>
			</UFooter>
		`,
	}),
}

export const WithTopSection: Story = {
	render: () => ({
		components: { UButton, UContainer, UFooter },
		template: `
			<UFooter>
				<template #top>
					<div class="bg-primary-50 dark:bg-primary-900/20">
						<UContainer>
							<div class="py-12 text-center">
								<h2 class="text-3xl font-bold mb-4">Ready to get started?</h2>
								<p class="text-gray-600 dark:text-gray-400 mb-6 max-w-2xl mx-auto">
									Join thousands of users already using our platform to build amazing things.
								</p>
								<div class="flex gap-4 justify-center">
									<UButton label="Get Started" size="lg" />
									<UButton label="Learn More" variant="outline" size="lg" />
								</div>
							</div>
						</UContainer>
					</div>
				</template>

				<UContainer>
					<div class="py-8">
						<div class="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
							<div>
								<h3 class="font-semibold mb-4">Product</h3>
								<ul class="space-y-2 text-sm text-gray-600 dark:text-gray-400">
									<li><a href="#" class="hover:text-primary">Features</a></li>
									<li><a href="#" class="hover:text-primary">Pricing</a></li>
								</ul>
							</div>
							<div>
								<h3 class="font-semibold mb-4">Company</h3>
								<ul class="space-y-2 text-sm text-gray-600 dark:text-gray-400">
									<li><a href="#" class="hover:text-primary">About</a></li>
									<li><a href="#" class="hover:text-primary">Blog</a></li>
								</ul>
							</div>
							<div>
								<h3 class="font-semibold mb-4">Resources</h3>
								<ul class="space-y-2 text-sm text-gray-600 dark:text-gray-400">
									<li><a href="#" class="hover:text-primary">Docs</a></li>
									<li><a href="#" class="hover:text-primary">Help</a></li>
								</ul>
							</div>
							<div>
								<h3 class="font-semibold mb-4">Legal</h3>
								<ul class="space-y-2 text-sm text-gray-600 dark:text-gray-400">
									<li><a href="#" class="hover:text-primary">Privacy</a></li>
									<li><a href="#" class="hover:text-primary">Terms</a></li>
								</ul>
							</div>
						</div>
						<div class="border-t border-gray-200 dark:border-gray-700 pt-6 text-center text-sm text-gray-600 dark:text-gray-400">
							© 2024 Company Name. All rights reserved.
						</div>
					</div>
				</UContainer>
			</UFooter>
		`,
	}),
}

export const WithSlots: Story = {
	render: () => ({
		components: { UButton, UContainer, UFooter },
		template: `
			<UFooter>
				<UContainer>
					<div class="py-8">
						<div class="flex flex-col md:flex-row justify-between items-center gap-6">
							<template #left>
								<div class="text-sm text-gray-600 dark:text-gray-400">
									© 2024 Company Name
								</div>
							</template>

							<template #default>
								<div class="flex gap-6 text-sm">
									<a href="#" class="text-gray-600 dark:text-gray-400 hover:text-primary">About</a>
									<a href="#" class="text-gray-600 dark:text-gray-400 hover:text-primary">Blog</a>
									<a href="#" class="text-gray-600 dark:text-gray-400 hover:text-primary">Docs</a>
								</div>
							</template>

							<template #right>
								<div class="flex gap-2">
									<UButton icon="i-lucide-github" variant="ghost" color="neutral" size="sm" square />
									<UButton icon="i-lucide-twitter" variant="ghost" color="neutral" size="sm" square />
								</div>
							</template>
						</div>
					</div>
				</UContainer>
			</UFooter>
		`,
	}),
}
