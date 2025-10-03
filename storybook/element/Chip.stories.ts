import type { Meta, StoryObj } from '@storybook/vue3'
import UChip from '@nuxt/ui/components/Chip.vue'
import { ChipProps } from '@nuxt/ui'

const meta = {
  title: 'Element/Chip',
  component: UChip,
  tags: ['autodocs'],
  argTypes: {
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'warning', 'error', 'neutral'],
    },
    as:{
      control: 'text',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl', 'xs', '3xs', '2xs', '2xl', '3xl'],
    },
    position: {
      control: 'select',
      options: ['top-right', 'top-left', 'bottom-right', 'bottom-left'],
    },
    text: {
      control: 'text',
    },
  },
} satisfies Meta<ChipProps>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    text: 'Chip',
  },
}
