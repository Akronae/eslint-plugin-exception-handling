import { TSESTree } from "@typescript-eslint/utils";
import { findIdentifiersInChildren } from "./find-identifiers-in-children";

export const findIdentifierInParents = (
  name: string,
  node: TSESTree.Node
): TSESTree.Identifier | null => {
  if (!node.parent) return null;
  const ids = findIdentifiersInChildren(name, [node.parent]);
  if (ids.length) {
    return ids[0];
  }
  return findIdentifierInParents(name, node.parent);
};
