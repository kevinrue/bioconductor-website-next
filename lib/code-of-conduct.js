// Source:
// <https://nextjs.org/learn/basics/dynamic-routes/render-markdown>

import path from "path";
import fs from "fs";
import matter from "gray-matter";

export function getAllCodeOfConductIds() {
  const cocDirectory = path.join(process.cwd(), "content", "code-of-conduct");
  const fileNames = fs.readdirSync(cocDirectory);
  return fileNames.map((fileName) => {
    return {
      params: {
        locale: fileName.replace(/\.md$/, ""),
      },
    };
  });
}

export async function getCodeOfConductData(locale) {
  const cocDirectory = path.join(process.cwd(), "content", "code-of-conduct");
  const fullPath = path.join(cocDirectory, `${locale}.md`);
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
