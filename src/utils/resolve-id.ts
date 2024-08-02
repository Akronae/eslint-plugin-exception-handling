import { TSESTree } from "@typescript-eslint/utils";
import { isImportDeclaration } from "@/src/utils/ast-guards";
import { RuleContext } from "@typescript-eslint/utils/ts-eslint";
import { findIdentifierInParents } from "@/src/utils/find-identifier-in-parents";
import { resolveImportedId } from "./resolve-imported-id";

export function resolveId(
  id: TSESTree.Identifier | TSESTree.PrivateIdentifier,
  context: RuleContext<string, unknown[]>
) {
  const identifier = findIdentifierInParents(id.name, id);
  if (!identifier) return;
  if (isImportDeclaration(identifier?.parent?.parent)) {
    const idInParsed = resolveImportedId(context, identifier.parent.parent);
    if (!idInParsed?.id) return;

    return idInParsed;
  }
  return { id: identifier, context };
}
