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

# TODO
- Add an option to only lint if there is no function further up the stack with no try-catch, instead of linting if the direct calling function has no try-catch

# Rules

<!-- begin auto-generated rules list -->

| Name                                             | Description                                                                                                                                                                                                   |
| :----------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [might-throw](docs/rules/might-throw.md)         | Warns about function calls that might throw exceptions.                                                                                                                                                       |
| [no-unhandled](docs/rules/no-unhandled.md)       | Warns about function calls that might throw exceptions and are not handled at all further up the stack.                                                                                                       |
| [use-error-cause](docs/rules/use-error-cause.md) | On `Error` re-thrown, forces the use of `cause` property in order to preserve stack traces. See: [Error: cause](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error/cause) |

<!-- end auto-generated rules list -->
