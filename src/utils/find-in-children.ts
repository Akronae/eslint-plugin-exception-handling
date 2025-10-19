import { TSESTree } from "@typescript-eslint/types";
import { InferGuardType } from "./infer-guard-type";
import { exploreChildren } from "./explore-children";

export function findInChildren<
  T extends TSESTree.Node,
  F extends (x: TSESTree.Node) => x is T
>(
  node: TSESTree.Node,
  predicate: F,
  filter?: (node: InferGuardType<F>) => boolean
): InferGuardType<F> | undefined {
  return exploreChildren(node, (child, _parent, resolve) => {
    if (predicate(child) && (!filter || filter(child as InferGuardType<F>))) {
      resolve(child as InferGuardType<F>);
    }
  });
}
