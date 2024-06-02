import { TSESTree } from "@typescript-eslint/utils";
import { RuleContext } from "@typescript-eslint/utils/ts-eslint";
import { existsSync, readFileSync } from "fs";
import path from "path";

function cleanTsConfig(content: string) {
  return (
    content
      // Remove comments
      .replace(
        /(?:\r\n|\n|^)(?:[^'"])*?(?:'(?:[^\r\n\\']|\\'|[\\]{2})*'|"(?:[^\r\n\\"]|\\"|[\\]{2})*")*?(?:[^'"])*?(\/\*(?:[\s\S]*?)\*\/|\/\/.*)/g,
        ""
      )
      // Remove trailing commas
      .replace(/,(\s+\])/gm, "$1")
      .replace(/,(\s+\})/gm, "$1")
  );
}

function resolveTSAlias(tsconfigpath: string, to: string, cwd: string) {
  const tsconfig = readFileSync(tsconfigpath, "utf-8");
  const aliases = JSON.parse(cleanTsConfig(tsconfig)).compilerOptions
    .paths as Record<string, string[]>;

  let res = Object.entries(aliases)
    // sorting by longest - most qualified - alias
    .sort((a, b) => b[0].length - a[0].length)
    .find(
      ([key]) => to.startsWith(key) || to.startsWith(key.replace(/\*$/, ""))
    );

  if (res) {
    let [key, val] = res;
    key = key.replace(/\*$/, "");
    const firstVal = val[0].replace(/\*$/, "");
    to = to.replace(key, firstVal);
    to = path.resolve(cwd, to);
  }

  return to;
}

const codeExt = [".ts", ".js", ".tsx", ".jsx"];

function endsWithAny(str: string, arr: string[]) {
  return arr.some((ext) => str.endsWith(ext));
}

export function getImportDeclarationPath(
  context: RuleContext<string, unknown[]>,
  impt: TSESTree.ImportDeclaration
) {
  const from = context.physicalFilename;
  let to = impt.source.value;

  let res: string | null = null;

  if (!to.startsWith(".")) {
    const project = context.parserOptions.project;
    if (project) {
      to = resolveTSAlias(project.toString(), to, context.cwd);
    }

    if (!to.startsWith(".")) {
      // no relative path and no TS alias,
      // considering it as a node_module
      return `./node_modules/${to}`;
    }
  } else {
    res = path.resolve(path.dirname(from), to);
  }

  if (!res) throw new Error("Import path not resolved");

  if (!endsWithAny(res, codeExt)) {
    res += path.extname(from);
  }

  if (!existsSync(res)) {
    if (res.endsWith(".js")) {
      res = res.replace(".js", ".ts");
    }
  }

  return res;
}
