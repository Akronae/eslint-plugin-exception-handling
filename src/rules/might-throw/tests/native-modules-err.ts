import { readFileSync } from "fs";

const content = readFileSync("this file does not exist", "utf-8");
console.log({ content });
