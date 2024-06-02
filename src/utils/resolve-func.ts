import { TSESTree } from "@typescript-eslint/utils";
import {
  isFunctionDeclaration,
  isImportDeclaration,
} from "@/src/utils/ast-guards";
import { RuleContext } from "@typescript-eslint/utils/ts-eslint";
import { findIdentifierInParents } from "@/src/utils/find-identifier-in-parents";
import { resolveImportedFunc } from "@/src/utils/resolve-imported-func";

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
