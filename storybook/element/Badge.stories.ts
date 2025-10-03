import type { Meta, StoryObj } from '@storybook/vue3'
import UBadge from '@nuxt/ui/components/Badge.vue'
import { BadgeProps } from '@nuxt/ui'

const meta = {
  title: 'Element/Badge',
  component: UBadge,
  tags: ['autodocs'],
  argTypes: {
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'warning', 'error', 'neutral'],
    },
    variant: {
      control: 'select',
      options: ['solid', 'outline', 'soft', 'subtle'],
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg'],
    },
  },
} satisfies Meta<BadgeProps>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    label: 'Badge',
  },
}
