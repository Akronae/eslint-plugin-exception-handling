// @ts-check

import path from "path";
import tseslint from "typescript-eslint";
import { fileURLToPath } from "url";

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

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default tseslint.config(
  ...tseslint.configs.recommended.map((x) => ({ ...x, ignores })),
  {
    languageOptions: {
      parserOptions: {
        parser: "@typescript-eslint/parser",
        project: "./tsconfig.json",
        tsconfigRootDir: __dirname,
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
  },
);
