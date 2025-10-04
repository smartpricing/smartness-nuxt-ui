import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import UTable from '@nuxt/ui/components/Table.vue'
import type { TableProps } from '@nuxt/ui'

const meta = {
  title: 'Data/Table',
  component: UTable,
  tags: ['autodocs'],
  argTypes: {
    columns: {
      control: 'object',
      description: 'Array of column definitions',
      table: {
        type: { summary: 'TableColumn[]' },
      },
    },
    rows: {
      control: 'object',
      description: 'Array of data rows',
      table: {
        type: { summary: 'any[]' },
      },
    },
    modelValue: {
      control: 'object',
      description: 'Selected rows when selectable is true',
      table: {
        type: { summary: 'any[]' },
      },
    },
    loading: {
      control: 'boolean',
      description: 'Display loading state',
      table: {
        type: { summary: 'boolean' },
      },
    },
    loadingState: {
      control: 'object',
      description: 'Customize loading state',
      table: {
        type: { summary: 'object' },
      },
    },
    emptyState: {
      control: 'object',
      description: 'Customize empty state',
      table: {
        type: { summary: 'object' },
      },
    },
    sort: {
      control: 'object',
      description: 'Sort configuration',
      table: {
        type: { summary: 'TableSort' },
      },
    },
    sortMode: {
      control: 'select',
      options: ['manual', 'auto'],
      description: 'Sort mode',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'auto' },
      },
    },
    sortButton: {
      control: 'object',
      description: 'Sort button configuration',
      table: {
        type: { summary: 'ButtonProps' },
      },
    },
    'onUpdate:modelValue': {
      action: 'update:modelValue',
      description: 'Emitted when selection changes',
    },
    'onUpdate:sort': {
      action: 'update:sort',
      description: 'Emitted when sort changes',
    },
  },
} satisfies Meta<typeof UTable>

export default meta
type Story = StoryObj<typeof meta>

const sampleColumns = [
  { key: 'name', label: 'Name', sortable: true },
  { key: 'email', label: 'Email', sortable: true },
  { key: 'role', label: 'Role', sortable: true },
  { key: 'status', label: 'Status' },
]

const sampleRows = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'Active' },
  { id: 3, name: 'Bob Wilson', email: 'bob@example.com', role: 'User', status: 'Inactive' },
  { id: 4, name: 'Alice Johnson', email: 'alice@example.com', role: 'Manager', status: 'Active' },
  { id: 5, name: 'Charlie Brown', email: 'charlie@example.com', role: 'User', status: 'Active' },
]

/**
 * Default table with sample data
 */
export const Default: Story = {
  render: () => ({
    components: { UTable },
    setup() {
      return { columns: sampleColumns, rows: sampleRows }
    },
    template: `
      <UTable :columns="columns" :rows="rows" />
    `,
  }),
}

/**
 * Table with sortable columns
 */
export const WithSorting: Story = {
  render: () => ({
    components: { UTable },
    setup() {
      const sort = ref({ column: 'name', direction: 'asc' as const })
      return { columns: sampleColumns, rows: sampleRows, sort }
    },
    template: `
      <UTable :columns="columns" :rows="rows" v-model:sort="sort" />
    `,
  }),
}

/**
 * Table with row selection
 */
export const WithSelection: Story = {
  render: () => ({
    components: { UTable },
    setup() {
      const selected = ref([])
      return { columns: sampleColumns, rows: sampleRows, selected }
    },
    template: `
      <div>
        <UTable :columns="columns" :rows="rows" v-model="selected" />
        <p class="mt-4 text-sm">Selected: {{ selected.length }} row(s)</p>
      </div>
    `,
  }),
}

/**
 * Loading state
 */
export const Loading: Story = {
  render: () => ({
    components: { UTable },
    setup() {
      return { columns: sampleColumns, rows: [] }
    },
    template: `
      <UTable :columns="columns" :rows="rows" loading />
    `,
  }),
}

/**
 * Empty state
 */
export const Empty: Story = {
  render: () => ({
    components: { UTable },
    setup() {
      return { columns: sampleColumns, rows: [] }
    },
    template: `
      <UTable
        :columns="columns"
        :rows="rows"
        :empty-state="{
          icon: 'i-lucide-inbox',
          label: 'No data available',
          description: 'Add some data to get started'
        }"
      />
    `,
  }),
}

/**
 * Minimal columns
 */
export const MinimalColumns: Story = {
  render: () => ({
    components: { UTable },
    setup() {
      const columns = [
        { key: 'name', label: 'Name' },
        { key: 'email', label: 'Email' },
      ]
      return { columns, rows: sampleRows }
    },
    template: `
      <UTable :columns="columns" :rows="rows" />
    `,
  }),
}

/**
 * With actions column
 */
export const WithActions: Story = {
  render: () => ({
    components: { UTable },
    setup() {
      const columns = [
        { key: 'name', label: 'Name' },
        { key: 'email', label: 'Email' },
        { key: 'role', label: 'Role' },
        { key: 'actions', label: 'Actions' },
      ]
      return { columns, rows: sampleRows }
    },
    template: `
      <UTable :columns="columns" :rows="rows">
        <template #actions-data="{ row }">
          <button class="text-blue-600 hover:text-blue-800">Edit</button>
        </template>
      </UTable>
    `,
  }),
}

/**
 * Custom cell rendering
 */
export const CustomCells: Story = {
  render: () => ({
    components: { UTable },
    setup() {
      return { columns: sampleColumns, rows: sampleRows }
    },
    template: `
      <UTable :columns="columns" :rows="rows">
        <template #status-data="{ row }">
          <span :class="row.status === 'Active' ? 'text-green-600' : 'text-red-600'">
            {{ row.status }}
          </span>
        </template>
        <template #role-data="{ row }">
          <span class="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs font-medium">
            {{ row.role }}
          </span>
        </template>
      </UTable>
    `,
  }),
}

/**
 * Striped rows
 */
export const StripedRows: Story = {
  render: () => ({
    components: { UTable },
    setup() {
      return { columns: sampleColumns, rows: sampleRows }
    },
    template: `
      <UTable
        :columns="columns"
        :rows="rows"
        :ui="{ tbody: 'divide-y divide-gray-200 [&>tr:nth-child(even)]:bg-gray-50' }"
      />
    `,
  }),
}

/**
 * Compact table
 */
export const Compact: Story = {
  render: () => ({
    components: { UTable },
    setup() {
      return { columns: sampleColumns, rows: sampleRows }
    },
    template: `
      <UTable
        :columns="columns"
        :rows="rows"
        :ui="{ td: 'py-2', th: 'py-2' }"
      />
    `,
  }),
}

/**
 * Large dataset
 */
export const LargeDataset: Story = {
  render: () => ({
    components: { UTable },
    setup() {
      const rows = Array.from({ length: 100 }, (_, i) => ({
        id: i + 1,
        name: `User ${i + 1}`,
        email: `user${i + 1}@example.com`,
        role: ['Admin', 'User', 'Manager'][i % 3],
        status: i % 2 === 0 ? 'Active' : 'Inactive',
      }))
      return { columns: sampleColumns, rows }
    },
    template: `
      <UTable :columns="columns" :rows="rows" />
    `,
  }),
}

/**
 * Product catalog table
 */
export const ProductCatalog: Story = {
  render: () => ({
    components: { UTable },
    setup() {
      const columns = [
        { key: 'name', label: 'Product', sortable: true },
        { key: 'category', label: 'Category', sortable: true },
        { key: 'price', label: 'Price', sortable: true },
        { key: 'stock', label: 'Stock', sortable: true },
        { key: 'status', label: 'Status' },
      ]
      const rows = [
        { id: 1, name: 'Laptop Pro', category: 'Electronics', price: '$1,299', stock: 45, status: 'In Stock' },
        { id: 2, name: 'Wireless Mouse', category: 'Accessories', price: '$29', stock: 120, status: 'In Stock' },
        { id: 3, name: 'USB-C Cable', category: 'Accessories', price: '$15', stock: 0, status: 'Out of Stock' },
        { id: 4, name: 'Monitor 4K', category: 'Electronics', price: '$599', stock: 23, status: 'In Stock' },
      ]
      return { columns, rows }
    },
    template: `
      <UTable :columns="columns" :rows="rows">
        <template #status-data="{ row }">
          <span :class="row.status === 'In Stock' ? 'text-green-600' : 'text-red-600'">
            {{ row.status }}
          </span>
        </template>
      </UTable>
    `,
  }),
}

/**
 * User management table
 */
export const UserManagement: Story = {
  render: () => ({
    components: { UTable },
    setup() {
      const columns = [
        { key: 'avatar', label: '' },
        { key: 'name', label: 'Name', sortable: true },
        { key: 'email', label: 'Email' },
        { key: 'department', label: 'Department', sortable: true },
        { key: 'lastActive', label: 'Last Active', sortable: true },
      ]
      const rows = [
        { id: 1, name: 'Sarah Johnson', email: 'sarah@company.com', department: 'Engineering', lastActive: '2 hours ago' },
        { id: 2, name: 'Mike Chen', email: 'mike@company.com', department: 'Design', lastActive: '1 day ago' },
        { id: 3, name: 'Emma Davis', email: 'emma@company.com', department: 'Marketing', lastActive: '3 hours ago' },
      ]
      return { columns, rows }
    },
    template: `
      <UTable :columns="columns" :rows="rows">
        <template #avatar-data="{ row }">
          <div class="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-semibold">
            {{ row.name.split(' ').map(n => n[0]).join('') }}
          </div>
        </template>
      </UTable>
    `,
  }),
}

/**
 * Financial data table
 */
export const FinancialData: Story = {
  render: () => ({
    components: { UTable },
    setup() {
      const columns = [
        { key: 'date', label: 'Date', sortable: true },
        { key: 'description', label: 'Description' },
        { key: 'amount', label: 'Amount', sortable: true },
        { key: 'balance', label: 'Balance' },
      ]
      const rows = [
        { id: 1, date: '2024-01-15', description: 'Payment received', amount: '+$1,500.00', balance: '$5,230.00' },
        { id: 2, date: '2024-01-14', description: 'Subscription fee', amount: '-$29.99', balance: '$3,730.00' },
        { id: 3, date: '2024-01-12', description: 'Deposit', amount: '+$2,000.00', balance: '$3,759.99' },
      ]
      return { columns, rows }
    },
    template: `
      <UTable :columns="columns" :rows="rows">
        <template #amount-data="{ row }">
          <span :class="row.amount.startsWith('+') ? 'text-green-600' : 'text-red-600'">
            {{ row.amount }}
          </span>
        </template>
      </UTable>
    `,
  }),
}
