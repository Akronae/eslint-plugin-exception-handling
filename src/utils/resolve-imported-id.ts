import { TSESTree } from "@typescript-eslint/utils";
import { isExportNamedDeclaration } from "@/src/utils/ast-guards";
import { RuleContext, SourceCode } from "@typescript-eslint/utils/ts-eslint";
import { parse } from "@/src/utils/parse";
import { findIdentifiersInChildren } from "@/src/utils/find-identifiers-in-children";
import { readFileSync } from "fs";
import { getImportDeclarationPath } from "@/src/utils/get-import-declaration-path";

export function resolveImportedId(
  context: RuleContext<string, unknown[]>,
  impt: TSESTree.ImportDeclaration
) {
  const importPath = getImportDeclarationPath(context, impt);
  if (importPath.startsWith("./node_modules")) return;
  let content = "";
  try {
    content = readFileSync(importPath, "utf-8");
  } catch (e) {
    console.error(`Could not read file ${importPath}`);
    console.error(e);
    return;
  }
  const parsed = parse(content, context);
  const identifierInParsed = findIdentifiersInChildren(
    impt.specifiers[0].local.name,
    parsed.body
  ).find((x) => isExportNamedDeclaration(x.parent.parent));
  if (!identifierInParsed) return;

  const ctxParsed = {
    ...context,
    physicalFilename: importPath,
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

  return { id: identifierInParsed, context: ctxParsed };
}
