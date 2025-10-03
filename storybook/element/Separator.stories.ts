import type { Meta, StoryObj } from '@storybook/vue3'
import USeparator from '@nuxt/ui/components/Separator.vue'
import { SeparatorProps } from '@nuxt/ui'

const meta = {
  title: 'Element/Separator',
  component: USeparator,
  tags: ['autodocs'],
  argTypes: {
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
    },
  },
} satisfies Meta<SeparatorProps>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
