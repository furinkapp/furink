module.exports = {
	extends: "eslint-config-infernal",
	parserOptions: {
		tsconfigRootDir: __dirname,
		project: ["./packages/*/tsconfig*.json", "apps/*/tsconfig*.json", "services/*/tsconfig*.json"],
	},
	root: true,
	rules: {
		// broken in eslint-config-infernal
		"new-cap": "off",
		"no-void": "off",
		// broken in eslint-config-infernal
		"no-empty-function": "off",
		"@typescript-eslint/no-empty-function": "warn",
	},
	ignorePatterns: ["next-env.d.ts"],
};
