import { readdir, readFile } from "fs/promises";
import { join, resolve } from "path";
import { parse } from "espree";
import {
  exploreChildren,
  findInChildren,
  findInParent,
  isCallExpression,
  isIdentifier,
  isMemberExpression,
  isVariableDeclarator,
} from "../src/utils";
import { TSESTree } from "@typescript-eslint/types";

const dir = resolve("..", "node-main");
const testfiles = await readdir(join(dir, "test"), {
  recursive: true,
  withFileTypes: true,
}).then((x) =>
  x
    .filter((x) => x.isFile() && x.name.endsWith(".js"))
    .map((x) => join(x.parentPath ?? x.path, x.name))
);
const content = await readFile(testfiles[30], "utf-8");
const parsed = parse(content, { ecmaVersion: 2022 });
const asserts: TSESTree.CallExpression[] = [];
const imports: TSESTree.VariableDeclarator[] = [];

exploreChildren(parsed.body as any, (node, parent) => {
  node.parent = parent;
  if (
    isIdentifier(node) &&
    node.name === "throws" &&
    isMemberExpression(node.parent) &&
    isIdentifier(node.parent.object) &&
    node.parent.object.name === "assert"
  ) {
    console.log(node);
    const ca = findInParent(node, isCallExpression);
    if (!ca) return;
    asserts.push(ca);
  }

  if (
    isIdentifier(node) &&
    node.name == "require" &&
    isCallExpression(parent)
  ) {
    const de = findInParent(parent, isVariableDeclarator);
    if (!de) return;
    imports.push(de);
  }
});

console.log(imports);
