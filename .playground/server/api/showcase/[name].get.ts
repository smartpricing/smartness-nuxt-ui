import { readShowcaseFile } from "@@/server/utils/showcaseSource";

export default defineEventHandler(async (event) => {
	const name = getRouterParam(event, "name");
	if (!name) {
		throw createError({ statusCode: 400, message: "Missing showcase name" });
	}

	try {
		const code = await readShowcaseFile(name);
		return { name, code };
	} catch {
		throw createError({ statusCode: 404, message: `Showcase '${name}' not found` });
	}
});
