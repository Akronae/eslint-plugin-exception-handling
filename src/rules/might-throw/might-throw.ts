import { findInParent, isFunctionDeclaration } from "@/src/utils";
import { getFunctionId } from "@/src/utils/get-function-id";
import { getCallExprId } from "@/src/utils/get-call-expr-id";
import { createRule } from "@/src/rules/create-rule";
import { canFuncThrow } from "@/src/rules/no-unhandled";

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
        const throwing = canFuncThrow(id, context);
        if (!throwing) return;

        context.report({
          node,
          messageId: "mightThrow",
          data: {
            name: id.name,
          },
        });
      },
    };
  },
});

export default { name, rule };
