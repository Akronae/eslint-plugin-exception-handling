import { AST_NODE_TYPES, TSESTree } from "@typescript-eslint/types";

type Typed = TSESTree.Node | null | undefined;

export function isFunctionDeclaration(
  node: Typed
): node is TSESTree.FunctionDeclaration {
  return node != null && node.type === AST_NODE_TYPES.FunctionDeclaration;
}

export function isMemberExpression(
  node: Typed
): node is TSESTree.MemberExpression {
  return node != null && node.type === AST_NODE_TYPES.MemberExpression;
}

export function isTryStatement(node: Typed): node is TSESTree.TryStatement {
  return node != null && node.type === AST_NODE_TYPES.TryStatement;
}

export function isImportDeclaration(
  node: Typed
): node is TSESTree.ImportDeclaration {
  return node != null && node.type === AST_NODE_TYPES.ImportDeclaration;
}

export function isImportSpecifier(
  node: Typed
): node is TSESTree.ImportSpecifier {
  return node != null && node.type === AST_NODE_TYPES.ImportSpecifier;
}

export function isVariableDeclaration(
  node: Typed
): node is TSESTree.VariableDeclaration {
  return node != null && node.type === AST_NODE_TYPES.VariableDeclaration;
}

export function isVariableDeclarator(
  node: Typed
): node is TSESTree.VariableDeclarator {
  return node != null && node.type === AST_NODE_TYPES.VariableDeclarator;
}

export function isBlockStatement(node: Typed): node is TSESTree.BlockStatement {
  return node != null && node.type === AST_NODE_TYPES.BlockStatement;
}

export function isProgram(node: Typed): node is TSESTree.Program {
  return node != null && node.type === AST_NODE_TYPES.Program;
}

export function isExportNamedDeclaration(
  node: Typed
): node is TSESTree.ExportNamedDeclaration {
  return node != null && node.type === AST_NODE_TYPES.ExportNamedDeclaration;
}

export function isThrowStatement(node: Typed): node is TSESTree.ThrowStatement {
  return node != null && node.type === AST_NODE_TYPES.ThrowStatement;
}

export function isCallExpression(node: Typed): node is TSESTree.CallExpression {
  return node != null && node.type === AST_NODE_TYPES.CallExpression;
}

export function isIdentifier(node: Typed): node is TSESTree.Identifier {
  return node != null && node.type === AST_NODE_TYPES.Identifier;
}

export function isCatchClause(node: Typed): node is TSESTree.CatchClause {
  return node != null && node.type === AST_NODE_TYPES.CatchClause;
}

export function isNewExpression(node: Typed): node is TSESTree.NewExpression {
  return node != null && node.type === AST_NODE_TYPES.NewExpression;
}

export function isObjectExpression(
  node: Typed
): node is TSESTree.ObjectExpression {
  return node != null && node.type === AST_NODE_TYPES.ObjectExpression;
}

export function isProperty(node: Typed): node is TSESTree.Property {
  return node != null && node.type === AST_NODE_TYPES.Property;
}
