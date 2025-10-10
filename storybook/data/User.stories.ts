import type { Meta, StoryObj } from "@storybook/vue3";
import UUser from "@nuxt/ui/components/User.vue";

const meta = {
	title: "Data/User",
	component: UUser,
	tags: ["autodocs"],
	argTypes: {
		name: {
			control: "text",
			description: "User name",
			table: {
				type: { summary: "string" }
			}
		},
		description: {
			control: "text",
			description: "User description or subtitle",
			table: {
				type: { summary: "string" }
			}
		},
		avatar: {
			control: "object",
			description: "Avatar configuration",
			table: {
				type: { summary: "AvatarProps" }
			}
		},
		chip: {
			control: "object",
			description: "Chip configuration for status indicator",
			table: {
				type: { summary: "boolean | ChipProps" }
			}
		},
		size: {
			control: "select",
			options: ["3xs", "2xs", "xs", "sm", "md", "lg", "xl", "2xl", "3xl"],
			description: "Size of the user component",
			table: {
				type: { summary: "string" },
				defaultValue: { summary: "md" }
			}
		},
		orientation: {
			control: "select",
			options: ["horizontal", "vertical"],
			description: "Orientation of the user component",
			table: {
				type: { summary: "string" },
				defaultValue: { summary: "horizontal" }
			}
		},
		to: {
			control: "text",
			description: "Link destination (uses NuxtLink)",
			table: {
				type: { summary: "string | RouteLocation" }
			}
		},
		target: {
			control: "select",
			options: ["_blank", "_self", "_parent", "_top"],
			description: "Link target attribute",
			table: {
				type: { summary: "string" }
			}
		},
		as: {
			control: "text",
			description: "The element or component this component should render as",
			table: {
				type: { summary: "any" }
			}
		},
		onClick: {
			action: "click",
			description: "Emitted when user is clicked"
		}
	}
} satisfies Meta<typeof UUser>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default user display with name only
 */
export const Default: Story = {
	args: {
		name: "John Doe"
	}
};

/**
 * User with description
 */
export const WithDescription: Story = {
	args: {
		name: "Jane Smith",
		description: "Software Engineer"
	}
};

/**
 * User with avatar image
 */
export const WithAvatar: Story = {
	args: {
		name: "Sarah Johnson",
		description: "Product Manager",
		avatar: {
			src: "https://github.com/benjamincanac.png"
		}
	}
};

/**
 * User with avatar text (initials)
 */
export const WithAvatarText: Story = {
	args: {
		name: "Bob Wilson",
		description: "Team Lead",
		avatar: {
			text: "BW"
		}
	}
};

/**
 * User with avatar icon
 */
export const WithAvatarIcon: Story = {
	args: {
		name: "Guest User",
		description: "Visitor",
		avatar: {
			icon: "i-lucide-user"
		}
	}
};

/**
 * User with online status chip
 */
export const WithChip: Story = {
	args: {
		name: "Alice Brown",
		description: "Available",
		avatar: {
			src: "https://github.com/benjamincanac.png"
		},
		chip: {
			color: "success"
		}
	}
};

/**
 * User with custom chip configuration
 */
export const WithCustomChip: Story = {
	args: {
		name: "Charlie Davis",
		description: "Away",
		avatar: {
			text: "CD"
		},
		chip: {
			color: "warning",
			text: "3"
		}
	}
};

/**
 * Extra small size
 */
export const SizeXS: Story = {
	args: {
		name: "Emma Taylor",
		description: "Designer",
		avatar: {
			src: "https://github.com/benjamincanac.png"
		},
		size: "xs"
	}
};

/**
 * Large size
 */
export const SizeLarge: Story = {
	args: {
		name: "Michael Chen",
		description: "Engineering Manager",
		avatar: {
			src: "https://github.com/benjamincanac.png"
		},
		size: "lg"
	}
};

/**
 * Extra large size
 */
export const SizeXL: Story = {
	args: {
		name: "Olivia Martinez",
		description: "CEO & Founder",
		avatar: {
			src: "https://github.com/benjamincanac.png"
		},
		size: "xl"
	}
};

/**
 * Vertical orientation
 */
export const Vertical: Story = {
	args: {
		name: "Daniel Anderson",
		description: "UX Designer",
		avatar: {
			src: "https://github.com/benjamincanac.png"
		},
		orientation: "vertical"
	}
};

/**
 * With link
 */
export const WithLink: Story = {
	args: {
		name: "Sophia Lee",
		description: "Software Developer",
		avatar: {
			src: "https://github.com/benjamincanac.png"
		},
		to: "https://github.com/benjamincanac",
		target: "_blank"
	}
};

/**
 * Online status
 */
export const OnlineStatus: Story = {
	args: {
		name: "James Wilson",
		description: "Online",
		avatar: {
			src: "https://github.com/benjamincanac.png"
		},
		chip: {
			color: "success"
		}
	}
};

/**
 * Busy status
 */
export const BusyStatus: Story = {
	args: {
		name: "Emily Brown",
		description: "In a meeting",
		avatar: {
			text: "EB"
		},
		chip: {
			color: "error"
		}
	}
};

/**
 * Away status
 */
export const AwayStatus: Story = {
	args: {
		name: "David Garcia",
		description: "Be right back",
		avatar: {
			text: "DG"
		},
		chip: {
			color: "warning"
		}
	}
};

/**
 * Team member card
 */
export const TeamMember: Story = {
	args: {
		name: "Alex Thompson",
		description: "Senior Frontend Developer",
		avatar: {
			src: "https://github.com/benjamincanac.png"
		},
		chip: {
			color: "success"
		},
		size: "lg"
	}
};

/**
 * User list item
 */
export const ListItem: Story = {
	args: {
		name: "Rachel Green",
		description: "rachel.green@example.com",
		avatar: {
			text: "RG"
		},
		size: "sm"
	}
};

/**
 * Message author
 */
export const MessageAuthor: Story = {
	args: {
		name: "Monica Geller",
		description: "2 hours ago",
		avatar: {
			src: "https://github.com/benjamincanac.png"
		},
		size: "md"
	}
};

/**
 * Profile header
 */
export const ProfileHeader: Story = {
	args: {
		name: "Ross Geller",
		description: "Paleontologist at Museum of Natural History",
		avatar: {
			src: "https://github.com/benjamincanac.png"
		},
		size: "2xl"
	}
};

/**
 * Notification item
 */
export const NotificationItem: Story = {
	args: {
		name: "Chandler Bing",
		description: "commented on your post",
		avatar: {
			text: "CB"
		},
		chip: {
			color: "primary",
			text: "1"
		},
		size: "sm"
	}
};

/**
 * Comment author
 */
export const CommentAuthor: Story = {
	args: {
		name: "Joey Tribbiani",
		description: "Actor",
		avatar: {
			icon: "i-lucide-user"
		},
		size: "xs"
	}
};

/**
 * Minimal display
 */
export const Minimal: Story = {
	args: {
		name: "Phoebe Buffay",
		avatar: {
			text: "PB"
		},
		size: "2xs"
	}
};
