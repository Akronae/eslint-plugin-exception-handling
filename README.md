<p align="center">
	<img width="350" src="https://github.com/Akronae/eslint-plugin-exception-handling/assets/17302866/43524856-1de6-4dac-982f-47323ea82ee4">
</p>
<h1 align="center">
	<sup>eslint-plugin-exception-handling</sup>
	<br>
	<a href="https://npm.im/eslint-plugin-exception-handling"><img src="https://badgen.net/npm/v/eslint-plugin-exception-handling"></a> <a href="https://npm.im/eslint-plugin-exception-handling"><img src="https://badgen.net/npm/dm/eslint-plugin-exception-handling"></a>
</h1>

![image](https://github.com/Akronae/eslint-plugin-exception-handling/assets/17302866/f77dd81a-09c5-4f41-a3f1-d017df1bb1b9)

| no-unhandled                                                                                                                      | might-throw                                                                                                                      | use-error-cause                                                                                                            |
| --------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| ![no-unhandled](https://github.com/Akronae/eslint-plugin-exception-handling/assets/17302866/a5a1e70a-15f6-4e2b-b585-54846e9dc3ef) | ![might-throw](https://github.com/Akronae/eslint-plugin-exception-handling/assets/17302866/26ee8fb8-bd0e-4b72-bb3f-624635db9b0d) | ![cause](https://github.com/Akronae/eslint-plugin-exception-handling/assets/17302866/f813c112-2f6a-49e7-954c-cace2819d5e8) |

# Installation

```bash
yarn add -D eslint-plugin-exception-handling
```

```bash
npm i -D eslint-plugin-exception-handling
```

```bash
pnpm add -D eslint-plugin-exception-handling
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
