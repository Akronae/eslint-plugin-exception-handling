import { readFile } from "fs/promises";

async function a() {
  await readFile("./test.txt", "utf-8");
}

a();
