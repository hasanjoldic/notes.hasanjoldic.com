import fs from "fs";

export async function readFileContents(path: string) {
  return fs.promises.readFile(path, "utf8");
}
