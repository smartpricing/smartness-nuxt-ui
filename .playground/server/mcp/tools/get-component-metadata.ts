import { z } from "zod";
import { queryCollection } from "@nuxt/content/server";
import { normalizeComponentName } from "@@/server/utils/normalizeComponentName";

export default defineMcpTool({
	description: "Get the metadata (props, slots, events) for a Smartness UI component, extracted from the .vue source via nuxt-component-meta.",
	annotations: {
		readOnlyHint: true,
		destructiveHint: false,
		idempotentHint: true,
		openWorldHint: false
	},
	inputSchema: {
		componentName: z.string().describe("The component name (with or without S/U prefix)")
	},
	inputExamples: [
		{ componentName: "SStepper" },
		{ componentName: "MultiSelect" }
	],
	cache: "30m",
	async handler({ componentName }) {
		const event = useEvent();
		const normalized = normalizeComponentName(componentName);

		const page = await queryCollection(event, "components")
			.where("componentName", "=", normalized)
			.first();

		if (!page) {
			throw createError({
				statusCode: 404,
				message: `Component '${componentName}' not found in the catalog.`
			});
		}

		const fullName = `${page.prefix}${normalized}`;

		let metadata: Record<string, unknown> | null = null;
		try {
			metadata = await $fetch<Record<string, unknown>>(`/api/component-meta/${fullName}.json`);
		} catch {
			throw createError({
				statusCode: 404,
				message: `Metadata for '${fullName}' is not available. The component may not be picked up by nuxt-component-meta.`
			});
		}

		const meta = metadata?.meta as Record<string, unknown> | undefined;

		return {
			name: page.componentName,
			fullName,
			title: page.title,
			description: page.description,
			category: page.category,
			metadata: meta
				? {
					pascalName: metadata.pascalName,
					kebabName: metadata.kebabName,
					props: meta.props,
					slots: meta.slots,
					emits: meta.events ?? meta.emits,
					exposed: meta.exposed
				}
				: null
		};
	}
});
