import type { Meta, StoryObj } from '@storybook/vue3'
import UFileUpload from '@nuxt/ui/components/FileUpload.vue'
import { FileUploadProps } from '@nuxt/ui'

const meta = {
  title: 'Form/FileUpload',
  component: UFileUpload,
  tags: ['autodocs'],
  argTypes: {
    modelValue: {
      control: 'object',
      description: 'The file or files value',
    },
    label: {
      control: 'text',
      description: 'Label text for the file upload',
    },
    description: {
      control: 'text',
      description: 'Description text below the label',
    },
    icon: {
      control: 'text',
      description: 'Icon to display',
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'info', 'warning', 'error', 'neutral'],
      description: 'Color theme',
    },
    variant: {
      control: 'select',
      options: ['area', 'button'],
      description: 'Variant style (button only available when multiple is false)',
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      description: 'Size of the file upload',
    },
    layout: {
      control: 'select',
      options: ['list', 'grid'],
      description: 'Layout of how files are displayed (only works when variant is area)',
    },
    position: {
      control: 'select',
      options: ['inside', 'outside'],
      description: 'Position of the files (only works when variant is area and layout is list)',
    },
    accept: {
      control: 'text',
      description: 'Allowed file types (MIME types or extensions)',
    },
    multiple: {
      control: 'boolean',
      description: 'Allow multiple files',
    },
    dropzone: {
      control: 'boolean',
      description: 'Enable drop zone',
    },
    interactive: {
      control: 'boolean',
      description: 'Make the dropzone clickable',
    },
    highlight: {
      control: 'boolean',
      description: 'Highlight the ring color like a focus state',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the file upload',
    },
    required: {
      control: 'boolean',
      description: 'Make the file upload required',
    },
    reset: {
      control: 'boolean',
      description: 'Reset the file input when dialog is opened',
    },
    id: {
      control: 'text',
      description: 'ID attribute',
    },
    name: {
      control: 'text',
      description: 'Name attribute',
    },
    fileIcon: {
      control: 'text',
      description: 'Icon to display for files',
    },
    fileDeleteIcon: {
      control: 'text',
      description: 'Icon for delete button',
    },
    fileDelete: {
      control: 'object',
      description: 'Configure the delete button',
    },
    onChange: {
      action: 'change',
      description: 'Emitted when file selection changes',
    },
    'onUpdate:modelValue': {
      action: 'update:modelValue',
      description: 'Emitted when the value changes',
    },
  },
} satisfies Meta<typeof UFileUpload>

export default meta
type Story = StoryObj<typeof meta>

// Basic Usage
export const Default: Story = {
  args: {
    label: 'Drop your file here',
    description: 'Upload any file',
  },
}

export const WithLabel: Story = {
  args: {
    label: 'Drop your image here',
    description: 'SVG, PNG, JPG or GIF (max. 2MB)',
  },
}

export const Multiple: Story = {
  args: {
    multiple: true,
    label: 'Drop your images here',
    description: 'SVG, PNG, JPG or GIF (max. 2MB)',
  },
}

// Variants
export const VariantArea: Story = {
  args: {
    variant: 'area',
    label: 'Drop your file here',
    description: 'Or click to browse',
  },
}

export const VariantButton: Story = {
  args: {
    variant: 'button',
    multiple: false,
  },
}

// Sizes
export const SizeXS: Story = {
  args: {
    size: 'xs',
    label: 'Drop your file here',
    description: 'Extra small size',
  },
}

export const SizeSmall: Story = {
  args: {
    size: 'sm',
    label: 'Drop your file here',
    description: 'Small size',
  },
}

export const SizeMedium: Story = {
  args: {
    size: 'md',
    label: 'Drop your file here',
    description: 'Medium size (default)',
  },
}

export const SizeLarge: Story = {
  args: {
    size: 'lg',
    label: 'Drop your file here',
    description: 'Large size',
  },
}

export const SizeXL: Story = {
  args: {
    size: 'xl',
    label: 'Drop your file here',
    description: 'Extra large size',
  },
}

// Colors
export const ColorPrimary: Story = {
  args: {
    color: 'primary',
    label: 'Drop your file here',
    highlight: true,
  },
}

export const ColorSecondary: Story = {
  args: {
    color: 'secondary',
    label: 'Drop your file here',
    highlight: true,
  },
}

export const ColorSuccess: Story = {
  args: {
    color: 'success',
    label: 'Drop your file here',
    highlight: true,
  },
}

export const ColorInfo: Story = {
  args: {
    color: 'info',
    label: 'Drop your file here',
    highlight: true,
  },
}

export const ColorWarning: Story = {
  args: {
    color: 'warning',
    label: 'Drop your file here',
    highlight: true,
  },
}

export const ColorError: Story = {
  args: {
    color: 'error',
    label: 'Drop your file here',
    highlight: true,
  },
}

export const ColorNeutral: Story = {
  args: {
    color: 'neutral',
    label: 'Drop your file here',
    highlight: true,
  },
}

// Layouts
export const LayoutList: Story = {
  args: {
    layout: 'list',
    multiple: true,
    label: 'Drop your files here',
    description: 'Files will be displayed in a list',
  },
}

export const LayoutGrid: Story = {
  args: {
    layout: 'grid',
    multiple: true,
    label: 'Drop your images here',
    description: 'Files will be displayed in a grid',
  },
}

// Positions
export const PositionOutside: Story = {
  args: {
    position: 'outside',
    layout: 'list',
    multiple: true,
    label: 'Drop your files here',
    description: 'Files displayed outside the dropzone',
  },
}

export const PositionInside: Story = {
  args: {
    position: 'inside',
    layout: 'list',
    multiple: true,
    label: 'Drop your files here',
    description: 'Files displayed inside the dropzone',
  },
}

// Accept Types
export const AcceptImages: Story = {
  args: {
    accept: 'image/*',
    label: 'Drop your image here',
    description: 'Only images allowed',
  },
}

export const AcceptPDF: Story = {
  args: {
    accept: 'application/pdf',
    label: 'Drop your PDF here',
    description: 'Only PDF files allowed',
  },
}

export const AcceptMultipleTypes: Story = {
  args: {
    accept: 'image/png,image/jpeg,.pdf',
    label: 'Drop your file here',
    description: 'PNG, JPG or PDF allowed',
  },
}

// States
export const Disabled: Story = {
  args: {
    disabled: true,
    label: 'Drop your file here',
    description: 'This file upload is disabled',
  },
}

export const Required: Story = {
  args: {
    required: true,
    label: 'Drop your file here',
    description: 'This field is required',
  },
}

export const Highlighted: Story = {
  args: {
    highlight: true,
    color: 'primary',
    label: 'Drop your file here',
    description: 'Highlighted state (like focus or validation error)',
  },
}

// Features
export const WithoutDropzone: Story = {
  args: {
    dropzone: false,
    label: 'Click to upload',
    description: 'Dropzone disabled',
  },
}

export const NonInteractive: Story = {
  args: {
    interactive: false,
    label: 'Drop your file here',
    description: 'Not clickable, only drag and drop',
  },
}

export const CustomIcon: Story = {
  args: {
    icon: 'i-lucide-image',
    label: 'Drop your image here',
    description: 'Custom upload icon',
  },
}

export const CustomFileIcon: Story = {
  args: {
    fileIcon: 'i-lucide-file-text',
    multiple: true,
    label: 'Drop your documents here',
    description: 'Custom file icon',
  },
}

// Advanced
export const WithReset: Story = {
  args: {
    reset: true,
    label: 'Drop your file here',
    description: 'File input resets when dialog is opened',
  },
}

export const CompleteExample: Story = {
  args: {
    multiple: true,
    accept: 'image/*',
    layout: 'grid',
    color: 'primary',
    size: 'lg',
    icon: 'i-lucide-image',
    label: 'Drop your images here',
    description: 'SVG, PNG, JPG or GIF (max. 2MB each)',
    name: 'images',
    required: true,
  },
}
