import type { Meta, StoryObj } from '@storybook/vue3'
import UIcon from '@nuxt/ui/components/Icon.vue'
import type { IconProps } from '@nuxt/ui'

const meta = {
  title: 'Element/Icon',
  component: UIcon,
  tags: ['autodocs'],
  argTypes: {
    name: {
      control: 'text',
      description: 'Icon name from Iconify or a Vue component',
      table: {
        type: { summary: 'string | object' },
      },
    },
    mode: {
      control: 'select',
      options: ['svg', 'css'],
      description: 'Rendering mode for the icon',
      table: {
        type: { summary: 'string' },
      },
    },
    size: {
      control: 'text',
      description: 'Size of the icon',
      table: {
        type: { summary: 'string | number' },
      },
    },
  },
} satisfies Meta<IconProps>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    name: 'i-lucide-lightbulb',
  },
}

export const Sizes: Story = {
  render: () => ({
    components: { UIcon },
    template: `
      <div class="flex items-center gap-4">
        <UIcon name="i-lucide-star" class="size-4" />
        <UIcon name="i-lucide-star" class="size-5" />
        <UIcon name="i-lucide-star" class="size-6" />
        <UIcon name="i-lucide-star" class="size-8" />
        <UIcon name="i-lucide-star" class="size-10" />
        <UIcon name="i-lucide-star" class="size-12" />
        <UIcon name="i-lucide-star" class="size-16" />
      </div>
    `,
  }),
}

export const Colors: Story = {
  render: () => ({
    components: { UIcon },
    template: `
      <div class="flex items-center gap-4">
        <UIcon name="i-lucide-heart" class="size-8 text-red-500" />
        <UIcon name="i-lucide-heart" class="size-8 text-blue-500" />
        <UIcon name="i-lucide-heart" class="size-8 text-green-500" />
        <UIcon name="i-lucide-heart" class="size-8 text-yellow-500" />
        <UIcon name="i-lucide-heart" class="size-8 text-purple-500" />
        <UIcon name="i-lucide-heart" class="size-8 text-pink-500" />
      </div>
    `,
  }),
}

export const CommonIcons: Story = {
  render: () => ({
    components: { UIcon },
    template: `
      <div class="grid grid-cols-8 gap-4">
        <div class="flex flex-col items-center gap-2">
          <UIcon name="i-lucide-home" class="size-6" />
          <span class="text-xs">home</span>
        </div>
        <div class="flex flex-col items-center gap-2">
          <UIcon name="i-lucide-user" class="size-6" />
          <span class="text-xs">user</span>
        </div>
        <div class="flex flex-col items-center gap-2">
          <UIcon name="i-lucide-settings" class="size-6" />
          <span class="text-xs">settings</span>
        </div>
        <div class="flex flex-col items-center gap-2">
          <UIcon name="i-lucide-search" class="size-6" />
          <span class="text-xs">search</span>
        </div>
        <div class="flex flex-col items-center gap-2">
          <UIcon name="i-lucide-bell" class="size-6" />
          <span class="text-xs">bell</span>
        </div>
        <div class="flex flex-col items-center gap-2">
          <UIcon name="i-lucide-mail" class="size-6" />
          <span class="text-xs">mail</span>
        </div>
        <div class="flex flex-col items-center gap-2">
          <UIcon name="i-lucide-calendar" class="size-6" />
          <span class="text-xs">calendar</span>
        </div>
        <div class="flex flex-col items-center gap-2">
          <UIcon name="i-lucide-star" class="size-6" />
          <span class="text-xs">star</span>
        </div>
        <div class="flex flex-col items-center gap-2">
          <UIcon name="i-lucide-heart" class="size-6" />
          <span class="text-xs">heart</span>
        </div>
        <div class="flex flex-col items-center gap-2">
          <UIcon name="i-lucide-check" class="size-6" />
          <span class="text-xs">check</span>
        </div>
        <div class="flex flex-col items-center gap-2">
          <UIcon name="i-lucide-x" class="size-6" />
          <span class="text-xs">x</span>
        </div>
        <div class="flex flex-col items-center gap-2">
          <UIcon name="i-lucide-plus" class="size-6" />
          <span class="text-xs">plus</span>
        </div>
        <div class="flex flex-col items-center gap-2">
          <UIcon name="i-lucide-minus" class="size-6" />
          <span class="text-xs">minus</span>
        </div>
        <div class="flex flex-col items-center gap-2">
          <UIcon name="i-lucide-trash" class="size-6" />
          <span class="text-xs">trash</span>
        </div>
        <div class="flex flex-col items-center gap-2">
          <UIcon name="i-lucide-edit" class="size-6" />
          <span class="text-xs">edit</span>
        </div>
        <div class="flex flex-col items-center gap-2">
          <UIcon name="i-lucide-download" class="size-6" />
          <span class="text-xs">download</span>
        </div>
      </div>
    `,
  }),
}

export const Arrows: Story = {
  render: () => ({
    components: { UIcon },
    template: `
      <div class="flex items-center gap-4">
        <UIcon name="i-lucide-arrow-up" class="size-6" />
        <UIcon name="i-lucide-arrow-down" class="size-6" />
        <UIcon name="i-lucide-arrow-left" class="size-6" />
        <UIcon name="i-lucide-arrow-right" class="size-6" />
        <UIcon name="i-lucide-chevron-up" class="size-6" />
        <UIcon name="i-lucide-chevron-down" class="size-6" />
        <UIcon name="i-lucide-chevron-left" class="size-6" />
        <UIcon name="i-lucide-chevron-right" class="size-6" />
      </div>
    `,
  }),
}

export const Status: Story = {
  render: () => ({
    components: { UIcon },
    template: `
      <div class="flex items-center gap-4">
        <UIcon name="i-lucide-check-circle" class="size-8 text-green-500" />
        <UIcon name="i-lucide-alert-circle" class="size-8 text-yellow-500" />
        <UIcon name="i-lucide-x-circle" class="size-8 text-red-500" />
        <UIcon name="i-lucide-info" class="size-8 text-blue-500" />
        <UIcon name="i-lucide-help-circle" class="size-8 text-gray-500" />
      </div>
    `,
  }),
}

export const Social: Story = {
  render: () => ({
    components: { UIcon },
    template: `
      <div class="flex items-center gap-4">
        <UIcon name="i-lucide-github" class="size-6" />
        <UIcon name="i-lucide-twitter" class="size-6" />
        <UIcon name="i-lucide-linkedin" class="size-6" />
        <UIcon name="i-lucide-facebook" class="size-6" />
        <UIcon name="i-lucide-instagram" class="size-6" />
        <UIcon name="i-lucide-youtube" class="size-6" />
      </div>
    `,
  }),
}
