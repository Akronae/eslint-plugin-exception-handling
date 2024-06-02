// @ts-check

import tseslint from "typescript-eslint";
import config from "./eslint.config.js";

const ignores = [
  "node_modules",
  "dist",
  "docs",
  "**/*.d.ts",
  "eslint.config.js",
  "vitest.config.js",
];

export default tseslint.config(...config.map((x) => ({ ...x, ignores })));
