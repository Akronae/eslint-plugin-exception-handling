import { testFile } from "@/src/utils/test-file";
import rule from "./use-error-cause";

await testFile("src/rules/use-error-cause/tests/basic-ok.ts", [rule.name], []);
await testFile(
  "src/rules/use-error-cause/tests/basic-err.ts",
  [rule.name],
  [
    {
      messageId: "noCause",
      line: 35,
    },
  ]
);

await testFile("src/rules/use-error-cause/tests/import-ok.ts", [rule.name], []);
await testFile(
  "src/rules/use-error-cause/tests/import-err.ts",
  [rule.name],
  [
    {
      messageId: "noCause",
      line: 33,
    },
  ]
);
