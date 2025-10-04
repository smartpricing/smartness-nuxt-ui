# Element Components Implementation Guide

This guide provides step-by-step instructions for implementing Storybook stories for all Element components in @nuxt/ui v4.

## Overview

Element components are the fundamental UI building blocks. They are the most commonly used visual elements and should be implemented first.

**Priority: HIGH**

## Components (16 total)

1. Alert ✅
2. Avatar ✅
3. AvatarGroup ✅
4. Badge ✅
5. Banner ✅
6. Button ✅
7. Calendar ✅
8. Card ✅
9. Chip ✅
10. Collapsible ✅
11. FieldGroup ✅
12. Icon ✅
13. Kbd ✅
14. Progress ✅
15. Separator ✅
16. Skeleton ✅

**Status: COMPLETED (16/16)**

## Implementation Workflow

### Step 1: Fetch Component Metadata

Before creating any story, use MCP tools to retrieve accurate component information:

```typescript
// Get component documentation
mcp__nuxt-ui-remote__get_component({ componentName: "ComponentName" })

// Get detailed metadata (props, slots, events)
mcp__nuxt-ui-remote__get_component_metadata({ componentName: "ComponentName" })
```

### Step 2: Create Story File

Location: `storybook/element/ComponentName.stories.ts`

### Step 3: Import Pattern

```typescript
import type { Meta, StoryObj } from '@storybook/vue3'
import UComponentName from '@nuxt/ui/components/ComponentName.vue'
import type { ComponentNameProps } from '@nuxt/ui'
```

### Step 4: Define ArgTypes with Metadata

Use the metadata from Step 1 to populate:
- Control types (select, boolean, text, etc.)
- Options for enum props
- Descriptions from documentation
- Type summaries
- Default values

### Step 5: Create Story Variants

For each component, create these standard stories:
1. **Default** - Basic usage with minimal props
2. **Variants** - Show all visual variants
3. **Sizes** - Show all size options (if applicable)
4. **Colors** - Show all color options (if applicable)
5. **States** - Show different states (disabled, loading, error, etc.)
6. **Interactive** - Demonstrate user interactions
7. **Complex** - Advanced use cases

## Component-Specific Implementation

### Alert ✅

**File:** `storybook/element/Alert.stories.ts` ✅ Completed

**Key Props:**
- `title` (string) - Alert title
- `description` (string) - Alert description
- `icon` (string | object) - Icon to display
- `color` (enum) - primary, secondary, success, info, warning, error, neutral
- `variant` (enum) - solid, outline, soft, subtle
- `orientation` (enum) - vertical, horizontal
- `close` (boolean | ButtonProps) - Show close button
- `actions` (ButtonProps[]) - Action buttons

**Required Stories:**
- Default
- WithIcon
- Success, Error, Info, Warning variants
- WithClose
- Horizontal orientation
- WithActions

### Avatar ✅

**File:** `storybook/element/Avatar.stories.ts` ✅ Completed

**Key Props:**
- `src` (string) - Image source
- `alt` (string) - Alt text
- `icon` (string | object) - Fallback icon
- `text` (string) - Fallback text
- `size` (enum) - 3xs, 2xs, xs, sm, md, lg, xl, 2xl, 3xl
- `chip` (boolean | ChipProps) - Status indicator

**Required Stories:**
- Default (with image)
- WithIcon (fallback)
- WithText (initials)
- Sizes
- WithChip (status indicator)

### AvatarGroup ✅

**File:** `storybook/element/AvatarGroup.stories.ts` ✅ Completed

**Key Props:**
- `items` (AvatarProps[]) - Array of avatars
- `max` (number) - Maximum avatars to display
- `size` (enum) - Size for all avatars

**Required Stories:**
- Default
- WithMax (showing overflow)
- Sizes

### Badge ✅

**File:** `storybook/element/Badge.stories.ts` ✅ Completed

**Key Props:**
- `label` (string) - Badge text
- `color` (enum) - primary, secondary, success, info, warning, error, neutral
- `variant` (enum) - solid, outline, soft, subtle
- `size` (enum) - xs, sm, md, lg

**Required Stories:**
- Default
- Colors
- Variants
- Sizes

### Banner ✅

**File:** `storybook/element/Banner.stories.ts` ✅ Completed

**Key Props:**
- `title` (string) - Banner title
- `description` (string) - Banner description
- `icon` (string | object) - Icon to display
- `color` (enum) - Color theme
- `close` (boolean | ButtonProps) - Close button
- `actions` (ButtonProps[]) - Action buttons

**Required Stories:**
- Default
- WithIcon
- WithClose
- WithActions
- Colors

### Button ✅

**File:** `storybook/element/Button.stories.ts` ✅ Completed

**Key Props:**
- `label` (string) - Button text
- `color` (enum) - primary, secondary, success, info, warning, error, neutral
- `variant` (enum) - solid, outline, soft, subtle, ghost, link
- `size` (enum) - xs, sm, md, lg, xl
- `disabled` (boolean) - Disabled state
- `loading` (boolean) - Loading state
- `icon` (string | object) - Icon to display
- `leadingIcon` / `trailingIcon` - Icon positioning
- `square` (boolean) - Square button

**Required Stories:**
- Default
- Variants
- Colors
- Sizes
- WithIcon
- Loading
- Disabled
- Square

### Calendar ✅

**File:** `storybook/element/Calendar.stories.ts` ✅ Completed

**Key Props:**
- `modelValue` (Date | Date[]) - Selected date(s)
- `mode` (enum) - single, multiple, range
- `minDate` (Date) - Minimum selectable date
- `maxDate` (Date) - Maximum selectable date
- `disabledDates` (Date[]) - Disabled dates

**Required Stories:**
- Default (single selection)
- Multiple
- Range
- WithMinMax
- WithDisabledDates

### Card ✅

**File:** `storybook/element/Card.stories.ts` ✅ Completed

**Key Props:**
- `as` (string) - Element type
- `to` (string | RouteLocation) - Link destination
- `ui` (object) - Style customization

**Required Stories:**
- Default
- WithContent (complex content)
- AsLink (clickable card)
- WithCustomStyles

### Chip ✅

**File:** `storybook/element/Chip.stories.ts` ✅ Completed

**Key Props:**
- `text` (string | number) - Chip content
- `color` (enum) - Color theme
- `size` (enum) - Size option
- `position` (enum) - top-right, top-left, bottom-right, bottom-left
- `inset` (boolean) - Keep inside parent
- `standalone` (boolean) - Relative positioning

**Required Stories:**
- Default
- Colors
- Sizes
- Positions
- Inset
- WithAvatar (on Avatar component)

### Collapsible ✅

**File:** `storybook/element/Collapsible.stories.ts` ✅ Completed

**Key Props:**
- `modelValue` (boolean) - Open/closed state
- `disabled` (boolean) - Disabled state

**Required Stories:**
- Default
- Controlled (with v-model)
- Disabled

### FieldGroup ✅

**File:** `storybook/element/FieldGroup.stories.ts` ✅ Completed

**Key Props:**
- `orientation` (enum) - horizontal, vertical
- Slot-based component for grouping form fields

**Required Stories:**
- Default (vertical)
- Horizontal
- WithMultipleInputs
- Mixed (different input types)

### Icon ✅

**File:** `storybook/element/Icon.stories.ts` ✅ Completed

**Key Props:**
- `name` (string) - Iconify icon name
- `size` (string) - Icon size

**Required Stories:**
- Default
- Sizes
- CustomColor
- CommonIcons (showcase)

### Kbd ✅

**File:** `storybook/element/Kbd.stories.ts` ✅ Completed

**Key Props:**
- `value` (string | string[]) - Key(s) to display
- `size` (enum) - xs, sm, md, lg

**Required Stories:**
- Default
- Sizes
- Combinations (Ctrl+C, etc.)
- Multiple

### Progress ✅

**File:** `storybook/element/Progress.stories.ts` ✅ Completed

**Key Props:**
- `modelValue` (number) - Progress value (0-100)
- `color` (enum) - Color theme
- `size` (enum) - Size option
- `animation` (enum) - Animation type
- `indeterminate` (boolean) - Indeterminate state

**Required Stories:**
- Default
- Colors
- Sizes
- Indeterminate
- Animated
- Steps (0%, 25%, 50%, 75%, 100%)

### Separator ✅

**File:** `storybook/element/Separator.stories.ts` ✅ Completed

**Key Props:**
- `orientation` (enum) - horizontal, vertical
- `label` (string) - Optional label
- `type` (enum) - solid, dashed, dotted

**Required Stories:**
- Default (horizontal)
- Vertical
- WithLabel
- Types (solid, dashed, dotted)

### Skeleton ✅

**File:** `storybook/element/Skeleton.stories.ts` ✅ Completed

**Key Props:**
- `as` (string) - Element type
- `ui` (object) - Style customization

**Required Stories:**
- Default
- Text (multiple lines)
- Avatar (circular)
- Card (complex layout)
- CustomShapes

## Testing Checklist

For each component story, verify:

- [ ] Component renders without errors
- [ ] All props are correctly typed
- [ ] Controls work in Storybook UI
- [ ] Accessibility checks pass (a11y addon)
- [ ] Responsive behavior is correct
- [ ] Dark mode variants work (if applicable)
- [ ] Examples match official documentation

## Common Patterns

### Color Enum Values
```typescript
['primary', 'secondary', 'success', 'info', 'warning', 'error', 'neutral']
```

### Size Enum Values
```typescript
// Standard sizes
['xs', 'sm', 'md', 'lg', 'xl']

// Extended sizes (Avatar, etc.)
['3xs', '2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl']
```

### Variant Enum Values
```typescript
['solid', 'outline', 'soft', 'subtle', 'ghost', 'link']
```

## Tips

1. **Use MCP First**: Always fetch metadata before writing argTypes
2. **Follow Official Examples**: Reference Nuxt UI docs for story inspiration
3. **Test Interactivity**: For components with state, create interactive stories
4. **Show Composition**: Demonstrate components working together
5. **Document Edge Cases**: Include stories for unusual or complex scenarios
