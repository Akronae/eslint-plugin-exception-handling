import { testFile } from "@/src/utils/test-file";
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
await testFile(
  "src/rules/might-throw/tests/private-identifier-err.ts",
  [rule.name],
  [
    {
      messageId: "mightThrow",
      line: 9,
    },
  ]
);
await testFile(
  "src/rules/might-throw/tests/private-identifier-ok.ts",
  [rule.name],
  []
);
await testFile(
  "src/rules/might-throw/tests/native-modules-err.ts",
  [rule.name],
  [
    {
      messageId: "mightThrow",
      line: 3,
    },
  ]
);
await testFile(
  "src/rules/might-throw/tests/native-modules-ok.ts",
  [rule.name],
  []
);
