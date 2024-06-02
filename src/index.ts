import { RuleModule } from "@typescript-eslint/utils/ts-eslint";
import { ESLint } from "eslint";
import { rules } from "./rules";
import noUnhandled from "./rules/no-unhandled/no-unhandled";
import mightThrow from "./rules/might-throw/might-throw";
import useErrorCause from "./rules/use-error-cause/use-error-cause";

type RuleKey = keyof typeof rules;

interface Plugin extends Omit<ESLint.Plugin, "rules"> {
  rules: Record<RuleKey, RuleModule<string>>;
}

export const name = "eslint-plugin-exception-handling";
export const plugin: Plugin = {
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
  rules,
};

export { rules };
