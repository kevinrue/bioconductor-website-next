import path from "path";
import fs from "fs";

export async function getReleasesData() {
  const postsDirectory = path.join(process.cwd(), "json");
  const fullPath = path.join(postsDirectory, "bioc_releases.json");
  const fileContents = fs.readFileSync(fullPath, "utf8");
  console.log(fileContents);
  // Combine the data with the id and contentHtml
  return {
    content: fileContents,
  };
}
