import type { Meta, StoryObj } from '@storybook/vue3'
import UBanner from '@nuxt/ui/components/Banner.vue'
import { BannerProps } from '@nuxt/ui'

const meta = {
  title: 'Element/Banner',
  component: UBanner,
  tags: ['autodocs'],
  argTypes: {
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'warning', 'error', 'neutral'],
    },
  },
} satisfies Meta<BannerProps>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    title: 'Banner',
    description: 'This is a banner message.',
  },
}
