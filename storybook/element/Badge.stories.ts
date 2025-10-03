import type { Meta, StoryObj } from '@storybook/vue3'
import UBadge from '@nuxt/ui/components/Badge.vue'
import type { BadgeProps } from '@nuxt/ui'

const meta = {
  title: 'Element/Badge',
  component: UBadge,
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'Badge text content',
      table: {
        type: { summary: 'string | number' },
      },
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'info', 'warning', 'error', 'neutral'],
      description: 'Color theme of the badge',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'primary' },
      },
    },
    variant: {
      control: 'select',
      options: ['solid', 'outline', 'soft', 'subtle'],
      description: 'Visual variant of the badge',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'solid' },
      },
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      description: 'Size of the badge',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'md' },
      },
    },
    leadingIcon: {
      control: 'text',
      description: 'Icon displayed on the left side',
      table: {
        type: { summary: 'string | object' },
      },
    },
    trailingIcon: {
      control: 'text',
      description: 'Icon displayed on the right side',
      table: {
        type: { summary: 'string | object' },
      },
    },
    square: {
      control: 'boolean',
      description: 'Render with equal padding on all sides',
      table: {
        type: { summary: 'boolean' },
      },
    },
  },
} satisfies Meta<BadgeProps>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    label: 'Badge',
  },
}

export const Colors: Story = {
  render: () => ({
    components: { UBadge },
    template: `
      <div class="flex flex-wrap items-center gap-2">
        <UBadge label="Primary" color="primary" />
        <UBadge label="Secondary" color="secondary" />
        <UBadge label="Success" color="success" />
        <UBadge label="Info" color="info" />
        <UBadge label="Warning" color="warning" />
        <UBadge label="Error" color="error" />
        <UBadge label="Neutral" color="neutral" />
      </div>
    `,
  }),
}

export const Variants: Story = {
  render: () => ({
    components: { UBadge },
    template: `
      <div class="flex flex-wrap items-center gap-2">
        <UBadge label="Solid" variant="solid" />
        <UBadge label="Outline" variant="outline" />
        <UBadge label="Soft" variant="soft" />
        <UBadge label="Subtle" variant="subtle" />
      </div>
    `,
  }),
}

export const Sizes: Story = {
  render: () => ({
    components: { UBadge },
    template: `
      <div class="flex flex-wrap items-center gap-2">
        <UBadge label="XS" size="xs" />
        <UBadge label="SM" size="sm" />
        <UBadge label="MD" size="md" />
        <UBadge label="LG" size="lg" />
        <UBadge label="XL" size="xl" />
      </div>
    `,
  }),
}

export const WithLeadingIcon: Story = {
  args: {
    label: 'Badge',
    leadingIcon: 'i-lucide-check',
  },
}

export const WithTrailingIcon: Story = {
  args: {
    label: 'Badge',
    trailingIcon: 'i-lucide-x',
  },
}

export const WithAvatar: Story = {
  args: {
    label: 'John Doe',
    avatar: {
      src: 'https://avatar.vercel.sh/john',
      alt: 'John Doe',
    },
  },
}

export const Square: Story = {
  render: () => ({
    components: { UBadge },
    template: `
      <div class="flex flex-wrap items-center gap-2">
        <UBadge label="99" square />
        <UBadge label="999+" square />
        <UBadge label="5" square color="error" />
      </div>
    `,
  }),
}

export const StatusIndicators: Story = {
  render: () => ({
    components: { UBadge },
    template: `
      <div class="flex flex-wrap items-center gap-2">
        <UBadge label="Active" color="success" variant="soft" leading-icon="i-lucide-circle" />
        <UBadge label="Pending" color="warning" variant="soft" leading-icon="i-lucide-circle" />
        <UBadge label="Inactive" color="neutral" variant="soft" leading-icon="i-lucide-circle" />
        <UBadge label="Error" color="error" variant="soft" leading-icon="i-lucide-circle" />
      </div>
    `,
  }),
}
