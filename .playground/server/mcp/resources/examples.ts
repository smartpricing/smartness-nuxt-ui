import { pascalCase } from "scule";
import { queryCollection } from "@nuxt/content/server";
import { extractSectionsFromVue, readShowcaseFile } from "@@/server/utils/showcaseSource";

export default defineMcpResource({
	uri: "resource://smartness-ui/examples",
	description: "Catalog of all Smartness UI showcase examples (per-section).",
	cache: "1h",
	async handler(uri: URL) {
		const event = useEvent();
		const components = await queryCollection(event, "components")
			.select("componentName", "showcaseFile")
			.all();

		const examples: Array<{ exampleName: string, component: string, sectionId: string }> = [];
		for (const c of components) {
			if (!c.showcaseFile) continue;
			let source: string;
			try {
				source = await readShowcaseFile(c.showcaseFile);
			} catch {
				continue;
			}

			const sections = extractSectionsFromVue(source);
			for (const s of sections) {
				examples.push({
					exampleName: `${c.showcaseFile}${pascalCase(s.id)}`,
					component: c.componentName,
					sectionId: s.id
				});
			}
		}

		return {
			contents: [{
				uri: uri.toString(),
				mimeType: "application/json",
				text: JSON.stringify(examples, null, 2)
			}]
		};
	}
});
