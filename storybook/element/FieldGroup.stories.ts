import type { Meta, StoryObj } from '@storybook/vue3'
import UFieldGroup from '@nuxt/ui/components/FieldGroup.vue'
import type { FieldGroupProps } from '@nuxt/ui'

const meta = {
  title: 'Element/FieldGroup',
  component: UFieldGroup,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      description: 'Size of all the children elements',
      table: {
        type: { summary: 'string' },
      },
    },
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: 'The orientation the buttons are laid out',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'horizontal' },
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
} satisfies Meta<FieldGroupProps>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => ({
    components: { UFieldGroup },
    template: `
      <UFieldGroup>
        <button class="px-4 py-2 bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-l-md">
          Button 1
        </button>
        <button class="px-4 py-2 bg-gray-100 hover:bg-gray-200 border-y border-gray-300">
          Button 2
        </button>
        <button class="px-4 py-2 bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-r-md">
          ▼
        </button>
      </UFieldGroup>
    `,
  }),
}

export const Sizes: Story = {
  render: () => ({
    components: { UFieldGroup },
    template: `
      <div class="space-y-4">
        <UFieldGroup size="xs">
          <button class="px-2 py-1 text-xs bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-l-md">Button</button>
          <button class="px-2 py-1 text-xs bg-gray-100 hover:bg-gray-200 border-y border-gray-300">Option</button>
          <button class="px-2 py-1 text-xs bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-r-md">▼</button>
        </UFieldGroup>
        <UFieldGroup size="sm">
          <button class="px-3 py-1.5 text-sm bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-l-md">Button</button>
          <button class="px-3 py-1.5 text-sm bg-gray-100 hover:bg-gray-200 border-y border-gray-300">Option</button>
          <button class="px-3 py-1.5 text-sm bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-r-md">▼</button>
        </UFieldGroup>
        <UFieldGroup size="md">
          <button class="px-4 py-2 bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-l-md">Button</button>
          <button class="px-4 py-2 bg-gray-100 hover:bg-gray-200 border-y border-gray-300">Option</button>
          <button class="px-4 py-2 bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-r-md">▼</button>
        </UFieldGroup>
        <UFieldGroup size="lg">
          <button class="px-5 py-2.5 text-base bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-l-md">Button</button>
          <button class="px-5 py-2.5 text-base bg-gray-100 hover:bg-gray-200 border-y border-gray-300">Option</button>
          <button class="px-5 py-2.5 text-base bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-r-md">▼</button>
        </UFieldGroup>
        <UFieldGroup size="xl">
          <button class="px-6 py-3 text-lg bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-l-md">Button</button>
          <button class="px-6 py-3 text-lg bg-gray-100 hover:bg-gray-200 border-y border-gray-300">Option</button>
          <button class="px-6 py-3 text-lg bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-r-md">▼</button>
        </UFieldGroup>
      </div>
    `,
  }),
}

export const Vertical: Story = {
  render: () => ({
    components: { UFieldGroup },
    template: `
      <UFieldGroup orientation="vertical">
        <button class="px-4 py-2 bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-t-md">
          Submit
        </button>
        <button class="px-4 py-2 bg-gray-100 hover:bg-gray-200 border-x border-gray-300">
          Save Draft
        </button>
        <button class="px-4 py-2 bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-b-md">
          Cancel
        </button>
      </UFieldGroup>
    `,
  }),
}

export const WithInput: Story = {
  render: () => ({
    components: { UFieldGroup },
    template: `
      <UFieldGroup>
        <input
          type="text"
          placeholder="Enter token"
          class="px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button class="px-4 py-2 bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-r-md">
          📋
        </button>
      </UFieldGroup>
    `,
  }),
}

export const WithBadge: Story = {
  render: () => ({
    components: { UFieldGroup },
    template: `
      <UFieldGroup>
        <div class="px-3 py-2 bg-gray-100 border border-gray-300 rounded-l-md text-sm">
          https://
        </div>
        <input
          type="text"
          placeholder="www.example.com"
          class="flex-1 px-4 py-2 border-y border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button class="px-4 py-2 bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-r-md">
          Go
        </button>
      </UFieldGroup>
    `,
  }),
}

export const MultipleButtons: Story = {
  render: () => ({
    components: { UFieldGroup },
    template: `
      <UFieldGroup>
        <button class="px-4 py-2 bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-l-md">
          Left
        </button>
        <button class="px-4 py-2 bg-gray-100 hover:bg-gray-200 border-y border-r border-gray-300">
          Center
        </button>
        <button class="px-4 py-2 bg-gray-100 hover:bg-gray-200 border-y border-r border-gray-300">
          Right
        </button>
        <button class="px-4 py-2 bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-r-md">
          Justify
        </button>
      </UFieldGroup>
    `,
  }),
}

export const MixedElements: Story = {
  render: () => ({
    components: { UFieldGroup },
    template: `
      <UFieldGroup>
        <select class="px-4 py-2 bg-gray-100 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option>USD</option>
          <option>EUR</option>
          <option>GBP</option>
        </select>
        <input
          type="number"
          placeholder="0.00"
          class="flex-1 px-4 py-2 border-y border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button class="px-4 py-2 bg-blue-500 text-white hover:bg-blue-600 border border-blue-500 rounded-r-md">
          Convert
        </button>
      </UFieldGroup>
    `,
  }),
}
