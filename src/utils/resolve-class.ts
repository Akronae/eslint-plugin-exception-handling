import { TSESTree } from "@typescript-eslint/utils";
import { isClassDeclaration } from "@/src/utils/ast-guards";
import { RuleContext } from "@typescript-eslint/utils/ts-eslint";
import { resolveId } from "./resolve-id";
import { findInParent } from "./find-in-parent";

export function resolveClass(
  id: TSESTree.Identifier | TSESTree.PrivateIdentifier,
  context: RuleContext<string, unknown[]>
) {
  const resolved = resolveId(id, context);
  if (!resolved) return;
  const class_ = findInParent(resolved.id, isClassDeclaration);
  if (!class_) return;
  return { class: class_, context: resolved.context };
}
