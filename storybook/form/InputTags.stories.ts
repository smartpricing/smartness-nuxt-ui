import type { Meta, StoryObj } from '@storybook/vue3'
import UInputTags from '@nuxt/ui/components/InputTags.vue'
import type { InputTagsProps } from '@nuxt/ui'

const meta = {
  title: 'Form/InputTags',
  component: UInputTags,
  tags: ['autodocs'],
  argTypes: {
    modelValue: {
      control: 'object',
      description: 'The controlled value of the tags input. Can be bind as v-model',
      table: {
        type: { summary: 'AcceptableInputValue[] | null' },
      },
    },
    defaultValue: {
      control: 'object',
      description: 'The value of the tags that should be added. Use when you do not need to control the state',
      table: {
        type: { summary: 'AcceptableInputValue[]' },
      },
    },
    placeholder: {
      control: 'text',
      description: 'The placeholder text when the input is empty',
      table: {
        type: { summary: 'string' },
      },
    },
    maxLength: {
      control: 'number',
      description: 'The maximum number of character allowed',
      table: {
        type: { summary: 'number' },
      },
    },
    max: {
      control: 'number',
      description: 'Maximum number of tags',
      table: {
        type: { summary: 'number' },
      },
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'info', 'warning', 'error', 'neutral'],
      description: 'Color theme',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'primary' },
      },
    },
    variant: {
      control: 'select',
      options: ['outline', 'soft', 'subtle', 'ghost', 'none'],
      description: 'Visual variant',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'outline' },
      },
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      description: 'Size of the input tags',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'md' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'When true, prevents the user from interacting with the tags input',
      table: {
        type: { summary: 'boolean' },
      },
    },
    required: {
      control: 'boolean',
      description: 'When true, indicates that the user must set the value before the owning form can be submitted',
      table: {
        type: { summary: 'boolean' },
      },
    },
    highlight: {
      control: 'boolean',
      description: 'Highlight the ring color like a focus state',
      table: {
        type: { summary: 'boolean' },
      },
    },
    addOnPaste: {
      control: 'boolean',
      description: 'When true, allow adding tags on paste. Work in conjunction with delimiter prop',
      table: {
        type: { summary: 'boolean' },
      },
    },
    addOnTab: {
      control: 'boolean',
      description: 'When true allow adding tags on tab keydown',
      table: {
        type: { summary: 'boolean' },
      },
    },
    addOnBlur: {
      control: 'boolean',
      description: 'When true allow adding tags blur input',
      table: {
        type: { summary: 'boolean' },
      },
    },
    duplicate: {
      control: 'boolean',
      description: 'When true, allow duplicated tags',
      table: {
        type: { summary: 'boolean' },
      },
    },
    delimiter: {
      control: 'text',
      description: 'The character or regular expression to trigger the addition of a new tag',
      table: {
        type: { summary: 'string | RegExp' },
      },
    },
    deleteIcon: {
      control: 'text',
      description: 'The icon displayed to delete a tag',
      table: {
        type: { summary: 'string | object' },
        defaultValue: { summary: 'i-lucide-x' },
      },
    },
    icon: {
      control: 'text',
      description: 'Display an icon based on the leading and trailing props',
      table: {
        type: { summary: 'string | object' },
      },
    },
    leadingIcon: {
      control: 'text',
      description: 'Display an icon on the left side',
      table: {
        type: { summary: 'string | object' },
      },
    },
    trailingIcon: {
      control: 'text',
      description: 'Display an icon on the right side',
      table: {
        type: { summary: 'string | object' },
      },
    },
    leading: {
      control: 'boolean',
      description: 'When true, the icon will be displayed on the left side',
      table: {
        type: { summary: 'boolean' },
      },
    },
    trailing: {
      control: 'boolean',
      description: 'When true, the icon will be displayed on the right side',
      table: {
        type: { summary: 'boolean' },
      },
    },
    loading: {
      control: 'boolean',
      description: 'When true, the loading icon will be displayed',
      table: {
        type: { summary: 'boolean' },
      },
    },
    loadingIcon: {
      control: 'text',
      description: 'The icon when the loading prop is true',
      table: {
        type: { summary: 'string | object' },
        defaultValue: { summary: 'i-lucide-loader-circle' },
      },
    },
    autofocus: {
      control: 'boolean',
      description: 'Autofocus the input',
      table: {
        type: { summary: 'boolean' },
      },
    },
    autofocusDelay: {
      control: 'number',
      description: 'Delay before autofocus',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '0' },
      },
    },
    id: {
      control: 'text',
      description: 'Id of the element',
      table: {
        type: { summary: 'string' },
      },
    },
    name: {
      control: 'text',
      description: 'The name of the field. Submitted with its owning form as part of a name/value pair',
      table: {
        type: { summary: 'string' },
      },
    },
    'onUpdate:modelValue': {
      action: 'update:modelValue',
      description: 'Emitted when the value changes',
    },
    onChange: {
      action: 'change',
      description: 'Emitted when the value changes',
    },
    onBlur: {
      action: 'blur',
      description: 'Emitted when input loses focus',
    },
    onFocus: {
      action: 'focus',
      description: 'Emitted when input gains focus',
    },
    onAddTag: {
      action: 'addTag',
      description: 'Emitted when a tag is added',
    },
    onRemoveTag: {
      action: 'removeTag',
      description: 'Emitted when a tag is removed',
    },
    onInvalid: {
      action: 'invalid',
      description: 'Emitted when an invalid tag is entered',
    },
  },
} satisfies Meta<typeof UInputTags>

export default meta
type Story = StoryObj<typeof meta>

/**
 * Default tags input
 */
export const Default: Story = {
  args: {
    placeholder: 'Enter tags...',
  },
}

/**
 * With default tags
 */
export const WithDefaultTags: Story = {
  args: {
    defaultValue: ['Vue', 'Nuxt', 'TypeScript'],
    placeholder: 'Add more tags...',
  },
}

/**
 * With placeholder
 */
export const WithPlaceholder: Story = {
  args: {
    placeholder: 'Type and press Enter',
  },
}

/**
 * With max length per tag
 */
export const WithMaxLength: Story = {
  args: {
    maxLength: 10,
    placeholder: 'Max 10 characters per tag',
  },
}

/**
 * With max number of tags
 */
export const WithMaxTags: Story = {
  args: {
    max: 5,
    defaultValue: ['Tag 1', 'Tag 2'],
    placeholder: 'Max 5 tags allowed',
  },
}

/**
 * Allow duplicate tags
 */
export const AllowDuplicates: Story = {
  args: {
    duplicate: true,
    placeholder: 'Duplicates allowed',
  },
}

/**
 * Add tags on paste
 */
export const AddOnPaste: Story = {
  args: {
    addOnPaste: true,
    placeholder: 'Paste comma-separated tags',
  },
}

/**
 * Add tags on Tab key
 */
export const AddOnTab: Story = {
  args: {
    addOnTab: true,
    placeholder: 'Press Tab to add tag',
  },
}

/**
 * Add tags on blur
 */
export const AddOnBlur: Story = {
  args: {
    addOnBlur: true,
    placeholder: 'Tags added on blur',
  },
}

/**
 * Custom delimiter (semicolon)
 */
export const CustomDelimiter: Story = {
  args: {
    delimiter: ';',
    placeholder: 'Use semicolon to separate',
  },
}

/**
 * Custom delete icon
 */
export const CustomDeleteIcon: Story = {
  args: {
    defaultValue: ['Vue', 'Nuxt'],
    deleteIcon: 'i-lucide-trash',
  },
}

/**
 * With leading icon
 */
export const WithLeadingIcon: Story = {
  args: {
    leadingIcon: 'i-lucide-tag',
    placeholder: 'Enter tags...',
  },
}

/**
 * With trailing icon
 */
export const WithTrailingIcon: Story = {
  args: {
    trailingIcon: 'i-lucide-plus',
    placeholder: 'Enter tags...',
  },
}

/**
 * Loading state
 */
export const Loading: Story = {
  args: {
    loading: true,
    trailing: true,
    defaultValue: ['Loading'],
  },
}

/**
 * Disabled state
 */
export const Disabled: Story = {
  args: {
    disabled: true,
    defaultValue: ['Vue', 'Nuxt'],
  },
}

/**
 * Required field
 */
export const Required: Story = {
  args: {
    required: true,
    placeholder: 'Required tags',
  },
}

/**
 * Extra small size
 */
export const SizeXS: Story = {
  args: {
    size: 'xs',
    defaultValue: ['Small', 'Tags'],
  },
}

/**
 * Small size
 */
export const SizeSmall: Story = {
  args: {
    size: 'sm',
    defaultValue: ['Small', 'Tags'],
  },
}

/**
 * Medium size (default)
 */
export const SizeMedium: Story = {
  args: {
    size: 'md',
    defaultValue: ['Medium', 'Tags'],
  },
}

/**
 * Large size
 */
export const SizeLarge: Story = {
  args: {
    size: 'lg',
    defaultValue: ['Large', 'Tags'],
  },
}

/**
 * Extra large size
 */
export const SizeXL: Story = {
  args: {
    size: 'xl',
    defaultValue: ['Extra', 'Large'],
  },
}

/**
 * Outline variant (default)
 */
export const VariantOutline: Story = {
  args: {
    variant: 'outline',
    defaultValue: ['Outline', 'Variant'],
  },
}

/**
 * Soft variant
 */
export const VariantSoft: Story = {
  args: {
    variant: 'soft',
    defaultValue: ['Soft', 'Variant'],
  },
}

/**
 * Subtle variant
 */
export const VariantSubtle: Story = {
  args: {
    variant: 'subtle',
    defaultValue: ['Subtle', 'Variant'],
  },
}

/**
 * Ghost variant
 */
export const VariantGhost: Story = {
  args: {
    variant: 'ghost',
    defaultValue: ['Ghost', 'Variant'],
  },
}

/**
 * None variant
 */
export const VariantNone: Story = {
  args: {
    variant: 'none',
    defaultValue: ['None', 'Variant'],
  },
}

/**
 * Primary color (default)
 */
export const ColorPrimary: Story = {
  args: {
    color: 'primary',
    defaultValue: ['Primary'],
    highlight: true,
  },
}

/**
 * Secondary color
 */
export const ColorSecondary: Story = {
  args: {
    color: 'secondary',
    defaultValue: ['Secondary'],
    highlight: true,
  },
}

/**
 * Success color
 */
export const ColorSuccess: Story = {
  args: {
    color: 'success',
    defaultValue: ['Success'],
    highlight: true,
  },
}

/**
 * Info color
 */
export const ColorInfo: Story = {
  args: {
    color: 'info',
    defaultValue: ['Info'],
    highlight: true,
  },
}

/**
 * Warning color
 */
export const ColorWarning: Story = {
  args: {
    color: 'warning',
    defaultValue: ['Warning'],
    highlight: true,
  },
}

/**
 * Error color
 */
export const ColorError: Story = {
  args: {
    color: 'error',
    defaultValue: ['Error'],
    highlight: true,
  },
}

/**
 * Neutral color
 */
export const ColorNeutral: Story = {
  args: {
    color: 'neutral',
    defaultValue: ['Neutral'],
    highlight: true,
  },
}

/**
 * Skills input example
 */
export const SkillsInput: Story = {
  args: {
    placeholder: 'Enter your skills',
    defaultValue: ['JavaScript', 'Vue.js', 'TypeScript'],
    leadingIcon: 'i-lucide-lightbulb',
  },
}

/**
 * Email recipients example
 */
export const EmailRecipients: Story = {
  args: {
    placeholder: 'Add recipients',
    addOnPaste: true,
    delimiter: ',',
    leadingIcon: 'i-lucide-mail',
  },
}

/**
 * Keywords input example
 */
export const KeywordsInput: Story = {
  args: {
    placeholder: 'Add keywords',
    defaultValue: ['nuxt', 'ui', 'components'],
    max: 10,
    leadingIcon: 'i-lucide-hash',
  },
}
