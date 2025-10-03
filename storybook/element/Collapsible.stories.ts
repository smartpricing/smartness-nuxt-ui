import type { Meta, StoryObj } from '@storybook/vue3'
import UCollapsible from '@nuxt/ui/components/Collapsible.vue'
import { CollapsibleProps } from '@nuxt/ui'

const meta = {
  title: 'Element/Collapsible',
  component: UCollapsible,
  tags: ['autodocs'],
} satisfies Meta<CollapsibleProps>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    items: [
      { label: 'Item 1', content: 'Content 1' },
      { label: 'Item 2', content: 'Content 2' },
    ],
  },
}
