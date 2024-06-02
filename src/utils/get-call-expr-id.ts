import { TSESTree } from "@typescript-eslint/utils";
import { isIdentifier } from "@typescript-eslint/utils/ast-utils";
import { isMemberExpression } from "@/src/utils/ast-guards";

export function getCallExprId(called: TSESTree.CallExpression) {
  if (isIdentifier(called.callee)) {
    return called.callee;
  } else if (isMemberExpression(called.callee)) {
    if (isIdentifier(called.callee.property)) {
      return called.callee.property;
    } else {
      throw new Error(
        "Cannot handle non-identifier member expression property"
      );
    }
  }
}
