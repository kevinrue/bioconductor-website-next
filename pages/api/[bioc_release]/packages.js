// Sources:
// <https://vercel.com/guides/loading-static-file-nextjs-api-route>
import path from "path";
import { fs, promises } from "fs";

export default async function handler(req, res) {
  const { bioc_release } = req.query;
  //Find the absolute path of the json directory
  const jsonDirectory = path.join(process.cwd(), "json");
  //Bioc release directory
  const biocReleaseDirectory = path.join(
    jsonDirectory,
    "releases",
    bioc_release
  );
  try {
    fs.stat(biocReleaseDirectory);
  } catch (err) {
    throw `Package information unavailable for Bioconductor release ${bioc_release}`;
  }
  //Read the json data file packages.json
  const fileContents = await promises.readFile(
    biocReleaseDirectory + "/pkgs_basic_info.json",
    "utf8"
  );
  //Return the content of the data file in json format
  res.status(200).json(fileContents);
}
