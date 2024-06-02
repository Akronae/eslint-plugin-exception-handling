import { ESLintUtils } from "@typescript-eslint/utils";
import {
  findInParent,
  isFunctionDeclaration,
  isThrowStatement,
  isTryStatement,
} from "@/src/utils";
import { getFunctionId } from "../../utils/get-function-id";
import { resolveFunc } from "../../utils/resolve-func";
import { getCallExprId } from "../../utils/get-call-expr-id";
import { findInChildren } from "../../utils/find-in-children";
import { createRule } from "../create-rule";

const name = "might-throw";
const rule = createRule({
  name,
  meta: {
    docs: {
      description: "Warns about function calls that might throw exceptions.",
    },
    type: "suggestion",
    messages: {
      mightThrow: "'{{name}}' might throw an exception.",
    },
    schema: [],
  },
  defaultOptions: [],
  create: (context) => {
    const throwFunctions = new Set<string>();

    return {
      FunctionDeclaration(node) {
        if (node.id) {
          throwFunctions.delete(getFunctionId(context, node.id));
        }
      },
      ThrowStatement(node) {
        const parentFunc = findInParent(node, isFunctionDeclaration);
        if (parentFunc?.id) {
          throwFunctions.add(getFunctionId(context, parentFunc.id));
        }
      },
      CallExpression(node) {
        const id = getCallExprId(node);
        if (!id) return;
        const fun = resolveFunc(id, context);
        if (!fun?.func) return;
        const throwNode = findInChildren(fun.func, isThrowStatement);
        if (throwNode) {
          const tryNode = findInParent(node, isTryStatement);
          if (tryNode) return;

          context.report({
            node,
            messageId: "mightThrow",
            data: {
              name: id.name,
            },
          });
        }
      },
    };
  },
});

export default { name, rule };
