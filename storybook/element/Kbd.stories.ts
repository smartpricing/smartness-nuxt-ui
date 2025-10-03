import type { Meta, StoryObj } from '@storybook/vue3'
import UKbd from '@nuxt/ui/components/Kbd.vue'
import { KbdProps } from '@nuxt/ui'

const meta = {
  title: 'Element/Kbd',
  component: UKbd,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg'],
    },
  },
} satisfies Meta<KbdProps>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    value: 'Ctrl',
  },
}
