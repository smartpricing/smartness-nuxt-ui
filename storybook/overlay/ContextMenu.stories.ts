import type { ContextMenuProps } from "@nuxt/ui";
import type { Meta, StoryObj } from "@storybook/vue3";
import UContextMenu from "@nuxt/ui/components/ContextMenu.vue";

const meta = {
	title: "Overlay/ContextMenu",
	component: UContextMenu,
	tags: ["autodocs"],
	parameters: {
		docs: {
			description: {
				component: "A context menu component triggered by right-clicking on an element."
			}
		}
	}
} satisfies Meta<ContextMenuProps>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => ({
		components: { UContextMenu },
		setup() {
			return {
				items: [
					[
						{ label: "Cut", icon: "i-lucide-scissors", shortcut: "⌘X" },
						{ label: "Copy", icon: "i-lucide-copy", shortcut: "⌘C" },
						{ label: "Paste", icon: "i-lucide-clipboard", shortcut: "⌘V" },
					],
				],
			};
		},
		template: `
			<UContextMenu :items="items">
				<div class="p-8 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg text-center cursor-context-menu">
					<p class="text-gray-600 dark:text-gray-400">Right-click here to see the context menu</p>
				</div>
			</UContextMenu>
		`,
	}),
};

export const WithSubmenus: Story = {
	render: () => ({
		components: { UContextMenu },
		setup() {
			return {
				items: [
					[
						{ label: "New File", icon: "i-lucide-file-plus" },
						{
							label: "New Folder",
							icon: "i-lucide-folder-plus",
							children: [
								[
									{ label: "Empty Folder", icon: "i-lucide-folder" },
									{ label: "From Template", icon: "i-lucide-file-text" },
								],
							],
						},
					],
					[
						{ label: "Open", icon: "i-lucide-folder-open", shortcut: "⌘O" },
						{ label: "Save", icon: "i-lucide-save", shortcut: "⌘S" },
					],
					[
						{ label: "Properties", icon: "i-lucide-settings" },
					],
				],
			};
		},
		template: `
			<UContextMenu :items="items">
				<div class="p-8 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg text-center cursor-context-menu">
					<p class="text-gray-600 dark:text-gray-400">Right-click to see submenu</p>
				</div>
			</UContextMenu>
		`,
	}),
};

export const OnCard: Story = {
	render: () => ({
		components: { UContextMenu },
		setup() {
			return {
				items: [
					[
						{ label: "View Details", icon: "i-lucide-eye" },
						{ label: "Edit", icon: "i-lucide-pencil", shortcut: "⌘E" },
						{ label: "Duplicate", icon: "i-lucide-copy", shortcut: "⌘D" },
					],
					[
						{ label: "Share", icon: "i-lucide-share-2" },
						{ label: "Download", icon: "i-lucide-download" },
					],
					[
						{ label: "Delete", icon: "i-lucide-trash-2", shortcut: "⌫" },
					],
				],
			};
		},
		template: `
			<UContextMenu :items="items">
				<div class="p-6 bg-white dark:bg-gray-800 rounded-lg shadow cursor-context-menu">
					<h3 class="text-lg font-bold mb-2">Project Card</h3>
					<p class="text-gray-600 dark:text-gray-400 mb-4">
						Right-click on this card to see available actions.
					</p>
					<div class="flex gap-2 text-sm text-gray-500 dark:text-gray-500">
						<span>Updated 2 hours ago</span>
					</div>
				</div>
			</UContextMenu>
		`,
	}),
};

export const OnImage: Story = {
	render: () => ({
		components: { UContextMenu },
		setup() {
			return {
				items: [
					[
						{ label: "View Full Size", icon: "i-lucide-maximize" },
						{ label: "Copy Image", icon: "i-lucide-copy" },
					],
					[
						{ label: "Save Image As...", icon: "i-lucide-download" },
						{ label: "Copy Image URL", icon: "i-lucide-link" },
					],
					[
						{ label: "Set as Avatar", icon: "i-lucide-user" },
					],
				],
			};
		},
		template: `
			<UContextMenu :items="items">
				<div class="w-64 h-64 bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg flex items-center justify-center cursor-context-menu">
					<p class="text-white font-bold">Right-click this image</p>
				</div>
			</UContextMenu>
		`,
	}),
};

export const OnText: Story = {
	render: () => ({
		components: { UContextMenu },
		setup() {
			return {
				items: [
					[
						{ label: "Cut", icon: "i-lucide-scissors", shortcut: "⌘X" },
						{ label: "Copy", icon: "i-lucide-copy", shortcut: "⌘C" },
						{ label: "Paste", icon: "i-lucide-clipboard", shortcut: "⌘V" },
					],
					[
						{ label: "Select All", icon: "i-lucide-select-all", shortcut: "⌘A" },
					],
					[
						{ label: "Search", icon: "i-lucide-search", shortcut: "⌘F" },
						{ label: "Replace", icon: "i-lucide-replace", shortcut: "⌘H" },
					],
				],
			};
		},
		template: `
			<UContextMenu :items="items">
				<div class="p-6 bg-gray-50 dark:bg-gray-900 rounded-lg cursor-context-menu">
					<p class="text-gray-700 dark:text-gray-300 leading-relaxed">
						This is a paragraph of text. Right-click anywhere in this text area to see the context menu
						with text editing options. You can select text and use the context menu to perform actions
						like cut, copy, paste, search, and replace.
					</p>
				</div>
			</UContextMenu>
		`,
	}),
};

export const OnTable: Story = {
	render: () => ({
		components: { UContextMenu },
		setup() {
			return {
				items: [
					[
						{ label: "View Details", icon: "i-lucide-eye" },
						{ label: "Edit Row", icon: "i-lucide-pencil" },
					],
					[
						{ label: "Duplicate Row", icon: "i-lucide-copy" },
						{ label: "Insert Row Above", icon: "i-lucide-arrow-up" },
						{ label: "Insert Row Below", icon: "i-lucide-arrow-down" },
					],
					[
						{ label: "Delete Row", icon: "i-lucide-trash-2" },
					],
				],
			};
		},
		template: `
			<div class="overflow-x-auto">
				<table class="w-full border-collapse">
					<thead>
						<tr class="bg-gray-100 dark:bg-gray-800">
							<th class="px-4 py-2 text-left">Name</th>
							<th class="px-4 py-2 text-left">Status</th>
							<th class="px-4 py-2 text-left">Date</th>
						</tr>
					</thead>
					<tbody>
						<UContextMenu :items="items" v-for="i in 3" :key="i">
							<tr class="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-context-menu">
								<td class="px-4 py-3">Item {{ i }}</td>
								<td class="px-4 py-3"><span class="px-2 py-1 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100 rounded text-sm">Active</span></td>
								<td class="px-4 py-3">2024-01-{{ 10 + i }}</td>
							</tr>
						</UContextMenu>
					</tbody>
				</table>
			</div>
		`,
	}),
};

export const WithCustomContent: Story = {
	render: () => ({
		components: { UContextMenu },
		setup() {
			return {
				items: [
					[
						{ label: "React", icon: "i-lucide-circle" },
						{ label: "Vue", icon: "i-lucide-circle" },
						{ label: "Svelte", icon: "i-lucide-circle" },
					],
					[
						{ label: "Angular", icon: "i-lucide-circle" },
						{ label: "Solid", icon: "i-lucide-circle" },
					],
				],
			};
		},
		template: `
			<UContextMenu :items="items">
				<div class="p-8 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg cursor-context-menu">
					<div class="text-center">
						<div class="text-4xl mb-4">🎯</div>
						<h3 class="text-xl font-bold mb-2">Choose Your Framework</h3>
						<p class="text-gray-600 dark:text-gray-400">Right-click to select</p>
					</div>
				</div>
			</UContextMenu>
		`,
	}),
};
