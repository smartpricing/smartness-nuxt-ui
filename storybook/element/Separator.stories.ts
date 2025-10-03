import type { Meta, StoryObj } from '@storybook/vue3'
import USeparator from '@nuxt/ui/components/Separator.vue'
import type { SeparatorProps } from '@nuxt/ui'

const meta = {
  title: 'Element/Separator',
  component: USeparator,
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'Display a label in the middle',
      table: {
        type: { summary: 'string' },
      },
    },
    icon: {
      control: 'text',
      description: 'Display an icon in the middle',
      table: {
        type: { summary: 'string | object' },
      },
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'info', 'warning', 'error', 'neutral'],
      description: 'Color theme of the separator',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'neutral' },
      },
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      description: 'Size of the separator',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'xs' },
      },
    },
    type: {
      control: 'select',
      options: ['solid', 'dashed', 'dotted'],
      description: 'Type of the separator line',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'solid' },
      },
    },
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: 'Orientation of the separator',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'horizontal' },
      },
    },
    decorative: {
      control: 'boolean',
      description: 'Whether the component is purely decorative',
      table: {
        type: { summary: 'boolean' },
      },
    },
    as: {
      control: 'text',
      description: 'The element or component this component should render as',
      table: {
        type: { summary: 'any' },
      },
    },
  },
} satisfies Meta<SeparatorProps>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}

export const WithLabel: Story = {
  args: {
    label: 'Continue',
  },
}

export const WithIcon: Story = {
  args: {
    icon: 'i-lucide-star',
  },
}

export const Orientations: Story = {
  render: () => ({
    components: { USeparator },
    template: `
      <div class="space-y-8">
        <div>
          <p class="text-sm mb-4">Horizontal (default)</p>
          <USeparator />
        </div>
        <div class="flex gap-8 h-48">
          <p class="text-sm">Vertical</p>
          <USeparator orientation="vertical" />
          <p class="text-sm">Content after</p>
        </div>
      </div>
    `,
  }),
}

export const Types: Story = {
  render: () => ({
    components: { USeparator },
    template: `
      <div class="space-y-8">
        <div>
          <p class="text-sm mb-2">Solid</p>
          <USeparator type="solid" />
        </div>
        <div>
          <p class="text-sm mb-2">Dashed</p>
          <USeparator type="dashed" />
        </div>
        <div>
          <p class="text-sm mb-2">Dotted</p>
          <USeparator type="dotted" />
        </div>
      </div>
    `,
  }),
}

export const Sizes: Story = {
  render: () => ({
    components: { USeparator },
    template: `
      <div class="space-y-8">
        <div>
          <p class="text-sm mb-2">XS</p>
          <USeparator size="xs" />
        </div>
        <div>
          <p class="text-sm mb-2">SM</p>
          <USeparator size="sm" />
        </div>
        <div>
          <p class="text-sm mb-2">MD</p>
          <USeparator size="md" />
        </div>
        <div>
          <p class="text-sm mb-2">LG</p>
          <USeparator size="lg" />
        </div>
        <div>
          <p class="text-sm mb-2">XL</p>
          <USeparator size="xl" />
        </div>
      </div>
    `,
  }),
}

export const Colors: Story = {
  render: () => ({
    components: { USeparator },
    template: `
      <div class="space-y-4">
        <USeparator color="primary" type="solid" />
        <USeparator color="secondary" type="solid" />
        <USeparator color="success" type="solid" />
        <USeparator color="info" type="solid" />
        <USeparator color="warning" type="solid" />
        <USeparator color="error" type="solid" />
        <USeparator color="neutral" type="solid" />
      </div>
    `,
  }),
}

export const WithContent: Story = {
  render: () => ({
    components: { USeparator },
    template: `
      <div class="space-y-8">
        <div>
          <p class="mb-4">Section 1 content here</p>
          <USeparator label="OR" />
          <p class="mt-4">Section 2 content here</p>
        </div>
      </div>
    `,
  }),
}

export const InForm: Story = {
  render: () => ({
    components: { USeparator },
    template: `
      <div class="w-80 space-y-4">
        <button class="w-full px-4 py-2 bg-blue-500 text-white rounded">
          Sign in with Email
        </button>
        <USeparator label="or" />
        <button class="w-full px-4 py-2 bg-gray-100 border rounded">
          Sign in with Google
        </button>
        <button class="w-full px-4 py-2 bg-gray-100 border rounded">
          Sign in with GitHub
        </button>
      </div>
    `,
  }),
}

export const VerticalInLayout: Story = {
  render: () => ({
    components: { USeparator },
    template: `
      <div class="flex gap-4 h-48">
        <div class="flex-1 p-4 bg-gray-50 rounded">
          <p>Left panel content</p>
        </div>
        <USeparator orientation="vertical" />
        <div class="flex-1 p-4 bg-gray-50 rounded">
          <p>Right panel content</p>
        </div>
      </div>
    `,
  }),
}
