# Form Components Implementation Guide

This guide provides step-by-step instructions for implementing Storybook stories for all Form components in @nuxt/ui v4.

## Overview

Form components are essential input controls for user data collection. These are critical for application functionality and should be prioritized.

**Priority: HIGH**

## Components (17 total)

1. Checkbox
2. CheckboxGroup
3. ColorPicker
4. FileUpload
5. Form
6. FormField
7. Input
8. InputMenu
9. InputNumber
10. InputTags
11. PinInput
12. RadioGroup
13. Select
14. SelectMenu
15. Slider
16. Switch
17. Textarea

## Implementation Workflow

### Step 1: Fetch Component Metadata

```typescript
// Get component documentation
mcp__nuxt-ui-remote__get_component({ componentName: "ComponentName" })

// Get detailed metadata (props, slots, events)
mcp__nuxt-ui-remote__get_component_metadata({ componentName: "ComponentName" })
```

### Step 2: Create Story File

Location: `storybook/form/ComponentName.stories.ts`

### Step 3: Common Form Props

Most form components share these common props:
- `modelValue` - The form value (v-model)
- `name` - Form field name
- `disabled` - Disabled state
- `required` - Required field indicator
- `size` - Size variant (xs, sm, md, lg, xl)
- `variant` - Visual variant
- `placeholder` - Placeholder text
- `error` - Error state/message
- `help` - Helper text

### Step 4: Form Validation Stories

For all form components, include:
1. Basic usage
2. With validation
3. Error state
4. Disabled state
5. Required field
6. With FormField wrapper

## Component-Specific Implementation

### Checkbox

**File:** `storybook/form/Checkbox.stories.ts`

**Key Props:**
- `modelValue` (boolean) - Checked state
- `label` (string) - Checkbox label
- `description` (string) - Helper text
- `disabled` (boolean)
- `required` (boolean)
- `indeterminate` (boolean) - Partial selection state

**Required Stories:**
- Default
- Checked
- WithLabel
- WithDescription
- Indeterminate
- Disabled
- Required

**Example:**
```typescript
export const Default: Story = {
  args: {
    label: 'Accept terms',
  },
}

export const Indeterminate: Story = {
  args: {
    label: 'Select all',
    indeterminate: true,
  },
}
```

### CheckboxGroup

**File:** `storybook/form/CheckboxGroup.stories.ts`

**Key Props:**
- `modelValue` (any[]) - Selected values
- `options` (array) - Checkbox options
- `name` (string)
- `orientation` (enum) - horizontal, vertical

**Required Stories:**
- Default
- Horizontal
- WithDescription
- PreSelected

### ColorPicker

**File:** `storybook/form/ColorPicker.stories.ts`

**Key Props:**
- `modelValue` (string) - Selected color
- `format` (enum) - hex, rgb, hsl
- `disabled` (boolean)

**Required Stories:**
- Default
- Formats (hex, rgb, hsl)
- WithPresets
- Disabled

### FileUpload

**File:** `storybook/form/FileUpload.stories.ts`

**Key Props:**
- `modelValue` (File | File[])
- `accept` (string) - Accepted file types
- `multiple` (boolean)
- `maxSize` (number) - Max file size in bytes
- `disabled` (boolean)

**Required Stories:**
- Default (single file)
- Multiple
- WithAccept (specific file types)
- WithMaxSize
- WithPreview

### Form

**File:** `storybook/form/Form.stories.ts`

**Key Props:**
- `schema` (ZodSchema) - Validation schema
- `state` (object) - Form state
- `validate` (function) - Custom validation

**Required Stories:**
- BasicForm
- WithValidation (using Zod)
- WithAsyncSubmit
- ComplexForm (multiple fields)

**Example:**
```typescript
export const WithValidation: Story = {
  render: () => ({
    components: { UForm, UFormField, UInput, UButton },
    setup() {
      const state = ref({ email: '', password: '' })
      return { state }
    },
    template: `
      <UForm v-model="state">
        <UFormField label="Email" name="email" required>
          <UInput type="email" v-model="state.email" />
        </UFormField>
        <UFormField label="Password" name="password" required>
          <UInput type="password" v-model="state.password" />
        </UFormField>
        <UButton type="submit">Submit</UButton>
      </UForm>
    `,
  }),
}
```

### FormField

**File:** `storybook/form/FormField.stories.ts`

**Key Props:**
- `label` (string) - Field label
- `name` (string) - Field name
- `description` (string) - Helper text
- `error` (string | boolean) - Error message
- `required` (boolean)
- `hint` (string) - Additional hint

**Required Stories:**
- Default
- WithDescription
- WithError
- Required
- WithHint

### Input

**File:** `storybook/form/Input.stories.ts`

**Key Props:**
- `modelValue` (string | number)
- `type` (enum) - text, email, password, number, tel, url, search, date
- `placeholder` (string)
- `disabled` (boolean)
- `size` (enum) - xs, sm, md, lg, xl
- `variant` (enum) - outline, subtle, ghost
- `icon` (string | object) - Leading/trailing icon
- `loading` (boolean)

**Required Stories:**
- Default
- Types (email, password, number, etc.)
- Sizes
- Variants
- WithIcon (leading and trailing)
- WithLoading
- Disabled
- WithError

**Example:**
```typescript
export const WithIcon: Story = {
  args: {
    placeholder: 'Search...',
    icon: 'i-lucide-search',
  },
}

export const Password: Story = {
  args: {
    type: 'password',
    placeholder: 'Enter password',
    icon: 'i-lucide-lock',
  },
}
```

### InputMenu

**File:** `storybook/form/InputMenu.stories.ts`

**Key Props:**
- `modelValue` (any)
- `options` (array) - Menu options
- `placeholder` (string)
- `searchable` (boolean)
- `clearable` (boolean)

**Required Stories:**
- Default
- Searchable
- Clearable
- WithGroups (grouped options)
- CustomOptionTemplate

### InputNumber

**File:** `storybook/form/InputNumber.stories.ts`

**Key Props:**
- `modelValue` (number)
- `min` (number)
- `max` (number)
- `step` (number)
- `disabled` (boolean)
- `format` (function) - Number formatter

**Required Stories:**
- Default
- WithMinMax
- WithStep
- WithFormat (currency, percentage)
- Disabled

### InputTags

**File:** `storybook/form/InputTags.stories.ts`

**Key Props:**
- `modelValue` (string[])
- `placeholder` (string)
- `maxTags` (number)
- `allowDuplicates` (boolean)
- `disabled` (boolean)

**Required Stories:**
- Default
- WithMaxTags
- PrePopulated
- Disabled

### PinInput

**File:** `storybook/form/PinInput.stories.ts`

**Key Props:**
- `modelValue` (string)
- `length` (number) - Number of digits
- `type` (enum) - text, number
- `mask` (boolean) - Hide input
- `disabled` (boolean)

**Required Stories:**
- Default
- CustomLength (4, 6, 8 digits)
- Masked
- Alphanumeric

### RadioGroup

**File:** `storybook/form/RadioGroup.stories.ts`

**Key Props:**
- `modelValue` (any)
- `options` (array) - Radio options
- `orientation` (enum) - horizontal, vertical
- `disabled` (boolean)

**Required Stories:**
- Default
- Horizontal
- WithDescription
- Disabled

### Select

**File:** `storybook/form/Select.stories.ts`

**Key Props:**
- `modelValue` (any)
- `options` (array) - Select options
- `placeholder` (string)
- `disabled` (boolean)
- `multiple` (boolean)
- `searchable` (boolean)

**Required Stories:**
- Default
- Multiple
- Searchable
- WithGroups
- Disabled

### SelectMenu

**File:** `storybook/form/SelectMenu.stories.ts`

**Key Props:**
- `modelValue` (any | any[])
- `options` (array)
- `multiple` (boolean)
- `searchable` (boolean)
- `clearable` (boolean)

**Required Stories:**
- Default
- Multiple
- Searchable
- WithIcons
- CustomTemplate

### Slider

**File:** `storybook/form/Slider.stories.ts`

**Key Props:**
- `modelValue` (number | number[])
- `min` (number)
- `max` (number)
- `step` (number)
- `disabled` (boolean)
- `orientation` (enum) - horizontal, vertical

**Required Stories:**
- Default
- Range (dual handles)
- WithStep
- Vertical
- Disabled
- WithLabels

### Switch

**File:** `storybook/form/Switch.stories.ts`

**Key Props:**
- `modelValue` (boolean)
- `label` (string)
- `description` (string)
- `disabled` (boolean)
- `loading` (boolean)

**Required Stories:**
- Default
- WithLabel
- WithDescription
- Disabled
- Loading

### Textarea

**File:** `storybook/form/Textarea.stories.ts`

**Key Props:**
- `modelValue` (string)
- `placeholder` (string)
- `rows` (number)
- `disabled` (boolean)
- `resize` (boolean)
- `autoresize` (boolean)

**Required Stories:**
- Default
- CustomRows
- NoResize
- Autoresize
- WithCharacterCount
- Disabled

## Form Validation Pattern

For all form components, demonstrate integration with form validation:

```typescript
export const WithValidation: Story = {
  render: () => ({
    components: { UForm, UFormField, UComponentName },
    setup() {
      const state = ref({ fieldName: '' })
      const errors = ref({ fieldName: '' })

      const validate = () => {
        if (!state.value.fieldName) {
          errors.value.fieldName = 'This field is required'
        } else {
          errors.value.fieldName = ''
        }
      }

      return { state, errors, validate }
    },
    template: `
      <UForm @submit="validate">
        <UFormField
          label="Field Label"
          name="fieldName"
          :error="errors.fieldName"
        >
          <UComponentName v-model="state.fieldName" />
        </UFormField>
        <UButton type="submit">Validate</UButton>
      </UForm>
    `,
  }),
}
```

## Testing Checklist

For each form component:

- [ ] Component renders correctly
- [ ] v-model binding works
- [ ] Validation displays properly
- [ ] Error states are visible
- [ ] Disabled state prevents interaction
- [ ] Required indicator shows
- [ ] Keyboard navigation works
- [ ] Screen reader compatibility
- [ ] Mobile responsiveness

## Common Patterns

### Size Options
```typescript
['xs', 'sm', 'md', 'lg', 'xl']
```

### Variant Options
```typescript
['outline', 'subtle', 'ghost']
```

### Input Types
```typescript
['text', 'email', 'password', 'number', 'tel', 'url', 'search', 'date', 'time']
```

## Tips

1. **Interactive Stories**: Form components should have interactive stories showing state changes
2. **Validation Examples**: Always show validation patterns
3. **Accessibility**: Test keyboard navigation and screen readers
4. **Real-World Scenarios**: Create stories that mirror actual form usage
5. **Error Handling**: Demonstrate error states and recovery
