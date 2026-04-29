import { z } from "zod";
import { queryCollection } from "@nuxt/content/server";

export default defineMcpPrompt({
	description: "Find the best Smartness UI component for a specific use case.",
	inputSchema: {
		usecase: z.string().describe("Plain English description of what the user is trying to build (e.g. 'a vertical multi-step flow with optional steps').")
	},
	async handler({ usecase }) {
		const event = useEvent();
		const components = await queryCollection(event, "components")
			.select("title", "description", "category", "prefix", "componentName", "tags", "path")
			.all();

		const summary = components.map((c) => ({
			name: `${c.prefix}${c.componentName}`,
			category: c.category,
			description: c.description,
			tags: c.tags
		}));

		return {
			messages: [
				{
					role: "user" as const,
					content: {
						type: "text" as const,
						text: `Pick the most appropriate Smartness UI component(s) for the following use case and explain why. Reply with the component name(s) and a one-line justification.\n\nUse case: ${usecase}\n\nAvailable components:\n${JSON.stringify(summary, null, 2)}`
					}
				}
			]
		};
	}
});
