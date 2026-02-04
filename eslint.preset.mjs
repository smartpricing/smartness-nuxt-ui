// @ts-check
import eslintConfig from "@antfu/eslint-config";

/**
 * Creates a shared ESLint config for Nuxt projects using the Smartness UI layer.
 * @param {Function} nuxtConfig - The withNuxt function from .nuxt/eslint.config.mjs
 * @param {{ rules?: Record<string, unknown> }} [overrides] - Optional overrides for rules
 * @returns {Promise} ESLint flat config
 */
export function createEslintConfig(nuxtConfig, overrides) {
	const rules = overrides?.rules ?? {};
	return nuxtConfig(
		eslintConfig(
			{
				typescript: true,
				vue: true,
				stylistic: {
					indent: "tab",
					quotes: "double"
				},
				rules: {
					curly: "off",
					"no-console": "off",
					"no-new-func": "off",
					"style/semi": ["error", "always"],
					"style/indent": ["error", "tab"],
					"style/quote-props": ["warn", "as-needed"],
					"style/comma-dangle": ["warn", "never"],
					"style/brace-style": ["warn", "1tbs"],
					"style/arrow-parens": ["error", "always"],
					"vue/block-order": ["error", {
						order: ["template", "script", "style"]
					}],
					"vue/script-indent": ["error", "tab", {
						baseIndent: 1
					}],
					"antfu/top-level-function": "off",
					"antfu/if-newline": "off",
					"node/prefer-global/process": "off",
					"unicorn/prefer-includes": "off",
					...rules
				}
			},
			{
				files: ["**/*.vue"],
				rules: {
					"style/indent": "off"
				}
			}
		)
	);
}
