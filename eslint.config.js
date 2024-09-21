// @ts-check

import tseslint from "typescript-eslint";

const ignores = [
  "node_modules",
  "dist",
  "docs",
  "**/*.d.ts",
  "**/*.spec.ts",
  "**/*.test.ts",
  "**/tests/**",
  "eslint.config.js",
  "eslint.config.test.js",
  "vitest.config.js",
];

export default tseslint.config(
  ...tseslint.configs.recommended.map((x) => ({ ...x, ignores })),
  {
    languageOptions: {
      parserOptions: {
        parser: "@typescript-eslint/parser",
        project: "./tsconfig.json",
        tsconfigRootDir: "./",
      },
    },
    files: ["**/*.ts", "**/*.tsx", "**/*.js", "**/*.jsx"],
    ignores,
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "_" },
      ],
      "@typescript-eslint/no-floating-promises": ["error"],
      "@typescript-eslint/no-unused-expressions": "error",
      "@typescript-eslint/no-explicit-any": "off",
    },
  }
);
