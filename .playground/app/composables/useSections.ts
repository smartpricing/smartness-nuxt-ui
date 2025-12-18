export interface Section {
	id: string
	label: string
}

/**
 * Composable for managing page sections for navigation
 * Uses useState to share state across components
 */
export function useSections() {
	// Shared state across components
	const sections = useState<Section[]>("page-sections", () => []);

	/**
	 * Scan a container element for sections with IDs and headings
	 * Reads existing IDs from section elements for anchor navigation
	 */
	function scanSections(container: HTMLElement | null) {
		if (!container) {
			sections.value = [];
			return;
		}

		// Find all sections that have an id attribute
		const sectionElements = container.querySelectorAll<HTMLElement>("section[id]");
		const foundSections: Section[] = [];

		sectionElements.forEach((section) => {
			// Look for heading elements (h1-h6)
			const heading = section.querySelector("h1, h2, h3, h4, h5, h6");

			if (heading && heading.textContent && section.id) {
				const label = heading.textContent.trim();

				// Skip the main title section (usually H1)
				if (heading.tagName === "H1") {
					return;
				}

				foundSections.push({ id: section.id, label });
			}
		});

		sections.value = foundSections;
	}

	/**
	 * Clear sections (useful when navigating away)
	 */
	function clearSections() {
		sections.value = [];
	}

	return {
		sections: readonly(sections),
		scanSections,
		clearSections
	};
}
