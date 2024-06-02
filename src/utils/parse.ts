import { RuleContext, SourceCode } from "@typescript-eslint/utils/ts-eslint";
import { exploreChildren } from "./explore-children";

function omitNullish<T extends {}>(obj: T): T {
  return Object.fromEntries(
    Object.entries(obj).filter(([, value]) => value != null)
  ) as T;
}

export function parse(
  code: string,
  context: RuleContext<string, unknown[]>
): SourceCode.Program {
  const opts = context.languageOptions;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const parsed = (opts.parser as any).parseForESLint(
    code,
    omitNullish({
      parser: opts.parserOptions,
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
