import type { Meta, StoryObj } from '@storybook/vue3'
import UCheckbox from '@nuxt/ui/components/Checkbox.vue'
import { CheckboxProps } from '@nuxt/ui'

const meta = {
  title: 'Form/Checkbox',
  component: UCheckbox,
  tags: ['autodocs'],
  argTypes: {
    modelValue: {
      control: 'radio',
      options: [false, true, 'indeterminate'],
      description: 'The checked state of the checkbox',
    },
    label: {
      control: 'text',
      description: 'The label text for the checkbox',
    },
    description: {
      control: 'text',
      description: 'Helper text displayed below the label',
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'info', 'warning', 'error', 'neutral'],
      description: 'The color theme of the checkbox',
    },
    variant: {
      control: 'select',
      options: ['list', 'card'],
      description: 'The visual variant of the checkbox',
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      description: 'The size of the checkbox',
    },
    indicator: {
      control: 'select',
      options: ['start', 'end', 'hidden'],
      description: 'Position of the checkbox indicator',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the checkbox is disabled',
    },
    required: {
      control: 'boolean',
      description: 'Whether the checkbox is required',
    },
    icon: {
      control: 'text',
      description: 'Custom icon when checked (e.g., i-lucide-heart)',
    },
    indeterminateIcon: {
      control: 'text',
      description: 'Custom icon for indeterminate state',
    },
  },
} satisfies Meta<CheckboxProps>

export default meta
type Story = StoryObj<typeof meta>

/**
 * Default checkbox without any label
 */
export const Default: Story = {
  args: {},
}

/**
 * Checkbox with label text
 */
export const WithLabel: Story = {
  args: {
    label: 'Accept terms',
  },
}

/**
 * Checkbox in checked state
 */
export const Checked: Story = {
  args: {
    label: 'Accept terms',
    defaultValue: true,
  },
}

/**
 * Checkbox with label and description
 */
export const WithDescription: Story = {
  args: {
    label: 'Accept terms and conditions',
    description: 'By checking this, you agree to our terms of service and privacy policy.',
  },
}

/**
 * Checkbox in indeterminate state (partial selection)
 */
export const Indeterminate: Story = {
  args: {
    label: 'Select all',
    defaultValue: 'indeterminate',
  },
}

/**
 * Disabled checkbox
 */
export const Disabled: Story = {
  args: {
    label: 'Disabled option',
    disabled: true,
  },
}

/**
 * Disabled checkbox in checked state
 */
export const DisabledChecked: Story = {
  args: {
    label: 'Disabled checked',
    disabled: true,
    defaultValue: true,
  },
}

/**
 * Required checkbox with asterisk indicator
 */
export const Required: Story = {
  args: {
    label: 'I agree to the terms',
    required: true,
  },
}

/**
 * Checkbox with custom check icon
 */
export const CustomIcon: Story = {
  args: {
    label: 'Favorite',
    icon: 'i-lucide-heart',
    defaultValue: true,
  },
}

/**
 * Checkbox with custom indeterminate icon
 */
export const CustomIndeterminateIcon: Story = {
  args: {
    label: 'Select some',
    indeterminateIcon: 'i-lucide-plus',
    defaultValue: 'indeterminate',
  },
}

/**
 * Card variant - checkbox styled as a card
 */
export const CardVariant: Story = {
  args: {
    label: 'Pro Plan',
    description: 'Advanced features for power users',
    variant: 'card',
    defaultValue: true,
  },
}

/**
 * Card variant with indicator at the end
 */
export const CardVariantIndicatorEnd: Story = {
  args: {
    label: 'Business Plan',
    description: 'Everything in Pro, plus team collaboration',
    variant: 'card',
    indicator: 'end',
    defaultValue: true,
  },
}

/**
 * Extra small size
 */
export const SizeXS: Story = {
  args: {
    label: 'Extra small checkbox',
    size: 'xs',
  },
}

/**
 * Small size
 */
export const SizeSmall: Story = {
  args: {
    label: 'Small checkbox',
    size: 'sm',
  },
}

/**
 * Medium size (default)
 */
export const SizeMedium: Story = {
  args: {
    label: 'Medium checkbox',
    size: 'md',
  },
}

/**
 * Large size
 */
export const SizeLarge: Story = {
  args: {
    label: 'Large checkbox',
    size: 'lg',
  },
}

/**
 * Extra large size
 */
export const SizeXL: Story = {
  args: {
    label: 'Extra large checkbox',
    size: 'xl',
  },
}

/**
 * Primary color (default)
 */
export const ColorPrimary: Story = {
  args: {
    label: 'Primary color',
    color: 'primary',
    defaultValue: true,
  },
}

/**
 * Secondary color
 */
export const ColorSecondary: Story = {
  args: {
    label: 'Secondary color',
    color: 'secondary',
    defaultValue: true,
  },
}

/**
 * Success color
 */
export const ColorSuccess: Story = {
  args: {
    label: 'Success color',
    color: 'success',
    defaultValue: true,
  },
}

/**
 * Info color
 */
export const ColorInfo: Story = {
  args: {
    label: 'Info color',
    color: 'info',
    defaultValue: true,
  },
}

/**
 * Warning color
 */
export const ColorWarning: Story = {
  args: {
    label: 'Warning color',
    color: 'warning',
    defaultValue: true,
  },
}

/**
 * Error color
 */
export const ColorError: Story = {
  args: {
    label: 'Error color',
    color: 'error',
    defaultValue: true,
  },
}

/**
 * Neutral color
 */
export const ColorNeutral: Story = {
  args: {
    label: 'Neutral color',
    color: 'neutral',
    defaultValue: true,
  },
}

/**
 * Hidden indicator with centered label
 */
export const HiddenIndicator: Story = {
  args: {
    label: 'Hidden checkbox',
    indicator: 'hidden',
  },
}
