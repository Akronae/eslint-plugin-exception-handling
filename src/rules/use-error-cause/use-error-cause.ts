import { ESLintUtils, TSESTree } from "@typescript-eslint/utils";
import {
  findInParent,
  isCatchClause,
  isIdentifier,
  isNewExpression,
  isObjectExpression,
  isProperty,
} from "@/src/utils";
import { createRule } from "../create-rule";

const name = "use-error-cause";
const rule = createRule({
  name,
  meta: {
    docs: {
      description:
        "On `Error` re-thrown, forces the use of `cause` property in order to preserve stack traces.",
    },
    type: "suggestion",
    messages: {
      noCause:
        "Use `cause` property when re-throwing, `Error(message, { cause: {{name}} })`.",
    },
    schema: [],
  },
  defaultOptions: [],
  create: (context) => {
    return {
      ThrowStatement(node) {
        const catch_ = findInParent(node, isCatchClause);
        if (!catch_) return;
        if (!isIdentifier(catch_.param)) return;
        if (!isNewExpression(node.argument)) return;
        const arg = node.argument as TSESTree.NewExpression;
        if (isObjectExpression(arg.arguments[1])) {
          const hasCauseProp = arg.arguments[1].properties.some(
            (p) =>
              isProperty(p) && isIdentifier(p.key) && p.key.name === "cause"
          );
          if (hasCauseProp) {
            return;
          }
        }
        context.report({
          node,
          messageId: "noCause",
          data: {
            name: catch_.param.name,
          },
        });
      },
    };
  },
});

export default { name, rule };
