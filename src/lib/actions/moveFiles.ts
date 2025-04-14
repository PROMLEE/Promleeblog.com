"use server";

import { promises as fs } from "fs";
import path from "path";

type MoveFilesResult = {
  success: boolean;
  message: string;
  results?: Array<{
    file: string;
    success: boolean;
    error?: string;
  }>;
  error?: string;
};

export async function moveFiles(): Promise<MoveFilesResult> {
  const sourceDir = path.join(process.cwd(), "public/posts");
  const targetDir = path.join(process.cwd(), "../Promleeblog.com-Posts/posts");

  try {
    // Read all files in the source directory
    const files = await fs.readdir(sourceDir);

    // Filter out .mdx files and .DS_Store
    const filesToMove = files.filter(
      (file) => !file.endsWith(".mdx") && file !== ".DS_Store",
    );

    // Create target directory if it doesn't exist
    await fs.mkdir(targetDir, { recursive: true });

    // Move each file
    const results = [];
    for (const file of filesToMove) {
      const sourcePath = path.join(sourceDir, file);
      const targetPath = path.join(targetDir, file);

      try {
        await fs.rename(sourcePath, targetPath);
        results.push({ file, success: true });
      } catch (error: unknown) {
        const errorMessage =
          error instanceof Error ? error.message : "Unknown error occurred";
        results.push({ file, success: false, error: errorMessage });
      }
    }

    return {
      success: true,
      message: "파일 이동이 완료되었습니다.",
      results,
    };
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";
    return {
      success: false,
      message: "파일 이동 중 오류가 발생했습니다.",
      error: errorMessage,
    };
  }
}
