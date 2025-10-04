import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import UTree from '@nuxt/ui/components/Tree.vue'
import type { TreeProps } from '@nuxt/ui'

const meta = {
  title: 'Data/Tree',
  component: UTree,
  tags: ['autodocs'],
  argTypes: {
    items: {
      control: 'object',
      description: 'Array of tree items with hierarchical structure',
      table: {
        type: { summary: 'TreeItem[]' },
      },
    },
    modelValue: {
      control: 'object',
      description: 'The controlled value of the tree. Can be binded with v-model',
      table: {
        type: { summary: 'TreeItem | TreeItem[]' },
      },
    },
    defaultValue: {
      control: 'object',
      description: 'The value of the tree when initially rendered',
      table: {
        type: { summary: 'TreeItem | TreeItem[]' },
      },
    },
    expanded: {
      control: 'object',
      description: 'The controlled value of the expanded items',
      table: {
        type: { summary: 'string[]' },
      },
    },
    defaultExpanded: {
      control: 'object',
      description: 'The value of the expanded tree when initially rendered',
      table: {
        type: { summary: 'string[]' },
      },
    },
    multiple: {
      control: 'boolean',
      description: 'Whether multiple options can be selected',
      table: {
        type: { summary: 'boolean' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'When true, prevents the user from interacting with tree',
      table: {
        type: { summary: 'boolean' },
      },
    },
    propagateSelect: {
      control: 'boolean',
      description: 'When true, selecting parent will select the descendants',
      table: {
        type: { summary: 'boolean' },
      },
    },
    bubbleSelect: {
      control: 'boolean',
      description: 'When true, selecting children will update the parent state',
      table: {
        type: { summary: 'boolean' },
      },
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'info', 'warning', 'error', 'neutral'],
      description: 'Color theme',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'primary' },
      },
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      description: 'Size of the tree',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'md' },
      },
    },
    trailingIcon: {
      control: 'text',
      description: 'The icon displayed on the right side of a parent node',
      table: {
        type: { summary: 'string | object' },
        defaultValue: { summary: 'i-lucide-chevron-down' },
      },
    },
    expandedIcon: {
      control: 'text',
      description: 'The icon displayed when a parent node is expanded',
      table: {
        type: { summary: 'string | object' },
        defaultValue: { summary: 'i-lucide-folder-open' },
      },
    },
    collapsedIcon: {
      control: 'text',
      description: 'The icon displayed when a parent node is collapsed',
      table: {
        type: { summary: 'string | object' },
        defaultValue: { summary: 'i-lucide-folder' },
      },
    },
    labelKey: {
      control: 'text',
      description: 'The key used to get the label from the item',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'label' },
      },
    },
    getKey: {
      control: 'object',
      description: 'Function to get unique key for each item',
      table: {
        type: { summary: '(item: TreeItem) => string' },
      },
    },
    selectionBehavior: {
      control: 'select',
      options: ['toggle', 'replace'],
      description: 'How multiple selection should behave',
      table: {
        type: { summary: 'string' },
      },
    },
    as: {
      control: 'text',
      description: 'The element or component this component should render as',
      table: {
        type: { summary: 'any' },
      },
    },
    'onUpdate:modelValue': {
      action: 'update:modelValue',
      description: 'Emitted when the selected value changes',
    },
    'onUpdate:expanded': {
      action: 'update:expanded',
      description: 'Emitted when the expanded items change',
    },
  },
} satisfies Meta<typeof UTree>

export default meta
type Story = StoryObj<typeof meta>

const fileSystemItems = [
  {
    label: 'app/',
    defaultExpanded: true,
    children: [
      {
        label: 'composables/',
        children: [
          {
            label: 'useAuth.ts',
            icon: 'i-vscode-icons-file-type-typescript',
          },
          {
            label: 'useUser.ts',
            icon: 'i-vscode-icons-file-type-typescript',
          },
        ],
      },
      {
        label: 'components/',
        defaultExpanded: true,
        children: [
          {
            label: 'Card.vue',
            icon: 'i-vscode-icons-file-type-vue',
          },
          {
            label: 'Button.vue',
            icon: 'i-vscode-icons-file-type-vue',
          },
        ],
      },
    ],
  },
  {
    label: 'app.vue',
    icon: 'i-vscode-icons-file-type-vue',
  },
  {
    label: 'nuxt.config.ts',
    icon: 'i-vscode-icons-file-type-nuxt',
  },
]

/**
 * Default file system tree
 */
export const Default: Story = {
  render: () => ({
    components: { UTree },
    setup() {
      return { items: fileSystemItems }
    },
    template: `
      <UTree :items="items" />
    `,
  }),
}

/**
 * Multiple selection enabled
 */
export const MultipleSelection: Story = {
  render: () => ({
    components: { UTree },
    setup() {
      return { items: fileSystemItems }
    },
    template: `
      <UTree multiple :items="items" />
    `,
  }),
}

/**
 * Neutral color theme
 */
export const NeutralColor: Story = {
  render: () => ({
    components: { UTree },
    setup() {
      return { items: fileSystemItems }
    },
    template: `
      <UTree color="neutral" :items="items" />
    `,
  }),
}

/**
 * Extra large size
 */
export const SizeXL: Story = {
  render: () => ({
    components: { UTree },
    setup() {
      return { items: fileSystemItems }
    },
    template: `
      <UTree size="xl" :items="items" />
    `,
  }),
}

/**
 * Custom expanded and collapsed icons
 */
export const CustomIcons: Story = {
  render: () => ({
    components: { UTree },
    setup() {
      return { items: fileSystemItems }
    },
    template: `
      <UTree
        expanded-icon="i-lucide-book-open"
        collapsed-icon="i-lucide-book"
        :items="items"
      />
    `,
  }),
}

/**
 * Custom trailing icon
 */
export const CustomTrailingIcon: Story = {
  render: () => ({
    components: { UTree },
    setup() {
      return { items: fileSystemItems }
    },
    template: `
      <UTree trailing-icon="i-lucide-arrow-down" :items="items" />
    `,
  }),
}

/**
 * Disabled tree
 */
export const Disabled: Story = {
  render: () => ({
    components: { UTree },
    setup() {
      return { items: fileSystemItems }
    },
    template: `
      <UTree disabled :items="items" />
    `,
  }),
}

/**
 * Organizational structure
 */
export const OrganizationalStructure: Story = {
  render: () => ({
    components: { UTree },
    setup() {
      const items = [
        {
          label: 'CEO',
          icon: 'i-lucide-user',
          defaultExpanded: true,
          children: [
            {
              label: 'CTO',
              icon: 'i-lucide-user',
              children: [
                { label: 'Engineering Team', icon: 'i-lucide-users' },
                { label: 'DevOps Team', icon: 'i-lucide-users' },
              ],
            },
            {
              label: 'CFO',
              icon: 'i-lucide-user',
              children: [
                { label: 'Finance Team', icon: 'i-lucide-users' },
                { label: 'Accounting Team', icon: 'i-lucide-users' },
              ],
            },
            {
              label: 'CMO',
              icon: 'i-lucide-user',
              children: [
                { label: 'Marketing Team', icon: 'i-lucide-users' },
                { label: 'Sales Team', icon: 'i-lucide-users' },
              ],
            },
          ],
        },
      ]
      return { items }
    },
    template: `
      <UTree :items="items" />
    `,
  }),
}

/**
 * Documentation structure
 */
export const DocumentationStructure: Story = {
  render: () => ({
    components: { UTree },
    setup() {
      const items = [
        {
          label: 'Getting Started',
          icon: 'i-lucide-book-open',
          defaultExpanded: true,
          children: [
            { label: 'Installation', icon: 'i-lucide-download' },
            { label: 'Configuration', icon: 'i-lucide-settings' },
            { label: 'Quick Start', icon: 'i-lucide-zap' },
          ],
        },
        {
          label: 'Components',
          icon: 'i-lucide-box',
          children: [
            { label: 'Button', icon: 'i-lucide-mouse-pointer' },
            { label: 'Input', icon: 'i-lucide-type' },
            { label: 'Table', icon: 'i-lucide-table' },
          ],
        },
        {
          label: 'API Reference',
          icon: 'i-lucide-code',
          children: [
            { label: 'Props', icon: 'i-lucide-list' },
            { label: 'Events', icon: 'i-lucide-activity' },
            { label: 'Slots', icon: 'i-lucide-layers' },
          ],
        },
      ]
      return { items }
    },
    template: `
      <UTree :items="items" color="info" />
    `,
  }),
}

/**
 * Category tree with products
 */
export const CategoryTree: Story = {
  render: () => ({
    components: { UTree },
    setup() {
      const items = [
        {
          label: 'Electronics',
          icon: 'i-lucide-plug',
          defaultExpanded: true,
          children: [
            {
              label: 'Computers',
              icon: 'i-lucide-monitor',
              children: [
                { label: 'Laptops', icon: 'i-lucide-laptop' },
                { label: 'Desktops', icon: 'i-lucide-pc' },
              ],
            },
            {
              label: 'Mobile Devices',
              icon: 'i-lucide-smartphone',
              children: [
                { label: 'Phones', icon: 'i-lucide-phone' },
                { label: 'Tablets', icon: 'i-lucide-tablet' },
              ],
            },
          ],
        },
        {
          label: 'Clothing',
          icon: 'i-lucide-shirt',
          children: [
            { label: 'Men', icon: 'i-lucide-user' },
            { label: 'Women', icon: 'i-lucide-user' },
            { label: 'Kids', icon: 'i-lucide-baby' },
          ],
        },
      ]
      return { items }
    },
    template: `
      <UTree :items="items" color="success" />
    `,
  }),
}

/**
 * Controlled selection
 */
export const ControlledSelection: Story = {
  render: () => ({
    components: { UTree },
    setup() {
      const selected = ref([])
      const items = [
        {
          label: 'Frontend',
          icon: 'i-lucide-layout',
          defaultExpanded: true,
          children: [
            { label: 'Vue.js', icon: 'i-simple-icons-vue' },
            { label: 'React', icon: 'i-simple-icons-react' },
            { label: 'Angular', icon: 'i-simple-icons-angular' },
          ],
        },
        {
          label: 'Backend',
          icon: 'i-lucide-server',
          children: [
            { label: 'Node.js', icon: 'i-simple-icons-node' },
            { label: 'Python', icon: 'i-simple-icons-python' },
            { label: 'Go', icon: 'i-simple-icons-go' },
          ],
        },
      ]
      return { items, selected }
    },
    template: `
      <div>
        <UTree v-model="selected" multiple :items="items" />
        <p class="mt-4 text-sm">Selected: {{ selected.length }} item(s)</p>
      </div>
    `,
  }),
}

/**
 * Settings menu tree
 */
export const SettingsMenu: Story = {
  render: () => ({
    components: { UTree },
    setup() {
      const items = [
        {
          label: 'Account',
          icon: 'i-lucide-user',
          defaultExpanded: true,
          children: [
            { label: 'Profile', icon: 'i-lucide-user-circle' },
            { label: 'Password', icon: 'i-lucide-lock' },
            { label: 'Privacy', icon: 'i-lucide-shield' },
          ],
        },
        {
          label: 'Notifications',
          icon: 'i-lucide-bell',
          children: [
            { label: 'Email', icon: 'i-lucide-mail' },
            { label: 'Push', icon: 'i-lucide-smartphone' },
            { label: 'SMS', icon: 'i-lucide-message-square' },
          ],
        },
        {
          label: 'Preferences',
          icon: 'i-lucide-sliders',
          children: [
            { label: 'Language', icon: 'i-lucide-globe' },
            { label: 'Theme', icon: 'i-lucide-palette' },
            { label: 'Accessibility', icon: 'i-lucide-accessibility' },
          ],
        },
      ]
      return { items }
    },
    template: `
      <UTree :items="items" size="sm" />
    `,
  }),
}

/**
 * File manager tree
 */
export const FileManager: Story = {
  render: () => ({
    components: { UTree },
    setup() {
      const items = [
        {
          label: 'Documents',
          icon: 'i-lucide-folder',
          defaultExpanded: true,
          children: [
            { label: 'Resume.pdf', icon: 'i-lucide-file-text' },
            { label: 'Cover Letter.docx', icon: 'i-lucide-file-text' },
            {
              label: 'Projects',
              icon: 'i-lucide-folder',
              children: [
                { label: 'Project A.pptx', icon: 'i-lucide-presentation' },
                { label: 'Project B.xlsx', icon: 'i-lucide-table' },
              ],
            },
          ],
        },
        {
          label: 'Images',
          icon: 'i-lucide-folder',
          children: [
            { label: 'photo1.jpg', icon: 'i-lucide-image' },
            { label: 'photo2.png', icon: 'i-lucide-image' },
          ],
        },
        {
          label: 'Downloads',
          icon: 'i-lucide-folder',
          children: [
            { label: 'setup.exe', icon: 'i-lucide-file' },
          ],
        },
      ]
      return { items }
    },
    template: `
      <UTree :items="items" />
    `,
  }),
}
