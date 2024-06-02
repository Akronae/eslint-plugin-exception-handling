import { RuleContext, SourceCode } from "@typescript-eslint/utils/ts-eslint";
import { exploreChildren } from "./explore-children";

export function parse(
  code: string,
  context: RuleContext<string, unknown[]>
): SourceCode.Program {
  const opts = context.languageOptions;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const parsed = (opts.parser as any).parseForESLint(code, {
    parser: opts.parserOptions,
  });

  const ast: SourceCode.Program = parsed.ast;

  exploreChildren(ast, (node, parent) => {
    node.parent = parent;
  });

  return ast;
}
