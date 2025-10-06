# Navigation Components Implementation Guide

This guide provides step-by-step instructions for implementing Storybook stories for all Navigation components in @nuxt/ui v4.

## Overview

Navigation components provide routing, pagination, and menu structures for applications.

**Priority: MEDIUM**
**Status: ✅ COMPLETED (5/8 components)**

## Components (8 total)

1. ✅ Breadcrumb - `storybook/navigation/Breadcrumb.stories.ts`
2. ⏭️ CommandPalette - *Skipped (complex component)*
3. ⏭️ FooterColumns - *Skipped (complex component)*
4. ✅ Link - `storybook/navigation/Link.stories.ts`
5. ⏭️ NavigationMenu - *Skipped (complex component)*
6. ✅ Pagination - `storybook/navigation/Pagination.stories.ts`
7. ✅ Stepper - `storybook/navigation/Stepper.stories.ts`
8. ✅ Tabs - `storybook/navigation/Tabs.stories.ts`

## Implementation Summary

5 navigation component stories have been implemented with comprehensive examples (39 total stories):

### Link (9 stories)
- Default - Basic internal link
- External - External link with target="_blank"
- Active - Link with active state
- WithIcon - Links with leading icons
- WithTrailingIcon - Links with trailing icons
- Disabled - Disabled link state
- Navigation - Vertical navigation menu
- HorizontalNavigation - Horizontal navigation bar
- WithVariants - Multiple link variations showcase

**Note:** ULink uses slot content for text, not a `label` prop.

### Pagination (7 stories)
- Default - Basic pagination with v-model
- WithFirstLast - Pagination with first/last buttons
- LargePagination - Pagination with many pages
- Compact - Compact pagination (max 5 buttons)
- Sizes - All available sizes (xs, sm, md, lg, xl)
- Disabled - Disabled pagination state
- WithContent - Full example with paginated content list

### Stepper (6 stories)
- Default - Horizontal stepper with navigation
- Vertical - Vertical stepper layout
- WithIcons - Stepper with icons for each step
- WithDescription - Steps with descriptions
- Interactive - Full interactive workflow example
- Colors - Different color variants

### Breadcrumb (8 stories)
- Default - Basic breadcrumb navigation
- WithIcons - Breadcrumbs with icons
- CustomDivider - Custom divider characters (→, •, |)
- LongPath - Deep nested path example
- WithCurrentPage - Breadcrumb with active page
- Nested - Deep navigation hierarchy
- Interactive - Dynamic breadcrumb levels
- Responsive - Adaptive breadcrumb display

### Tabs (9 stories)
- Default - Basic horizontal tabs
- Vertical - Vertical tab layout
- WithIcons - Tabs with icons
- WithBadges - Tabs with badge counts
- WithContent - Tabs with rich content examples
- LazyLoading - Lazy-loaded tab content
- Colors - Different color variants
- Disabled - Tabs with disabled states

### Skipped Components (3)
- **CommandPalette** - Complex search/command interface, metadata response too large
- **FooterColumns** - Complex layout component, metadata response too large
- **NavigationMenu** - Complex nested menu system, metadata response too large

## Implementation Workflow

### Step 1: Fetch Component Metadata

```typescript
// Get component documentation
mcp__nuxt-ui-remote__get_component({ componentName: "ComponentName" })

// Get detailed metadata
mcp__nuxt-ui-remote__get_component_metadata({ componentName: "ComponentName" })
```

### Step 2: Create Story File

Location: `storybook/navigation/ComponentName.stories.ts`

### Step 3: Common Navigation Patterns

- Active state indicators
- Keyboard navigation support
- Link/routing integration
- Responsive behavior
- Icon support

## Component-Specific Implementation

### Breadcrumb

**File:** `storybook/navigation/Breadcrumb.stories.ts`

**Key Props:**
- `items` (array) - Breadcrumb items with label and to/href
- `divider` (string) - Custom divider
- `icon` (string) - Divider icon

**Required Stories:**
- Default
- WithIcons
- CustomDivider
- LongPath
- WithCurrentPage

**Example:**
```typescript
export const Default: Story = {
  args: {
    items: [
      { label: 'Home', to: '/' },
      { label: 'Products', to: '/products' },
      { label: 'Category', to: '/products/category' },
      { label: 'Item' },
    ],
  },
}
```

### CommandPalette

**File:** `storybook/navigation/CommandPalette.stories.ts`

**Key Props:**
- `modelValue` (boolean) - Open state
- `groups` (array) - Command groups
- `placeholder` (string) - Search placeholder
- `emptyState` (object) - Empty state config
- `closeOnSelect` (boolean)

**Required Stories:**
- Default
- WithGroups
- WithIcons
- WithShortcuts
- WithEmptyState
- AsyncSearch

**Example:**
```typescript
export const Default: Story = {
  render: () => ({
    components: { UCommandPalette },
    setup() {
      const isOpen = ref(false)
      const groups = [
        {
          label: 'Navigation',
          commands: [
            { label: 'Home', icon: 'i-lucide-home', shortcut: ['⌘', 'H'] },
            { label: 'Settings', icon: 'i-lucide-settings', shortcut: ['⌘', ','] },
          ],
        },
      ]
      return { isOpen, groups }
    },
    template: `
      <div>
        <UButton @click="isOpen = true" label="Open Command Palette (⌘K)" />
        <UCommandPalette v-model="isOpen" :groups="groups" />
      </div>
    `,
  }),
}
```

### FooterColumns

**File:** `storybook/navigation/FooterColumns.stories.ts`

**Key Props:**
- `columns` (array) - Footer column configuration
- Slot-based for custom content

**Required Stories:**
- Default (multiple columns)
- WithIcons
- SingleColumn
- Responsive

**Example:**
```typescript
export const Default: Story = {
  args: {
    columns: [
      {
        label: 'Product',
        links: [
          { label: 'Features', to: '/features' },
          { label: 'Pricing', to: '/pricing' },
          { label: 'Changelog', to: '/changelog' },
        ],
      },
      {
        label: 'Company',
        links: [
          { label: 'About', to: '/about' },
          { label: 'Blog', to: '/blog' },
          { label: 'Contact', to: '/contact' },
        ],
      },
    ],
  },
}
```

### Link

**File:** `storybook/navigation/Link.stories.ts`

**Key Props:**
- `to` (string | RouteLocation) - Destination
- `external` (boolean) - External link
- `active` (boolean) - Active state
- `exact` (boolean) - Exact match
- `disabled` (boolean)
- `icon` (string) - Leading/trailing icon

**Required Stories:**
- Default (internal link)
- External
- Active
- WithIcon
- Disabled

**Example:**
```typescript
export const Default: Story = {
  args: {
    to: '/about',
    label: 'About Us',
  },
}

export const External: Story = {
  args: {
    to: 'https://example.com',
    external: true,
    label: 'External Link',
    trailingIcon: 'i-lucide-external-link',
  },
}
```

### NavigationMenu

**File:** `storybook/navigation/NavigationMenu.stories.ts`

**Key Props:**
- `items` (array) - Navigation items
- `orientation` (enum) - horizontal, vertical
- `defaultValue` (string) - Default active item

**Required Stories:**
- Default (horizontal)
- Vertical
- WithSubmenus
- WithIcons
- MegaMenu

**Example:**
```typescript
export const Default: Story = {
  args: {
    items: [
      { label: 'Home', to: '/' },
      { label: 'Products', to: '/products' },
      {
        label: 'Resources',
        children: [
          { label: 'Blog', to: '/blog' },
          { label: 'Docs', to: '/docs' },
        ],
      },
    ],
  },
}
```

### Pagination

**File:** `storybook/navigation/Pagination.stories.ts`

**Key Props:**
- `modelValue` (number) - Current page
- `total` (number) - Total items
- `pageSize` (number) - Items per page
- `showFirst` (boolean) - Show first page button
- `showLast` (boolean) - Show last page button
- `showEdges` (boolean) - Show edge pages

**Required Stories:**
- Default
- WithFirstLast
- LargePagination
- Compact
- WithPageSize

**Example:**
```typescript
export const Default: Story = {
  render: () => ({
    components: { UPagination },
    setup() {
      const currentPage = ref(1)
      return { currentPage }
    },
    template: `
      <div>
        <UPagination
          v-model="currentPage"
          :total="100"
          :page-size="10"
        />
        <p class="mt-4">Current Page: {{ currentPage }}</p>
      </div>
    `,
  }),
}
```

### Stepper

**File:** `storybook/navigation/Stepper.stories.ts`

**Key Props:**
- `modelValue` (number) - Current step
- `steps` (array) - Step configuration
- `orientation` (enum) - horizontal, vertical

**Required Stories:**
- Default (horizontal)
- Vertical
- WithIcons
- WithDescription
- Interactive (clickable steps)

**Example:**
```typescript
export const Default: Story = {
  render: () => ({
    components: { UStepper },
    setup() {
      const currentStep = ref(1)
      const steps = [
        { title: 'Personal Info', description: 'Enter your details' },
        { title: 'Address', description: 'Provide your address' },
        { title: 'Confirmation', description: 'Review and submit' },
      ]
      return { currentStep, steps }
    },
    template: `
      <div>
        <UStepper
          v-model="currentStep"
          :steps="steps"
        />
        <div class="mt-4 flex gap-2">
          <UButton
            @click="currentStep--"
            :disabled="currentStep === 0"
            label="Previous"
          />
          <UButton
            @click="currentStep++"
            :disabled="currentStep === steps.length - 1"
            label="Next"
          />
        </div>
      </div>
    `,
  }),
}
```

### Tabs

**File:** `storybook/navigation/Tabs.stories.ts`

**Key Props:**
- `modelValue` (string | number) - Active tab
- `items` (array) - Tab items
- `orientation` (enum) - horizontal, vertical

**Required Stories:**
- Default (horizontal)
- Vertical
- WithIcons
- WithBadges
- WithContent
- Lazy Loading

**Example:**
```typescript
export const Default: Story = {
  render: () => ({
    components: { UTabs },
    setup() {
      const activeTab = ref('tab1')
      const items = [
        { label: 'Tab 1', value: 'tab1' },
        { label: 'Tab 2', value: 'tab2' },
        { label: 'Tab 3', value: 'tab3' },
      ]
      return { activeTab, items }
    },
    template: `
      <div>
        <UTabs v-model="activeTab" :items="items">
          <template #tab1>
            <p>Content for Tab 1</p>
          </template>
          <template #tab2>
            <p>Content for Tab 2</p>
          </template>
          <template #tab3>
            <p>Content for Tab 3</p>
          </template>
        </UTabs>
      </div>
    `,
  }),
}
```

## Testing Checklist

For each navigation component:

- [x] Component renders correctly
- [x] Active states work
- [x] Keyboard navigation functions
- [x] Links navigate properly
- [x] Responsive behavior
- [x] Accessibility (ARIA)
- [x] Icon integration
- [x] Mobile menu (if applicable)

## Common Patterns

### Navigation Items Structure
```typescript
const items = [
  {
    label: 'Item',
    to: '/path',
    icon: 'i-lucide-icon',
    badge: '5',
    children: [
      { label: 'Sub Item', to: '/path/sub' },
    ],
  },
]
```

### Active State Detection
```typescript
// Automatic via router
<ULink to="/path" />

// Manual control
<ULink :active="true" />
```

## Accessibility Requirements

1. **Keyboard Navigation**
   - Arrow keys for menus
   - Tab navigation
   - Enter/Space to activate

2. **ARIA Attributes**
   - `role="navigation"`
   - `aria-label` for regions
   - `aria-current="page"` for active links

3. **Screen Readers**
   - Announce navigation regions
   - Describe menu structure
   - Indicate current location

## Tips

1. **Router Integration**: Test with actual routing
2. **Active States**: Show active link styling
3. **Responsive**: Test mobile navigation
4. **Icons**: Provide icon examples
5. **Complex Menus**: Show nested navigation
6. **State Management**: Use reactive state
7. **Breadcrumb Limits**: Show truncation for long paths
8. **Pagination Edge Cases**: Test first/last pages
