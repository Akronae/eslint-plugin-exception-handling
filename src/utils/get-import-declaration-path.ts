import { TSESTree } from "@typescript-eslint/utils";
import { RuleContext } from "@typescript-eslint/utils/ts-eslint";
import path from "path";

export function getImportDeclarationPath(
  context: RuleContext<string, unknown[]>,
  impt: TSESTree.ImportDeclaration
) {
  const from = context.physicalFilename;
  const to = impt.source.value;
  let ext = path.extname(to);
  if (ext === "") {
    ext = path.extname(from);
  }
  return path.resolve(path.dirname(from), to + ext);
}
