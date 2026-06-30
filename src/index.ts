import { ESLint } from "eslint";
import { rules } from "./rules";
import noUnhandled from "./rules/no-unhandled/no-unhandled";
import mightThrow from "./rules/might-throw/might-throw";
import useErrorCause from "./rules/use-error-cause/use-error-cause";

export const name = "eslint-plugin-exception-handling";

export const plugin: ESLint.Plugin = {
  meta: {
    name,
    version: "1.0.0",
  },
  configs: {
    recommended: {
      plugins: [name],
      rules: {
        [`${name}/${noUnhandled.name}`]: "error",
        [`${name}/${mightThrow.name}`]: "off",
        [`${name}/${useErrorCause.name}`]: "warn",
      },
    },
  },
  rules: rules as unknown as ESLint.Plugin["rules"],
};

export { rules };
