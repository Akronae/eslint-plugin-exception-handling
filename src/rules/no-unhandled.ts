import { ESLintUtils, TSESTree } from "@typescript-eslint/utils";
import { isIdentifier } from "@typescript-eslint/utils/ast-utils";
import {
  findInParent,
  isFunctionDeclaration,
  isMemberExpression,
  isTryStatement,
} from "@/src/utils";

const createRule = ESLintUtils.RuleCreator(
  (name) => `https://my-website.io/eslint/${name}`
);

let throwFunctions: Record<string, boolean> = {};

const name = "no-unhandled";
const rule = createRule({
  name,
  meta: {
    docs: {
      description: "Enforce handling of functions that might throw exceptions",
    },
    type: "suggestion",
    messages: {
      noUnhandled: "'{{name}}' might throw an exception and should be handled",
    },
    schema: [],
  },
  defaultOptions: [],
  create: (context) => {
    throwFunctions = {};

    return {
      FunctionDeclaration(node) {
        const name = node.id?.name;
        const path = `${context.physicalFilename}/${name}`;
        throwFunctions[path] = false;
      },
      ThrowStatement(node) {
        const func = findInParent(node, isFunctionDeclaration);
        if (!func) {
          return;
        }

        const name = func.id?.name;
        const path = `${context.physicalFilename}/${name}`;
        throwFunctions[path] = true;
      },
      CallExpression(node) {
        const handleIdentifier = (node: TSESTree.Identifier) => {
          const try_ = findInParent(node, isTryStatement);
          if (try_) {
            return;
          }

          const name = node.name;
          const path = `${context.physicalFilename}/${name}`;
          if (throwFunctions[path]) {
            context.report({
              node,
              messageId: "noUnhandled",
              data: {
                name,
              },
            });
          }
        };

        if (isIdentifier(node.callee)) {
          handleIdentifier(node.callee);
        }
        if (isMemberExpression(node.callee)) {
          if (isIdentifier(node.callee.property)) {
            handleIdentifier(node.callee.property);
          } else {
            throw new Error(
              "Cannot handle non-identifier member expression property"
            );
          }
        }
      },
    };
  },
});

export default { name, rule };
