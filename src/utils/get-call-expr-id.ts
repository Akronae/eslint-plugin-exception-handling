import { TSESTree } from "@typescript-eslint/utils";
import {
  isIdentifier,
  isMemberExpression,
  isPrivateIdentifier,
} from "@/src/utils/ast-guards";

export function getCallExprId(called: TSESTree.CallExpression) {
  if (isIdentifier(called.callee)) {
    return called.callee;
  } else if (isMemberExpression(called.callee)) {
    if (
      isIdentifier(called.callee.property) ||
      isPrivateIdentifier(called.callee.property)
    ) {
      return called.callee.property;
    } else {
      throw new Error(
        `Cannot handle non-identifier member expression property ${called.callee.property}`
      );
    }
  }
}
