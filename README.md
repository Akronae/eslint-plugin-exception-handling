# eslint-plugin-exception-handling

10kB possibly unhandled exceptions linter.

![image](https://github.com/Akronae/eslint-plugin-exception-handling/assets/17302866/f77dd81a-09c5-4f41-a3f1-d017df1bb1b9)

# Installation

```bash
yarn add -D eslint-plugin-exception-handling
```

# Usage

Sample `eslint.config.js`:

For TypeScript:

```js
// @ts-check

import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import { plugin as ex } from "eslint-plugin-exception-handling";

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  { plugins: { ex }, rules: { "ex/no-unhandled": "error" } }
);
```

For JavaScript:

```js
import globals from "globals";
import pluginJs from "@eslint/js";
import { plugin as ex } from "eslint-plugin-exception-handling";

export default [
  { files: ["**/*.js"], languageOptions: { sourceType: "commonjs" } },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  { plugins: { ex } },
  { rules: { "ex/no-unhandled": "error" } },
];
```

# Limitations & Caveats

- This plugin only checks for functions that might throw exceptions. It does not check for functions that might return a rejected promise.
- Currently, only user-defined functions are checked. This means that built-in functions that might throw exceptions are not yet linted. I'm working on a feature for that, but it's quite a grind to list all the built-in functions that might throw exceptions. If you want to help feel free to open a PR.

# Rules

<!-- begin auto-generated rules list -->

| Name                                       | Description                                               |
| :----------------------------------------- | :-------------------------------------------------------- |
| [no-unhandled](docs/rules/no-unhandled.md) | Enforce handling of functions that might throw exceptions |

<!-- end auto-generated rules list -->
