import type { Meta, StoryObj } from '@storybook/vue3'
import UAlert from '@nuxt/ui/components/Alert.vue'
import { AlertProps } from '@nuxt/ui'

const meta = {
  title: 'Element/Alert',
  component: UAlert,
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
  },
} satisfies Meta<AlertProps>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    title: 'Alert',
    description: 'This is an alert message.',
  },
}
