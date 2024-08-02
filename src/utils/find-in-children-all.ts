import { TSESTree } from "@typescript-eslint/types";
import { InferGuardType } from "./infer-guard-type";
import { exploreChildren } from "./explore-children";

export function findInChildrenAll<
  T extends TSESTree.Node,
  F extends (x: TSESTree.Node) => x is T
>(node: TSESTree.Node, predicate: F) {
  const result: InferGuardType<F>[] = [];
  exploreChildren(node, (child) => {
    if (predicate(child)) {
      result.push(child as InferGuardType<F>);
    }
  });
  return result;
}
