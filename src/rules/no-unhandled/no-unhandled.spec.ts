import { testFile } from "@/src/utils/test-file";
import rule from "./no-unhandled";

await testFile(
  "src/rules/no-unhandled/tests/import-err.ts",
  [rule.name],
  [
    {
      messageId: "noUnhandled",
    },
  ]
);
await testFile("src/rules/no-unhandled/tests/import-ok.ts", [rule.name], []);
await testFile("src/rules/no-unhandled/tests/import-ok-2.ts", [rule.name], []);
await testFile("src/rules/no-unhandled/tests/basic-ok.ts", [rule.name], []);
await testFile(
  "src/rules/no-unhandled/tests/basic-err.ts",
  [rule.name],
  [
    {
      messageId: "noUnhandled",
    },
  ]
);
await testFile(
  "src/rules/no-unhandled/tests/basic-err-2.ts",
  [rule.name],
  [
    {
      messageId: "noUnhandled",
    },
    {
      messageId: "noUnhandled",
    },
    {
      messageId: "noUnhandled",
    },
  ]
);
await testFile(
  "src/rules/no-unhandled/tests/basic-err-3.ts",
  [rule.name],
  [
    {
      messageId: "noUnhandled",
    },
    {
      messageId: "noUnhandled",
    },
  ]
);
await testFile("src/rules/no-unhandled/tests/module-ok.ts", [rule.name], []);
await testFile(
  "src/rules/no-unhandled/tests/private-identifier-ok.ts",
  [rule.name],
  []
);
await testFile(
  "src/rules/no-unhandled/tests/private-identifier-err.ts",
  [rule.name],
  []
);
await testFile("src/rules/no-unhandled/tests/recursive-ok.ts", [rule.name], []);
await testFile(
  "src/rules/no-unhandled/tests/recursive-err.ts",
  [rule.name],
  [
    {
      messageId: "noUnhandled",
      line: 15,
    },
    {
      messageId: "noUnhandled",
      line: 16,
    },
  ]
);
await testFile(
  "src/rules/no-unhandled/tests/native-modules-err.ts",
  [rule.name],
  [
    {
      messageId: "noUnhandled",
      line: 3,
    },
  ]
);
await testFile(
  "src/rules/no-unhandled/tests/native-modules-ok.ts",
  [rule.name],
  []
);
await testFile(
  "src/rules/no-unhandled/tests/alias-err.ts",
  [rule.name],
  [
    {
      messageId: "noUnhandled",
      line: 54,
    },
  ]
);
await testFile("src/rules/no-unhandled/tests/alias-ok.ts", [rule.name], []);
