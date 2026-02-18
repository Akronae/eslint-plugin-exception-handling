import { TSESTree } from "@typescript-eslint/utils";
import { RuleContext } from "@typescript-eslint/utils/ts-eslint";
import { existsSync, lstatSync, readFileSync } from "fs";
import path, { dirname, join } from "path";

function cleanTsConfig(content: string) {
  return (
    content
      // Remove comments
      .replace(
        /(?:\r\n|\n|^)(?:[^'"])*?(?:'(?:[^\r\n\\']|\\'|[\\]{2})*'|"(?:[^\r\n\\"]|\\"|[\\]{2})*")*?(?:[^'"])*?(\/\*(?:[\s\S]*?)\*\/|\/\/.*)/g,
        "",
      )
      // Remove trailing commas
      .replace(/,(\s+\])/gm, "$1")
      .replace(/,(\s+\})/gm, "$1")
  );
}

function resolveTSAlias(tsconfigpath: string, to: string, cwd: string) {
  const tsconfig = readFileSync(tsconfigpath, "utf-8");
  const aliases = (JSON.parse(cleanTsConfig(tsconfig)).compilerOptions?.paths ??
    {}) as Record<string, string[]>;

  const res = Object.entries(aliases)
    // sorting by longest - most qualified - alias
    .sort((a, b) => b[0].length - a[0].length)
    .find(
      ([key]) => to.startsWith(key) || to.startsWith(key.replace(/\*$/, "")),
    );

  if (res) {
    // eslint-disable-next-line prefer-const
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

export function getImportDeclaration(
  context: RuleContext<string, unknown[]>,
  impt: TSESTree.ImportDeclaration,
) {
  const from = context.physicalFilename;
  let to = impt.source.value;

  let res: string | null = null;

  if (!to.startsWith(".")) {
    let { project, tsconfigRootDir } =
      context.parserOptions ?? context.languageOptions?.parserOptions;

    if (project || tsconfigRootDir) {
      if (project === true || !project) project = "./tsconfig.json";
      if (Array.isArray(project)) project = project[0];
      if (!tsconfigRootDir) tsconfigRootDir = context.cwd;
      if (!lstatSync(tsconfigRootDir).isDirectory()) {
        tsconfigRootDir = dirname(tsconfigRootDir);
      }

      to = resolveTSAlias(join(tsconfigRootDir, project), to, context.cwd);
      res = to;
    }

    if (!to.startsWith(".") && !to.startsWith("/")) {
      const split = to.split(":");
      if (!existsSync(to)) {
        return { module: split.at(-1), protocol: split.at(-2) };
      }
      // no relative path and no TS alias,
      // considering it as a node_module
      return { path: `./node_modules/${to}`, module: to };
    }
  } else if (!to.startsWith("/")) {
    res = path.resolve(path.dirname(from), to);
  }

  if (!res) throw new Error(`Import path '${to}' could not resolved`);

  if (!endsWithAny(res, codeExt)) {
    res += path.extname(from);
  }

  if (!existsSync(res)) {
    if (res.endsWith(".js")) {
      res = findFileExtension(res.replace(".js", ""), [".jsx", ".ts", ".tsx"]);
    } else if (res.endsWith(".jsx")) {
      res = findFileExtension(res.replace(".jsx", ""), [".js", ".tsx", ".ts"]);
    } else if (res.endsWith(".ts")) {
      res = findFileExtension(res.replace(".ts", ""), [".tsx", ".js", ".jsx"]);
    } else if (res.endsWith(".tsx")) {
      res = findFileExtension(res.replace(".tsx", ""), [".ts", ".jsx", ".js"]);
    }
  }

  return { path: res, module: to };
}

function findFileExtension(extless: string, tries: string[]) {
  for (const ext of tries) {
    if (existsSync(extless + ext)) {
      return extless + ext;
    }
  }
  return null;
}
