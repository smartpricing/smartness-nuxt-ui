import type { Meta, StoryObj } from '@storybook/vue3'
import UProgress from '@nuxt/ui/components/Progress.vue'
import { ProgressProps } from '@nuxt/ui'

const meta = {
  title: 'Element/Progress',
  component: UProgress,
  tags: ['autodocs'],
  argTypes: {
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'warning', 'error', 'neutral'],
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg'],
    },
  },
} satisfies Meta<ProgressProps>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    value: 50,
  },
}
