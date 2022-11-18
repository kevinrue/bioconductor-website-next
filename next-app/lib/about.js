import { remark } from "remark";
import html from "remark-html";
import path from "path";
import fs from "fs";
import matter from "gray-matter";

export async function getAbout() {
  //Find the absolute path of the json directory
  const markdownDirectory = path.join(process.cwd(), "markdown");
  const fullPath = path.join(markdownDirectory, `about.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);
  // Use remark to convert markdown into HTML string
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  // Combine the data with the contentHtml
  return {
    contentHtml,
    ...matterResult.data,
  };
}
