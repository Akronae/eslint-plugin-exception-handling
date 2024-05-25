import * as vitest from "vitest";
import { RuleTester } from "@typescript-eslint/rule-tester";

RuleTester.afterAll = vitest.afterAll;
RuleTester.it = vitest.it;
RuleTester.itOnly = vitest.it.only;
RuleTester.describe = vitest.describe;

import myRule from "./no-unhandled";
import * as plugin from "..";

const ruleTester = new RuleTester({
  parser: "@typescript-eslint/parser",
  plugins: [plugin.name],
  rules: {
    [myRule.name]: "error",
  },
});

ruleTester.run(`${plugin.name}/${myRule.name}`, myRule.rule, {
  valid: [
    {
      // a code snippet that should pass the linter
      code: `const x = 5;`,
    },
    {
      code: `let y = 'abc123';`,
    },
    {
      code: `myFunction();`,
    },
    {
      code: `const a = new Error();`,
    },
  ],
  invalid: [
    {
      code: `throw new Error("heyyyy!");`,
      errors: [
        {
          messageId: "noUnhandled",
        },
      ],
    },
  ],
});
