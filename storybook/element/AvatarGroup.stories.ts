import type { Meta, StoryObj } from '@storybook/vue3'
import UAvatarGroup from '@nuxt/ui/components/AvatarGroup.vue'
import type { AvatarGroupProps } from '@nuxt/ui'

const meta = {
  title: 'Element/AvatarGroup',
  component: UAvatarGroup,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['3xs', '2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl'],
      description: 'Size of all avatars in the group',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'md' },
      },
    },
    max: {
      control: 'number',
      description: 'Maximum number of avatars to display before showing overflow count',
      table: {
        type: { summary: 'string | number' },
      },
    },
  },
} satisfies Meta<AvatarGroupProps>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => ({
    components: { UAvatarGroup },
    template: `
      <UAvatarGroup>
        <UAvatar src="https://avatar.vercel.sh/1" alt="User 1" />
        <UAvatar src="https://avatar.vercel.sh/2" alt="User 2" />
        <UAvatar src="https://avatar.vercel.sh/3" alt="User 3" />
        <UAvatar src="https://avatar.vercel.sh/4" alt="User 4" />
      </UAvatarGroup>
    `,
  }),
}

export const WithMax: Story = {
  render: () => ({
    components: { UAvatarGroup },
    template: `
      <UAvatarGroup :max="3">
        <UAvatar src="https://avatar.vercel.sh/1" alt="User 1" />
        <UAvatar src="https://avatar.vercel.sh/2" alt="User 2" />
        <UAvatar src="https://avatar.vercel.sh/3" alt="User 3" />
        <UAvatar src="https://avatar.vercel.sh/4" alt="User 4" />
        <UAvatar src="https://avatar.vercel.sh/5" alt="User 5" />
        <UAvatar src="https://avatar.vercel.sh/6" alt="User 6" />
      </UAvatarGroup>
    `,
  }),
}

export const Sizes: Story = {
  render: () => ({
    components: { UAvatarGroup },
    template: `
      <div class="space-y-4">
        <UAvatarGroup size="xs">
          <UAvatar src="https://avatar.vercel.sh/1" />
          <UAvatar src="https://avatar.vercel.sh/2" />
          <UAvatar src="https://avatar.vercel.sh/3" />
        </UAvatarGroup>
        <UAvatarGroup size="sm">
          <UAvatar src="https://avatar.vercel.sh/1" />
          <UAvatar src="https://avatar.vercel.sh/2" />
          <UAvatar src="https://avatar.vercel.sh/3" />
        </UAvatarGroup>
        <UAvatarGroup size="md">
          <UAvatar src="https://avatar.vercel.sh/1" />
          <UAvatar src="https://avatar.vercel.sh/2" />
          <UAvatar src="https://avatar.vercel.sh/3" />
        </UAvatarGroup>
        <UAvatarGroup size="lg">
          <UAvatar src="https://avatar.vercel.sh/1" />
          <UAvatar src="https://avatar.vercel.sh/2" />
          <UAvatar src="https://avatar.vercel.sh/3" />
        </UAvatarGroup>
        <UAvatarGroup size="xl">
          <UAvatar src="https://avatar.vercel.sh/1" />
          <UAvatar src="https://avatar.vercel.sh/2" />
          <UAvatar src="https://avatar.vercel.sh/3" />
        </UAvatarGroup>
      </div>
    `,
  }),
}

export const WithInitials: Story = {
  render: () => ({
    components: { UAvatarGroup },
    template: `
      <UAvatarGroup>
        <UAvatar alt="John Doe" />
        <UAvatar alt="Jane Smith" />
        <UAvatar alt="Bob Wilson" />
        <UAvatar alt="Alice Brown" />
      </UAvatarGroup>
    `,
  }),
}
