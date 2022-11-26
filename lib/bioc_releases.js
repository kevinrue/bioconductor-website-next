import path from "path";
import fs from "fs";

export async function getReleasesData() {
  const jsonDirectory = path.join(process.cwd(), "json");
  const releaseDirectories = fs
    .readdirSync(jsonDirectory, { withFileTypes: true })
    .filter((item) => item.isDirectory())
    .map((item) => item.name);

  // Return the list of directories
  return {
    directories: releaseDirectories,
  };
}
