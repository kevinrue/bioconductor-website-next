import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";
import Head from "next/head";
import Link from "next/link";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import useSWR from "swr";
// React
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
// <https://react-data-table-component.netlify.app/?path=/docs/getting-started-examples--page>
import DataTable from "react-data-table-component";
import { getReleasesData } from "../../lib/bioc_releases";
import {
  mapBiocReleaseToString,
  mapStringToBiocRelease,
  getBiocReleaseLatestVersion,
  getBiocReleaseVersion,
  releaseSort,
} from "../../components/bioc-releases";
import useDebounce from "../../lib/useDebounce";
import Loading from "../../components/loading";
import BiocReleaseBanner from "../../components/BiocReleaseBanner";
import BiocReleaseButton from "../../components/bioc-release-button";
import Layout from "../../components/layout";
import styles from "./packages.module.css";

//Write a fetcher function to wrap the native fetch function and return the result of a call to url in json format
const fetcher = (url: URL) => fetch(url).then((res) => res.json());

// Options for filtering Bioconductor package types.
const packageTypeOptions = [
  { value: "All", label: "All" },
  { value: "Software", label: "Software" },
  { value: "AnnotationData", label: "AnnotationData" },
  { value: "ExperimentData", label: "ExperimentData" },
  { value: "Workflow", label: "Workflow" },
];

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
  {
    id: "version",
    name: "Version",
    selector: (row: any) => row.Version,
    sortable: true,
    maxWidth: "100px",
  },
  {
    id: "git_last_commit_date",
    name: "Updated",
    selector: (row: any) => row.git_last_commit_date,
    sortable: true,
    maxWidth: "150px",
  },
];

// paginationComponentOptions props for the <DataTable>
const paginationComponentOptions = {
  noRowsPerPage: true,
};

// filterRowsByPackageName filters packages that match the name pattern.
// * name: Package name.
// * pattern: Pattern to match.
const filterRowsByPackageName = (name: string, pattern: string) => {
  try {
    var matcher = new RegExp(pattern);
  } catch (err) {
    return false;
  }
  if (matcher.test(name)) {
    return true;
  } else {
    return false;
  }
};

// filterRowsByPackageType filters packages that match the selected type.
// * name: Package name.
// * type: Package type.
// * biocviews: Dictionary of BiocViews. Keys are package names. Values are character lists of tags.
// For TypeScript typing, see <https://www.carlrippon.com/typescript-dictionary/>
const filterRowsByPackageType = (
  name: string,
  type: string,
  biocviews: { [key: string]: string[] }
) => {
  if (type == "All") {
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
  bioc_release_version_latest,
  bioc_release_version_options,
}: {
  bioc_release: string,
  bioc_release_version_latest: string,
  bioc_release_version_options: string[]
}) {
  const router = useRouter();

  const query = router.query;

  const [packageSearchString, setPackageSearchString] = useState("");

  const [biocRelease, setBiocRelease] = useState(bioc_release);
  useEffect(() => setBiocRelease(bioc_release), [bioc_release])

  // Debounce the string input on package names by 500ms
  const [packageType, setPackageType] = useState(packageTypeOptions[0].value);
  const debouncedPackageSearchString = useDebounce(packageSearchString, 500);

  //Set up SWR to run the fetcher function when calling "/api/staticdata"
  //There are 3 possible states: (1) loading when data is null (2) ready when the data is returned (3) error when there was an error fetching the data
  const { data: data_packages, error: error_packages } = useSWR(
    bioc_release ? `/api/${bioc_release}/packages` : null,
    fetcher
  );
  const { data: data_biocviews, error: error_biocviews } = useSWR(
    bioc_release ? `/api/${bioc_release}/biocviews` : null,
    fetcher
  );
  const { data: data_snapshot_date, error: error_snapshot_date } = useSWR(
    bioc_release ? `/api/${bioc_release}/snapshot_date` : null,
    fetcher
  );
  const { data: data_r_version, error: error_r_version } = useSWR(
    bioc_release ? `/api/${bioc_release}/r_version` : null,
    fetcher
  );

  //Handle the error state
  if (error_packages) return <Loading />;
  if (error_biocviews) return <Loading />;
  if (error_snapshot_date)
    return <Loading />;
  if (error_r_version) return <Loading />;

  //Handle the loading state
  if (!data_packages) return <Loading />;
  if (!data_biocviews) return <Loading />;
  if (!data_snapshot_date)
    return <Loading />;
  if (!data_r_version) return <Loading />;

  const snapshot_date = JSON.parse(data_snapshot_date).snapshot_date;
  const r_version = JSON.parse(data_r_version).r_version;

  const biocviews_data = JSON.parse(data_biocviews);

  const table_data = JSON.parse(data_packages)
    .filter((object: any) =>
      filterRowsByPackageName(object.Package, debouncedPackageSearchString)
    )
    .filter((object: any) =>
      filterRowsByPackageType(object.Package, packageType, biocviews_data)
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
        Version: object.Version,
        git_last_commit_date: object.git_last_commit_date,
      };
    });

  const handleChangeBiocRelease = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setBiocRelease(event.target.value)
    const release = mapBiocReleaseToString(event.target.value, bioc_release_version_latest);
    const href = "/packages?release=${release}".replaceAll("${release}", release)
    router.push(href);
  };

  const handleChangePackageSearchString = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPackageSearchString(event.target.value);
  };

  const handleChangePackageType = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPackageType(event.target.value);
  };

  return (
    <Layout>
      <Head>
        <title>Bioconductor - Packages</title>
        <meta
          name="description"
          content="Use this interactive table to browse the complete set of packages in the Bioconductor repository."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <BiocReleaseBanner bioc_release={bioc_release} bioc_release_version_latest={bioc_release_version_latest} />
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
            <h1>Packages</h1>
            <hr />
            <p className={styles.snapshot}>
              Bioconductor release {bioc_release} | R version {r_version}{" "}
              (Snapshot date: {snapshot_date})
            </p>
          </Box>
          <Box>
            <fieldset className={styles.fieldset}>
              <legend className={styles.legend}>
                <FontAwesomeIcon icon={faFilter} size="xs" />
                Filters
              </legend>
              <FormControl variant="standard" sx={{ m: 1, width: "120" }}>
                <TextField
                  id="package-search"
                  label="Name"
                  variant="outlined"
                  onChange={handleChangePackageSearchString}
                  value={packageSearchString}
                />
              </FormControl>
              <FormControl variant="standard" sx={{ m: 1, width: "20ch" }}>
                <TextField
                  id="select-type"
                  select
                  label="Type"
                  value={packageType}
                  onChange={handleChangePackageType}
                >
                  {packageTypeOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </FormControl>
            </fieldset>
          </Box>
          <Box>
            <DataTable
              columns={table_columns}
              data={table_data}
              pagination
              paginationComponentOptions={paginationComponentOptions}
              // <https://stackoverflow.com/questions/66980280/how-to-sort-react-data-table-component-by-column-number>
              defaultSortFieldId="package_name"
            />
          </Box>
          <BiocReleaseButton
            value={String(biocRelease)}
            options={bioc_release_version_options}
            handleChange={handleChangeBiocRelease}
          />
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
