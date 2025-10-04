import type { Meta, StoryObj } from '@storybook/vue3'
import UTextarea from '@nuxt/ui/components/Textarea.vue'
import { TextareaProps } from '@nuxt/ui'

const meta = {
  title: 'Form/Textarea',
  component: UTextarea,
  tags: ['autodocs'],
  argTypes: {
    placeholder: {
      control: 'text',
      description: 'Placeholder text',
    },
    modelValue: {
      control: 'text',
      description: 'The textarea value',
    },
    rows: {
      control: 'number',
      description: 'Number of visible text lines',
    },
    maxrows: {
      control: 'number',
      description: 'Maximum rows when autoresizing',
    },
    autoresize: {
      control: 'boolean',
      description: 'Enable autoresizing',
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'info', 'warning', 'error', 'neutral'],
      description: 'Color theme',
    },
    variant: {
      control: 'select',
      options: ['outline', 'soft', 'subtle', 'ghost', 'none'],
      description: 'Visual variant',
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      description: 'Size of the textarea',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the textarea is disabled',
    },
    required: {
      control: 'boolean',
      description: 'Whether the textarea is required',
    },
    loading: {
      control: 'boolean',
      description: 'Show loading state',
    },
  },
} satisfies Meta<TextareaProps>

export default meta
type Story = StoryObj<typeof meta>

/**
 * Default textarea with 3 rows
 */
export const Default: Story = {
  args: {
    placeholder: 'Type something...',
  },
}

/**
 * Custom number of rows
 */
export const CustomRows: Story = {
  args: {
    rows: 6,
    placeholder: 'Type something...',
  },
}

/**
 * Large textarea
 */
export const LargeTextarea: Story = {
  args: {
    rows: 12,
    placeholder: 'Type a long message...',
  },
}

/**
 * Textarea with autoresize enabled
 */
export const Autoresize: Story = {
  args: {
    autoresize: true,
    placeholder: 'Type something and watch it grow...',
    defaultValue: 'This textarea will automatically resize as you type more content.',
  },
}

/**
 * Autoresize with maximum rows
 */
export const AutoresizeWithMaxRows: Story = {
  args: {
    autoresize: true,
    maxrows: 6,
    placeholder: 'Type something...',
    defaultValue: 'This textarea will autoresize up to 6 rows maximum.',
  },
}

/**
 * No resize (fixed height)
 */
export const NoResize: Story = {
  args: {
    rows: 5,
    placeholder: 'Fixed height textarea...',
  },
}

/**
 * Disabled textarea
 */
export const Disabled: Story = {
  args: {
    placeholder: 'Disabled textarea',
    disabled: true,
  },
}

/**
 * Disabled with content
 */
export const DisabledWithContent: Story = {
  args: {
    defaultValue: 'This textarea is disabled with some content.',
    disabled: true,
  },
}

/**
 * Extra small size
 */
export const SizeXS: Story = {
  args: {
    size: 'xs',
    placeholder: 'Extra small',
    rows: 3,
  },
}

/**
 * Small size
 */
export const SizeSmall: Story = {
  args: {
    size: 'sm',
    placeholder: 'Small textarea',
    rows: 3,
  },
}

/**
 * Medium size (default)
 */
export const SizeMedium: Story = {
  args: {
    size: 'md',
    placeholder: 'Medium textarea',
    rows: 3,
  },
}

/**
 * Large size
 */
export const SizeLarge: Story = {
  args: {
    size: 'lg',
    placeholder: 'Large textarea',
    rows: 3,
  },
}

/**
 * Extra large size
 */
export const SizeXL: Story = {
  args: {
    size: 'xl',
    placeholder: 'Extra large',
    rows: 3,
  },
}

/**
 * Outline variant (default)
 */
export const VariantOutline: Story = {
  args: {
    variant: 'outline',
    placeholder: 'Outline variant',
  },
}

/**
 * Soft variant
 */
export const VariantSoft: Story = {
  args: {
    variant: 'soft',
    placeholder: 'Soft variant',
  },
}

/**
 * Subtle variant
 */
export const VariantSubtle: Story = {
  args: {
    variant: 'subtle',
    placeholder: 'Subtle variant',
  },
}

/**
 * Ghost variant
 */
export const VariantGhost: Story = {
  args: {
    variant: 'ghost',
    placeholder: 'Ghost variant',
  },
}

/**
 * Primary color (default)
 */
export const ColorPrimary: Story = {
  args: {
    color: 'primary',
    placeholder: 'Primary color',
    highlight: true,
  },
}

/**
 * Error color
 */
export const ColorError: Story = {
  args: {
    color: 'error',
    placeholder: 'Error color',
    highlight: true,
  },
}

/**
 * Success color
 */
export const ColorSuccess: Story = {
  args: {
    color: 'success',
    placeholder: 'Success color',
    highlight: true,
  },
}

/**
 * With leading icon
 */
export const WithLeadingIcon: Story = {
  args: {
    leadingIcon: 'i-lucide-message-square',
    placeholder: 'Enter your message...',
    rows: 1,
  },
}

/**
 * With trailing icon
 */
export const WithTrailingIcon: Story = {
  args: {
    trailingIcon: 'i-lucide-send',
    placeholder: 'Type and send...',
    rows: 1,
  },
}

/**
 * Loading state
 */
export const Loading: Story = {
  args: {
    loading: true,
    trailing: true,
    placeholder: 'Processing...',
  },
}
