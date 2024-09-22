import { TSESTree } from "@typescript-eslint/utils";
import { isIdentifier } from "@typescript-eslint/utils/ast-utils";
import {
  isArrowFunctionExpression,
  isBlockStatement,
  isCallExpression,
  isExportNamedDeclaration,
  isExpressionStatement,
  isFunctionDeclaration,
  isImportDeclaration,
  isImportSpecifier,
  isMemberExpression,
  isProgram,
  isVariableDeclaration,
  isVariableDeclarator,
} from "@/src/utils/ast-guards";

export const findIdentifiersInChildren = (
  name: string,
  nodes: TSESTree.Node[]
): TSESTree.Identifier[] => {
  const identifiers: TSESTree.Identifier[] = [];
  for (const node of nodes) {
    if (isProgram(node)) {
      identifiers.push(...findIdentifiersInChildren(name, node.body));
    } else if (isIdentifier(node)) {
      if (node.name === name) {
        identifiers.push(node);
      }
    } else if (isFunctionDeclaration(node)) {
      if (node.id) {
        identifiers.push(...findIdentifiersInChildren(name, [node.id]));
      }
      identifiers.push(...findIdentifiersInChildren(name, node.body.body));
    } else if (isImportDeclaration(node)) {
      identifiers.push(...findIdentifiersInChildren(name, node.specifiers));
    } else if (isImportSpecifier(node)) {
      identifiers.push(...findIdentifiersInChildren(name, [node.local]));
    } else if (isVariableDeclaration(node)) {
      identifiers.push(...findIdentifiersInChildren(name, node.declarations));
    } else if (isVariableDeclarator(node)) {
      identifiers.push(...findIdentifiersInChildren(name, [node.id]));
    } else if (isBlockStatement(node)) {
      identifiers.push(...findIdentifiersInChildren(name, node.body));
    } else if (isExportNamedDeclaration(node) && node.declaration) {
      identifiers.push(...findIdentifiersInChildren(name, [node.declaration]));
    } else if (isArrowFunctionExpression(node)) {
      identifiers.push(...findIdentifiersInChildren(name, [node.body]));
    } else if (isExpressionStatement(node)) {
      identifiers.push(...findIdentifiersInChildren(name, [node.expression]));
    } else if (isCallExpression(node)) {
      identifiers.push(...findIdentifiersInChildren(name, [...node.arguments]));
    } else if (isMemberExpression(node)) {
      identifiers.push(
        ...findIdentifiersInChildren(name, [node.property, node.object])
      );
    }
  }

  return identifiers;
};
