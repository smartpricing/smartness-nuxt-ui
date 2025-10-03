import type { Meta, StoryObj } from '@storybook/vue3'
import UCard from '@nuxt/ui/components/Card.vue'
import { CardProps } from '@nuxt/ui'

const meta = {
  title: 'Element/Card',
  component: UCard,
  tags: ['autodocs'],
} satisfies Meta<CardProps>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    title: 'Card Title',
    description: 'Card description goes here.',
  },
}
