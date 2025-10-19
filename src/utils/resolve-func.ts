import { isFunctionDeclaration } from "@/src/utils/ast-guards";
import { TSESTree } from "@typescript-eslint/utils";
import { RuleContext } from "@typescript-eslint/utils/ts-eslint";
import { findInParent } from "./find-in-parent";
import { resolveId } from "./resolve-id";

export function resolveFunc(
  id: TSESTree.Identifier | TSESTree.PrivateIdentifier,
  context: RuleContext<string, unknown[]>
) {
  const resolved = resolveId(id, context);
  if (!resolved?.id) return;
  const func = findInParent(resolved.id, isFunctionDeclaration);
  if (!func) return;
  return {
    func,
    module: resolved.module,
    protocol: resolved.protocol,
    context: resolved.context,
  };
}
