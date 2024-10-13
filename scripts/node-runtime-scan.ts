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
import { findInChildrenAll } from "@/src/utils/find-in-children-all";

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

for (const assert of asserts) {
  const arg = assert.arguments[0];
  const calls = findInChildrenAll(arg, isCallExpression);
  if (calls.length > 1) {
    throw new Error(
      "Multiple calls in assert, cannot determine which one would throw"
    );
  }
  if (calls.length === 0) {
    throw new Error("No calls in assert, cannot determine what would throw");
  }

  const call = calls[0];

  const id = findInChildren(call, isIdentifier);
  if (!id) {
    throw new Error("No identifier in call expression");
  }

  console.log({ id });

  const decl = findInParent(
    call,
    isVariableDeclarator,
    (x) => isIdentifier(x.id) && x.id.name === id.name
  );

  if (!decl) {
    throw new Error("No variable declarator up call expression");
  }

  if (decl.init?.type == "NewExpression") {
    const callee = decl.init.callee;
    if (!isIdentifier(callee)) {
      throw new Error("Not an identifier");
    }
  } else {
    throw new Error("Not a new expression");
  }
}
