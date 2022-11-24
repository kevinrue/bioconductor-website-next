// Source:
// <https://nextjs.org/learn/basics/dynamic-routes/render-markdown>

import path from "path";
import fs from "fs";
import matter from "gray-matter";

export async function getCocData() {
  const postsDirectory = path.join(process.cwd(), "coc");
  const fullPath = path.join(postsDirectory, `en-US.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);

  // Use remark to convert markdown into HTML string
  const content = matterResult.content;

  // Combine the data with the id and contentHtml
  return {
    content,
    ...matterResult.data,
  };
}
