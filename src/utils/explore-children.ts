import { TSESTree } from "@typescript-eslint/types";

export function exploreChildren<T>(
  node: TSESTree.Node,
  predicate: (
    _node: TSESTree.Node,
    _parent: TSESTree.Node | undefined,
    _resolve: (_args: T) => void
  ) => void
): T | undefined {
  const explore = (
    node: TSESTree.Node,
    parent?: TSESTree.Node
  ): T | undefined => {
    let rtrn = null;
    predicate(node, parent, (args) => {
      rtrn = args;
    });
    if (rtrn) return rtrn;
    for (const key in node) {
      if (key === "parent") continue;
      const val = node[key as keyof TSESTree.Node] as
        | TSESTree.Node
        | TSESTree.Node[]
        | undefined;
      if (val && typeof val === "object") {
        if (Array.isArray(val)) {
          for (const v of val) {
            if (v.type) {
              const res = explore(v, node);
              if (res) return res;
            }
          }
        } else if (val.type) {
          const res = explore(val, node);
          if (res) return res;
        }
      }
    }
  };
  return explore(node, node.parent);
}
