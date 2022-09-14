import fs from "fs";

export async function fileExists(path: string) {
  try {
    const stats = await fs.promises.stat(path);
    return stats.isFile();
  } catch (error) {
    return false;
  }
}
