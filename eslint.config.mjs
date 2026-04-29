// @ts-check
import nuxtConfig from "./.nuxt/eslint.config.mjs";
import { createEslintConfig } from "./eslint.preset.mjs";

export default createEslintConfig(nuxtConfig, {
	rules: {
		"pnpm/yaml-enforce-settings": "off"
	}
}).then((config) => [
	{ ignores: ["**/*.md"] },
	...config
]);