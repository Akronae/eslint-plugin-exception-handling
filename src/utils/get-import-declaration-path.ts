import { TSESTree } from "@typescript-eslint/utils";
import { RuleContext } from "@typescript-eslint/utils/ts-eslint";
import { readFileSync } from "fs";
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

export function getImportDeclarationPath(
  context: RuleContext<string, unknown[]>,
  impt: TSESTree.ImportDeclaration
) {
  const from = context.physicalFilename;
  let to = impt.source.value;

  let ext = path.extname(to);
  if (ext === "") {
    ext = path.extname(from);
  }

  if (!to.startsWith(".")) {
    const project = context.parserOptions.project;
    if (project) {
      const tsconfig = readFileSync(project.toString(), "utf-8");
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
        return path.resolve(context.cwd, to + ext);
      }
    }

    // no relative path and no TS alias,
    // considering it as a node_module
    return `./node_modules/${to}`;
  }

  return path.resolve(path.dirname(from), to + ext);
}
