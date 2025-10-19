import { TSESTree } from "@typescript-eslint/types";
import { findInChildren } from "./find-in-children";
import { InferGuardType } from "./infer-guard-type";

export function findInParent<
  T extends TSESTree.Node,
  F extends (x: TSESTree.Node) => x is T
>(
  node: TSESTree.Node,
  predicate: F,
  filter?: (node: InferGuardType<F>) => boolean
): InferGuardType<F> | undefined {
  let parent: TSESTree.Node | undefined = node.parent;
  while (parent) {
    const found = findInChildren(parent, predicate, (x) => {
      return (
        x.range[0] < node.range[0] &&
        x.range[1] > node.range[1] &&
        (!filter || filter(x as InferGuardType<F>))
      );
    });
    if (found) {
      return found;
    }
    parent = parent.parent;
  }
  return undefined;
}
