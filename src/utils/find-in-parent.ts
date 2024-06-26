import { TSESTree } from "@typescript-eslint/types";
import { InferGuardType } from "./infer-guard-type";

export function findInParent<
  T extends TSESTree.Node,
  F extends (x: TSESTree.Node) => x is T
>(node: TSESTree.Node, predicate: F): InferGuardType<F> | undefined {
  let parent: TSESTree.Node | undefined = node.parent;
  while (parent) {
    if (predicate(parent)) {
      return parent as InferGuardType<F>;
    }
    parent = parent.parent;
  }
  return undefined;
}
