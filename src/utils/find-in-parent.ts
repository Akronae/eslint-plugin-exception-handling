import { TSESTree } from "@typescript-eslint/types";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type InferGuardType<T> = T extends (x: any) => x is infer G ? G : never;

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
