import { TSESTree } from "@typescript-eslint/types";
import { exploreChildren } from "./explore-children";
import { InferGuardType } from "./infer-guard-type";

export function findInChildrenAll<
  T extends TSESTree.Node,
  F extends (x: TSESTree.Node) => x is T
>(
  node: TSESTree.Node,
  predicate: F,
  filter?: (node: InferGuardType<F>) => boolean
) {
  const result: InferGuardType<F>[] = [];
  exploreChildren(node, (child) => {
    if (predicate(child) && (!filter || filter(child as InferGuardType<F>))) {
      result.push(child as InferGuardType<F>);
    }
  });
  return result;
}
