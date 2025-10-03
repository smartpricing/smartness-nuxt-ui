import type { Meta, StoryObj } from '@storybook/vue3'
import UFieldGroup from '@nuxt/ui/components/FieldGroup.vue'
import { FieldGroupProps } from '@nuxt/ui'

const meta = {
  title: 'Element/FieldGroup',
  component: UFieldGroup,
  tags: ['autodocs'],
} satisfies Meta<FieldGroupProps>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    label: 'Field Group',
  },
}
