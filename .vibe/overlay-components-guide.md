# Overlay Components Implementation Guide

This guide provides step-by-step instructions for implementing Storybook stories for all Overlay components in @nuxt/ui v4.

## Overview

Overlay components provide modal dialogs, popovers, and contextual UI elements. These are common patterns in modern applications.

**Priority: HIGH**

## Components (8 total)

1. ContextMenu
2. Drawer
3. DropdownMenu
4. Modal
5. Popover
6. Slideover
7. Toast
8. Tooltip

## Implementation Workflow

### Step 1: Fetch Component Metadata

```typescript
// Get component documentation
mcp__nuxt-ui-remote__get_component({ componentName: "ComponentName" })

// Get detailed metadata
mcp__nuxt-ui-remote__get_component_metadata({ componentName: "ComponentName" })
```

### Step 2: Create Story File

Location: `storybook/overlay/ComponentName.stories.ts`

### Step 3: Common Overlay Patterns

Most overlay components:
- Use `v-model` for open/close state
- Support positioning/placement options
- Include transition animations
- Can be triggered by user actions
- Support keyboard interactions (Escape to close)
- Manage focus trapping

### Step 4: Interactive Stories Required

All overlay components need interactive stories with:
- Trigger element (button, link, etc.)
- State management (ref for v-model)
- Proper template structure

## Component-Specific Implementation

### ContextMenu

**File:** `storybook/overlay/ContextMenu.stories.ts`

**Key Props:**
- `modelValue` (boolean) - Open state
- `items` (array) - Menu items
- `disabled` (boolean)

**Required Stories:**
- Default (right-click trigger)
- WithIcons
- WithSubmenus
- WithDividers
- WithShortcuts

**Example:**
```typescript
export const Default: Story = {
  render: () => ({
    components: { UContextMenu },
    setup() {
      const items = [
        [{ label: 'Cut', icon: 'i-lucide-scissors', shortcut: '⌘X' }],
        [{ label: 'Copy', icon: 'i-lucide-copy', shortcut: '⌘C' }],
        [{ label: 'Paste', icon: 'i-lucide-clipboard', shortcut: '⌘V' }],
      ]
      return { items }
    },
    template: `
      <UContextMenu :items="items">
        <div class="p-8 border border-dashed rounded">
          Right-click here
        </div>
      </UContextMenu>
    `,
  }),
}
```

### Drawer

**File:** `storybook/overlay/Drawer.stories.ts`

**Key Props:**
- `modelValue` (boolean) - Open state
- `side` (enum) - left, right, top, bottom
- `title` (string) - Drawer title
- `description` (string) - Drawer description
- `overlay` (boolean) - Show backdrop

**Required Stories:**
- Default (from right)
- FromLeft
- FromTop
- FromBottom
- WithoutOverlay
- WithContent (complex content)
- Nested (drawer within drawer)

**Example:**
```typescript
export const Default: Story = {
  render: () => ({
    components: { UDrawer, UButton },
    setup() {
      const isOpen = ref(false)
      return { isOpen }
    },
    template: `
      <div>
        <UButton @click="isOpen = true" label="Open Drawer" />
        <UDrawer v-model="isOpen" title="Drawer Title">
          <div class="p-4">
            <p>Drawer content goes here.</p>
          </div>
        </UDrawer>
      </div>
    `,
  }),
}
```

### DropdownMenu

**File:** `storybook/overlay/DropdownMenu.stories.ts`

**Key Props:**
- `modelValue` (boolean) - Open state
- `items` (array) - Menu items
- `placement` (enum) - Popper placement
- `disabled` (boolean)

**Required Stories:**
- Default
- WithIcons
- WithShortcuts
- WithDividers
- Placements (top, bottom, left, right)
- WithSubmenus
- WithCustomTrigger

**Example:**
```typescript
export const Default: Story = {
  render: () => ({
    components: { UDropdownMenu, UButton },
    setup() {
      const items = [
        [
          { label: 'Profile', icon: 'i-lucide-user' },
          { label: 'Settings', icon: 'i-lucide-settings' },
        ],
        [
          { label: 'Logout', icon: 'i-lucide-log-out' },
        ],
      ]
      return { items }
    },
    template: `
      <UDropdownMenu :items="items">
        <UButton label="Menu" trailing-icon="i-lucide-chevron-down" />
      </UDropdownMenu>
    `,
  }),
}
```

### Modal

**File:** `storybook/overlay/Modal.stories.ts`

**Key Props:**
- `modelValue` (boolean) - Open state
- `title` (string) - Modal title
- `description` (string) - Modal description
- `fullscreen` (boolean) - Fullscreen mode
- `preventClose` (boolean) - Prevent closing
- `overlay` (boolean) - Show backdrop

**Required Stories:**
- Default
- WithTitle
- WithFooter
- Fullscreen
- PreventClose
- Scrollable (long content)
- WithForm
- Nested

**Example:**
```typescript
export const Default: Story = {
  render: () => ({
    components: { UModal, UButton },
    setup() {
      const isOpen = ref(false)
      return { isOpen }
    },
    template: `
      <div>
        <UButton @click="isOpen = true" label="Open Modal" />
        <UModal v-model="isOpen">
          <div class="p-6">
            <h2 class="text-xl font-bold mb-4">Modal Title</h2>
            <p>Modal content goes here.</p>
            <div class="mt-6 flex justify-end gap-2">
              <UButton variant="ghost" label="Cancel" @click="isOpen = false" />
              <UButton label="Confirm" @click="isOpen = false" />
            </div>
          </div>
        </UModal>
      </div>
    `,
  }),
}
```

### Popover

**File:** `storybook/overlay/Popover.stories.ts`

**Key Props:**
- `modelValue` (boolean) - Open state
- `placement` (enum) - Popper placement
- `mode` (enum) - click, hover
- `arrow` (boolean) - Show arrow
- `offset` (number) - Distance from trigger

**Required Stories:**
- Default (click mode)
- HoverMode
- Placements (all 12 positions)
- WithArrow
- WithOffset
- WithCustomContent

**Example:**
```typescript
export const Default: Story = {
  render: () => ({
    components: { UPopover, UButton },
    template: `
      <UPopover>
        <template #trigger>
          <UButton label="Click me" />
        </template>
        <template #content>
          <div class="p-4">
            <p class="font-semibold">Popover Title</p>
            <p class="text-sm">Popover content goes here.</p>
          </div>
        </template>
      </UPopover>
    `,
  }),
}
```

### Slideover

**File:** `storybook/overlay/Slideover.stories.ts`

**Key Props:**
- `modelValue` (boolean) - Open state
- `side` (enum) - left, right
- `title` (string) - Slideover title
- `description` (string) - Description
- `overlay` (boolean) - Show backdrop
- `preventClose` (boolean) - Prevent closing

**Required Stories:**
- Default (from right)
- FromLeft
- WithoutOverlay
- PreventClose
- WithForm
- Nested

**Example:**
```typescript
export const Default: Story = {
  render: () => ({
    components: { USlideover, UButton },
    setup() {
      const isOpen = ref(false)
      return { isOpen }
    },
    template: `
      <div>
        <UButton @click="isOpen = true" label="Open Slideover" />
        <USlideover v-model="isOpen" title="Slideover Title">
          <div class="p-4">
            <p>Slideover content goes here.</p>
          </div>
        </USlideover>
      </div>
    `,
  }),
}
```

### Toast

**File:** `storybook/overlay/Toast.stories.ts`

**Key Props:**
- Uses composable `useToast()`
- `title` (string) - Toast title
- `description` (string) - Toast message
- `color` (enum) - Color theme
- `icon` (string) - Toast icon
- `timeout` (number) - Auto-dismiss time
- `actions` (array) - Action buttons

**Required Stories:**
- Default
- Success
- Error
- Warning
- Info
- WithActions
- WithTimeout
- Persistent (no timeout)
- Positioned (top, bottom, etc.)

**Example:**
```typescript
export const Default: Story = {
  render: () => ({
    components: { UButton },
    setup() {
      const toast = useToast()

      const showToast = () => {
        toast.add({
          title: 'Success',
          description: 'Your action was completed successfully.',
          color: 'success',
          icon: 'i-lucide-check-circle',
        })
      }

      return { showToast }
    },
    template: `
      <UButton @click="showToast" label="Show Toast" />
    `,
  }),
}
```

### Tooltip

**File:** `storybook/overlay/Tooltip.stories.ts`

**Key Props:**
- `text` (string) - Tooltip content
- `placement` (enum) - Popper placement
- `delay` (number) - Show delay
- `arrow` (boolean) - Show arrow
- `shortcuts` (array) - Keyboard shortcuts

**Required Stories:**
- Default
- Placements (all positions)
- WithDelay
- WithArrow
- WithShortcuts
- LongText (wrapping)

**Example:**
```typescript
export const Default: Story = {
  render: () => ({
    components: { UTooltip, UButton },
    template: `
      <UTooltip text="This is a tooltip">
        <UButton label="Hover me" />
      </UTooltip>
    `,
  }),
}

export const WithShortcuts: Story = {
  render: () => ({
    components: { UTooltip, UButton },
    template: `
      <UTooltip text="Copy" :shortcuts="['⌘', 'C']">
        <UButton icon="i-lucide-copy" />
      </UTooltip>
    `,
  }),
}
```

## Popper Placement Options

All overlay components that support positioning use these placements:

```typescript
[
  'top', 'top-start', 'top-end',
  'bottom', 'bottom-start', 'bottom-end',
  'left', 'left-start', 'left-end',
  'right', 'right-start', 'right-end',
]
```

## Testing Checklist

For each overlay component:

- [ ] Component opens/closes correctly
- [ ] Keyboard interactions work (Escape, Tab)
- [ ] Focus management is correct
- [ ] Backdrop click behavior works
- [ ] Positioning is accurate
- [ ] Animations are smooth
- [ ] Mobile responsiveness
- [ ] Accessibility (ARIA attributes)
- [ ] Nested overlays work properly
- [ ] Z-index stacking is correct

## Common Patterns

### State Management
```typescript
setup() {
  const isOpen = ref(false)
  return { isOpen }
}
```

### Menu Items Structure
```typescript
const items = [
  [
    { label: 'Item 1', icon: 'i-lucide-icon', shortcut: '⌘1' },
    { label: 'Item 2', icon: 'i-lucide-icon', shortcut: '⌘2' },
  ],
  [
    { label: 'Item 3', icon: 'i-lucide-icon' },
  ],
]
```

### Toast Actions
```typescript
toast.add({
  title: 'Title',
  description: 'Description',
  actions: [
    {
      label: 'Action',
      onClick: () => {
        // Handle action
      },
    },
  ],
})
```

## Accessibility Requirements

All overlay components must:

1. **Keyboard Navigation**
   - Escape closes overlay
   - Tab navigates within overlay
   - Focus returns to trigger on close

2. **ARIA Attributes**
   - `aria-haspopup` on trigger
   - `aria-expanded` state
   - `role="dialog"` for modals
   - `role="menu"` for menus

3. **Focus Management**
   - Focus trap when open
   - Return focus on close
   - Initial focus placement

4. **Screen Reader**
   - Announce opening/closing
   - Describe content
   - Keyboard shortcuts

## Tips

1. **Interactive Stories**: Always use reactive state (ref)
2. **Real Triggers**: Use actual buttons/links as triggers
3. **Complex Content**: Show real-world content examples
4. **Nested Scenarios**: Test overlay within overlay
5. **Mobile Testing**: Verify touch interactions
6. **Performance**: Test with multiple overlays
7. **Positioning**: Test all placement options
8. **Edge Cases**: Test viewport boundaries
