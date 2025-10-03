import type { Meta, StoryObj } from '@storybook/vue3'
import UKbd from '@nuxt/ui/components/Kbd.vue'
import type { KbdProps } from '@nuxt/ui'

const meta = {
  title: 'Element/Kbd',
  component: UKbd,
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: 'text',
      description: 'The keyboard key value to display',
      table: {
        type: { summary: 'string' },
      },
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'info', 'warning', 'error', 'neutral'],
      description: 'Color theme of the keyboard key',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'neutral' },
      },
    },
    variant: {
      control: 'select',
      options: ['solid', 'outline', 'soft', 'subtle'],
      description: 'Visual variant of the keyboard key',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'outline' },
      },
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the keyboard key',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'md' },
      },
    },
    as: {
      control: 'text',
      description: 'The element or component this component should render as',
      table: {
        type: { summary: 'any' },
        defaultValue: { summary: 'kbd' },
      },
    },
  },
} satisfies Meta<KbdProps>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    value: 'K',
  },
}

export const Sizes: Story = {
  render: () => ({
    components: { UKbd },
    template: `
      <div class="flex items-center gap-4">
        <UKbd size="sm" value="K" />
        <UKbd size="md" value="K" />
        <UKbd size="lg" value="K" />
      </div>
    `,
  }),
}

export const Colors: Story = {
  render: () => ({
    components: { UKbd },
    template: `
      <div class="flex flex-wrap items-center gap-2">
        <UKbd color="primary" value="K" />
        <UKbd color="secondary" value="K" />
        <UKbd color="success" value="K" />
        <UKbd color="info" value="K" />
        <UKbd color="warning" value="K" />
        <UKbd color="error" value="K" />
        <UKbd color="neutral" value="K" />
      </div>
    `,
  }),
}

export const Variants: Story = {
  render: () => ({
    components: { UKbd },
    template: `
      <div class="flex items-center gap-4">
        <UKbd variant="solid" value="K" />
        <UKbd variant="outline" value="K" />
        <UKbd variant="soft" value="K" />
        <UKbd variant="subtle" value="K" />
      </div>
    `,
  }),
}

export const SpecialKeys: Story = {
  render: () => ({
    components: { UKbd },
    template: `
      <div class="flex flex-wrap items-center gap-2">
        <UKbd value="meta" />
        <UKbd value="ctrl" />
        <UKbd value="shift" />
        <UKbd value="alt" />
        <UKbd value="enter" />
        <UKbd value="escape" />
        <UKbd value="tab" />
        <UKbd value="delete" />
      </div>
    `,
  }),
}

export const KeyCombinations: Story = {
  render: () => ({
    components: { UKbd },
    template: `
      <div class="space-y-2">
        <div class="flex items-center gap-2">
          <span class="text-sm">Copy:</span>
          <UKbd value="meta" />
          <span>+</span>
          <UKbd value="C" />
        </div>
        <div class="flex items-center gap-2">
          <span class="text-sm">Paste:</span>
          <UKbd value="meta" />
          <span>+</span>
          <UKbd value="V" />
        </div>
        <div class="flex items-center gap-2">
          <span class="text-sm">Save:</span>
          <UKbd value="meta" />
          <span>+</span>
          <UKbd value="S" />
        </div>
        <div class="flex items-center gap-2">
          <span class="text-sm">Undo:</span>
          <UKbd value="meta" />
          <span>+</span>
          <UKbd value="Z" />
        </div>
        <div class="flex items-center gap-2">
          <span class="text-sm">Redo:</span>
          <UKbd value="meta" />
          <span>+</span>
          <UKbd value="shift" />
          <span>+</span>
          <UKbd value="Z" />
        </div>
      </div>
    `,
  }),
}

export const InSentence: Story = {
  render: () => ({
    components: { UKbd },
    template: `
      <p class="text-sm">
        Press <UKbd value="meta" /> + <UKbd value="K" /> to open the command palette.
      </p>
    `,
  }),
}

export const WithSlot: Story = {
  render: () => ({
    components: { UKbd },
    template: `
      <div class="flex items-center gap-2">
        <UKbd>⌘</UKbd>
        <UKbd>⇧</UKbd>
        <UKbd>⌥</UKbd>
        <UKbd>⌃</UKbd>
      </div>
    `,
  }),
}
