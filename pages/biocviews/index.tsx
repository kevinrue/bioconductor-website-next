import Head from "next/head";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeItem from '@mui/lab/TreeItem';
import useSWR from "swr";
// React
import { getReleasesData } from "../../lib/bioc_releases";
import {
  mapStringToBiocRelease,
  getBiocReleaseLatestVersion,
  getBiocReleaseVersion,
  releaseSort,
} from "../../components/bioc-releases";
import Loading from "../../components/loading";
import Layout from "../../components/layout";

//Write a fetcher function to wrap the native fetch function and return the result of a call to url in json format
const fetcher = (url: URL) => fetch(url).then((res) => res.json());

// To understand "Typing Destructured Object Parameters in TypeScript", see section
// "Typing Immediately Destructured Parameters"
// at <https://mariusschulz.com/blog/typing-destructured-object-parameters-in-typescript>
export default function Packages({
  bioc_release,
}: {
  bioc_release: string,
}) {

  //Set up SWR to run the fetcher function when calling "/api/staticdata"
  //There are 3 possible states: (1) loading when data is null (2) ready when the data is returned (3) error when there was an error fetching the data
  const { data: data_biocviews_edges, error: error_biocviews_edges } = useSWR(
    bioc_release ? `/api/${bioc_release}/biocviews_edges` : null,
    fetcher
  );

  //Handle the error state
  if (error_biocviews_edges) return <Loading />;

  //Handle the loading state
  if (!data_biocviews_edges) return <Loading />;

  const biocviews_edges = JSON.parse(data_biocviews_edges);

  const build_subtree = (edges: any, node: string) => {
    const subnodes = edges[node];

    if (Array.isArray(subnodes) && subnodes.length) {
      const subtree = subnodes.map((subnode: string) => {
        return (build_subtree(edges, subnode));
      });
      return (
        <TreeItem nodeId={node} label={node}>
          {subtree}
        </TreeItem >
      )

    } else {
      return (<TreeItem nodeId={node} label={node} />)
    }
  };

  const biocviews_tree = <TreeView
    aria-label="file system navigator"
    defaultCollapseIcon={<ExpandMoreIcon />}
    defaultExpandIcon={<ChevronRightIcon />}
    sx={{ height: "100%", flexGrow: 1, maxWidth: 200, overflowY: 'auto' }}
  >
    {build_subtree(biocviews_edges, "Software")}
    {build_subtree(biocviews_edges, "AnnotationData")}
    {build_subtree(biocviews_edges, "ExperimentData")}
    {build_subtree(biocviews_edges, "Workflow")}
  </TreeView>
  return (
    <Layout>
      <Head>
        <title>Bioconductor - BiocViews</title>
        <meta
          name="description"
          content="Use this interactive table to browse the complete set of packages in the Bioconductor repository."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="main">
        <Box
          sx={{
            width: "100%",
            maxWidth: "850px",
            margin: "0 15px",
            display: "flex",
            flexDirection: "column",
            alignSelf: "center",
          }}
        >
          <Box component={Grid} display="block">
            <h1>BiocViews</h1>
            <hr />
            {biocviews_tree}
          </Box>
        </Box>
      </main>
    </Layout>
  );
}

export async function getServerSideProps(context: { query: { release: string }, }) {
  const query = context.query;

  const releasesData = await getReleasesData();

  const releases_data = JSON.parse(releasesData.content);

  const bioc_release_version_options = getBiocReleaseVersion(
    releases_data.sort(releaseSort)
  );
  const bioc_release_version_latest =
    getBiocReleaseLatestVersion(releases_data);

  const bioc_release =
    query.release === undefined
      ? bioc_release_version_latest
      : mapStringToBiocRelease(
        String(query.release),
        bioc_release_version_latest
      );

  return {
    props: {
      bioc_release: bioc_release,
      bioc_release_version_latest:
        bioc_release_version_latest,
      bioc_release_version_options: bioc_release_version_options
    },
  }
}
