import type { Linter } from "eslint";

export interface EslintOverrides {
	rules?: Partial<Linter.RulesRecord>
}

export function createEslintConfig(
	nuxtConfig: <T>(config: T) => Promise<Linter.Config[]>,
	overrides?: EslintOverrides
): Promise<Linter.Config[]>;
