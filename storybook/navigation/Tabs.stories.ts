import type { Meta, StoryObj } from "@storybook/vue3";
import UTabs from "@nuxt/ui/components/Tabs.vue";

const meta = {
	title: "Navigation/Tabs",
	component: UTabs,
	tags: ["autodocs"],
	parameters: {
		docs: {
			description: {
				component: "A tabs component for organizing content into separate views."
			}
		}
	},
	argTypes: {
		modelValue: {
			control: "text",
			description: "The value of the selected tab (v-model)"
		},
		items: {
			control: "object",
			description: "Array of tab items"
		},
		orientation: {
			control: "select",
			options: ["horizontal", "vertical"],
			description: "Orientation of the tabs",
			table: {
				defaultValue: { summary: "horizontal" }
			}
		},
		color: {
			control: "select",
			options: ["primary", "secondary", "success", "warning", "error", "neutral"],
			description: "Color of the active tab indicator",
			table: {
				defaultValue: { summary: "primary" }
			}
		}
	}
} satisfies Meta<typeof UTabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => ({
		components: { UTabs },
		setup() {
			return {
				selectedTab: "overview",
				items: [
					{ value: "overview", label: "Overview" },
					{ value: "analytics", label: "Analytics" },
					{ value: "reports", label: "Reports" },
					{ value: "settings", label: "Settings" }
				]
			};
		},
		template: `
			<div class="space-y-4">
				<UTabs v-model="selectedTab" :items="items" />
				<div class="p-6 bg-gray-50 dark:bg-gray-900 rounded-lg">
					<div v-if="selectedTab === 'overview'">
						<h3 class="text-lg font-bold mb-2">Overview</h3>
						<p class="text-gray-600 dark:text-gray-400">Overview content goes here.</p>
					</div>
					<div v-if="selectedTab === 'analytics'">
						<h3 class="text-lg font-bold mb-2">Analytics</h3>
						<p class="text-gray-600 dark:text-gray-400">Analytics content goes here.</p>
					</div>
					<div v-if="selectedTab === 'reports'">
						<h3 class="text-lg font-bold mb-2">Reports</h3>
						<p class="text-gray-600 dark:text-gray-400">Reports content goes here.</p>
					</div>
					<div v-if="selectedTab === 'settings'">
						<h3 class="text-lg font-bold mb-2">Settings</h3>
						<p class="text-gray-600 dark:text-gray-400">Settings content goes here.</p>
					</div>
				</div>
			</div>
		`
	})
};

export const Vertical: Story = {
	render: () => ({
		components: { UTabs },
		setup() {
			return {
				selectedTab: "account",
				items: [
					{ value: "account", label: "Account" },
					{ value: "profile", label: "Profile" },
					{ value: "security", label: "Security" },
					{ value: "notifications", label: "Notifications" }
				]
			};
		},
		template: `
			<div class="grid md:grid-cols-[200px_1fr] gap-6">
				<UTabs v-model="selectedTab" :items="items" orientation="vertical" />
				<div class="p-6 bg-gray-50 dark:bg-gray-900 rounded-lg">
					<div v-if="selectedTab === 'account'">
						<h3 class="text-lg font-bold mb-2">Account Settings</h3>
						<p class="text-gray-600 dark:text-gray-400">Manage your account settings and preferences.</p>
					</div>
					<div v-if="selectedTab === 'profile'">
						<h3 class="text-lg font-bold mb-2">Profile Settings</h3>
						<p class="text-gray-600 dark:text-gray-400">Update your profile information.</p>
					</div>
					<div v-if="selectedTab === 'security'">
						<h3 class="text-lg font-bold mb-2">Security Settings</h3>
						<p class="text-gray-600 dark:text-gray-400">Configure security and privacy options.</p>
					</div>
					<div v-if="selectedTab === 'notifications'">
						<h3 class="text-lg font-bold mb-2">Notification Settings</h3>
						<p class="text-gray-600 dark:text-gray-400">Manage your notification preferences.</p>
					</div>
				</div>
			</div>
		`
	})
};

export const WithIcons: Story = {
	render: () => ({
		components: { UTabs },
		setup() {
			return {
				selectedTab: "home",
				items: [
					{ value: "home", label: "Home", icon: "i-lucide-home" },
					{ value: "profile", label: "Profile", icon: "i-lucide-user" },
					{ value: "settings", label: "Settings", icon: "i-lucide-settings" },
					{ value: "messages", label: "Messages", icon: "i-lucide-mail" }
				]
			};
		},
		template: `
			<div class="space-y-4">
				<UTabs v-model="selectedTab" :items="items" />
				<div class="p-6 bg-gray-50 dark:bg-gray-900 rounded-lg">
					<div v-if="selectedTab === 'home'">
						<h3 class="text-lg font-bold mb-2">Home</h3>
						<p class="text-gray-600 dark:text-gray-400">Welcome to your dashboard.</p>
					</div>
					<div v-if="selectedTab === 'profile'">
						<h3 class="text-lg font-bold mb-2">Profile</h3>
						<p class="text-gray-600 dark:text-gray-400">View and edit your profile.</p>
					</div>
					<div v-if="selectedTab === 'settings'">
						<h3 class="text-lg font-bold mb-2">Settings</h3>
						<p class="text-gray-600 dark:text-gray-400">Configure your preferences.</p>
					</div>
					<div v-if="selectedTab === 'messages'">
						<h3 class="text-lg font-bold mb-2">Messages</h3>
						<p class="text-gray-600 dark:text-gray-400">Check your messages.</p>
					</div>
				</div>
			</div>
		`
	})
};

export const WithBadges: Story = {
	render: () => ({
		components: { UTabs },
		setup() {
			return {
				selectedTab: "all",
				items: [
					{ value: "all", label: "All", badge: "24" },
					{ value: "unread", label: "Unread", badge: "5" },
					{ value: "archived", label: "Archived", badge: "12" },
					{ value: "trash", label: "Trash", badge: "7" }
				]
			};
		},
		template: `
			<div class="space-y-4">
				<UTabs v-model="selectedTab" :items="items" />
				<div class="p-6 bg-gray-50 dark:bg-gray-900 rounded-lg">
					<div v-if="selectedTab === 'all'">
						<h3 class="text-lg font-bold mb-2">All Messages (24)</h3>
						<p class="text-gray-600 dark:text-gray-400">Showing all messages.</p>
					</div>
					<div v-if="selectedTab === 'unread'">
						<h3 class="text-lg font-bold mb-2">Unread Messages (5)</h3>
						<p class="text-gray-600 dark:text-gray-400">You have 5 unread messages.</p>
					</div>
					<div v-if="selectedTab === 'archived'">
						<h3 class="text-lg font-bold mb-2">Archived Messages (12)</h3>
						<p class="text-gray-600 dark:text-gray-400">Showing archived messages.</p>
					</div>
					<div v-if="selectedTab === 'trash'">
						<h3 class="text-lg font-bold mb-2">Trash (7)</h3>
						<p class="text-gray-600 dark:text-gray-400">Messages in trash.</p>
					</div>
				</div>
			</div>
		`
	})
};

export const WithContent: Story = {
	render: () => ({
		components: { UTabs },
		setup() {
			return {
				selectedTab: "code",
				items: [
					{ value: "preview", label: "Preview" },
					{ value: "code", label: "Code" },
					{ value: "props", label: "Props" }
				]
			};
		},
		template: `
			<div class="space-y-4">
				<UTabs v-model="selectedTab" :items="items" />
				<div class="p-6 bg-gray-50 dark:bg-gray-900 rounded-lg">
					<div v-if="selectedTab === 'preview'">
						<h3 class="text-lg font-bold mb-4">Component Preview</h3>
						<div class="p-4 bg-white dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-700">
							<button class="px-4 py-2 bg-primary text-white rounded">Sample Button</button>
						</div>
					</div>
					<div v-if="selectedTab === 'code'">
						<h3 class="text-lg font-bold mb-4">Code Example</h3>
						<pre class="p-4 bg-gray-800 text-gray-100 rounded overflow-x-auto text-sm"><code>&lt;template&gt;
  &lt;button class="px-4 py-2 bg-primary text-white rounded"&gt;
    Sample Button
  &lt;/button&gt;
&lt;/template&gt;</code></pre>
					</div>
					<div v-if="selectedTab === 'props'">
						<h3 class="text-lg font-bold mb-4">Component Props</h3>
						<table class="w-full text-sm">
							<thead>
								<tr class="border-b border-gray-200 dark:border-gray-700">
									<th class="text-left py-2">Prop</th>
									<th class="text-left py-2">Type</th>
									<th class="text-left py-2">Default</th>
								</tr>
							</thead>
							<tbody class="text-gray-600 dark:text-gray-400">
								<tr class="border-b border-gray-200 dark:border-gray-700">
									<td class="py-2">label</td>
									<td class="py-2">string</td>
									<td class="py-2">-</td>
								</tr>
								<tr class="border-b border-gray-200 dark:border-gray-700">
									<td class="py-2">disabled</td>
									<td class="py-2">boolean</td>
									<td class="py-2">false</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
		`
	})
};

export const LazyLoading: Story = {
	render: () => ({
		components: { UTabs },
		setup() {
			return {
				selectedTab: "tab1",
				items: [
					{ value: "tab1", label: "Tab 1" },
					{ value: "tab2", label: "Tab 2" },
					{ value: "tab3", label: "Tab 3" },
					{ value: "tab4", label: "Tab 4" }
				],
				loadedTabs: { tab1: true }
			};
		},
		template: `
			<div class="space-y-4">
				<UTabs v-model="selectedTab" :items="items" @update:model-value="(val) => loadedTabs[val] = true" />
				<div class="p-6 bg-gray-50 dark:bg-gray-900 rounded-lg">
					<div v-if="selectedTab === 'tab1'">
						<h3 class="text-lg font-bold mb-2">Tab 1 Content</h3>
						<p class="text-gray-600 dark:text-gray-400">This content is always loaded.</p>
					</div>
					<div v-if="selectedTab === 'tab2'">
						<h3 class="text-lg font-bold mb-2">Tab 2 Content</h3>
						<p class="text-gray-600 dark:text-gray-400" v-if="loadedTabs.tab2">
							This content was lazily loaded when you first clicked this tab.
						</p>
					</div>
					<div v-if="selectedTab === 'tab3'">
						<h3 class="text-lg font-bold mb-2">Tab 3 Content</h3>
						<p class="text-gray-600 dark:text-gray-400" v-if="loadedTabs.tab3">
							This content was lazily loaded when you first clicked this tab.
						</p>
					</div>
					<div v-if="selectedTab === 'tab4'">
						<h3 class="text-lg font-bold mb-2">Tab 4 Content</h3>
						<p class="text-gray-600 dark:text-gray-400" v-if="loadedTabs.tab4">
							This content was lazily loaded when you first clicked this tab.
						</p>
					</div>
				</div>
				<div class="text-xs text-gray-500 dark:text-gray-500">
					Loaded tabs: {{ Object.keys(loadedTabs).join(', ') }}
				</div>
			</div>
		`
	})
};

export const Colors: Story = {
	render: () => ({
		components: { UTabs },
		setup() {
			return {
				selectedTab: "tab1",
				items: [
					{ value: "tab1", label: "Tab 1" },
					{ value: "tab2", label: "Tab 2" },
					{ value: "tab3", label: "Tab 3" }
				]
			};
		},
		template: `
			<div class="space-y-8">
				<div>
					<p class="text-sm text-gray-600 dark:text-gray-400 mb-2">Primary</p>
					<UTabs v-model="selectedTab" :items="items" color="primary" />
				</div>
				<div>
					<p class="text-sm text-gray-600 dark:text-gray-400 mb-2">Success</p>
					<UTabs v-model="selectedTab" :items="items" color="success" />
				</div>
				<div>
					<p class="text-sm text-gray-600 dark:text-gray-400 mb-2">Warning</p>
					<UTabs v-model="selectedTab" :items="items" color="warning" />
				</div>
				<div>
					<p class="text-sm text-gray-600 dark:text-gray-400 mb-2">Error</p>
					<UTabs v-model="selectedTab" :items="items" color="error" />
				</div>
			</div>
		`
	})
};

export const Disabled: Story = {
	render: () => ({
		components: { UTabs },
		setup() {
			return {
				selectedTab: "tab1",
				items: [
					{ value: "tab1", label: "Active Tab" },
					{ value: "tab2", label: "Disabled Tab", disabled: true },
					{ value: "tab3", label: "Another Tab" },
					{ value: "tab4", label: "Also Disabled", disabled: true }
				]
			};
		},
		template: `
			<div class="space-y-4">
				<UTabs v-model="selectedTab" :items="items" />
				<div class="p-6 bg-gray-50 dark:bg-gray-900 rounded-lg">
					<p class="text-gray-600 dark:text-gray-400">
						Some tabs are disabled and cannot be selected.
					</p>
				</div>
			</div>
		`
	})
};
