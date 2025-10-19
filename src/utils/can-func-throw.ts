import {
  exploreChildren,
  findInChildren,
  findInParent,
  getFunctionId,
  isCallExpression,
  isCatchClause,
  isThrowStatement,
  isTryStatement,
  resolveFunc,
} from "@/src/utils";
import { nativeThrowing } from "@/src/utils/native-throwing";
import { TSESTree } from "@typescript-eslint/utils";
import { isIdentifier } from "@typescript-eslint/utils/ast-utils";
import { RuleContext } from "@typescript-eslint/utils/ts-eslint";

const throwFunctions = new Set<string>();
const scannedFunctions = new Set<string>();

const getNodeId = (
  node: TSESTree.Node,
  context: RuleContext<string, unknown[]>
) =>
  [
    node.type,
    (node as any).name,
    (node as any).id?.name,
    node.loc?.start.line,
    node.loc?.end.line,
    node.loc?.start.column,
    node.loc?.end.column,
    context.filename,
  ].join(" ");

export function canFuncThrowClear() {
  throwFunctions.clear();
  scannedFunctions.clear();
}

const checked: Record<string, boolean> = {};

export function canFuncThrow(
  node: TSESTree.Identifier | TSESTree.PrivateIdentifier,
  context: RuleContext<string, unknown[]>
): boolean {
  const nodeId = getNodeId(node, context);
  if (checked[nodeId] != undefined) return checked[nodeId];
  const try_ = findInParent(node, isTryStatement);
  if (try_) {
    checked[nodeId] = false;
    return false;
  }

  const res = resolveFunc(node, context);
  if (res?.module) {
    const found = nativeThrowing.some(
      (x) => x.module === res.module && x.method === res.func.id?.name
    );
    if (found) {
      checked[nodeId] = true;
      return true;
    }
  }
  if (!res?.func) {
    checked[nodeId] = false;
    return false;
  }

  if (checked[nodeId] != true) checked[nodeId] = false;
  const scanRes = scanfunc(res.func, res.context);
  checked[nodeId] = scanRes;
  return scanRes;
}

function scanfunc(
  node: TSESTree.FunctionDeclaration,
  context: RuleContext<string, unknown[]>
): boolean {
  const throws = exploreChildren<boolean>(node, (child, parent_, resolve) => {
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

      throws = canFuncThrow(child.callee, context);
      if (throws) {
        if (node.id) throwFunctions.add(getFunctionId(context, node.id));
        resolve(true);
      }
    } else if (isThrowStatement(child) && node.id) {
      throwFunctions.add(getFunctionId(context, node.id));
      resolve(true);
    }
  });

  if (node.id) {
    scannedFunctions.add(getFunctionId(context, node.id));
    if (throws) {
      throwFunctions.add(getFunctionId(context, node.id));
    }
  }

  return !!throws;
}
