import {
  isArrowFunctionExpression,
  isBlockStatement,
  isCallExpression,
  isClassDeclaration,
  isExportNamedDeclaration,
  isExpressionStatement,
  isFunctionDeclaration,
  isImportDeclaration,
  isImportSpecifier,
  isMemberExpression,
  isMethodDefinition,
  isProgram,
  isVariableDeclaration,
  isVariableDeclarator,
} from "@/src/utils/ast-guards";
import { TSESTree } from "@typescript-eslint/utils";
import { isIdentifier } from "@typescript-eslint/utils/ast-utils";

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
    } else if (isClassDeclaration(node)) {
      if (node.id) {
        identifiers.push(...findIdentifiersInChildren(name, [node.id]));
      }
      for (const member of node.body.body) {
        if (isMethodDefinition(member)) {
          identifiers.push(...findIdentifiersInChildren(name, [member.key]));
        }
      }
    }
  }

  return identifiers;
};
