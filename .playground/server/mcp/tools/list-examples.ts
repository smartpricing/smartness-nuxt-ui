import { z } from "zod";
import { pascalCase } from "scule";
import { queryCollection } from "@nuxt/content/server";
import { extractSectionsFromVue, readShowcaseFile } from "@@/server/utils/showcaseSource";

export default defineMcpTool({
	description: "List all available showcase example sections. Each example is a single <section id> from a showcase file. Optionally filter by component.",
	annotations: {
		readOnlyHint: true,
		destructiveHint: false,
		idempotentHint: true,
		openWorldHint: false
	},
	inputSchema: {
		component: z.string().optional().describe("Filter examples by component (e.g. 'Stepper', 'MultiSelect')")
	},
	inputExamples: [
		{},
		{ component: "Stepper" }
	],
	cache: "30m",
	async handler({ component }) {
		const event = useEvent();

		const components = await queryCollection(event, "components")
			.select("componentName", "showcaseFile")
			.all();

		const filtered = component
			? components.filter((c) => c.componentName === pascalCase(component))
			: components;

		const examples: Array<{ exampleName: string, component: string, sectionId: string, showcaseFile: string }> = [];

		for (const c of filtered) {
			if (!c.showcaseFile) continue;

			let source: string;
			try {
				source = await readShowcaseFile(c.showcaseFile);
			} catch {
				continue;
			}

			const sections = extractSectionsFromVue(source);
			for (const section of sections) {
				const exampleName = `${c.showcaseFile}${pascalCase(section.id)}`;
				examples.push({
					exampleName,
					component: c.componentName,
					sectionId: section.id,
					showcaseFile: c.showcaseFile
				});
			}
		}

		return {
			examples: examples.sort((a, b) => a.exampleName.localeCompare(b.exampleName)),
			total: examples.length
		};
	}
});
