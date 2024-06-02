import { testFile } from "@/src/utils";
import rule from "./might-throw";

await testFile(
  "src/rules/might-throw/tests/basic-err.ts",
  [rule.name],
  [
    {
      messageId: "mightThrow",
      line: 12,
    },
  ]
);
await testFile("src/rules/might-throw/tests/basic-ok.ts", [rule.name], []);

await testFile(
  "src/rules/might-throw/tests/import-err.ts",
  [rule.name],
  [
    {
      messageId: "mightThrow",
      line: 10,
    },
  ]
);

await testFile("src/rules/might-throw/tests/import-ok.ts", [rule.name], []);
await testFile("src/rules/might-throw/tests/module-ok.ts", [rule.name], []);
