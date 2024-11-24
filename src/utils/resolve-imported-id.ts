import { TSESTree } from "@typescript-eslint/utils";
import { isExportNamedDeclaration, isIdentifier } from "@/src/utils/ast-guards";
import { RuleContext, SourceCode } from "@typescript-eslint/utils/ts-eslint";
import { parse } from "@/src/utils/parse";
import { findIdentifiersInChildren } from "@/src/utils/find-identifiers-in-children";
import { readFileSync } from "fs";
import { getImportDeclaration } from "@/src/utils/get-import-declaration";
import { findInChildren } from "./find-in-children";
import ts from "typescript";
const { createSourceFile, ScriptTarget } = ts;

export function resolveImportedId(
  context: RuleContext<string, unknown[]>,
  impt: TSESTree.ImportDeclaration
) {
  const imp = getImportDeclaration(context, impt);
  if (!imp.path || imp.path.startsWith("./node_modules")) {
    const id = impt.specifiers[0].local;

    return {
      id: findInChildren(
        parse(
          createSourceFile(
            "untitled.js",
            `export function ${id.name}() {}`,
            ScriptTarget.Latest
          ),
          context
        ),
        isIdentifier
      ),
      module: imp.module,
      protocol: imp.protocol,
      context,
    };
  }
  let content = "";
  try {
    content = readFileSync(imp.path, "utf-8");
  } catch (e) {
    console.error(`Could not read file ${imp}`);
    console.error(e);
    return;
  }
  const parsed = parse(
    createSourceFile(imp.path, content, ScriptTarget.Latest),
    context
  );
  const identifierInParsed = findIdentifiersInChildren(
    impt.specifiers[0].local.name,
    parsed.body
  ).find((x) => isExportNamedDeclaration(x.parent.parent));
  if (!identifierInParsed) return;

  const ctxParsed = {
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
  };

  return {
    id: identifierInParsed,
    module: imp.module,
    protocol: imp.protocol,
    context: ctxParsed,
  };
}
