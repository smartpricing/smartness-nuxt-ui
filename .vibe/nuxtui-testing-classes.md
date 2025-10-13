# NuxtUI Component Testing Classes Guide

## Overview

This document provides a comprehensive reference for adding testing classes to all NuxtUI v4 component slots. Since NuxtUI does not currently support `data-id` attributes in configuration, we use CSS classes for testing purposes.

## Class Naming Convention

Format: `[component]-[slot]-smartness-test`

Example:
- `accordion-leading-smartness-test`
- `button-default-smartness-test`
- `card-header-smartness-test`

## How to Apply in app.config.ts

```typescript
export default defineAppConfig({
	ui: {
		// Component configuration
		componentName: {
			slots: {
				slotName: "slot-name-smartness-test"
			}
		}
	}
});
```

---

## Component Slots Reference

### Accordion
**Component**: `UAccordion`

**Slots**:
- `leading` → Class: `accordion-leading-smartness-test`
- `default` → Class: `accordion-default-smartness-test`
- `trailing` → Class: `accordion-trailing-smartness-test`
- `content` → Class: `accordion-content-smartness-test`
- `body` → Class: `accordion-body-smartness-test`

**app.config.ts Example**:
```typescript
accordion: {
  slots: {
    leading: 'accordion-leading-smartness-test',
    default: 'accordion-default-smartness-test',
    trailing: 'accordion-trailing-smartness-test',
    content: 'accordion-content-smartness-test',
    body: 'accordion-body-smartness-test'
  }
}
```

---

### Alert
**Component**: `UAlert`

**Slots**:
- `leading` → Class: `alert-leading-smartness-test`
- `title` → Class: `alert-title-smartness-test`
- `description` → Class: `alert-description-smartness-test`
- `actions` → Class: `alert-actions-smartness-test`
- `close` → Class: `alert-close-smartness-test`

**app.config.ts Example**:
```typescript
alert: {
  slots: {
    leading: 'alert-leading-smartness-test',
    title: 'alert-title-smartness-test',
    description: 'alert-description-smartness-test',
    actions: 'alert-actions-smartness-test',
    close: 'alert-close-smartness-test'
  }
}
```

---

### App
**Component**: `UApp`

**Slots**:
- `default` → Class: `app-default-smartness-test`

**app.config.ts Example**:
```typescript
app: {
  slots: {
    default: 'app-default-smartness-test'
  }
}
```

---

### AuthForm
**Component**: `UAuthForm`

**Slots**: _(Component response too large - check GitHub source at: https://github.com/nuxt/ui/blob/v4/src/theme/authForm.ts)_

---

### Avatar
**Component**: `UAvatar`

**Slots**:
- `default` → Class: `avatar-default-smartness-test`

**app.config.ts Example**:
```typescript
avatar: {
  slots: {
    default: 'avatar-default-smartness-test'
  }
}
```

---

### AvatarGroup
**Component**: `UAvatarGroup`

**Slots**:
- `default` → Class: `avatar-group-default-smartness-test`

**app.config.ts Example**:
```typescript
avatarGroup: {
  slots: {
    default: 'avatar-group-default-smartness-test'
  }
}
```

---

### Badge
**Component**: `UBadge`

**Slots**:
- `leading` → Class: `badge-leading-smartness-test`
- `default` → Class: `badge-default-smartness-test`
- `trailing` → Class: `badge-trailing-smartness-test`

**app.config.ts Example**:
```typescript
badge: {
  slots: {
    leading: 'badge-leading-smartness-test',
    default: 'badge-default-smartness-test',
    trailing: 'badge-trailing-smartness-test'
  }
}
```

---

### Banner
**Component**: `UBanner`

**Slots**:
- `leading` → Class: `banner-leading-smartness-test`
- `title` → Class: `banner-title-smartness-test`
- `actions` → Class: `banner-actions-smartness-test`
- `close` → Class: `banner-close-smartness-test`

**app.config.ts Example**:
```typescript
banner: {
  slots: {
    leading: 'banner-leading-smartness-test',
    title: 'banner-title-smartness-test',
    actions: 'banner-actions-smartness-test',
    close: 'banner-close-smartness-test'
  }
}
```

---

### BlogPost
**Component**: `UBlogPost`

**Slots**:
- `date` → Class: `blog-post-date-smartness-test`
- `badge` → Class: `blog-post-badge-smartness-test`
- `title` → Class: `blog-post-title-smartness-test`
- `description` → Class: `blog-post-description-smartness-test`
- `authors` → Class: `blog-post-authors-smartness-test`
- `header` → Class: `blog-post-header-smartness-test`
- `body` → Class: `blog-post-body-smartness-test`
- `footer` → Class: `blog-post-footer-smartness-test`

**app.config.ts Example**:
```typescript
blogPost: {
  slots: {
    date: 'blog-post-date-smartness-test',
    badge: 'blog-post-badge-smartness-test',
    title: 'blog-post-title-smartness-test',
    description: 'blog-post-description-smartness-test',
    authors: 'blog-post-authors-smartness-test',
    header: 'blog-post-header-smartness-test',
    body: 'blog-post-body-smartness-test',
    footer: 'blog-post-footer-smartness-test'
  }
}
```

---

### BlogPosts
**Component**: `UBlogPosts`

**Slots**:
- `default` → Class: `blog-posts-default-smartness-test`

**app.config.ts Example**:
```typescript
blogPosts: {
  slots: {
    default: 'blog-posts-default-smartness-test'
  }
}
```

---

### Breadcrumb
**Component**: `UBreadcrumb`

**Slots**: _(Component response too large - check GitHub source at: https://github.com/nuxt/ui/blob/v4/src/theme/breadcrumb.ts)_

---

### Button
**Component**: `UButton`

**Slots**:
- `leading` → Class: `button-leading-smartness-test`
- `default` → Class: `button-default-smartness-test`
- `trailing` → Class: `button-trailing-smartness-test`

**app.config.ts Example**:
```typescript
button: {
  slots: {
    leading: 'button-leading-smartness-test',
    default: 'button-default-smartness-test',
    trailing: 'button-trailing-smartness-test'
  }
}
```

---

### Calendar
**Component**: `UCalendar`

**Slots**: _(Component response too large - check GitHub source at: https://github.com/nuxt/ui/blob/v4/src/theme/calendar.ts)_

---

### Card
**Component**: `UCard`

**Slots**:
- `header` → Class: `card-header-smartness-test`
- `default` → Class: `card-default-smartness-test`
- `footer` → Class: `card-footer-smartness-test`

**app.config.ts Example**:
```typescript
card: {
  slots: {
    header: 'card-header-smartness-test',
    default: 'card-default-smartness-test',
    footer: 'card-footer-smartness-test'
  }
}
```

---

### Carousel
**Component**: `UCarousel`

**Slots**: _(Component response too large - check GitHub source at: https://github.com/nuxt/ui/blob/v4/src/theme/carousel.ts)_

---

### Checkbox
**Component**: `UCheckbox`

**Slots**:
- `label` → Class: `checkbox-label-smartness-test`
- `description` → Class: `checkbox-description-smartness-test`

**app.config.ts Example**:
```typescript
checkbox: {
  slots: {
    label: 'checkbox-label-smartness-test',
    description: 'checkbox-description-smartness-test'
  }
}
```

---

### CheckboxGroup
**Component**: `UCheckboxGroup`

**Slots**:
- `legend` → Class: `checkbox-group-legend-smartness-test`
- `label` → Class: `checkbox-group-label-smartness-test`
- `description` → Class: `checkbox-group-description-smartness-test`

**app.config.ts Example**:
```typescript
checkboxGroup: {
  slots: {
    legend: 'checkbox-group-legend-smartness-test',
    label: 'checkbox-group-label-smartness-test',
    description: 'checkbox-group-description-smartness-test'
  }
}
```

---

### Chip
**Component**: `UChip`

**Slots**:
- `default` → Class: `chip-default-smartness-test`
- `content` → Class: `chip-content-smartness-test`

**app.config.ts Example**:
```typescript
chip: {
  slots: {
    default: 'chip-default-smartness-test',
    content: 'chip-content-smartness-test'
  }
}
```

---

### Collapsible
**Component**: `UCollapsible`

**Slots**:
- `default` → Class: `collapsible-default-smartness-test`
- `content` → Class: `collapsible-content-smartness-test`

**app.config.ts Example**:
```typescript
collapsible: {
  slots: {
    default: 'collapsible-default-smartness-test',
    content: 'collapsible-content-smartness-test'
  }
}
```

---

### CommandPalette
**Component**: `UCommandPalette`

**Slots**: _(Component response too large - check GitHub source at: https://github.com/nuxt/ui/blob/v4/src/theme/commandPalette.ts)_

---

### ChangelogVersion
**Component**: `UChangelogVersion`

**Slots**:
- `header` → Class: `changelog-version-header-smartness-test`
- `badge` → Class: `changelog-version-badge-smartness-test`
- `date` → Class: `changelog-version-date-smartness-test`
- `title` → Class: `changelog-version-title-smartness-test`
- `description` → Class: `changelog-version-description-smartness-test`
- `image` → Class: `changelog-version-image-smartness-test`
- `body` → Class: `changelog-version-body-smartness-test`
- `footer` → Class: `changelog-version-footer-smartness-test`
- `authors` → Class: `changelog-version-authors-smartness-test`
- `actions` → Class: `changelog-version-actions-smartness-test`
- `indicator` → Class: `changelog-version-indicator-smartness-test`

**app.config.ts Example**:
```typescript
changelogVersion: {
  slots: {
    header: 'changelog-version-header-smartness-test',
    badge: 'changelog-version-badge-smartness-test',
    date: 'changelog-version-date-smartness-test',
    title: 'changelog-version-title-smartness-test',
    description: 'changelog-version-description-smartness-test',
    image: 'changelog-version-image-smartness-test',
    body: 'changelog-version-body-smartness-test',
    footer: 'changelog-version-footer-smartness-test',
    authors: 'changelog-version-authors-smartness-test',
    actions: 'changelog-version-actions-smartness-test',
    indicator: 'changelog-version-indicator-smartness-test'
  }
}
```

---

### ChatMessages
**Component**: `UChatMessages`

**Slots**:
- `default` → Class: `chat-messages-default-smartness-test`
- `indicator` → Class: `chat-messages-indicator-smartness-test`
- `viewport` → Class: `chat-messages-viewport-smartness-test`
- `content` → Class: `chat-messages-content-smartness-test`
- `leading` → Class: `chat-messages-leading-smartness-test`
- `actions` → Class: `chat-messages-actions-smartness-test`

**app.config.ts Example**:
```typescript
chatMessages: {
  slots: {
    default: 'chat-messages-default-smartness-test',
    indicator: 'chat-messages-indicator-smartness-test',
    viewport: 'chat-messages-viewport-smartness-test',
    content: 'chat-messages-content-smartness-test',
    leading: 'chat-messages-leading-smartness-test',
    actions: 'chat-messages-actions-smartness-test'
  }
}
```

---

### ChatPalette
**Component**: `UChatPalette`

**Slots**:
- `default` → Class: `chat-palette-default-smartness-test`
- `prompt` → Class: `chat-palette-prompt-smartness-test`

**app.config.ts Example**:
```typescript
chatPalette: {
  slots: {
    default: 'chat-palette-default-smartness-test',
    prompt: 'chat-palette-prompt-smartness-test'
  }
}
```

---

### ChatPrompt
**Component**: `UChatPrompt`

**Slots**:
- `header` → Class: `chat-prompt-header-smartness-test`
- `footer` → Class: `chat-prompt-footer-smartness-test`
- `leading` → Class: `chat-prompt-leading-smartness-test`
- `default` → Class: `chat-prompt-default-smartness-test`
- `trailing` → Class: `chat-prompt-trailing-smartness-test`

**app.config.ts Example**:
```typescript
chatPrompt: {
  slots: {
    header: 'chat-prompt-header-smartness-test',
    footer: 'chat-prompt-footer-smartness-test',
    leading: 'chat-prompt-leading-smartness-test',
    default: 'chat-prompt-default-smartness-test',
    trailing: 'chat-prompt-trailing-smartness-test'
  }
}
```

---

### ChatPromptSubmit
**Component**: `UChatPromptSubmit`

**Slots**:
- `leading` → Class: `chat-prompt-submit-leading-smartness-test`
- `default` → Class: `chat-prompt-submit-default-smartness-test`
- `trailing` → Class: `chat-prompt-submit-trailing-smartness-test`

**app.config.ts Example**:
```typescript
chatPromptSubmit: {
  slots: {
    leading: 'chat-prompt-submit-leading-smartness-test',
    default: 'chat-prompt-submit-default-smartness-test',
    trailing: 'chat-prompt-submit-trailing-smartness-test'
  }
}
```

---

### ColorModeAvatar
**Component**: `UColorModeAvatar`

**Slots**: _No slots available for this component_

---

### ColorModeButton
**Component**: `UColorModeButton`

**Slots**:
- `fallback` → Class: `color-mode-button-fallback-smartness-test`

**app.config.ts Example**:
```typescript
colorModeButton: {
	slots: {
		fallback: "color-mode-button-fallback-smartness-test";
	}
}
```

---

### ColorModeImage
**Component**: `UColorModeImage`

**Slots**: _No slots available for this component_

---

### ColorModeSelect
**Component**: `UColorModeSelect`

**Slots**: _No slots available for this component_

---

### ColorModeSwitch
**Component**: `UColorModeSwitch`

**Slots**: _No slots available for this component_

---

### ColorPicker
**Component**: `UColorPicker`

**Slots**: _No slots available for this component_

---

### Container
**Component**: `UContainer`

**Slots**:
- `default` → Class: `container-default-smartness-test`

**app.config.ts Example**:
```typescript
container: {
  slots: {
    default: 'container-default-smartness-test'
  }
}
```

---

### Drawer
**Component**: `UDrawer`

**Slots**:
- `default` → Class: `drawer-default-smartness-test`
- `content` → Class: `drawer-content-smartness-test`
- `header` → Class: `drawer-header-smartness-test`
- `title` → Class: `drawer-title-smartness-test`
- `description` → Class: `drawer-description-smartness-test`
- `body` → Class: `drawer-body-smartness-test`
- `footer` → Class: `drawer-footer-smartness-test`

**app.config.ts Example**:
```typescript
drawer: {
  slots: {
    default: 'drawer-default-smartness-test',
    content: 'drawer-content-smartness-test',
    header: 'drawer-header-smartness-test',
    title: 'drawer-title-smartness-test',
    description: 'drawer-description-smartness-test',
    body: 'drawer-body-smartness-test',
    footer: 'drawer-footer-smartness-test'
  }
}
```

---

### Error
**Component**: `UError`

**Slots**:
- `default` → Class: `error-default-smartness-test`
- `statusCode` → Class: `error-status-code-smartness-test`
- `statusMessage` → Class: `error-status-message-smartness-test`
- `message` → Class: `error-message-smartness-test`
- `links` → Class: `error-links-smartness-test`

**app.config.ts Example**:
```typescript
error: {
  slots: {
    default: 'error-default-smartness-test',
    statusCode: 'error-status-code-smartness-test',
    statusMessage: 'error-status-message-smartness-test',
    message: 'error-message-smartness-test',
    links: 'error-links-smartness-test'
  }
}
```

---

### FieldGroup
**Component**: `UFieldGroup`

**Slots**:
- `default` → Class: `field-group-default-smartness-test`

**app.config.ts Example**:
```typescript
fieldGroup: {
  slots: {
    default: 'field-group-default-smartness-test'
  }
}
```

---

### FileUpload
**Component**: `UFileUpload`

**Slots**:
- `default` → Class: `file-upload-default-smartness-test`
- `leading` → Class: `file-upload-leading-smartness-test`
- `label` → Class: `file-upload-label-smartness-test`
- `description` → Class: `file-upload-description-smartness-test`
- `actions` → Class: `file-upload-actions-smartness-test`
- `files` → Class: `file-upload-files-smartness-test`
- `files-top` → Class: `file-upload-files-top-smartness-test`
- `files-bottom` → Class: `file-upload-files-bottom-smartness-test`
- `file` → Class: `file-upload-file-smartness-test`
- `file-leading` → Class: `file-upload-file-leading-smartness-test`
- `file-name` → Class: `file-upload-file-name-smartness-test`
- `file-size` → Class: `file-upload-file-size-smartness-test`
- `file-trailing` → Class: `file-upload-file-trailing-smartness-test`

**app.config.ts Example**:
```typescript
fileUpload: {
  slots: {
    default: 'file-upload-default-smartness-test',
    leading: 'file-upload-leading-smartness-test',
    label: 'file-upload-label-smartness-test',
    description: 'file-upload-description-smartness-test',
    actions: 'file-upload-actions-smartness-test',
    files: 'file-upload-files-smartness-test',
    'files-top': 'file-upload-files-top-smartness-test',
    'files-bottom': 'file-upload-files-bottom-smartness-test',
    file: 'file-upload-file-smartness-test',
    'file-leading': 'file-upload-file-leading-smartness-test',
    'file-name': 'file-upload-file-name-smartness-test',
    'file-size': 'file-upload-file-size-smartness-test',
    'file-trailing': 'file-upload-file-trailing-smartness-test'
  }
}
```

---

### Footer
**Component**: `UFooter`

**Slots**:
- `left` → Class: `footer-left-smartness-test`
- `default` → Class: `footer-default-smartness-test`
- `right` → Class: `footer-right-smartness-test`
- `top` → Class: `footer-top-smartness-test`
- `bottom` → Class: `footer-bottom-smartness-test`

**app.config.ts Example**:
```typescript
footer: {
  slots: {
    left: 'footer-left-smartness-test',
    default: 'footer-default-smartness-test',
    right: 'footer-right-smartness-test',
    top: 'footer-top-smartness-test',
    bottom: 'footer-bottom-smartness-test'
  }
}
```

---

### Form
**Component**: `UForm`

**Slots**:
- `default` → Class: `form-default-smartness-test`

**app.config.ts Example**:
```typescript
form: {
  slots: {
    default: 'form-default-smartness-test'
  }
}
```

---

### FormField
**Component**: `UFormField`

**Slots**:
- `label` → Class: `form-field-label-smartness-test`
- `hint` → Class: `form-field-hint-smartness-test`
- `description` → Class: `form-field-description-smartness-test`
- `help` → Class: `form-field-help-smartness-test`
- `error` → Class: `form-field-error-smartness-test`
- `default` → Class: `form-field-default-smartness-test`

**app.config.ts Example**:
```typescript
formField: {
  slots: {
    label: 'form-field-label-smartness-test',
    hint: 'form-field-hint-smartness-test',
    description: 'form-field-description-smartness-test',
    help: 'form-field-help-smartness-test',
    error: 'form-field-error-smartness-test',
    default: 'form-field-default-smartness-test'
  }
}
```

---

### Header
**Component**: `UHeader`

**Slots**:
- `title` → Class: `header-title-smartness-test`
- `left` → Class: `header-left-smartness-test`
- `default` → Class: `header-default-smartness-test`
- `right` → Class: `header-right-smartness-test`
- `toggle` → Class: `header-toggle-smartness-test`
- `top` → Class: `header-top-smartness-test`
- `bottom` → Class: `header-bottom-smartness-test`
- `body` → Class: `header-body-smartness-test`
- `content` → Class: `header-content-smartness-test`

**app.config.ts Example**:
```typescript
header: {
  slots: {
    title: 'header-title-smartness-test',
    left: 'header-left-smartness-test',
    default: 'header-default-smartness-test',
    right: 'header-right-smartness-test',
    toggle: 'header-toggle-smartness-test',
    top: 'header-top-smartness-test',
    bottom: 'header-bottom-smartness-test',
    body: 'header-body-smartness-test',
    content: 'header-content-smartness-test'
  }
}
```

---

### Icon
**Component**: `UIcon`

**Slots**: _No slots available for this component_

---

### Input
**Component**: `UInput`

**Slots**:
- `leading` → Class: `input-leading-smartness-test`
- `default` → Class: `input-default-smartness-test`
- `trailing` → Class: `input-trailing-smartness-test`

**app.config.ts Example**:
```typescript
input: {
  slots: {
    leading: 'input-leading-smartness-test',
    default: 'input-default-smartness-test',
    trailing: 'input-trailing-smartness-test'
  }
}
```

---

### InputTags
**Component**: `UInputTags`

**Slots**:
- `leading` → Class: `input-tags-leading-smartness-test`
- `default` → Class: `input-tags-default-smartness-test`
- `trailing` → Class: `input-tags-trailing-smartness-test`
- `item-text` → Class: `input-tags-item-text-smartness-test`
- `item-delete` → Class: `input-tags-item-delete-smartness-test`

**app.config.ts Example**:
```typescript
inputTags: {
  slots: {
    leading: 'input-tags-leading-smartness-test',
    default: 'input-tags-default-smartness-test',
    trailing: 'input-tags-trailing-smartness-test',
    'item-text': 'input-tags-item-text-smartness-test',
    'item-delete': 'input-tags-item-delete-smartness-test'
  }
}
```

---

### Kbd
**Component**: `UKbd`

**Slots**:
- `default` → Class: `kbd-default-smartness-test`

**app.config.ts Example**:
```typescript
kbd: {
  slots: {
    default: 'kbd-default-smartness-test'
  }
}
```

---

### Link
**Component**: `ULink`

**Slots**:
- `default` → Class: `link-default-smartness-test`

**app.config.ts Example**:
```typescript
link: {
  slots: {
    default: 'link-default-smartness-test'
  }
}
```

---

### LocaleSelect
**Component**: `ULocaleSelect`

**Slots**: _No slots available for this component_

---

### Main
**Component**: `UMain`

**Slots**:
- `default` → Class: `main-default-smartness-test`

**app.config.ts Example**:
```typescript
main: {
  slots: {
    default: 'main-default-smartness-test'
  }
}
```

---

### Marquee
**Component**: `UMarquee`

**Slots**:
- `default` → Class: `marquee-default-smartness-test`

**app.config.ts Example**:
```typescript
marquee: {
  slots: {
    default: 'marquee-default-smartness-test'
  }
}
```

---

### Modal
**Component**: `UModal`

**Slots**:
- `default` → Class: `modal-default-smartness-test`
- `content` → Class: `modal-content-smartness-test`
- `header` → Class: `modal-header-smartness-test`
- `title` → Class: `modal-title-smartness-test`
- `description` → Class: `modal-description-smartness-test`
- `actions` → Class: `modal-actions-smartness-test`
- `close` → Class: `modal-close-smartness-test`
- `body` → Class: `modal-body-smartness-test`
- `footer` → Class: `modal-footer-smartness-test`

**app.config.ts Example**:
```typescript
modal: {
  slots: {
    default: 'modal-default-smartness-test',
    content: 'modal-content-smartness-test',
    header: 'modal-header-smartness-test',
    title: 'modal-title-smartness-test',
    description: 'modal-description-smartness-test',
    actions: 'modal-actions-smartness-test',
    close: 'modal-close-smartness-test',
    body: 'modal-body-smartness-test',
    footer: 'modal-footer-smartness-test'
  }
}
```

---

### Popover
**Component**: `UPopover`

**Slots**:
- `default` → Class: `popover-default-smartness-test`
- `content` → Class: `popover-content-smartness-test`
- `anchor` → Class: `popover-anchor-smartness-test`

**app.config.ts Example**:
```typescript
popover: {
  slots: {
    default: 'popover-default-smartness-test',
    content: 'popover-content-smartness-test',
    anchor: 'popover-anchor-smartness-test'
  }
}
```

---

### Progress
**Component**: `UProgress`

**Slots**:
- `status` → Class: `progress-status-smartness-test`

**app.config.ts Example**:
```typescript
progress: {
	slots: {
		status: "progress-status-smartness-test";
	}
}
```

---

### Separator
**Component**: `USeparator`

**Slots**:
- `default` → Class: `separator-default-smartness-test`

**app.config.ts Example**:
```typescript
separator: {
  slots: {
    default: 'separator-default-smartness-test'
  }
}
```

---

### Skeleton
**Component**: `USkeleton`

**Slots**:
- `default` → Class: `skeleton-default-smartness-test`

**app.config.ts Example**:
```typescript
skeleton: {
  slots: {
    default: 'skeleton-default-smartness-test'
  }
}
```

---

### Pagination
**Component**: `UPagination`

**Slots**:
- `first` → `pagination-first-smartness-test`
- `prev` → `pagination-prev-smartness-test`
- `next` → `pagination-next-smartness-test`
- `last` → `pagination-last-smartness-test`
- `ellipsis` → `pagination-ellipsis-smartness-test`
- `item` → `pagination-item-smartness-test`

**Configuration**:
```typescript
pagination: {
  slots: {
    first: 'pagination-first-smartness-test',
    prev: 'pagination-prev-smartness-test',
    next: 'pagination-next-smartness-test',
    last: 'pagination-last-smartness-test',
    ellipsis: 'pagination-ellipsis-smartness-test',
    item: 'pagination-item-smartness-test'
  }
}
```

---

### Stepper
**Component**: `UStepper`

**Slots**:
- `indicator` → `stepper-indicator-smartness-test`
- `title` → `stepper-title-smartness-test`
- `description` → `stepper-description-smartness-test`
- `content` → `stepper-content-smartness-test`

**Configuration**:
```typescript
stepper: {
  slots: {
    indicator: 'stepper-indicator-smartness-test',
    title: 'stepper-title-smartness-test',
    description: 'stepper-description-smartness-test',
    content: 'stepper-content-smartness-test'
  }
}
```

---

### Textarea
**Component**: `UTextarea`

**Slots**:
- `leading` → `textarea-leading-smartness-test`
- `default` → `textarea-default-smartness-test`
- `trailing` → `textarea-trailing-smartness-test`

**Configuration**:
```typescript
textarea: {
  slots: {
    leading: 'textarea-leading-smartness-test',
    default: 'textarea-default-smartness-test',
    trailing: 'textarea-trailing-smartness-test'
  }
}
```

---

### Toast
**Component**: `UToast`

**Slots**:
- `leading` → `toast-leading-smartness-test`
- `title` → `toast-title-smartness-test`
- `description` → `toast-description-smartness-test`
- `actions` → `toast-actions-smartness-test`
- `close` → `toast-close-smartness-test`

**Configuration**:
```typescript
toast: {
  slots: {
    leading: 'toast-leading-smartness-test',
    title: 'toast-title-smartness-test',
    description: 'toast-description-smartness-test',
    actions: 'toast-actions-smartness-test',
    close: 'toast-close-smartness-test'
  }
}
```

---

### Tooltip
**Component**: `UTooltip`

**Slots**:
- `default` → `tooltip-default-smartness-test`
- `content` → `tooltip-content-smartness-test`

**Configuration**:
```typescript
tooltip: {
  slots: {
    default: 'tooltip-default-smartness-test',
    content: 'tooltip-content-smartness-test'
  }
}
```

---

### Slideover
**Component**: `USlideover`

**Slots**:
- `default` → `slideover-default-smartness-test`
- `content` → `slideover-content-smartness-test`
- `header` → `slideover-header-smartness-test`
- `title` → `slideover-title-smartness-test`
- `description` → `slideover-description-smartness-test`
- `actions` → `slideover-actions-smartness-test`
- `close` → `slideover-close-smartness-test`
- `body` → `slideover-body-smartness-test`
- `footer` → `slideover-footer-smartness-test`

**Configuration**:
```typescript
slideover: {
  slots: {
    default: 'slideover-default-smartness-test',
    content: 'slideover-content-smartness-test',
    header: 'slideover-header-smartness-test',
    title: 'slideover-title-smartness-test',
    description: 'slideover-description-smartness-test',
    actions: 'slideover-actions-smartness-test',
    close: 'slideover-close-smartness-test',
    body: 'slideover-body-smartness-test',
    footer: 'slideover-footer-smartness-test'
  }
}
```

---

### Switch
**Component**: `USwitch`

**Slots**:
- `label` → `switch-label-smartness-test`
- `description` → `switch-description-smartness-test`

**Configuration**:
```typescript
switch: {
  slots: {
    label: 'switch-label-smartness-test',
    description: 'switch-description-smartness-test'
  }
}
```

---

### User
**Component**: `UUser`

**Slots**:
- `avatar` → `user-avatar-smartness-test`
- `name` → `user-name-smartness-test`
- `description` → `user-description-smartness-test`
- `default` → `user-default-smartness-test`

**Configuration**:
```typescript
user: {
  slots: {
    avatar: 'user-avatar-smartness-test',
    name: 'user-name-smartness-test',
    description: 'user-description-smartness-test',
    default: 'user-default-smartness-test'
  }
}
```

---

### Timeline
**Component**: `UTimeline`

**Slots**:
- `indicator` → `timeline-indicator-smartness-test`
- `date` → `timeline-date-smartness-test`
- `title` → `timeline-title-smartness-test`
- `description` → `timeline-description-smartness-test`

**Configuration**:
```typescript
timeline: {
  slots: {
    indicator: 'timeline-indicator-smartness-test',
    date: 'timeline-date-smartness-test',
    title: 'timeline-title-smartness-test',
    description: 'timeline-description-smartness-test'
  }
}
```

---

### Radio Group
**Component**: `URadioGroup`

**Slots**:
- `legend` → `radio-group-legend-smartness-test`
- `label` → `radio-group-label-smartness-test`
- `description` → `radio-group-description-smartness-test`

**Configuration**:
```typescript
radioGroup: {
  slots: {
    legend: 'radio-group-legend-smartness-test',
    label: 'radio-group-label-smartness-test',
    description: 'radio-group-description-smartness-test'
  }
}
```

---

### ChangelogVersions
**Component**: `UChangelogVersions`

**Slots**:
- `default` → Class: `changelog-versions-default-smartness-test`
- `indicator` → Class: `changelog-versions-indicator-smartness-test`
- `header` → Class: `changelog-versions-header-smartness-test`
- `badge` → Class: `changelog-versions-badge-smartness-test`
- `date` → Class: `changelog-versions-date-smartness-test`
- `title` → Class: `changelog-versions-title-smartness-test`
- `description` → Class: `changelog-versions-description-smartness-test`
- `image` → Class: `changelog-versions-image-smartness-test`
- `body` → Class: `changelog-versions-body-smartness-test`
- `footer` → Class: `changelog-versions-footer-smartness-test`
- `authors` → Class: `changelog-versions-authors-smartness-test`
- `actions` → Class: `changelog-versions-actions-smartness-test`

**app.config.ts Example**:
```typescript
changelogVersions: {
  slots: {
    default: 'changelog-versions-default-smartness-test',
    indicator: 'changelog-versions-indicator-smartness-test',
    header: 'changelog-versions-header-smartness-test',
    badge: 'changelog-versions-badge-smartness-test',
    date: 'changelog-versions-date-smartness-test',
    title: 'changelog-versions-title-smartness-test',
    description: 'changelog-versions-description-smartness-test',
    image: 'changelog-versions-image-smartness-test',
    body: 'changelog-versions-body-smartness-test',
    footer: 'changelog-versions-footer-smartness-test',
    authors: 'changelog-versions-authors-smartness-test',
    actions: 'changelog-versions-actions-smartness-test'
  }
}
```

---

### ChatMessage
**Component**: `UChatMessage`

**Slots**:
- `leading` → Class: `chat-message-leading-smartness-test`
- `content` → Class: `chat-message-content-smartness-test`
- `actions` → Class: `chat-message-actions-smartness-test`

**app.config.ts Example**:
```typescript
chatMessage: {
  slots: {
    leading: 'chat-message-leading-smartness-test',
    content: 'chat-message-content-smartness-test',
    actions: 'chat-message-actions-smartness-test'
  }
}
```

---

### InputMenu
**Component**: `UInputMenu`

**Slots**:
- `leading` → Class: `input-menu-leading-smartness-test`
- `trailing` → Class: `input-menu-trailing-smartness-test`
- `empty` → Class: `input-menu-empty-smartness-test`
- `item` → Class: `input-menu-item-smartness-test`
- `item-leading` → Class: `input-menu-item-leading-smartness-test`
- `item-label` → Class: `input-menu-item-label-smartness-test`
- `item-trailing` → Class: `input-menu-item-trailing-smartness-test`
- `tags-item-text` → Class: `input-menu-tags-item-text-smartness-test`
- `tags-item-delete` → Class: `input-menu-tags-item-delete-smartness-test`
- `content-top` → Class: `input-menu-content-top-smartness-test`
- `content-bottom` → Class: `input-menu-content-bottom-smartness-test`
- `create-item-label` → Class: `input-menu-create-item-label-smartness-test`

**app.config.ts Example**:
```typescript
inputMenu: {
  slots: {
    leading: 'input-menu-leading-smartness-test',
    trailing: 'input-menu-trailing-smartness-test',
    empty: 'input-menu-empty-smartness-test',
    item: 'input-menu-item-smartness-test',
    'item-leading': 'input-menu-item-leading-smartness-test',
    'item-label': 'input-menu-item-label-smartness-test',
    'item-trailing': 'input-menu-item-trailing-smartness-test',
    'tags-item-text': 'input-menu-tags-item-text-smartness-test',
    'tags-item-delete': 'input-menu-tags-item-delete-smartness-test',
    'content-top': 'input-menu-content-top-smartness-test',
    'content-bottom': 'input-menu-content-bottom-smartness-test',
    'create-item-label': 'input-menu-create-item-label-smartness-test'
  }
}
```

---

### InputNumber
**Component**: `UInputNumber`

**Slots**:
- `increment` → Class: `input-number-increment-smartness-test`
- `decrement` → Class: `input-number-decrement-smartness-test`

**app.config.ts Example**:
```typescript
inputNumber: {
  slots: {
    increment: 'input-number-increment-smartness-test',
    decrement: 'input-number-decrement-smartness-test'
  }
}
```

---

### PinInput
**Component**: `UPinInput`

**Slots**: _No slots available_

---

### Select
**Component**: `USelect`

**Slots**:
- `leading` → Class: `select-leading-smartness-test`
- `default` → Class: `select-default-smartness-test`
- `trailing` → Class: `select-trailing-smartness-test`
- `item` → Class: `select-item-smartness-test`
- `item-leading` → Class: `select-item-leading-smartness-test`
- `item-label` → Class: `select-item-label-smartness-test`
- `item-trailing` → Class: `select-item-trailing-smartness-test`
- `content-top` → Class: `select-content-top-smartness-test`
- `content-bottom` → Class: `select-content-bottom-smartness-test`

**app.config.ts Example**:
```typescript
select: {
  slots: {
    leading: 'select-leading-smartness-test',
    default: 'select-default-smartness-test',
    trailing: 'select-trailing-smartness-test',
    item: 'select-item-smartness-test',
    'item-leading': 'select-item-leading-smartness-test',
    'item-label': 'select-item-label-smartness-test',
    'item-trailing': 'select-item-trailing-smartness-test',
    'content-top': 'select-content-top-smartness-test',
    'content-bottom': 'select-content-bottom-smartness-test'
  }
}
```

---

### SelectMenu
**Component**: `USelectMenu`

**Slots**:
- `leading` → Class: `select-menu-leading-smartness-test`
- `default` → Class: `select-menu-default-smartness-test`
- `trailing` → Class: `select-menu-trailing-smartness-test`
- `empty` → Class: `select-menu-empty-smartness-test`
- `item` → Class: `select-menu-item-smartness-test`
- `item-leading` → Class: `select-menu-item-leading-smartness-test`
- `item-label` → Class: `select-menu-item-label-smartness-test`
- `item-trailing` → Class: `select-menu-item-trailing-smartness-test`
- `content-top` → Class: `select-menu-content-top-smartness-test`
- `content-bottom` → Class: `select-menu-content-bottom-smartness-test`
- `create-item-label` → Class: `select-menu-create-item-label-smartness-test`

**app.config.ts Example**:
```typescript
selectMenu: {
  slots: {
    leading: 'select-menu-leading-smartness-test',
    default: 'select-menu-default-smartness-test',
    trailing: 'select-menu-trailing-smartness-test',
    empty: 'select-menu-empty-smartness-test',
    item: 'select-menu-item-smartness-test',
    'item-leading': 'select-menu-item-leading-smartness-test',
    'item-label': 'select-menu-item-label-smartness-test',
    'item-trailing': 'select-menu-item-trailing-smartness-test',
    'content-top': 'select-menu-content-top-smartness-test',
    'content-bottom': 'select-menu-content-bottom-smartness-test',
    'create-item-label': 'select-menu-create-item-label-smartness-test'
  }
}
```

---

### Slider
**Component**: `USlider`

**Slots**: _No slots available_

---

### ContentNavigation

**Component**: `UContentNavigation`

**Slots**:
- `link` → Class: `content-navigation-link-smartness-test`
- `link-leading` → Class: `content-navigation-link-leading-smartness-test`
- `link-title` → Class: `content-navigation-link-title-smartness-test`
- `link-trailing` → Class: `content-navigation-link-trailing-smartness-test`

**app.config.ts Example**:
```typescript
contentNavigation: {
  slots: {
    link: 'content-navigation-link-smartness-test',
    'link-leading': 'content-navigation-link-leading-smartness-test',
    'link-title': 'content-navigation-link-title-smartness-test',
    'link-trailing': 'content-navigation-link-trailing-smartness-test'
  }
}
```

---

## Remaining Components (Placeholder)

The following components need their slot information verified from the GitHub source:

### Content Components

### ContentSearch

**Component**: `UContentSearch`

**Slots**:
- `empty` → Class: `content-search-empty-smartness-test`
- `footer` → Class: `content-search-footer-smartness-test`
- `back` → Class: `content-search-back-smartness-test`
- `close` → Class: `content-search-close-smartness-test`
- `item` → Class: `content-search-item-smartness-test`
- `item-leading` → Class: `content-search-item-leading-smartness-test`
- `item-label` → Class: `content-search-item-label-smartness-test`
- `item-trailing` → Class: `content-search-item-trailing-smartness-test`
- `content` → Class: `content-search-content-smartness-test`

**app.config.ts Example**:
```typescript
contentSearch: {
  slots: {
    empty: 'content-search-empty-smartness-test',
    footer: 'content-search-footer-smartness-test',
    back: 'content-search-back-smartness-test',
    close: 'content-search-close-smartness-test',
    item: 'content-search-item-smartness-test',
    'item-leading': 'content-search-item-leading-smartness-test',
    'item-label': 'content-search-item-label-smartness-test',
    'item-trailing': 'content-search-item-trailing-smartness-test',
    content: 'content-search-content-smartness-test'
  }
}
```

---

### ContentSearchButton

**Component**: `UContentSearchButton`

**Slots**:
- `leading` → Class: `content-search-button-leading-smartness-test`
- `default` → Class: `content-search-button-default-smartness-test`
- `trailing` → Class: `content-search-button-trailing-smartness-test`

**app.config.ts Example**:
```typescript
contentSearchButton: {
  slots: {
    leading: 'content-search-button-leading-smartness-test',
    default: 'content-search-button-default-smartness-test',
    trailing: 'content-search-button-trailing-smartness-test'
  }
}
```

---

### ContentSurround

**Component**: `UContentSurround`

**Slots**:
- `link` → Class: `content-surround-link-smartness-test`
- `link-leading` → Class: `content-surround-link-leading-smartness-test`
- `link-title` → Class: `content-surround-link-title-smartness-test`
- `link-description` → Class: `content-surround-link-description-smartness-test`

**app.config.ts Example**:
```typescript
contentSurround: {
  slots: {
    link: 'content-surround-link-smartness-test',
    'link-leading': 'content-surround-link-leading-smartness-test',
    'link-title': 'content-surround-link-title-smartness-test',
    'link-description': 'content-surround-link-description-smartness-test'
  }
}
```

---

### ContentToc

**Component**: `UContentToc`

**Slots**:
- `leading` → Class: `content-toc-leading-smartness-test`
- `default` → Class: `content-toc-default-smartness-test`
- `trailing` → Class: `content-toc-trailing-smartness-test`
- `content` → Class: `content-toc-content-smartness-test`
- `link` → Class: `content-toc-link-smartness-test`
- `top` → Class: `content-toc-top-smartness-test`
- `bottom` → Class: `content-toc-bottom-smartness-test`

**app.config.ts Example**:
```typescript
contentToc: {
  slots: {
    leading: 'content-toc-leading-smartness-test',
    default: 'content-toc-default-smartness-test',
    trailing: 'content-toc-trailing-smartness-test',
    content: 'content-toc-content-smartness-test',
    link: 'content-toc-link-smartness-test',
    top: 'content-toc-top-smartness-test',
    bottom: 'content-toc-bottom-smartness-test'
  }
}
```

---

### ContextMenu

**Component**: `UContextMenu`

**Slots**:
- `default` → Class: `context-menu-default-smartness-test`
- `item` → Class: `context-menu-item-smartness-test`
- `item-leading` → Class: `context-menu-item-leading-smartness-test`
- `item-label` → Class: `context-menu-item-label-smartness-test`
- `item-trailing` → Class: `context-menu-item-trailing-smartness-test`
- `content-top` → Class: `context-menu-content-top-smartness-test`
- `content-bottom` → Class: `context-menu-content-bottom-smartness-test`

**app.config.ts Example**:
```typescript
contextMenu: {
  slots: {
    default: 'context-menu-default-smartness-test',
    item: 'context-menu-item-smartness-test',
    'item-leading': 'context-menu-item-leading-smartness-test',
    'item-label': 'context-menu-item-label-smartness-test',
    'item-trailing': 'context-menu-item-trailing-smartness-test',
    'content-top': 'context-menu-content-top-smartness-test',
    'content-bottom': 'context-menu-content-bottom-smartness-test'
  }
}
```

---

### DropdownMenu

**Component**: `UDropdownMenu`

**Slots**:
- `default` → Class: `dropdown-menu-default-smartness-test`
- `item` → Class: `dropdown-menu-item-smartness-test`
- `item-leading` → Class: `dropdown-menu-item-leading-smartness-test`
- `item-label` → Class: `dropdown-menu-item-label-smartness-test`
- `item-trailing` → Class: `dropdown-menu-item-trailing-smartness-test`
- `content-top` → Class: `dropdown-menu-content-top-smartness-test`
- `content-bottom` → Class: `dropdown-menu-content-bottom-smartness-test`

**app.config.ts Example**:
```typescript
dropdownMenu: {
  slots: {
    default: 'dropdown-menu-default-smartness-test',
    item: 'dropdown-menu-item-smartness-test',
    'item-leading': 'dropdown-menu-item-leading-smartness-test',
    'item-label': 'dropdown-menu-item-label-smartness-test',
    'item-trailing': 'dropdown-menu-item-trailing-smartness-test',
    'content-top': 'dropdown-menu-content-top-smartness-test',
    'content-bottom': 'dropdown-menu-content-bottom-smartness-test'
  }
}
```

---

### FooterColumns

**Component**: `UFooterColumns`

**Slots**:
- `left` → Class: `footer-columns-left-smartness-test`
- `default` → Class: `footer-columns-default-smartness-test`
- `right` → Class: `footer-columns-right-smartness-test`
- `column-label` → Class: `footer-columns-column-label-smartness-test`
- `link` → Class: `footer-columns-link-smartness-test`
- `link-leading` → Class: `footer-columns-link-leading-smartness-test`
- `link-label` → Class: `footer-columns-link-label-smartness-test`
- `link-trailing` → Class: `footer-columns-link-trailing-smartness-test`

**app.config.ts Example**:
```typescript
footerColumns: {
  slots: {
    left: 'footer-columns-left-smartness-test',
    default: 'footer-columns-default-smartness-test',
    right: 'footer-columns-right-smartness-test',
    'column-label': 'footer-columns-column-label-smartness-test',
    link: 'footer-columns-link-smartness-test',
    'link-leading': 'footer-columns-link-leading-smartness-test',
    'link-label': 'footer-columns-link-label-smartness-test',
    'link-trailing': 'footer-columns-link-trailing-smartness-test'
  }
}
```

---

### NavigationMenu

**Component**: `UNavigationMenu`

**Slots**:
- `item` → Class: `navigation-menu-item-smartness-test`
- `item-leading` → Class: `navigation-menu-item-leading-smartness-test`
- `item-label` → Class: `navigation-menu-item-label-smartness-test`
- `item-trailing` → Class: `navigation-menu-item-trailing-smartness-test`
- `item-content` → Class: `navigation-menu-item-content-smartness-test`
- `list-leading` → Class: `navigation-menu-list-leading-smartness-test`
- `list-trailing` → Class: `navigation-menu-list-trailing-smartness-test`

**app.config.ts Example**:
```typescript
navigationMenu: {
  slots: {
    item: 'navigation-menu-item-smartness-test',
    'item-leading': 'navigation-menu-item-leading-smartness-test',
    'item-label': 'navigation-menu-item-label-smartness-test',
    'item-trailing': 'navigation-menu-item-trailing-smartness-test',
    'item-content': 'navigation-menu-item-content-smartness-test',
    'list-leading': 'navigation-menu-list-leading-smartness-test',
    'list-trailing': 'navigation-menu-list-trailing-smartness-test'
  }
}
```

---

### Tabs

**Component**: `UTabs`

**Slots**:
- `leading` → Class: `tabs-leading-smartness-test`
- `default` → Class: `tabs-default-smartness-test`
- `trailing` → Class: `tabs-trailing-smartness-test`
- `content` → Class: `tabs-content-smartness-test`
- `list-leading` → Class: `tabs-list-leading-smartness-test`
- `list-trailing` → Class: `tabs-list-trailing-smartness-test`

**app.config.ts Example**:
```typescript
tabs: {
  slots: {
    leading: 'tabs-leading-smartness-test',
    default: 'tabs-default-smartness-test',
    trailing: 'tabs-trailing-smartness-test',
    content: 'tabs-content-smartness-test',
    'list-leading': 'tabs-list-leading-smartness-test',
    'list-trailing': 'tabs-list-trailing-smartness-test'
  }
}
```

---

### Navigation Components
- **DropdownMenu** - Check: https://github.com/nuxt/ui/blob/v4/src/theme/dropdownMenu.ts
- **FooterColumns** - Check: https://github.com/nuxt/ui/blob/v4/src/theme/footerColumns.ts
- **NavigationMenu** - Check: https://github.com/nuxt/ui/blob/v4/src/theme/navigationMenu.ts
- **Tabs** - Check: https://github.com/nuxt/ui/blob/v4/src/theme/tabs.ts

### Dashboard Components

### DashboardGroup

**Component**: `UDashboardGroup`

**Slots**:
- `default` → Class: `dashboard-group-default-smartness-test`

**app.config.ts Example**:
```typescript
dashboardGroup: {
  slots: {
    default: 'dashboard-group-default-smartness-test'
  }
}
```

---

### DashboardNavbar

**Component**: `UDashboardNavbar`

**Slots**:
- `title` → Class: `dashboard-navbar-title-smartness-test`
- `leading` → Class: `dashboard-navbar-leading-smartness-test`
- `trailing` → Class: `dashboard-navbar-trailing-smartness-test`
- `left` → Class: `dashboard-navbar-left-smartness-test`
- `default` → Class: `dashboard-navbar-default-smartness-test`
- `right` → Class: `dashboard-navbar-right-smartness-test`
- `toggle` → Class: `dashboard-navbar-toggle-smartness-test`

**app.config.ts Example**:
```typescript
dashboardNavbar: {
  slots: {
    title: 'dashboard-navbar-title-smartness-test',
    leading: 'dashboard-navbar-leading-smartness-test',
    trailing: 'dashboard-navbar-trailing-smartness-test',
    left: 'dashboard-navbar-left-smartness-test',
    default: 'dashboard-navbar-default-smartness-test',
    right: 'dashboard-navbar-right-smartness-test',
    toggle: 'dashboard-navbar-toggle-smartness-test'
  }
}
```

---

### DashboardPanel

**Component**: `UDashboardPanel`

**Slots**:
- `default` → Class: `dashboard-panel-default-smartness-test`
- `header` → Class: `dashboard-panel-header-smartness-test`
- `body` → Class: `dashboard-panel-body-smartness-test`
- `footer` → Class: `dashboard-panel-footer-smartness-test`
- `resize-handle` → Class: `dashboard-panel-resize-handle-smartness-test`

**app.config.ts Example**:
```typescript
dashboardPanel: {
  slots: {
    default: 'dashboard-panel-default-smartness-test',
    header: 'dashboard-panel-header-smartness-test',
    body: 'dashboard-panel-body-smartness-test',
    footer: 'dashboard-panel-footer-smartness-test',
    'resize-handle': 'dashboard-panel-resize-handle-smartness-test'
  }
}
```

---

### DashboardResizeHandle

**Component**: `UDashboardResizeHandle`

**Slots**:
- `default` → Class: `dashboard-resize-handle-default-smartness-test`

**app.config.ts Example**:
```typescript
dashboardResizeHandle: {
  slots: {
    default: 'dashboard-resize-handle-default-smartness-test'
  }
}
```

---

### DashboardSearch

**Component**: `UDashboardSearch`

**Slots**:
- `empty` → Class: `dashboard-search-empty-smartness-test`
- `footer` → Class: `dashboard-search-footer-smartness-test`
- `back` → Class: `dashboard-search-back-smartness-test`
- `close` → Class: `dashboard-search-close-smartness-test`
- `item` → Class: `dashboard-search-item-smartness-test`
- `item-leading` → Class: `dashboard-search-item-leading-smartness-test`
- `item-label` → Class: `dashboard-search-item-label-smartness-test`
- `item-trailing` → Class: `dashboard-search-item-trailing-smartness-test`
- `content` → Class: `dashboard-search-content-smartness-test`

**app.config.ts Example**:
```typescript
dashboardSearch: {
  slots: {
    empty: 'dashboard-search-empty-smartness-test',
    footer: 'dashboard-search-footer-smartness-test',
    back: 'dashboard-search-back-smartness-test',
    close: 'dashboard-search-close-smartness-test',
    item: 'dashboard-search-item-smartness-test',
    'item-leading': 'dashboard-search-item-leading-smartness-test',
    'item-label': 'dashboard-search-item-label-smartness-test',
    'item-trailing': 'dashboard-search-item-trailing-smartness-test',
    content: 'dashboard-search-content-smartness-test'
  }
}
```

---

### DashboardSearchButton

**Component**: `UDashboardSearchButton`

**Slots**:
- `leading` → Class: `dashboard-search-button-leading-smartness-test`
- `default` → Class: `dashboard-search-button-default-smartness-test`
- `trailing` → Class: `dashboard-search-button-trailing-smartness-test`

**app.config.ts Example**:
```typescript
dashboardSearchButton: {
  slots: {
    leading: 'dashboard-search-button-leading-smartness-test',
    default: 'dashboard-search-button-default-smartness-test',
    trailing: 'dashboard-search-button-trailing-smartness-test'
  }
}
```

---

### DashboardSidebar

**Component**: `UDashboardSidebar`

**Slots**:
- `header` → Class: `dashboard-sidebar-header-smartness-test`
- `default` → Class: `dashboard-sidebar-default-smartness-test`
- `footer` → Class: `dashboard-sidebar-footer-smartness-test`
- `toggle` → Class: `dashboard-sidebar-toggle-smartness-test`
- `content` → Class: `dashboard-sidebar-content-smartness-test`
- `resize-handle` → Class: `dashboard-sidebar-resize-handle-smartness-test`

**app.config.ts Example**:
```typescript
dashboardSidebar: {
  slots: {
    header: 'dashboard-sidebar-header-smartness-test',
    default: 'dashboard-sidebar-default-smartness-test',
    footer: 'dashboard-sidebar-footer-smartness-test',
    toggle: 'dashboard-sidebar-toggle-smartness-test',
    content: 'dashboard-sidebar-content-smartness-test',
    'resize-handle': 'dashboard-sidebar-resize-handle-smartness-test'
  }
}
```

---

### DashboardSidebarCollapse

**Component**: `UDashboardSidebarCollapse`

**Slots**: _None_ (Button component with no customizable slots)

---

### DashboardSidebarToggle

**Component**: `UDashboardSidebarToggle`

**Slots**: _None_ (Button component with no customizable slots)

---

### DashboardToolbar

**Component**: `UDashboardToolbar`

**Slots**:
- `default` → Class: `dashboard-toolbar-default-smartness-test`
- `left` → Class: `dashboard-toolbar-left-smartness-test`
- `right` → Class: `dashboard-toolbar-right-smartness-test`

**app.config.ts Example**:
```typescript
dashboardToolbar: {
  slots: {
    default: 'dashboard-toolbar-default-smartness-test',
    left: 'dashboard-toolbar-left-smartness-test',
    right: 'dashboard-toolbar-right-smartness-test'
  }
}
```

---

### Data Components

### Table

**Component**: `UTable`

**Slots**:
- `expanded` → Class: `table-expanded-smartness-test`
- `empty` → Class: `table-empty-smartness-test`
- `loading` → Class: `table-loading-smartness-test`
- `caption` → Class: `table-caption-smartness-test`
- `body-top` → Class: `table-body-top-smartness-test`
- `body-bottom` → Class: `table-body-bottom-smartness-test`

**app.config.ts Example**:
```typescript
table: {
  slots: {
    expanded: 'table-expanded-smartness-test',
    empty: 'table-empty-smartness-test',
    loading: 'table-loading-smartness-test',
    caption: 'table-caption-smartness-test',
    'body-top': 'table-body-top-smartness-test',
    'body-bottom': 'table-body-bottom-smartness-test'
  }
}
```

---

### Tree

**Component**: `UTree`

**Slots**:
- `item-wrapper` → Class: `tree-item-wrapper-smartness-test`
- `item` → Class: `tree-item-smartness-test`
- `item-leading` → Class: `tree-item-leading-smartness-test`
- `item-label` → Class: `tree-item-label-smartness-test`
- `item-trailing` → Class: `tree-item-trailing-smartness-test`

**app.config.ts Example**:
```typescript
tree: {
  slots: {
    'item-wrapper': 'tree-item-wrapper-smartness-test',
    item: 'tree-item-smartness-test',
    'item-leading': 'tree-item-leading-smartness-test',
    'item-label': 'tree-item-label-smartness-test',
    'item-trailing': 'tree-item-trailing-smartness-test'
  }
}
```

---

### Page Components

### Page

**Component**: `UPage`

**Slots**:
- `left` → Class: `page-left-smartness-test`
- `default` → Class: `page-default-smartness-test`
- `right` → Class: `page-right-smartness-test`

**app.config.ts Example**:
```typescript
page: {
  slots: {
    left: 'page-left-smartness-test',
    default: 'page-default-smartness-test',
    right: 'page-right-smartness-test'
  }
}
```

---

### PageAnchors

**Component**: `UPageAnchors`

**Slots**:
- `link` → Class: `page-anchors-link-smartness-test`
- `link-leading` → Class: `page-anchors-link-leading-smartness-test`
- `link-label` → Class: `page-anchors-link-label-smartness-test`
- `link-trailing` → Class: `page-anchors-link-trailing-smartness-test`

**app.config.ts Example**:
```typescript
pageAnchors: {
  slots: {
    link: 'page-anchors-link-smartness-test',
    'link-leading': 'page-anchors-link-leading-smartness-test',
    'link-label': 'page-anchors-link-label-smartness-test',
    'link-trailing': 'page-anchors-link-trailing-smartness-test'
  }
}
```

---

### PageAside

**Component**: `UPageAside`

**Slots**:
- `top` → Class: `page-aside-top-smartness-test`
- `default` → Class: `page-aside-default-smartness-test`
- `bottom` → Class: `page-aside-bottom-smartness-test`

**app.config.ts Example**:
```typescript
pageAside: {
  slots: {
    top: 'page-aside-top-smartness-test',
    default: 'page-aside-default-smartness-test',
    bottom: 'page-aside-bottom-smartness-test'
  }
}
```

---

### PageBody

**Component**: `UPageBody`

**Slots**:
- `default` → Class: `page-body-default-smartness-test`

**app.config.ts Example**:
```typescript
pageBody: {
  slots: {
    default: 'page-body-default-smartness-test'
  }
}
```

---

### PageCard

**Component**: `UPageCard`

**Slots**:
- `header` → Class: `page-card-header-smartness-test`
- `body` → Class: `page-card-body-smartness-test`
- `leading` → Class: `page-card-leading-smartness-test`
- `title` → Class: `page-card-title-smartness-test`
- `description` → Class: `page-card-description-smartness-test`
- `footer` → Class: `page-card-footer-smartness-test`
- `default` → Class: `page-card-default-smartness-test`

**app.config.ts Example**:
```typescript
pageCard: {
  slots: {
    header: 'page-card-header-smartness-test',
    body: 'page-card-body-smartness-test',
    leading: 'page-card-leading-smartness-test',
    title: 'page-card-title-smartness-test',
    description: 'page-card-description-smartness-test',
    footer: 'page-card-footer-smartness-test',
    default: 'page-card-default-smartness-test'
  }
}
```

---

### PageColumns

**Component**: `UPageColumns`

**Slots**:
- `default` → Class: `page-columns-default-smartness-test`

**app.config.ts Example**:
```typescript
pageColumns: {
  slots: {
    default: 'page-columns-default-smartness-test'
  }
}
```

---

### PageCTA

**Component**: `UPageCTA`

**Slots**:
- `top` → Class: `page-cta-top-smartness-test`
- `header` → Class: `page-cta-header-smartness-test`
- `title` → Class: `page-cta-title-smartness-test`
- `description` → Class: `page-cta-description-smartness-test`
- `body` → Class: `page-cta-body-smartness-test`
- `footer` → Class: `page-cta-footer-smartness-test`
- `links` → Class: `page-cta-links-smartness-test`
- `default` → Class: `page-cta-default-smartness-test`
- `bottom` → Class: `page-cta-bottom-smartness-test`

**app.config.ts Example**:
```typescript
pageCta: {
  slots: {
    top: 'page-cta-top-smartness-test',
    header: 'page-cta-header-smartness-test',
    title: 'page-cta-title-smartness-test',
    description: 'page-cta-description-smartness-test',
    body: 'page-cta-body-smartness-test',
    footer: 'page-cta-footer-smartness-test',
    links: 'page-cta-links-smartness-test',
    default: 'page-cta-default-smartness-test',
    bottom: 'page-cta-bottom-smartness-test'
  }
}
```

---

### PageFeature

**Component**: `UPageFeature`

**Slots**:
- `leading` → Class: `page-feature-leading-smartness-test`
- `title` → Class: `page-feature-title-smartness-test`
- `description` → Class: `page-feature-description-smartness-test`
- `default` → Class: `page-feature-default-smartness-test`

**app.config.ts Example**:
```typescript
pageFeature: {
  slots: {
    leading: 'page-feature-leading-smartness-test',
    title: 'page-feature-title-smartness-test',
    description: 'page-feature-description-smartness-test',
    default: 'page-feature-default-smartness-test'
  }
}
```

---

### PageGrid

**Component**: `UPageGrid`

**Slots**:
- `default` → Class: `page-grid-default-smartness-test`

**app.config.ts Example**:
```typescript
pageGrid: {
  slots: {
    default: 'page-grid-default-smartness-test'
  }
}
```

---

### PageHeader

**Component**: `UPageHeader`

**Slots**:
- `headline` → Class: `page-header-headline-smartness-test`
- `title` → Class: `page-header-title-smartness-test`
- `description` → Class: `page-header-description-smartness-test`
- `links` → Class: `page-header-links-smartness-test`
- `default` → Class: `page-header-default-smartness-test`

**app.config.ts Example**:
```typescript
pageHeader: {
  slots: {
    headline: 'page-header-headline-smartness-test',
    title: 'page-header-title-smartness-test',
    description: 'page-header-description-smartness-test',
    links: 'page-header-links-smartness-test',
    default: 'page-header-default-smartness-test'
  }
}
```

---

### PageHero

**Component**: `UPageHero`

**Slots**:
- `top` → Class: `page-hero-top-smartness-test`
- `header` → Class: `page-hero-header-smartness-test`
- `headline` → Class: `page-hero-headline-smartness-test`
- `title` → Class: `page-hero-title-smartness-test`
- `description` → Class: `page-hero-description-smartness-test`
- `body` → Class: `page-hero-body-smartness-test`
- `footer` → Class: `page-hero-footer-smartness-test`
- `links` → Class: `page-hero-links-smartness-test`
- `default` → Class: `page-hero-default-smartness-test`
- `bottom` → Class: `page-hero-bottom-smartness-test`

**app.config.ts Example**:
```typescript
pageHero: {
  slots: {
    top: 'page-hero-top-smartness-test',
    header: 'page-hero-header-smartness-test',
    headline: 'page-hero-headline-smartness-test',
    title: 'page-hero-title-smartness-test',
    description: 'page-hero-description-smartness-test',
    body: 'page-hero-body-smartness-test',
    footer: 'page-hero-footer-smartness-test',
    links: 'page-hero-links-smartness-test',
    default: 'page-hero-default-smartness-test',
    bottom: 'page-hero-bottom-smartness-test'
  }
}
```

---

### PageLinks

**Component**: `UPageLinks`

**Slots**:
- `title` → Class: `page-links-title-smartness-test`
- `link` → Class: `page-links-link-smartness-test`
- `link-leading` → Class: `page-links-link-leading-smartness-test`
- `link-label` → Class: `page-links-link-label-smartness-test`
- `link-trailing` → Class: `page-links-link-trailing-smartness-test`

**app.config.ts Example**:
```typescript
pageLinks: {
  slots: {
    title: 'page-links-title-smartness-test',
    link: 'page-links-link-smartness-test',
    'link-leading': 'page-links-link-leading-smartness-test',
    'link-label': 'page-links-link-label-smartness-test',
    'link-trailing': 'page-links-link-trailing-smartness-test'
  }
}
```

---

### PageList

**Component**: `UPageList`

**Slots**:
- `default` → Class: `page-list-default-smartness-test`

**app.config.ts Example**:
```typescript
pageList: {
  slots: {
    default: 'page-list-default-smartness-test'
  }
}
```

---

### PageLogos

**Component**: `UPageLogos`

**Slots**:
- `default` → Class: `page-logos-default-smartness-test`

**app.config.ts Example**:
```typescript
pageLogos: {
  slots: {
    default: 'page-logos-default-smartness-test'
  }
}
```

---

### PageSection

**Component**: `UPageSection`

**Slots**:
- `top` → Class: `page-section-top-smartness-test`
- `header` → Class: `page-section-header-smartness-test`
- `leading` → Class: `page-section-leading-smartness-test`
- `headline` → Class: `page-section-headline-smartness-test`
- `title` → Class: `page-section-title-smartness-test`
- `description` → Class: `page-section-description-smartness-test`
- `body` → Class: `page-section-body-smartness-test`
- `features` → Class: `page-section-features-smartness-test`
- `footer` → Class: `page-section-footer-smartness-test`
- `links` → Class: `page-section-links-smartness-test`
- `default` → Class: `page-section-default-smartness-test`
- `bottom` → Class: `page-section-bottom-smartness-test`

**app.config.ts Example**:
```typescript
pageSection: {
  slots: {
    top: 'page-section-top-smartness-test',
    header: 'page-section-header-smartness-test',
    leading: 'page-section-leading-smartness-test',
    headline: 'page-section-headline-smartness-test',
    title: 'page-section-title-smartness-test',
    description: 'page-section-description-smartness-test',
    body: 'page-section-body-smartness-test',
    features: 'page-section-features-smartness-test',
    footer: 'page-section-footer-smartness-test',
    links: 'page-section-links-smartness-test',
    default: 'page-section-default-smartness-test',
    bottom: 'page-section-bottom-smartness-test'
  }
}
```

---

### Pricing Components

### PricingPlan

**Component**: `UPricingPlan`

**Slots**:
- `badge` → Class: `pricing-plan-badge-smartness-test`
- `title` → Class: `pricing-plan-title-smartness-test`
- `description` → Class: `pricing-plan-description-smartness-test`
- `price` → Class: `pricing-plan-price-smartness-test`
- `discount` → Class: `pricing-plan-discount-smartness-test`
- `billing` → Class: `pricing-plan-billing-smartness-test`
- `features` → Class: `pricing-plan-features-smartness-test`
- `button` → Class: `pricing-plan-button-smartness-test`
- `header` → Class: `pricing-plan-header-smartness-test`
- `body` → Class: `pricing-plan-body-smartness-test`
- `footer` → Class: `pricing-plan-footer-smartness-test`
- `tagline` → Class: `pricing-plan-tagline-smartness-test`
- `terms` → Class: `pricing-plan-terms-smartness-test`

**app.config.ts Example**:
```typescript
pricingPlan: {
  slots: {
    badge: 'pricing-plan-badge-smartness-test',
    title: 'pricing-plan-title-smartness-test',
    description: 'pricing-plan-description-smartness-test',
    price: 'pricing-plan-price-smartness-test',
    discount: 'pricing-plan-discount-smartness-test',
    billing: 'pricing-plan-billing-smartness-test',
    features: 'pricing-plan-features-smartness-test',
    button: 'pricing-plan-button-smartness-test',
    header: 'pricing-plan-header-smartness-test',
    body: 'pricing-plan-body-smartness-test',
    footer: 'pricing-plan-footer-smartness-test',
    tagline: 'pricing-plan-tagline-smartness-test',
    terms: 'pricing-plan-terms-smartness-test'
  }
}
```

---

### PricingPlans

**Component**: `UPricingPlans`

**Slots**:
- `default` → Class: `pricing-plans-default-smartness-test`

**app.config.ts Example**:
```typescript
pricingPlans: {
  slots: {
    default: 'pricing-plans-default-smartness-test'
  }
}
```

---

## How to Find Slot Information

For components not yet documented, follow these steps:

1. **Visit the GitHub source**: https://github.com/nuxt/ui/tree/v4/src/theme
2. **Find the component file**: Navigate to the specific component's TypeScript file (e.g., `button.ts`)
3. **Look for `slots` definition**: Search for the `slots` key in the component's configuration
4. **Extract slot names**: The keys under `slots` are the available slot names

Example from `button.ts`:
```typescript
export default {
	slots: {
		base: "",
		label: "",
		leadingIcon: "",
		leadingAvatar: "",
		leadingAvatarSize: "",
		trailingIcon: ""
	}
};
```

5. **Apply the naming convention**: For each slot found, create a class name following the pattern: `[component]-[slot]-smartness-test`

---

## Complete app.config.ts Template

Here's a starting template for your `app.config.ts`:

```typescript
export default defineAppConfig({
	ui: {
		accordion: {
			slots: {
				leading: "accordion-leading-smartness-test",
				default: "accordion-default-smartness-test",
				trailing: "accordion-trailing-smartness-test",
				content: "accordion-content-smartness-test",
				body: "accordion-body-smartness-test"
			}
		},
		alert: {
			slots: {
				leading: "alert-leading-smartness-test",
				title: "alert-title-smartness-test",
				description: "alert-description-smartness-test",
				actions: "alert-actions-smartness-test",
				close: "alert-close-smartness-test"
			}
		}
		// Add more components following the same pattern...
	}
});
```

---

## Notes

1. **Verification Required**: Some components couldn't be fully documented due to API response size limits. Please verify these against the GitHub source.

2. **Dynamic Slots**: Some components may have dynamic slots or conditional slots based on props. Check the component documentation for specific behavior.

3. **Theme Integration**: These classes are applied through the `ui` prop system in NuxtUI. Make sure your configuration is properly merged with the default theme.

4. **Testing**: After applying these classes, test that they appear in your rendered HTML by inspecting the elements in your browser's dev tools.

5. **Updates**: As NuxtUI evolves, new slots may be added or existing ones modified. Always cross-reference with the official documentation and source code.

---

## Resources

- **NuxtUI Documentation**: https://ui.nuxt.com
- **NuxtUI GitHub Repository**: https://github.com/nuxt/ui
- **NuxtUI Theme Source**: https://github.com/nuxt/ui/tree/v4/src/theme
- **Component Metadata API**: Available through the Nuxt UI Remote MCP server

---

**Last Updated**: 2025-10-13
**NuxtUI Version**: v4
**Document Version**: 1.3.0
