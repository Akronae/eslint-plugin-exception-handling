import { RuleContext, SourceCode } from "@typescript-eslint/utils/ts-eslint";
import { exploreChildren } from "./explore-children";
import { SourceFile } from "typescript";

function omitNullish<T extends object>(obj: T): T {
  return Object.fromEntries(
    Object.entries(obj).filter(([, value]) => value != null)
  ) as T;
}

export function parse(
  source: SourceFile,
  context: RuleContext<string, unknown[]>
): SourceCode.Program {
  const opts = context.languageOptions;
  const parsed = (opts.parser as any).parseForESLint(
    source.text,
    omitNullish({
      parser: opts.parserOptions,
      filePath: source.fileName,
      loc: true,
      range: true,
      tokens: true,
      comment: true,
    })
  );

  const ast: SourceCode.Program = parsed.ast;

  exploreChildren(ast, (node, parent) => {
    node.parent = parent;
  });

  return ast;
}
