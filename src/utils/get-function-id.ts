import { TSESTree } from "@typescript-eslint/types";
import { RuleContext } from "@typescript-eslint/utils/ts-eslint";
import { isImportDeclaration, isImportSpecifier } from "./ast-guards";
import { getImportDeclarationPath } from "./get-import-declaration-path";

export function getFunctionId(
  context: RuleContext<string, unknown[]>,
  node: TSESTree.Identifier | TSESTree.ImportDeclaration
) {
  if (isImportDeclaration(node)) {
    const name = node.specifiers.find(isImportSpecifier)?.local.name;
    const fileName = getImportDeclarationPath(context, node);
    return `${fileName}#${name}`;
  }
  return `${context.physicalFilename}#${node.name}`;
}
