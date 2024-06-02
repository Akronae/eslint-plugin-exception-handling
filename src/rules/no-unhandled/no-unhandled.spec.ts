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
