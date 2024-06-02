import { TSESTree } from "@typescript-eslint/utils";
import { isIdentifier } from "@typescript-eslint/utils/ast-utils";
import {
  findInParent,
  isCallExpression,
  isFunctionDeclaration,
  isThrowStatement,
  isTryStatement,
  findInChildren,
  exploreChildren,
  getFunctionId,
  resolveFunc,
  getCallExprId,
  isCatchClause,
} from "@/src/utils";
import { RuleContext } from "@typescript-eslint/utils/ts-eslint";
import { createRule } from "@/src/rules/create-rule";

const throwFunctions = new Set<string>();
const scannedFunctions = new Set<string>();

const name = "no-unhandled";
const rule = createRule({
  name,
  meta: {
    docs: {
      description:
        "Warns about function calls that might throw exceptions and are not handled at all further up the stack.",
    },
    type: "suggestion",
    messages: {
      noUnhandled: "'{{name}}' might throw an exception and is not handled.",
    },
    schema: [],
  },
  defaultOptions: [],
  create: (context) => {
    throwFunctions.clear();
    scannedFunctions.clear();

    return {
      CallExpression(called) {
        const id = getCallExprId(called);
        if (!id) return;
        const throws = checkfunc(id, context);

        if (throws) {
          const parentFunction = findInParent(called, isFunctionDeclaration);
          const id = findInChildren(called, isIdentifier);
          if (!parentFunction?.id) {
            context.report({
              node: called,
              messageId: "noUnhandled",
              data: {
                name: id?.name,
              },
            });
          }
        }
      },
    };
  },
});

function checkfunc(
  node: TSESTree.Identifier,
  context: RuleContext<string, unknown[]>
): boolean {
  const try_ = findInParent(node, isTryStatement);
  if (try_) {
    return false;
  }

  const res = resolveFunc(node, context);
  if (!res?.func) return false;
  return scanfunc(res.func, res.context);
}

function scanfunc(
  node: TSESTree.FunctionDeclaration,
  context: RuleContext<string, unknown[]>
): boolean {
  const throws = exploreChildren<boolean>(
    node,
    async (child, parent_, resolve) => {
      const try_ = findInParent(child, isTryStatement);
      if (try_) {
        const catch_ = findInChildren(try_.parent, isCatchClause);
        const throw_ = catch_ && findInChildren(catch_, isThrowStatement);
        if (throw_) {
          resolve(true);
        }
        return;
      }

      if (isCallExpression(child) && isIdentifier(child.callee)) {
        let throws = false;

        if (scannedFunctions.has(getFunctionId(context, child.callee))) {
          throws = throwFunctions.has(getFunctionId(context, child.callee));

          if (throws) resolve(throws);
          return;
        }

        throws = checkfunc(child.callee, context);
        if (throws) {
          if (node.id) throwFunctions.add(getFunctionId(context, node.id));
          resolve(true);
        }
      } else if (isThrowStatement(child) && node.id) {
        throwFunctions.add(getFunctionId(context, node.id));
        resolve(true);
      }
    }
  );

  if (node.id) {
    scannedFunctions.add(getFunctionId(context, node.id));
    if (throws) {
      throwFunctions.add(getFunctionId(context, node.id));
    }
  }

  return !!throws;
}

export default { name, rule };
