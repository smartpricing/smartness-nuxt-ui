import type { Meta, StoryObj } from '@storybook/vue3'
import UCollapsible from '@nuxt/ui/components/Collapsible.vue'
import type { CollapsibleProps } from '@nuxt/ui'

const meta = {
  title: 'Element/Collapsible',
  component: UCollapsible,
  tags: ['autodocs'],
  argTypes: {
    disabled: {
      control: 'boolean',
      description: 'Prevents the user from interacting with the collapsible',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    defaultOpen: {
      control: 'boolean',
      description: 'The open state when initially rendered',
      table: {
        type: { summary: 'boolean' },
      },
    },
    open: {
      control: 'boolean',
      description: 'The controlled open state (use with v-model)',
      table: {
        type: { summary: 'boolean' },
      },
    },
    unmountOnHide: {
      control: 'boolean',
      description: 'Unmount the element when closed',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
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
} satisfies Meta<CollapsibleProps>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => ({
    components: { UCollapsible },
    template: `
      <UCollapsible class="flex flex-col gap-2 w-64">
        <button class="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-md flex items-center justify-between">
          <span>Click to expand</span>
          <span>▼</span>
        </button>
        <template #content>
          <div class="p-4 bg-gray-50 rounded-md">
            <p>This is the collapsible content. Click the button above to toggle visibility.</p>
          </div>
        </template>
      </UCollapsible>
    `,
  }),
}

export const DefaultOpen: Story = {
  render: () => ({
    components: { UCollapsible },
    template: `
      <UCollapsible default-open class="flex flex-col gap-2 w-64">
        <button class="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-md flex items-center justify-between">
          <span>Already expanded</span>
          <span>▼</span>
        </button>
        <template #content>
          <div class="p-4 bg-gray-50 rounded-md">
            <p>This collapsible starts in the open state.</p>
          </div>
        </template>
      </UCollapsible>
    `,
  }),
}

export const Disabled: Story = {
  render: () => ({
    components: { UCollapsible },
    template: `
      <UCollapsible disabled class="flex flex-col gap-2 w-64">
        <button class="px-4 py-2 bg-gray-100 rounded-md flex items-center justify-between opacity-50 cursor-not-allowed">
          <span>Disabled</span>
          <span>▼</span>
        </button>
        <template #content>
          <div class="p-4 bg-gray-50 rounded-md">
            <p>This content cannot be toggled.</p>
          </div>
        </template>
      </UCollapsible>
    `,
  }),
}

export const UnmountOnHide: Story = {
  render: () => ({
    components: { UCollapsible },
    template: `
      <UCollapsible :unmount-on-hide="false" class="flex flex-col gap-2 w-64">
        <button class="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-md flex items-center justify-between">
          <span>Content stays mounted</span>
          <span>▼</span>
        </button>
        <template #content>
          <div class="p-4 bg-gray-50 rounded-md">
            <p>This content is not unmounted when collapsed. Inspect the DOM to verify.</p>
          </div>
        </template>
      </UCollapsible>
    `,
  }),
}

export const WithRotatingIcon: Story = {
  render: () => ({
    components: { UCollapsible },
    template: `
      <UCollapsible class="flex flex-col gap-2 w-64">
        <button class="group px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-md flex items-center justify-between">
          <span>With rotating icon</span>
          <span class="group-data-[state=open]:rotate-180 transition-transform duration-200">▼</span>
        </button>
        <template #content>
          <div class="p-4 bg-gray-50 rounded-md">
            <p>Notice how the icon rotates when toggled.</p>
          </div>
        </template>
      </UCollapsible>
    `,
  }),
}

export const Controlled: Story = {
  render: () => ({
    components: { UCollapsible },
    setup() {
      const open = ref(false)
      return { open }
    },
    template: `
      <div class="space-y-4">
        <div class="flex gap-2">
          <button @click="open = !open" class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            External Toggle
          </button>
          <span class="flex items-center text-sm text-gray-600">
            State: {{ open ? 'Open' : 'Closed' }}
          </span>
        </div>
        <UCollapsible v-model:open="open" class="flex flex-col gap-2 w-64">
          <button class="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-md flex items-center justify-between">
            <span>Controlled state</span>
            <span>▼</span>
          </button>
          <template #content>
            <div class="p-4 bg-gray-50 rounded-md">
              <p>This collapsible's state is controlled externally with v-model.</p>
            </div>
          </template>
        </UCollapsible>
      </div>
    `,
  }),
}

export const MultipleItems: Story = {
  render: () => ({
    components: { UCollapsible },
    template: `
      <div class="space-y-4 w-64">
        <UCollapsible class="flex flex-col gap-2">
          <button class="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-md flex items-center justify-between">
            <span>Section 1</span>
            <span>▼</span>
          </button>
          <template #content>
            <div class="p-4 bg-gray-50 rounded-md">
              <p>Content for section 1</p>
            </div>
          </template>
        </UCollapsible>

        <UCollapsible class="flex flex-col gap-2">
          <button class="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-md flex items-center justify-between">
            <span>Section 2</span>
            <span>▼</span>
          </button>
          <template #content>
            <div class="p-4 bg-gray-50 rounded-md">
              <p>Content for section 2</p>
            </div>
          </template>
        </UCollapsible>

        <UCollapsible class="flex flex-col gap-2">
          <button class="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-md flex items-center justify-between">
            <span>Section 3</span>
            <span>▼</span>
          </button>
          <template #content>
            <div class="p-4 bg-gray-50 rounded-md">
              <p>Content for section 3</p>
            </div>
          </template>
        </UCollapsible>
      </div>
    `,
  }),
}
