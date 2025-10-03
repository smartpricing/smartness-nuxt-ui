# Data Components Implementation Guide

This guide provides step-by-step instructions for implementing Storybook stories for all Data components in @nuxt/ui v4.

## Overview

Data components handle data visualization, structured content display, and interactive data representations.

**Priority: MEDIUM**

## Components (7 total)

1. Accordion
2. Carousel
3. Marquee
4. Table
5. Timeline
6. Tree
7. User

## Implementation Workflow

### Step 1: Fetch Component Metadata

```typescript
// Get component documentation
mcp__nuxt-ui-remote__get_component({ componentName: "ComponentName" })

// Get detailed metadata
mcp__nuxt-ui-remote__get_component_metadata({ componentName: "ComponentName" })
```

### Step 2: Create Story File

Location: `storybook/data/ComponentName.stories.ts`

### Step 3: Sample Data

Create realistic sample data for each component to demonstrate actual usage patterns.

## Component-Specific Implementation

### Accordion

**File:** `storybook/data/Accordion.stories.ts`

**Key Props:**
- `items` (array) - Accordion items
- `multiple` (boolean) - Allow multiple open
- `defaultValue` (string | string[]) - Default open items
- `disabled` (boolean)

**Required Stories:**
- Default (single open)
- Multiple (allow multiple open)
- WithIcons
- Disabled
- DefaultOpen

**Example:**
```typescript
export const Default: Story = {
  args: {
    items: [
      {
        label: 'Section 1',
        content: 'Content for section 1',
      },
      {
        label: 'Section 2',
        content: 'Content for section 2',
      },
      {
        label: 'Section 3',
        content: 'Content for section 3',
      },
    ],
  },
}

export const WithIcons: Story = {
  args: {
    items: [
      {
        label: 'Account',
        icon: 'i-lucide-user',
        content: 'Manage your account settings.',
      },
      {
        label: 'Security',
        icon: 'i-lucide-lock',
        content: 'Update your security preferences.',
      },
    ],
  },
}
```

### Carousel

**File:** `storybook/data/Carousel.stories.ts`

**Key Props:**
- `items` (array) - Carousel items
- `autoplay` (boolean) - Auto-advance slides
- `interval` (number) - Autoplay interval
- `loop` (boolean) - Loop slides
- `arrows` (boolean) - Show navigation arrows
- `indicators` (boolean) - Show dot indicators

**Required Stories:**
- Default
- Autoplay
- WithArrows
- WithIndicators
- MultipleItems
- Responsive

**Example:**
```typescript
export const Default: Story = {
  render: () => ({
    components: { UCarousel },
    setup() {
      const items = [
        { id: 1, image: '/image1.jpg', title: 'Slide 1' },
        { id: 2, image: '/image2.jpg', title: 'Slide 2' },
        { id: 3, image: '/image3.jpg', title: 'Slide 3' },
      ]
      return { items }
    },
    template: `
      <UCarousel :items="items" arrows indicators>
        <template #default="{ item }">
          <div class="p-8 bg-gray-100 rounded">
            <h3 class="text-xl font-bold">{{ item.title }}</h3>
          </div>
        </template>
      </UCarousel>
    `,
  }),
}
```

### Marquee

**File:** `storybook/data/Marquee.stories.ts`

**Key Props:**
- `items` (array) - Items to scroll
- `speed` (number) - Scroll speed
- `direction` (enum) - left, right, up, down
- `pauseOnHover` (boolean)

**Required Stories:**
- Default (horizontal)
- Vertical
- CustomSpeed
- PauseOnHover
- LogosExample

**Example:**
```typescript
export const Default: Story = {
  args: {
    items: [
      'Item 1',
      'Item 2',
      'Item 3',
      'Item 4',
      'Item 5',
    ],
    speed: 50,
    pauseOnHover: true,
  },
}

export const LogosExample: Story = {
  render: () => ({
    components: { UMarquee },
    setup() {
      const logos = [
        { name: 'Company 1', logo: '/logo1.svg' },
        { name: 'Company 2', logo: '/logo2.svg' },
        { name: 'Company 3', logo: '/logo3.svg' },
      ]
      return { logos }
    },
    template: `
      <UMarquee :items="logos" pauseOnHover>
        <template #default="{ item }">
          <img :src="item.logo" :alt="item.name" class="h-12" />
        </template>
      </UMarquee>
    `,
  }),
}
```

### Table

**File:** `storybook/data/Table.stories.ts`

**Key Props:**
- `columns` (array) - Table columns configuration
- `rows` (array) - Table data
- `loading` (boolean) - Loading state
- `empty` (string) - Empty state message
- `sortable` (boolean) - Enable sorting
- `selectable` (boolean) - Enable row selection

**Required Stories:**
- Default
- WithSorting
- WithSelection
- Loading
- Empty
- Pagination
- Expandable
- CustomCells

**Example:**
```typescript
export const Default: Story = {
  render: () => ({
    components: { UTable },
    setup() {
      const columns = [
        { key: 'name', label: 'Name', sortable: true },
        { key: 'email', label: 'Email' },
        { key: 'role', label: 'Role' },
        { key: 'actions', label: 'Actions' },
      ]

      const rows = [
        { name: 'John Doe', email: 'john@example.com', role: 'Admin' },
        { name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
        { name: 'Bob Wilson', email: 'bob@example.com', role: 'User' },
      ]

      return { columns, rows }
    },
    template: `
      <UTable :columns="columns" :rows="rows" />
    `,
  }),
}

export const WithSelection: Story = {
  render: () => ({
    components: { UTable },
    setup() {
      const columns = [
        { key: 'name', label: 'Name' },
        { key: 'email', label: 'Email' },
      ]

      const rows = [
        { id: 1, name: 'John Doe', email: 'john@example.com' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
      ]

      const selected = ref([])

      return { columns, rows, selected }
    },
    template: `
      <div>
        <UTable
          :columns="columns"
          :rows="rows"
          v-model="selected"
          selectable
        />
        <p class="mt-4">Selected: {{ selected.length }} items</p>
      </div>
    `,
  }),
}
```

### Timeline

**File:** `storybook/data/Timeline.stories.ts`

**Key Props:**
- `items` (array) - Timeline items
- `orientation` (enum) - vertical, horizontal

**Required Stories:**
- Default (vertical)
- Horizontal
- WithIcons
- WithTimestamps
- WithCustomContent

**Example:**
```typescript
export const Default: Story = {
  args: {
    items: [
      {
        title: 'Event 1',
        description: 'Description of event 1',
        date: '2024-01-01',
        icon: 'i-lucide-check-circle',
      },
      {
        title: 'Event 2',
        description: 'Description of event 2',
        date: '2024-02-01',
        icon: 'i-lucide-circle',
      },
      {
        title: 'Event 3',
        description: 'Description of event 3',
        date: '2024-03-01',
        icon: 'i-lucide-circle',
      },
    ],
  },
}
```

### Tree

**File:** `storybook/data/Tree.stories.ts`

**Key Props:**
- `items` (array) - Tree items (nested structure)
- `defaultExpanded` (string[]) - Default expanded nodes
- `selectable` (boolean) - Enable selection
- `multiSelect` (boolean) - Multiple selection

**Required Stories:**
- Default
- DefaultExpanded
- WithSelection
- MultiSelect
- WithIcons
- Async (lazy loading)

**Example:**
```typescript
export const Default: Story = {
  args: {
    items: [
      {
        label: 'Parent 1',
        children: [
          { label: 'Child 1.1' },
          {
            label: 'Child 1.2',
            children: [
              { label: 'Grandchild 1.2.1' },
            ],
          },
        ],
      },
      {
        label: 'Parent 2',
        children: [
          { label: 'Child 2.1' },
        ],
      },
    ],
  },
}

export const WithIcons: Story = {
  args: {
    items: [
      {
        label: 'Documents',
        icon: 'i-lucide-folder',
        children: [
          { label: 'file1.pdf', icon: 'i-lucide-file' },
          { label: 'file2.pdf', icon: 'i-lucide-file' },
        ],
      },
      {
        label: 'Images',
        icon: 'i-lucide-folder',
        children: [
          { label: 'photo1.jpg', icon: 'i-lucide-image' },
        ],
      },
    ],
  },
}
```

### User

**File:** `storybook/data/User.stories.ts`

**Key Props:**
- `name` (string) - User name
- `description` (string) - User description/subtitle
- `avatar` (AvatarProps) - Avatar configuration
- `chip` (ChipProps) - Status chip

**Required Stories:**
- Default
- WithAvatar
- WithChip
- WithCustomContent

**Example:**
```typescript
export const Default: Story = {
  args: {
    name: 'John Doe',
    description: 'Software Engineer',
  },
}

export const WithAvatar: Story = {
  args: {
    name: 'Jane Smith',
    description: 'Product Manager',
    avatar: {
      src: '/avatar.jpg',
      alt: 'Jane Smith',
    },
  },
}

export const WithChip: Story = {
  args: {
    name: 'Bob Wilson',
    description: 'Team Lead',
    avatar: {
      text: 'BW',
    },
    chip: {
      text: 'Online',
      color: 'success',
    },
  },
}
```

## Testing Checklist

For each data component:

- [ ] Component renders with sample data
- [ ] Interactive features work (expand/collapse, sort, select)
- [ ] Empty states display correctly
- [ ] Loading states function properly
- [ ] Responsive behavior
- [ ] Keyboard navigation
- [ ] Accessibility (ARIA)
- [ ] Performance with large datasets

## Sample Data Generators

### Users Data
```typescript
const users = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
  { id: 3, name: 'Bob Wilson', email: 'bob@example.com', role: 'User' },
]
```

### Timeline Events
```typescript
const events = [
  {
    title: 'Project Started',
    description: 'Initial project kickoff',
    date: '2024-01-01',
    icon: 'i-lucide-play',
  },
  {
    title: 'Milestone 1',
    description: 'First major milestone achieved',
    date: '2024-02-15',
    icon: 'i-lucide-flag',
  },
]
```

### Tree Structure
```typescript
const treeData = [
  {
    id: '1',
    label: 'Root',
    children: [
      { id: '1-1', label: 'Child 1' },
      {
        id: '1-2',
        label: 'Child 2',
        children: [
          { id: '1-2-1', label: 'Grandchild' },
        ],
      },
    ],
  },
]
```

## Common Patterns

### Table Column Configuration
```typescript
{
  key: 'columnKey',
  label: 'Column Label',
  sortable: true,
  class: 'custom-class',
  width: '200px',
}
```

### Accordion Item Structure
```typescript
{
  label: 'Item Label',
  icon: 'i-lucide-icon',
  content: 'Item content',
  disabled: false,
}
```

## Accessibility Requirements

1. **Table**
   - Proper table semantics
   - Column headers
   - Row selection announcement

2. **Accordion**
   - Expandable region ARIA
   - Keyboard navigation
   - Focus management

3. **Tree**
   - Tree role
   - Expand/collapse states
   - Arrow key navigation

## Tips

1. **Realistic Data**: Use realistic sample data
2. **Large Datasets**: Test with many items
3. **Empty States**: Show empty state handling
4. **Loading States**: Demonstrate loading UI
5. **Error Handling**: Show error scenarios
6. **Customization**: Demonstrate custom templates
7. **Performance**: Test with large data
8. **Sorting**: Show sort functionality
