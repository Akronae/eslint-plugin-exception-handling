import { RuleModule } from "@typescript-eslint/utils/ts-eslint";
import { ESLint } from "eslint";
import { rules } from "./rules";
import noUnhandled from "./rules/no-unhandled";

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
      },
    },
  },
  rules,
};

export { rules };
