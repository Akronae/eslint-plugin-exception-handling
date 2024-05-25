import { AST_NODE_TYPES, TSESTree } from "@typescript-eslint/types";

export function isFunctionDeclaration(
  node: TSESTree.Node
): node is TSESTree.FunctionDeclaration {
  return node.type === AST_NODE_TYPES.FunctionDeclaration;
}

export function isMemberExpression(
  node: TSESTree.Node
): node is TSESTree.MemberExpression {
  return node.type === AST_NODE_TYPES.MemberExpression;
}

export function isTryStatement(
  node: TSESTree.Node
): node is TSESTree.TryStatement {
  return node.type === AST_NODE_TYPES.TryStatement;
}
