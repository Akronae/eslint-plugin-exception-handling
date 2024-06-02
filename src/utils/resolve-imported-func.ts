import { TSESTree } from "@typescript-eslint/utils";
import {
  isExportNamedDeclaration,
  isFunctionDeclaration,
} from "@/src/utils/ast-guards";
import { RuleContext } from "@typescript-eslint/utils/ts-eslint";
import { parse } from "@/src/utils/parse";
import { findIdentifiersInChildren } from "@/src/utils/find-identifiers-in-children";
import { readFileSync } from "fs";
import { getImportDeclarationPath } from "@/src/utils/get-import-declaration-path";
import { findInParent } from "@/src/utils/find-in-parent";

export function resolveImportedFunc(
  context: RuleContext<string, unknown[]>,
  impt: TSESTree.ImportDeclaration
) {
  const importPath = getImportDeclarationPath(context, impt);
  const content = readFileSync(importPath, "utf-8");
  const parsed = parse(content, context);
  const identifierInParsed = findIdentifiersInChildren(
    impt.specifiers[0].local.name,
    parsed.body
  ).find(
    (x) =>
      isFunctionDeclaration(x.parent) &&
      isExportNamedDeclaration(x.parent.parent)
  );
  if (!identifierInParsed) return;
  const funcInParsed = findInParent(identifierInParsed, isFunctionDeclaration);

  const ctxParsed = {
    ...context,
    physicalFilename: importPath,
  };

  return { func: funcInParsed, context: ctxParsed };
}
