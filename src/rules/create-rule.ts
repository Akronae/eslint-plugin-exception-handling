import { ESLintUtils } from "@typescript-eslint/utils";

const website =
  "https://github.com/Akronae/eslint-plugin-exception-handling/tree/main/docs/rules";

export const createRule = ESLintUtils.RuleCreator(
  (name) => `${website}/${name}.md`
);
