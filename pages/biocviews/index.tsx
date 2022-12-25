import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";
import Head from "next/head";
import Link from "next/link";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeItem from '@mui/lab/TreeItem';
import useSWR from "swr";
// React
import React, { useState } from "react";
import DataTable from "react-data-table-component";
import { getReleasesData } from "../../lib/bioc_releases";
import {
  mapStringToBiocRelease,
  getBiocReleaseLatestVersion,
  getBiocReleaseVersion,
  releaseSort,
} from "../../components/bioc-releases";
import Loading from "../../components/loading";
import Layout from "../../components/layout";
import styles from "./biocviews.module.css";

//Write a fetcher function to wrap the native fetch function and return the result of a call to url in json format
const fetcher = (url: URL) => fetch(url).then((res) => res.json());

// sortPackageLinksByName sorts table rows on the column of package names.
// A custom function is needed because the column contains a hyperlink, not simple text.
// <https://react-data-table-component.netlify.app/?path=/docs/sorting-custom-column-sort--custom-column-sort>
const sortPackageLinksByName = (rowA: any, rowB: any) => {
  const a = rowA.Package.props.children.toLowerCase();
  const b = rowB.Package.props.children.toLowerCase();
  if (a > b) {
    return 1;
  }
  if (b > a) {
    return -1;
  }
  return 0;
};

// Definitions of columns in the <DataTable> of packages.
const table_columns = [
  {
    id: "package",
    name: "Package",
    selector: (row: any) => row.Package,
    sortable: true,
    sortFunction: sortPackageLinksByName,
    maxWidth: "150px",
  },
  {
    id: "title",
    name: "Title",
    selector: (row: any) => row.Title,
    sortable: true,
    minWidth: "500px",
    wrap: true,
  },
];

// paginationComponentOptions props for the <DataTable>
const paginationComponentOptions = {
  noRowsPerPage: true,
};

// buildPackageUrl builds the URL to each package in the table
// * name: Package name
// * query: Query information in the URL of the current page.
// The function builds links to landing pages that correspond to the same Bioconductor release as the current page.
const buildPackageUrl = (name: string, query: ParsedUrlQuery) => {
  let query_string =
    query.release === undefined
      ? ""
      : `?release=${query.release}`;
  const href = [`/packages/${name}`, query_string].join("/");
  return href;
};

// To understand "Typing Destructured Object Parameters in TypeScript", see section
// "Typing Immediately Destructured Parameters"
// at <https://mariusschulz.com/blog/typing-destructured-object-parameters-in-typescript>
export default function Packages({
  bioc_release,
}: {
  bioc_release: string,
}) {
  const router = useRouter();

  const query = router.query;

  const [packageType, setPackageType] = useState('');

  //Set up SWR to run the fetcher function when calling "/api/staticdata"
  //There are 3 possible states: (1) loading when data is null (2) ready when the data is returned (3) error when there was an error fetching the data
  const { data: data_biocviews_edges, error: error_biocviews_edges } = useSWR(
    bioc_release ? `/api/${bioc_release}/biocviews_edges` : null,
    fetcher
  );
  const { data: data_packages, error: error_packages } = useSWR(
    bioc_release ? `/api/${bioc_release}/packages` : null,
    fetcher
  );
  const { data: data_biocviews, error: error_biocviews } = useSWR(
    bioc_release ? `/api/${bioc_release}/biocviews` : null,
    fetcher
  );

  //Handle the error state
  if (error_biocviews_edges) return <Loading />;
  if (error_packages) return <Loading />;
  if (error_biocviews) return <Loading />;

  //Handle the loading state
  if (!data_biocviews_edges) return <Loading />;
  if (!data_packages) return <Loading />;
  if (!data_biocviews) return <Loading />;

  const biocviews_edges = JSON.parse(data_biocviews_edges);

  const biocviews_data = JSON.parse(data_biocviews);

  const countPackageWithBiocview = (name: string, biocviews: { [key: string]: string[] }) => {
    const hits = Object.entries(biocviews).filter(([key, value]) => {
      if (value === null) {
        return (false)
      } else if (value.includes(name)) {
        return (true)
      } else {
        return (false)
      }
    })
    return (hits.length)
  }

  const build_subtree = (edges: any, node: string) => {
    const subnodes = edges[node];

    if (Array.isArray(subnodes) && subnodes.length) {
      const subtree = subnodes.map((subnode: string) => {
        return (build_subtree(edges, subnode));
      });
      return (
        <TreeItem nodeId={node} label={node + " (" + countPackageWithBiocview(node, biocviews_data) + ")"}>
          {subtree}
        </TreeItem >
      )

    } else {
      return (<TreeItem nodeId={node} label={node + " (" + countPackageWithBiocview(node, biocviews_data) + ")"} />)
    }
  };

  const handleTreeViewSelect = (event: React.SyntheticEvent, nodeIds: string) => {
    setPackageType(nodeIds)
  }

  const biocviews_tree = <TreeView
    aria-label="biocviews navigator"
    defaultCollapseIcon={<ExpandMoreIcon />}
    defaultExpandIcon={<ChevronRightIcon />}
    sx={{
      width: "100%",
      maxHeight: {
        xs: "300px",
        md: "500px",
        lg: "500px",
      },
      flexGrow: 1,
      overflowY: 'auto',
      borderStyle: "solid",
      borderColor: "lightgrey",
      padding: "10px 5px",
    }}
    onNodeSelect={handleTreeViewSelect}
  >
    {build_subtree(biocviews_edges, "Software")}
    {build_subtree(biocviews_edges, "AnnotationData")}
    {build_subtree(biocviews_edges, "ExperimentData")}
    {build_subtree(biocviews_edges, "Workflow")}
  </TreeView>;

  // filterRowsByBiocview filters packages that match the selected type.
  // * name: Package name.
  // * type: Package type.
  // * biocviews: Dictionary of BiocViews. Keys are package names. Values are character lists of tags.
  // For TypeScript typing, see <https://www.carlrippon.com/typescript-dictionary/>
  const filterRowsByBiocview = (
    name: string,
    type: string,
    biocviews: { [key: string]: string[] }
  ) => {
    if (type === '') {
      return true;
    } else {
      const package_biocviews = biocviews[name];
      if (package_biocviews === null) {
        return false;
      } else if (package_biocviews.includes(type)) {
        return true;
      } else {
        return false;
      }
    }
  };

  const table_data = JSON.parse(data_packages)
    .filter((object: any) =>
      filterRowsByBiocview(object.Package, packageType, biocviews_data)
    )
    .map((object: any) => {
      return {
        Package: (
          <Link
            className={styles.link}
            href={buildPackageUrl(object.Package, query)}
          >
            {object.Package}
          </Link>
        ),
        Title: object.Title,
      };
    });

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
        <Box sx={{
          display: "flex",
          justifyContent: "center",
          flexWrap: 'wrap'
        }}>
          <Box
            display="flex"
            sx={{
              margin: {
                xs: "20px 15px",
                md: "30px 15px",
                lg: "60px 30px",
                xl: "60px 30px",
              },
              width: {
                xs: "100%",
                md: "100%",
                lg: "250px",
                xl: "300px",
              },
              maxWidth: {
                xs: "100%",
                md: "800px",
                lg: "800px",
                xl: "800px",
              },
            }}
          >
            {biocviews_tree}
          </Box>
          <Box
            sx={{
              width: {
                xs: "100%",
                sm: "800px",
                lg: "850px",
              },
              maxWidth: {
                xs: "550px",
                sm: "850px",
                lg: "850px",
              },
              margin: {
                xs: "0px 5px",
                md: "0px 5px",
                lg: "0px 5px",
              },
            }}
          >
            <h1>BiocViews</h1>
            <hr />
            <DataTable
              columns={table_columns}
              data={table_data}
              pagination
              paginationComponentOptions={paginationComponentOptions}
              // <https://stackoverflow.com/questions/66980280/how-to-sort-react-data-table-component-by-column-number>
              defaultSortFieldId="package_name"
            />
          </Box>
        </Box>
      </main>
    </Layout >
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
