import fs from "fs";

export async function isDir(path: string) {
  const stats = await fs.promises.stat(path);
  return stats.isDirectory();
}
