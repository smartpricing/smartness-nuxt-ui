import type { Meta, StoryObj } from '@storybook/vue3'
import UCalendar from '@nuxt/ui/components/Calendar.vue'
import { CalendarProps } from '@nuxt/ui'

const meta = {
  title: 'Element/Calendar',
  component: UCalendar,
  tags: ['autodocs'],
} satisfies Meta<CalendarProps>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
