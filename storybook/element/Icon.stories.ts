import type { Meta, StoryObj } from '@storybook/vue3'
import UIcon from '@nuxt/ui/components/Icon.vue'
import { IconProps } from '@nuxt/ui'

const meta = {
  title: 'Element/Icon',
  component: UIcon,
  tags: ['autodocs'],
} satisfies Meta<IconProps>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    name: 'i-heroicons-home',
  },
}
