import { TSESTree } from "@typescript-eslint/utils";
import {
  isFunctionDeclaration,
  isIdentifier,
  isImportDeclaration,
  isMemberExpression,
} from "@/src/utils";
import { RuleContext } from "@typescript-eslint/utils/ts-eslint";
import { findIdentifierInParents } from "../utils/find-identifier-in-parents";
import { resolveImportedFunc } from "../utils/resolve-imported-func";

export function resolveFunc(
  id: TSESTree.Identifier,
  context: RuleContext<string, unknown[]>
) {
  const identifier = findIdentifierInParents(id.name, id);
  if (isImportDeclaration(identifier?.parent?.parent)) {
    const funcInParsed = resolveImportedFunc(context, identifier.parent.parent);
    if (!funcInParsed?.func) return;

    return funcInParsed;
  } else if (isFunctionDeclaration(identifier?.parent)) {
    return { func: identifier.parent, context };
  }

  return null;
}
