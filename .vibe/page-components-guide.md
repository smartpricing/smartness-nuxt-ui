# Page Components Implementation Guide

This guide provides step-by-step instructions for implementing Storybook stories for all Page components in @nuxt/ui v4.

## Overview

Page components are pre-built sections and templates for common page patterns like marketing pages, blog layouts, and content sections.

**Priority: LOW**

## Components (22 total)

1. AuthForm
2. BlogPost
3. BlogPosts
4. ChangelogVersion
5. ChangelogVersions
6. Page
7. PageAnchors
8. PageAside
9. PageBody
10. PageCard
11. PageColumns
12. PageCTA
13. PageFeature
14. PageGrid
15. PageHeader
16. PageHero
17. PageLinks
18. PageList
19. PageLogos
20. PageSection
21. PricingPlan
22. PricingPlans
23. PricingTable

## Implementation Workflow

### Step 1: Fetch Component Metadata

```typescript
mcp__nuxt-ui-remote__get_component({ componentName: "ComponentName" })
mcp__nuxt-ui-remote__get_component_metadata({ componentName: "ComponentName" })
```

### Step 2: Create Story File

Location: `storybook/page/ComponentName.stories.ts`

### Step 3: Realistic Content

Page components require realistic content to demonstrate their effectiveness. Use sample blog posts, features, pricing plans, etc.

## Component Categories

### Authentication

#### AuthForm

**File:** `storybook/page/AuthForm.stories.ts`

**Required Stories:**
- SignIn
- SignUp
- ForgotPassword
- ResetPassword
- WithSocial

### Blog

#### BlogPost

**File:** `storybook/page/BlogPost.stories.ts`

**Required Stories:**
- Default
- WithImage
- WithAuthor
- WithTags
- WithRelatedPosts

#### BlogPosts

**File:** `storybook/page/BlogPosts.stories.ts`

**Required Stories:**
- Default (grid)
- List
- Featured
- WithPagination
- WithCategories

### Changelog

#### ChangelogVersion

**File:** `storybook/page/ChangelogVersion.stories.ts`

**Required Stories:**
- Default
- WithChanges
- Beta
- Deprecated

#### ChangelogVersions

**File:** `storybook/page/ChangelogVersions.stories.ts`

**Required Stories:**
- Default
- Grouped
- WithSearch

### Page Structure

#### Page

**File:** `storybook/page/Page.stories.ts`

**Required Stories:**
- Default
- WithHeader
- WithSidebar
- WithTableOfContents

#### PageAnchors

**File:** `storybook/page/PageAnchors.stories.ts`

**Required Stories:**
- Default
- Sticky
- WithIcons

#### PageAside

**File:** `storybook/page/PageAside.stories.ts`

**Required Stories:**
- Default
- Sticky
- WithNavigation

#### PageBody

**File:** `storybook/page/PageBody.stories.ts`

**Required Stories:**
- Default
- WithProse
- WithSidebar

### Content Sections

#### PageCard

**File:** `storybook/page/PageCard.stories.ts`

**Required Stories:**
- Default
- WithIcon
- WithImage
- Clickable

#### PageColumns

**File:** `storybook/page/PageColumns.stories.ts`

**Required Stories:**
- TwoColumns
- ThreeColumns
- FourColumns
- Responsive

#### PageCTA

**File:** `storybook/page/PageCTA.stories.ts`

**Required Stories:**
- Default
- WithBackground
- Centered
- Split

**Example:**
```typescript
export const Default: Story = {
  args: {
    title: 'Ready to get started?',
    description: 'Join thousands of users who trust our platform.',
    actions: [
      { label: 'Get Started', to: '/signup' },
      { label: 'Learn More', to: '/docs', variant: 'ghost' },
    ],
  },
}
```

#### PageFeature

**File:** `storybook/page/PageFeature.stories.ts`

**Required Stories:**
- Default
- WithIcon
- WithImage
- ImageRight
- ImageLeft

#### PageGrid

**File:** `storybook/page/PageGrid.stories.ts`

**Required Stories:**
- Default
- TwoColumns
- ThreeColumns
- FourColumns

#### PageHeader

**File:** `storybook/page/PageHeader.stories.ts`

**Required Stories:**
- Default
- WithBreadcrumb
- WithActions
- WithDescription

#### PageHero

**File:** `storybook/page/PageHero.stories.ts`

**Required Stories:**
- Default
- WithImage
- WithVideo
- Centered
- Split

**Example:**
```typescript
export const Default: Story = {
  args: {
    title: 'Build amazing applications',
    description: 'Create stunning interfaces with our component library.',
    actions: [
      { label: 'Get Started', size: 'lg' },
      { label: 'View Demo', variant: 'outline', size: 'lg' },
    ],
  },
}

export const WithImage: Story = {
  args: {
    title: 'Build amazing applications',
    description: 'Create stunning interfaces with our component library.',
    image: '/hero-image.jpg',
    actions: [
      { label: 'Get Started', size: 'lg' },
    ],
  },
}
```

#### PageLinks

**File:** `storybook/page/PageLinks.stories.ts`

**Required Stories:**
- Default
- WithIcons
- WithDescriptions
- Grid

#### PageList

**File:** `storybook/page/PageList.stories.ts`

**Required Stories:**
- Default
- WithIcons
- Ordered
- Nested

#### PageLogos

**File:** `storybook/page/PageLogos.stories.ts`

**Required Stories:**
- Default
- Marquee
- Grid
- WithTitle

**Example:**
```typescript
export const Default: Story = {
  args: {
    title: 'Trusted by industry leaders',
    logos: [
      { name: 'Company 1', src: '/logo1.svg' },
      { name: 'Company 2', src: '/logo2.svg' },
      { name: 'Company 3', src: '/logo3.svg' },
      { name: 'Company 4', src: '/logo4.svg' },
    ],
  },
}
```

#### PageSection

**File:** `storybook/page/PageSection.stories.ts`

**Required Stories:**
- Default
- WithBackground
- Centered
- Full Width

### Pricing

#### PricingPlan

**File:** `storybook/page/PricingPlan.stories.ts`

**Required Stories:**
- Default
- Featured
- WithBadge
- Annual
- Monthly

**Example:**
```typescript
export const Default: Story = {
  args: {
    title: 'Pro',
    price: '$29',
    description: 'Perfect for small teams',
    features: [
      'Up to 10 users',
      'Unlimited projects',
      '24/7 support',
      'Advanced analytics',
    ],
    action: {
      label: 'Get Started',
    },
  },
}

export const Featured: Story = {
  args: {
    title: 'Business',
    price: '$99',
    description: 'For growing organizations',
    featured: true,
    badge: 'Most Popular',
    features: [
      'Unlimited users',
      'Unlimited projects',
      'Priority support',
      'Advanced analytics',
      'Custom integrations',
    ],
    action: {
      label: 'Get Started',
    },
  },
}
```

#### PricingPlans

**File:** `storybook/page/PricingPlans.stories.ts`

**Required Stories:**
- Default (3 plans)
- WithToggle (monthly/annual)
- WithComparison

#### PricingTable

**File:** `storybook/page/PricingTable.stories.ts`

**Required Stories:**
- Default
- ComparisonMatrix

## Sample Content

### Blog Post Data
```typescript
const blogPost = {
  title: 'Getting Started with Nuxt UI',
  description: 'Learn how to build beautiful interfaces with Nuxt UI components.',
  date: '2024-01-15',
  author: {
    name: 'John Doe',
    avatar: '/avatar.jpg',
  },
  image: '/blog-post.jpg',
  tags: ['Tutorial', 'Vue', 'Nuxt'],
  content: `
    <p>Nuxt UI provides a comprehensive set of components...</p>
  `,
}
```

### Pricing Plan Data
```typescript
const pricingPlans = [
  {
    name: 'Starter',
    price: '$0',
    description: 'Perfect for trying out',
    features: ['Feature 1', 'Feature 2', 'Feature 3'],
  },
  {
    name: 'Pro',
    price: '$29',
    description: 'For small teams',
    featured: true,
    features: ['All Starter features', 'Feature 4', 'Feature 5'],
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    description: 'For large organizations',
    features: ['All Pro features', 'Feature 6', 'Feature 7'],
  },
]
```

### Feature Data
```typescript
const features = [
  {
    icon: 'i-lucide-zap',
    title: 'Fast Performance',
    description: 'Optimized for speed and efficiency.',
  },
  {
    icon: 'i-lucide-shield',
    title: 'Secure',
    description: 'Enterprise-grade security built-in.',
  },
  {
    icon: 'i-lucide-settings',
    title: 'Customizable',
    description: 'Fully customizable to match your brand.',
  },
]
```

## Testing Checklist

For each page component:

- [ ] Component renders with sample content
- [ ] Responsive design works on all screen sizes
- [ ] Images load correctly
- [ ] Links navigate properly
- [ ] CTAs are functional
- [ ] Typography is readable
- [ ] Spacing is consistent
- [ ] Mobile layout is optimized

## Common Patterns

### Hero Section
```typescript
{
  title: string
  description: string
  image?: string
  actions: ButtonProps[]
}
```

### Feature Section
```typescript
{
  icon: string
  title: string
  description: string
  link?: LinkProps
}
```

### Pricing Plan
```typescript
{
  name: string
  price: string | number
  description: string
  features: string[]
  featured?: boolean
  badge?: string
  action: ButtonProps
}
```

## Tips

1. **Realistic Content**: Use real-looking content and images
2. **Complete Sections**: Show full page section examples
3. **Responsive**: Test on mobile, tablet, desktop
4. **Composition**: Show multiple sections together
5. **Variations**: Include multiple style variations
6. **Performance**: Optimize images and content
7. **Accessibility**: Ensure proper heading hierarchy
8. **SEO**: Use semantic HTML structure
