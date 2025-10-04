import type { Meta, StoryObj } from '@storybook/vue3'
import UInputMenu from '@nuxt/ui/components/InputMenu.vue'
import { InputMenuProps } from '@nuxt/ui'

const meta = {
  title: 'Form/InputMenu',
  component: UInputMenu,
  tags: ['autodocs'],
  argTypes: {
    placeholder: {
      control: 'text',
      description: 'Placeholder text when the input is empty',
    },
    modelValue: {
      control: 'text',
      description: 'The controlled value of the InputMenu',
    },
    items: {
      control: 'object',
      description: 'Array of items (strings, objects, or nested arrays)',
    },
    multiple: {
      control: 'boolean',
      description: 'Whether multiple options can be selected',
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'info', 'warning', 'error', 'neutral'],
      description: 'Color theme',
    },
    variant: {
      control: 'select',
      options: ['outline', 'soft', 'subtle', 'ghost', 'none'],
      description: 'Variant style',
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      description: 'Size of the input',
    },
    icon: {
      control: 'text',
      description: 'Display an icon based on the leading and trailing props',
    },
    leading: {
      control: 'boolean',
      description: 'When true, the icon will be displayed on the left side',
    },
    leadingIcon: {
      control: 'text',
      description: 'Display an icon on the left side',
    },
    trailing: {
      control: 'boolean',
      description: 'When true, the icon will be displayed on the right side',
    },
    trailingIcon: {
      control: 'text',
      description: 'The icon displayed to open the menu',
    },
    selectedIcon: {
      control: 'text',
      description: 'The icon displayed when an item is selected',
    },
    deleteIcon: {
      control: 'text',
      description: 'The icon displayed to delete a tag (when multiple is true)',
    },
    loading: {
      control: 'boolean',
      description: 'When true, the loading icon will be displayed',
    },
    loadingIcon: {
      control: 'text',
      description: 'The icon when the loading prop is true',
    },
    disabled: {
      control: 'boolean',
      description: 'When true, prevents the user from interacting with the component',
    },
    required: {
      control: 'boolean',
      description: 'Whether the input is required',
    },
    highlight: {
      control: 'boolean',
      description: 'Highlight the ring color like a focus state',
    },
    valueKey: {
      control: 'text',
      description: 'When items is an array of objects, select the field to use as the value',
    },
    labelKey: {
      control: 'text',
      description: 'When items is an array of objects, select the field to use as the label',
    },
    createItem: {
      control: 'boolean',
      description: 'Determines if custom user input that does not exist in options can be added',
    },
    ignoreFilter: {
      control: 'boolean',
      description: 'When true, disable the default filters (useful for custom filtering)',
    },
    filterFields: {
      control: 'object',
      description: 'Fields to filter items by',
    },
    openOnClick: {
      control: 'boolean',
      description: 'Whether to open the combobox when the input is clicked',
    },
    openOnFocus: {
      control: 'boolean',
      description: 'Whether to open the combobox when the input is focused',
    },
    resetSearchTermOnBlur: {
      control: 'boolean',
      description: 'Whether to reset the searchTerm when the input is blurred',
    },
    resetSearchTermOnSelect: {
      control: 'boolean',
      description: 'Whether to reset the searchTerm when a value is selected',
    },
    highlightOnHover: {
      control: 'boolean',
      description: 'When true, hover over item will trigger highlight',
    },
    arrow: {
      control: 'boolean',
      description: 'Display an arrow alongside the menu',
    },
    portal: {
      control: 'boolean',
      description: 'Render the menu in a portal',
    },
    searchTerm: {
      control: 'text',
      description: 'The search term',
    },
    onUpdateModelValue: {
      action: 'update:modelValue',
      description: 'Event emitted when the value changes',
    },
    onUpdateOpen: {
      action: 'update:open',
      description: 'Event emitted when the open state changes',
    },
    onCreate: {
      action: 'create',
      description: 'Event emitted when a custom item is created',
    },
    onUpdateSearchTerm: {
      action: 'update:searchTerm',
      description: 'Event emitted when the search term changes',
    },
    onBlur: {
      action: 'blur',
      description: 'Event emitted when the input loses focus',
    },
    onFocus: {
      action: 'focus',
      description: 'Event emitted when the input receives focus',
    },
    onChange: {
      action: 'change',
      description: 'Event emitted when the value changes',
    },
    onHighlight: {
      action: 'highlight',
      description: 'Event emitted when an item is highlighted',
    },
    onRemoveTag: {
      action: 'remove-tag',
      description: 'Event emitted when a tag is removed (multiple mode)',
    },
  },
  args: {
    placeholder: 'Select status',
    items: ['Backlog', 'Todo', 'In Progress', 'Done'],
    color: 'primary',
    variant: 'outline',
    size: 'md',
    multiple: false,
    disabled: false,
    loading: false,
    required: false,
    highlight: false,
    createItem: false,
    ignoreFilter: false,
    openOnClick: false,
    openOnFocus: false,
    resetSearchTermOnBlur: true,
    resetSearchTermOnSelect: true,
    highlightOnHover: false,
    arrow: false,
    portal: true,
  },
} satisfies Meta<typeof UInputMenu>

type Story = StoryObj<typeof meta>

export default meta

// Basic Stories
export const Default: Story = {}

export const WithValue: Story = {
  args: {
    modelValue: 'In Progress',
  },
}

export const WithPlaceholder: Story = {
  args: {
    placeholder: 'Choose a status',
  },
}

// Multiple Selection
export const Multiple: Story = {
  args: {
    multiple: true,
    modelValue: ['Backlog', 'Todo'],
  },
}

export const MultipleEmpty: Story = {
  args: {
    multiple: true,
    modelValue: [],
  },
}

// Items as Objects
export const ItemsAsObjects: Story = {
  args: {
    items: [
      { label: 'Backlog', value: 'backlog', icon: 'i-lucide-circle-help' },
      { label: 'Todo', value: 'todo', icon: 'i-lucide-circle-plus' },
      { label: 'In Progress', value: 'in_progress', icon: 'i-lucide-circle-arrow-up' },
      { label: 'Done', value: 'done', icon: 'i-lucide-circle-check' },
    ],
    valueKey: 'value',
    modelValue: 'todo',
  },
}

// Nested Arrays (Grouped Items)
export const NestedArrays: Story = {
  args: {
    items: [
      ['Apple', 'Banana', 'Blueberry', 'Grapes', 'Pineapple'],
      ['Aubergine', 'Broccoli', 'Carrot', 'Courgette', 'Leek'],
    ],
    modelValue: 'Apple',
    placeholder: 'Select a fruit or vegetable',
  },
}

// Items with Type (Labels & Separators)
export const ItemsWithType: Story = {
  args: {
    items: [
      { type: 'label', label: 'Fruits' },
      'Apple',
      'Banana',
      'Grapes',
      { type: 'separator' },
      { type: 'label', label: 'Vegetables' },
      'Broccoli',
      'Carrot',
      'Leek',
    ],
    modelValue: 'Apple',
  },
}

// Sizes
export const SizeXS: Story = { args: { size: 'xs' } }
export const SizeSM: Story = { args: { size: 'sm' } }
export const SizeMD: Story = { args: { size: 'md' } }
export const SizeLG: Story = { args: { size: 'lg' } }
export const SizeXL: Story = { args: { size: 'xl' } }

// Colors
export const ColorPrimary: Story = { args: { color: 'primary', modelValue: 'Todo', highlight: true } }
export const ColorSecondary: Story = { args: { color: 'secondary', modelValue: 'Todo', highlight: true } }
export const ColorSuccess: Story = { args: { color: 'success', modelValue: 'Done', highlight: true } }
export const ColorInfo: Story = { args: { color: 'info', modelValue: 'Todo', highlight: true } }
export const ColorWarning: Story = { args: { color: 'warning', modelValue: 'Backlog', highlight: true } }
export const ColorError: Story = { args: { color: 'error', modelValue: 'Backlog', highlight: true } }
export const ColorNeutral: Story = { args: { color: 'neutral', modelValue: 'Todo', highlight: true } }

// Variants
export const VariantOutline: Story = { args: { variant: 'outline' } }
export const VariantSoft: Story = { args: { variant: 'soft' } }
export const VariantSubtle: Story = { args: { variant: 'subtle' } }
export const VariantGhost: Story = { args: { variant: 'ghost' } }
export const VariantNone: Story = { args: { variant: 'none' } }

// Icons
export const WithLeadingIcon: Story = {
  args: {
    leadingIcon: 'i-lucide-search',
    placeholder: 'Search status',
  },
}

export const WithIcon: Story = {
  args: {
    icon: 'i-lucide-filter',
    placeholder: 'Filter by status',
  },
}

export const WithCustomTrailingIcon: Story = {
  args: {
    trailingIcon: 'i-lucide-arrow-down',
    modelValue: 'Todo',
  },
}

export const WithCustomSelectedIcon: Story = {
  args: {
    selectedIcon: 'i-lucide-flame',
    modelValue: 'In Progress',
  },
}

export const MultipleWithCustomDeleteIcon: Story = {
  args: {
    multiple: true,
    modelValue: ['Backlog', 'Todo'],
    deleteIcon: 'i-lucide-trash',
  },
}

// States
export const Loading: Story = {
  args: {
    loading: true,
    trailing: false,
  },
}

export const LoadingWithCustomIcon: Story = {
  args: {
    loading: true,
    loadingIcon: 'i-lucide-loader',
    trailing: false,
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
    modelValue: 'In Progress',
  },
}

export const DisabledEmpty: Story = {
  args: {
    disabled: true,
    placeholder: 'Cannot select',
  },
}

export const Required: Story = {
  args: {
    required: true,
  },
}

export const Highlighted: Story = {
  args: {
    highlight: true,
  },
}

// Create Item
export const WithCreateItem: Story = {
  args: {
    createItem: true,
    placeholder: 'Type to search or create',
  },
}

export const WithCreateItemAlways: Story = {
  args: {
    createItem: 'always',
    placeholder: 'Type to search or create',
  },
}

// Open Control
export const OpenOnClick: Story = {
  args: {
    openOnClick: true,
  },
}

export const OpenOnFocus: Story = {
  args: {
    openOnFocus: true,
  },
}

// Arrow
export const WithArrow: Story = {
  args: {
    arrow: true,
    modelValue: 'Backlog',
  },
}

// Advanced
export const WithFilterFields: Story = {
  args: {
    items: [
      { label: 'Apple', category: 'Fruit' },
      { label: 'Banana', category: 'Fruit' },
      { label: 'Carrot', category: 'Vegetable' },
      { label: 'Broccoli', category: 'Vegetable' },
    ],
    filterFields: ['label', 'category'],
    placeholder: 'Search by name or category',
  },
}

export const IgnoreFilter: Story = {
  args: {
    ignoreFilter: true,
    placeholder: 'Type to search (custom filtering)',
  },
}

export const HighlightOnHover: Story = {
  args: {
    highlightOnHover: true,
    openOnClick: true,
  },
}

export const NoPortal: Story = {
  args: {
    portal: false,
  },
}

// Complex Example
export const ComplexExample: Story = {
  args: {
    items: [
      { type: 'label', label: 'High Priority' },
      { label: 'Critical Bug', value: 'critical', icon: 'i-lucide-alert-triangle' },
      { label: 'Important Feature', value: 'important', icon: 'i-lucide-flag' },
      { type: 'separator' },
      { type: 'label', label: 'Normal Priority' },
      { label: 'Regular Task', value: 'task', icon: 'i-lucide-check-square' },
      { label: 'Enhancement', value: 'enhancement', icon: 'i-lucide-sparkles' },
      { type: 'separator' },
      { type: 'label', label: 'Low Priority' },
      { label: 'Nice to Have', value: 'nice', icon: 'i-lucide-smile' },
    ],
    valueKey: 'value',
    modelValue: 'important',
    size: 'md',
    color: 'primary',
    placeholder: 'Select priority',
  },
}

export const MultipleComplexExample: Story = {
  args: {
    multiple: true,
    items: [
      { label: 'React', value: 'react', icon: 'i-lucide-code' },
      { label: 'Vue', value: 'vue', icon: 'i-lucide-code' },
      { label: 'Angular', value: 'angular', icon: 'i-lucide-code' },
      { label: 'Svelte', value: 'svelte', icon: 'i-lucide-code' },
      { label: 'Next.js', value: 'nextjs', icon: 'i-lucide-layers' },
      { label: 'Nuxt', value: 'nuxt', icon: 'i-lucide-layers' },
    ],
    valueKey: 'value',
    modelValue: ['react', 'nextjs'],
    placeholder: 'Select frameworks',
    createItem: true,
  },
}

export const LongList: Story = {
  args: {
    items: Array.from({ length: 50 }, (_, i) => `Item ${i + 1}`),
    placeholder: 'Search from 50 items',
  },
}

export const EmptyState: Story = {
  args: {
    items: [],
    placeholder: 'No items available',
  },
}
