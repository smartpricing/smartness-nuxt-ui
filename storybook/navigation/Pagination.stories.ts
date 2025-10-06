import type { Meta, StoryObj } from "@storybook/vue3";
import UPagination from "@nuxt/ui/components/Pagination.vue";

const meta = {
	title: "Navigation/Pagination",
	component: UPagination,
	tags: ["autodocs"],
	parameters: {
		docs: {
			description: {
				component: "A pagination component for navigating through pages of content.",
			},
		},
	},
	argTypes: {
		modelValue: {
			control: "number",
			description: "The current page number (v-model)",
		},
		total: {
			control: "number",
			description: "Total number of items",
		},
		pageCount: {
			control: "number",
			description: "Number of pages",
		},
		size: {
			control: "select",
			options: ["xs", "sm", "md", "lg", "xl"],
			description: "Size of the pagination component",
			table: {
				defaultValue: { summary: "md" },
			},
		},
		max: {
			control: "number",
			description: "Maximum number of page buttons to show",
			table: {
				defaultValue: { summary: "7" },
			},
		},
		showFirst: {
			control: "boolean",
			description: "Show first page button",
		},
		showLast: {
			control: "boolean",
			description: "Show last page button",
		},
		disabled: {
			control: "boolean",
			description: "Disable the pagination",
		},
	},
} satisfies Meta<typeof UPagination>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => ({
		components: { UPagination },
		setup() {
			return {
				page: 1,
			};
		},
		template: `
			<div class="space-y-4">
				<UPagination v-model="page" :total="100" />
				<p class="text-sm text-gray-600 dark:text-gray-400">Current page: {{ page }}</p>
			</div>
		`,
	}),
};

export const WithFirstLast: Story = {
	render: () => ({
		components: { UPagination },
		setup() {
			return {
				page: 5,
			};
		},
		template: `
			<div class="space-y-4">
				<UPagination v-model="page" :total="200" show-first show-last />
				<p class="text-sm text-gray-600 dark:text-gray-400">Current page: {{ page }}</p>
			</div>
		`,
	}),
};

export const LargePagination: Story = {
	render: () => ({
		components: { UPagination },
		setup() {
			return {
				page: 25,
			};
		},
		template: `
			<div class="space-y-4">
				<UPagination v-model="page" :page-count="50" show-first show-last />
				<p class="text-sm text-gray-600 dark:text-gray-400">Current page: {{ page }} of 50</p>
			</div>
		`,
	}),
};

export const Compact: Story = {
	render: () => ({
		components: { UPagination },
		setup() {
			return {
				page: 3,
			};
		},
		template: `
			<div class="space-y-4">
				<UPagination v-model="page" :total="150" :max="5" />
				<p class="text-sm text-gray-600 dark:text-gray-400">Current page: {{ page }}</p>
			</div>
		`,
	}),
};

export const Sizes: Story = {
	render: () => ({
		components: { UPagination },
		setup() {
			return {
				page: 2,
			};
		},
		template: `
			<div class="space-y-6">
				<div>
					<p class="text-sm text-gray-600 dark:text-gray-400 mb-2">Extra Small (xs)</p>
					<UPagination v-model="page" :total="100" size="xs" />
				</div>
				<div>
					<p class="text-sm text-gray-600 dark:text-gray-400 mb-2">Small (sm)</p>
					<UPagination v-model="page" :total="100" size="sm" />
				</div>
				<div>
					<p class="text-sm text-gray-600 dark:text-gray-400 mb-2">Medium (md)</p>
					<UPagination v-model="page" :total="100" size="md" />
				</div>
				<div>
					<p class="text-sm text-gray-600 dark:text-gray-400 mb-2">Large (lg)</p>
					<UPagination v-model="page" :total="100" size="lg" />
				</div>
				<div>
					<p class="text-sm text-gray-600 dark:text-gray-400 mb-2">Extra Large (xl)</p>
					<UPagination v-model="page" :total="100" size="xl" />
				</div>
			</div>
		`,
	}),
};

export const Disabled: Story = {
	args: {
		modelValue: 3,
		total: 100,
		disabled: true,
	},
};

export const WithContent: Story = {
	render: () => ({
		components: { UPagination },
		setup() {
			const page = 1;
			const itemsPerPage = 10;
			const total = 47;

			const items = Array.from({ length: total }, (_, i) => ({
				id: i + 1,
				name: `Item ${i + 1}`,
				description: `Description for item ${i + 1}`,
			}));

			return {
				page,
				itemsPerPage,
				total,
				items,
			};
		},
		template: `
			<div class="space-y-4">
				<div class="space-y-2">
					<div
						v-for="item in items.slice((page - 1) * itemsPerPage, page * itemsPerPage)"
						:key="item.id"
						class="p-4 bg-white dark:bg-gray-800 rounded-lg shadow"
					>
						<h3 class="font-bold mb-1">{{ item.name }}</h3>
						<p class="text-sm text-gray-600 dark:text-gray-400">{{ item.description }}</p>
					</div>
				</div>
				<div class="flex justify-between items-center">
					<p class="text-sm text-gray-600 dark:text-gray-400">
						Showing {{ (page - 1) * itemsPerPage + 1 }} to {{ Math.min(page * itemsPerPage, total) }} of {{ total }} items
					</p>
					<UPagination v-model="page" :total="total" :page-count="Math.ceil(total / itemsPerPage)" show-first show-last />
				</div>
			</div>
		`,
	}),
};
