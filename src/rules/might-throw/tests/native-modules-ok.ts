import { readFileSync } from "fs";

try {
  const content = readFileSync("this file does not exist", "utf-8");
  console.log({ content });
} catch (e) {
  console.error(e);
}
