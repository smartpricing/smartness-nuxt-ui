import { z } from "zod";
import { queryCollection } from "@nuxt/content/server";
import { normalizeComponentName } from "@@/server/utils/normalizeComponentName";

export default defineMcpPrompt({
	description: "Generate a complete component implementation with proper props, slots, and Smartness UI styling.",
	inputSchema: {
		componentName: z.string().describe("The Smartness UI component name (S/U prefix optional)"),
		requirements: z.string().optional().describe("Specific requirements or customizations needed")
	},
	async handler({ componentName, requirements }) {
		const event = useEvent();
		const normalized = normalizeComponentName(componentName);

		const page = await queryCollection(event, "components")
			.where("componentName", "=", normalized)
			.first();

		if (!page) {
			return {
				messages: [{
					role: "user" as const,
					content: {
						type: "text" as const,
						text: `Component '${componentName}' was not found in the Smartness UI catalog. Use the list-components tool to see available components.`
					}
				}]
			};
		}

		const fullName = `${page.prefix}${page.componentName}`;
		let metadata: Record<string, unknown> | null = null;
		try {
			metadata = await $fetch<Record<string, unknown>>(`/api/component-meta/${fullName}.json`);
		} catch {
			// metadata not available
		}

		const meta = metadata?.meta as Record<string, unknown> | undefined;

		const payload = {
			name: fullName,
			title: page.title,
			description: page.description,
			category: page.category,
			subcomponents: page.subcomponents,
			body: page.body,
			metadata: meta
				? {
					props: meta.props,
					slots: meta.slots,
					emits: meta.events ?? meta.emits
				}
				: null
		};

		const requirementsLine = requirements ? `\n\nRequirements: ${requirements}` : "";

		return {
			messages: [{
				role: "user" as const,
				content: {
					type: "text" as const,
					text: `Generate a complete implementation of <${fullName}> following Smartness UI conventions (tabs, double quotes, semicolons, Phosphor icons, design system colors).${requirementsLine}\n\nComponent details:\n${JSON.stringify(payload, null, 2)}`
				}
			}]
		};
	}
});
