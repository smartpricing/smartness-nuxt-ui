import type { Meta, StoryObj } from '@storybook/vue3'
import UAvatarGroup from '@nuxt/ui/components/AvatarGroup.vue'
import { AvatarGroupProps } from '@nuxt/ui'

const meta = {
  title: 'Element/AvatarGroup',
  component: UAvatarGroup,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
  },
} satisfies Meta<AvatarGroupProps>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    items: [
      { src: 'https://avatar.vercel.sh/1', alt: 'User 1' },
      { src: 'https://avatar.vercel.sh/2', alt: 'User 2' },
      { src: 'https://avatar.vercel.sh/3', alt: 'User 3' },
    ],
  },
}
