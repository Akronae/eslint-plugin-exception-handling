import { createHash } from "node:crypto";

function hashFile(filePath: string, outputFile?: string) {
  const hash = createHash("sha256");
  const digest = hash.digest("hex");
  console.log(digest);
}
