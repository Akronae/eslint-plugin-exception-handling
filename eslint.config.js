// @ts-check

import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import { plugin as ex } from "./dist/index.mjs";

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  { plugins: { ex }, rules: { "ex/my-rule": "error" } }
);
