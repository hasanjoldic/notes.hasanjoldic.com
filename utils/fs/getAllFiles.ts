import fs from "fs";
import path from "path";

export async function getAllFiles(targetPath: string) {
  try {
    const files: string[] = [];

    const readFiles = async (targetPath: string) => {
      const filenames = await fs.promises.readdir(targetPath);
      await Promise.all(
        filenames.map(async (filename) => {
          const nextPath = path.join(targetPath, filename);
          if ((await fs.promises.stat(nextPath)).isDirectory()) {
            return readFiles(nextPath);
          } else {
            return files.push(nextPath);
          }
        })
      );
    };

    await readFiles(targetPath);
    return files;
  } catch (err) {
    return [];
  }
}
