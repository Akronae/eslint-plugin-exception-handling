import { existsSync } from "fs";

export function hashFile() {
  if (!existsSync("fullPath")) {
    console.error(`File not found: ${"fullPath"}`);
    process.exit(1);
  }
}
