import {
  exploreChildren,
  findIdentifierInParents,
  findInChildren,
  findInParent,
  getFunctionId,
  isArrowFunctionExpression,
  isCallExpression,
  isCatchClause,
  isFunctionDeclaration,
  isFunctionExpression,
  isImportDeclaration,
  isMemberExpression,
  isMethodDefinition,
  isNewExpression,
  isObjectExpression,
  isPrivateIdentifier,
  isProperty,
  isThrowStatement,
  isTryStatement,
  isVariableDeclarator,
  resolveFunc,
} from "@/src/utils";
import { findIdentifiersInChildren } from "@/src/utils/find-identifiers-in-children";
import { getImportDeclaration } from "@/src/utils/get-import-declaration";
import { nativeThrowing } from "@/src/utils/native-throwing";
import { parse } from "@/src/utils/parse";
import { resolveClass } from "@/src/utils/resolve-class";
import { TSESTree } from "@typescript-eslint/utils";
import { isIdentifier } from "@typescript-eslint/utils/ast-utils";
import { RuleContext, SourceCode } from "@typescript-eslint/utils/ts-eslint";
import { readFileSync } from "fs";
import ts from "typescript";

const throwFunctions = new Set<string>();
const scannedFunctions = new Set<string>();

const getNodeId = (
  node: TSESTree.Node,
  context: RuleContext<string, unknown[]>,
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

function resolveMemberExprInlineFunc(
  prop: TSESTree.Identifier,
  _context: RuleContext<string, unknown[]>,
): TSESTree.FunctionExpression | TSESTree.ArrowFunctionExpression | undefined {
  const memberExpr = prop.parent;
  if (
    !isMemberExpression(memberExpr) ||
    memberExpr.property !== prop ||
    memberExpr.computed
  ) {
    return undefined;
  }
  if (!isIdentifier(memberExpr.object)) return undefined;

  const objId = findIdentifierInParents(
    memberExpr.object.name,
    memberExpr.object,
  );
  if (!objId?.parent || !isVariableDeclarator(objId.parent)) return undefined;
  const init = objId.parent.init;
  if (!isObjectExpression(init)) return undefined;

  for (const p of init.properties) {
    if (
      isProperty(p) &&
      isIdentifier(p.key) &&
      p.key.name === prop.name &&
      (isFunctionExpression(p.value) || isArrowFunctionExpression(p.value))
    ) {
      return p.value;
    }
  }
  return undefined;
}

export function canFuncThrow(
  node: TSESTree.Identifier | TSESTree.PrivateIdentifier,
  context: RuleContext<string, unknown[]>,
): boolean {
  const nodeId = getNodeId(node, context);
  if (checked[nodeId] != undefined) return checked[nodeId];
  const try_ = findInParent(node, isTryStatement);
  if (try_) {
    checked[nodeId] = false;
    return false;
  }

  if (isIdentifier(node)) {
    const inlineFunc = resolveMemberExprInlineFunc(node, context);
    if (inlineFunc !== undefined) {
      const scanRes = scanfunc(inlineFunc, context);
      checked[nodeId] = scanRes;
      return scanRes;
    }
  }

  const res = resolveFunc(node, context);
  if (res?.module) {
    const found = nativeThrowing.some(
      (x) => x.module === res.module && x.method === res.func.id?.name,
    );
    if (found) {
      checked[nodeId] = true;
      return true;
    }
  }
  if (!res?.func) {
    if (isIdentifier(node)) {
      const classMethod = resolveClassMethod(node, context);
      if (classMethod) {
        if (checked[nodeId] != true) checked[nodeId] = false;
        const scanRes = scanfunc(classMethod.func, classMethod.context);
        checked[nodeId] = scanRes;
        return scanRes;
      }
      const importedFunc = resolveImportedFunc(node, context);
      if (importedFunc) {
        if (checked[nodeId] != true) checked[nodeId] = false;
        const scanRes = scanfunc(importedFunc.func, importedFunc.context);
        checked[nodeId] = scanRes;
        return scanRes;
      }
    }
    checked[nodeId] = false;
    return false;
  }

  if (checked[nodeId] != true) checked[nodeId] = false;
  const scanRes = scanfunc(res.func, res.context);
  checked[nodeId] = scanRes;
  return scanRes;
}

function resolveClassMethod(
  node: TSESTree.Identifier,
  context: RuleContext<string, unknown[]>,
): { func: TSESTree.FunctionExpression; context: RuleContext<string, unknown[]> } | undefined {
  const memberExpr = node.parent;
  if (
    !isMemberExpression(memberExpr) ||
    memberExpr.property !== node ||
    memberExpr.computed
  ) {
    return undefined;
  }
  if (!isIdentifier(memberExpr.object)) return undefined;
  const objectId = memberExpr.object;

  const objDecl = findIdentifierInParents(objectId.name, objectId);
  if (!objDecl?.parent || !isVariableDeclarator(objDecl.parent)) return undefined;

  const init = objDecl.parent.init;
  if (!isNewExpression(init) || !isIdentifier(init.callee)) return undefined;

  const classResolved = resolveClass(init.callee, context);
  if (!classResolved) return undefined;

  const methodDef = classResolved.class.body.body.find(
    (m): m is TSESTree.MethodDefinition =>
      isMethodDefinition(m) &&
      (isIdentifier(m.key) || isPrivateIdentifier(m.key)) &&
      m.key.name === node.name &&
      isFunctionExpression(m.value),
  );
  if (!methodDef) return undefined;

  return {
    func: methodDef.value as TSESTree.FunctionExpression,
    context: classResolved.context,
  };
}

function buildImportedFileContext(
  context: RuleContext<string, unknown[]>,
  impt: TSESTree.ImportDeclaration,
): RuleContext<string, unknown[]> | undefined {
  const imp = getImportDeclaration(context, impt);
  if (!imp.path || imp.path.startsWith("./node_modules")) return undefined;
  let content = "";
  try {
    content = readFileSync(imp.path, "utf-8");
  } catch {
    return undefined;
  }
  const parsed = parse(
    ts.createSourceFile(imp.path, content, ts.ScriptTarget.Latest),
    context,
  );
  return {
    ...context,
    physicalFilename: imp.path,
    sourceCode: new SourceCode(content, parsed),
    parser: (context as any).parser,
    parserOptions: context.parserOptions,
    cwd: context.cwd,
    id: context.id,
    languageOptions: context.languageOptions,
    parserPath: context.parserPath,
    report: context.report,
    settings: context.settings,
  } as RuleContext<string, unknown[]>;
}

function resolveImportedFunc(
  node: TSESTree.Identifier,
  context: RuleContext<string, unknown[]>,
): { func: TSESTree.FunctionDeclaration; context: RuleContext<string, unknown[]> } | undefined {
  const memberExpr = node.parent;
  if (!isMemberExpression(memberExpr) || memberExpr.property !== node) {
    return undefined;
  }

  // Find the root identifier of the member expression chain (e.g., 'obj' in obj.deep[1].b)
  let obj: TSESTree.Node = memberExpr.object;
  while (isMemberExpression(obj)) {
    obj = (obj as TSESTree.MemberExpression).object;
  }
  if (!isIdentifier(obj)) return undefined;

  // Find the import declaration for the root identifier by searching top-level imports
  const importDecl = findImportDeclForName(obj.name, context);
  if (!importDecl) return undefined;

  // Parse the imported file directly
  const importedFileContext = buildImportedFileContext(context, importDecl);
  if (!importedFileContext) return undefined;

  // Find function declarations named node.name in the imported file
  const parsedBody = (importedFileContext.sourceCode as any).ast
    .body as TSESTree.Statement[];
  const funcIds = findIdentifiersInChildren(node.name, parsedBody).filter(
    (id) =>
      isFunctionDeclaration(id.parent) &&
      (id.parent as TSESTree.FunctionDeclaration).id === id,
  );
  if (!funcIds.length) return undefined;

  return {
    func: funcIds[0].parent as TSESTree.FunctionDeclaration,
    context: importedFileContext,
  };
}

function findImportDeclForName(
  name: string,
  context: RuleContext<string, unknown[]>,
): TSESTree.ImportDeclaration | undefined {
  const program = (context.sourceCode as any).ast as TSESTree.Program;
  for (const stmt of program.body) {
    if (isImportDeclaration(stmt)) {
      for (const specifier of stmt.specifiers) {
        if (
          (specifier.type === "ImportSpecifier" ||
            specifier.type === "ImportDefaultSpecifier") &&
          isIdentifier(specifier.local) &&
          specifier.local.name === name
        ) {
          return stmt;
        }
      }
    }
  }
  return undefined;
}

function scanfunc(
  node:
    | TSESTree.FunctionDeclaration
    | TSESTree.FunctionExpression
    | TSESTree.ArrowFunctionExpression,
  context: RuleContext<string, unknown[]>,
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
