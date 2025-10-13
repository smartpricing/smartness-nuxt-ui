export default defineAppConfig({
	ui: {
		colors: {
			primary: "petrol-blue",
			secondary: "sky",
			support: "warm-gray",
			burgundy: "burgundy",
			lemon: "lemon",
			info: "info",
			success: "success",
			warning: "warning",
			error: "error",
			offblack: "off-black"
		},
		// Testing classes for all components
		accordion: {
			slots: {
				root: "accordion-root-smartness-test",
				item: "accordion-item-smartness-test",
				trigger: "accordion-trigger-smartness-test",
				leadingIcon: "accordion-leading-icon-smartness-test",
				leadingAvatar: "accordion-leading-avatar-smartness-test",
				leadingAvatarSize: "accordion-leading-avatar-size-smartness-test",
				label: "accordion-label-smartness-test",
				trailingIcon: "accordion-trailing-icon-smartness-test",
				content: "accordion-content-smartness-test",
				body: "accordion-body-smartness-test"
			}
		},
		alert: {
			slots: {
				root: "alert-root-smartness-test",
				wrapper: "alert-wrapper-smartness-test",
				icon: "alert-icon-smartness-test",
				avatar: "alert-avatar-smartness-test",
				title: "alert-title-smartness-test",
				description: "alert-description-smartness-test",
				actions: "alert-actions-smartness-test",
				close: "alert-close-smartness-test"
			}
		},
		app: {
			slots: {
				root: "app-root-smartness-test"
			}
		},
		avatar: {
			slots: {
				root: "avatar-root-smartness-test",
				image: "avatar-image-smartness-test",
				fallback: "avatar-fallback-smartness-test",
				icon: "avatar-icon-smartness-test"
			}
		},
		avatarGroup: {
			slots: {
				root: "avatar-group-root-smartness-test",
				base: "avatar-group-base-smartness-test"
			}
		},
		badge: {
			slots: {
				base: "badge-base-smartness-test",
				label: "badge-label-smartness-test",
				leadingIcon: "badge-leading-icon-smartness-test",
				leadingAvatar: "badge-leading-avatar-smartness-test",
				leadingAvatarSize: "badge-leading-avatar-size-smartness-test",
				trailingIcon: "badge-trailing-icon-smartness-test"
			}
		},
		banner: {
			slots: {
				root: "banner-root-smartness-test",
				container: "banner-container-smartness-test",
				left: "banner-left-smartness-test",
				center: "banner-center-smartness-test",
				right: "banner-right-smartness-test",
				icon: "banner-icon-smartness-test",
				title: "banner-title-smartness-test",
				actions: "banner-actions-smartness-test",
				close: "banner-close-smartness-test"
			}
		},
		breadcrumb: {
			slots: {
				root: "breadcrumb-root-smartness-test",
				list: "breadcrumb-list-smartness-test",
				item: "breadcrumb-item-smartness-test",
				link: "breadcrumb-link-smartness-test",
				linkLeadingIcon: "breadcrumb-link-leading-icon-smartness-test",
				linkLeadingAvatar: "breadcrumb-link-leading-avatar-smartness-test",
				linkLeadingAvatarSize: "breadcrumb-link-leading-avatar-size-smartness-test",
				linkLabel: "breadcrumb-link-label-smartness-test",
				separator: "breadcrumb-separator-smartness-test",
				separatorIcon: "breadcrumb-separator-icon-smartness-test"
			}
		},
		blogPost: {
			slots: {
				root: "blog-post-root-smartness-test",
				header: "blog-post-header-smartness-test",
				body: "blog-post-body-smartness-test",
				footer: "blog-post-footer-smartness-test",
				image: "blog-post-image-smartness-test",
				title: "blog-post-title-smartness-test",
				description: "blog-post-description-smartness-test",
				authors: "blog-post-authors-smartness-test",
				avatar: "blog-post-avatar-smartness-test",
				meta: "blog-post-meta-smartness-test",
				date: "blog-post-date-smartness-test",
				badge: "blog-post-badge-smartness-test"
			}
		},
		blogPosts: {
			slots: {
				root: "blog-posts-root-smartness-test"
			}
		},
		button: {
			slots: {
				base: "cursor-pointer button-base-smartness-test",
				label: "button-label-smartness-test",
				leadingIcon: "button-leading-icon-smartness-test",
				trailingIcon: "button-trailing-icon-smartness-test"
			},
			compoundVariants: [
				{
					color: "secondary",
					variant: "solid",
					class: "text-secondary-900 bg-secondary-200"
				},
				{
					color: "ai",
					variant: "solid",
					class: "btn-ai"
				},
				{
					color: "learning",
					variant: "solid",
					class: "btn-learning"
				}
			]
		},
		card: {
			slots: {
				root: "card-root-smartness-test",
				header: "card-header-smartness-test",
				body: "card-body-smartness-test",
				footer: "card-footer-smartness-test"
			}
		},
		changelogVersion: {
			slots: {
				root: "changelog-version-root-smartness-test",
				container: "changelog-version-container-smartness-test",
				header: "changelog-version-header-smartness-test",
				meta: "changelog-version-meta-smartness-test",
				date: "changelog-version-date-smartness-test",
				badge: "changelog-version-badge-smartness-test",
				title: "changelog-version-title-smartness-test",
				description: "changelog-version-description-smartness-test",
				imageWrapper: "changelog-version-image-wrapper-smartness-test",
				image: "changelog-version-image-smartness-test",
				authors: "changelog-version-authors-smartness-test",
				footer: "changelog-version-footer-smartness-test",
				indicator: "changelog-version-indicator-smartness-test",
				dot: "changelog-version-dot-smartness-test",
				dotInner: "changelog-version-dot-inner-smartness-test"
			}
		},
		changelogVersions: {
			slots: {
				default: "changelog-versions-default-smartness-test",
				indicator: "changelog-versions-indicator-smartness-test",
				header: "changelog-versions-header-smartness-test",
				badge: "changelog-versions-badge-smartness-test",
				date: "changelog-versions-date-smartness-test",
				title: "changelog-versions-title-smartness-test",
				description: "changelog-versions-description-smartness-test",
				image: "changelog-versions-image-smartness-test",
				body: "changelog-versions-body-smartness-test",
				footer: "changelog-versions-footer-smartness-test",
				authors: "changelog-versions-authors-smartness-test",
				actions: "changelog-versions-actions-smartness-test"
			}
		},
		chatMessage: {
			slots: {
				leading: "chat-message-leading-smartness-test",
				content: "chat-message-content-smartness-test",
				actions: "chat-message-actions-smartness-test"
			}
		},
		chatMessages: {
			slots: {
				root: "chat-messages-root-smartness-test",
				indicator: "chat-messages-indicator-smartness-test",
				viewport: "chat-messages-viewport-smartness-test",
				autoScroll: "chat-messages-auto-scroll-smartness-test"
			}
		},
		chatPalette: {
			slots: {
				root: "chat-palette-root-smartness-test",
				prompt: "chat-palette-prompt-smartness-test",
				close: "chat-palette-close-smartness-test",
				content: "chat-palette-content-smartness-test"
			}
		},
		chatPrompt: {
			slots: {
				root: "chat-prompt-root-smartness-test",
				header: "chat-prompt-header-smartness-test",
				body: "chat-prompt-body-smartness-test",
				footer: "chat-prompt-footer-smartness-test",
				base: "chat-prompt-base-smartness-test",
				leading: "chat-prompt-leading-smartness-test",
				leadingIcon: "chat-prompt-leading-icon-smartness-test",
				leadingAvatar: "chat-prompt-leading-avatar-smartness-test",
				leadingAvatarSize: "chat-prompt-leading-avatar-size-smartness-test",
				trailing: "chat-prompt-trailing-smartness-test",
				trailingIcon: "chat-prompt-trailing-icon-smartness-test"
			}
		},
		chatPromptSubmit: {
			slots: {
				base: "chat-prompt-submit-base-smartness-test",
				label: "chat-prompt-submit-label-smartness-test",
				leadingIcon: "chat-prompt-submit-leading-icon-smartness-test",
				leadingAvatar: "chat-prompt-submit-leading-avatar-smartness-test",
				leadingAvatarSize: "chat-prompt-submit-leading-avatar-size-smartness-test",
				trailingIcon: "chat-prompt-submit-trailing-icon-smartness-test"
			}
		},
		checkbox: {
			slots: {
				root: "checkbox-root-smartness-test",
				container: "checkbox-container-smartness-test",
				base: "checkbox-base-smartness-test",
				indicator: "checkbox-indicator-smartness-test",
				icon: "checkbox-icon-smartness-test",
				wrapper: "checkbox-wrapper-smartness-test",
				label: "checkbox-label-smartness-test",
				description: "checkbox-description-smartness-test"
			}
		},
		checkboxGroup: {
			slots: {
				root: "checkbox-group-root-smartness-test",
				fieldset: "checkbox-group-fieldset-smartness-test",
				legend: "checkbox-group-legend-smartness-test",
				item: "checkbox-group-item-smartness-test",
				container: "checkbox-group-container-smartness-test",
				base: "checkbox-group-base-smartness-test",
				indicator: "checkbox-group-indicator-smartness-test",
				icon: "checkbox-group-icon-smartness-test",
				wrapper: "checkbox-group-wrapper-smartness-test",
				label: "checkbox-group-label-smartness-test",
				description: "checkbox-group-description-smartness-test"
			}
		},
		chip: {
			slots: {
				root: "chip-root-smartness-test",
				base: "chip-base-smartness-test"
			}
		},
		collapsible: {
			slots: {
				root: "collapsible-root-smartness-test",
				content: "collapsible-content-smartness-test"
			}
		},
		colorModeButton: {
			slots: {
				base: "color-mode-button-base-smartness-test",
				label: "color-mode-button-label-smartness-test",
				leadingIcon: "color-mode-button-leading-icon-smartness-test",
				leadingAvatar: "color-mode-button-leading-avatar-smartness-test",
				leadingAvatarSize: "color-mode-button-leading-avatar-size-smartness-test",
				trailingIcon: "color-mode-button-trailing-icon-smartness-test"
			}
		},
		container: {
			slots: {
				root: "container-root-smartness-test"
			}
		},
		contentNavigation: {
			slots: {
				link: "content-navigation-link-smartness-test",
				"link-leading": "content-navigation-link-leading-smartness-test",
				"link-title": "content-navigation-link-title-smartness-test",
				"link-trailing": "content-navigation-link-trailing-smartness-test"
			}
		},
		contentSearch: {
			slots: {
				empty: "content-search-empty-smartness-test",
				footer: "content-search-footer-smartness-test",
				back: "content-search-back-smartness-test",
				close: "content-search-close-smartness-test",
				item: "content-search-item-smartness-test",
				"item-leading": "content-search-item-leading-smartness-test",
				"item-label": "content-search-item-label-smartness-test",
				"item-trailing": "content-search-item-trailing-smartness-test",
				content: "content-search-content-smartness-test"
			}
		},
		contentSearchButton: {
			slots: {
				leading: "content-search-button-leading-smartness-test",
				default: "content-search-button-default-smartness-test",
				trailing: "content-search-button-trailing-smartness-test"
			}
		},
		contentSurround: {
			slots: {
				link: "content-surround-link-smartness-test",
				"link-leading": "content-surround-link-leading-smartness-test",
				"link-title": "content-surround-link-title-smartness-test",
				"link-description": "content-surround-link-description-smartness-test"
			}
		},
		contentToc: {
			slots: {
				leading: "content-toc-leading-smartness-test",
				default: "content-toc-default-smartness-test",
				trailing: "content-toc-trailing-smartness-test",
				content: "content-toc-content-smartness-test",
				link: "content-toc-link-smartness-test",
				top: "content-toc-top-smartness-test",
				bottom: "content-toc-bottom-smartness-test"
			}
		},
		contextMenu: {
			slots: {
				default: "context-menu-default-smartness-test",
				item: "context-menu-item-smartness-test",
				"item-leading": "context-menu-item-leading-smartness-test",
				"item-label": "context-menu-item-label-smartness-test",
				"item-trailing": "context-menu-item-trailing-smartness-test",
				"content-top": "context-menu-content-top-smartness-test",
				"content-bottom": "context-menu-content-bottom-smartness-test"
			}
		},
		dashboardGroup: {
			slots: {
				default: "dashboard-group-default-smartness-test"
			}
		},
		dashboardNavbar: {
			slots: {
				title: "dashboard-navbar-title-smartness-test",
				leading: "dashboard-navbar-leading-smartness-test",
				trailing: "dashboard-navbar-trailing-smartness-test",
				left: "dashboard-navbar-left-smartness-test",
				default: "dashboard-navbar-default-smartness-test",
				right: "dashboard-navbar-right-smartness-test",
				toggle: "dashboard-navbar-toggle-smartness-test"
			}
		},
		dashboardPanel: {
			slots: {
				default: "dashboard-panel-default-smartness-test",
				header: "dashboard-panel-header-smartness-test",
				body: "dashboard-panel-body-smartness-test",
				footer: "dashboard-panel-footer-smartness-test",
				"resize-handle": "dashboard-panel-resize-handle-smartness-test"
			}
		},
		dashboardResizeHandle: {
			slots: {
				default: "dashboard-resize-handle-default-smartness-test"
			}
		},
		dashboardSearch: {
			slots: {
				empty: "dashboard-search-empty-smartness-test",
				footer: "dashboard-search-footer-smartness-test",
				back: "dashboard-search-back-smartness-test",
				close: "dashboard-search-close-smartness-test",
				item: "dashboard-search-item-smartness-test",
				"item-leading": "dashboard-search-item-leading-smartness-test",
				"item-label": "dashboard-search-item-label-smartness-test",
				"item-trailing": "dashboard-search-item-trailing-smartness-test",
				content: "dashboard-search-content-smartness-test"
			}
		},
		dashboardSearchButton: {
			slots: {
				leading: "dashboard-search-button-leading-smartness-test",
				default: "dashboard-search-button-default-smartness-test",
				trailing: "dashboard-search-button-trailing-smartness-test"
			}
		},
		dashboardSidebar: {
			slots: {
				header: "dashboard-sidebar-header-smartness-test",
				default: "dashboard-sidebar-default-smartness-test",
				footer: "dashboard-sidebar-footer-smartness-test",
				toggle: "dashboard-sidebar-toggle-smartness-test",
				content: "dashboard-sidebar-content-smartness-test",
				"resize-handle": "dashboard-sidebar-resize-handle-smartness-test"
			}
		},
		dashboardToolbar: {
			slots: {
				default: "dashboard-toolbar-default-smartness-test",
				left: "dashboard-toolbar-left-smartness-test",
				right: "dashboard-toolbar-right-smartness-test"
			}
		},
		drawer: {
			slots: {
				overlay: "drawer-overlay-smartness-test",
				content: "drawer-content-smartness-test",
				handle: "drawer-handle-smartness-test",
				container: "drawer-container-smartness-test",
				header: "drawer-header-smartness-test",
				title: "drawer-title-smartness-test",
				description: "drawer-description-smartness-test",
				body: "drawer-body-smartness-test",
				footer: "drawer-footer-smartness-test"
			}
		},
		dropdownMenu: {
			slots: {
				default: "dropdown-menu-default-smartness-test",
				item: "dropdown-menu-item-smartness-test",
				"item-leading": "dropdown-menu-item-leading-smartness-test",
				"item-label": "dropdown-menu-item-label-smartness-test",
				"item-trailing": "dropdown-menu-item-trailing-smartness-test",
				"content-top": "dropdown-menu-content-top-smartness-test",
				"content-bottom": "dropdown-menu-content-bottom-smartness-test"
			}
		},
		error: {
			slots: {
				root: "error-root-smartness-test",
				statusCode: "error-status-code-smartness-test",
				statusMessage: "error-status-message-smartness-test",
				message: "error-message-smartness-test",
				links: "error-links-smartness-test"
			}
		},
		fieldGroup: {
			slots: {
				root: "field-group-root-smartness-test"
			}
		},
		fileUpload: {
			slots: {
				root: "file-upload-root-smartness-test",
				base: "file-upload-base-smartness-test",
				wrapper: "file-upload-wrapper-smartness-test",
				icon: "file-upload-icon-smartness-test",
				avatar: "file-upload-avatar-smartness-test",
				label: "file-upload-label-smartness-test",
				description: "file-upload-description-smartness-test",
				actions: "file-upload-actions-smartness-test",
				files: "file-upload-files-smartness-test",
				file: "file-upload-file-smartness-test",
				fileLeadingAvatar: "file-upload-file-leading-avatar-smartness-test",
				fileWrapper: "file-upload-file-wrapper-smartness-test",
				fileName: "file-upload-file-name-smartness-test",
				fileSize: "file-upload-file-size-smartness-test",
				fileTrailingButton: "file-upload-file-trailing-button-smartness-test"
			}
		},
		footer: {
			slots: {
				root: "footer-root-smartness-test",
				top: "footer-top-smartness-test",
				bottom: "footer-bottom-smartness-test",
				container: "footer-container-smartness-test",
				left: "footer-left-smartness-test",
				center: "footer-center-smartness-test",
				right: "footer-right-smartness-test"
			}
		},
		footerColumns: {
			slots: {
				left: "footer-columns-left-smartness-test",
				default: "footer-columns-default-smartness-test",
				right: "footer-columns-right-smartness-test",
				"column-label": "footer-columns-column-label-smartness-test",
				link: "footer-columns-link-smartness-test",
				"link-leading": "footer-columns-link-leading-smartness-test",
				"link-label": "footer-columns-link-label-smartness-test",
				"link-trailing": "footer-columns-link-trailing-smartness-test"
			}
		},
		form: {
			slots: {
				root: "form-root-smartness-test"
			}
		},
		formField: {
			slots: {
				root: "form-field-root-smartness-test",
				wrapper: "form-field-wrapper-smartness-test",
				labelWrapper: "form-field-label-wrapper-smartness-test",
				label: "form-field-label-smartness-test",
				container: "form-field-container-smartness-test",
				description: "form-field-description-smartness-test",
				error: "form-field-error-smartness-test",
				hint: "form-field-hint-smartness-test",
				help: "form-field-help-smartness-test"
			}
		},
		header: {
			slots: {
				root: "header-root-smartness-test",
				container: "header-container-smartness-test",
				left: "header-left-smartness-test",
				center: "header-center-smartness-test",
				right: "header-right-smartness-test",
				title: "header-title-smartness-test",
				toggle: "header-toggle-smartness-test",
				content: "header-content-smartness-test",
				overlay: "header-overlay-smartness-test",
				header: "header-header-smartness-test",
				body: "header-body-smartness-test"
			}
		},
		input: {
			slots: {
				root: "w-full input-root-smartness-test",
				base: "input-base-smartness-test",
				leadingIcon: "input-leading-icon-smartness-test",
				trailingIcon: "input-trailing-icon-smartness-test"
			}
		},
		inputMenu: {
			slots: {
				root: "input-menu-root-smartness-test",
				base: "input-menu-base-smartness-test",
				leading: "input-menu-leading-smartness-test",
				leadingIcon: "input-menu-leading-icon-smartness-test",
				leadingAvatar: "input-menu-leading-avatar-smartness-test",
				leadingAvatarSize: "input-menu-leading-avatar-size-smartness-test",
				trailing: "input-menu-trailing-smartness-test",
				trailingIcon: "input-menu-trailing-icon-smartness-test",
				arrow: "input-menu-arrow-smartness-test",
				content: "input-menu-content-smartness-test",
				viewport: "input-menu-viewport-smartness-test",
				group: "input-menu-group-smartness-test",
				empty: "input-menu-empty-smartness-test",
				label: "input-menu-label-smartness-test",
				separator: "input-menu-separator-smartness-test",
				item: "input-menu-item-smartness-test",
				itemLeadingIcon: "input-menu-item-leading-icon-smartness-test",
				itemLeadingAvatar: "input-menu-item-leading-avatar-smartness-test",
				itemLeadingAvatarSize: "input-menu-item-leading-avatar-size-smartness-test",
				itemLeadingChip: "input-menu-item-leading-chip-smartness-test",
				itemLeadingChipSize: "input-menu-item-leading-chip-size-smartness-test",
				itemTrailing: "input-menu-item-trailing-smartness-test",
				itemTrailingIcon: "input-menu-item-trailing-icon-smartness-test",
				itemLabel: "input-menu-item-label-smartness-test",
				tagsItem: "input-menu-tags-item-smartness-test",
				tagsItemText: "input-menu-tags-item-text-smartness-test",
				tagsItemDelete: "input-menu-tags-item-delete-smartness-test",
				tagsItemDeleteIcon: "input-menu-tags-item-delete-icon-smartness-test",
				tagsInput: "input-menu-tags-input-smartness-test"
			}
		},
		inputNumber: {
			slots: {
				root: "input-number-root-smartness-test",
				base: "input-number-base-smartness-test",
				increment: "input-number-increment-smartness-test",
				decrement: "input-number-decrement-smartness-test"
			}
		},
		inputTags: {
			slots: {
				root: "input-tags-root-smartness-test",
				base: "input-tags-base-smartness-test",
				leading: "input-tags-leading-smartness-test",
				leadingIcon: "input-tags-leading-icon-smartness-test",
				leadingAvatar: "input-tags-leading-avatar-smartness-test",
				leadingAvatarSize: "input-tags-leading-avatar-size-smartness-test",
				trailing: "input-tags-trailing-smartness-test",
				trailingIcon: "input-tags-trailing-icon-smartness-test",
				item: "input-tags-item-smartness-test",
				itemText: "input-tags-item-text-smartness-test",
				itemDelete: "input-tags-item-delete-smartness-test",
				itemDeleteIcon: "input-tags-item-delete-icon-smartness-test",
				input: "input-tags-input-smartness-test"
			}
		},
		kbd: {
			slots: {
				base: "kbd-base-smartness-test"
			}
		},
		marquee: {
			slots: {
				root: "marquee-root-smartness-test",
				content: "marquee-content-smartness-test"
			}
		},
		modal: {
			slots: {
				overlay: "modal-overlay-smartness-test",
				content: "modal-content-smartness-test",
				wrapper: "modal-wrapper-smartness-test",
				header: "modal-header-smartness-test",
				title: "modal-title-smartness-test",
				description: "modal-description-smartness-test",
				body: "modal-body-smartness-test",
				footer: "modal-footer-smartness-test",
				close: "modal-close-smartness-test"
			}
		},
		navigationMenu: {
			slots: {
				item: "navigation-menu-item-smartness-test",
				"item-leading": "navigation-menu-item-leading-smartness-test",
				"item-label": "navigation-menu-item-label-smartness-test",
				"item-trailing": "navigation-menu-item-trailing-smartness-test",
				"item-content": "navigation-menu-item-content-smartness-test",
				"list-leading": "navigation-menu-list-leading-smartness-test",
				"list-trailing": "navigation-menu-list-trailing-smartness-test"
			}
		},
		page: {
			slots: {
				left: "page-left-smartness-test",
				default: "page-default-smartness-test",
				right: "page-right-smartness-test"
			}
		},
		pageAnchors: {
			slots: {
				link: "page-anchors-link-smartness-test",
				"link-leading": "page-anchors-link-leading-smartness-test",
				"link-label": "page-anchors-link-label-smartness-test",
				"link-trailing": "page-anchors-link-trailing-smartness-test"
			}
		},
		pageAside: {
			slots: {
				top: "page-aside-top-smartness-test",
				default: "page-aside-default-smartness-test",
				bottom: "page-aside-bottom-smartness-test"
			}
		},
		pageBody: {
			slots: {
				default: "page-body-default-smartness-test"
			}
		},
		pageCard: {
			slots: {
				header: "page-card-header-smartness-test",
				body: "page-card-body-smartness-test",
				leading: "page-card-leading-smartness-test",
				title: "page-card-title-smartness-test",
				description: "page-card-description-smartness-test",
				footer: "page-card-footer-smartness-test",
				default: "page-card-default-smartness-test"
			}
		},
		pageColumns: {
			slots: {
				default: "page-columns-default-smartness-test"
			}
		},
		pageCta: {
			slots: {
				top: "page-cta-top-smartness-test",
				header: "page-cta-header-smartness-test",
				title: "page-cta-title-smartness-test",
				description: "page-cta-description-smartness-test",
				body: "page-cta-body-smartness-test",
				footer: "page-cta-footer-smartness-test",
				links: "page-cta-links-smartness-test",
				default: "page-cta-default-smartness-test",
				bottom: "page-cta-bottom-smartness-test"
			}
		},
		pageFeature: {
			slots: {
				leading: "page-feature-leading-smartness-test",
				title: "page-feature-title-smartness-test",
				description: "page-feature-description-smartness-test",
				default: "page-feature-default-smartness-test"
			}
		},
		pageGrid: {
			slots: {
				default: "page-grid-default-smartness-test"
			}
		},
		pageHeader: {
			slots: {
				headline: "page-header-headline-smartness-test",
				title: "page-header-title-smartness-test",
				description: "page-header-description-smartness-test",
				links: "page-header-links-smartness-test",
				default: "page-header-default-smartness-test"
			}
		},
		pageHero: {
			slots: {
				top: "page-hero-top-smartness-test",
				header: "page-hero-header-smartness-test",
				headline: "page-hero-headline-smartness-test",
				title: "page-hero-title-smartness-test",
				description: "page-hero-description-smartness-test",
				body: "page-hero-body-smartness-test",
				footer: "page-hero-footer-smartness-test",
				links: "page-hero-links-smartness-test",
				default: "page-hero-default-smartness-test",
				bottom: "page-hero-bottom-smartness-test"
			}
		},
		pageLinks: {
			slots: {
				title: "page-links-title-smartness-test",
				link: "page-links-link-smartness-test",
				"link-leading": "page-links-link-leading-smartness-test",
				"link-label": "page-links-link-label-smartness-test",
				"link-trailing": "page-links-link-trailing-smartness-test"
			}
		},
		pageList: {
			slots: {
				default: "page-list-default-smartness-test"
			}
		},
		pageLogos: {
			slots: {
				default: "page-logos-default-smartness-test"
			}
		},
		pageSection: {
			slots: {
				top: "page-section-top-smartness-test",
				header: "page-section-header-smartness-test",
				leading: "page-section-leading-smartness-test",
				headline: "page-section-headline-smartness-test",
				title: "page-section-title-smartness-test",
				description: "page-section-description-smartness-test",
				body: "page-section-body-smartness-test",
				features: "page-section-features-smartness-test",
				footer: "page-section-footer-smartness-test",
				links: "page-section-links-smartness-test",
				default: "page-section-default-smartness-test",
				bottom: "page-section-bottom-smartness-test"
			}
		},
		pagination: {
			slots: {
				root: "pagination-root-smartness-test",
				list: "pagination-list-smartness-test",
				ellipsis: "pagination-ellipsis-smartness-test",
				label: "pagination-label-smartness-test",
				first: "pagination-first-smartness-test",
				prev: "pagination-prev-smartness-test",
				item: "pagination-item-smartness-test",
				next: "pagination-next-smartness-test",
				last: "pagination-last-smartness-test"
			}
		},
		popover: {
			slots: {
				content: "popover-content-smartness-test",
				arrow: "popover-arrow-smartness-test"
			}
		},
		pricingPlan: {
			slots: {
				badge: "pricing-plan-badge-smartness-test",
				title: "pricing-plan-title-smartness-test",
				description: "pricing-plan-description-smartness-test",
				price: "pricing-plan-price-smartness-test",
				discount: "pricing-plan-discount-smartness-test",
				billing: "pricing-plan-billing-smartness-test",
				features: "pricing-plan-features-smartness-test",
				button: "pricing-plan-button-smartness-test",
				header: "pricing-plan-header-smartness-test",
				body: "pricing-plan-body-smartness-test",
				footer: "pricing-plan-footer-smartness-test",
				tagline: "pricing-plan-tagline-smartness-test",
				terms: "pricing-plan-terms-smartness-test"
			}
		},
		pricingPlans: {
			slots: {
				default: "pricing-plans-default-smartness-test"
			}
		},
		progress: {
			slots: {
				root: "progress-root-smartness-test",
				base: "progress-base-smartness-test",
				indicator: "progress-indicator-smartness-test",
				status: "progress-status-smartness-test",
				steps: "progress-steps-smartness-test",
				step: "progress-step-smartness-test"
			}
		},
		radioGroup: {
			slots: {
				legend: "radio-group-legend-smartness-test",
				label: "radio-group-label-smartness-test",
				description: "radio-group-description-smartness-test"
			}
		},
		select: {
			slots: {
				base: "w-full select-base-smartness-test",
				leading: "select-leading-smartness-test",
				leadingIcon: "select-leading-icon-smartness-test",
				leadingAvatar: "select-leading-avatar-smartness-test",
				leadingAvatarSize: "select-leading-avatar-size-smartness-test",
				trailing: "select-trailing-smartness-test",
				trailingIcon: "select-trailing-icon-smartness-test",
				value: "select-value-smartness-test",
				placeholder: "select-placeholder-smartness-test",
				arrow: "select-arrow-smartness-test",
				content: "select-content-smartness-test",
				viewport: "select-viewport-smartness-test",
				group: "select-group-smartness-test",
				empty: "select-empty-smartness-test",
				label: "select-label-smartness-test",
				separator: "select-separator-smartness-test",
				item: "select-item-smartness-test",
				itemLeadingIcon: "select-item-leading-icon-smartness-test",
				itemLeadingAvatar: "select-item-leading-avatar-smartness-test",
				itemLeadingAvatarSize: "select-item-leading-avatar-size-smartness-test",
				itemLeadingChip: "select-item-leading-chip-smartness-test",
				itemLeadingChipSize: "select-item-leading-chip-size-smartness-test",
				itemTrailing: "select-item-trailing-smartness-test",
				itemTrailingIcon: "select-item-trailing-icon-smartness-test",
				itemLabel: "select-item-label-smartness-test"
			}
		},
		selectMenu: {
			slots: {
				leading: "select-menu-leading-smartness-test",
				default: "select-menu-default-smartness-test",
				trailing: "select-menu-trailing-smartness-test",
				empty: "select-menu-empty-smartness-test",
				item: "select-menu-item-smartness-test",
				"item-leading": "select-menu-item-leading-smartness-test",
				"item-label": "select-menu-item-label-smartness-test",
				"item-trailing": "select-menu-item-trailing-smartness-test",
				"content-top": "select-menu-content-top-smartness-test",
				"content-bottom": "select-menu-content-bottom-smartness-test",
				"create-item-label": "select-menu-create-item-label-smartness-test"
			}
		},
		separator: {
			slots: {
				root: "separator-root-smartness-test",
				border: "separator-border-smartness-test",
				container: "separator-container-smartness-test",
				icon: "separator-icon-smartness-test",
				avatar: "separator-avatar-smartness-test",
				avatarSize: "separator-avatar-size-smartness-test",
				label: "separator-label-smartness-test"
			}
		},
		slideover: {
			slots: {
				overlay: "slideover-overlay-smartness-test",
				content: "slideover-content-smartness-test",
				header: "slideover-header-smartness-test",
				wrapper: "slideover-wrapper-smartness-test",
				body: "slideover-body-smartness-test",
				footer: "slideover-footer-smartness-test",
				title: "slideover-title-smartness-test",
				description: "slideover-description-smartness-test",
				close: "slideover-close-smartness-test"
			}
		},
		slider: {
			slots: {
				root: "slider-root-smartness-test",
				track: "slider-track-smartness-test",
				range: "slider-range-smartness-test",
				thumb: "slider-thumb-smartness-test"
			}
		},
		stepper: {
			slots: {
				root: "stepper-root-smartness-test",
				header: "stepper-header-smartness-test",
				item: "stepper-item-smartness-test",
				container: "stepper-container-smartness-test",
				trigger: "stepper-trigger-smartness-test",
				indicator: "stepper-indicator-smartness-test",
				icon: "stepper-icon-smartness-test",
				separator: "stepper-separator-smartness-test",
				wrapper: "stepper-wrapper-smartness-test",
				title: "stepper-title-smartness-test",
				description: "stepper-description-smartness-test",
				content: "stepper-content-smartness-test"
			}
		},
		switch: {
			slots: {
				root: "switch-root-smartness-test",
				base: "switch-base-smartness-test",
				container: "switch-container-smartness-test",
				thumb: "switch-thumb-smartness-test",
				icon: "switch-icon-smartness-test",
				wrapper: "switch-wrapper-smartness-test",
				label: "switch-label-smartness-test",
				description: "switch-description-smartness-test"
			}
		},
		table: {
			slots: {
				expanded: "table-expanded-smartness-test",
				empty: "table-empty-smartness-test",
				loading: "table-loading-smartness-test",
				caption: "table-caption-smartness-test",
				"body-top": "table-body-top-smartness-test",
				"body-bottom": "table-body-bottom-smartness-test"
			}
		},
		tabs: {
			slots: {
				root: "tabs-root-smartness-test",
				list: "tabs-list-smartness-test",
				indicator: "tabs-indicator-smartness-test",
				trigger: "flex-1 tabs-trigger-smartness-test",
				leadingIcon: "tabs-leading-icon-smartness-test",
				leadingAvatar: "tabs-leading-avatar-smartness-test",
				leadingAvatarSize: "tabs-leading-avatar-size-smartness-test",
				label: "tabs-label-smartness-test",
				trailingBadge: "tabs-trailing-badge-smartness-test",
				trailingBadgeSize: "tabs-trailing-badge-size-smartness-test",
				content: "tabs-content-smartness-test"
			}
		},
		textarea: {
			slots: {
				root: "textarea-root-smartness-test",
				base: "textarea-base-smartness-test",
				leading: "textarea-leading-smartness-test",
				leadingIcon: "textarea-leading-icon-smartness-test",
				leadingAvatar: "textarea-leading-avatar-smartness-test",
				leadingAvatarSize: "textarea-leading-avatar-size-smartness-test",
				trailing: "textarea-trailing-smartness-test",
				trailingIcon: "textarea-trailing-icon-smartness-test"
			}
		},
		timeline: {
			slots: {
				root: "timeline-root-smartness-test",
				item: "timeline-item-smartness-test",
				container: "timeline-container-smartness-test",
				indicator: "timeline-indicator-smartness-test",
				separator: "timeline-separator-smartness-test",
				wrapper: "timeline-wrapper-smartness-test",
				date: "timeline-date-smartness-test",
				title: "timeline-title-smartness-test",
				description: "timeline-description-smartness-test"
			}
		},
		toast: {
			slots: {
				root: "toast-root-smartness-test",
				wrapper: "toast-wrapper-smartness-test",
				title: "toast-title-smartness-test",
				description: "toast-description-smartness-test",
				icon: "toast-icon-smartness-test",
				avatar: "toast-avatar-smartness-test",
				avatarSize: "toast-avatar-size-smartness-test",
				actions: "toast-actions-smartness-test",
				progress: "toast-progress-smartness-test",
				close: "toast-close-smartness-test"
			}
		},
		tooltip: {
			slots: {
				content: "tooltip-content-smartness-test",
				arrow: "tooltip-arrow-smartness-test",
				text: "tooltip-text-smartness-test",
				kbds: "tooltip-kbds-smartness-test",
				kbdsSize: "tooltip-kbds-size-smartness-test"
			}
		},
		tree: {
			slots: {
				"item-wrapper": "tree-item-wrapper-smartness-test",
				item: "tree-item-smartness-test",
				"item-leading": "tree-item-leading-smartness-test",
				"item-label": "tree-item-label-smartness-test",
				"item-trailing": "tree-item-trailing-smartness-test"
			}
		},
		user: {
			slots: {
				root: "user-root-smartness-test",
				wrapper: "user-wrapper-smartness-test",
				avatar: "user-avatar-smartness-test",
				name: "user-name-smartness-test",
				description: "user-description-smartness-test"
			}
		}
	}
});
