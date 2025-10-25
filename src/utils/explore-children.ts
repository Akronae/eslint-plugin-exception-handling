import { TSESTree } from "@typescript-eslint/types";

export function exploreChildren<T>(
  node: TSESTree.Node,
  predicate: (
    _node: TSESTree.Node,
    _parent: TSESTree.Node | undefined,
    _resolve: (_args: T) => void
  ) => void
): T | undefined {
  const explored = new Set<TSESTree.Node>();

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
            if (v?.type) {
              if (explored.has(v)) continue;
              explored.add(v);
              const res = explore(v, node);
              if (res) return res;
            }
          }
        } else if (val.type) {
          if (explored.has(val)) continue;
          explored.add(val);
          const res = explore(val, node);
          if (res) return res;
        }
      }
    }
  };
  return explore(node, node.parent);
}

// [
//   "body",
//   "params",
//   "callee",
//   "expression",
//   "arguments",
//   "block",
//   "handler",
//   "finalizer",
//   "specifiers",
//   "assertions",
//   "argument",
//   "property",
//   "id",
//   "object",
//   "attributes",
//   "declaration",
// ];
