import type { Meta, StoryObj } from '@storybook/vue3'
import UAvatar from '@nuxt/ui/components/Avatar.vue'
import type { AvatarProps } from '@nuxt/ui'

const meta = {
  title: 'Element/Avatar',
  component: UAvatar,
  tags: ['autodocs'],
  argTypes: {
    src: {
      control: 'text',
      description: 'Image URL',
      table: {
        type: { summary: 'string' },
      },
    },
    alt: {
      control: 'text',
      description: 'Alt text - initials used as fallback when no icon or text provided',
      table: {
        type: { summary: 'string' },
      },
    },
    icon: {
      control: 'text',
      description: 'Iconify icon name for fallback',
      table: {
        type: { summary: 'string | object' },
      },
    },
    text: {
      control: 'text',
      description: 'Fallback text to display',
      table: {
        type: { summary: 'string' },
      },
    },
    size: {
      control: 'select',
      options: ['3xs', '2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl'],
      description: 'Size of the avatar',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'md' },
      },
    },
    chip: {
      control: 'boolean',
      description: 'Display a chip around the avatar (status indicator)',
      table: {
        type: { summary: 'boolean | ChipProps' },
      },
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

export const Sizes: Story = {
  render: () => ({
    components: { UAvatar },
    template: `
      <div class="flex items-center gap-4">
        <UAvatar src="https://avatar.vercel.sh/nuxt" size="3xs" />
        <UAvatar src="https://avatar.vercel.sh/nuxt" size="2xs" />
        <UAvatar src="https://avatar.vercel.sh/nuxt" size="xs" />
        <UAvatar src="https://avatar.vercel.sh/nuxt" size="sm" />
        <UAvatar src="https://avatar.vercel.sh/nuxt" size="md" />
        <UAvatar src="https://avatar.vercel.sh/nuxt" size="lg" />
        <UAvatar src="https://avatar.vercel.sh/nuxt" size="xl" />
        <UAvatar src="https://avatar.vercel.sh/nuxt" size="2xl" />
        <UAvatar src="https://avatar.vercel.sh/nuxt" size="3xl" />
      </div>
    `,
  }),
}

export const WithIcon: Story = {
  args: {
    icon: 'i-lucide-user',
    alt: 'User',
  },
}

export const WithText: Story = {
  args: {
    text: 'JD',
    alt: 'John Doe',
  },
}

export const WithInitials: Story = {
  args: {
    alt: 'Benjamin Canac',
  },
}

export const WithChip: Story = {
  args: {
    src: 'https://avatar.vercel.sh/nuxt',
    alt: 'Avatar',
    chip: true,
  },
}

export const ChipColors: Story = {
  render: () => ({
    components: { UAvatar },
    template: `
      <div class="flex items-center gap-4">
        <UAvatar src="https://avatar.vercel.sh/1" :chip="{ color: 'primary' }" />
        <UAvatar src="https://avatar.vercel.sh/2" :chip="{ color: 'secondary' }" />
        <UAvatar src="https://avatar.vercel.sh/3" :chip="{ color: 'success' }" />
        <UAvatar src="https://avatar.vercel.sh/4" :chip="{ color: 'info' }" />
        <UAvatar src="https://avatar.vercel.sh/5" :chip="{ color: 'warning' }" />
        <UAvatar src="https://avatar.vercel.sh/6" :chip="{ color: 'error' }" />
        <UAvatar src="https://avatar.vercel.sh/7" :chip="{ color: 'neutral' }" />
      </div>
    `,
  }),
}
