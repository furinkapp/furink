module.exports = {
	extends: "eslint-config-infernal",
	parserOptions: {
		tsconfigRootDir: __dirname,
		project: ["./packages/*/tsconfig.json", "apps/*/tsconfig.json"],
	},
	root: true,
	ignorePatterns: ["next-env.d.ts"],
};
