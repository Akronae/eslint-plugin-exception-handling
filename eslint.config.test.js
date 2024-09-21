// @ts-check

import tseslint from "typescript-eslint";
import { plugin as ex } from "./dist/index.mjs";
import config from "./eslint.config.js";

const ignores = [
  "node_modules",
  "dist",
  "docs",
  "**/*.d.ts",
  "eslint.config.js",
  "vitest.config.js",
];

export default tseslint.config(...config.map((x) => ({ ...x, ignores })), {
  plugins: { ex },
  rules: {
    "ex/no-unhandled": "error",
    "ex/might-throw": "warn",
    "ex/use-error-cause": "warn",
  },
});
