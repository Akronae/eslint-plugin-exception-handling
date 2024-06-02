import { TSESTree } from "@typescript-eslint/types";
import { InferGuardType } from "./infer-guard-type";
import { exploreChildren } from "./explore-children";

export function findInChildren<
  T extends TSESTree.Node,
  F extends (x: TSESTree.Node) => x is T
>(node: TSESTree.Node, predicate: F): InferGuardType<F> | undefined {
  return exploreChildren(node, (child, _parent, resolve) => {
    if (predicate(child)) {
      resolve(child as InferGuardType<F>);
    }
  });
}
