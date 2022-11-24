// Sources:
// <https://vercel.com/guides/loading-static-file-nextjs-api-route>
import path from 'path';
import { promises as fs } from 'fs';

export default async function handler(req, res) {
  const { bioc_release } = req.query
  //Find the absolute path of the json directory
  const jsonDirectory = path.join(process.cwd(), 'json');
  //Bioc release directory
  const biocReleaseDirectory = path.join(jsonDirectory, bioc_release);
  //Read the json data file packages.json
  const fileContents = await fs.readFile(biocReleaseDirectory + '/pkgs_biocviews.json', 'utf8');
  //Return the content of the data file in json format
  res.status(200).json(fileContents);
}
