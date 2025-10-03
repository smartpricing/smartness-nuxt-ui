import type { Meta, StoryObj } from '@storybook/vue3'
import USkeleton from '@nuxt/ui/components/Skeleton.vue'
import { SkeletonProps } from '@nuxt/ui'

const meta = {
  title: 'Element/Skeleton',
  component: USkeleton,
  tags: ['autodocs'],
  argTypes: {
    class: {
      control: 'text',
    },
  },
} satisfies Meta<SkeletonProps>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    class: 'h-12 w-full',
  },
}
