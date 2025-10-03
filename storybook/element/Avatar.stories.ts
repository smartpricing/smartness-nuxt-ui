import type { Meta, StoryObj } from '@storybook/vue3'
import UAvatar from '@nuxt/ui/components/Avatar.vue'
import { AvatarProps } from '@nuxt/ui'

const meta = {
  title: 'Element/Avatar',
  component: UAvatar,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
  },
} satisfies Meta<AvatarProps>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    src: 'https://avatar.vercel.sh/nuxt',
    alt: 'Avatar',
  },
}
