// Source:
// <https://nextjs.org/learn/basics/dynamic-routes/render-markdown>
import path from "path";
import fs from "fs";
import matter from "gray-matter";

export function getAllPostIds() {
  const postsDirectory = path.join(process.cwd(), "content", "posts");
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, ""),
      },
    };
  });
}

export async function getPostData(id) {
  const postsDirectory = path.join(process.cwd(), "content", "posts");
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);

  // Use remark to convert markdown into HTML string
  const content = matterResult.content;

  // Combine the data with the id and contentHtml
  return {
    id,
    content,
    ...matterResult.data,
  };
}
